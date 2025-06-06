/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

(function() {
  var Marzipano = window.Marzipano;
  var bowser = window.bowser;
  var screenfull = window.screenfull;
  var data = window.APP_DATA;

  // Grab elements from DOM.
  var panoElement = document.querySelector('#pano');
  var sceneNameElement = document.querySelector('#titleBar .sceneName');
  var sceneListElement = document.querySelector('#sceneList');
  var sceneElements = document.querySelectorAll('#sceneList .scene');
  var sceneListToggleElement = document.querySelector('#sceneListToggle');
  var autorotateToggleElement = document.querySelector('#autorotateToggle');
  var fullscreenToggleElement = document.querySelector('#fullscreenToggle');

  // Detect desktop or mobile mode.
  if (window.matchMedia) {
    var setMode = function() {
      if (mql.matches) {
        document.body.classList.remove('desktop');
        document.body.classList.add('mobile');
      } else {
        document.body.classList.remove('mobile');
        document.body.classList.add('desktop');
      }
    };
    var mql = matchMedia("(max-width: 500px), (max-height: 500px)");
    setMode();
    mql.addListener(setMode);
  } else {
    document.body.classList.add('desktop');
  }

  // Detect whether we are on a touch device.
  document.body.classList.add('no-touch');
  window.addEventListener('touchstart', function() {
    document.body.classList.remove('no-touch');
    document.body.classList.add('touch');
  });

  // Use tooltip fallback mode on IE < 11.
  if (bowser.msie && parseFloat(bowser.version) < 11) {
    document.body.classList.add('tooltip-fallback');
  }

  // Viewer options.
  var viewerOpts = {
    controls: {
      mouseViewMode: data.settings.mouseViewMode
    }
  };

  // Initialize viewer.
  var viewer = new Marzipano.Viewer(panoElement, viewerOpts);

  // Create scenes.
  var scenes = data.scenes.map(function(data) {
    var urlPrefix = "tiles";
    var source = Marzipano.ImageUrlSource.fromString(
      urlPrefix + "/" + data.id + "/{z}/{f}/{y}/{x}.jpg",
      { cubeMapPreviewUrl: urlPrefix + "/" + data.id + "/preview.jpg" });
    var geometry = new Marzipano.CubeGeometry(data.levels);

    var limiter = Marzipano.RectilinearView.limit.traditional(data.faceSize, 100*Math.PI/180, 120*Math.PI/180);
    var view = new Marzipano.RectilinearView(data.initialViewParameters, limiter);

    var scene = viewer.createScene({
      source: source,
      geometry: geometry,
      view: view,
      pinFirstLevel: true
    });

    // Create link hotspots.
    data.linkHotspots.forEach(function(hotspot) {
      var element = createLinkHotspotElement(hotspot);
      scene.hotspotContainer().createHotspot(element, { yaw: hotspot.yaw, pitch: hotspot.pitch });
    });

    // Create info hotspots.
    data.infoHotspots.forEach(function(hotspot) {
      var element = createInfoHotspotElement(hotspot);
      scene.hotspotContainer().createHotspot(element, { yaw: hotspot.yaw, pitch: hotspot.pitch });
    });

    return {
      data: data,
      scene: scene,
      view: view
    };
  });
  // Ordine delle zone richiesto
  const zoneOrder = ["MAYA", "MOON", "DOMUS", "ROOF", "ORTO", "GYM", "LOBBY"];
  const sceneListUl = document.querySelector("#sceneList .scenes");

  const sceneMap = Object.fromEntries(scenes.map(s => [s.data.id, s]));

  zoneOrder.forEach(zone => {
    const mainScene = scenes.find(s => s.data.name === zone && !s.data.variantOf);
    if (!mainScene) return;

    const a = document.createElement("a");
    a.href = "javascript:void(0)";
    a.classList.add("scene");
    a.dataset.id = mainScene.data.id;

    const li = document.createElement("li");
    li.classList.add("text");
    li.textContent = zone;

    a.appendChild(li);
    sceneListUl.appendChild(a);

    a.addEventListener("click", () => {
      switchScene(mainScene);
      if (document.body.classList.contains("mobile")) {
        hideSceneList();
      }
    });
  });

  // Autorotate
  var autorotate = Marzipano.autorotate({
    yawSpeed: 0.03,
    targetPitch: 0,
    targetFov: Math.PI/2
  });

  if (data.settings.autorotateEnabled) {
    autorotateToggleElement.classList.add("enabled");
  }

  autorotateToggleElement.addEventListener("click", toggleAutorotate);

  if (screenfull.enabled && data.settings.fullscreenButton) {
    document.body.classList.add("fullscreen-enabled");
    fullscreenToggleElement.addEventListener("click", function() {
      screenfull.toggle();
    });
    screenfull.on("change", function() {
      fullscreenToggleElement.classList.toggle("enabled", screenfull.isFullscreen);
    });
  } else {
    document.body.classList.add("fullscreen-disabled");
  }

  sceneListToggleElement.addEventListener("click", toggleSceneList);
  if (!document.body.classList.contains("mobile")) {
    showSceneList();
  }

  function switchScene(scene) {
    viewer.stopMovement();
    scene.view.setParameters(scene.data.initialViewParameters);
    scene.scene.switchTo();
    updateSceneName(scene);
    updateSceneList(scene);
    updateVariantSelector(scene.data.id);
    viewer.setIdleMovement(3000, autorotate);
  }

  function updateSceneName(scene) {
    sceneNameElement.innerHTML = sanitize(scene.data.name);
  }

  function updateSceneList(scene) {
    const sceneEls = document.querySelectorAll("#sceneList .scene");
    sceneEls.forEach(el => {
      el.classList.toggle("current", el.dataset.id === scene.data.id);
    });
  }

  function toggleSceneList() {
    sceneListElement.classList.toggle("enabled");
    sceneListToggleElement.classList.toggle("enabled");
  }

  function showSceneList() {
    sceneListElement.classList.add("enabled");
    sceneListToggleElement.classList.add("enabled");
  }

  function hideSceneList() {
    sceneListElement.classList.remove("enabled");
    sceneListToggleElement.classList.remove("enabled");
  }

  function toggleAutorotate() {
    autorotateToggleElement.classList.toggle("enabled");
    if (autorotateToggleElement.classList.contains("enabled")) {
      viewer.setIdleMovement(3000, autorotate);
    } else {
      viewer.setIdleMovement(Infinity);
    }
  }

  function sanitize(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  function createLinkHotspotElement(hotspot) {
    var wrapper = document.createElement("div");
    wrapper.classList.add("hotspot", "link-hotspot");

    var icon = document.createElement("img");
    icon.src = "img/link.png";
    icon.classList.add("link-hotspot-icon");
    wrapper.appendChild(icon);

    var tooltip = document.createElement("div");
    tooltip.classList.add("hotspot-tooltip", "link-hotspot-tooltip");
    tooltip.innerHTML = findSceneDataById(hotspot.target).name;
    wrapper.appendChild(tooltip);

    wrapper.addEventListener("click", function () {
      var target = scenes.find(s => s.data.id === hotspot.target);
      if (target) switchScene(target);
    });

    return wrapper;
  }

  function createInfoHotspotElement(hotspot) {
    var wrapper = document.createElement("div");
    wrapper.classList.add("hotspot", "info-hotspot");

    var header = document.createElement("div");
    header.classList.add("info-hotspot-header");

    var iconWrapper = document.createElement("div");
    iconWrapper.classList.add("info-hotspot-icon-wrapper");
    var icon = document.createElement("img");
    icon.src = "img/info.png";
    icon.classList.add("info-hotspot-icon");
    iconWrapper.appendChild(icon);

    var titleWrapper = document.createElement("div");
    titleWrapper.classList.add("info-hotspot-title-wrapper");
    var title = document.createElement("div");
    title.classList.add("info-hotspot-title");
    title.innerHTML = hotspot.title;
    titleWrapper.appendChild(title);

    var closeWrapper = document.createElement("div");
    closeWrapper.classList.add("info-hotspot-close-wrapper");
    var closeIcon = document.createElement("img");
    closeIcon.src = "img/close.png";
    closeIcon.classList.add("info-hotspot-close-icon");
    closeWrapper.appendChild(closeIcon);

    header.appendChild(iconWrapper);
    header.appendChild(titleWrapper);
    header.appendChild(closeWrapper);

    var text = document.createElement("div");
    text.classList.add("info-hotspot-text");
    text.innerHTML = hotspot.text;

    wrapper.appendChild(header);
    wrapper.appendChild(text);

    return wrapper;
  }

  function findSceneDataById(id) {
    return data.scenes.find(s => s.id === id);
  }

  function getVariantsFor(sceneId) {
    const scene = findSceneDataById(sceneId);
    const base = scene.variantOf || scene.name;
    return data.scenes.filter(s => s.variantOf === base);
  }

  function updateVariantSelector(currentId) {
    const scene = findSceneDataById(currentId);
    const container = document.getElementById("colorSelector");
    const btnHolder = document.getElementById("variantButtons");

    const base = scene.variantOf || scene.name;
    const variants = data.scenes.filter(s => s.variantOf === base);

    if (!variants.length) {
      container.style.display = 'none';
      return;
    }

    btnHolder.innerHTML = '';
    variants.forEach(v => {
      const btn = document.createElement('button');
      btn.textContent = v.name.replace(/^.*COLORE?\s?/i, '');
      btn.style.margin = '0 4px';
      btn.style.padding = '4px 10px';
      btn.style.borderRadius = '6px';
      btn.style.border = v.id === currentId ? '2px solid black' : '1px solid gray';
      btn.style.cursor = 'pointer';
      btn.onclick = () => {
        const variant = scenes.find(s => s.data.id === v.id);
        if (variant) switchScene(variant);
      };
      btnHolder.appendChild(btn);
    });

    container.style.display = 'block';
  }

  // Avvia la scena iniziale
  const startScene = scenes.find(s => s.data.name === "MAYA" && !s.data.variantOf);
  if (startScene) switchScene(startScene);
})();
