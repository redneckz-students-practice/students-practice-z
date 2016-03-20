"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.constantForce = constantForce;
function constantForce(a) {
    return function (_ref) {
        var point = _ref.point;
        return a.dot(point.m);
    };
}