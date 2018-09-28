import nodeStore from '../nodeStore/nodeStore';

function registerClass(Class, tag) {

  const AssociatedClass = class extends HTMLElement {
    constructor() {
      super();
      const shadowRoot = this.attachShadow({ mode: 'open' });

      Object.defineProperty(this, 'template', {
        set: template => {
          if (typeof template === 'string' || template instanceof String) {

            // XXX Non-standard property
            shadowRoot.innerHTML = template;
          } else if(template instanceof NodeList) {
            Array.from(template).forEach(templateItem => {
              shadowRoot.appendChild(templateItem);
            });
          } else {
            shadowRoot.appendChild(template);
          }
        }
      });

      nodeStore.set(this, Class);
    }
  };

  customElements.define(
    tag || Class.tag,
    AssociatedClass,
  );
}

export default registerClass;
