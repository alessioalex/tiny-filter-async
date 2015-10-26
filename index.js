'use strict';

function filter(array, iterator, callback) {
  var filteredData = [];
  var counter = array.length;

  array.forEach(function forEach(item, index) {
    iterator(item, function iterate(bool) {
      if (bool) {
        filteredData.push(index);
      }

      if (!--counter) {
        callback(filteredData.sort().map(function createResults(idx) {
          return array[idx];
        }));
      }
    });
  });
}

module.exports = filter;
