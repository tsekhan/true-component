import PLACEHOLDER_ROLES from '../PLACEHOLDER_ROLES';
import buildFakeHtml from '../buildFakeHtml';
import scanForAttributes from './scanForAttributes';

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