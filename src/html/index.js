import buildFakeAttributeMarkup from './buildFakeAttributeMarkup';
import buildFakeTagMarkup from './buildFakeTagMarkup';
import generateTemplateParams from './generateTemplateParams';
import getAttributePlaceholders from './getAttributePlaceholders';
import getTagPlaceholders from './getTagPlaceholders';
import generateTagByKey from './generateTagByKey';
import instantiateNodes from '../html/instantiateNodes';
import PLACEHOLDER_ROLES from './PLACEHOLDER_ROLES';

const html = (strings, ...params) => {
  const {
    tokenToParam: plainKeyToParam,
    indexToToken: indexToPlainKey,
  } = generateTemplateParams(strings, params);

  const fakeMarkup = buildFakeAttributeMarkup(plainKeyToParam,
    indexToPlainKey,
    strings);

  const placeholders = getAttributePlaceholders(fakeMarkup, plainKeyToParam);

  const {
    tokenToParam: tagNameToParam,
    indexToToken: indexToTagName,
  } = generateTemplateParams(strings, params);

  // Don't substitute params already detected as attribute placeholders.
  indexToTagName.forEach((tag, index) => {
    const matchingKey = indexToPlainKey[index];

    if (placeholders.has(matchingKey)) {
      tagNameToParam.delete(tag);
    }
  });

  const tagFakeMarkup = buildFakeTagMarkup(tagNameToParam,
    indexToTagName,
    strings);

  getTagPlaceholders(tagFakeMarkup, tagNameToParam)
    .forEach((value, key) => placeholders.set(key, value));

  let markup = '';

  strings.forEach((string, index) => {
    markup += string;

    if (placeholders.has(indexToPlainKey[index])) {
      markup += indexToPlainKey[index];
    } else if (placeholders.has(indexToTagName[index])) {
      markup += generateTagByKey(indexToTagName[index]);
    } else if (index < params.length) {
      markup += params[index];
    }
  });

  const keyToData = new Map();

  placeholders.forEach((role, key) => {
    if (role === PLACEHOLDER_ROLES.TAG) {
      keyToData.set(key, tagNameToParam.get(key));
    } else {
      keyToData.set(key, plainKeyToParam.get(key));
    }
  });

  const templateContainer = document.createElement('template');
  templateContainer.innerHTML = markup.trim();

  const container = document.createElement('div');
  const templateContainerChildren = Array.from(templateContainer.content.childNodes);
  templateContainerChildren.forEach(child => {
    container.appendChild(child);
  });

  instantiateNodes(container, placeholders, keyToData);

  if (container.childNodes.length === 1) {
    return container.firstChild;
  } else {
    return container.childNodes;
  }
};

export default html;
