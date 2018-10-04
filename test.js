const { Component, registerClass, html, Ref } = window.WC;

class CustomComponent extends Component {
  static get tag() {
    return 'tag-tag';
  }

  constructor(config, children) {
    super(config, children);

    const span = [];

    const ref = new Ref();

    for (let i = 0; i < 10; i++) {
      span.push(html`X:<span ref="${ref}" d>Mikola${i}</span>`);
    }

    console.log(ref);

    this.template = html`
    <div>Div</div>
    ${(() => {
    return html`${span}`;
  })()}
    `;
  }
}

document.body.appendChild(new CustomComponent());
