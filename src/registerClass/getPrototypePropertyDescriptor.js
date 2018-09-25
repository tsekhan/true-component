export default function getPrototypePropertyDescriptor(obj, property) {
  if (obj === null) {
    return {};
  }
  if (obj.prototype.hasOwnProperty(property)) {
    return Object.getOwnPropertyDescriptor(obj.prototype, property);
  } else {
    return getPrototypePropertyDescriptor(obj.__proto__, property);
  }
}
