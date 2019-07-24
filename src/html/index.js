/** @module html */

import buildFakeMarkup from './buildFakeMarkup';
import generateTemplateParams from './generateTemplateParams';
import getAttributePlaceholders from './getAttributePlaceholders';
import getTagPlaceholders from './getTagPlaceholders';
import generateTagByKey from './generateTagByKey';
import instantiateNodes from '../html/instantiateNodes';
import PLACEHOLDER_ROLES from './PLACEHOLDER_ROLES';
import buildFakeHtml from './buildFakeHtml';

/**
 * Template literal tag function, which converts template literal to DOM.
 *
 * @global
 * @param {string[]} strings - Plain strings.
 * @param {any} params - Data to be inserted into markup.
 * @returns {ChildNode|NodeListOf<ChildNode>} Returns root element of parsed markup or list of elements if there are
 * more than one.
 */
const html = (strings, ...params) => {
  const {
    tokenToParam: plainKeyToParam,
    indexToToken: indexToPlainKey,
    tokens: plainKeyTokens,
  } = generateTemplateParams(strings, params);

  const fakeAttributeMarkup = buildFakeMarkup(plainKeyTokens, indexToPlainKey, strings);

  const placeholders = getAttributePlaceholders(fakeAttributeMarkup, plainKeyToParam);

  // TODO Check why calling generateTemplateParams() twice with same params.
  const {
    tokenToParam: tagNameToParam,
    indexToToken: indexToTagName,
    tokens: tagTokens,
  } = generateTemplateParams(strings, params);

  // Don't substitute params already detected as attribute placeholders.
  indexToTagName.forEach((tag, index) => {
    const matchingKey = indexToPlainKey[index];

    if (placeholders.has(matchingKey)) {
      tagNameToParam.delete(tag);
    }
  });

  const fakeTagMarkup = buildFakeMarkup(
    tagTokens, indexToTagName, strings, true,
  );

  const fakeDom = buildFakeHtml(fakeTagMarkup);

  getTagPlaceholders(fakeDom, tagNameToParam)
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

  const tokenToData = new Map();

  placeholders.forEach((role, token) => {
    if (role === PLACEHOLDER_ROLES.TAG) {
      tokenToData.set(token, tagNameToParam.get(token));
    } else {
      tokenToData.set(token, plainKeyToParam.get(token));
    }
  });

  const templateContainer = document.createElement('template');
  templateContainer.innerHTML = markup.trim();

  const container = document.createElement('div');
  const templateContainerChildren = Array.from(templateContainer.content.childNodes);
  templateContainerChildren.forEach(child => {
    container.appendChild(child);
  });

  instantiateNodes(container, tokenToData);

  if (container.childNodes.length === 1) {
    return container.firstChild;
  } else {
    return container.childNodes;
  }
};

export default html;
