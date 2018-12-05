import generateTagByKey from './generateTagByKey';

const buildFakeTagMarkup = (tokenToParam, indexToToken, strings) => {
  let fakeMarkup = '';

  strings.forEach((string, index) => {
    fakeMarkup += string;

    const fakeDataToken = indexToToken[index];

    if (fakeDataToken && tokenToParam.has(fakeDataToken)) {
      fakeMarkup += generateTagByKey(fakeDataToken);
    }
  });

  return `<body><template>${fakeMarkup}</template></body>`;
};

export default buildFakeTagMarkup;
