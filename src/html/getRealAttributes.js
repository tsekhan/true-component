export default function getRealAttributes(params) {
  const {
    child, dataMap, dataPlaceholders, callback,
  } = params;

  if (child.attributes) {
    for (let i = 0; i < child.attributes.length; i++) {
      const attribute = child.attributes[i];

      let attributeValue = attribute.value;

      if (dataPlaceholders.has(attributeValue)) {
        attributeValue = dataMap.get(attributeValue);
      }

      callback(attribute.name, attributeValue);
    }
  }
}
