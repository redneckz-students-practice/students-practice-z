"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.appliedForce = appliedForce;
/**
 * TODO Read about "Adapter" pattern
 * https://refactoring.guru/ru/design-patterns/adapter
 * TODO Read about "Higher-order function"
 * TODO Read about "Currying"
 * https://en.wikipedia.org/wiki/Currying
 */

var MAX_ENERGY = 1 * 1000 * 1000;

/**
 * Higher-order function to define force applied to points system
 * @param {({point: Point, position: Vetor, velocity: Vetor, i: number}) -> Vetor} force
 * @return {(PointsSystemState, Time) -> PointsSystemState} Force applied to points system
  */
function appliedForce(force) {
    return function (state, t) {
        var points = state.points,
            positions = state.positions,
            velocities = state.velocities;

        var nextVelocities = points.map(function (point, i) {
            var position = positions[i];
            var velocity = velocities[i];
            // f = ma = m * dv / dt
            var dt = t - state.prev.t;
            var dv = force({
                state: state,
                point: point,
                position: position,
                velocity: velocity,
                i: i
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
    var maxV = Math.sqrt(2 * MAX_ENERGY / m);
    return function (velocity) {
        var energy = m * velocity.length * velocity.length / 2;
        if (energy <= MAX_ENERGY) {
            return velocity;
        }
        return velocity.dot(maxV / velocity.length);
    };
}