import {animationStream} from 'z-browser-utils';
import {initialState} from './stage-objects-providers';
import {stageForces} from './stage-forces-provider';

/**
 * Points system timline
 * @constant {AsyncStream(Time)}
 */
const timeline = animationStream.map(millisToSeconds);

function millisToSeconds(millis) {
    return Number((millis / 1000).toFixed(3));
}

/**
 * Points system evolution or points system states along timeline
 * @constant {AsyncStream(PointsSystemState)}
 */
export const pointsSystemStatesStream = timeline.scan(
    (state, t) => stageForces()(state || initialState()(t), t),
);
