import PlaceholderRoles from './PlaceholderRoles';
import buildFakeHtml from './buildFakeHtml';
import generateTagByKey from './generateTagByKey';

const scanForAttributes = function (node, tokenToParam) {
  let potentialId;

  if (node.nodeName.toLowerCase() === 'template') {
    const placeholderId = node.attributes[0].name;
    potentialId = generateTagByKey(placeholderId);
  }

  const placeholders = new Map();

  if (tokenToParam.has(node.nodeName.toLowerCase())) { // if it's a tag name
    placeholders.set(potentialId, PlaceholderRoles.TAG_NAME);
  } else {
    node.childNodes.forEach(child => {
      scanForAttributes(child, tokenToParam).forEach((value, key) => placeholders.set(key, value));
    });

    const { attributes: nodeAttributes } = node;

    if (nodeAttributes !== undefined) {
      for (let i = 0; i < nodeAttributes.length; i++) {
        const attributeName = nodeAttributes[i].name;
        const attributeValue = nodeAttributes[i].value;

        if (tokenToParam.has(attributeName)) { // if it's mentioned like <tag ${var}></tag> or <tag ${var}="123"></tag>
          placeholders.set(attributeName, PlaceholderRoles.ATTRIBUTE_OR_ATTRIBUTE_NAME);
        } else if (tokenToParam.has(attributeValue)) { // if it was mentioned like <tag attr=${var}></tag>
          placeholders.set(attributeValue, PlaceholderRoles.ATTRIBUTE_VALUE);
        } else {
          Array.from(tokenToParam.keys()).some(token => {
            if (
              attributeName.indexOf(token) ||
              attributeValue.indexOf(token)
            ) {
              placeholders.set(token, PlaceholderRoles.PART_OF_ATTRIBUTE_OR_VALUE);
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

const getAttributePlaceholders = (fakeMarkup, tokenToParam) => {
  const fakeHtml = buildFakeHtml(fakeMarkup);

  const placeholders = scanForAttributes(fakeHtml, tokenToParam);

  // Differentiate cases like <tag ${var}></tag> and <tag ${var}="123"></tag>
  placeholders.forEach((role, key) => {
    if (role === PlaceholderRoles.ATTRIBUTE_OR_ATTRIBUTE_NAME) {
      if (fakeMarkup.indexOf(`${key}=`) !== -1) {
        placeholders.set(key, PlaceholderRoles.ATTRIBUTE_NAME);
      } else {
        placeholders.set(key, PlaceholderRoles.ATTRIBUTE);
      }
    }
  });

  return placeholders;
};

export default getAttributePlaceholders;
