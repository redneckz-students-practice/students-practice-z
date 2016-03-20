/* eslint no-restricted-syntax: ["error", "ForInStatement", "LabeledStatement", "WithStatement"] */

import {describe, beforeEach, it} from 'mocha';
import {expect} from 'chai';
import {Stream} from './stream';

describe('Stream', () => {
    let stream;

    beforeEach(() => {
        stream = new Stream(function* g() {
            yield 1;
            yield 2;
            yield 3;
            yield 4;
            yield 5;
        });
    });

    describe('of', () => {
        it('should wrap value into stream', () => {
            expect([...Stream.of(0)]).to.deep.equal([0]);
        });
    });

    describe('head', () => {
        it('should return first element immediately', () => {
            expect(stream.head).to.equal(1);
        });
    });

    describe('tail', () => {
        it('should return stream without first element', () => {
            expect([...stream.tail]).to.deep.equal([2, 3, 4, 5]);
            expect([...stream.tail.tail]).to.deep.equal([3, 4, 5]);
        });
    });

    describe('take', () => {
        it('should return cropped stream', () => {
            expect([...stream.take(3)]).to.deep.equal([1, 2, 3]);
        });
    });

    describe('scan', () => {
        it('should produce reduced stream by means of reducer function', () => {
            expect(
                [...stream.scan((a, b) => a + b, 0)]
            ).to.deep.equal(
                [1, 3, 6, 10, 15]
            );
        });
    });

    describe('concat', () => {
        it('should concatenate streams with respect to arguments order', () => {
            expect(
                [...Stream.of(0).concat(stream, Stream.of(6))]
            ).to.deep.equal(
                [0, 1, 2, 3, 4, 5, 6]
            );
        });

        it('should concatenate scalars as well as streams', () => {
            expect(
                [...Stream.of(0).concat(stream, 6)]
            ).to.deep.equal(
                [0, 1, 2, 3, 4, 5, 6]
            );
        });
    });

    describe('should obey the three monad laws', () => {
        it('Left identity', () => {
            const inc = x => Stream.of(x + 1);
            expect(
                [...Stream.of(7).chain(inc)]
            ).to.deep.equal(
                [...inc(7)]
            );
        });

        it('Right identity', () => {
            expect(
                [...stream.chain(Stream.of)]
            ).to.deep.equal(
                [...stream]
            );
        });

        it('Associativity', () => {
            const add = x => Stream.of(x + x);
            const mul = x => Stream.of(x * x);
            expect(
                [...stream.chain(add).chain(mul)]
            ).to.deep.equal(
                [...stream.chain(x => add(x).chain(mul))]
            );
        });
    });
});
