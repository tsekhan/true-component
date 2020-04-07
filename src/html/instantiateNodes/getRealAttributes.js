/**
 * Get real data passed into HTML markup as attributes of tags by placeholders.
 *
 * @memberOf module:html
 * @param {Node} child - DOM node to analyze
 * @param {TokenToParamMap} tokenToData - Tokens mapped to data substituted by them.
 * @returns {Map<string, *>} Returns map where tag attribute names are mapped to real data passed into HTML markup.
 */
const getRealAttributes = (child, tokenToData) => {
  const attributes = new Map();

  if (child.attributes) {
    for (let i = 0; i < child.attributes.length; i++) {
      const attribute = child.attributes[i];

      let attributeValue = attribute.value;

      if (tokenToData.has(attributeValue)) {
        attributeValue = tokenToData.get(attributeValue);
      }

      attributes.set(attribute.name, attributeValue);
    }
  }

  return attributes;
};

export default getRealAttributes;
