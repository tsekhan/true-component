/**
 * Generate HTML tag to use as placeholder instead of real data passed to `html` template literal tag.
 *
 * @param {string} key - key used for identifying of tag
 * @returns {string} Returns HTML markup with generated tag.
 */
const generateTagByKey = key => `<template ${key}></template>`;

export default generateTagByKey;
