/**
 * Enum for variants of usage for placeholders used instead of template literal parameters (expressions).
 *
 * @memberOf module:html
 * @alias PLACEHOLDER_ROLES
 * @enum {Symbol}
 */
const PLACEHOLDER_ROLES = {

  /**
   * Expression placed instead of tag name (like `<${expr}></${expr}>`).
   */
  TAG_NAME: Symbol('TAG_NAME'),

  /**
   * Disambiguation (role not detected precisely yet): expression placed instead of tag attribute (like
   * `<my-component ${expr}>...`) or tag attribute name (like `<my-component ${expr}="123">`).
   */
  ATTRIBUTE_OR_ATTRIBUTE_NAME: Symbol('ATTRIBUTE_OR_ATTRIBUTE_NAME'),

  /**
   * Expression placed instead of whole attribute value: `<my-component attr="${expr}">`.
   */
  ATTRIBUTE_VALUE: Symbol('ATTRIBUTE_VALUE'),

  /**
   * Expression placed instead of part of attribute name or attribute value: `<my-component attr-${expr}="123">...` or
   * `<my-component attr="123-${expr}">...`.
   */
  PART_OF_ATTRIBUTE_OR_VALUE: Symbol('PART_OF_ATTRIBUTE_OR_VALUE'),


  /**
   * Expression is placed instead of attribute name and attribute has no value: `<my-component ${expr}>...`.
   */
  ATTRIBUTE: Symbol('ATTRIBUTE'),

  /**
   * Expression is placed instead of tag attribute name (like `<my-component ${expr}="123">`).
   */
  ATTRIBUTE_NAME: Symbol('ATTRIBUTE_NAME'),

  /**
   * Expression is placed inside of other tag (or root element): `<my-component>${expr}</my-component>`
   */
  TAG: Symbol('TAG'),
};

export default PLACEHOLDER_ROLES;
