let TC;

if (window.CoverageTest) {
  TC = require('../src');
} else {
  TC = window.TC;
}

const HtmlComponent = TC.HtmlComponent;
const $ = TC.$;
const html = TC.html;
const registerClass = TC.registerClass;
const Ref = TC.Ref;

export { HtmlComponent, $, html, registerClass, Ref };
