'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.animationStream = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _zMath = require('z-math');

var _requestAnimationFrame = require('./request-animation-frame');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var animationStream = exports.animationStream = new _zMath.AsyncStream( /*#__PURE__*/_regenerator2.default.mark(function anim() {
    var frame;
    return _regenerator2.default.wrap(function anim$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    frame = function frame() {
                        return new _promise2.default(function (resolve) {
                            return (0, _requestAnimationFrame.requestAnimationFrame)(function () {
                                return resolve(Date.now());
                            });
                        });
                    };

                case 1:
                    if (!true) {
                        _context.next = 6;
                        break;
                    }

                    _context.next = 4;
                    return frame();

                case 4:
                    _context.next = 1;
                    break;

                case 6:
                case 'end':
                    return _context.stop();
            }
        }
    }, anim, this);
}));