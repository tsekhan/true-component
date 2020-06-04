/**
 * Determine if provided object is string
 *
 * @memberOf module:html
 * @param {*} obj - object to test.
 * @returns {boolean} Returns true if provided object is string.
 */
const isString = (obj) => !(obj instanceof String) && typeof obj !== 'string';

/**
 * Generated unique tokens mapped to the matching data.
 *
 * @typedef {Map<string, *>} TokenToParamMap
 */

const tokenPrefix = Math.random().toString(36).substr(2);
let tokenIndex = 0;

/**
 * Match params (expressions) passed to template literal with HTML markup to randomly generated unique string tokens.
 *
 * @memberOf module:html
 * @param {string[]} strings - Ordered array of string, which are pieces of template literal with HTML markup,
 * delimited by expressions.
 * @param {Array} params - Ordered array of parameters passed to template literal with HTML markup.
 * @returns {{paramIndexToToken: string[], tokenToParam: TokenToParamMap, tokens: Set.<string>}} Returns object with
 * three fields:
 * - `paramIndexToToken`, which is an array where index matches index of element from `params` array, and associated
 * string is an unique string token;
 * - `tokenToParam` with generated tokens mapped to real data they substitute;
 * - `tokens` with set of tokens.
 *
 * Sets of tokens in both fields are the same.
 */
const generateTemplateParams = (strings, params) => {
  const tokenToParam = new Map();
  const tokens = new Set();

  const paramIndexToToken = params.map(param => {
    const key = `token-${tokenPrefix}-${tokenIndex++}`;

    if (isString(param)) {
      tokenToParam.set(key, param);
      tokens.add(key);
    }

    return key;
  });

  return {
    paramIndexToToken,
    tokenToParam,
    tokens,
  };
};

export default generateTemplateParams;
