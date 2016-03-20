import {beforeEach, describe, it} from 'mocha';
import {expect} from 'chai';
import sinon from 'sinon';
import {inject} from './inject';

describe('inject', () => {
    let func;

    beforeEach(() => {
        func = sinon.spy(attrs => attrs);
    });

    it('should inject provided attrs', () => {
        const injectedFunc = inject({foo: 123})(func);
        expect(injectedFunc({bar: 456})).to.deep.equal({foo: 123, bar: 456});
        sinon.assert.calledWithMatch(func, {foo: 123, bar: 456});
    });

    it('should inject attrs by means of provider function', () => {
        const injectedFunc = inject(() => ({foo: 123}))(func);
        expect(injectedFunc({bar: 456})).to.deep.equal({foo: 123, bar: 456});
        sinon.assert.calledWithMatch(func, {foo: 123, bar: 456});
    });

    it('should preserve context of decorated function', () => {
        const obj = {};
        const injectedFunc = inject()(func);
        obj::injectedFunc();
        sinon.assert.calledOn(func, obj);
    });

    it('should return result computed by decorated function', () => {
        const injectedFunc = inject()(func);
        expect(injectedFunc({bar: 456})).to.deep.equal({bar: 456});
    });
});
