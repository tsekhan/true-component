/**
 * Get all object property names (own or not own).
 *
 * @memberOf module:HtmlComponent
 * @param {object} subject - object to be analyzed.
 * @returns {string[]} Returns array of property names.
 * @see https://stackoverflow.com/questions/8024149/is-it-possible-to-get-the-non-enumerable-inherited-property-names-of-an-object
 */
const getAllPropertyNames = (subject) => {
  const propsSet = new Set();

  let obj = subject;

  do {
    Object.getOwnPropertyNames(obj).forEach(propertyName => propsSet.add(propertyName));
  } while ((obj = Object.getPrototypeOf(obj)) && obj instanceof Object);

  propsSet.delete('constructor');

  return Array.from(propsSet);
};

export default getAllPropertyNames;
