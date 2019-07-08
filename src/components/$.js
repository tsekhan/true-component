class $ extends Text{
  // XXX Extendable Text is an experimental technology (https://developer.mozilla.org/en-US/docs/Web/API/Text/Text)

  /**
   * @class
   * @extends Text
   * @param {any} value - Value to be stored.
   */
  constructor(value) {
    super();

    let _value;
    const callbacks = [];

    Object.defineProperties(this, {
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
