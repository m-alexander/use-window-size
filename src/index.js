import {useSyncExternalStore} from "react";

function createStore() {
  const state = {
    width: 0,
    height: 0
  };

  const listeners = new Set();

  const resizeEventListener = () => {
    state.width = window.innerWidth;
    state.height = window.innerHeight;

    listeners.forEach(listener => listener())
  };

  const subscribe = (callback) => {
    listeners.add(callback);

    if (listeners.size === 1) {
      state.width = window.innerWidth;
      state.height = window.innerHeight;
      window.addEventListener("resize", resizeEventListener);
    }

    return () => {
      listeners.delete(callback);
      if (listeners.size === 0) {
        window.removeEventListener("resize", resizeEventListener);
      }
    };
  };

  const getState = () => state;

  return { subscribe, getState };
}

const store = createStore();

const getServerSnapshot = () => 0

const getWidthFromState = () => store.getState().width;
export const useWindowWidth = () =>
  useSyncExternalStore(store.subscribe, getWidthFromState, getServerSnapshot);

const getHeightFromState = () => store.getState().height;
export const useWindowHeight = () =>
  useSyncExternalStore(store.subscribe, getHeightFromState, getServerSnapshot);

const getServerSnapshotWindowSize = () => ({width: 0, height: 0})

const getWindowSize = () => store.getState()
export const useWindowSize = () =>
  useSyncExternalStore(store.subscribe, getWindowSize, getServerSnapshotWindowSize);
