import { useMemo } from 'react';
import { scenes, scenesById } from '../data/scenes';
import { getLocationForScene } from '../data/locations';

export function useVariants(currentSceneId) {
  return useMemo(() => {
    if (!currentSceneId) return { variants: [], parentScene: null, hasVariants: false };

    const scene = scenesById[currentSceneId];
    if (!scene) return { variants: [], parentScene: null, hasVariants: false };

    const location = getLocationForScene(currentSceneId);
    if (!location) return { variants: [], parentScene: null, hasVariants: false };

    const parentKey = scene.variantOf || scene.name;

    if (parentKey === '8TH FLOOR' || location.id === '8th-floor') {
      return { variants: [], parentScene: null, hasVariants: false };
    }

    if (location.id === '416') {
      if (currentSceneId === '1-416second' || currentSceneId === '2-416coloroption') {
        const variants = [
          { id: '1-416second', label: 'Luci on' },
          { id: '2-416coloroption', label: 'Luci off' },
        ];
        return {
          variants,
          parentScene: scenesById['0-416first'],
          hasVariants: true,
          activeVariantId: currentSceneId,
        };
      }
      return { variants: [], parentScene: null, hasVariants: false };
    }

    if (parentKey === 'MAYA') {
      const colorVariants = scenes.filter(
        s => s.variantOf === 'MAYA' && s.name.includes('COLORE')
      );
      if (colorVariants.length === 0) return { variants: [], parentScene: null, hasVariants: false };
      const variants = colorVariants.map(s => ({
        id: s.id,
        label: s.name.replace('MAYA', '').replace('COLORE', '').trim() || s.name,
      }));
      return {
        variants,
        parentScene: scenesById['9-maya'],
        hasVariants: true,
        activeVariantId: currentSceneId,
      };
    }

    if (parentKey === 'MOON') {
      const colorVariants = scenes.filter(
        s => s.variantOf === 'MOON' && (s.name.includes('VERDE') || s.name.includes('BLU'))
      );
      if (colorVariants.length === 0) return { variants: [], parentScene: null, hasVariants: false };
      const variants = colorVariants.map(s => ({
        id: s.id,
        label: s.name.replace('MOON', '').replace('COLORE', '').trim() || s.name,
      }));
      return {
        variants,
        parentScene: scenesById['19-moon'],
        hasVariants: true,
        activeVariantId: currentSceneId,
      };
    }

    return { variants: [], parentScene: null, hasVariants: false };
  }, [currentSceneId]);
}
