'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.emptyBoxForce = emptyBoxForce;

var _zMath = require('z-math');

/**
 * @param k - hardness coefficient
 * @param offset - box offset
 * @param size - box size
 */
function emptyBoxForce() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$k = _ref.k,
        k = _ref$k === undefined ? 1000 : _ref$k,
        offset = _ref.offset,
        size = _ref.size;

    var lower = offset;
    var upper = offset.add(size);
    return function (_ref2) {
        var position = _ref2.position;

        var dLow = lower.sub(position).map(_zMath.sigma);
        var dUp = upper.sub(position).map(_zMath.sigma.neg);
        var dr = dLow.add(dUp);
        return dr.dot(k);
    };
}