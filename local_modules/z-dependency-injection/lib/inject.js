'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports._ = undefined;

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

exports.inject = inject;

var _cached = require('./cached');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EMPTY_ATTRS = {};

/**
 * @typedef {Object} Attrs
 * @typedef {Attrs -> any} F
 *
 * Functional DI with caching
 * @param {() -> Attrs} injectedAttrs - attributes to inject (passed by name)
 * @return {F -> F} decorator that mixins injectedAttrs into decorated function attributes
 */
/**
 * TODO Read about "Dependecy Injection" pattern
 * TODO Read about "Decorator" pattern
 * TODO Read about ECMAScript decorators
 * https://medium.com/google-developers/exploring-es7-decorators-76ecb65fb841
 * TODO Read about "Evaluation strategy" (call by value & call by name)
 */

function inject(injectedAttrs) {
    if (!injectedAttrs) {
        // Nothing to inject (just apply caching strategy)
        return _cached.cached;
    }
    if (!(typeof injectedAttrs === 'function')) {
        // Attributes should be passed by name
        return inject(function () {
            return injectedAttrs;
        });
    }
    return function () {
        var func = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function (f) {
            return f;
        };

        var cachedFunc = (0, _cached.cached)(func);
        return function injectedFunc(attrs) {
            var mixedAttrs = (0, _assign2.default)({}, injectedAttrs(), attrs);
            return cachedFunc.call(this, mixedAttrs);
        };
    };
}

/**
 * Placeholder for "injectedAttrs" if nothing to inject
 */
var _ = exports._ = function _() {
    return EMPTY_ATTRS;
};