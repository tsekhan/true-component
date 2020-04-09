let TC;

if (window.CoverageTest) {
  TC = require('../src');
} else {
  TC = window.TC;
}

const { HtmlComponent } = TC;
const { $ } = TC;
const { html } = TC;
const { registerClass } = TC;
const { Ref } = TC;

export {
  HtmlComponent, $, html, registerClass, Ref,
};
