'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _symbol = require('babel-runtime/core-js/symbol');

var _symbol2 = _interopRequireDefault(_symbol);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.cached = cached;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * TODO Read about "Decorator" pattern
 * TODO Read about ECMAScript decorators
 * https://medium.com/google-developers/exploring-es7-decorators-76ecb65fb841
 * TODO Read about "Symbol" data type
 * https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Symbol
 */

/*
 * Decorator for fields, getters and standalone functions
 * to cache result of the last access/invocation (shallow comparison)
 */
function cached(target, key, descriptor) {
    if (typeof target === 'function' && !key && !descriptor) {
        // standalone function
        return memoizeLastAccess(target, {});
    }
    var value = descriptor.value,
        get = descriptor.get;

    if (value) {
        // method
        return (0, _extends3.default)({}, descriptor, {
            value: memoizeLastAccess(value)
        });
    } else if (get) {
        // getter
        return (0, _extends3.default)({}, descriptor, {
            get: memoizeLastAccess(get)
        });
    }
    return descriptor;
}

function memoizeLastAccess(func) {
    var ctx = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    var cacheProp = (0, _symbol2.default)('cache');
    return function cachedFunc(attrs) {
        var cache = (ctx || this)[cacheProp];
        if (cache) {
            var _cache = (0, _slicedToArray3.default)(cache, 2),
                lastAttrs = _cache[0],
                lastResult = _cache[1];

            if (areAttrsSame(attrs, lastAttrs)) {
                return lastResult;
            }
        }
        var result = func.call(this, attrs);
        (ctx || this)[cacheProp] = [attrs, result];
        return result;
    };
}

function areAttrsSame(attrsA, attrsB) {
    if (attrsA === attrsB) {
        return true;
    }
    if (!attrsA || !attrsB) {
        return false;
    }
    var keys = (0, _keys2.default)(attrsA);
    if (keys.length !== (0, _keys2.default)(attrsB).length) {
        return false;
    }
    return keys.every(function (key) {
        return attrsA[key] === attrsB[key];
    });
}