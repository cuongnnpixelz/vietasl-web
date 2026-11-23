import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { usePlayerStore } from '../stores/playerStore';
import { useTranslationStore } from '../stores/translationStore';
import { AvatarModel } from './AvatarModel';
import { RigController } from './RigController';

interface AvatarCanvasProps {
  className?: string;
  onRigReady?: (controller: RigController) => void;
}

// Global controller ref for external playback triggers
export let globalRigController: RigController | null = null;

export const AvatarCanvas: React.FC<AvatarCanvasProps> = ({ className, onRigReady }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const avatarConfig = usePlayerStore((s) => s.avatarConfig);
  const speed = usePlayerStore((s) => s.speed);
  const playTrigger = usePlayerStore((s) => s.playTrigger);
  const pendingClip = usePlayerStore((s) => s.pendingClip);

  const rigControllerRef = useRef<RigController | null>(null);
  const avatarModelRef = useRef<AvatarModel | null>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth || window.innerWidth;
    const height = containerRef.current.clientHeight || window.innerHeight;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#E5E5E5'); // VLibras exact player background

    // 2. Camera - Optimized ASL signing space framing:
    // Captures full head + hair with generous headroom, full raised hand gestures overhead,
    // and both arms down to waist/hips without clipping.
    const isPortrait = height > width;
    const initialDist = isPortrait ? 3.45 : 3.15;
    const initialCamY = 0.50;
    const initialLookY = 0.44;

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 50);
    camera.position.set(0, initialCamY, initialDist);
    camera.lookAt(0, initialLookY, 0);

    // 3. Renderer with ACESFilmic Tone Mapping for rich studio colors
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;

    // 4. VLibras-Style Studio 4-Point Lighting & Hair/Hand Highlights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.55);
    scene.add(ambientLight);

    // Key Light (Main soft sunlight from top-right)
    const dirLight = new THREE.DirectionalLight(0xfff8f0, 1.25);
    dirLight.position.set(1.8, 3.5, 2.5);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    dirLight.shadow.bias = -0.0005;
    scene.add(dirLight);

    // Fill Light (Soft ambient bounce from lower left)
    const fillLight = new THREE.DirectionalLight(0xdce9ff, 0.65);
    fillLight.position.set(-2.0, 1.5, 1.8);
    scene.add(fillLight);

    // Hair Top Light (Highlights 3D hair strands and locks)
    const hairLight = new THREE.DirectionalLight(0xffffff, 1.1);
    hairLight.position.set(0.2, 4.0, 1.2);
    scene.add(hairLight);

    // Rim Backlight (Highlighting character silhouette, hair edges and finger outlines)
    const rimLight = new THREE.DirectionalLight(0xffffff, 1.3);
    rimLight.position.set(0, 2.8, -2.5);
    scene.add(rimLight);

    // Floor shadow receiver plane
    const floorGeom = new THREE.PlaneGeometry(10, 10);
    const floorMat = new THREE.ShadowMaterial({ opacity: 0.12 });
    const floor = new THREE.Mesh(floorGeom, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = 0.04;
    floor.receiveShadow = true;
    scene.add(floor);

    // 5. Load Official 3D Character (Ícaro from BLENDER_PADRAO_VLIBRAS)
    const avatar = new AvatarModel(avatarConfig);
    scene.add(avatar.rootGroup);
    avatarModelRef.current = avatar;

    // 6. Rig Controller with throttled callbacks
    const controller = new RigController(avatar);

    avatar
      .load(`${import.meta.env.BASE_URL || '/'}avatars/avatar.glb`.replace(/\/\//g, '/'), avatarConfig)
      .then(() => {
        controller.setAvatar(avatar);
      })
      .catch((err) => {
        console.error('Failed to load /avatars/avatar.glb:', err);
      });

    let lastProgressTime = 0;
    let lastReportedProgress = -1;
    let lastReportedSegment = -1;

    controller.setCallbacks({
      onProgress: (progress, currentTime, duration) => {
        const now = performance.now();
        // Throttle progress state updates to ~12 updates/sec max
        if (Math.abs(progress - lastReportedProgress) >= 1 && now - lastProgressTime > 80) {
          lastProgressTime = now;
          lastReportedProgress = progress;
          usePlayerStore.getState().setProgress(progress);
        }

        // Query active word segment without re-rendering AvatarCanvas
        const currentResult = useTranslationStore.getState().compilationResult;
        if (currentResult && currentResult.segments.length > 0) {
          const segCount = currentResult.segments.length;
          const index = Math.min(segCount - 1, Math.floor((progress / 100) * segCount));
          if (index !== lastReportedSegment) {
            lastReportedSegment = index;
            useTranslationStore.getState().setActiveSegmentIndex(index);
            const currentSeg = currentResult.segments[index];
            if (currentSeg) {
              usePlayerStore.getState().setSubtitles(currentSeg.rawWord, currentSeg.gloss);
            }
          }
        }
      },
      onFinish: () => {
        usePlayerStore.getState().setProgress(100);
        usePlayerStore.getState().setStatus('finished');
        avatarModelRef.current?.setFacialExpression(0, 0.2); // Gentle smile on finish
      }
    });

    rigControllerRef.current = controller;
    globalRigController = controller;
    onRigReady?.(controller);

    // 7. Interactive Orbit (Mouse & Touch Drag)
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const handlePointerDown = (e: PointerEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const handlePointerMove = (e: PointerEvent) => {
      const current = avatarModelRef.current;
      if (!isDragging || !current || !current.rootGroup) return;
      const deltaX = e.clientX - prevMouseX;
      current.rootGroup.rotation.y += deltaX * 0.008;

      // Slight camera height adjustment
      const deltaY = e.clientY - prevMouseY;
      camera.position.y = THREE.MathUtils.clamp(camera.position.y - deltaY * 0.002, 0.25, 0.85);
      camera.lookAt(0, 0.44, 0);

      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      camera.position.z = THREE.MathUtils.clamp(camera.position.z + e.deltaY * 0.001, 2.0, 4.4);
    };

    const canvas = canvasRef.current;
    canvas.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    canvas.addEventListener('wheel', handleWheel, { passive: false });

    // 8. Resize Handler
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      const portrait = h > w;
      camera.position.z = portrait ? 3.45 : 3.15;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // 9. Animation Loop
    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = (time: number) => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      avatarModelRef.current?.update(delta);
      controller.update(delta);
      renderer.render(scene, camera);
    };
    animationFrameId = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      canvas.removeEventListener('wheel', handleWheel);
      renderer.dispose();
    };
  }, []);

  // Handle PlayTrigger from any page
  useEffect(() => {
    if (playTrigger > 0 && pendingClip && rigControllerRef.current) {
      rigControllerRef.current.playClip(pendingClip, speed);
    }
  }, [playTrigger, pendingClip, speed]);

  // Update colors when config changes
  useEffect(() => {
    if (avatarModelRef.current?.updateColors) {
      avatarModelRef.current.updateColors(avatarConfig);
    }
  }, [avatarConfig]);

  // Update playback speed
  useEffect(() => {
    if (rigControllerRef.current) {
      rigControllerRef.current.setSpeed(speed);
    }
  }, [speed]);

  return (
    <div ref={containerRef} className={`relative w-full h-full overflow-hidden select-none ${className || ''}`}>
      <canvas ref={canvasRef} className="w-full h-full block cursor-grab active:cursor-grabbing touch-none" />
    </div>
  );
};
