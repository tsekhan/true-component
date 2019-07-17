/**
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/Text|`Text`} node descendant which provides data binding.
 *
 * Displayed value would be updated as soon as {@link $#value|value} param was updated.
 */
class $ extends Text{
  // XXX Extendable Text is an experimental technology (https://developer.mozilla.org/en-US/docs/Web/API/Text/Text)

  /**
   * @constructs $
   * @extends Text
   * @param {any} [value] - Value to be stored.
   */
  constructor(value) {
    super();

    let _value;
    const callbacks = [];

    Object.defineProperties(this, {

      /**
       * Bound data object.
       *
       * @memberOf $
       * @instance
       * @type {any}
       */
      value: {
        set: newValue => {
          _value = newValue;
          this.nodeValue = String(newValue);

          for (let i = 0; i < callbacks.length; i++) {
            callbacks[i].call(null, newValue);
          }
        },

        get: () => {
          return _value;
        },
      },

      /**
       * Register new callback to be called on {@link $#value|value} change
       *
       * @memberOf $
       * @instance
       * @function
       * @param {function} callback - Callback function to be called on {@link $#value|value} change.
       */
      registerCallback: {
        value: (callback) => {
          callbacks.push(callback);
        },
      },
    });

    this.value = value;
  }
}

export default $;
