'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AsyncStream = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _class, _temp2; /* eslint no-restricted-syntax: ["error", "ForInStatement", "LabeledStatement", "WithStatement"] */

var _stream = require('./stream');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * This is partial extension of Stream (for illustration purposes).
 * @see Stream
 * @typedef {Stream(Promise(A))} AsynStream
 */
var AsyncStream = exports.AsyncStream = (_temp2 = _class = function (_Stream) {
    (0, _inherits3.default)(AsyncStream, _Stream);

    function AsyncStream() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, AsyncStream);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = AsyncStream.__proto__ || (0, _getPrototypeOf2.default)(AsyncStream)).call.apply(_ref, [this].concat(args))), _this), _this.map = function (f) {
            return (0, _get3.default)(AsyncStream.prototype.__proto__ || (0, _getPrototypeOf2.default)(AsyncStream.prototype), 'map', _this).call(_this, function (x$) {
                return x$.then(f);
            });
        }, _this.chain = function (f) {
            return (0, _get3.default)(AsyncStream.prototype.__proto__ || (0, _getPrototypeOf2.default)(AsyncStream.prototype), 'map', _this).call(_this, function (x$) {
                return x$.then(function (x) {
                    return f(x).head;
                });
            });
        }, _this.scan = function (f, initial) {
            return (0, _get3.default)(AsyncStream.prototype.__proto__ || (0, _getPrototypeOf2.default)(AsyncStream.prototype), 'scan', _this).call(_this, function (acc$, x$) {
                return _promise2.default.all([acc$, x$]).then(function (_ref2) {
                    var _ref3 = (0, _slicedToArray3.default)(_ref2, 2),
                        acc = _ref3[0],
                        x = _ref3[1];

                    return f(acc, x);
                });
            }, _promise2.default.resolve(initial));
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    /**
     * @override
     * @param {A -> B} f
     * @return {AsyncStream(B)}
     */


    /**
     * TODO Partial implemetation
     * @override
     * @param {A -> AsyncStream(B)} f
     * @return {AsyncStream(B)}
     */


    /**
     * @override
     * @param {(B, A) -> B} f - Reducer
     * @param {B} initial - Accumulator
     * @return {AsyncStream(B)}
     */


    (0, _createClass3.default)(AsyncStream, [{
        key: 'provider',


        /**
         * Converts stream to provider function to access consequent elements one by one
         * Provider is an unpure function (encapsulates side effect)
         * @override
         * @param {A} emptyVal - Default value
         * @return {() -> A}
         */
        value: function provider(emptyVal) {
            var curr = emptyVal;
            this.forEach(function (x) {
                curr = x;
            });
            return function () {
                return curr;
            };
        }

        /**
         * Executes stream with handler
         * @param {A -> Unit} handler
         * @return {AsyncStream(A)}
         */

    }, {
        key: 'forEach',
        value: function forEach(handler) {
            var gen = this.g();
            var exec = function exec() {
                var _gen$next = gen.next(),
                    value = _gen$next.value,
                    done = _gen$next.done;

                if (done) return;
                value.then(function (x) {
                    handler(x);
                    exec();
                }, function (err) {
                    return gen.throw(err);
                });
            };
            exec();
            return this;
        }
    }]);
    return AsyncStream;
}(_stream.Stream), _class.of = function (x) {
    return new AsyncStream( /*#__PURE__*/_regenerator2.default.mark(function singleton() {
        return _regenerator2.default.wrap(function singleton$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return _promise2.default.resolve(x);

                    case 2:
                    case 'end':
                        return _context.stop();
                }
            }
        }, singleton, this);
    }));
}, _temp2);