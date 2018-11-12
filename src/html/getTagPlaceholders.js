import getFakeDataKey from './getFakeDataKey';

const getTagPlaceholders = function (node, dataMap) {
  const dataPlaceholders = new Set();

  let potentialId;

  if (node.nodeName.toLowerCase() === 'template') {
    const placeholderId = node.attributes[0].name;
    potentialId = getFakeDataKey(placeholderId);
  }

  if (
    potentialId !== undefined
    && dataMap.has(potentialId)
  ) { // if node name in dataMap
    dataPlaceholders.add(potentialId);
  } else {
    node.childNodes.forEach(child => {
      const childDataPlaceholders = getTagPlaceholders(child, dataMap);

      childDataPlaceholders.forEach(placeholder => {
        dataPlaceholders.add(placeholder);
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

export default getTagPlaceholders;
