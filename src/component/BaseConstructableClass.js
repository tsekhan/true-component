import { ROOT_TAG_NAME } from './RootNodeClass';
import dataStore from '../dataStore/dataStore';

class BaseConstructableClass {
  constructor(config) {
    const element = document.createElement(ROOT_TAG_NAME);

    Object.assign(element, config);

    Object.defineProperty(element, 'template', {
      set: function (template) {

        template.satelliteData.forEach((value, key) => dataStore.set(key, value));
        this.innerHTML = template.templateString;
        template.satelliteData.forEach((value, key) => dataStore.delete(key));
      }
    });

    return element;
  }
}

export default BaseConstructableClass;
