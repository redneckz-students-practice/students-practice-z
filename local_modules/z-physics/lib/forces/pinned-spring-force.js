'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.pinnedSpringForce = pinnedSpringForce;

var _baseSpringForce = require('./base-spring-force');

function pinnedSpringForce(_ref) {
    var pinPosition = _ref.pinPosition,
        pointIndex = _ref.pointIndex,
        _ref$k = _ref.k,
        k = _ref$k === undefined ? 1 : _ref$k,
        _ref$len = _ref.len,
        len = _ref$len === undefined ? 100 : _ref$len;

    var f = (0, _baseSpringForce.baseSpringForce)({ k: k, len: len });
    return function (_ref2) {
        var position = _ref2.position,
            i = _ref2.i;

        if (i === pointIndex) {
            return f(position, pinPosition);
        }
        return position.zero();
    };
}