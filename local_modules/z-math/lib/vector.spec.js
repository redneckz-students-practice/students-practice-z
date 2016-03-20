'use strict';

var _mocha = require('mocha');

var _chai = require('chai');

var _vector = require('./vector');

var EPS = 0.001;

(0, _mocha.describe)('Vector', function () {
    (0, _mocha.describe)('x(i)', function () {
        (0, _mocha.it)('should return components by index', function () {
            var v = new _vector.Vector(3, 4);
            (0, _chai.expect)(v.x(0)).to.equal(3);
            (0, _chai.expect)(v.x(1)).to.equal(4);
        });
        (0, _mocha.it)('components index should be cyclic', function () {
            var v = new _vector.Vector(3, 4);
            (0, _chai.expect)(v.x(0)).to.equal(3);
            (0, _chai.expect)(v.x(1)).to.equal(4);
            (0, _chai.expect)(v.x(2)).to.equal(3);
            (0, _chai.expect)(v.x(3)).to.equal(4);
        });
    });

    (0, _mocha.describe)('n', function () {
        (0, _mocha.it)('should reflect number of dimensions', function () {
            var v = new _vector.Vector(3, 4);
            (0, _chai.expect)(v.n).to.equal(2);
        });
    });

    (0, _mocha.describe)('length', function () {
        (0, _mocha.it)('should reflect euclidean length', function () {
            var v = new _vector.Vector(3, 4);
            (0, _chai.expect)(v.length).to.be.closeTo(5, EPS);
        });
    });

    (0, _mocha.describe)('array', function () {
        (0, _mocha.it)('should return array representation', function () {
            var v = new _vector.Vector(3, 4);
            (0, _chai.expect)(v.array).to.deep.equal([3, 4]);
        });
    });

    (0, _mocha.describe)('e(i)', function () {
        (0, _mocha.it)('should return basic vector', function () {
            var v = new _vector.Vector(3, 4);
            (0, _chai.expect)(v.e(0)).to.deep.equal(new _vector.Vector(1, 0));
            (0, _chai.expect)(v.e(1)).to.deep.equal(new _vector.Vector(0, 1));
        });
    });

    (0, _mocha.describe)('add', function () {
        (0, _mocha.it)('should not touch original vectors and compute the new one (immutability)', function () {
            var v = new _vector.Vector(3, 4);
            v.add(new _vector.Vector(1, 2));
            (0, _chai.expect)(v).to.deep.equal(new _vector.Vector(3, 4));
        });
        (0, _mocha.it)('should add vectors', function () {
            var result = new _vector.Vector(3, 4).add(new _vector.Vector(1, 2));
            (0, _chai.expect)(result.x(0)).to.be.closeTo(3 + 1, EPS);
            (0, _chai.expect)(result.x(1)).to.be.closeTo(4 + 2, EPS);
        });
        (0, _mocha.it)('should accept scalars', function () {
            var result = new _vector.Vector(3, 4).add(1);
            (0, _chai.expect)(result.x(0)).to.be.closeTo(3 + 1, EPS);
            (0, _chai.expect)(result.x(1)).to.be.closeTo(4 + 1, EPS);
        });
    });

    (0, _mocha.describe)('inv', function () {
        (0, _mocha.it)('should not touch original vector and compute the new one', function () {
            var v = new _vector.Vector(3, 4);
            v.inv();
            (0, _chai.expect)(v).to.deep.equal(new _vector.Vector(3, 4));
        });
        (0, _mocha.it)('should invert each component by changing it\'s sign', function () {
            var result = new _vector.Vector(3, 4).inv();
            (0, _chai.expect)(result.x(0)).to.be.closeTo(-3, EPS);
            (0, _chai.expect)(result.x(1)).to.be.closeTo(-4, EPS);
        });
    });

    /**
     * TODO Cover more cases
     */
});