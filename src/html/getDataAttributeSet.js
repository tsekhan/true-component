const getDataAttributeSet = function (node, dataMap) {
  const dataAttributes = new Set();

  node.childNodes.forEach(child => {
    getDataAttributeSet(child, dataMap).forEach(attr => {
      dataAttributes.add(attr);
    });
  });

  const { attributes } = node;

  if (attributes !== undefined) {
    for (let i = 0; i < attributes.length; i++) {
      const attributeValue = attributes[i].value;

      if (dataMap.has(attributeValue)) {
        dataAttributes.add(attributeValue);
      }
    }
  }

  return dataAttributes;
};

export default getDataAttributeSet;
