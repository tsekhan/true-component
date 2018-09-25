import getAllPropertyNames from './getAllPropertyNames';
import dataStore from '../dataStore/dataStore';
import getPrototypePropertyDescriptor from './getPrototypePropertyDescriptor';

function registerClass(tag, Class) {
  const WebComponentClass = class extends HTMLElement {
    constructor() {
      super();

      const shadowRoot = this.attachShadow({ mode: 'open' });

      const props = {};

      console.log(tag, this.attributes[0]);

      for (let i = 0; i < this.attributes.length; i++) {
        const attribute = this.attributes[i];

        let propValue = attribute.value;

        if (dataStore.has(propValue)) {
          propValue = dataStore.get(propValue);
        }
        props[attribute.name] = propValue;
      }

      const classInstance = new Class({
        props,
      });


      const classPropertyNames = getAllPropertyNames(classInstance);
      classPropertyNames.forEach(propertyName => {
        if (
          propertyName !== 'attributes' &&
          propertyName !== 'addEventListener'
        ) {
          Object.defineProperty(this, propertyName, {
            get: () => Reflect.get(classInstance, propertyName),
            set: value => Reflect.set(classInstance, propertyName, value),
          });
        }
      });

      this.shadowRoot = shadowRoot;

      shadowRoot.appendChild(classInstance);

      if (tag === 'b-b') {
        this.addEventListener('click', () => {
          console.log(this.sing());
          console.log(this.attributes);
        });
      }

      if (tag === 'a-a') {
        this.addEventListener('click', () => {
          console.log(this.childNodes[1].childNodes[1].attributes);
        });
      }
    }
  };

  const classPropertyNames = getAllPropertyNames(Class.prototype);
  classPropertyNames.forEach(propertyName => {

    const propertyDescriptor = getPrototypePropertyDescriptor(Class, propertyName);
    Object.defineProperty(WebComponentClass.prototype, propertyName, propertyDescriptor);
  });

  customElements.define(tag, WebComponentClass);

  return class {
    constructor() {
      return document.createElement(tag);
    }
  };
}

export default registerClass;
