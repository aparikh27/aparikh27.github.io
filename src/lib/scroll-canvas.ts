/**
 * Scroll-reactive WebGL background.
 *
 * This module is loaded via dynamic `import()` and ONLY after the capability
 * gate in ScrollCanvas.astro passes, so devices that fail the gate never
 * download three/gsap/lenis at all. Nothing here runs at import time.
 *
 * Layering contract: the canvas is `position: fixed` at z-index 0 and all
 * page content sits above it in the normal flow. No text is ever rendered
 * into WebGL — type stays real DOM text, so it remains selectable, findable,
 * accessible, and pixel-sharp at every zoom level. The canvas is strictly a
 * backdrop.
 */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import * as THREE from 'three';

import { fragmentShader, vertexShader } from './background-shader';

gsap.registerPlugin(ScrollTrigger);

/**
 * Three's colour management would convert our sRGB palette into linear space
 * and back. We want the shader to emit exactly the CSS colours it was handed,
 * so the conversion is switched off and the values pass through untouched.
 * Without this the canvas sits perceptibly lighter than `--color-cream-50`
 * and the seam between canvas and DOM background becomes visible.
 */
THREE.ColorManagement.enabled = false;

export interface ScrollCanvasHandle {
  destroy: () => void;
}

/** Reads a colour token from CSS so the canvas cannot drift from the palette. */
function readColor(styles: CSSStyleDeclaration, token: string, fallback: string): THREE.Color {
  const raw = styles.getPropertyValue(token).trim() || fallback;
  return new THREE.Color(raw);
}

