import nodeRegistry from '../../nodeRegistry';
import HtmlComponent from '../../components/HtmlComponent';
import { isIterable, flattenArray } from '../../utils';
import Ref from '../../Ref';
import getRealAttributes from './getRealAttributes';

/**
 * Instantiate components recursively, pass parameters to them and replace other placeholders by data.
 *
 * @memberOf module:html
 * @param {Node} root - Node to start from.
 * @param {TokenToParamMap} tokenToData - Tokens mapped to data substituted by them.
 * @returns {NodeListOf<ChildNode>} Returns DOM node with instantiated custom components.
 */
const instantiateNodes = (root, tokenToData) => {
  root.childNodes.forEach(child => {
    let currentChild = child;
    let potentialId;

    if (currentChild.nodeName.toLowerCase() === 'template') {
      potentialId = currentChild.attributes[0].name;
    }

    if (
      potentialId &&
      tokenToData.has(potentialId)
    ) {
      // If current child node is a <template> and first attribute name matches with name of placeholder,
      // then element has been inserted in markup as an object

      let dataToInsert = tokenToData.get(potentialId);

      const insertBefore = (node, placeholder) => root.insertBefore(node, placeholder);

      if (isIterable(dataToInsert)) {
        // If it's array or something iterable...

        const flatArray = flattenArray(Array.from(dataToInsert));
        flatArray.forEach(item => {
          if (typeof item === 'string' || item instanceof String) {
            insertBefore(new Text(item), currentChild);
          } else {
            insertBefore(item, currentChild);
          }
        });
      } else {
        if (
          !(dataToInsert instanceof HtmlComponent) &&
          !(dataToInsert instanceof Node)
        ) {
          // If it's something unknown - cast it to string
          dataToInsert = document.createTextNode(dataToInsert);
        }

        insertBefore(dataToInsert, currentChild);
      }

      root.removeChild(currentChild);
    } else {
      const childNodeName = child.nodeName.toLowerCase();

      if (nodeRegistry.has(childNodeName)) {
        // if HtmlComponent's descendant has been inserted in markup as a tag

        const Class = nodeRegistry.get(childNodeName);
        const params = {};

        getRealAttributes(child, tokenToData)
          .forEach((attributeValue, attributeName) => params[attributeName] = attributeValue);

        currentChild = new Class(params, child.childNodes);

        root.replaceChild(currentChild, child);
      } else {
        // if it's a plain Node descendant

        getRealAttributes(child, tokenToData).forEach((attributeName, attributeValue) => {
          if (attributeName.toLowerCase() === 'ref' && attributeValue instanceof Ref) {
            attributeValue.node = child;

            // FIXME Check why it not works
            child.removeAttribute(attributeName);
          }

          child.setAttribute(attributeName, String(attributeValue));
        });
      }

      instantiateNodes(currentChild, tokenToData);
    }
  });

  return root.childNodes;
};

export default instantiateNodes;
