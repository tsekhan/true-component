import buildFakeHtml from '../buildFakeHtml';
import scanForTags from './scanForTags';

const getTagPlaceholders = (fakeMarkup, tokenToParam) => {
  const node = buildFakeHtml(fakeMarkup);

  return scanForTags(node, tokenToParam);
};

export default getTagPlaceholders;
