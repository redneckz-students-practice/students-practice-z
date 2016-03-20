"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getTouch = getTouch;
exports.getTouches = getTouches;
exports.getTouchRadius = getTouchRadius;
var TOUCH_SENSITIVITY = 3;

function getTouch(evt) {
    return getTouches(evt)[0];
}

function getTouches(evt) {
    if (evt.changedTouches && evt.changedTouches.length) {
        return evt.changedTouches;
    } else if (evt.clientX || evt.clientY) {
        return [evt];
    }
    return [];
}

function getTouchRadius(touch, defaultR) {
    if (touch && touch.radiusX) {
        return Math.max(defaultR, TOUCH_SENSITIVITY * Math.max(touch.radiusX, touch.radiusY));
    }
    return defaultR;
}