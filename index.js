"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useWindowWidth = exports.useWindowHeight = void 0;

var _react = require("react");

function Store() {
  var width = window.innerWidth;
  var height = window.innerHeight;

  var subscribe = function subscribe(callback) {
    var listener = function listener() {
      width = window.innerWidth;
      height = window.innerHeight;
      callback();
    };

    window.addEventListener("resize", listener);
    return function () {
      return window.removeEventListener("resize", listener);
    };
  };

  var getState = function getState() {
    return {
      width: width,
      height: height
    };
  };

  return {
    subscribe: subscribe,
    getState: getState
  };
}

var store = Store();

var getWidthFromState = function getWidthFromState() {
  return store.getState().width;
};

var useWindowWidth = function useWindowWidth() {
  return (0, _react.useSyncExternalStore)(store.subscribe, getWidthFromState);
};

exports.useWindowWidth = useWindowWidth;

var getHeightFromState = function getHeightFromState() {
  return store.getState().height;
};

var useWindowHeight = function useWindowHeight() {
  return (0, _react.useSyncExternalStore)(store.subscribe, getHeightFromState);
};

exports.useWindowHeight = useWindowHeight;