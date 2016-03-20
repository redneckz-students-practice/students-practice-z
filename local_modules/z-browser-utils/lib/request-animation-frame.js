"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * TODO Read about "requestAnimationFrame" API (https://developer.mozilla.org/ru/docs/DOM/window.requestAnimationFrame)
 */
var requestAnimationFrame = exports.requestAnimationFrame = function (globals) {
    return globals.requestAnimationFrame || globals.mozRequestAnimationFrame || globals.webkitRequestAnimationFrame || globals.msRequestAnimationFrame || requestAnimationFrameFallback;
}(getGlobals());

function requestAnimationFrameFallback(callback) {
    setTimeout(callback, parseInt(1000 / 60, 10));
}

function getGlobals() {
    try {
        return window || {};
    } catch (ex) {
        return {};
    }
}