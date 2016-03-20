import {inject} from 'z-dependency-injection';
import {Vector} from 'z-math';
import {
    emptyBoxForce,
    brickForce,
    boundSpringForce,
    composeForces,
    appliedForce
} from 'z-physics';
import {stageObjects} from './stage-objects-providers';

/**
 * Whole stage forces composed into one
 * @return {PointsSystemState -> Time -> PointsSystemState} applied force
 */
export const stageForces = inject(
    stageObjects
)(
    ({
        stageBox,
        bricks,
        boundSprings
    }) => appliedForce(
        composeForces(
            stageBoxToForce(stageBox),
            ...bricks.map(brickToForce),
            ...boundSprings.map(boundSpringToForce)
        )
    )
);

function stageBoxToForce({x, y, w, h}) {
    return emptyBoxForce({
        offset: new Vector(x, y),
        size: new Vector(w, h)
    });
}

function brickToForce({k, x, y, w, h}) {
    return brickForce({
        k,
        offset: new Vector(x, y),
        size: new Vector(w, h)
    });
}

function boundSpringToForce([pointAIndex, pointBIndex]) {
    return boundSpringForce({pointAIndex, pointBIndex});
}
