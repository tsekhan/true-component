/** @module HtmlComponent */

import getAllPropertyNames from './getAllPropertyNames';
import getPropertyDescriptor from './getPropertyDescriptor';
import registerClass from '../../registerClass';
import { isIterable } from '../../utils';
import Ref from '../../Ref';
import nodeRegistry from '../../nodeRegistry';
import $ from '../$';

const DEFAULT_TAG = 'component-wc';

class HtmlComponent {

  /**
   * @class
   * @param {object} config - Associative array (Object) with objects to be assigned as instance properties.
   * @param {Iterable} children - Child nodes for current node.
   * @returns {HTMLElement}
   */
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

    const binders = new Map();

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
          return undefined;
        } else if (shadowRoot.childNodes.length === 1) {
          return shadowRoot.firstChild;
        }

        return shadowRoot.childNodes;
      },
    });

    rootElement.$ = new Proxy({}, {
      get: function (oTarget, sKey) {
        if (!binders.has(sKey)) {
          binders.set(sKey, new $(rootElement[sKey]));
        }

        return binders.get(sKey);
      },
    });

    const rootElementMixin = {};

    const boundValues = new Map();

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
        let newValue = vValue;

        if (vValue instanceof $) {
          boundValues.set(sKey, vValue);
          newValue = vValue.value;

          vValue.registerCallback(() => {
            rootElementMixin[sKey] = vValue.value;

            if (binders.has(sKey)) {
              binders.get(sKey).value = vValue.value;
            }
          }, false);
        } else if (boundValues.has(sKey)) {
          boundValues.delete(sKey);
        }

        rootElementMixin[sKey] = newValue;

        if (binders.has(sKey)) {
          binders.get(sKey).value = newValue;
        }

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

export default HtmlComponent;
