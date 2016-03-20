"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.baseSpringForce = baseSpringForce;
function baseSpringForce(_ref) {
    var _ref$k = _ref.k,
        k = _ref$k === undefined ? 10 : _ref$k,
        _ref$len = _ref.len,
        len = _ref$len === undefined ? 100 : _ref$len;

    return function (posA, posB) {
        var dr = posB.sub(posA);
        return dr.dot(dr.length / len).sub(dr).dot(k);
    };
}