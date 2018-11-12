import testCases from './index';

const {
  Component, registerClass, html, Ref,
} = window.WC;

class TestResults extends Component {
  static get tag() {
    return 'test-results';
  }

  constructor(config, children) {
    super(config, children);

    const runPromises = [];
    const tests = [];

    Object.values(testCases).forEach((testCase, index) => {
      const trRef = new Ref();
      const messageRef = new Ref();

      tests.push(html`
        <tr ref="${trRef}">
          <td>${index}</td>
          <td>${testCase.name}</td>
          <td>${testCase.description}</td>
          <td ref="${messageRef}"></td>
        </tr>
      `);

      console.log(trRef);

      const runPromise = new Promise(async resolve => {
        let success, message;

        testCase.run().then(result => {
          success = result;
          message = result;
        }).catch(reason => {
          success = false;
          message = reason.message;
        }).finally(() => {
          trRef.node.classList.add(success ? 'test-correct' : 'test-incorrect');
          messageRef.node.innerHTML = message;
          resolve();
        });
      });

      runPromises.push(runPromise);
    });

    Promise.all(runPromises);

    this.template = html`
      <style>
        tr {
          border: 0;
        }

        .test-correct {
            background: lightgreen;
        }

        .test-incorrect {
            background: lightcoral;
        }
      </style>
      <table>
        <tbody>
          <tr>
            <td>#</td>
            <td>Name</td>
            <td>Description</td>
            <td>Result</td>
          </tr>
          ${tests}
        </tbody>
      </table>
    `;
  }
}

window.onload = () => {
  document.body.appendChild(new TestResults());
};
