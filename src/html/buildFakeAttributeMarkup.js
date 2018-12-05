const buildFakeAttributeMarkup = (tokenToParam, indexToToken, strings) => {
  let fakeMarkup = '';

  strings.forEach((string, index) => {
    fakeMarkup += string;

    const fakeDataToken = indexToToken[index];

    if (fakeDataToken && tokenToParam.has(fakeDataToken)) {
      fakeMarkup += fakeDataToken;
    }
  });

  return `<body><template>${fakeMarkup}</template></body>`;
};

export default buildFakeAttributeMarkup;
