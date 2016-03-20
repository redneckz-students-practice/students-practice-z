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

export function draw(primitive) {
    primitive(this.getContext('2d'));
}

/**
 * "group" has no attributes but children
 */
export const group = definePrimitive(() => {})();

export const rect = definePrimitive(
    ({
        ctx,
        x, y, w, h
    }) => {
        ctx.beginPath();
        ctx.rect(x, y, w, h);
        ctx.closePath();
    }
);

export const circle = definePrimitive(
    ({
        ctx,
        x, y, radius
    }) => {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
        ctx.closePath();
    }
);

export const line = definePrimitive(
    ({
        ctx,
        x0, y0,
        x1, y1
    }) => {
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.lineTo(x1, y1);
        ctx.closePath();
    }
);

function definePrimitive(paint) {
    return attrs => (...children) => (ctx) => {
        ctx.save();
        paint(Object.assign({}, {ctx}, attrs));
        fill(attrs);
        stroke(attrs);
        ctx.restore();
        children.forEach(child => child(ctx));

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
}
