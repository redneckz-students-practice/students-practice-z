import {baseSpringForce} from './base-spring-force';

export function boundSpringForce({
    pointAIndex,
    pointBIndex,
    k = 10,
    len = 100
}) {
    const f = baseSpringForce({k, len});
    return ({state: {positions}, position: pos, i}) => {
        switch (i) {
            case pointAIndex:
                return f(pos, positions[pointBIndex]);
            case pointBIndex:
                return f(pos, positions[pointAIndex]);
            default:
                return pos.zero();
        }
    };
}
