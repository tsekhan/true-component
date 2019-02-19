import 'chai';

describe('Binders', () => {
  let CustomComponent;

  it('should update', () => {
    const instance = new CustomComponent();

    assert.isTrue(instance instanceof HtmlComponent);
    assert.isTrue(instance instanceof CustomComponent);

    assert.equal(instance.exampleField, 42);
  });
});
