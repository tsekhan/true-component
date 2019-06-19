import nodeRegistry from './nodeRegistry';

function registerClass(Class, tag = Class.tag) {
  if (nodeRegistry.has(tag)) {
    console.warn(`Re-registering of <${tag} /> may cause usage of invalid component.`);
  }

  nodeRegistry.set(tag.toLowerCase(),
    Class.tag ? Class : (class extends Class {
      static get tag() {
        return tag;
      }
    }));
}

export default registerClass;
