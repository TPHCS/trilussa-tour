import { useEffect, useRef, useCallback } from 'react';
import { Viewer } from '@photo-sphere-viewer/core';
import { CubemapTilesAdapter } from '@photo-sphere-viewer/cubemap-tiles-adapter';
import { MarkersPlugin } from '@photo-sphere-viewer/markers-plugin';
import { AutorotatePlugin } from '@photo-sphere-viewer/autorotate-plugin';
import '@photo-sphere-viewer/core/index.css';
import '@photo-sphere-viewer/markers-plugin/index.css';

import { useTour } from '../../hooks/useTour';
import { useAnalytics } from '../../hooks/useAnalytics';
import { useHashNavigation, getInitialSceneId } from '../../hooks/useHashNavigation';
import { scenesById, isEquirectangular } from '../../data/scenes';
import { getHotspotsForScene } from '../../data/hotspots';
import { buildTileUrl } from '../../utils/tileUrl';
import styles from './PanoViewer.module.css';

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function buildPanoramaConfig(scene) {
  if (isEquirectangular(scene)) {
    return { panorama: `${import.meta.env.BASE_URL}${scene.imageUrl}`, adapter: null, isEquirect: true };
  }

  const rawLevels = (scene.levels || []).filter(l => !l.fallbackOnly);
  const panorama = {
    faceSize: scene.faceSize,
    flipTopBottom: true,
    levels: rawLevels.map(l => ({
      faceSize: l.size,
      nbTiles: l.size / l.tileSize,
    })),
    tileUrl: (face, col, row, level) => buildTileUrl(scene.id, col, row, level + 1, face),
  };

  return { panorama, adapter: [CubemapTilesAdapter, { showErrorTile: false }], isEquirect: false };
}

function buildLinkMarkers(scene) {
  return scene.links.map((link, idx) => {
    const target = scenesById[link.target];
    const targetName = escapeHtml(target?.name || link.target);
    return {
      id: `link-${scene.id}-${idx}`,
      position: { yaw: link.yaw, pitch: link.pitch },
      html: `<div class="tour-link-hotspot" title="${targetName}">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="11" fill="rgba(200,168,139,0.7)" stroke="rgba(255,255,255,0.6)" stroke-width="1.5"/>
          <path d="M12 8l4 4-4 4M8 12h8" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>`,
      anchor: 'center center',
      scale: [0.8, 1.4],
      data: { type: 'link', target: link.target },
      tooltip: { content: targetName, position: 'right' },
    };
  });
}

function buildCTAMarkers(sceneId) {
  const hotspots = getHotspotsForScene(sceneId);
  return hotspots.map(h => ({
    id: h.id,
    position: { yaw: h.yaw, pitch: h.pitch },
    html: `<div style="
      display:flex;align-items:center;gap:6px;
      padding:8px 16px;
      background:#C8A88B;color:#1E1B18;
      font-family:'Cormorant Garamond',serif;
      font-size:0.85rem;font-weight:600;
      letter-spacing:0.05em;
      border-radius:8px;cursor:pointer;
      box-shadow:0 2px 12px rgba(200,168,139,0.3);
      white-space:nowrap;
    ">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      ${escapeHtml(h.label)}
    </div>`,
    anchor: 'center center',
    scale: [0.8, 1.2],
    data: { type: 'cta', url: h.url },
  }));
}

function buildInfoMarkers(scene) {
  if (!scene.infoHotspots || scene.infoHotspots.length === 0) return [];
  return scene.infoHotspots.map((info, idx) => ({
    id: `info-${scene.id}-${idx}`,
    position: { yaw: info.yaw, pitch: info.pitch },
    html: `<div class="tour-info-hotspot" style="
      display:flex;align-items:center;justify-content:center;
      width:28px;height:28px;
      background:rgba(30,27,24,0.85);
      border:2px solid rgba(200,168,139,0.8);
      border-radius:50%;cursor:pointer;
      box-shadow:0 2px 8px rgba(0,0,0,0.3);
    ">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C8A88B" stroke-width="2.5">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 16v-4M12 8h.01"/>
      </svg>
    </div>`,
    anchor: 'center center',
    scale: [0.8, 1.4],
    data: { type: 'info', title: info.title, text: info.text },
    tooltip: {
      content: `<div style="max-width:240px;padding:8px;">
        <strong style="color:#C8A88B;font-size:1rem;">${escapeHtml(info.title)}</strong>
        <p style="margin:6px 0 0;font-size:0.85rem;line-height:1.4;color:#f5f5f5;">${escapeHtml(info.text)}</p>
      </div>`,
      position: 'top',
      trigger: 'click',
    },
  }));
}

function createViewer(container, scene) {
  const { panorama, adapter } = buildPanoramaConfig(scene);
  const config = {
    container,
    panorama,
    plugins: [
      [MarkersPlugin, {}],
      [AutorotatePlugin, {
        autorotatePitch: '1deg',
        autostartDelay: null,
        autostartOnIdle: false,
        autorotateSpeed: '0.3rpm',
      }],
    ],
    navbar: false,
    defaultYaw: scene.initialView.yaw,
    defaultPitch: scene.initialView.pitch,
    defaultZoomLvl: 50,
    moveSpeed: 1.5,
    zoomSpeed: 1.2,
    mousewheel: true,
    mousemove: true,
    touchmoveTwoFingers: false,
    mousewheelCtrlKey: false,
    loadingTxt: '',
    rendererParameters: {
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance',
    },
  };
  if (adapter) {
    config.adapter = adapter;
  }
  return new Viewer(config);
}

