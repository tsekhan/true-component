import getDataAttributeSet from './getDataAttributeSet';
import instantiateNodes from './instantiateNodes';

const FAKE_INDEX_PREFIX = 'mikola';

const html = function (strings, ...data) {
  const dataMap = new Map();

  const fakeDataKeys = data.map((dataItem) => {
    let fakeDataKey;

    do {
      fakeDataKey = `${FAKE_INDEX_PREFIX}-${Math.random().toString()}`;
    } while (dataMap.has(fakeDataKey));

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
  const satelliteData = new Map();
  const fakeHtml = new DOMParser().parseFromString(fakeMarkup, 'text/html').body;
  const dataAttributesSet = getDataAttributeSet(fakeHtml, dataMap);

  strings.forEach((string, index) => {
    resultingMarkup += string;

    if (dataAttributesSet.has(fakeDataKeys[index])) {
      const fakeKey = fakeDataKeys[index];
      resultingMarkup += fakeKey;

      const data = dataMap.get(fakeKey);
      satelliteData.set(fakeKey, data);
    } else if (fakeDataKeys[index]) {
      resultingMarkup += data[index];
    }
  });

  const container = document.createElement('div');
  container.innerHTML = resultingMarkup;

  instantiateNodes(container, satelliteData, dataAttributesSet);

  // TODO Return evertything except container
  return container;
};

export default html;
