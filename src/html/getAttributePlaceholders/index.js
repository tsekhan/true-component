import PLACEHOLDER_ROLES from '../PLACEHOLDER_ROLES';
import buildFakeHtml from '../buildFakeHtml';
import scanNodeForAttributes from './scanNodeForAttributes';

/**
 * Parse markup and get all placeholders which acts as tag name, attribute value, part of attribute or value and
 * attribute or attribute name.
 *
 * @memberOf module:html
 * @param {string} fakeMarkup - Markup where variables are replaced by generated placeholders.
 * @param {Set.<string>} tokens - Tokens to try to find.
 * @returns {PlaceholderMap} Tokens which are substitutions for attributes, attribute names or parts of attribute.
 */
const getAttributePlaceholders = (fakeMarkup, tokens) => {
  const fakeHtml = buildFakeHtml(fakeMarkup);

  const placeholders = scanNodeForAttributes(fakeHtml, tokens);

  // Differentiate cases like <tag ${var}></tag> and <tag ${var}="123"></tag>
  placeholders.forEach((role, key) => {
    if (role === PLACEHOLDER_ROLES.ATTRIBUTE_OR_ATTRIBUTE_NAME) {
      if (fakeMarkup.indexOf(`${key}=`) !== -1) {
        placeholders.set(key, PLACEHOLDER_ROLES.ATTRIBUTE_NAME);
      } else {
        placeholders.set(key, PLACEHOLDER_ROLES.ATTRIBUTE);
      }
    }
  });

  return placeholders;
};

export default getAttributePlaceholders;
