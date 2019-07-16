# API reference

## Table of contents
1. [`html`](#html)
2. [`HtmlComponent`](#htmlcomponent)
3. [`$` object](#-object)
3. [`Ref`](#ref)
3. [`registerClass(class, [tag])`](#registerclassclass-tag)

## `html`
[Template literal tag](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals),
which parses provided template, and returns
[`Element`](https://developer.mozilla.org/en-US/docs/Web/API/Element) or
[`HTMLCollection`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCollection)
as a result of parsing.

There are several scenarios how data passed as an expression would be
processed.

* Data passed as a child
    * If [`HtmlComponent`](#htmlcomponent) or
    [`Node`](https://developer.mozilla.org/en-US/docs/Web/API/Node) passed as
    nested object in an expression then they'll be inserted as nested objects.
        ```javascript
        const CustomComponent = class extends HtmlComponent {};
        registerClass(CustomComponent, 'my-class');
        
        const myComponent = new CustomComponent();
        
        html`<div>${myComponent}</div>`;
        
        // will produce `<div><my-class></my-class></div>`
        ```

    * If any iterable object passed as nested object in an expression then
    collection would be treated as siblings and would be processed one by one
    according to rules applicable to every particular object.

* Data passed inside of tag description
    * Expression can define tag name.
        ```javascript
        const tag = 'div';
        
        const myElement = html`<${tag}></${tag}>`;
        
        // will produce `<div></div>`
        ```

    * If expression passed as a _tag attribute value of plain HTML tag_, it
    would be stringified.
        ```javascript
        const timestamp = new Date();
        
        const myElement = html`<div data="${timestamp}"></div>`;
        
        // will produce `<div data="Mon Jul 01 2019 17:48:21 GMT+0300 (Minsk Standard Time)"></div>`
        ```

    * If expression passed as a _tag attribute value of
    `HtmlComponent`_ then object would be put to the object passed to the first
    argument of the constructor. As a result it will be put as a field in the
    `HtmlComponent` instance under tag name.
        ```javascript
        const CustomComponent = class extends HtmlComponent {};
        registerClass(CustomComponent, 'my-class');
        
        const attrValue = 'value1';
        const myClassInstance = html`<my-class customAttribute="${attrValue}"></my-class>`;
        
        console.log(myClassInstance.customAttribute); // will print 'value1'
        ```

    * If expression passed as a _tag attribute name of any tag_, it would be
    stringified.
        ```javascript
        CustomComponent = class extends HtmlComponent {};
        registerClass(CustomComponent, 'my-class');
        
        const attrName = 'param1';
        const myClassInstance = html`<my-class ${attrName}="123"></my-class>`;
        
        console.log(myClassInstance.param1); // will print '123'
        ```

## `HtmlComponent`
Base class.

## `$` object
`$` class is a `Text` node descendant which provides data binding.

Instance of `$` class has `value` field. Displayed text would be updated
as soon as `value` was updated.

## `Ref`
Purpose of the instance of `Ref` class is to provide access to HTML element
created by `html` template tag.

To make it work pass `Ref` instance to the `ref` attribute of your custom
tag. After template tag was instantiated, attribute `node` of the `Ref`
instance will point to the HTML element created by your custom tag.

```javascript
const reference = new Ref();

html`<my-class ref="${reference}"></my-class`

// Now `reference.node` object refers to the `<my-class />` node
```

## `registerClass(class, [tag])`
Assign tag name to class and add it to internal register to allow
[html](#html) template tag to instantiate component as instance of
appropriate class.

```javascript
const CustomComponent = class extends HtmlComponent {};

registerClass(CustomComponent, 'my-class');

// now component is available as html`<my-class></my-class>`
```

`tag` can be omitted if `class.tag` property was specified.

```javascript
const CustomComponent = class extends HtmlComponent {
  static get tag() {
    return 'my-class';
  }
};

registerClass(CustomComponent);

// now component is available as html`<my-class></my-class>`
```
