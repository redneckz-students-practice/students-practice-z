'use strict';

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _mocha = require('mocha');

var _chai = require('chai');

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _cached = require('./cached');

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

(0, _mocha.describe)('cached', function () {
    (0, _mocha.describe)('applied to standalone function', function () {
        var func = void 0;
        var cachedFunc = void 0;

        (0, _mocha.beforeEach)(function () {
            func = _sinon2.default.spy(function () {
                return 42;
            });
            cachedFunc = (0, _cached.cached)(func);
        });

        (0, _mocha.it)('should preserve context of decorated function', function () {
            var obj = {};
            cachedFunc.call(obj);
            _sinon2.default.assert.calledOn(func, obj);
        });

        (0, _mocha.it)('should cache the last call against named args of decorated function', function () {
            (0, _chai.expect)(cachedFunc({ foo: 1, bar: 2 })).to.equal(42);
            _sinon2.default.assert.calledWith(func, { foo: 1, bar: 2 });
            (0, _chai.expect)(cachedFunc({ foo: 1, bar: 2 })).to.equal(42);
            _sinon2.default.assert.calledOnce(func);
            (0, _chai.expect)(cachedFunc({ foo: 2, bar: 3 })).to.equal(42);
            _sinon2.default.assert.calledWith(func, { foo: 2, bar: 3 });
            _sinon2.default.assert.calledTwice(func);
        });

        (0, _mocha.it)('should cache the first call of decorated function without args', function () {
            (0, _chai.expect)(cachedFunc()).to.equal(42);
            _sinon2.default.assert.calledWith(func, undefined);
            (0, _chai.expect)(cachedFunc()).to.equal(42);
            _sinon2.default.assert.calledOnce(func);
        });
    });

    (0, _mocha.describe)('applied to method', function () {
        var _method = void 0;
        var obj = void 0;

        (0, _mocha.beforeEach)(function () {
            var _desc, _value, _class;

            _method = _sinon2.default.spy(function () {
                return 42;
            });
            var Type = (_class = function () {
                function _class() {
                    (0, _classCallCheck3.default)(this, _class);
                }

                (0, _createClass3.default)(_class, [{
                    key: 'method',
                    value: function method() {
                        var _method2;

                        return (_method2 = _method).call.apply(_method2, [this].concat(Array.prototype.slice.call(arguments)));
                    }
                }]);
                return _class;
            }(), (_applyDecoratedDescriptor(_class.prototype, 'method', [_cached.cached], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'method'), _class.prototype)), _class);
            obj = new Type();
        });

        (0, _mocha.it)('should preserve context of decorated method', function () {
            obj.method();
            _sinon2.default.assert.calledOn(_method, obj);
        });

        (0, _mocha.it)('should cache the last call against named args of decorated method', function () {
            (0, _chai.expect)(obj.method({ foo: 1, bar: 2 })).to.equal(42);
            _sinon2.default.assert.calledWith(_method, { foo: 1, bar: 2 });
            (0, _chai.expect)(obj.method({ foo: 1, bar: 2 })).to.equal(42);
            _sinon2.default.assert.calledOnce(_method);
            (0, _chai.expect)(obj.method({ foo: 2, bar: 3 })).to.equal(42);
            _sinon2.default.assert.calledWith(_method, { foo: 2, bar: 3 });
            _sinon2.default.assert.calledTwice(_method);
        });

        (0, _mocha.it)('should cache the first call of decorated method without args', function () {
            (0, _chai.expect)(obj.method()).to.equal(42);
            _sinon2.default.assert.calledWith(_method, undefined);
            (0, _chai.expect)(obj.method()).to.equal(42);
            _sinon2.default.assert.calledOnce(_method);
        });
    });

    (0, _mocha.describe)('applied to getter', function () {
        var getter = void 0;
        var obj = void 0;

        (0, _mocha.beforeEach)(function () {
            var _desc2, _value2, _class2;

            getter = _sinon2.default.spy(function () {
                return 42;
            });
            var Type = (_class2 = function () {
                function _class2() {
                    (0, _classCallCheck3.default)(this, _class2);
                }

                (0, _createClass3.default)(_class2, [{
                    key: 'prop',
                    get: function get() {
                        return getter.call(this);
                    }
                }]);
                return _class2;
            }(), (_applyDecoratedDescriptor(_class2.prototype, 'prop', [_cached.cached], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'prop'), _class2.prototype)), _class2);
            obj = new Type();
        });

        (0, _mocha.it)('should preserve context of decorated getter', function () {
            (0, _chai.expect)(obj).to.have.property('prop', 42);
            _sinon2.default.assert.calledOn(getter, obj);
        });

        (0, _mocha.it)('should cache the first access value of decorated property', function () {
            (0, _chai.expect)(obj).to.have.property('prop', 42);
            (0, _chai.expect)(obj).to.have.property('prop', 42);
            _sinon2.default.assert.calledOnce(getter);
        });
    });
});