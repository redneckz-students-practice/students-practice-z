import {beforeEach, describe, it} from 'mocha';
import {expect} from 'chai';
import sinon from 'sinon';
import {cached} from './cached';

describe('cached', () => {
    describe('applied to standalone function', () => {
        let func;
        let cachedFunc;

        beforeEach(() => {
            func = sinon.spy(() => 42);
            cachedFunc = cached(func);
        });

        it('should preserve context of decorated function', () => {
            const obj = {};
            obj::cachedFunc();
            sinon.assert.calledOn(func, obj);
        });

        it('should cache the last call against named args of decorated function', () => {
            expect(cachedFunc({foo: 1, bar: 2})).to.equal(42);
            sinon.assert.calledWith(func, {foo: 1, bar: 2});
            expect(cachedFunc({foo: 1, bar: 2})).to.equal(42);
            sinon.assert.calledOnce(func);
            expect(cachedFunc({foo: 2, bar: 3})).to.equal(42);
            sinon.assert.calledWith(func, {foo: 2, bar: 3});
            sinon.assert.calledTwice(func);
        });

        it('should cache the first call of decorated function without args', () => {
            expect(cachedFunc()).to.equal(42);
            sinon.assert.calledWith(func, undefined);
            expect(cachedFunc()).to.equal(42);
            sinon.assert.calledOnce(func);
        });
    });

    describe('applied to method', () => {
        let method;
        let obj;

        beforeEach(() => {
            method = sinon.spy(() => 42);
            const Type = class {
                @cached
                method(...args) {
                    return this::method(...args);
                }
            };
            obj = new Type();
        });

        it('should preserve context of decorated method', () => {
            obj.method();
            sinon.assert.calledOn(method, obj);
        });

        it('should cache the last call against named args of decorated method', () => {
            expect(obj.method({foo: 1, bar: 2})).to.equal(42);
            sinon.assert.calledWith(method, {foo: 1, bar: 2});
            expect(obj.method({foo: 1, bar: 2})).to.equal(42);
            sinon.assert.calledOnce(method);
            expect(obj.method({foo: 2, bar: 3})).to.equal(42);
            sinon.assert.calledWith(method, {foo: 2, bar: 3});
            sinon.assert.calledTwice(method);
        });

        it('should cache the first call of decorated method without args', () => {
            expect(obj.method()).to.equal(42);
            sinon.assert.calledWith(method, undefined);
            expect(obj.method()).to.equal(42);
            sinon.assert.calledOnce(method);
        });
    });

    describe('applied to getter', () => {
        let getter;
        let obj;

        beforeEach(() => {
            getter = sinon.spy(() => 42);
            const Type = class {
                @cached
                get prop() {
                    return this::getter();
                }
            };
            obj = new Type();
        });

        it('should preserve context of decorated getter', () => {
            expect(obj).to.have.property('prop', 42);
            sinon.assert.calledOn(getter, obj);
        });

        it('should cache the first access value of decorated property', () => {
            expect(obj).to.have.property('prop', 42);
            expect(obj).to.have.property('prop', 42);
            sinon.assert.calledOnce(getter);
        });
    });
});
