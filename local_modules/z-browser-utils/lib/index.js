'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _animationStream = require('./animation-stream');

Object.defineProperty(exports, 'animationStream', {
  enumerable: true,
  get: function get() {
    return _animationStream.animationStream;
  }
});

var _requestAnimationFrame = require('./request-animation-frame');

Object.defineProperty(exports, 'requestAnimationFrame', {
  enumerable: true,
  get: function get() {
    return _requestAnimationFrame.requestAnimationFrame;
  }
});

var _touchUtils = require('./touch-utils');

Object.defineProperty(exports, 'getTouch', {
  enumerable: true,
  get: function get() {
    return _touchUtils.getTouch;
  }
});
Object.defineProperty(exports, 'getTouches', {
  enumerable: true,
  get: function get() {
    return _touchUtils.getTouches;
  }
});
Object.defineProperty(exports, 'getTouchRadius', {
  enumerable: true,
  get: function get() {
    return _touchUtils.getTouchRadius;
  }
});

var _on = require('./on');

Object.defineProperty(exports, 'on', {
  enumerable: true,
  get: function get() {
    return _on.on;
  }
});