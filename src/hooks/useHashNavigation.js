import { useEffect, useRef } from 'react';
import { slugToId, idToSlug } from '../data/scenes';
import { locations } from '../data/locations';

export function useHashNavigation(currentSceneId, onNavigate) {
  const isInternalChange = useRef(false);

  useEffect(() => {
    if (!currentSceneId) return;
    isInternalChange.current = true;
    const slug = idToSlug[currentSceneId] || currentSceneId;
    window.history.replaceState(null, '', '#' + slug);
    setTimeout(() => { isInternalChange.current = false; }, 0);
  }, [currentSceneId]);

  useEffect(() => {
    function handleHashChange() {
      if (isInternalChange.current) return;
      const hash = window.location.hash.substring(1);
      if (!hash) return;
      const sceneId = slugToId[hash] || hash;
      if (sceneId !== currentSceneId) {
        onNavigate(sceneId);
      }
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [currentSceneId, onNavigate]);

  return getInitialSceneId();
}

export function getInitialSceneId() {
  const hash = window.location.hash.substring(1);
  if (!hash) return locations[0].defaultScene;
  const sceneId = slugToId[hash] || hash;
  return sceneId || locations[0].defaultScene;
}
