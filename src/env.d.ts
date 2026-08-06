/// <reference types="astro/client" />

interface Window {
  /** Set by ScrollCanvas.astro to prevent double-booting the WebGL engine. */
  __scrollCanvasBooted?: boolean;
}
