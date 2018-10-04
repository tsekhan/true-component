export default function getRealAttributes(child, dataMap, dataPlaceholders, callback) {
  if (child.attributes) {
    for (let i = 0; i < child.attributes.length; i++) {
      const attribute = child.attributes[i];

      let attributeValue = attribute.value;

      if (dataPlaceholders.has(attributeValue)) {
        attributeValue = dataMap.get(attributeValue);
      }

      callback(attribute.name, attribute.value);
    }
  }
}
