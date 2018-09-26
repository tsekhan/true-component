const { Component, registerClass, html } = window.WC;

class Test extends Component {
  static get tag() {
    return 'span-olo';
  }

  constructor(config) {
    super(config);

    if (this.a) {
      this.appendChild(html`
        <div>
          ${this.a.a}
          ${this.a.b}
        </div>
      `);
    }
  }

  sing() {
    console.log('Song!');
  }
}

registerClass(Test);

document.body.appendChild(html`<div><p><span-olo a="${{ a: 'Mikola', b: 'Tsekhan' }}"></span-olo></p></div>`);
