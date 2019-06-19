const getRandomizedToken = () => Math.random().toString(36).substr(2);

const isString = (obj) => !(obj instanceof String) && typeof obj !== 'string';

const generateTemplateParams = (strings, params) => {
  const tokenToParam = new Map();

  const templateWithoutParams = strings.join();

  const indexToToken = params.map(param => {
    let key;

    // Generate unique token
    do {
      key = `token-${getRandomizedToken()}`;
    } while (
      tokenToParam.has(key) &&
      templateWithoutParams.indexOf(key) === '-1'
    );

    if (isString(param)) {
      tokenToParam.set(key, param);
    }

    return key;
  });

  return {
    tokenToParam,
    indexToToken,
  };
};

export default generateTemplateParams;
