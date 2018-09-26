import getAllPropertyNames from './getAllPropertyNames';
import getPropertyDescriptor from './getPropertyDescriptor';
import registerClass from '../registerClass/registerClass';

const DEFAULT_TAG = 'component-wc';

class Component {
  constructor(config) {
    const Class = Object.getPrototypeOf(this).constructor;
    const tag = Class.tag || DEFAULT_TAG;

    if (
      tag &&
      tag.indexOf('-') !== -1
      && customElements.get(tag) === undefined
    ) {
      registerClass(Class, tag);
    }

    const rootElement = document.createElement(tag);

    const fakePrototype = {};
    Object.setPrototypeOf(fakePrototype, Object.getPrototypeOf(this));

    getAllPropertyNames(rootElement).forEach(propertyName => {
      if (!getPropertyDescriptor(this, propertyName)) {
        const propertyDescriptor = getPropertyDescriptor(rootElement, propertyName);
        Object.defineProperty(fakePrototype, propertyName, propertyDescriptor);
      }
    });

    Object.setPrototypeOf(rootElement, fakePrototype);

    Object.assign(rootElement, config);

    return rootElement;
  }
}

export default Component;
