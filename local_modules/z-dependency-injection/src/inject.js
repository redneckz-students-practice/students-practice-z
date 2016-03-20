/**
 * TODO Read about "Dependecy Injection" pattern
 * TODO Read about "Decorator" pattern
 * TODO Read about ECMAScript decorators
 * https://medium.com/google-developers/exploring-es7-decorators-76ecb65fb841
 * TODO Read about "Evaluation strategy" (call by value & call by name)
 */

import {cached} from './cached';

const EMPTY_ATTRS = {};

/**
 * @typedef {Object} Attrs
 * @typedef {Attrs -> any} F
 *
 * Functional DI with caching
 * @param {() -> Attrs} injectedAttrs - attributes to inject (passed by name)
 * @return {F -> F} decorator that mixins injectedAttrs into decorated function attributes
 */
export function inject(injectedAttrs) {
    if (!injectedAttrs) {
        // Nothing to inject (just apply caching strategy)
        return cached;
    }
    if (!(typeof injectedAttrs === 'function')) {
        // Attributes should be passed by name
        return inject(() => injectedAttrs);
    }
    return (func = f => f) => {
        const cachedFunc = cached(func);
        return function injectedFunc(attrs) {
            const mixedAttrs = Object.assign({}, injectedAttrs(), attrs);
            return this::cachedFunc(mixedAttrs);
        };
    };
}

/**
 * Placeholder for "injectedAttrs" if nothing to inject
 */
export const _ = () => EMPTY_ATTRS;
