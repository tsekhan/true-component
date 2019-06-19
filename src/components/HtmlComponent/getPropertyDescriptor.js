export default function getPropertyDescriptor(obj, property) {
  if (obj === null) {
    return;
  }
  if (Object.prototype.hasOwnProperty.call(obj, property)) {
    return Object.getOwnPropertyDescriptor(obj, property);
  } else {
    return getPropertyDescriptor(Object.getPrototypeOf(obj), property);
  }
}
