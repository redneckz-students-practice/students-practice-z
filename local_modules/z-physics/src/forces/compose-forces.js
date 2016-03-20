import {Vector} from 'z-math';

export function composeForces(...fs) {
    return (state, t) => Vector.sum(...fs.map(f => f(state, t)));
}
