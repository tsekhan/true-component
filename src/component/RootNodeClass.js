const ROOT_TAG_NAME = 'web-component-root';

class RootNodeClass extends HTMLElement {
}

customElements.define(ROOT_TAG_NAME, RootNodeClass);

export { ROOT_TAG_NAME };
