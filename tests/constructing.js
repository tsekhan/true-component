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

    assert.isTrue(instance instanceof Component);
    assert.isTrue(instance instanceof CustomComponent);

    assert.isTrue(instance.exampleField === 42);
  }),

  describe('Instantiate component as a tag in html``', () => {
    const instance = html`<component-example></component-example>`;

    assert.isTrue(instance instanceof Component);
    assert.isTrue(instance instanceof CustomComponent);

    assert.isTrue(instance.exampleField === 42);
  }),

  describe('Instantiate component as a tag in html`` with children', () => {
    const instance = html`
      <component-example>
        <component-example>
          <span class="test"></span>
        </component-example>
      </component-example>
    `;

    assert.isTrue(instance.children[0] instanceof Component);
    assert.isTrue(instance.children[0] instanceof CustomComponent);

    assert.equal(instance.children[0].children[0].className, 'test');
  }),
]);