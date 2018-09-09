// https://stackoverflow.com/questions/8024149/is-it-possible-to-get-the-non-enumerable-inherited-property-names-of-an-object

export default function getAllPropertyNames(obj) {
  const propsSet = new Set();

  do {
    Object.getOwnPropertyNames(obj).forEach(propertyName => propsSet.add(propertyName));
  } while ((obj = Object.getPrototypeOf(obj)) && obj instanceof Object);

  propsSet.delete('constructor');

  return Array.from(propsSet);
}