import generateTagByKey from './generateTagByKey';

/**
 *
 * @param strings
 * @param paramIndexToToken
 * @param attributePlaceholders
 * @param tagPlaceholders
 * @param passedData
 * @returns {string}
 */
const buildFinalMarkup = ({
  strings,
  paramIndexToToken,
  attributePlaceholders,
  tagPlaceholders,
  passedData,
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

export default buildFinalMarkup;
