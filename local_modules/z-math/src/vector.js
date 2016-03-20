/**
 * TODO Read about "Immutable" data structures
 * TODO Read about "Decorator" pattern
 * TODO Read about ECMAScript decorators
 * https://medium.com/google-developers/exploring-es7-decorators-76ecb65fb841
 */

/**
 * Immutable multidimensional vector
 */
export class Vector {
    static of(x) {
        return (x instanceof Vector) ? x : new Vector(x);
    }

    static sum(...vectors) {
        if (vectors.length === 0) {
            return new Vector();
        }
        if (vectors.length === 1) {
            return vectors[0];
        }
        return vectors.reduce((a, b) => a.add(b));
    }

    constructor(...xs) {
        this.xs = xs;
    }

    get n() {
        return this.xs.length;
    }

    get array() {
        return [...this.xs];
    }

    get length2() {
        return this
            .map(xi => xi * xi)
            .reduce((sum, xi) => sum + xi, 0);
    }

    get length() {
        return Math.sqrt(this.length2);
    }

    x(i) {
        return this.xs[i % this.n];
    }

    /**
     * Basis
     * @param {number} ei - basis vector index
     * @return {Vector} Basis vector
     */
    e(ei) {
        return this.map((_, i) => (ei === i ? 1 : 0));
    }

    @shield
    add(vec) {
        return this.map((xi, i) => xi + vec.x(i));
    }

    @shield
    sub(vec) {
        return this.add(vec.inv());
    }

    inv() {
        return this.map(xi => -xi);
    }

    @shield
    dot(vec) {
        return this.map((xi, i) => xi * vec.x(i));
    }

    abs() {
        return this.map(xi => Math.abs(xi));
    }

    zero() {
        return this.map(() => 0);
    }

    @shield
    ifelse(truthy, falsy) {
        return this.map((xi, i) => (xi ? truthy.x(i) : falsy.x(i)));
    }

    map(func) {
        const result = this.xs.map(func);
        return new Vector(...result);
    }

    reduce(func, acc) {
        return this.xs.reduce(func, acc);
    }

    every(func) {
        return this.xs.every(func);
    }

    some(func) {
        return this.xs.some(func);
    }
}

/**
 * Decorator to protect operator's input type by means of "Vector.of" utility
 */
function shield(target, key, descriptor) {
    const operator = descriptor.value;
    return {
        ...descriptor,
        value: function shieldedOperator(...args) {
            return this::operator(...args.map(Vector.of));
        }
    };
}
