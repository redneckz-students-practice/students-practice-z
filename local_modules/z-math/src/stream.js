/* eslint no-restricted-syntax: ["error", "ForInStatement", "LabeledStatement", "WithStatement"] */

/**
 * TODO Read about sequences in mathematics
 * https://en.wikipedia.org/wiki/Sequence
 * TODO Read about ECMAScript generators
 * https://developer.mozilla.org/ru/docs/Web/JavaScript/Guide/Iterators_and_Generators
 * TODO Read about ECMAScript Iterable
 * https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Symbol/iterator
 * TODO Read about infinite sequences in Java
 * http://blog.agiledeveloper.com/2016/06/lazy-evaluation-make-infinite-streams.html
 * TODO Read about Functor, Applicative, Chain, Monad
 * https://github.com/fantasyland/fantasy-land
 * https://medium.com/javascript-scene/javascript-monads-made-simple-7856be57bfe8
 * TODO Also take a look at tests
 * TODO Analize Promise scpecification to answer two questions
 * 1. What makes Promise look like Monad?
 * 2. What is the difference?
 * TODO Read about tail recursion and search for TCO examples here
 * http://2ality.com/2015/06/tail-call-optimization.html
 */

/**
 * Stream monad represents some lazily computed sequence
 * Can be contructed from scalar value or ECMAScript generator-function
 */
export class Stream {
    static nil = () => new Stream(function* nil() {
        // Empty stream
    });

    /**
     * Stream with the only element
     * @param {A} x - The only element
     * @return {Stream(A)}
     */
    static of = x => new Stream(function* singleton() {
        yield x;
    });

    /**
     * @param {() => Generator} g - Generator-function without args
     */
    constructor(g) {
        this.g = g;
        this[Symbol.iterator] = g;
    }

    /**
     * @return {A} First element
     */
    get head() {
        return this.g().next().value;
    }

    /**
     * @return {Stream(A)} First element wrapped into stream
     */
    first() {
        const stream = this;
        return new this.constructor(function* head() {
            yield stream.head;
        });
    }

    /**
     * @return {Stream(A)} Elements of stream exluding the first one
     */
    get tail() {
        const stream = this;
        return new this.constructor(function* tail() {
            const gen = stream.g();
            gen.next(); // Behead
            yield* gen;
        });
    }

    /**
     * Converts stream to provider function to access consequent elements one by one
     * Provider is an unpure function (encapsulates side effect)
     * @param {A} emptyVal - Default value
     * @return {() -> A}
     */
    provider(emptyVal) {
        const gen = this.g();
        return () => {
            const {value, done} = gen.next();
            return !done ? value : emptyVal;
        };
    }

    take = n => take(this, n);

    /**
     * Functor's part
     * @param {A -> B} f
     * @return {Stream(B)}
     */
    map(f) {
        const stream = this;
        return new this.constructor(function* mapped() {
            for (const x of stream) yield f(x);
        });
    }

    /**
     * Monad's part. Also know as flatMap or bind
     * @param {A -> Stream(B)} f
     * @return {Stream(B)}
     */
    chain(f) {
        const stream = this;
        return new this.constructor(function* chained() {
            for (const x of stream) yield* f(x);
        });
    }

    /**
     * Applicative's part
     * @param {Stream(A -> B)} stream
     * @return {Stream(B)}
     */
    ap = stream => this.chain(x => stream.map(f => f(x)));

    /**
     * http://reactivex.io/documentation/operators/scan.html
     * @param {(B, A) -> B} f - Reducer
     * @param {B} acc - Optional accumulator
     * @return {Stream(B)}
     */
    scan(f, acc) {
        const stream = this;
        return new this.constructor(function* scanned() {
            let y = acc;
            for (const x of stream) yield y = f(y, x);
        });
    }

    /**
     * Concatenate all streams regarding arguments order
     * @param {[Stream(A)]} xss - Iterables
     * @return {Stream(A)} Concatenated stream
     */
    concat(...xss) {
        const stream = this;
        return new this.constructor(function* concatenated() {
            yield* stream;
            for (const xs of xss) {
                if (Symbol.iterator in xs) {
                    yield* xs;
                } else {
                    yield xs;
                }
            }
        });
    }
}

/**
 * Take first n elements of provided stream
 * @param {Stream(A)} stream - Stream to take from
 * @param {number} n - Elements count to take
 * @param acc - TCO supporting arg
 * @return {Stream(A)} Cropped stream
 */
function take(stream, n, acc = Stream.nil()) {
    return n <= 0 ? acc : take(stream.tail, n - 1, acc.concat(stream.head));
}
