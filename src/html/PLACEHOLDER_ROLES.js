/**
 * Variants of usage for placeholders used instead of template literal parameters (expressions).
 * @type {{
 *   ATTRIBUTE_NAME: symbol,
 *   ATTRIBUTE: symbol,
 *   ATTRIBUTE_VALUE: symbol,
 *   ATTRIBUTE_OR_ATTRIBUTE_NAME: symbol,
 *   PART_OF_ATTRIBUTE_OR_VALUE: symbol,
 *   TAG: symbol,
 *   TAG_NAME: symbol
 * }}
 */
const PLACEHOLDER_ROLES = {
  TAG_NAME: Symbol('TAG_NAME'),
  ATTRIBUTE_OR_ATTRIBUTE_NAME: Symbol('ATTRIBUTE_OR_ATTRIBUTE_NAME'),
  ATTRIBUTE_VALUE: Symbol('ATTRIBUTE_VALUE'),
  PART_OF_ATTRIBUTE_OR_VALUE: Symbol('PART_OF_ATTRIBUTE_OR_VALUE'),

  ATTRIBUTE: Symbol('ATTRIBUTE'),
  ATTRIBUTE_NAME: Symbol('ATTRIBUTE_NAME'),

  TAG: Symbol('TAG'),
};

export default PLACEHOLDER_ROLES;
