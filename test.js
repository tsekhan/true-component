const { Component, registerClass, html } = window.WC;

class CustomComponent extends Component {
  static get tag() {
    return 'tag-tag';
  }

  constructor(config, children) {
    super(config, children);

    const span = [];

    for (let i = 0; i < 10; i++) {
      span.push(html`X:<span>Mikola${i}</span>`);
    }

    this.template = html`
    <div>Div</div>
    ${(() => {
    return html`${span}`;
  })()}
    `;
  }
}

document.body.appendChild(new CustomComponent());
