/**
 * Get property descriptor despite of is it own property or not.
 *
 * @memberOf module:HtmlComponent
 * @param {*} obj - object which has provided property.
 * @param {string} property - name of property.
 * @returns {undefined|PropertyDescriptor} Returns property descriptor.
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor
 */
const getPropertyDescriptor = (obj, property) => {
  if (obj === null) {
    return undefined;
  }
  if (Object.prototype.hasOwnProperty.call(obj, property)) {
    return Object.getOwnPropertyDescriptor(obj, property);
  } else {
    return getPropertyDescriptor(Object.getPrototypeOf(obj), property);
  }
};

export default getPropertyDescriptor;
