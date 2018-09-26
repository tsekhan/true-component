import nodeStore from '../nodeStore/nodeStore';

function registerClass(Class, tag) {
  customElements.define(tag || Class.tag, class extends HTMLElement {
    constructor() {
      super();
      nodeStore.set(this, Class);
    }
  });
}

export default registerClass;
