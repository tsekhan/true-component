import getDataPlaceholders from './getDataPlaceholders';
import instantiateNodes from './instantiateNodes';
import getFakeDataKey from './getFakeDataKey';

const getRandomizedToken = () => Math.random().toString(36).substr(2);

const html = function (strings, ...params) {
  const dataMap = new Map();

  const fakeDataKeys = params.map((dataItem) => {
    let fakeDataKey;

    const joinedStrings = strings.join();

    do {
      const randomizedToken = getRandomizedToken();
      fakeDataKey = getFakeDataKey(`token-${randomizedToken}`);
    } while (
      dataMap.has(fakeDataKey) &&
      joinedStrings.indexOf(fakeDataKey) === '-1'
    );

    if (
      !(dataItem instanceof String)
      && typeof dataItem !== 'string'
    ) {
      dataMap.set(fakeDataKey, dataItem);
    }

    return fakeDataKey;
  });

  let fakeMarkup = '';
  strings.forEach((string, index) => {
    fakeMarkup += string;

    if (fakeDataKeys[index]) {
      fakeMarkup += fakeDataKeys[index];
    }
  });

  let resultingMarkup = '';
  const fakeHtml = new DOMParser().parseFromString(fakeMarkup, 'text/html').body;
  const dataPlaceholders = getDataPlaceholders(fakeHtml, dataMap);
  console.log(fakeHtml);
  console.log(fakeMarkup);

  strings.forEach((string, index) => {
    resultingMarkup += string;

    // TODO Implement adding of nodes
    if (dataPlaceholders.has(fakeDataKeys[index])) {
      resultingMarkup += fakeDataKeys[index];
    } else if (fakeDataKeys[index]) {
      resultingMarkup += params[index];
    }
  });

  const container = document.createElement('div');
  container.innerHTML = resultingMarkup.trim();

  instantiateNodes(container, dataMap, dataPlaceholders);

  if (container.childNodes.length === 1) {
    return container.childNodes[0];
  } else {
    return container.childNodes;
  }
};

export default html;
