import nodeStore from '../nodeStore/nodeStore';
import getFakeDataKey from './getFakeDataKey';
import Component from '../component/Component';
import { isIterable, flattenArray } from '../utils/utils.js';

const instantiateNodes = function (root, dataMap, dataPlaceholders) {
  root.childNodes.forEach(child => {
    let currentChild = child;

    const childNodeName = currentChild.nodeName.toLowerCase();
    const fakeDataKey = getFakeDataKey(childNodeName);
    if (dataPlaceholders.has(fakeDataKey)) {
      const dataToInsert = dataMap.get(fakeDataKey);

      const insertBefore = (node, placeholder) => root.insertBefore(node, placeholder);

      if (isIterable(dataToInsert)) {
        const flatArray = flattenArray(Array.from(dataToInsert));
        flatArray.forEach(item => insertBefore(item, currentChild));
      } else {
        if (
          dataToInsert instanceof Component ||
          dataToInsert instanceof Node
        ) {
          insertBefore(dataToInsert, currentChild);
        } else {
          const textNode = document.createTextNode(dataToInsert);
          insertBefore(textNode, currentChild);
        }
      }

      root.removeChild(currentChild);
    } else {
      if (nodeStore.has(child)) {
        const Class = nodeStore.get(child);
        const params = {};

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
      }
      instantiateNodes(currentChild, dataMap, dataPlaceholders);
    }
  });

  return root.childNodes;
};

export default instantiateNodes;
