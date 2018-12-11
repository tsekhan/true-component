import getAllPropertyNames from './getAllPropertyNames';
import getPropertyDescriptor from './getPropertyDescriptor';
import registerClass from '../registerClass';
import { isIterable } from '../utils';
import Ref from '../Ref';
import nodeRegistry from '../nodeRegistry';

const DEFAULT_TAG = 'component-wc';

class Component {
  constructor(config, children) {
    const Class = Object.getPrototypeOf(this).constructor;
    const tag = Class.tag || DEFAULT_TAG;

    if (
      tag &&
      tag.indexOf('-') !== -1
      && !nodeRegistry.has(tag)
    ) {
      registerClass(Class, tag);
    }

    const rootElement = document.createElement(tag);

    const shadowRoot = rootElement.attachShadow({ mode: 'open' });

    Object.defineProperty(rootElement, 'template', {
      set: template => {
        while (shadowRoot.firstChild) {
          shadowRoot.removeChild(shadowRoot.firstChild);
        }

        if (typeof template === 'string' || template instanceof String) {

          // XXX Non-standard property
          shadowRoot.innerHTML = template;
        } else if (isIterable(template)) {
          Array.from(template).forEach(templateItem => {
            shadowRoot.appendChild(templateItem);
          });
        } else {
          shadowRoot.appendChild(template);
        }
      },

      get: () => {
        if (shadowRoot.childNodes.length === 0) {
          return;
        } else if (shadowRoot.childNodes.length === 1) {
          return shadowRoot.firstChild;
        }

        return shadowRoot.childNodes;
      },
    });

    const rootElementMixin = {};

    const fakePrototype = new Proxy({}, {
      getPrototypeOf: () => {
        return rootElementMixin;
      },

      setPrototypeOf: (target, prototype) => {
        Object.setPrototypeOf(rootElementMixin, prototype);

        return true;
      },

      isExtensible: () => {
        return Object.isExtensible(rootElementMixin);
      },

      preventExtensions: (oTarget) => {
        Object.preventExtensions(oTarget);
        Object.preventExtensions(rootElementMixin);

        return !Object.isExtensible(rootElementMixin);
      },

      getOwnPropertyDescriptor: function (oTarget, sKey) {
        return Object.getOwnPropertyDescriptor(rootElementMixin, sKey);
      },

      defineProperty: function (oTarget, sKey, oDesc) {
        Object.defineProperty(oTarget, sKey, oDesc);
        const newDesc = Object.assign({}, oDesc);

        if (oDesc.get) {
          newDesc.get = oDesc.get.bind(rootElement);
        }

        return Object.defineProperty(rootElementMixin, sKey, newDesc);
      },

      has: function (oTarget, sKey) {
        return sKey in rootElementMixin;
      },

      get: function (oTarget, sKey) {
        return rootElementMixin[sKey];
      },

      set: function (oTarget, sKey, vValue) {
        rootElementMixin[sKey] = vValue;

        return true;
      },

      deleteProperty: function (oTarget, sKey) {
        return delete rootElementMixin[sKey];
      },

      ownKeys: function () {
        return Object.getOwnPropertyNames(rootElementMixin);
      },
    });
    Object.setPrototypeOf(rootElementMixin, Object.getPrototypeOf(this));

    getAllPropertyNames(rootElement).forEach(propertyName => {
      if (!(propertyName in this)) {
        const propertyDescriptor = getPropertyDescriptor(rootElement, propertyName);
        Object.defineProperty(fakePrototype, propertyName, propertyDescriptor);
      }
    });

    Object.setPrototypeOf(rootElement, fakePrototype);

    if (children) {
      Array.from(children).forEach(child => {
        rootElement.appendChild(child);
      });
    }

    if (config) {
      Object.assign(rootElement, config);

      if (config.ref && config.ref instanceof Ref) {
        config.ref.node = rootElement;
      }
    }

    return rootElement;
  }
}

export default Component;
