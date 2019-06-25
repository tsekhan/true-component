# WebComponent framework

## Table of contents
1. [About this project](#about-this-project)
1. [Usage](#usage)
2. [Assembling](#assembling)
3. [Testing](#testing)
    1. [Running tests in-browser](#running-tests-in-browser)
    2. [Running tests with coverage from CLI in headless Chromium](#running-tests-with-coverage-from-cli-in-headless-chromium)

## About this project

## Usage
* Check out [quick start guide](docs/QUICK_START.md).
* See the [API docs](docs/API.md).

## Assembling
To build WC framework run `webpack`. As a result you'll have `dist` directory in
the root of project folder. You can find here `wc.js` (which is assembled
framework) accompanied with codemap and tests.js (which is assembled test suite)
also in pair with it's codemap. 

## Testing
WC uses _Mocha_ as a testing framework, _Chai_ as an assertion library,
_Istanbul_ as a coverage meter.

### Running tests in-browser
You can test WC framework in any browser you want. You just need to
[build](#assembling) framework and then open `/test.html` in browser.

It supports code maps for stack traces but it's known limitation - correct line
numbers would be shown only if you accessing `/test.html` from HTTP server but
not directly from file system (you need something like
`http://localhost/simpleserver/test.html`).
Moreover, probably only Chromium-based browsers supports this feature.

### Running tests with coverage from CLI in headless Chromium
Run `yarn coverage` to run tests and generate HTML-based coverage report.
You can find report in `/coverage/index.html`.
