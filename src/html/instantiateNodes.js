import nodeRegistry from '../nodeRegistry';
import HtmlComponent from '../components/HtmlComponent';
import { isIterable, flattenArray } from '../utils';
import Ref from '../Ref';
import getRealAttributes from './getRealAttributes';

const instantiateNodes = function (root, placeholders, keyToData) {
  root.childNodes.forEach(child => {
    let currentChild = child;
    let potentialId;

    if (currentChild.nodeName.toLowerCase() === 'template') {
      potentialId = currentChild.attributes[0].name;
    }

    if (
      potentialId &&
      placeholders.has(potentialId)
    ) {
      // If current child node is a <template> and first attribute name matches with name of placeholder,
      // then element has been inserted in markup as an object

      let dataToInsert = keyToData.get(potentialId);

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

        getRealAttributes({
          child,
          keyToData,
          placeholders,

          callback: (attributeName, attributeValue) => params[attributeName] = attributeValue,
        });

        currentChild = new Class(params, child.childNodes);

        root.replaceChild(currentChild, child);
      } else {
        // if it's a plain Node descendant

        getRealAttributes({
          child,
          keyToData,
          placeholders,
          callback: (attributeName, attributeValue) => {
            if (attributeName.toLowerCase() === 'ref' && attributeValue instanceof Ref) {
              attributeValue.node = child;

              // FIXME Check why it not works
              child.removeAttribute(attributeName);
            }

            child.setAttribute(attributeName, String(attributeValue));
          },
        });
      }

      instantiateNodes(currentChild, placeholders, keyToData);
    }
  });

  return root.childNodes;
};

export default instantiateNodes;
