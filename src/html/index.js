/** @module html */

import buildFakeMarkup from './buildFakeMarkup';
import generateTemplateParams from './generateTemplateParams';
import getAttributePlaceholders from './getAttributePlaceholders';
import getTagPlaceholders from './getTagPlaceholders';
import generateTagByKey from './generateTagByKey';
import instantiateNodes from '../html/instantiateNodes';
import PLACEHOLDER_ROLES from './PLACEHOLDER_ROLES';

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
    indexToToken,
    tokenToParam,
    tokens,
  } = generateTemplateParams(strings, params);

  const fakeAttributeMarkup = buildFakeMarkup(tokens, indexToToken, strings);
  const placeholders = getAttributePlaceholders(fakeAttributeMarkup, tokens);

  const potentialTagTokens = new Set();

  tokens.forEach(token => {
    if (!placeholders.has(token)) { // On this step `placeholders` set contains only attribute placeholders.
      potentialTagTokens.add(token);
    }
  });

  const fakeTagMarkup = buildFakeMarkup(
    potentialTagTokens, indexToToken, strings, true,
  );

  getTagPlaceholders(fakeTagMarkup, potentialTagTokens)
    .forEach((role, key) => placeholders.set(key, role));

  let markup = '';

  strings.forEach((string, index) => {
    markup += string;

    if (placeholders.get(indexToToken[index]) === PLACEHOLDER_ROLES.TAG) {
      // If param was placed as a child of a tag then wrap token in tag and insert it to the markup.

      markup += generateTagByKey(indexToToken[index]);
    } else if (placeholders.has(indexToToken[index])) {
      // If param was placed on place of attribute then insert plain unwrapped token to the markup.

      markup += indexToToken[index];
    } else if (index < params.length) {
      // If param was placed somewhere else then in could be processed only as a plain string. Just put it as a string.

      markup += params[index];
    }
  });

  const tokenToData = new Map();
  placeholders.forEach((role, token) => tokenToData.set(token, tokenToParam.get(token)));

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
