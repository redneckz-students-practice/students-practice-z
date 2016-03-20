import {describe, it} from 'mocha';
import {expect} from 'chai';
import {Vector} from './vector';

const EPS = 0.001;

describe('Vector', () => {
    describe('x(i)', () => {
        it('should return components by index', () => {
            const v = new Vector(3, 4);
            expect(v.x(0)).to.equal(3);
            expect(v.x(1)).to.equal(4);
        });
        it('components index should be cyclic', () => {
            const v = new Vector(3, 4);
            expect(v.x(0)).to.equal(3);
            expect(v.x(1)).to.equal(4);
            expect(v.x(2)).to.equal(3);
            expect(v.x(3)).to.equal(4);
        });
    });

    describe('n', () => {
        it('should reflect number of dimensions', () => {
            const v = new Vector(3, 4);
            expect(v.n).to.equal(2);
        });
    });

    describe('length', () => {
        it('should reflect euclidean length', () => {
            const v = new Vector(3, 4);
            expect(v.length).to.be.closeTo(5, EPS);
        });
    });

    describe('array', () => {
        it('should return array representation', () => {
            const v = new Vector(3, 4);
            expect(v.array).to.deep.equal([3, 4]);
        });
    });

    describe('e(i)', () => {
        it('should return basic vector', () => {
            const v = new Vector(3, 4);
            expect(v.e(0)).to.deep.equal(new Vector(1, 0));
            expect(v.e(1)).to.deep.equal(new Vector(0, 1));
        });
    });

    describe('add', () => {
        it('should not touch original vectors and compute the new one (immutability)', () => {
            const v = new Vector(3, 4);
            v.add(new Vector(1, 2));
            expect(v).to.deep.equal(new Vector(3, 4));
        });
        it('should add vectors', () => {
            const result = new Vector(3, 4).add(new Vector(1, 2));
            expect(result.x(0)).to.be.closeTo(3 + 1, EPS);
            expect(result.x(1)).to.be.closeTo(4 + 2, EPS);
        });
        it('should accept scalars', () => {
            const result = new Vector(3, 4).add(1);
            expect(result.x(0)).to.be.closeTo(3 + 1, EPS);
            expect(result.x(1)).to.be.closeTo(4 + 1, EPS);
        });
    });

    describe('inv', () => {
        it('should not touch original vector and compute the new one', () => {
            const v = new Vector(3, 4);
            v.inv();
            expect(v).to.deep.equal(new Vector(3, 4));
        });
        it('should invert each component by changing it\'s sign', () => {
            const result = new Vector(3, 4).inv();
            expect(result.x(0)).to.be.closeTo(-3, EPS);
            expect(result.x(1)).to.be.closeTo(-4, EPS);
        });
    });

    /**
     * TODO Cover more cases
     */
});
