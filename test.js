const { WebComponent, registerClass } = window.WC;

const ExampleElementTemp = class extends WebComponent {
  constructor() {
    super();

    this.template = '<div>Ololosh</div><div>Tse</div>';
    console.log(this.innerHTML);
  }

  sing() {
    console.log('Song!');
  }
};

class ExampleElementTemp2 extends ExampleElementTemp {
  mikola() {
    console.log('du');
  }
}

const ExampleElement = registerClass('a-a', ExampleElementTemp2);

const body = document.getElementsByTagName('body')[0];

const a = new ExampleElement();
console.log(a);
body.appendChild(a);
a.sing();
a.mikola();

const b = document.createElement('a-a');
body.appendChild(b);
b.sing();
b.mikola();
