/* eslint no-restricted-syntax: ["error", "ForInStatement", "LabeledStatement", "WithStatement"] */

import {Stream} from './stream';

/**
 * This is partial extension of Stream (for illustration purposes).
 * @see Stream
 * @typedef {Stream(Promise(A))} AsynStream
 */
export class AsyncStream extends Stream {
    static of = x => new AsyncStream(function* singleton() {
        yield Promise.resolve(x);
    });

    /**
     * @override
     * @param {A -> B} f
     * @return {AsyncStream(B)}
     */
    map = f => super.map(x$ => x$.then(f));

    /**
     * TODO Partial implemetation
     * @override
     * @param {A -> AsyncStream(B)} f
     * @return {AsyncStream(B)}
     */
    chain = f => super.map(x$ => x$.then(x => f(x).head));

    /**
     * @override
     * @param {(B, A) -> B} f - Reducer
     * @param {B} initial - Accumulator
     * @return {AsyncStream(B)}
     */
    scan = (f, initial) => super.scan(
        (acc$, x$) => Promise.all([acc$, x$]).then(
            ([acc, x]) => f(acc, x)
        ),
        Promise.resolve(initial)
    );

    /**
     * Converts stream to provider function to access consequent elements one by one
     * Provider is an unpure function (encapsulates side effect)
     * @override
     * @param {A} emptyVal - Default value
     * @return {() -> A}
     */
    provider(emptyVal) {
        let curr = emptyVal;
        this.forEach((x) => {
            curr = x;
        });
        return () => curr;
    }

    /**
     * Executes stream with handler
     * @param {A -> Unit} handler
     * @return {AsyncStream(A)}
     */
    forEach(handler) {
        const gen = this.g();
        const exec = () => {
            const {value, done} = gen.next();
            if (done) return;
            value.then(
                (x) => {
                    handler(x);
                    exec();
                },
                err => gen.throw(err)
            );
        };
        exec();
        return this;
    }
}
