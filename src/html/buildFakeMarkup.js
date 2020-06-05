import generateTagByKey from './generateTagByKey';

/**
 * Build markup from template and replace data with placeholders (tokens).
 *
 * @memberOf module:html
 * @name buildFakeMarkup
 * @param {Set.<string>} tokens - Set of tokens used for replacing of real data passed to markup.
 * @param {string[]} indexToToken - Array where index matches index of element from `params` array, and associated
 * string is a unique string token.
 * @param {string[]} strings - Ordered array of string, which are pieces of template literal with HTML markup,
 * delimited by expressions.
 * @param {boolean} [wrapInTag] - If set to true, tokens would be wrapped in tag to be easily found when traversing DOM.
 * @returns {string} Returns markup for HTML document where data placeholders are tokens. Resulting markup is wrapped in
 * `<template>` and `<body>` tags.
 */
export default (
  tokens,
  indexToToken,
  strings,
  wrapInTag = false,
) =>
  `<body><template>${
    strings.reduce((accumulator, string, index) => {
      let result = accumulator + string;

      const fakeDataToken = indexToToken[index];

      if (fakeDataToken && tokens.has(fakeDataToken)) {
        result += wrapInTag ? generateTagByKey(fakeDataToken) : fakeDataToken;
      }

      return result;
    }, '')
  }</template></body>`;
