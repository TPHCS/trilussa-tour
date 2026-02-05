import { useCallback } from 'react';

function gtag(...args) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag(...args);
  }
}

export function useAnalytics() {
  const trackSceneView = useCallback((sceneId, sceneName) => {
    gtag('event', 'scene_view', {
      scene_id: sceneId,
      scene_name: sceneName,
    });
  }, []);

  const trackVariantSelect = useCallback((variantId, variantLabel) => {
    gtag('event', 'variant_select', {
      variant_id: variantId,
      variant_label: variantLabel,
    });
  }, []);

  const trackCTAClick = useCallback((sceneId) => {
    gtag('event', 'cta_click', {
      scene_id: sceneId,
      cta_type: 'spa_booking',
    });
  }, []);

  const trackShare = useCallback((sceneId) => {
    gtag('event', 'share', {
      scene_id: sceneId,
      method: 'copy_link',
    });
  }, []);

  return { trackSceneView, trackVariantSelect, trackCTAClick, trackShare };
}
