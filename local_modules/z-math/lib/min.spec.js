'use strict';

var _mocha = require('mocha');

var _chai = require('chai');

var _min = require('./min');

(0, _mocha.describe)('min', function () {
    (0, _mocha.it)('should return index of the minimal item', function () {
        var arr = [15, -1, 20, -10, 5];
        (0, _chai.expect)((0, _min.min)(arr)).to.equal(3);
    });

    (0, _mocha.it)('should return index of the minimal item by means of comparator', function () {
        var arr = [15, -1, 20, -10, 5];
        var cmp = function cmp(a, b) {
            return b - a;
        };
        (0, _chai.expect)((0, _min.min)(arr, cmp)).to.equal(2);
    });

    (0, _mocha.it)('should return index of the very first minimal item', function () {
        var arr = [15, -10, 20, -10, 5];
        (0, _chai.expect)((0, _min.min)(arr)).to.equal(1);
    });
});