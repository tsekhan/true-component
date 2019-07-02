const getRealAttributes = ({
  child,
  keyToData,
  placeholders,
  callback,
}) => {
  if (child.attributes) {
    for (let i = 0; i < child.attributes.length; i++) {
      const attribute = child.attributes[i];

      let attributeValue = attribute.value;

      if (placeholders.has(attributeValue)) {
        attributeValue = keyToData.get(attributeValue);
      }

      callback(attribute.name, attributeValue);
    }
  }
};

export default getRealAttributes;
