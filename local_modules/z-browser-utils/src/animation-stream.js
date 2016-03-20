import {AsyncStream} from 'z-math';
import {requestAnimationFrame} from './request-animation-frame';

export const animationStream = new AsyncStream(function* anim() {
    const frame = () => new Promise(
        resolve => requestAnimationFrame(() => resolve(Date.now()))
    );
    while (true) yield frame();
});
