import buildFakeHtml from '../buildFakeHtml';
import scanNodeForTagPlaceholders from './scanNodeForTagPlaceholders';

/**
 * Find tags which has name mentioned in provided token map.
 *
 * @memberOf module:html
 * @param {string} fakeMarkup - Markup where variables are replaced by generated placeholders.
 * @param {Set.<string>} tokens - Tokens to try to find.
 * @returns {Map<string, PLACEHOLDER_ROLES.TAG>} Tokens which are substitutions for tags.
 */
const getTagPlaceholders = (fakeMarkup, tokens) => {
  const node = buildFakeHtml(fakeMarkup);

  return scanNodeForTagPlaceholders(node, tokens);
};

export default getTagPlaceholders;
