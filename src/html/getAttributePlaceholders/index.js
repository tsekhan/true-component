import PLACEHOLDER_ROLES from '../PLACEHOLDER_ROLES';
import buildFakeHtml from '../buildFakeHtml';
import scanForAttributes from './scanForAttributes';

/**
 * Parse markup and get all placeholders which acts as tag name, attribute value, part of attribute or value and
 * attribute or attribute name.
 *
 * @param {string} fakeMarkup - markup where variables are replaced by generated placeholders.
 * @param {Map<string, any>} tokenToParam - map where key is a generated unique token and value is a matching parameter.
 * @returns {Map<string, PLACEHOLDER_ROLES>} Returns map where listed attributes, attribute names or values placeholders
 * mapped to their roles.
 */
const getAttributePlaceholders = (fakeMarkup, tokenToParam) => {
  const fakeHtml = buildFakeHtml(fakeMarkup);

  const placeholders = scanForAttributes(fakeHtml, tokenToParam);

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
