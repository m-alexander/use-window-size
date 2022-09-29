"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useWindowWidth = exports.useWindowSize = exports.useWindowHeight = void 0;

var _react = require("react");

function createStore() {
  var state = {
    width: 0,
    height: 0
  };
  var listeners = new Set();

  var resizeEventListener = function resizeEventListener() {
    state.width = window.innerWidth;
    state.height = window.innerHeight;
    listeners.forEach(function (listener) {
      return listener();
    });
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