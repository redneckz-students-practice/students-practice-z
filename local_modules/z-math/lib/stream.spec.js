'use strict';

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _mocha = require('mocha');

var _chai = require('chai');

var _stream = require('./stream');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _mocha.describe)('Stream', function () {
    var stream = void 0;

    (0, _mocha.beforeEach)(function () {
        stream = new _stream.Stream( /*#__PURE__*/_regenerator2.default.mark(function g() {
            return _regenerator2.default.wrap(function g$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return 1;

                        case 2:
                            _context.next = 4;
                            return 2;

                        case 4:
                            _context.next = 6;
                            return 3;

                        case 6:
                            _context.next = 8;
                            return 4;

                        case 8:
                            _context.next = 10;
                            return 5;

                        case 10:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, g, this);
        }));
    });

    (0, _mocha.describe)('of', function () {
        (0, _mocha.it)('should wrap value into stream', function () {
            (0, _chai.expect)([].concat((0, _toConsumableArray3.default)(_stream.Stream.of(0)))).to.deep.equal([0]);
        });
    });

    (0, _mocha.describe)('head', function () {
        (0, _mocha.it)('should return first element immediately', function () {
            (0, _chai.expect)(stream.head).to.equal(1);
        });
    });

    (0, _mocha.describe)('tail', function () {
        (0, _mocha.it)('should return stream without first element', function () {
            (0, _chai.expect)([].concat((0, _toConsumableArray3.default)(stream.tail))).to.deep.equal([2, 3, 4, 5]);
            (0, _chai.expect)([].concat((0, _toConsumableArray3.default)(stream.tail.tail))).to.deep.equal([3, 4, 5]);
        });
    });

    (0, _mocha.describe)('take', function () {
        (0, _mocha.it)('should return cropped stream', function () {
            (0, _chai.expect)([].concat((0, _toConsumableArray3.default)(stream.take(3)))).to.deep.equal([1, 2, 3]);
        });
    });

    (0, _mocha.describe)('scan', function () {
        (0, _mocha.it)('should produce reduced stream by means of reducer function', function () {
            (0, _chai.expect)([].concat((0, _toConsumableArray3.default)(stream.scan(function (a, b) {
                return a + b;
            }, 0)))).to.deep.equal([1, 3, 6, 10, 15]);
        });
    });

    (0, _mocha.describe)('concat', function () {
        (0, _mocha.it)('should concatenate streams with respect to arguments order', function () {
            (0, _chai.expect)([].concat((0, _toConsumableArray3.default)(_stream.Stream.of(0).concat(stream, _stream.Stream.of(6))))).to.deep.equal([0, 1, 2, 3, 4, 5, 6]);
        });

        (0, _mocha.it)('should concatenate scalars as well as streams', function () {
            (0, _chai.expect)([].concat((0, _toConsumableArray3.default)(_stream.Stream.of(0).concat(stream, 6)))).to.deep.equal([0, 1, 2, 3, 4, 5, 6]);
        });
    });

    (0, _mocha.describe)('should obey the three monad laws', function () {
        (0, _mocha.it)('Left identity', function () {
            var inc = function inc(x) {
                return _stream.Stream.of(x + 1);
            };
            (0, _chai.expect)([].concat((0, _toConsumableArray3.default)(_stream.Stream.of(7).chain(inc)))).to.deep.equal([].concat((0, _toConsumableArray3.default)(inc(7))));
        });

        (0, _mocha.it)('Right identity', function () {
            (0, _chai.expect)([].concat((0, _toConsumableArray3.default)(stream.chain(_stream.Stream.of)))).to.deep.equal([].concat((0, _toConsumableArray3.default)(stream)));
        });

        (0, _mocha.it)('Associativity', function () {
            var add = function add(x) {
                return _stream.Stream.of(x + x);
            };
            var mul = function mul(x) {
                return _stream.Stream.of(x * x);
            };
            (0, _chai.expect)([].concat((0, _toConsumableArray3.default)(stream.chain(add).chain(mul)))).to.deep.equal([].concat((0, _toConsumableArray3.default)(stream.chain(function (x) {
                return add(x).chain(mul);
            }))));
        });
    });
}); /* eslint no-restricted-syntax: ["error", "ForInStatement", "LabeledStatement", "WithStatement"] */