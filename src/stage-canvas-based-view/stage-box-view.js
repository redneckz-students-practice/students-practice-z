import {rect} from 'z-canvas-primitives';

export function stageBoxView(stageBox) {
    return rect({
        ...stageBox,
        fill: null,
        stroke: 'lightgray',
        dashed: true
    })();
}
