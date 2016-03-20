'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

exports.composeForces = composeForces;

var _zMath = require('z-math');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function composeForces() {
    for (var _len = arguments.length, fs = Array(_len), _key = 0; _key < _len; _key++) {
        fs[_key] = arguments[_key];
    }

    return function (state, t) {
        return _zMath.Vector.sum.apply(_zMath.Vector, (0, _toConsumableArray3.default)(fs.map(function (f) {
            return f(state, t);
        })));
    };
}