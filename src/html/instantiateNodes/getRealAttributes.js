/**
 * Get real data passed into HTML markup as attributes of tags by placeholders.
 *
 * @param {Node} child - DOM node to analyze
 * @param {Map<string, any>} tokenToData - Tokens mapped to data substituted by them.
 * @param {Map<string, PLACEHOLDER_ROLES>} placeholders - Kinds of places, where data passed, mapped to tokens.
 * @returns {Map<string, any>} Returns real data passed into HTML markup as attributes of tags mapped to attribute
 * names.
 */
const getRealAttributes = (child, tokenToData, placeholders) => {
  const attributes = new Map();

  if (child.attributes) {
    for (let i = 0; i < child.attributes.length; i++) {
      const attribute = child.attributes[i];

      let attributeValue = attribute.value;

      if (placeholders.has(attributeValue)) {
        attributeValue = tokenToData.get(attributeValue);
      }

      attributes.set(attribute.name, attributeValue);
    }
  }

  return attributes;
};

export default getRealAttributes;
