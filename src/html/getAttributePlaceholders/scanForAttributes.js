import generateTagByKey from '../generateTagByKey';
import PLACEHOLDER_ROLES from '../PLACEHOLDER_ROLES';

const scanForAttributes = (node, tokenToParam) => {
  let potentialId;

  if (node.nodeName.toLowerCase() === 'template') {
    const placeholderId = node.attributes[0].name;
    potentialId = generateTagByKey(placeholderId);
  }

  const placeholders = new Map();

  if (tokenToParam.has(node.nodeName.toLowerCase())) { // if it's a tag name
    placeholders.set(potentialId, PLACEHOLDER_ROLES.TAG_NAME);
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
          placeholders.set(attributeName, PLACEHOLDER_ROLES.ATTRIBUTE_OR_ATTRIBUTE_NAME);
        } else if (tokenToParam.has(attributeValue)) { // if it was mentioned like <tag attr=${var}></tag>
          placeholders.set(attributeValue, PLACEHOLDER_ROLES.ATTRIBUTE_VALUE);
        } else {
          Array.from(tokenToParam.keys()).some(token => {
            if (
              attributeName.indexOf(token) ||
              attributeValue.indexOf(token)
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

export default scanForAttributes;
