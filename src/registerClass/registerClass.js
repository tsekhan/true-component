import getAllPropertyNames from './getAllPropertyNames';
import { ROOT_TAG_NAME } from '../component/RootNodeClass';
import dataStore from '../dataStore/dataStore';

function registerClass(tag, Class) {
  const WebComponentClass = class extends HTMLElement {
    constructor() {
      super();

      const shadowRoot = this.attachShadow({ mode: 'closed' });

      const props = {};

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
      if (classInstance.tagName.toLowerCase() === ROOT_TAG_NAME) {
        Array.from(classInstance.childNodes).forEach(node => {
          shadowRoot.appendChild(node);
        });
      } else {
        shadowRoot.appendChild(classInstance);
      }
    }
  };

  const classPropertyNames = getAllPropertyNames(Class.prototype);
  classPropertyNames.forEach(propertyName => {
    WebComponentClass.prototype[propertyName] = Class.prototype[propertyName];
  });

  customElements.define(tag, WebComponentClass);

  return class {
    constructor() {
      return document.createElement(tag);
    }
  };
}

export default registerClass;
