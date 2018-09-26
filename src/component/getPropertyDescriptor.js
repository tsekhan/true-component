export default function getPropertyDescriptor(obj, property) {
  if (obj === null) {
    return;
  }
  if (obj.hasOwnProperty(property)) {
    return Object.getOwnPropertyDescriptor(obj, property);
  } else {
    return getPropertyDescriptor(Object.getPrototypeOf(obj), property);
  }
}
