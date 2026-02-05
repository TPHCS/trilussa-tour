import { createContext, useContext, useReducer, useCallback } from 'react';
import { scenes, scenesById, idToSlug } from '../data/scenes';
import { getLocationForScene } from '../data/locations';

const TourContext = createContext(null);

const initialState = {
  currentSceneId: null,
  previousSceneId: null,
  isNavOpen: true,
  isLoading: true,
  autorotate: true,
};

function tourReducer(state, action) {
  switch (action.type) {
    case 'SET_SCENE':
      return {
        ...state,
        previousSceneId: state.currentSceneId,
        currentSceneId: action.sceneId,
      };
    case 'TOGGLE_NAV':
      return { ...state, isNavOpen: !state.isNavOpen };
    case 'SET_NAV':
      return { ...state, isNavOpen: action.open };
    case 'SET_LOADING':
      return { ...state, isLoading: action.loading };
    case 'TOGGLE_AUTOROTATE':
      return { ...state, autorotate: !state.autorotate };
    case 'SET_AUTOROTATE':
      return { ...state, autorotate: action.autorotate };
    default:
      return state;
  }
}

export function TourProvider({ children }) {
  const [state, dispatch] = useReducer(tourReducer, initialState);

  const setScene = useCallback((sceneId) => {
    dispatch({ type: 'SET_SCENE', sceneId });
  }, []);

  const toggleNav = useCallback(() => {
    dispatch({ type: 'TOGGLE_NAV' });
  }, []);

  const setNavOpen = useCallback((open) => {
    dispatch({ type: 'SET_NAV', open });
  }, []);

  const setLoading = useCallback((loading) => {
    dispatch({ type: 'SET_LOADING', loading });
  }, []);

  const toggleAutorotate = useCallback(() => {
    dispatch({ type: 'TOGGLE_AUTOROTATE' });
  }, []);

  const currentScene = state.currentSceneId ? scenesById[state.currentSceneId] : null;
  const currentLocation = state.currentSceneId ? getLocationForScene(state.currentSceneId) : null;

  const value = {
    ...state,
    currentScene,
    currentLocation,
    setScene,
    toggleNav,
    setNavOpen,
    setLoading,
    toggleAutorotate,
    scenes,
  };

  return <TourContext.Provider value={value}>{children}</TourContext.Provider>;
}

export function useTour() {
  const ctx = useContext(TourContext);
  if (!ctx) throw new Error('useTour must be used within TourProvider');
  return ctx;
}
