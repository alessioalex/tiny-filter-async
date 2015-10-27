'use strict';

var immediate = (typeof setImmediate !== 'function') ? setTimeout : setImmediate;

function filter(array, iterator, callback) {
  var filteredData = [];
  var counter = array.length;

  array.forEach(function forEach(item, index) {
    iterator(item, function iterate(bool) {
      if (bool) {
        filteredData.push(index);
      }

      if (!--counter) {
        immediate(function asyncify() {
          callback(filteredData.sort().map(function createResults(idx) {
            return array[idx];
          }));
        }, 0);
      }
    });
  });
}

module.exports = filter;
