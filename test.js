/* eslint-disable no-console, func-names */
'use strict';

var it = require('tape');
var filterAsync = require('./');

it('should return the filtered results', function(t) {
  var counter = 0;

  filterAsync([1, 2, 3, 4, 5], function(item, next) {
    counter++;
    next(item % 2 === 1);
  }, function(results) {
    t.equal(counter, 5);
    t.deepEqual(results, [1, 3, 5]);
    t.end();
  });
});

it('should be async even though the iterator is not', function(t) {
  var index = 0;

  filterAsync([1, 2, 3], function(item, next) {
    next(true);
  }, function() {
    t.equal(++index, 2);
    t.end();
  });

  t.equal(++index, 1);
});
