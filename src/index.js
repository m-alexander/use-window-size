import {useSyncExternalStore} from "react";

function createStore() {
  let width;
  let height;

  const listeners = new Set();

  const resizeEventListener = () => {
    width = window.innerWidth;
    height = window.innerHeight;

    for (const listener of listeners) {
      listener();
    }
  };

  const subscribe = (callback) => {
    listeners.add(callback);

    if (listeners.size === 1) {
      width = window.innerWidth;
      height = window.innerHeight;
      window.addEventListener("resize", resizeEventListener);
    }

    return () => {
      listeners.delete(callback);
      if (listeners.size === 0) {
        window.removeEventListener("resize", resizeEventListener);
      }
    };
  };

  const getState = () => ({width, height});

  return {subscribe, getState};
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
