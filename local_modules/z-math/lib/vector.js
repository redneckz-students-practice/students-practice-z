"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Vector = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _getOwnPropertyDescriptor = require("babel-runtime/core-js/object/get-own-property-descriptor");

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _desc, _value, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
        desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
        desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
        return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
        desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
        desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
        Object['define' + 'Property'](target, property, desc);
        desc = null;
    }

    return desc;
}

/**
 * TODO Read about "Immutable" data structures
 * TODO Read about "Decorator" pattern
 * TODO Read about ECMAScript decorators
 * https://medium.com/google-developers/exploring-es7-decorators-76ecb65fb841
 */

/**
 * Immutable multidimensional vector
 */
var Vector = exports.Vector = (_class = function () {
    (0, _createClass3.default)(Vector, null, [{
        key: "of",
        value: function of(x) {
            return x instanceof Vector ? x : new Vector(x);
        }
    }, {
        key: "sum",
        value: function sum() {
            for (var _len = arguments.length, vectors = Array(_len), _key = 0; _key < _len; _key++) {
                vectors[_key] = arguments[_key];
            }

            if (vectors.length === 0) {
                return new Vector();
            }
            if (vectors.length === 1) {
                return vectors[0];
            }
            return vectors.reduce(function (a, b) {
                return a.add(b);
            });
        }
    }]);

    function Vector() {
        (0, _classCallCheck3.default)(this, Vector);

        for (var _len2 = arguments.length, xs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            xs[_key2] = arguments[_key2];
        }

        this.xs = xs;
    }

    (0, _createClass3.default)(Vector, [{
        key: "x",
        value: function x(i) {
            return this.xs[i % this.n];
        }

        /**
         * Basis
         * @param {number} ei - basis vector index
         * @return {Vector} Basis vector
         */

    }, {
        key: "e",
        value: function e(ei) {
            return this.map(function (_, i) {
                return ei === i ? 1 : 0;
            });
        }
    }, {
        key: "add",
        value: function add(vec) {
            return this.map(function (xi, i) {
                return xi + vec.x(i);
            });
        }
    }, {
        key: "sub",
        value: function sub(vec) {
            return this.add(vec.inv());
        }
    }, {
        key: "inv",
        value: function inv() {
            return this.map(function (xi) {
                return -xi;
            });
        }
    }, {
        key: "dot",
        value: function dot(vec) {
            return this.map(function (xi, i) {
                return xi * vec.x(i);
            });
        }
    }, {
        key: "abs",
        value: function abs() {
            return this.map(function (xi) {
                return Math.abs(xi);
            });
        }
    }, {
        key: "zero",
        value: function zero() {
            return this.map(function () {
                return 0;
            });
        }
    }, {
        key: "ifelse",
        value: function ifelse(truthy, falsy) {
            return this.map(function (xi, i) {
                return xi ? truthy.x(i) : falsy.x(i);
            });
        }
    }, {
        key: "map",
        value: function map(func) {
            var result = this.xs.map(func);
            return new (Function.prototype.bind.apply(Vector, [null].concat((0, _toConsumableArray3.default)(result))))();
        }
    }, {
        key: "reduce",
        value: function reduce(func, acc) {
            return this.xs.reduce(func, acc);
        }
    }, {
        key: "every",
        value: function every(func) {
            return this.xs.every(func);
        }
    }, {
        key: "some",
        value: function some(func) {
            return this.xs.some(func);
        }
    }, {
        key: "n",
        get: function get() {
            return this.xs.length;
        }
    }, {
        key: "array",
        get: function get() {
            return [].concat((0, _toConsumableArray3.default)(this.xs));
        }
    }, {
        key: "length2",
        get: function get() {
            return this.map(function (xi) {
                return xi * xi;
            }).reduce(function (sum, xi) {
                return sum + xi;
            }, 0);
        }
    }, {
        key: "length",
        get: function get() {
            return Math.sqrt(this.length2);
        }
    }]);
    return Vector;
}(), (_applyDecoratedDescriptor(_class.prototype, "add", [shield], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, "add"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "sub", [shield], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, "sub"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "dot", [shield], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, "dot"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "ifelse", [shield], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, "ifelse"), _class.prototype)), _class);

/**
 * Decorator to protect operator's input type by means of "Vector.of" utility
 */

function shield(target, key, descriptor) {
    var operator = descriptor.value;
    return (0, _extends3.default)({}, descriptor, {
        value: function shieldedOperator() {
            for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                args[_key3] = arguments[_key3];
            }

            return operator.call.apply(operator, [this].concat((0, _toConsumableArray3.default)(args.map(Vector.of))));
        }
    });
}