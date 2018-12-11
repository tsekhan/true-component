import nodeRegistry from './nodeRegistry';

function registerClass(Class, tag = Class.tag) {
  const AssociatedClass = class extends HTMLElement {};

  if (nodeRegistry.has(tag)) {
    console.warn(`Re-registrering of <${tag} /> may cause usage of invalid component.`);
  }

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