export function initScrollCanvas(canvas: HTMLCanvasElement): ScrollCanvasHandle {
  const styles = getComputedStyle(document.documentElement);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: false, // A full-screen wash has no edges to alias.
    alpha: false,
    powerPreference: 'high-performance',
    // The field is redrawn every frame, so preserving the buffer only costs
    // memory bandwidth.
    preserveDrawingBuffer: false,
  });

  const scene = new THREE.Scene();
  // The vertex shader writes clip space directly, so the camera is a formality.
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

  const uniforms = {
    uTime: { value: 0 },
    uProgress: { value: 0 },
    uDisplacement: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uResolution: { value: new THREE.Vector2(1, 1) },
    uCanvasColor: { value: readColor(styles, '--color-navy-900', '#0A1120') },
    uPaperColor: { value: readColor(styles, '--color-navy-800', '#111C33') },
    uAccentColor: { value: readColor(styles, '--color-accent-500', '#D97706') },
    uGrain: { value: 0.014 },
  };

  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms,
    depthTest: false,
    depthWrite: false,
  });

  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
  mesh.frustumCulled = false;
  scene.add(mesh);

  /**
   * Render scale. The field is a soft, low-frequency wash with no fine
   * detail, so rendering below native resolution and letting the compositor
   * upscale is visually free — and full-viewport fragment work is by far the
   * dominant cost here. At DPR 2 this is roughly a 4x reduction in shaded
   * pixels versus naive full-res.
   */
  const isCoarse = window.matchMedia('(pointer: coarse)').matches;
  const renderScale = isCoarse ? 0.5 : 0.7;

  function resize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2) * renderScale;

    renderer.setPixelRatio(dpr);
    renderer.setSize(width, height, false);
    uniforms.uResolution.value.set(width, height);
  }
  resize();

  // --- Smooth scroll -----------------------------------------------------
  // Lenis owns the scroll position; ScrollTrigger is told to update from it
  // rather than from native scroll events, so the two never disagree.
  const lenis = new Lenis({
    lerp: 0.1,
    wheelMultiplier: 1,
    // Never hijack touch scrolling — momentum scrolling on mobile is a
    // platform behaviour users rely on, and overriding it reliably feels
    // worse than leaving it alone.
    syncTouch: false,
  });

  lenis.on('scroll', ScrollTrigger.update);

  // Everything shares GSAP's ticker: Lenis, ScrollTrigger, and the render
  // loop. One rAF for the whole page rather than three competing ones.
  const tickerCallback = (time: number) => lenis.raf(time * 1000);
  gsap.ticker.add(tickerCallback);
  gsap.ticker.lagSmoothing(0);

  // --- Scroll → uniforms -------------------------------------------------
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  let targetProgress = 0;
  let targetDisplacement = 0;

  const progressTrigger = ScrollTrigger.create({
    trigger: hero ?? document.body,
    start: 'top top',
    end: 'bottom top',
    onUpdate: (self) => {
      targetProgress = self.progress;
      // getVelocity() is px/sec and swings wildly. Normalise into roughly
      // 0–1 and clamp, or a flick sends the displacement term to absurd
      // values and the field tears.
      targetDisplacement = Math.min(Math.abs(self.getVelocity()) / 2400, 1);
    },
  });

  // --- Hero recede -------------------------------------------------------
  // With WebGL live, GSAP owns this instead of the CSS scroll-driven
  // animation (which stands down via `:not([data-webgl='on'])` in
  // global.css). Same visual result, but scrubbed against Lenis's smoothed
  // scroll position so it stays in lockstep with the shader uniforms.
  if (hero) {
    gsap.to(hero, {
      opacity: 0.25,
      scale: 0.97,
      ease: 'none',
      transformOrigin: '50% 20%',
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: 'bottom 25%',
        scrub: true,
        invalidateOnRefresh: true,
      },
    });
  }

  // --- Pointer -----------------------------------------------------------
  const targetMouse = new THREE.Vector2(0, 0);

  function onPointerMove(event: PointerEvent) {
    const aspect = window.innerWidth / window.innerHeight;
    targetMouse.set(
      (event.clientX / window.innerWidth - 0.5) * aspect,
      -(event.clientY / window.innerHeight - 0.5),
    );
  }

  // Pointer input is meaningless on touch and costs a listener, so it is
  // only wired up for fine pointers.
  if (!isCoarse) {
    window.addEventListener('pointermove', onPointerMove, { passive: true });
  }

  // --- Parallax ----------------------------------------------------------
  // DOM-only: elements move, the canvas camera stays put. Doing it this way
  // keeps text in the DOM (sharp) while still reading as depth against the
  // moving field behind it.
  const parallaxTargets = gsap.utils.toArray<HTMLElement>('[data-parallax]');

  for (const element of parallaxTargets) {
    const depth = Number.parseFloat(element.dataset.parallax || '0.1');
    gsap.to(element, {
      yPercent: -depth * 100,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        invalidateOnRefresh: true,
      },
    });
  }

  // --- Render loop -------------------------------------------------------
  let visible = !document.hidden;

  function onVisibilityChange() {
    visible = !document.hidden;
  }
  document.addEventListener('visibilitychange', onVisibilityChange);

  // GSAP's ticker already supplies a delta, so THREE.Clock (deprecated in
  // current three) is redundant. Clamped so a tab returning from the
  // background does not jump the field forward by seconds in one frame.
  function render(_time: number, deltaMs: number) {
    // A hidden tab still fires rAF in some browsers; skipping the draw keeps
    // a backgrounded page from burning GPU on an invisible canvas.
    if (!visible) return;

    const delta = Math.min(deltaMs / 1000, 0.05);
    uniforms.uTime.value += delta;

    // Critically damped-ish smoothing. The raw scroll signal is steppy;
    // easing the uniforms is what turns it into a liquid response rather
    // than a jitter.
    const ease = 1 - Math.pow(0.001, delta);
    uniforms.uProgress.value += (targetProgress - uniforms.uProgress.value) * ease;
    uniforms.uMouse.value.lerp(targetMouse, ease);

    // Displacement decays faster than it rises, so a flick surges and then
    // settles instead of sloshing.
    const displacementEase = targetDisplacement > uniforms.uDisplacement.value ? ease : ease * 0.35;
    uniforms.uDisplacement.value +=
      (targetDisplacement - uniforms.uDisplacement.value) * displacementEase;

    // Velocity is only reported while scrolling, so bleed it off manually.
    targetDisplacement *= 0.92;

    renderer.render(scene, camera);
  }

  gsap.ticker.add(render);

  // --- Resize ------------------------------------------------------------
  const onResize = () => {
    resize();
    ScrollTrigger.refresh();
  };
  window.addEventListener('resize', onResize);

  // --- Context loss ------------------------------------------------------
  // A lost context on a background effect should fail quietly: stop drawing
  // and let the CSS background show through, rather than throwing on every
  // subsequent frame.
  function onContextLost(event: Event) {
    event.preventDefault();
    gsap.ticker.remove(render);
    canvas.style.opacity = '0';
  }
  canvas.addEventListener('webglcontextlost', onContextLost);

  // Reveal only once the first frame is on screen, so there is no flash of
  // an empty black canvas before the shader compiles.
  render(0, 16);
  canvas.style.opacity = '1';

  return {
    destroy() {
      gsap.ticker.remove(render);
      gsap.ticker.remove(tickerCallback);
      progressTrigger.kill();
      for (const trigger of ScrollTrigger.getAll()) trigger.kill();
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      canvas.removeEventListener('webglcontextlost', onContextLost);
      lenis.destroy();
      mesh.geometry.dispose();
      material.dispose();
      renderer.dispose();
    },
  };
}
