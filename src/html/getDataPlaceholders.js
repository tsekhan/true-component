import getFakeDataKey from './getFakeDataKey';

const getDataPlaceholders = function (node, dataMap) {
  const dataPlaceholders = new Set();

  const currentNodeName = node.nodeName.toLowerCase();
  const potentialId = getFakeDataKey(currentNodeName);

  if (dataMap.has(potentialId)) { // if node name in dataMap
    dataPlaceholders.add(potentialId);
  } else {
    node.childNodes.forEach(child => {
      const childDataPlaceholders = getDataPlaceholders(child, dataMap);

      childDataPlaceholders.forEach(attr => {
        dataPlaceholders.add(attr);
      });
    });

    const { attributes: nodeAttributes } = node;

    if (nodeAttributes !== undefined) {
      for (let i = 0; i < nodeAttributes.length; i++) {
        const attributeValue = nodeAttributes[i].value;

        if (dataMap.has(attributeValue)) {
          dataPlaceholders.add(attributeValue);
        }
      }
    }
  }

  return dataPlaceholders;
};

export default getDataPlaceholders;
