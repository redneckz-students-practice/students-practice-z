import {line} from 'z-canvas-primitives';

export function springView({posA, posB}) {
    return line({
        x0: posA.x(0),
        y0: posA.x(1),
        x1: posB.x(0),
        y1: posB.x(1),
        stroke: 'lightgray'
    })();
}
