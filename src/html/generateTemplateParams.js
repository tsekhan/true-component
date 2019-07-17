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
 * Match params (expressions) passed to template literal with HTML markup to randomly generated unique string tokens.
 *
 * @memberOf module:html
 * @param {string[]} strings - Ordered array of string, which are pieces of template literal with HTML markup,
 * delimited by expressions.
 * @param {any[]} params - Ordered array of parameters passed to template literal with HTML markup.
 * @returns {{indexToToken: string[], tokenToParam: TokenToParamMap}} Returns object with two fields: `indexToToken`,
 * which is array where index matches index of element from `params` array, and associated string is a unique string
 * token; `tokenToParam` is a map, where key is a generated unique token and value is a matching parameter. Sets of
 * tokens in both fields are the same.
 */
const generateTemplateParams = (strings, params) => {
  const tokenToParam = new Map();

  const templateWithoutParams = strings.join();

  const indexToToken = params.map(param => {
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
    }

    return key;
  });

  return {
    indexToToken,
    tokenToParam,
  };
};

export default generateTemplateParams;
