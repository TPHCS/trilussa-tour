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

  var panoElement = document.querySelector('#pano');
  var sceneNameElement = document.querySelector('#titleBar .sceneName');
  var sceneListElement = document.querySelector('#sceneList');
  var sceneListToggleElement = document.querySelector('#sceneListToggle');
  var autorotateToggleElement = document.querySelector('#autorotateToggle');
  var fullscreenToggleElement = document.querySelector('#fullscreenToggle');
  var spinner = document.getElementById('spinner');
  var shareButton = document.getElementById('shareButton');
  if (shareButton) {
    shareButton.addEventListener('click', function() {
      var url = window.location.href;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(function() {
          alert('Link copied to clipboard!');
        }).catch(function() {
          prompt('Copy this URL:', url);
        });
      } else {
        prompt('Copy this URL:', url);
      }
    });
  }

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

  document.body.classList.add('no-touch');
  window.addEventListener('touchstart', function() {
    document.body.classList.remove('no-touch');
    document.body.classList.add('touch');
  });
  

  if (bowser.msie && parseFloat(bowser.version) < 11) {
    document.body.classList.add('tooltip-fallback');
  }

  var viewerOpts = {
    controls: {
      mouseViewMode: data.settings.mouseViewMode
    }
  };

  var viewer = new Marzipano.Viewer(panoElement, viewerOpts);

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

    data.linkHotspots.forEach(function(hotspot) {
      var element = createLinkHotspotElement(hotspot);
      scene.hotspotContainer().createHotspot(element, { yaw: hotspot.yaw, pitch: hotspot.pitch });
    });

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
  
  var slugToId = {};
  var idToSlug = {};
  data.scenes.forEach(function(d) {
    var slug = d.name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
    slugToId[slug] = d.id;
    idToSlug[d.id] = slug;
  });
  
  var scenesById = {};
  scenes.forEach(function(s) { scenesById[s.data.id] = s; });
  var TOP_ORDER = ["MAYA", "MOON", "DOMUS", "8TH FLOOR", "ORTO", "GYM", "LOBBY"];
  var parentSceneData = TOP_ORDER.map(function(name) {
    for (var i = 0; i < data.scenes.length; i++) {
      var d = data.scenes[i];
      if (!d.variantOf && d.name.indexOf(name) !== -1) {
        return d;
      }
    }
    return null;
  }).filter(function(d) { return d; });
  var parentScenes = parentSceneData.map(function(d) {
    return scenesById[d.id];
  });
  
  var sceneElements = document.querySelectorAll('#sceneList .scene');
  
  parentScenes.forEach(function(sceneObj) {
    var el = document.querySelector('#sceneList .scene[data-id="' + sceneObj.data.id + '"]');
    el.addEventListener('click', function() {
      switchScene(sceneObj);
      if (document.body.classList.contains('mobile')) {
        hideSceneList();
      }
    });
  });

  var autorotate = Marzipano.autorotate({
    yawSpeed: 0.03,
    targetPitch: 0,
    targetFov: Math.PI/2
  });
  if (data.settings.autorotateEnabled) {
    autorotateToggleElement.classList.add('enabled');
  }

  autorotateToggleElement.addEventListener('click', toggleAutorotate);

  if (screenfull.enabled && data.settings.fullscreenButton) {
    document.body.classList.add('fullscreen-enabled');
    fullscreenToggleElement.addEventListener('click', function() {
      screenfull.toggle();
    });
    screenfull.on('change', function() {
      if (screenfull.isFullscreen) {
        fullscreenToggleElement.classList.add('enabled');
      } else {
        fullscreenToggleElement.classList.remove('enabled');
      }
    });
  } else {
    document.body.classList.add('fullscreen-disabled');
  }

  sceneListToggleElement.addEventListener('click', toggleSceneList);

  if (!document.body.classList.contains('mobile')) {
    showSceneList();
  }


  var viewUpElement = document.querySelector('#viewUp');
  var viewDownElement = document.querySelector('#viewDown');
  var viewLeftElement = document.querySelector('#viewLeft');
  var viewRightElement = document.querySelector('#viewRight');
  var viewInElement = document.querySelector('#viewIn');
  var viewOutElement = document.querySelector('#viewOut');

  var velocity = 0.7;
  var friction = 3;

  var controls = viewer.controls();
  controls.registerMethod('upElement',    new Marzipano.ElementPressControlMethod(viewUpElement,     'y', -velocity, friction), true);
  controls.registerMethod('downElement',  new Marzipano.ElementPressControlMethod(viewDownElement,   'y',  velocity, friction), true);
  controls.registerMethod('leftElement',  new Marzipano.ElementPressControlMethod(viewLeftElement,   'x', -velocity, friction), true);
  controls.registerMethod('rightElement', new Marzipano.ElementPressControlMethod(viewRightElement,  'x',  velocity, friction), true);
  controls.registerMethod('inElement',    new Marzipano.ElementPressControlMethod(viewInElement,  'zoom', -velocity, friction), true);
  controls.registerMethod('outElement',   new Marzipano.ElementPressControlMethod(viewOutElement, 'zoom',  velocity, friction), true);

  function sanitize(s) {
    return s.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;');
  }

  function switchScene(scene) {
    if (spinner) spinner.style.display = 'flex';
    stopAutorotate();
    if (scene.data.name === '8TH FLOOR') {
      var ivp = scene.data.initialViewParameters;
      scene.view.setParameters({ pitch: ivp.pitch, yaw: ivp.yaw + Math.PI, fov: ivp.fov });
    } else {
      scene.view.setParameters(scene.data.initialViewParameters);
    }
    scene.scene.switchTo({ transitionDuration: 1500 });
    startAutorotate();
    updateSceneName(scene);
    updateSceneList(scene);
    updateVariants(scene);
    setTimeout(function() { if (spinner) spinner.style.display = 'none'; }, 300);
    try {
      var slug = idToSlug[scene.data.id] || scene.data.id;
      window.history.replaceState(null, '', '#' + slug);
    } catch (e) {}
  }

  function updateSceneName(scene) {
    sceneNameElement.innerHTML = sanitize(scene.data.name);
  }

  function updateSceneList(scene) {
    for (var i = 0; i < sceneElements.length; i++) {
      var el = sceneElements[i];
      if (el.getAttribute('data-id') === scene.data.id) {
        el.classList.add('current');
      } else {
        el.classList.remove('current');
      }
    }
  }

  function updateVariants(scene) {
    var parentKey = scene.data.variantOf || scene.data.name;
    var variants = [];
    if (parentKey === 'MAYA') {
      variants = data.scenes.filter(function(d) {
        return d.variantOf === 'MAYA' && d.name.indexOf('COLORE') !== -1;
      }).map(function(d) { return scenesById[d.id]; });
    } else if (parentKey === 'MOON') {
      variants = data.scenes.filter(function(d) {
        return d.variantOf === 'MOON' && (d.name.indexOf('VERDE') !== -1 || d.name.indexOf('BLU') !== -1);
      }).map(function(d) { return scenesById[d.id]; });
    } else if (parentKey === '8TH FLOOR') {
      variants = data.scenes
        .filter(function(d) {
          return d.variantOf === '8TH FLOOR' && d.name.indexOf('NOTTE') === 0;
        })
        .map(function(d) { return scenesById[d.id]; });
      variants = variants.filter(function(v) { return v.data.id !== '2-054ccb45-0f3a-42d2-bf3d-c04f5606122a'; });
    } else {
      document.getElementById('colorSelector').style.display = 'none';
      return;
    }
    var selector = document.getElementById('colorSelector');
    var container = document.getElementById('variantButtons');
    container.innerHTML = '';
    if (variants.length <= 1) {
      selector.style.display = 'none';
      return;
    }
    selector.style.display = 'block';
    if (scene.data.variantOf) {
      var parentName = scene.data.variantOf;
      var parentData = data.scenes.find(function(d) { return !d.variantOf && d.name === parentName; });
      if (parentData) {
        var parentObj = scenesById[parentData.id];
        var backBtn = document.createElement('button');
        backBtn.textContent = '← Back';
        backBtn.className = 'variant-button back-button';
        backBtn.addEventListener('click', function() { switchScene(parentObj); });
        container.appendChild(backBtn);
      }
    }
    variants.forEach(function(v) {
      var btn = document.createElement('button');
      btn.textContent = v.data.name;
      btn.className = (v.data.id === scene.data.id ? 'variant-button current' : 'variant-button');
      btn.addEventListener('click', function() { switchScene(v); });
      container.appendChild(btn);
    });
  }

  function showSceneList() {
    sceneListElement.classList.add('enabled');
    sceneListToggleElement.classList.add('enabled');
  }

  function hideSceneList() {
    sceneListElement.classList.remove('enabled');
    sceneListToggleElement.classList.remove('enabled');
  }

  function toggleSceneList() {
    sceneListElement.classList.toggle('enabled');
    sceneListToggleElement.classList.toggle('enabled');
  }

  function startAutorotate() {
    if (!autorotateToggleElement.classList.contains('enabled')) {
      return;
    }
    viewer.startMovement(autorotate);
    viewer.setIdleMovement(3000, autorotate);
  }

  function stopAutorotate() {
    viewer.stopMovement();
    viewer.setIdleMovement(Infinity);
  }

  function toggleAutorotate() {
    if (autorotateToggleElement.classList.contains('enabled')) {
      autorotateToggleElement.classList.remove('enabled');
      stopAutorotate();
    } else {
      autorotateToggleElement.classList.add('enabled');
      startAutorotate();
    }
  }

  function createLinkHotspotElement(hotspot) {

    var wrapper = document.createElement('div');
    wrapper.classList.add('hotspot');
    wrapper.classList.add('link-hotspot');

    var icon = document.createElement('img');
    icon.src = 'img/link.png';
    icon.classList.add('link-hotspot-icon');

    var transformProperties = [ '-ms-transform', '-webkit-transform', 'transform' ];
    for (var i = 0; i < transformProperties.length; i++) {
      var property = transformProperties[i];
      icon.style[property] = 'rotate(' + hotspot.rotation + 'rad)';
    }

    wrapper.addEventListener('click', function() {
      var targetScene = findSceneById(hotspot.target);
      if (targetScene) { switchScene(targetScene); }
    });

    stopTouchAndScrollEventPropagation(wrapper);

    var tooltip = document.createElement('div');
    tooltip.classList.add('hotspot-tooltip');
    tooltip.classList.add('link-hotspot-tooltip');
    var targetData = findSceneDataById(hotspot.target);
    tooltip.innerHTML = targetData ? targetData.name : '';

    wrapper.appendChild(icon);
    wrapper.appendChild(tooltip);

    return wrapper;
  }

  function createInfoHotspotElement(hotspot) {

    var wrapper = document.createElement('div');
    wrapper.classList.add('hotspot');
    wrapper.classList.add('info-hotspot');

    var header = document.createElement('div');
    header.classList.add('info-hotspot-header');

    var iconWrapper = document.createElement('div');
    iconWrapper.classList.add('info-hotspot-icon-wrapper');
    var icon = document.createElement('img');
    icon.src = 'img/info.png';
    icon.classList.add('info-hotspot-icon');
    iconWrapper.appendChild(icon);

    var titleWrapper = document.createElement('div');
    titleWrapper.classList.add('info-hotspot-title-wrapper');
    var title = document.createElement('div');
    title.classList.add('info-hotspot-title');
    title.innerHTML = hotspot.title;
    titleWrapper.appendChild(title);

    var closeWrapper = document.createElement('div');
    closeWrapper.classList.add('info-hotspot-close-wrapper');
    var closeIcon = document.createElement('img');
    closeIcon.src = 'img/close.png';
    closeIcon.classList.add('info-hotspot-close-icon');
    closeWrapper.appendChild(closeIcon);

    header.appendChild(iconWrapper);
    header.appendChild(titleWrapper);
    header.appendChild(closeWrapper);

    var text = document.createElement('div');
    text.classList.add('info-hotspot-text');
    text.innerHTML = hotspot.text;

    wrapper.appendChild(header);
    wrapper.appendChild(text);

    var modal = document.createElement('div');
    modal.innerHTML = wrapper.innerHTML;
    modal.classList.add('info-hotspot-modal');
    document.body.appendChild(modal);

    var toggle = function() {
      wrapper.classList.toggle('visible');
      modal.classList.toggle('visible');
    };

    wrapper.querySelector('.info-hotspot-header').addEventListener('click', toggle);

    modal.querySelector('.info-hotspot-close-wrapper').addEventListener('click', toggle);

    stopTouchAndScrollEventPropagation(wrapper);

    return wrapper;
  }

  function stopTouchAndScrollEventPropagation(element, eventList) {
    var eventList = [ 'touchstart', 'touchmove', 'touchend', 'touchcancel',
                      'wheel', 'mousewheel' ];
    for (var i = 0; i < eventList.length; i++) {
      element.addEventListener(eventList[i], function(event) {
        event.stopPropagation();
      });
    }
  }

  function findSceneById(id) {
    for (var i = 0; i < scenes.length; i++) {
      if (scenes[i].data.id === id) {
        return scenes[i];
      }
    }
    return null;
  }

  function findSceneDataById(id) {
    for (var i = 0; i < data.scenes.length; i++) {
      if (data.scenes[i].id === id) {
        return data.scenes[i];
      }
    }
    return null;
  }

  var initialId = window.location.hash.substring(1);
  var initialSceneObj = scenesById[initialId] || parentScenes[0];
  switchScene(initialSceneObj);

  window.addEventListener('hashchange', function() {
    var newId = window.location.hash.substring(1);
    var sceneObj = scenesById[newId];
    if (sceneObj) { switchScene(sceneObj); }
  });

})();
