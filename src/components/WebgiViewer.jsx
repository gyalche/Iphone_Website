import React, {
  useRef,
  useState,
  useCallback,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { scrollAnimation } from '../lib/scroll-animation';
gsap.registerPlugin(ScrollTrigger);

import {
  ViewerApp,
  AssetManagerPlugin,
  GBufferPlugin,
  ProgressivePlugin,
  TonemapPlugin,
  SSRPlugin,
  SSAOPlugin,
  BloomPlugin,
  GammaCorrectionPlugin,
  addBasePlugins,
  CanvasSnipperPlugin,
} from 'webgi';

const WebgiViewer = () => {
  const canvasRef = useRef(null);

  const memoizeAnimation = useCallback((position, target, onUpdate) => {
    if (position && target && onUpdate) {
      scrollAnimation(position, target, onUpdate);
    }
  }, []);
  const setupViewer = useCallback(async () => {
    // Initialize the viewer
    const viewer = new ViewerApp({
      canvas: canvasRef.current,
    });

    // Add some plugins
    const manager = await viewer.addPlugin(AssetManagerPlugin);

    const camera = viewer.scene.activeCamera;
    const position = camera.position;
    const target = camera.target;
    // Add plugins individually.
    await viewer.addPlugin(GBufferPlugin);
    await viewer.addPlugin(new ProgressivePlugin(32));
    await viewer.addPlugin(new TonemapPlugin(true));
    await viewer.addPlugin(GammaCorrectionPlugin);
    await viewer.addPlugin(SSRPlugin);
    await viewer.addPlugin(SSAOPlugin);
    await viewer.addPlugin(BloomPlugin);

    viewer.getPlugin(TonemapPlugin).config.clipBackground;
    // This must be called once after all plugins are added.
    viewer.renderer.refreshPipeline();

    await manager.addFromPath('scene-black.glb');
    viewer.getPlugin(TonemapPlugin).config.clipBackground = true;
    viewer.scene.activeCamera.setCameraOptions({ controlsEnabled: false });

    let needsUpdate = true;

    const onUpdate = () => {
      needsUpdate = true;
      viewer.setDirty();
    };

    viewer.addEventListener('preFrame', () => {
      if (needsUpdate) {
        camera.positionTargetUpdated(true);
        needsUpdate(false);
      }
    });
    window.scrollTo(0, 0);

    memoizeAnimation(position, target, onUpdate);
  }, []);

  useEffect(() => {
    setupViewer();
  }, []);

  return (
    <div id="webgi-canvas-container">
      <canvas id="webgi-canvas" ref={canvasRef} />
    </div>
  );
};

export default WebgiViewer;
