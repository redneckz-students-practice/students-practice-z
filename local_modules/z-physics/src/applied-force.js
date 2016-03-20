/**
 * TODO Read about "Adapter" pattern
 * https://refactoring.guru/ru/design-patterns/adapter
 * TODO Read about "Higher-order function"
 * TODO Read about "Currying"
 * https://en.wikipedia.org/wiki/Currying
 */

const MAX_ENERGY = 1 * 1000 * 1000;

/**
 * Higher-order function to define force applied to points system
 * @param {({point: Point, position: Vetor, velocity: Vetor, i: number}) -> Vetor} force
 * @return {(PointsSystemState, Time) -> PointsSystemState} Force applied to points system
  */
export function appliedForce(force) {
    return (state, t) => {
        const {points, positions, velocities} = state;
        const nextVelocities = points.map((point, i) => {
            const position = positions[i];
            const velocity = velocities[i];
            // f = ma = m * dv / dt
            const dt = t - state.prev.t;
            const dv = force({
                state,
                point,
                position,
                velocity,
                i
            }).dot(dt / point.m);
            // dv = v1 - v0
            return restrictVelocity(point.m)(velocity.add(dv));
        });
        return state.next(nextVelocities, t);
    };
}

/**
 * Energy should be restricted to avoid "explosions" caused by discrete errors
 * @param {number} m - Point mass
 * @return {Vector -> Vector} function to restrict energy by restricting velocity
 */
function restrictVelocity(m) {
    const maxV = Math.sqrt((2 * MAX_ENERGY) / m);
    return (velocity) => {
        const energy = (m * velocity.length * velocity.length) / 2;
        if (energy <= MAX_ENERGY) {
            return velocity;
        }
        return velocity.dot(maxV / velocity.length);
    };
}
