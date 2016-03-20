/**
 * TODO Analize this controller
 *      Try to guess logic without digging into subsequent modules
 * TODO Then analyze Stream and AsyncStream monads
 * @see Stream
 * @see AsyncStream
 */

import {on} from 'z-browser-utils';
import {Vector} from 'z-math';

const MIN_BRICK_SIZE = 10;

/**
 * @constant {AsyncStream(Array(Brick))}
 */
const stageBricksStream = onPointBy('mousedown')
    .chain(
        start => onPointBy('mouseup').map(end => createBrick(start, end)).first()
    ).scan(
        (bricks, brick) => bricks.concat(brick),
        []
    );

/**
 * @return {Array(Brick)}
 */
export const stageBricks = stageBricksStream.provider([]);

function onPointBy(eventType) {
    return document::on(eventType)
        .map(({clientX, clientY}) => new Vector(clientX, clientY));
}

function createBrick(start, end) {
    const delta = end.sub(start);
    const leftTop = delta.map(d => d > 0).ifelse(start, end);
    const size = delta.abs().map(s => Math.max(MIN_BRICK_SIZE, s));
    return {
        x: leftTop.x(0),
        y: leftTop.x(1),
        w: size.x(0),
        h: size.x(1)
    };
}
