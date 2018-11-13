import getTagPlaceholders from './getTagPlaceholders';
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

    const fakeDataKey = fakeDataKeys[index];
    if (fakeDataKey && dataMap.has(fakeDataKey)) {
      fakeMarkup += fakeDataKey;
    }
  });

  let resultingMarkup = '';

  fakeMarkup = `<body><template>${fakeMarkup}</template></body>`;

  const fakeHtml = new DOMParser().parseFromString(fakeMarkup, 'text/html').body.firstChild.content;
  const dataPlaceholders = getTagPlaceholders(fakeHtml, dataMap);

  strings.forEach((string, index) => {
    resultingMarkup += string;

    if (dataPlaceholders.has(fakeDataKeys[index])) {
      resultingMarkup += fakeDataKeys[index];
    } else if (fakeDataKeys[index]) {
      resultingMarkup += params[index];
    }
  });

  const templateContainer = document.createElement('template');
  templateContainer.innerHTML = resultingMarkup.trim();

  const container = document.createElement('div');
  const templateContainerChildren = Array.from(templateContainer.content.childNodes);
  templateContainerChildren.forEach(child => {
    container.appendChild(child);
  });

  instantiateNodes(container, dataMap, dataPlaceholders);

  if (container.childNodes.length === 1) {
    return container.firstChild;
  } else {
    return container.childNodes;
  }
};

export default html;
