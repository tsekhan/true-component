import nodeRegistry from '../../nodeRegistry';
import HtmlComponent from '../../components/HtmlComponent';
import {flattenArray, isIterable, isString} from '../../utils';
import Ref from '../../Ref';
import getRealAttributes from './getRealAttributes';

/**
 * Instantiate components recursively, pass parameters to them and replace other placeholders by data.
 *
 * @memberOf module:html
 * @param {Node} rootNode - Node to start from.
 * @param {TokenToParamMap} tokenToData - Tokens mapped to data substituted by them.
 * @returns {NodeListOf<ChildNode>} Returns DOM node with instantiated custom components.
 */
const instantiateNodes = (rootNode, tokenToData) => {
  rootNode.childNodes.forEach(child => {
    if (
      child.nodeName.toLowerCase() === 'template' &&
      tokenToData.has(child.attributes[0].name)
    ) {
      // If current child node is a <template> and first attribute name matches with name of placeholder,
      // then element has been inserted in markup as an object

      let dataToInsert = tokenToData.get(child.attributes[0].name);

      if (isIterable(dataToInsert)) {
        // If it's array or something iterable...

        const flattenedDataToInsert = flattenArray(Array.from(dataToInsert));
        flattenedDataToInsert.forEach(
          item => rootNode.insertBefore(
            isString(item) ? new Text(item) : item,
            child,
          )
        );
      } else {
        if (
          !(dataToInsert instanceof HtmlComponent) &&
          !(dataToInsert instanceof Node)
        ) {
          // If it's something unknown - cast it to string
          dataToInsert = new Text(dataToInsert);
        }

        rootNode.insertBefore(dataToInsert, child);
      }

      rootNode.removeChild(child);
    } else {
      const childNodeName = child.nodeName.toLowerCase();
      if (nodeRegistry.has(childNodeName)) {
        // if HtmlComponent's descendant has been inserted into markup as a tag

        const Class = nodeRegistry.get(childNodeName);
        const params = {};

        getRealAttributes(child, tokenToData)
          .forEach((attributeValue, attributeName) => params[attributeName] = attributeValue);

        const replacement = new Class(params, child.childNodes);

        rootNode.replaceChild(replacement, child);
        instantiateNodes(replacement, tokenToData);
      } else {
        // if it's a plain Node descendant

        getRealAttributes(child, tokenToData).forEach((attributeValue, attributeName) => {
          if (attributeName.toLowerCase() === 'ref' && attributeValue instanceof Ref) {
            attributeValue.node = child;

            // FIXME Check why it not works
            child.removeAttribute(attributeName);
          }

          child.setAttribute(attributeName, String(attributeValue));
        });

        instantiateNodes(child, tokenToData);
      }
    }
  });

  return rootNode.childNodes;
};

export default instantiateNodes;
