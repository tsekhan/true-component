/**
 * Generate random token.
 *
 * @memberOf module:html
 * @returns {string} Returns 11-symbol alphanumeric token.
 */
const getRandomizedToken = () => Math.random().toString(36).substr(2);

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
 * @typedef {Map<string, any>} TokenToParamMap
 */

/**
 * Match params (expressions) passed to template literal with HTML markup to randomly generated unique string tokens.
 *
 * @memberOf module:html
 * @param {string[]} strings - Ordered array of string, which are pieces of template literal with HTML markup,
 * delimited by expressions.
 * @param {any[]} params - Ordered array of parameters passed to template literal with HTML markup.
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

  const templateWithoutParams = strings.join();

  const paramIndexToToken = params.map(param => {
    let key;

    // Generate unique token
    do {
      key = `token-${getRandomizedToken()}`;
    } while (
      tokenToParam.has(key) &&
      templateWithoutParams.indexOf(key) === '-1'
    );

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
