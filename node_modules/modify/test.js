var modify = require('./index'),
    assert = require('assert');

modify(
  { a: 1, b: 2 },
  [
    function (head, next) {
      head.a *= 2;
      return next();
    },
    function (head, next) {
      head.c = head.a + head.b;
      return next();
    }
  ],
  function (err, head) {
    assert.equal(head.a, 2);
    assert.equal(head.c, 4);
  }
);

modify(
  { a: 1, b: 2 },
  [
    function (head, next) {
      return next(new Error());
    },
    function (head, next) {
      head.c = head.a + head.b;
      return next();
    }
  ],
  function (err, head) {
    assert.notEqual(err, null);
    assert.notEqual(head, undefined);
    assert.equal(head.c, undefined);
  }
);
