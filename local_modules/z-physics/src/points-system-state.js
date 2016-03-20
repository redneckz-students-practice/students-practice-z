/**
 * TODO Read about "Immutable" data structures
 */

const TRAJECTORY_MAX_LEN = 5;

/**
 * Immutable data structure to store points system snapshot bound to some time point
 * So points system state consists of points, correspoding positions, velocities
 * and some time point
 */
export class PointsSystemState {
    constructor({
        points,
        positions,
        t,
        prevState = null
    }) {
        if (!Array.isArray(points) ||
            !Array.isArray(positions) ||
            (points.length !== positions.length) ||
            (points.length === 0) ||
            !t
        ) {
            throw new Error('Invalid argument');
        }
        this.points = points;
        this.positions = positions;
        this.t = t;
        this.prevState = prevState;
        this::cropTrajetory();
    }

    get prev() {
        return this.prevState || this;
    }

    get dt() {
        const dt = this.t - this.prev.t;
        return dt || (1 / 60);
    }

    get deltaPositions() {
        return this.positions.map((pos, i) => pos.sub(this.prev.positions[i]));
    }

    get velocities() {
        return this.deltaPositions.map(dr => dr.dot(1 / this.dt));
    }

    next(velocities, t) {
        // Inertia
        return new PointsSystemState({
            points: this.points,
            positions: this.positions.map((pos, i) => {
                const dt = t - this.t;
                const dr = velocities[i].dot(dt);
                return pos.add(dr);
            }),
            t,
            prevState: this
        });
    }
}

/**
 * Trajetory should be cropped at some depth
 * to avoid potential memory leaks
 */
function cropTrajetory(depth = 0) {
    if (depth === TRAJECTORY_MAX_LEN) {
        delete this.prevState;
    } else if (this.prevState) {
        this.prevState::cropTrajetory(depth + 1);
    }
}
