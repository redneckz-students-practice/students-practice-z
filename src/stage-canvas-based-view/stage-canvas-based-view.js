import {group, rect} from 'z-canvas-primitives';
import {stageBoxView} from './stage-box-view';
import {brickView} from './brick-view';
import {pointView} from './point-view';
import {springView} from './spring-view';

export const stageCanvasBasedView = ({
    stageSize: {w, h},
    stageObjects: {stageBox, bricks, boundSprings},
    pointsSystemState: {points, positions}
}) => group(
    rect({x: 0, y: 0, w, h})(
        stageBoxView(stageBox),
        ...bricks.map(brickView)
    ),
    group(
        ...boundSprings.map(
            ([posAIndex, posBIndex]) => (
                springView({posA: positions[posAIndex], posB: positions[posBIndex]})
            )
        ),
        ...points.map(
            (point, i) => (
                pointView({w, h, point, pos: positions[i]})
            )
        )
    )
);
