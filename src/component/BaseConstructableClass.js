import dataStore from '../dataStore/dataStore';

class BaseConstructableClass {
  constructor(config) {
    const rootElement = document.createElement('div');

    Object.assign(rootElement, config);

    Object.defineProperty(rootElement, 'template', {
      set: function (template) {
        template.satelliteData.forEach((value, key) => dataStore.set(key, value));
        this.innerHTML = template.templateString;
        template.satelliteData.forEach((value, key) => dataStore.delete(key));
      }
    });

    return rootElement;
  }
}

export default BaseConstructableClass;
