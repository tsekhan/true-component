import nodeRegistry from './nodeRegistry';

/**
 * Add provided class to internal register to associate with HTML custom component tag.
 *
 * @param Class - class to be associated with tag.
 * @param tag - tag name. Should meet custom element name specification
 * (https://stackoverflow.com/questions/22545621/do-custom-elements-require-a-dash-in-their-name).
 */
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
