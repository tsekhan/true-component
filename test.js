const { Component, registerClass, html } = window.WC;

class Test extends Component {
  static get tag() {
    return 'span-olo';
  }

  constructor(config, children) {
    super(config, children);

    if (this.a) {
      this.template = html`
        <div>
          ${this.a.a}
          ${this.a.b}
          ${this.a.c}
        </div>
        <slot></slot>
      `;
    }
  }

  sing() {
    console.log('Song!');
  }
}

registerClass(Test);

console.time('component');
for (let i = 0; i < 1; i++) {
  const node = html`<span>Node1</span> <span>Node2</span>`;
  document.body.appendChild(html`
  <div>
    <span>
      <span-olo a="${{ a: 'Mikola', b: 'Tsekhan', c: node }}">
        Just text<div>Tag</div>
      </span-olo>
    </span>
  </div>
`);
}
console.timeEnd('component');
