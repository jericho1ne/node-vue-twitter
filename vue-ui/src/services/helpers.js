
export default {
  /**
   * Flatten any given object
   * @param {Object} obj A thing with many nested things. Potentially.
   * @return {Object} Flattened object
   */
  flattenObject: (obj) => {
    return Object.assign(
      {},
      ...function _flatten(o) {
        return [].concat(...Object.keys(o)
          .map(k =>
            typeof o[k] === 'object' ?
              _flatten(o[k]) :
              ({[k]: o[k]})
          )
        );
      }(obj)
    )
  },

}
