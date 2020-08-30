"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// From @reach-ui
var props = ['width', 'height', 'top', 'right', 'bottom', 'left'];

var rectChanged = function rectChanged(a, b) {
  if (a === void 0) {
    a = {};
  }

  if (b === void 0) {
    b = {};
  }

  return props.some(function (prop) {
    return a[prop] !== b[prop];
  });
};

var observedNodes = new Map();
var rafId = null;

var run = function run() {
  observedNodes.forEach(function (state) {
    if (state.hasRectChanged) {
      state.callbacks.forEach(function (cb) {
        return cb(state.rect);
      });
      state.hasRectChanged = false;
    }
  });
  setTimeout(function () {
    observedNodes.forEach(function (state, node) {
      if (node) {
        var newRect = node.getBoundingClientRect();

        if (rectChanged(newRect, state.rect)) {
          state.hasRectChanged = true;
          state.rect = newRect;
        }
      }
    });
  }, 0);
  rafId = requestAnimationFrame(run);
};

exports.default = function (node, cb) {
  return {
    observe: function observe() {
      var wasEmpty = observedNodes.size === 0;

      if (observedNodes.has(node)) {
        observedNodes.get(node).callbacks.push(cb);
      } else {
        observedNodes.set(node, {
          rect: undefined,
          hasRectChanged: true,
          callbacks: [cb]
        });
      }

      if (wasEmpty) run();
    },
    unobserve: function unobserve() {
      var state = observedNodes.get(node);

      if (state) {
        // Remove the callback
        var index = state.callbacks.indexOf(cb);
        if (index >= 0) state.callbacks.splice(index, 1); // Remove the node reference

        if (!state.callbacks.length) observedNodes.delete(node); // Stop the loop

        if (!observedNodes.size) cancelAnimationFrame(rafId);
      }
    }
  };
};