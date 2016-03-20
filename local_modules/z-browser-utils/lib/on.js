'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.on = on;

var _zMath = require('z-math');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * DOM events Monad represents events of some type on some target
 *
 * Usage:
 * const clicks = document::on('click');
 * const points = clicks
 *     .map(ev => ({x: ev.clientX, y: ev.clientY}))
 *     .forEach(console.log);
 */
function on(eventType) {
    var _this = this;

    var ev$ = function ev$() {
        return new _promise2.default(function (resolve) {
            return _this.addEventListener(eventType, function handler(ev) {
                // handle once
                ev.target.removeEventListener(eventType, handler);
                resolve(ev);
            });
        });
    };
    return new _zMath.AsyncStream( /*#__PURE__*/_regenerator2.default.mark(function events() {
        return _regenerator2.default.wrap(function events$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        if (!true) {
                            _context.next = 5;
                            break;
                        }

                        _context.next = 3;
                        return ev$();

                    case 3:
                        _context.next = 0;
                        break;

                    case 5:
                    case 'end':
                        return _context.stop();
                }
            }
        }, events, this);
    }));
}