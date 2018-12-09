import { Component, html, Ref } from '../src';

import tests from '../tests';

class TestResults extends Component {
  static get tag() {
    return 'test-results';
  }

  static _processTestCase(testCase, index) {
    let tests = [];
    let runners = [];

    if (testCase.tests) {
      tests.push(html`
          <tr>
            <td>${index}</td>
            <td>${testCase.description}</td>
            <td></td>
          </tr>
        `);

      testCase.tests.forEach((childTestCase, childIndex) => {
        let composedIndex = `${index ? `${index}.` : ''}${childIndex + 1}`;

        const {
          tests: newTests,
          runners: newRunners,
        } = TestResults._processTestCase(childTestCase, composedIndex);

        tests = [...tests, ...newTests];
        runners = [...runners, ...newRunners];
      });
    } else {
      const trRef = new Ref();
      const messageRef = new Ref();

      tests.push(html`
        <tr ref="${trRef}">
          <td>${index}</td>
          <td>${testCase.description}</td>
          <td ref="${messageRef}"></td>
        </tr>
      `);

      const runner = async () => {
        let status;
        let message = '';

        try {
          const result = await testCase.run();

          if (result === undefined) {
            status = 'success';
          } else if (typeof result === 'boolean' || result instanceof Boolean) {
            status = result ? 'success' : 'failure';
          } else {
            status = result.status;
            message = result.message;
          }
        } catch(error) {
          console.error(error.stack);

          status = 'failure';
          message = error.message;
        }

        trRef.node.classList.add(`test-${status}`);
        messageRef.node.innerHTML = message;
      };

      runners.push(runner);
    }

    return {
      tests,
      runners,
    }
  }

  constructor(testCases, children) {
    super(testCases, children);

    let tests = [];
    let runners = [];

    testCases.forEach((testCase, index) => {
      const {
        tests: childTests,
        runners: childRunners,
      } = TestResults._processTestCase(testCase, index + 1);

      tests = [...tests, ...childTests];
      runners = [...runners, ...childRunners];
    });

    this.template = html`
      <style>
        tr {
          border: 0;
        }

        .test-success {
            background: lightgreen;
        }

        .test-failure {
            background: lightcoral;
        }
      </style>
      <table>
        <tbody>
          <tr>
            <td>#</td>
            <td>Test</td>
            <td>Result</td>
          </tr>
          ${tests}
        </tbody>
      </table>
    `;

    Promise.all(runners).then(() => {
      // TODO Measure timings
    });

    runners.forEach(runner => runner());
  }
}

window.onload = () => {
  document.body.appendChild(new TestResults(tests));
};
