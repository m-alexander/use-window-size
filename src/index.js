import {useSyncExternalStore} from "react";

function createStore() {
  let width = window.innerWidth;
  let height = window.innerHeight;

  const subscribe = (callback) => {
    const listener = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      callback();
    };

    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
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
