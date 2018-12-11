import 'chai';

describe('Construction tests', () => {
  let CustomComponent;

  beforeEach(() => {
    CustomComponent = class extends Component {
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

  it('Instantiate component by calling of new Component()', () => {
    const instance = new CustomComponent();

    assert.isTrue(instance instanceof Component);
    assert.isTrue(instance instanceof CustomComponent);

    assert.equal(instance.exampleField, 42);
  });

  it('Instantiate component as a tag in html``', () => {
    const instance = html`<component-example></component-example>`;

    assert.isTrue(instance instanceof Component, 'Not instance of Component');
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

    assert.isTrue(instance.children[0] instanceof Component, 'Not instance of Component');
    assert.isTrue(instance.children[0] instanceof CustomComponent, 'Not instance of CustomComponent');

    assert.equal(instance.children[0].children[0].className, 'test');
  });
});
