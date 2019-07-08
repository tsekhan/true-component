/**
 * Purpose of the instance of `Ref` class is to provide access to HTML element created by `html` template tag.
 *
 * To make it work pass `Ref` instance to the `ref` attribute of your custom tag. After template tag was instantiated,
 * attribute `node` of the `Ref` instance will point to the HTML element created by your custom tag.
 * @class
 */
const Ref = class {};

export default Ref;
