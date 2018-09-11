import getDataAttributeSet from './getDataAttributeSet';

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

  const parser = new DOMParser();
  const fakeHtml = parser.parseFromString(fakeMarkup, 'text/html').body;

  const dataAttributesSet = getDataAttributeSet(fakeHtml, dataMap);

  let resultingMarkup = '';
  const satelliteData = new Map();

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

  return {
    templateString: resultingMarkup,
    satelliteData,
  };
};

export { html, FAKE_INDEX_PREFIX };
export default html;
