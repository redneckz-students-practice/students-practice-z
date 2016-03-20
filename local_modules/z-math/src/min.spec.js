import {describe, it} from 'mocha';
import {expect} from 'chai';
import {min} from './min';

describe('min', () => {
    it('should return index of the minimal item', () => {
        const arr = [15, -1, 20, -10, 5];
        expect(min(arr)).to.equal(3);
    });

    it('should return index of the minimal item by means of comparator', () => {
        const arr = [15, -1, 20, -10, 5];
        const cmp = (a, b) => b - a;
        expect(min(arr, cmp)).to.equal(2);
    });

    it('should return index of the very first minimal item', () => {
        const arr = [15, -10, 20, -10, 5];
        expect(min(arr)).to.equal(1);
    });
});
