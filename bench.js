'use strict';

/* eslint-disable func-names */
var asyncFilter = require('async').filter;
var filterAsync = require('filter-async');
var filter = require('./');

var CORES = require('os').cpus().length;
var ITERATIONS = CORES * 1000;
var DELAY = 200;

suite('bench', function() {
  // the number of times to run a given bench
  set('iterations', ITERATIONS);
  // the number of how many times a given bench is run concurrently
  set('concurrency', CORES);
  // time in ms between each bench
  set('delay', DELAY);

  var array = 'asdkljdjkfksdjhfjkdhgkjdfhghdfkjghdfkjghdfjkghdkfjgh'.split();
  var timeout = 0;

  bench('tiny-async-filter', function(next) {
    filter(array, function iterator(item, cb) {
      setTimeout(function() {
        cb(true);
      }, timeout);
    }, function() { next(); });
  });

  bench('async.filter', function(next) {
    asyncFilter(array, function iterator(item, cb) {
      setTimeout(function() {
        cb(true);
      }, timeout);
    }, function() { next(); });
  });

  bench('filter-async', function(next) {
    filterAsync(array, function iterator(item, cb) {
      setTimeout(function() {
        cb(null, true);
      }, timeout);
    }, function() { next(); });
  });
});
