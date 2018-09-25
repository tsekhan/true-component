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
        <b-b a="${'text'}" b="${param}" c="${{ a: 1 }}">
          Ololosh
        </b-b>
      </div>
      Tse${123}
`;
    this.sing = () => {
      console.log('Song!');
    };
  }

  set xxx(value) {
    // console.log('XXX', value);
  }

  mikola() {
    // console.log('First');
  }
}

class A2 extends A1 {
  mikola() {
    console.log('du');
  }
}

class B1 extends WebComponent {

  constructor(config) {
    super(config);

    this.template = html`<slot></slot><span>${this.props.a}</span><span>${this.props.b.a}</span><span>${this.props.c.a}</span>`;
  }
}

registerClass('b-b', B1);
const ExampleElement = registerClass('a-a', A2);

const body = document.body;

const a = new ExampleElement();
a.sing();
body.appendChild(a);
// a.mikola();
// a.template = html`text`;
Object.defineProperty(a, 'mi', {
  set: function (value) {
    // console.log(this.sing());
    // console.log('value', value);
  }
});
a.mi = 'OOO';
a.xxx = '123';

const b = document.createElement('a-a');

body.appendChild(b);
b.sing();
b.mikola();
// b.template = html`text`;
Object.defineProperty(b, 'mi', {
  set: function (value) {
    // console.log('value', value);
  }
});
b.mi = 'OOO';
