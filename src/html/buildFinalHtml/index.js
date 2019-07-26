import buildFinalMarkup from './buildFinalMarkup';

/**
 * Build DOM node with data replaced by bound tokens.
 *
 * @memberOf module:html
 * @param {string[]} strings - Plain strings from provided template.
 * @param {any[]} passedData - Data to be inserted into markup.
 * @param {string[]} paramIndexToToken - Is an array where index matches index of element from `passedData` array, and
 * associated string is an unique string token.
 * @param {PlaceholderMap} attributePlaceholders - Tokens which are substitutions for attributes, attribute names
 * or parts of attribute.
 * @param {PlaceholderMap} tagPlaceholders - Tokens which are substitutions for tags.
 * @returns {HTMLDivElement} Returns generated DOM node.
 */
const buildFinalHtml = ({
  strings,
  passedData,
  paramIndexToToken,
  attributePlaceholders,
  tagPlaceholders,
}) => {
  const templateContainer = document.createElement('template');

  templateContainer.innerHTML = buildFinalMarkup({
    strings,
    paramIndexToToken,
    attributePlaceholders,
    tagPlaceholders,
    passedData,
  }).trim();

  const container = document.createElement('div');

  Array.from(templateContainer.content.childNodes).forEach(child => {
    container.appendChild(child);
  });

  return container;
};

export default buildFinalHtml;
