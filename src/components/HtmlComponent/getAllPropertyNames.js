// https://stackoverflow.com/questions/8024149/is-it-possible-to-get-the-non-enumerable-inherited-property-names-of-an-object

/**
 * Get all object property names (own or not own).
 *
 * @param {object} subject - object to be analyzed.
 * @returns {string[]} Returns array of property names.
 */
export default function getAllPropertyNames(subject) {
  const propsSet = new Set();

  let obj = subject;

  do {
    Object.getOwnPropertyNames(obj).forEach(propertyName => propsSet.add(propertyName));
  } while ((obj = Object.getPrototypeOf(obj)) && obj instanceof Object);

  propsSet.delete('constructor');

  return Array.from(propsSet);
}
