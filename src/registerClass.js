import nodeRegistry from './nodeRegistry';

function registerClass(Class, tag = Class.tag) {
  const AssociatedClass = class extends HTMLElement {};

  customElements.define(tag, AssociatedClass);
  nodeRegistry.set(
    tag.toLowerCase(),
    Class.tag ? Class : (class extends Class {
      static get tag() {
        return tag;
      }
    })
  );
}

export default registerClass;
