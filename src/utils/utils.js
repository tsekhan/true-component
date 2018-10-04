const isIterable = obj => {
  return typeof obj[Symbol.iterator] === 'function';
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

export default {
  isIterable,
  flattenArray,
};
export { isIterable, flattenArray }