/** @module html */

import buildFakeMarkup from './buildFakeMarkup';
import generateTemplateParams from './generateTemplateParams';
import getAttributePlaceholders from './getAttributePlaceholders';
import getTagPlaceholders from './getTagPlaceholders';
import instantiateNodes from './instantiateNodes';
import buildFinalHtml from './buildFinalHtml';

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
    paramIndexToToken,
    tokenToParam,
    tokens,
  } = generateTemplateParams(strings, params);

  const fakeAttributeMarkup = buildFakeMarkup(tokens, paramIndexToToken, strings);
  const attributePlaceholders = getAttributePlaceholders(fakeAttributeMarkup, tokens);

  const potentialTagTokens = new Set();

  tokens.forEach(token => {
    if (!attributePlaceholders.has(token)) { // On this step `placeholders` set contains only attribute placeholders.
      potentialTagTokens.add(token);
    }
  });

  const fakeTagMarkup = buildFakeMarkup(
    potentialTagTokens, paramIndexToToken, strings, true,
  );

  const tagPlaceholders = getTagPlaceholders(fakeTagMarkup, potentialTagTokens);

  const container = buildFinalHtml({
    strings,
    paramIndexToToken,
    attributePlaceholders,
    tagPlaceholders,
    passedData: params,
  });

  instantiateNodes(container, tokenToParam);

  return (container.childNodes.length === 1) ? container.firstChild : container.childNodes;
};

export default html;
