# WebComponent framework

## Table of contents
1. [About this project](#about-this-project)
1. [Usage](#usage)
2. [Assembling](#assembling)
3. [Building docs](#building-docs)
4. [Testing](#testing)
    1. [Running tests in-browser](#running-tests-in-browser)
    2. [Running tests with coverage from CLI in headless Chromium](#running-tests-with-coverage-from-cli-in-headless-chromium)

## About this project

## Usage
* Check out [quick start guide](docs/QUICK_START.md).
* See the [API docs](docs/API.md).

## Assembling
To build WC framework run `yarn build`. It will assemble production bundle,
test bundle (for running in-browser tests), build JSDoc, and run tests with
coverage.

As a result you'll have:
* `dist` directory in the root of project folder. You can find here `wc.js`
(which is assembled framework) accompanied with code map and `tests.js` (which
is assembled in-browser test suite) also in pair with it's code map.
* `coverage` directory with generated coverage results (currently not working
as expected due to unknown bug). Open `index.html` in browser to see coverage.
* `jsdoc-out` directory with built JSDoc HTML files. Open `index.html` file
in browser to explore dev docs.

## Building docs
To generate JSDoc once run `yarn build:docs`.

To rebuild on changes run `yarn watch:docs`. Page with docs will be
auto-updated after source code changed (just make sure you refreshed page
in browser after you started this command).

## Testing
WC uses [Mocha](https://mochajs.org/) as a testing framework,
[Chai](https://www.chaijs.com/) as an assertion library and
[Istanbul](https://istanbul.js.org/) as a coverage meter.

### Running tests in-browser
You can test WC framework in any browser you want. You just need to
[build](#assembling) framework and then open `/dist/test.html` in browser.

It supports code maps for stack traces but it's known limitation - correct line
numbers would be shown only if you accessing `/test.html` from HTTP server but
not directly from file system (you need something like
`http://localhost/simpleserver/test.html`).
Moreover, probably only Chromium-based browsers supports this feature.

### Running tests with coverage from CLI in headless Chromium
Run `yarn coverage` to run tests and generate HTML-based coverage report.
You can find report in `/coverage/index.html`.
