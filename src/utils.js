/** @module utils */

/**
 * Determine if provided object is string
 *
 * @memberOf module:html
 * @param {*} obj - object to test.
 * @returns {boolean} Returns true if provided object is string.
 */
const isString = (obj) => obj instanceof String || typeof obj === 'string';

/**
 * Check if provided object is iterable.
 *
 * @param {*} obj - Object to test.
 * @returns {boolean} Returns true if `obj` can be iterated, otherwise returns false.
 */
const isIterable = obj => obj &&
  !isString(obj) &&
  typeof obj[Symbol.iterator] === 'function';

/**
 * Expose all items from nested arrays into one-dimensional array.
 *
 * @param {(Array|*)} array - Object to be flattened.
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

export { isString, isIterable, flattenArray };
