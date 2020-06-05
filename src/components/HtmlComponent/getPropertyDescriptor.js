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
  if (Object.prototype.hasOwnProperty.call(obj, property)) {
    return Object.getOwnPropertyDescriptor(obj, property);
  }

  const objPrototype = Object.getPrototypeOf(obj);

  return objPrototype === null ? undefined : getPropertyDescriptor(objPrototype, property);
};

export default getPropertyDescriptor;
