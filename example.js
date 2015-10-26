'use strict';

/* eslint-disable func-names, no-console */
var filter = require('./');

filter(['file1', 'file2', 'file3'], function filterExistingFiles(item, next) {
  // random timeout between 100 and 500 in miliseconds
  var randomTimeout = Math.floor(Math.random() * (500 - 100 + 1)) + 100;
  var fileExists = (randomTimeout % 2 === 0) ? true : false;

  setTimeout(function phonyAsyncProcessingFn() {
    var msg = 'Took %s miliseconds to determin that %s ';
    msg += (fileExists) ? 'exists.' : 'does not exist.';

    console.log(msg, randomTimeout, item);

    next(fileExists);
  }, randomTimeout);
}, function(results) {
  console.log('--------------------------');
  console.log('Final results: %s.', results.join(', '));
});
