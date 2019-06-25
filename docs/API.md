# API reference

## `html`

## `HtmlComponent`

## `$`
`$` class is a `Text` node descendant which supports data binding.

Instance of `$` class has `value` field. Displayed text would be updated
as soon as `value` was updated.

## `Ref`
Purpose of the instance of `Ref` class is to provide access to HTML element
created by `html` template tag.

To make it work pass `Ref` instance to the
`ref` attribute of your custom tag. After template tag was instantiated,
attribute `node` of the `Ref` instance will point to HTML element created from
your custom tag.

```javascript
const reference = new Ref();

html`<my-class ref="${reference}"></my-class`

// Now reference.node object refers to the <my-class /> node
```

## `registerClass()`
