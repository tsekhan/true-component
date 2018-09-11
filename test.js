const { WebComponent, registerClass, html } = window.WC;

class A1 extends WebComponent {
  constructor(config) {
    super(config);

    const param = {
      a: 'One',
      b: 'Two',
    };
    this.template = html`
<div>
    <b-b a="${'text'}" b="${param}${{ a: 1 }}" c="${{ a: 1 }}">
        Ololosh
    </b-b>
</div>
Tse${123}
`;
    console.log(this.innerHTML);
  }

  sing() {
    // console.log('Song!');
  }
}

class A2 extends A1 {
  mikola() {
    // console.log('du');
  }
}

class B1 extends WebComponent {
  constructor(config) {
    super(config);

    this.template = html`<span>${this.props.a}</span><span>${this.props.b}</span><span>${this.props.c.a}</span>`;
  }
}

registerClass('b-b', B1);
const ExampleElement = registerClass('a-a', A2);

const body = document.getElementsByTagName('body')[0];

const a = new ExampleElement();
body.appendChild(a);
a.sing();
a.mikola();

const b = document.createElement('a-a');
body.appendChild(b);
b.sing();
b.mikola();
