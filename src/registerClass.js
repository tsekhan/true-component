import nodeRegistry from './nodeRegistry';

/**
 * Add provided class to internal register to associate with HTML custom component tag.
 *
 * @global
 * @name registerClass
 * @param Class - Class to be associated with tag.
 * @param [tag] - Tag name. Should meet custom element name specification.
 * @see {@link https://stackoverflow.com/questions/22545621/do-custom-elements-require-a-dash-in-their-name}.
 */
export default (Class, tag = Class.tag) => {
  if (nodeRegistry.has(tag)) {
    console.warn(`Re-registering of <${tag} /> may cause usage of wrong component.`);
  }

  nodeRegistry.set(
    tag.toLowerCase(),
    Class.tag ? Class : (class extends Class {
      static get tag() {
        return tag;
      }
    }),
  );
};
