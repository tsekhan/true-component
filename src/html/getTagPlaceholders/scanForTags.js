import PLACEHOLDER_ROLES from '../PLACEHOLDER_ROLES';

const scanForTags = (node, tokenToParam) => {
  const placeholders = new Map();

  if (node.nodeName.toLowerCase() === 'template') {
    const potentialId = node.attributes[0].name;

    if (tokenToParam.has(potentialId)) { // if node name in dataMap
      placeholders.set(potentialId, PLACEHOLDER_ROLES.TAG);
    }
  }

  node.childNodes.forEach(child => {
    scanForTags(child, tokenToParam)
      .forEach((value, key) => placeholders.set(key, value));
  });

  return placeholders;
};

export default scanForTags;