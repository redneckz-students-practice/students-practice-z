import {circle} from 'z-canvas-primitives';

const MIN_POINT_SIZE = 10;

export function pointView({w, h, point, pos}) {
    return circle({
        x: pos.x(0),
        y: pos.x(1),
        radius: computePointSize({w, h, point}),
        fill: 'lightgray'
    })();
}

function computePointSize({w, h, point: {m}}) {
    // Size is proportional to point mass and stage size
    const size = Math.sqrt(m); // 2D
    const stageUnit = computeStageUnit({w, h});
    return Math.max(MIN_POINT_SIZE, size * stageUnit);
}

function computeStageUnit({w, h}) {
    return Math.min(w, h) / 100;
}
