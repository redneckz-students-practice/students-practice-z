'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.brickForce = brickForce;

var _zMath = require('z-math');

/**
 * @param k - hardness coefficient
 * @param offset - brick offset
 * @param size - brick size
 */
function brickForce() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$k = _ref.k,
        k = _ref$k === undefined ? 1000 : _ref$k,
        offset = _ref.offset,
        size = _ref.size;

    var lower = offset;
    var upper = offset.add(size);
    return function (_ref2) {
        var position = _ref2.position;

        var dLow = lower.sub(position).map(_zMath.sigma.neg);
        var dUp = upper.sub(position).map(_zMath.sigma);
        var cond = dLow.abs().sub(dUp.abs()).map(_zMath.sigma.neg);
        // Choose the closest to the point boundary
        var dr = cond.ifelse(dLow, dUp);
        // The only boudary should be "active"
        var ei = (0, _zMath.min)(dr.abs().array);
        return dr.dot(dr.e(ei)).dot(k);
    };
}