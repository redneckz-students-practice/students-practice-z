'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.boundSpringForce = boundSpringForce;

var _baseSpringForce = require('./base-spring-force');

function boundSpringForce(_ref) {
    var pointAIndex = _ref.pointAIndex,
        pointBIndex = _ref.pointBIndex,
        _ref$k = _ref.k,
        k = _ref$k === undefined ? 10 : _ref$k,
        _ref$len = _ref.len,
        len = _ref$len === undefined ? 100 : _ref$len;

    var f = (0, _baseSpringForce.baseSpringForce)({ k: k, len: len });
    return function (_ref2) {
        var positions = _ref2.state.positions,
            pos = _ref2.position,
            i = _ref2.i;

        switch (i) {
            case pointAIndex:
                return f(pos, positions[pointBIndex]);
            case pointBIndex:
                return f(pos, positions[pointAIndex]);
            default:
                return pos.zero();
        }
    };
}