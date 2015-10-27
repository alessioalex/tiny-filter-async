/* eslint-disable no-console, func-names */
'use strict';

var it = require('tape');
var filterAsync = require('./');
var sinon = require('sinon');

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

it('should return the results in order', function(t) {
  var timeouts = [250, 500, 200, 300, 50];
  var clock = sinon.useFakeTimers();
  var items = [0, 1, 2, 3, 4];

  filterAsync(items, function(item, next) {
    setTimeout(function() {
      next(true);
    }, timeouts[item]);
  }, function(results) {
    t.deepEqual(results, items);
    clock.restore();
    t.end();
  });

  clock.tick(501);
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
