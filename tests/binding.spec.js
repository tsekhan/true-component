import chai from 'chai';

const { assert } = chai;

import {
  $, html, HtmlComponent, registerClass,
} from './import';

describe('Binders', () => {
  it('should update text', () => {
    const INITIAL_TEXT_VALUE = 'Initial Text';
    const NEW_TEXT_VALUE = 'New Text';

    const instance = new $(INITIAL_TEXT_VALUE);

    assert.isTrue(instance instanceof Text);
    assert.equal(instance.wholeText, INITIAL_TEXT_VALUE, 'Displayed text is not equal to initial value assigned.');

    instance.value = NEW_TEXT_VALUE;

    // Testing what user see in browser
    assert.equal(instance.wholeText, NEW_TEXT_VALUE, 'Displayed text is not equal to value assigned.');

    // Testing what getter returns
    assert.equal(instance.value, NEW_TEXT_VALUE, 'Getter returns value different from assigned.');
  });

  it('should update object inner field after changing attribute', () => {
    const CustomComponent = class extends HtmlComponent {
      static get tag() {
        return 'binding-example';
      }
    };

    registerClass(CustomComponent);

    const INITIAL_TEXT_VALUE = 'Initial Text';

    const boundValue = new $(INITIAL_TEXT_VALUE);

    const instance = html`
      <binding-example target=${boundValue}></binding-example>
    `;

    assert.equal(instance.target, INITIAL_TEXT_VALUE);

    const NEW_TEXT_VALUE = 'New Text';
    boundValue.value = NEW_TEXT_VALUE;

    assert.equal(instance.target, NEW_TEXT_VALUE);
  });
});
