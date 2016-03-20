"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Stream = undefined;

var _isIterable2 = require("babel-runtime/core-js/is-iterable");

var _isIterable3 = _interopRequireDefault(_isIterable2);

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _iterator5 = require("babel-runtime/core-js/symbol/iterator");

var _iterator6 = _interopRequireDefault(_iterator5);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _class, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint no-restricted-syntax: ["error", "ForInStatement", "LabeledStatement", "WithStatement"] */

/**
 * TODO Read about sequences in mathematics
 * https://en.wikipedia.org/wiki/Sequence
 * TODO Read about ECMAScript generators
 * https://developer.mozilla.org/ru/docs/Web/JavaScript/Guide/Iterators_and_Generators
 * TODO Read about ECMAScript Iterable
 * https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Symbol/iterator
 * TODO Read about infinite sequences in Java
 * http://blog.agiledeveloper.com/2016/06/lazy-evaluation-make-infinite-streams.html
 * TODO Read about Functor, Applicative, Chain, Monad
 * https://github.com/fantasyland/fantasy-land
 * https://medium.com/javascript-scene/javascript-monads-made-simple-7856be57bfe8
 * TODO Also take a look at tests
 * TODO Analize Promise scpecification to answer two questions
 * 1. What makes Promise look like Monad?
 * 2. What is the difference?
 * TODO Read about tail recursion and search for TCO examples here
 * http://2ality.com/2015/06/tail-call-optimization.html
 */

/**
 * Stream monad represents some lazily computed sequence
 * Can be contructed from scalar value or ECMAScript generator-function
 */
