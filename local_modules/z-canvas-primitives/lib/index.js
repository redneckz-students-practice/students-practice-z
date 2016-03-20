'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.line = exports.circle = exports.rect = exports.group = undefined;

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

exports.draw = draw;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * TODO Read about "Template method" pattern
 * https://refactoring.guru/ru/design-patterns/template-method
 */

/**
 * Usage:
 *
 * canvas::draw(
 *     rect({x: 0, y: 0, w: 300, h: 150})(
 *         line({x0: 0, y0: 0, x1: 300, y1: 150}),
 *         line({x0: 0, y0: 0, x1: 300, y1: 150})
 *     )
 * );
 *
 */

function draw(primitive) {
    primitive(this.getContext('2d'));
}

/**
 * "group" has no attributes but children
 */
var group = exports.group = definePrimitive(function () {})();

var rect = exports.rect = definePrimitive(function (_ref) {
    var ctx = _ref.ctx,
        x = _ref.x,
        y = _ref.y,
        w = _ref.w,
        h = _ref.h;

    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.closePath();
});

var circle = exports.circle = definePrimitive(function (_ref2) {
    var ctx = _ref2.ctx,
        x = _ref2.x,
        y = _ref2.y,
        radius = _ref2.radius;

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    ctx.closePath();
});

var line = exports.line = definePrimitive(function (_ref3) {
    var ctx = _ref3.ctx,
        x0 = _ref3.x0,
        y0 = _ref3.y0,
        x1 = _ref3.x1,
        y1 = _ref3.y1;

    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.closePath();
});

function definePrimitive(paint) {
    return function (attrs) {
        return function () {
            for (var _len = arguments.length, children = Array(_len), _key = 0; _key < _len; _key++) {
                children[_key] = arguments[_key];
            }

            return function (ctx) {
                ctx.save();
                paint((0, _assign2.default)({}, { ctx: ctx }, attrs));
                fill(attrs);
                stroke(attrs);
                ctx.restore();
                children.forEach(function (child) {
                    return child(ctx);
                });

                function fill() {
                    if (!attrs || attrs.fill === null) {
                        return;
                    }
                    ctx.fillStyle = attrs.fill || 'white';
                    ctx.fill();
                }

                function stroke() {
                    if (!attrs || attrs.stroke === null) {
                        return;
                    }
                    ctx.strokeStyle = attrs.stroke || 'black';
                    ctx.lineWidth = 2;
                    ctx.setLineDash(attrs.dashed ? [10] : []);
                    ctx.stroke();
                }
            };
        };
    };
}