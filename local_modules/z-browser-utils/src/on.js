import {AsyncStream} from 'z-math';

/**
 * DOM events Monad represents events of some type on some target
 *
 * Usage:
 * const clicks = document::on('click');
 * const points = clicks
 *     .map(ev => ({x: ev.clientX, y: ev.clientY}))
 *     .forEach(console.log);
 */
export function on(eventType) {
    const ev$ = () => new Promise(
        resolve => this.addEventListener(eventType, function handler(ev) {
            // handle once
            ev.target.removeEventListener(eventType, handler);
            resolve(ev);
        })
    );
    return new AsyncStream(function* events() {
        while (true) yield ev$();
    });
}
