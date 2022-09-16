"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useWindowWidth = exports.useWindowSize = exports.useWindowHeight = void 0;

var _react = require("react");

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function createStore() {
  var state = {
    width: 0,
    height: 0
  };
  var listeners = new Set();

  var resizeEventListener = function resizeEventListener() {
    state.width = window.innerWidth;
    state.height = window.innerHeight;

    var _iterator = _createForOfIteratorHelper(listeners),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var listener = _step.value;
        listener();
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  };

  var subscribe = function subscribe(callback) {
    listeners.add(callback);

    if (listeners.size === 1) {
      state.width = window.innerWidth;
      state.height = window.innerHeight;
      window.addEventListener("resize", resizeEventListener);
    }

    return function () {
      listeners["delete"](callback);

      if (listeners.size === 0) {
        window.removeEventListener("resize", resizeEventListener);
      }
    };
  };

  var getState = function getState() {
    return state;
  };

  return {
    subscribe: subscribe,
    getState: getState
  };
}

var store = createStore();

var getServerSnapshot = function getServerSnapshot() {
  return 0;
};

var getWidthFromState = function getWidthFromState() {
  return store.getState().width;
};

var useWindowWidth = function useWindowWidth() {
  return (0, _react.useSyncExternalStore)(store.subscribe, getWidthFromState, getServerSnapshot);
};

exports.useWindowWidth = useWindowWidth;

var getHeightFromState = function getHeightFromState() {
  return store.getState().height;
};

var useWindowHeight = function useWindowHeight() {
  return (0, _react.useSyncExternalStore)(store.subscribe, getHeightFromState, getServerSnapshot);
};

exports.useWindowHeight = useWindowHeight;

var getServerSnapshotWindowSize = function getServerSnapshotWindowSize() {
  return {
    width: 0,
    height: 0
  };
};

var getWindowSize = function getWindowSize() {
  return store.getState();
};

var useWindowSize = function useWindowSize() {
  return (0, _react.useSyncExternalStore)(store.subscribe, getWindowSize, getServerSnapshotWindowSize);
};

exports.useWindowSize = useWindowSize;