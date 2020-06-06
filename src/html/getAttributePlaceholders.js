import generateTagByKey from './generateTagByKey';
import PLACEHOLDER_ROLES from './PLACEHOLDER_ROLES';

/**
 * Map of tokens to roles.
 *
 * @typedef {Map<string, PLACEHOLDER_ROLES>} PlaceholderMap
 *
 */

/**
 * Get all placeholders which acts as tag name, attribute value, part of attribute or value and attribute or attribute
 * name.
 *
 * @memberOf module:html
 * @param {Node} node - Node to start from.
 * @param {Set.<string>} tokens - Tokens to try to find.
 * @returns {PlaceholderMap} Tokens which are substitutions for attributes, attribute names or parts of attribute.
 */
const getAttributePlaceholders = (node, tokens) => {
  let potentialId;

  if (node.nodeName.toLowerCase() === 'template') {
    const placeholderId = node.attributes[0].name;
    potentialId = generateTagByKey(placeholderId);
  }

  const placeholders = new Map();

  if (tokens.has(node.nodeName.toLowerCase())) { // if it's a tag name
    placeholders.set(potentialId, PLACEHOLDER_ROLES.TAG_NAME);
  } else {
    node.childNodes.forEach(child =>
      getAttributePlaceholders(child, tokens)
        .forEach((role, key) => placeholders.set(key, role)));

    const { attributes: nodeAttributes } = node;

    if (nodeAttributes !== undefined) {
      for (let i = 0; i < nodeAttributes.length; i++) {
        const attributeName = nodeAttributes[i].name;
        const attributeValue = nodeAttributes[i].value;

        if (tokens.has(attributeName)) { // if it's mentioned like <tag ${var}></tag> or <tag ${var}="123"></tag>
          placeholders.set(attributeName,

            // Differentiate cases like <tag ${var}></tag> and <tag ${var}="123"></tag>
            node.outerHTML.includes(`${attributeName}=`) ? PLACEHOLDER_ROLES.ATTRIBUTE_NAME : PLACEHOLDER_ROLES.ATTRIBUTE);
        } else if (tokens.has(attributeValue)) { // if it was mentioned like <tag attr=${var}></tag>
          placeholders.set(attributeValue, PLACEHOLDER_ROLES.ATTRIBUTE_VALUE);
        } else {
          Array.from(tokens.keys()).some(token => {
            if (
              attributeName.includes(token) ||
              attributeValue.includes(token)
            ) {
              placeholders.set(token, PLACEHOLDER_ROLES.PART_OF_ATTRIBUTE_OR_VALUE);

              return true;
            }

            return false;
          });
        }
      }
    }
  }

  return placeholders;
};

export default getAttributePlaceholders;
