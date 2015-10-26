# tiny-filter-async

Async filter function, similar to (and inspired by) [async.filter](https://github.com/caolan/async#filter).

## Usage

### filter(array, iterator, callback)

Returns a new array of values (in the same order as the original array) which passed the async test.
The iterator callback takes a single boolean argument (no error argument first).

Arguments:

- `array` - The array to iterate over
- `iterator(item, callback)` - The function that does the actual filtering. The callback needs to be called with a boolean argument (`callback(hasPassedTest)`).
- `callback` - Called after all the `iterator` functions have finished.

### Example

```js
var filter = require('tiny-async-filter');

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
```

## Benchmarks

Run the command below to see how it compares with other similar libraries from a performance standpoint.

```js
npm run bench
```

## Why the name?

Other possible names were already taken, and the actual source code is tiny.

## License

[MIT](http://alessioalex.mit-license.org/)
