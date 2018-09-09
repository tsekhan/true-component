import getAllPropertyNames from './registerClass/getAllPropertyNames';

customElements.define('web-component-root', class extends HTMLElement {
});

const WebComponent = class {
  constructor() {
    const element = document.createElement('web-component-root');

    Object.defineProperty(element, 'template', {
      set: function (template) {
        this.innerHTML = template;
      }
    });

    return element;
  }
};

function registerClass(tag, Class) {
  const WebComponentClass = class extends HTMLElement {
    constructor() {
      super();

      const shadowRoot = this.attachShadow({ mode: 'closed' });

      const classInstance = new Class();
      if (classInstance.tagName.toLowerCase() === 'web-component-root') {
        Array.from(classInstance.childNodes).forEach(node => {
          shadowRoot.appendChild(node);
        });
      } else {
        shadowRoot.appendChild(classInstance);
      }
    }
  };

  const classPropertyNames = getAllPropertyNames(Class.prototype);
  console.log(classPropertyNames);
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

export { WebComponent, registerClass };
