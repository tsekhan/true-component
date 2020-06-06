/** @module html */

import buildFakeMarkup from './buildFakeMarkup';
import instantiateNodes from './instantiateNodes';
import buildFinalHtml from './buildFinalHtml';
import buildFakeHtml from "./buildFakeHtml";
import getAttributePlaceholders from "./getAttributePlaceholders";
import getTagPlaceholders from "./getTagPlaceholders";
import {isString} from "../utils";

/**
 * Generated unique tokens mapped to the matching data.
 *
 * @typedef {Map<string, *>} TokenToParamMap
 */

const tokenPrefix = Math.random().toString(36).substr(2);
let tokenIndex = 0;

/**
 * Template literal tag function, which converts template literal to DOM.
 *
 * @global
 * @name html
 * @param {string[]} strings - Plain strings from provided template.
 * @param {*} params - Data to be inserted into markup.
 * @returns {ChildNode|NodeListOf<ChildNode>} Returns root element of parsed markup or list of elements if there are
 * more than one.
 */
export default (strings, ...params) => {
  const tokenToParam = new Map();
  const tokens = new Set();

  const paramIndexToToken = params.map(param => {
    const key = `token-${tokenPrefix}-${tokenIndex++}`;

    if (!isString(param)) {
      tokenToParam.set(key, param);
      tokens.add(key);
    }

    return key;
  });

  const attributePlaceholders = getAttributePlaceholders(
    buildFakeHtml(buildFakeMarkup(tokens, paramIndexToToken, strings)),
    tokens,
  );

  const potentialTagTokens = new Set();

  tokens.forEach(token => {
    if (!attributePlaceholders.has(token)) { // On this step `placeholders` set contains only attribute placeholders.
      potentialTagTokens.add(token);
    }
  });

  const tagPlaceholders = getTagPlaceholders(
    buildFakeHtml(
      buildFakeMarkup(
        potentialTagTokens,
        paramIndexToToken,
        strings,
        true,
      )
    ),
    potentialTagTokens,
  );

  const container = buildFinalHtml({
    strings,
    paramIndexToToken,
    attributePlaceholders,
    tagPlaceholders,
    passedData: params,
  });

  const children = instantiateNodes(container, tokenToParam);

  return children.length > 1 ? children : children[0];
};
