/**
 * TODO Read about "Decorator" pattern
 * TODO Read about ECMAScript decorators
 * https://medium.com/google-developers/exploring-es7-decorators-76ecb65fb841
 * TODO Read about "Symbol" data type
 * https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Symbol
 */

/*
 * Decorator for fields, getters and standalone functions
 * to cache result of the last access/invocation (shallow comparison)
 */
export function cached(target, key, descriptor) {
    if (typeof target === 'function' && !key && !descriptor) {
        // standalone function
        return memoizeLastAccess(target, {});
    }
    const {value, get} = descriptor;
    if (value) {
        // method
        return {
            ...descriptor,
            value: memoizeLastAccess(value)
        };
    } else if (get) {
        // getter
        return {
            ...descriptor,
            get: memoizeLastAccess(get)
        };
    }
    return descriptor;
}

function memoizeLastAccess(func, ctx = null) {
    const cacheProp = Symbol('cache');
    return function cachedFunc(attrs) {
        const cache = (ctx || this)[cacheProp];
        if (cache) {
            const [lastAttrs, lastResult] = cache;
            if (areAttrsSame(attrs, lastAttrs)) {
                return lastResult;
            }
        }
        const result = this::func(attrs);
        (ctx || this)[cacheProp] = [attrs, result];
        return result;
    };
}

function areAttrsSame(attrsA, attrsB) {
    if (attrsA === attrsB) {
        return true;
    }
    if (!attrsA || !attrsB) {
        return false;
    }
    const keys = Object.keys(attrsA);
    if (keys.length !== Object.keys(attrsB).length) {
        return false;
    }
    return keys.every(key => attrsA[key] === attrsB[key]);
}