var Stream = exports.Stream = (_temp = _class = function () {

    /**
     * @param {() => Generator} g - Generator-function without args
     */
    function Stream(g) {
        var _this = this;

        (0, _classCallCheck3.default)(this, Stream);

        this.take = function (n) {
            return take(_this, n);
        };

        this.ap = function (stream) {
            return _this.chain(function (x) {
                return stream.map(function (f) {
                    return f(x);
                });
            });
        };

        this.g = g;
        this[_iterator6.default] = g;
    }

    /**
     * @return {A} First element
     */


    /**
     * Stream with the only element
     * @param {A} x - The only element
     * @return {Stream(A)}
     */


    (0, _createClass3.default)(Stream, [{
        key: "first",


        /**
         * @return {Stream(A)} First element wrapped into stream
         */
        value: function first() {
            var stream = this;
            return new this.constructor( /*#__PURE__*/_regenerator2.default.mark(function head() {
                return _regenerator2.default.wrap(function head$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return stream.head;

                            case 2:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, head, this);
            }));
        }

        /**
         * @return {Stream(A)} Elements of stream exluding the first one
         */

    }, {
        key: "provider",


        /**
         * Converts stream to provider function to access consequent elements one by one
         * Provider is an unpure function (encapsulates side effect)
         * @param {A} emptyVal - Default value
         * @return {() -> A}
         */
        value: function provider(emptyVal) {
            var gen = this.g();
            return function () {
                var _gen$next = gen.next(),
                    value = _gen$next.value,
                    done = _gen$next.done;

                return !done ? value : emptyVal;
            };
        }
    }, {
        key: "map",


        /**
         * Functor's part
         * @param {A -> B} f
         * @return {Stream(B)}
         */
        value: function map(f) {
            var stream = this;
            return new this.constructor( /*#__PURE__*/_regenerator2.default.mark(function mapped() {
                var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, x;

                return _regenerator2.default.wrap(function mapped$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _iteratorNormalCompletion = true;
                                _didIteratorError = false;
                                _iteratorError = undefined;
                                _context2.prev = 3;
                                _iterator = (0, _getIterator3.default)(stream);

                            case 5:
                                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                                    _context2.next = 12;
                                    break;
                                }

                                x = _step.value;
                                _context2.next = 9;
                                return f(x);

                            case 9:
                                _iteratorNormalCompletion = true;
                                _context2.next = 5;
                                break;

                            case 12:
                                _context2.next = 18;
                                break;

                            case 14:
                                _context2.prev = 14;
                                _context2.t0 = _context2["catch"](3);
                                _didIteratorError = true;
                                _iteratorError = _context2.t0;

                            case 18:
                                _context2.prev = 18;
                                _context2.prev = 19;

                                if (!_iteratorNormalCompletion && _iterator.return) {
                                    _iterator.return();
                                }

                            case 21:
                                _context2.prev = 21;

                                if (!_didIteratorError) {
                                    _context2.next = 24;
                                    break;
                                }

                                throw _iteratorError;

                            case 24:
                                return _context2.finish(21);

                            case 25:
                                return _context2.finish(18);

                            case 26:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, mapped, this, [[3, 14, 18, 26], [19,, 21, 25]]);
            }));
        }

        /**
         * Monad's part. Also know as flatMap or bind
         * @param {A -> Stream(B)} f
         * @return {Stream(B)}
         */

    }, {
        key: "chain",
        value: function chain(f) {
            var stream = this;
            return new this.constructor( /*#__PURE__*/_regenerator2.default.mark(function chained() {
                var _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, x;

                return _regenerator2.default.wrap(function chained$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _iteratorNormalCompletion2 = true;
                                _didIteratorError2 = false;
                                _iteratorError2 = undefined;
                                _context3.prev = 3;
                                _iterator2 = (0, _getIterator3.default)(stream);

                            case 5:
                                if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                                    _context3.next = 11;
                                    break;
                                }

                                x = _step2.value;
                                return _context3.delegateYield(f(x), "t0", 8);

                            case 8:
                                _iteratorNormalCompletion2 = true;
                                _context3.next = 5;
                                break;

                            case 11:
                                _context3.next = 17;
                                break;

                            case 13:
                                _context3.prev = 13;
                                _context3.t1 = _context3["catch"](3);
                                _didIteratorError2 = true;
                                _iteratorError2 = _context3.t1;

                            case 17:
                                _context3.prev = 17;
                                _context3.prev = 18;

                                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                    _iterator2.return();
                                }

                            case 20:
                                _context3.prev = 20;

                                if (!_didIteratorError2) {
                                    _context3.next = 23;
                                    break;
                                }

                                throw _iteratorError2;

                            case 23:
                                return _context3.finish(20);

                            case 24:
                                return _context3.finish(17);

                            case 25:
                            case "end":
                                return _context3.stop();
                        }
                    }
                }, chained, this, [[3, 13, 17, 25], [18,, 20, 24]]);
            }));
        }

        /**
         * Applicative's part
         * @param {Stream(A -> B)} stream
         * @return {Stream(B)}
         */

    }, {
        key: "scan",


        /**
         * http://reactivex.io/documentation/operators/scan.html
         * @param {(B, A) -> B} f - Reducer
         * @param {B} acc - Optional accumulator
         * @return {Stream(B)}
         */
        value: function scan(f, acc) {
            var stream = this;
            return new this.constructor( /*#__PURE__*/_regenerator2.default.mark(function scanned() {
                var y, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, x;

                return _regenerator2.default.wrap(function scanned$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                y = acc;
                                _iteratorNormalCompletion3 = true;
                                _didIteratorError3 = false;
                                _iteratorError3 = undefined;
                                _context4.prev = 4;
                                _iterator3 = (0, _getIterator3.default)(stream);

                            case 6:
                                if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
                                    _context4.next = 13;
                                    break;
                                }

                                x = _step3.value;
                                _context4.next = 10;
                                return y = f(y, x);

                            case 10:
                                _iteratorNormalCompletion3 = true;
                                _context4.next = 6;
                                break;

                            case 13:
                                _context4.next = 19;
                                break;

                            case 15:
                                _context4.prev = 15;
                                _context4.t0 = _context4["catch"](4);
                                _didIteratorError3 = true;
                                _iteratorError3 = _context4.t0;

                            case 19:
                                _context4.prev = 19;
                                _context4.prev = 20;

                                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                                    _iterator3.return();
                                }

                            case 22:
                                _context4.prev = 22;

                                if (!_didIteratorError3) {
                                    _context4.next = 25;
                                    break;
                                }

                                throw _iteratorError3;

                            case 25:
                                return _context4.finish(22);

                            case 26:
                                return _context4.finish(19);

                            case 27:
                            case "end":
                                return _context4.stop();
                        }
                    }
                }, scanned, this, [[4, 15, 19, 27], [20,, 22, 26]]);
            }));
        }

        /**
         * Concatenate all streams regarding arguments order
         * @param {[Stream(A)]} xss - Iterables
         * @return {Stream(A)} Concatenated stream
         */

    }, {
        key: "concat",
        value: function concat() {
            for (var _len = arguments.length, xss = Array(_len), _key = 0; _key < _len; _key++) {
                xss[_key] = arguments[_key];
            }

            var stream = this;
            return new this.constructor( /*#__PURE__*/_regenerator2.default.mark(function concatenated() {
                var _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, xs;

                return _regenerator2.default.wrap(function concatenated$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                return _context5.delegateYield(stream, "t0", 1);

                            case 1:
                                _iteratorNormalCompletion4 = true;
                                _didIteratorError4 = false;
                                _iteratorError4 = undefined;
                                _context5.prev = 4;
                                _iterator4 = (0, _getIterator3.default)(xss);

                            case 6:
                                if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
                                    _context5.next = 17;
                                    break;
                                }

                                xs = _step4.value;

                                if (!(0, _isIterable3.default)(xs)) {
                                    _context5.next = 12;
                                    break;
                                }

                                return _context5.delegateYield(xs, "t1", 10);

                            case 10:
                                _context5.next = 14;
                                break;

                            case 12:
                                _context5.next = 14;
                                return xs;

                            case 14:
                                _iteratorNormalCompletion4 = true;
                                _context5.next = 6;
                                break;

                            case 17:
                                _context5.next = 23;
                                break;

                            case 19:
                                _context5.prev = 19;
                                _context5.t2 = _context5["catch"](4);
                                _didIteratorError4 = true;
                                _iteratorError4 = _context5.t2;

                            case 23:
                                _context5.prev = 23;
                                _context5.prev = 24;

                                if (!_iteratorNormalCompletion4 && _iterator4.return) {
                                    _iterator4.return();
                                }

                            case 26:
                                _context5.prev = 26;

                                if (!_didIteratorError4) {
                                    _context5.next = 29;
                                    break;
                                }

                                throw _iteratorError4;

                            case 29:
                                return _context5.finish(26);

                            case 30:
                                return _context5.finish(23);

                            case 31:
                            case "end":
                                return _context5.stop();
                        }
                    }
                }, concatenated, this, [[4, 19, 23, 31], [24,, 26, 30]]);
            }));
        }
    }, {
        key: "head",
        get: function get() {
            return this.g().next().value;
        }
    }, {
        key: "tail",
        get: function get() {
            var stream = this;
            return new this.constructor( /*#__PURE__*/_regenerator2.default.mark(function tail() {
                var gen;
                return _regenerator2.default.wrap(function tail$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                                gen = stream.g();

                                gen.next(); // Behead
                                return _context6.delegateYield(gen, "t0", 3);

                            case 3:
                            case "end":
                                return _context6.stop();
                        }
                    }
                }, tail, this);
            }));
        }
    }]);
    return Stream;
}(), _class.nil = function () {
    return new Stream( /*#__PURE__*/_regenerator2.default.mark(function nil() {
        return _regenerator2.default.wrap(function nil$(_context7) {
            while (1) {
                switch (_context7.prev = _context7.next) {
                    case 0:
                    case "end":
                        return _context7.stop();
                }
            }
        }, nil, this);
    }));
}, _class.of = function (x) {
    return new Stream( /*#__PURE__*/_regenerator2.default.mark(function singleton() {
        return _regenerator2.default.wrap(function singleton$(_context8) {
            while (1) {
                switch (_context8.prev = _context8.next) {
                    case 0:
                        _context8.next = 2;
                        return x;

                    case 2:
                    case "end":
                        return _context8.stop();
                }
            }
        }, singleton, this);
    }));
}, _temp);

/**
 * Take first n elements of provided stream
 * @param {Stream(A)} stream - Stream to take from
 * @param {number} n - Elements count to take
 * @param acc - TCO supporting arg
 * @return {Stream(A)} Cropped stream
 */

function take(stream, n) {
    var acc = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Stream.nil();
    var _repeat = true;

    var _stream, _n, _acc;

    while (_repeat) {
        _repeat = false;

        if (n <= 0) {
            return acc;
        } else {
            _stream = stream.tail;
            _n = n - 1;
            _acc = acc.concat(stream.head);
            stream = _stream;
            n = _n;
            acc = _acc;
            _repeat = true;
            continue;
        }
    }
}