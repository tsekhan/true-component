import chai from 'chai';

const { assert } = chai;

import { HtmlComponent, html, registerClass } from './import';

describe('Construction tests', () => {
  let CustomComponent;

  beforeEach(() => {
    CustomComponent = class extends HtmlComponent {
      static get tag() {
        return 'component-example';
      }

      constructor(...params) {
        super(...params);

        this.exampleField = 42;
      }
    };

    registerClass(CustomComponent);
  });

  it('Instantiate component by calling of new HtmlComponent()', () => {
    const instance = new CustomComponent();

    assert.isTrue(instance instanceof HtmlComponent);
    assert.isTrue(instance instanceof CustomComponent);

    assert.equal(instance.exampleField, 42);
  });

  it('Instantiate component as a tag in html``', () => {
    const instance = html`<component-example></component-example>`;

    assert.isTrue(instance instanceof HtmlComponent, 'Not instance of HtmlComponent');
    assert.isTrue(instance instanceof CustomComponent, 'Not instance of CustomComponent');

    assert.isTrue(instance.exampleField === 42);
  });

  it('Instantiate component as a tag in html`` with children', () => {
    const instance = html`
      <component-example>
        <component-example>
          <span class="test"></span>
        </component-example>
      </component-example>
    `;

    assert.isTrue(instance.children[0] instanceof HtmlComponent, 'Not an instance of HtmlComponent');
    assert.isTrue(instance.children[0] instanceof CustomComponent, 'Not an instance of CustomComponent');

    assert.equal(instance.children[0].children[0].className, 'test');
  });

  it('Set and change custom component template', () => {
    const TEMPLATE_1 = '123';
    const TEMPLATE_2 = '456';

    let Component = class extends HtmlComponent {
      static get template() {
        return TEMPLATE_1;
      }
    };

    let instance = new Component();

    assert.equal(instance.shadowRoot.textContent, TEMPLATE_1);

    instance.template = TEMPLATE_2;
    assert.equal(instance.shadowRoot.textContent, TEMPLATE_2);
  });
});