function preloadLinkedScenes(scene) {
  if (!scene.links) return;
  const preloadLink = (link) => {
    const target = scenesById[link.target];
    if (!target || isEquirectangular(target)) return;
    const firstLevel = (target.levels || []).find(l => !l.fallbackOnly);
    if (!firstLevel) return;
    const faces = ['f', 'b', 'l', 'r', 'u', 'd'];
    faces.forEach(face => {
      const img = new Image();
      img.src = buildTileUrl(target.id, 0, 0, 1, face);
    });
  };
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => scene.links.forEach(preloadLink), { timeout: 2000 });
  } else {
    setTimeout(() => scene.links.forEach(preloadLink), 1000);
  }
}

export default function PanoViewer() {
  const containerRef = useRef(null);
  const viewerRef = useRef(null);
  const currentAdapterType = useRef(null);
  const { currentSceneId, setScene, setLoading, autorotate } = useTour();
  const { trackSceneView, trackCTAClick } = useAnalytics();
  const prevSceneRef = useRef(null);
  const isTransitioning = useRef(false);
  const navigateRef = useRef(null);

  const addMarkersForScene = useCallback((viewer, scene, sceneId) => {
    try {
      const markers = viewer.getPlugin(MarkersPlugin);
      if (!markers) return;
      markers.clearMarkers();
      buildLinkMarkers(scene).forEach(m => markers.addMarker(m));
      buildCTAMarkers(sceneId).forEach(m => markers.addMarker(m));
      buildInfoMarkers(scene).forEach(m => markers.addMarker(m));
    } catch (_) { /* viewer may be destroyed */ }
  }, []);

  const setupMarkerClickHandler = useCallback((viewer) => {
    const markers = viewer.getPlugin(MarkersPlugin);
    if (!markers) return;
    markers.addEventListener('select-marker', (e) => {
      const data = e.marker.data;
      if (data?.type === 'link' && navigateRef.current) {
        navigateRef.current(data.target);
      } else if (data?.type === 'cta' && data.url) {
        trackCTAClick(data.url);
        window.open(data.url, '_blank', 'noopener');
      }
    });
  }, [trackCTAClick]);

  const finishLoad = useCallback((viewer, scene, sceneId) => {
    addMarkersForScene(viewer, scene, sceneId);
    setScene(sceneId);
    prevSceneRef.current = sceneId;
    trackSceneView(sceneId, scene.name);
    setLoading(false);
    isTransitioning.current = false;
    preloadLinkedScenes(scene);
  }, [setScene, setLoading, trackSceneView, addMarkersForScene]);

  const initViewer = useCallback((sceneId) => {
    if (!containerRef.current) return;
    const scene = scenesById[sceneId];
    if (!scene) { setLoading(false); isTransitioning.current = false; return; }

    if (viewerRef.current) {
      try { viewerRef.current.destroy(); } catch (_) {}
      viewerRef.current = null;
    }

    const isEquirect = isEquirectangular(scene);
    currentAdapterType.current = isEquirect ? 'equirect' : 'cubemap';

    try {
      const viewer = createViewer(containerRef.current, scene);
      viewerRef.current = viewer;
      setupMarkerClickHandler(viewer);

      let loaded = false;
      viewer.addEventListener('ready', () => {
        if (loaded) return;
        loaded = true;
        finishLoad(viewer, scene, sceneId);
      });

      setTimeout(() => {
        if (!loaded && viewerRef.current === viewer) {
          loaded = true;
          finishLoad(viewer, scene, sceneId);
        }
      }, 3000);
    } catch (err) {
      console.error('Viewer creation failed:', err);
      setLoading(false);
      isTransitioning.current = false;
    }
  }, [setLoading, finishLoad, setupMarkerClickHandler]);

  const navigateToScene = useCallback((sceneId) => {
    if (isTransitioning.current) return;
    const scene = scenesById[sceneId];
    if (!scene) return;

    const isEquirect = isEquirectangular(scene);
    const needsAdapterSwitch =
      (isEquirect && currentAdapterType.current !== 'equirect') ||
      (!isEquirect && currentAdapterType.current !== 'cubemap');

    isTransitioning.current = true;

    if (needsAdapterSwitch || !viewerRef.current) {
      setLoading(true);
      initViewer(sceneId);
      return;
    }

    const viewer = viewerRef.current;
    const { panorama } = buildPanoramaConfig(scene);

    viewer.setPanorama(panorama, {
      transition: 800,
      showLoader: false,
      position: { yaw: scene.initialView.yaw, pitch: scene.initialView.pitch },
    })
      .then(() => {
        finishLoad(viewer, scene, sceneId);
      })
      .catch(() => {
        setLoading(false);
        isTransitioning.current = false;
      });
  }, [setLoading, finishLoad, initViewer]);

  navigateRef.current = navigateToScene;

  const handleHashNavigate = useCallback((sceneId) => {
    navigateRef.current?.(sceneId);
  }, []);

  useHashNavigation(currentSceneId, handleHashNavigate);

  useEffect(() => {
    if (viewerRef.current) return;
    const initialSceneId = getInitialSceneId();
    setLoading(true);
    initViewer(initialSceneId);

    return () => {
      if (viewerRef.current) {
        try { viewerRef.current.destroy(); } catch (_) {}
        viewerRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!currentSceneId || !containerRef.current) return;
    if (prevSceneRef.current === currentSceneId) return;
    navigateToScene(currentSceneId);
  }, [currentSceneId, navigateToScene]);

  useEffect(() => {
    if (!viewerRef.current) return;
    try {
      const plugin = viewerRef.current.getPlugin(AutorotatePlugin);
      if (!plugin) return;
      autorotate ? plugin.start() : plugin.stop();
    } catch (_) {}
  }, [autorotate]);

  return <div ref={containerRef} className={styles.viewer} />;
}
