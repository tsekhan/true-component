import generateTagByKey from './generateTagByKey';

/**
 * Build markup from template and replace data with placeholders (tokens).
 *
 * @param {Map<string, any>} tokenToParam - Map where key is a generated unique token and value is a matching parameter.
 * @param {string[]} indexToToken - Array where index matches index of element from `params` array, and associated
 * string is a unique string token.
 * @param {string[]} strings - Ordered array of string, which are pieces of template literal with HTML markup,
 * delimited by expressions.
 * @param {boolean} wrapInTag - If set to true, tokens would be wrapped in tag to be easily found when traversing DOM.
 * @returns {string} Returns markup for HTML document where data placeholders are tokens. Resulting markup is wrapped in
 * `<template>` and `<body>` tags.
 */
const buildFakeMarkup = (
  tokenToParam,
  indexToToken,
  strings,
  wrapInTag = false,
) => {
  let fakeMarkup = '';

  strings.forEach((string, index) => {
    fakeMarkup += string;

    const fakeDataToken = indexToToken[index];

    if (fakeDataToken && tokenToParam.has(fakeDataToken)) {
      fakeMarkup += wrapInTag ? generateTagByKey(fakeDataToken) : fakeDataToken;
    }
  });

  return `<body><template>${fakeMarkup}</template></body>`;
};

export default buildFakeMarkup;
