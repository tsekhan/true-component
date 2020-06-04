import generateTagByKey from '../generateTagByKey';

/**
 * Build markup for creation of DOM node with data replaced by bound tokens.
 *
 * @memberOf module:html
 * @name buildFinalMarkup
 * @param {string[]} strings - Plain strings from provided template.
 * @param {Array} passedData - Data to be inserted into markup.
 * @param {string[]} paramIndexToToken - Is an array where index matches index of element from `passedData` array, and
 * associated string is an unique string token.
 * @param {PlaceholderMap} attributePlaceholders - Tokens which are substitutions for attributes, attribute names
 * or parts of attribute.
 * @param {PlaceholderMap} tagPlaceholders - Tokens which are substitutions for tags.
 * @returns {string} Returns string with generated HTML markup.
 */
export default ({
  strings,
  passedData,
  paramIndexToToken,
  attributePlaceholders,
  tagPlaceholders,
}) => {
  let markup = '';

  strings.forEach((string, index) => {
    markup += string;

    if (tagPlaceholders.has(paramIndexToToken[index])) {
      // If param was placed as a child of a tag then wrap token in tag and insert it to the markup.

      markup += generateTagByKey(paramIndexToToken[index]);
    } else if (attributePlaceholders.has(paramIndexToToken[index])) {
      // If param was placed on place of attribute then insert plain unwrapped token to the markup.

      markup += paramIndexToToken[index];
    } else if (index < passedData.length) {
      // If param was placed somewhere else then in could be processed only as a plain string. Just put it as a string.

      markup += passedData[index];
    }
  });

  return markup;
};
