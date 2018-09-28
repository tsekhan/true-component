import nodeStore from '../nodeStore/nodeStore';
import getFakeDataKey from './getFakeDataKey';

// FIXME Won't work if root node is data node
const instantiateNodes = function (root, dataMap, dataPlaceholders) {
  root.childNodes.forEach(child => {
    let currentChild = child;

    const childNodeName = currentChild.nodeName.toLowerCase();
    const potentialId = getFakeDataKey(childNodeName);
    console.log(potentialId);
    if (dataPlaceholders.has(potentialId)) {
      const paramToInsert = dataMap.get(potentialId);
      if (paramToInsert instanceof NodeList) {
        Array.from(paramToInsert).forEach(node => {
          root.insertBefore(node, currentChild);
        });
        root.removeChild(currentChild);
      } else {
        root.replaceChild(paramToInsert, currentChild);
      }
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
