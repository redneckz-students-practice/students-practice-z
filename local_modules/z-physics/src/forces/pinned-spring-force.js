import {baseSpringForce} from './base-spring-force';

export function pinnedSpringForce({
    pinPosition,
    pointIndex,
    k = 1,
    len = 100
}) {
    const f = baseSpringForce({k, len});
    return ({position, i}) => {
        if (i === pointIndex) {
            return f(position, pinPosition);
        }
        return position.zero();
    };
}
