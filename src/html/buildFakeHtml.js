/**
 * Parse markup with data replaced by placeholders and build HTML document based on it.
 *
 * @memberOf module:html
 * @name buildFakeHtml
 * @param {string} fakeMarkup - Markup where variables are replaced by generated placeholders.
 * @returns {Node} Returns root node of HTML document created from provided markup.
 */
export default fakeMarkup =>
  new DOMParser().parseFromString(fakeMarkup, 'text/html').body.firstChild.content;
