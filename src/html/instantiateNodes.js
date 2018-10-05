import nodeStore from '../nodeStore/nodeStore';
import getFakeDataKey from './getFakeDataKey';
import Component from '../Component/Component';
import { isIterable, flattenArray } from '../utils/utils';
import Ref from '../Ref/Ref';
import getRealAttributes from './getRealAttributes';

const instantiateNodes = function (root, dataMap, dataPlaceholders) {
  root.childNodes.forEach(child => {
    let currentChild = child;

    const childNodeName = currentChild.nodeName.toLowerCase();
    const fakeNodeName = getFakeDataKey(childNodeName);
    if (dataPlaceholders.has(fakeNodeName)) { // if element has been inserted in markup as an object
      let dataToInsert = dataMap.get(fakeNodeName);

      const insertBefore = (node, placeholder) => root.insertBefore(node, placeholder);

      if (isIterable(dataToInsert)) {
        const flatArray = flattenArray(Array.from(dataToInsert));
        flatArray.forEach(item => insertBefore(item, currentChild));
      } else {
        if (
          !(dataToInsert instanceof Component) &&
          !(dataToInsert instanceof Node)
        ) {
          dataToInsert = document.createTextNode(dataToInsert);
        }
        insertBefore(dataToInsert, currentChild);
      }

      root.removeChild(currentChild);
    } else {
      if (nodeStore.has(child)) { // if Component's descendant has been inserted in markup as a tag
        const Class = nodeStore.get(child);
        const params = {};

        getRealAttributes({
          child,
          dataMap,
          dataPlaceholders,
          callback: (attributeName, attributeValue) => params[attributeName] = attributeValue,
        });

        for (let i = 0; i < child.attributes.length; i++) {
          const attribute = child.attributes[i];

          let attributeValue = attribute.value;

          if (dataPlaceholders.has(attributeValue)) {
            attributeValue = dataMap.get(attributeValue);
          }

          params[attribute.name] = attributeValue;
        }

        currentChild = new Class(params, child.childNodes);

        root.replaceChild(currentChild, child);
      } else { // if it's a plain Node descendant
        getRealAttributes({
          child,
          dataMap,
          dataPlaceholders,
          callback: (attributeName, attributeValue) => {
            if (attributeName === 'ref' && attributeValue instanceof Ref) {
              attributeValue.node = child;

              // FIXME Check why it not works
              child.removeAttribute('ref');
            }
            child.setAttribute(attributeName, String(attributeValue));
          },
        });
      }

      instantiateNodes(currentChild, dataMap, dataPlaceholders);
    }
  });

  return root.childNodes;
};

export default instantiateNodes;
