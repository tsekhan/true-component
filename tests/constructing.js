import {assert} from 'chai';
import describe from '../tester/describe';

import {Component, html, registerClass} from '../src';

class CustomComponent extends Component {
  static get tag() {
    return 'component-example';
  }

  constructor(...params) {
    super(...params);

    this.exampleField = 42;
  }
}

export default describe('Construction tests', [
  describe('Instantiate component by calling of new Component()', () => {
    const instance = new CustomComponent();

    assert(instance instanceof Component);

    assert(instance.exampleField === 42);
  }),

  describe('Instantiate component as a tag in html``', () => {
    const instance = html`<component-example></component-example>`;

    assert(instance instanceof Component);

    assert(instance.exampleField === 42);
  }),
]);
