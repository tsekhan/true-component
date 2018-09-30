import nodeStore from '../nodeStore/nodeStore';

function registerClass(Class, tag) {

  const AssociatedClass = class extends HTMLElement {
    constructor() {
      super();

      nodeStore.set(this, Class);
    }
  };

  customElements.define(
    tag || Class.tag,
    AssociatedClass,
  );
}

export default registerClass;
