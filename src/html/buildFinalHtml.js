import buildFinalMarkup from './buildFinalMarkup';

/**
 *
 * @param strings
 * @param paramIndexToToken
 * @param attributePlaceholders
 * @param tagPlaceholders
 * @param passedData
 * @returns {HTMLDivElement}
 */
const buildFinalHtml = ({
  strings,
  paramIndexToToken,
  attributePlaceholders,
  tagPlaceholders,
  passedData,
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
