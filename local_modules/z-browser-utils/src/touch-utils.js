const TOUCH_SENSITIVITY = 3;

export function getTouch(evt) {
    return getTouches(evt)[0];
}

export function getTouches(evt) {
    if (evt.changedTouches && evt.changedTouches.length) {
        return evt.changedTouches;
    } else if (evt.clientX || evt.clientY) {
        return [evt];
    }
    return [];
}

export function getTouchRadius(touch, defaultR) {
    if (touch && touch.radiusX) {
        return Math.max(defaultR, TOUCH_SENSITIVITY * Math.max(touch.radiusX, touch.radiusY));
    }
    return defaultR;
}
