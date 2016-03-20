'use strict';

var _mocha = require('mocha');

var _chai = require('chai');

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _inject = require('./inject');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _mocha.describe)('inject', function () {
    var func = void 0;

    (0, _mocha.beforeEach)(function () {
        func = _sinon2.default.spy(function (attrs) {
            return attrs;
        });
    });

    (0, _mocha.it)('should inject provided attrs', function () {
        var injectedFunc = (0, _inject.inject)({ foo: 123 })(func);
        (0, _chai.expect)(injectedFunc({ bar: 456 })).to.deep.equal({ foo: 123, bar: 456 });
        _sinon2.default.assert.calledWithMatch(func, { foo: 123, bar: 456 });
    });

    (0, _mocha.it)('should inject attrs by means of provider function', function () {
        var injectedFunc = (0, _inject.inject)(function () {
            return { foo: 123 };
        })(func);
        (0, _chai.expect)(injectedFunc({ bar: 456 })).to.deep.equal({ foo: 123, bar: 456 });
        _sinon2.default.assert.calledWithMatch(func, { foo: 123, bar: 456 });
    });

    (0, _mocha.it)('should preserve context of decorated function', function () {
        var obj = {};
        var injectedFunc = (0, _inject.inject)()(func);
        injectedFunc.call(obj);
        _sinon2.default.assert.calledOn(func, obj);
    });

    (0, _mocha.it)('should return result computed by decorated function', function () {
        var injectedFunc = (0, _inject.inject)()(func);
        (0, _chai.expect)(injectedFunc({ bar: 456 })).to.deep.equal({ bar: 456 });
    });
});