/** @module utils */

/**
 * Check if provided object is iterable.
 *
 * @param {any} obj - Object to test.
 * @returns {boolean} Returns true if `obj` can be iterated, otherwise returns false.
 */
const isIterable = obj => {
  return obj &&
    typeof obj !== 'string' &&
    !(obj instanceof String) &&
    typeof obj[Symbol.iterator] === 'function';
};

/**
 * Expose all items from nested arrays into one-dimensional array.
 *
 * @param {(Array|any)} array - Object to be flattened.
 * @returns {Array} Returns array of non-iterable items found in `array` and it's nested objects.
 */
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
