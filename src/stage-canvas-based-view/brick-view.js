import {rect} from 'z-canvas-primitives';

export function brickView(brick) {
    return rect({
        ...brick,
        fill: '#F3F3F3',
        stroke: 'lightgray',
        dashed: true
    })();
}
