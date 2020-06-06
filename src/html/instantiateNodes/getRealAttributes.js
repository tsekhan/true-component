/**
 * Get real data passed into HTML markup as attributes of tags by placeholders.
 *
 * @memberOf module:html
 * @name getRealAttributes
 * @param {Node} child - DOM node to analyze
 * @param {TokenToParamMap} tokenToData - Tokens mapped to data substituted by them.
 * @returns {Map<string, *>} Returns map where tag attribute names are mapped to real data passed into HTML markup.
 */
export default (child, tokenToData) => {
  const attributes = new Map();

  if (child.attributes) { // Text nodes has no attributes
    for (let i = 0; i < child.attributes.length; i++) {
      const attr = child.attributes[i];

      attributes.set(attr.name,
        tokenToData.has(attr.value) ? tokenToData.get(attr.value) : attr.value);
    }
  }

  return attributes;
};
