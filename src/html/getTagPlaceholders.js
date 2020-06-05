import PLACEHOLDER_ROLES from './PLACEHOLDER_ROLES';

/**
 * Find tags which has name mentioned in provided token map.
 *
 * @memberOf module:html
 * @param {Node} node - Node to start from.
 * @param {Set.<string>} tokens - Tokens to try to find.
 * @returns {Map<string, PLACEHOLDER_ROLES.TAG>} Returns map of placeholders which contains only `PLACEHOLDER_ROLES.TAG`
 * roles mapped to tokens.
 */
const getTagPlaceholders = (node, tokens) => {
  const placeholders = new Map();

  if (node.nodeName.toLowerCase() === 'template') {
    const potentialId = node.attributes[0].name;

    if (tokens.has(potentialId)) { // if node name in dataMap
      placeholders.set(potentialId, PLACEHOLDER_ROLES.TAG);
    }
  }

  node.childNodes.forEach(child =>
    getTagPlaceholders(child, tokens)
      .forEach((value, token) => placeholders.set(token, value))
  );

  return placeholders;
};

export default getTagPlaceholders;
