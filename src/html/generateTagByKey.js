/**
 * Generate HTML tag to use as placeholder instead of real data passed to `html` template literal tag.
 *
 * @memberOf module:html
 * @name generateTagByKey
 * @param {string} key - Key used for identifying of tag.
 * @returns {string} Returns HTML markup with generated tag.
 */
export default key => `<template ${key}></template>`;
