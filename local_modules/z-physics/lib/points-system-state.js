'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PointsSystemState = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * TODO Read about "Immutable" data structures
 */

var TRAJECTORY_MAX_LEN = 5;

/**
 * Immutable data structure to store points system snapshot bound to some time point
 * So points system state consists of points, correspoding positions, velocities
 * and some time point
 */

var PointsSystemState = exports.PointsSystemState = function () {
    function PointsSystemState(_ref) {
        var points = _ref.points,
            positions = _ref.positions,
            t = _ref.t,
            _ref$prevState = _ref.prevState,
            prevState = _ref$prevState === undefined ? null : _ref$prevState;
        (0, _classCallCheck3.default)(this, PointsSystemState);

        if (!Array.isArray(points) || !Array.isArray(positions) || points.length !== positions.length || points.length === 0 || !t) {
            throw new Error('Invalid argument');
        }
        this.points = points;
        this.positions = positions;
        this.t = t;
        this.prevState = prevState;
        cropTrajetory.call(this);
    }

    (0, _createClass3.default)(PointsSystemState, [{
        key: 'next',
        value: function next(velocities, t) {
            var _this = this;

            // Inertia
            return new PointsSystemState({
                points: this.points,
                positions: this.positions.map(function (pos, i) {
                    var dt = t - _this.t;
                    var dr = velocities[i].dot(dt);
                    return pos.add(dr);
                }),
                t: t,
                prevState: this
            });
        }
    }, {
        key: 'prev',
        get: function get() {
            return this.prevState || this;
        }
    }, {
        key: 'dt',
        get: function get() {
            var dt = this.t - this.prev.t;
            return dt || 1 / 60;
        }
    }, {
        key: 'deltaPositions',
        get: function get() {
            var _this2 = this;

            return this.positions.map(function (pos, i) {
                return pos.sub(_this2.prev.positions[i]);
            });
        }
    }, {
        key: 'velocities',
        get: function get() {
            var _this3 = this;

            return this.deltaPositions.map(function (dr) {
                return dr.dot(1 / _this3.dt);
            });
        }
    }]);
    return PointsSystemState;
}();

/**
 * Trajetory should be cropped at some depth
 * to avoid potential memory leaks
 */


function cropTrajetory() {
    var depth = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

    if (depth === TRAJECTORY_MAX_LEN) {
        delete this.prevState;
    } else if (this.prevState) {
        var _context;

        (_context = this.prevState, cropTrajetory).call(_context, depth + 1);
    }
}