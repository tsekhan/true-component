import PlaceholderRoles from './PlaceholderRoles';
import buildFakeHtml from './buildFakeHtml';

const scanForTags = (node, tokenToParam) => {
  const placeholders = new Map();

  if (node.nodeName.toLowerCase() === 'template') {
    const potentialId = node.attributes[0].name;

    if (tokenToParam.has(potentialId)) { // if node name in dataMap
      placeholders.set(potentialId, PlaceholderRoles.TAG);
    }
  }

  node.childNodes.forEach(child => {
    scanForTags(child, tokenToParam)
      .forEach((value, key) => placeholders.set(key, value));
  });

  return placeholders;
};

const getTagPlaceholders = (fakeMarkup, tokenToParam) => {
  const node = buildFakeHtml(fakeMarkup);

  return scanForTags(node, tokenToParam);
};

export default getTagPlaceholders;
