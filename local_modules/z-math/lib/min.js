"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.min = min;
var DEFAULT_CMP = function DEFAULT_CMP(a, b) {
    return a - b;
};

/**
 * @param {Array(A)} list - list/array to search extremum for
 * @param {(A, A) -> number} cmp - comparator function
 * @return {number} minimal item index
 */
function min(list) {
    var cmp = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_CMP;

    if (!list || !list.length) {
        return null;
    }
    if (list.length === 1) {
        return list[0];
    }
    return list.reduce(function (extreme, item, i) {
        return cmp(list[extreme], item) <= 0 ? extreme : i;
    }, 0);
}