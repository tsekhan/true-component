let TC;

if (window.CoverageTest) {
  TC = require('../src');
} else {
  TC = window.TC;
}

const { HtmlComponent, $, html, registerClass, Ref } = TC;

export {
  HtmlComponent, $, html, registerClass, Ref,
};
