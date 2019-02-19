const isIterable = obj => {
  return obj &&
    typeof obj !== 'string' &&
    !(obj instanceof String) &&
    typeof obj[Symbol.iterator] === 'function';
};

const flattenArray = array => {
  let result = [];

  array.forEach(item => {
    if (isIterable(item)) {
      result = [ ...result, ...flattenArray(item) ];
    } else {
      result.push(item);
    }
  });

  return result;
};

export { isIterable, flattenArray };
