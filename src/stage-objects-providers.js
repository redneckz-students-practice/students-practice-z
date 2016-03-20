import {inject, _} from 'z-dependency-injection';
import {Vector} from 'z-math';
import {PointsSystemState} from 'z-physics';
import {stageSize} from './stage-size-provider';
import {stageBricks} from './stage-bricks-provider';

const STAGE_WALLS_THICKNESS = 0.1;

/**
 * Stage box has walls to clamp objects inside window
 * @return {{x: number, y: number, w: number, h: number}}
 */
export const stageBox = inject(
    stageSize
)(
    ({w, h}) => ({
        x: STAGE_WALLS_THICKNESS * w,
        y: STAGE_WALLS_THICKNESS * h,
        w: (1 - (2 * STAGE_WALLS_THICKNESS)) * w,
        h: (1 - (2 * STAGE_WALLS_THICKNESS)) * h
    })
);

/**
 * Initial state consists from points and theirs positions
 * @return {Time -> PointsSystemState}
 */
export const initialState = inject(_)(
    () => t => new PointsSystemState({
        points: [
            {m: 1}, // point #0 with mass = 1
            {m: 3}, // point #1 with mass = 3
            {m: 7} //  point #2 with mass = 7
        ],
        positions: [
            new Vector(10, 10),
            new Vector(200, 200),
            new Vector(100, 200)
        ],
        t
    })
);

/**
 * @typedef {number} PointIndex
 * @typedef {Pair(PointIndex)} BoundSpring
 *
 * @return {Array(BoundSpring)}
 */
export const boundSprings = inject(_)(
    () => [
        [0, 1], // from point #0 to point #1
        [1, 2], // from point #1 to point #2
        [2, 0] //  from point #2 to point #0
    ]
);

/**
 * Maps all stage objects into one to simplify usage
 * @return {{stageBox: StageBox, bricks: Array(Brick), boundSprings: Array(BoundSpring)}}
 */
export const stageObjects = inject(
    () => ({
        stageBox: stageBox(),
        bricks: stageBricks(),
        boundSprings: boundSprings()
    })
)();
