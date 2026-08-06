/**
 * GLSL for the scroll-reactive background field.
 *
 * Design intent: this is *not* a typical WebGL gradient demo. The site is a
 * cream editorial layout, so the effect has to read as ink diffusing through
 * paper — a slow domain-warped noise field between two cream tones with a
 * whisper of bronze, plus film grain. Amplitudes are deliberately small; the
 * effect should be noticed only when you scroll, never while you read.
 *
 * All colour comes in as uniforms sampled from the CSS custom properties at
 * runtime, so the canvas can never drift out of sync with the palette.
 */

export const vertexShader = /* glsl */ `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

export const fragmentShader = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform float uProgress;     // 0 → 1 across the hero exit
  uniform float uDisplacement; // smoothed |scroll velocity|
  uniform vec2  uMouse;        // aspect-corrected, -0.5 → 0.5
  uniform vec2  uResolution;
  uniform vec3  uCanvasColor;  // --color-cream-50
  uniform vec3  uPaperColor;   // --color-white
  uniform vec3  uAccentColor;  // --color-accent-500
  uniform float uGrain;

  varying vec2 vUv;

  //
  // Ashima / Stefan Gustavson simplex noise (MIT). Kept over a cheaper value
  // noise because the gradient here is huge and slow — value-noise banding
  // would be plainly visible across a full-viewport wash.
  //
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);

    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;

    i = mod289(i);
    vec4 p = permute(permute(permute(
               i.z + vec4(0.0, i1.z, i2.z, 1.0))
             + i.y + vec4(0.0, i1.y, i2.y, 1.0))
             + i.x + vec4(0.0, i1.x, i2.x, 1.0));

    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);

    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);

    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);

    vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
  }

  // Three octaves is enough for a wash this soft; a fourth costs fill rate
  // and contributes detail that the grain then hides anyway.
  float fbm(vec3 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 3; i++) {
      value += amplitude * snoise(p);
      p *= 2.02;
      amplitude *= 0.5;
    }
    return value;
  }

  void main() {
    float aspect = uResolution.x / max(uResolution.y, 1.0);
    vec2 p = (vUv - 0.5) * vec2(aspect, 1.0);

    float t = uTime * 0.045;

    // --- Domain warp -----------------------------------------------------
    // Scroll progress opens the field up; velocity adds a transient surge,
    // which is what makes the surface feel liquid rather than merely animated.
    vec2 warp = vec2(
      fbm(vec3(p * 1.35, t)),
      fbm(vec3(p * 1.35 + 5.2, t))
    );
    float amplitude = 0.14 + uProgress * 0.20 + uDisplacement * 0.30;
    vec2 q = p + warp * amplitude;

    // --- Pointer ripple ---------------------------------------------------
    // Radial falloff so the disturbance stays local; it rides on velocity so
    // a still pointer leaves the field undisturbed.
    vec2 toMouse = p - uMouse;
    float d = length(toMouse);
    float ripple = sin(d * 9.0 - uTime * 1.1) * exp(-d * 3.6)
                 * (0.014 + uDisplacement * 0.085);
    q += normalize(toMouse + 1e-5) * ripple;

    float field = fbm(vec3(q * 1.02, t * 0.7)) * 0.5 + 0.5;

    // --- Tone -------------------------------------------------------------
    // The vertical gradient slides with scroll, so the wash appears to travel
    // with the reader rather than sit behind them.
    float grad = smoothstep(0.0, 1.0, vUv.y + (uProgress - 0.5) * 0.5);
    vec3 col = mix(uCanvasColor, uPaperColor, smoothstep(0.3, 0.85, field * 0.65 + grad * 0.5));

    // Bronze blooms only in the field's brightest pockets, and only as the
    // reader moves down — at rest the page is essentially plain cream.
    col = mix(col, uAccentColor, smoothstep(0.74, 1.0, field) * (0.05 + uProgress * 0.09));

    // --- Grain ------------------------------------------------------------
    // Breaks up banding across a very low-contrast gradient. Without it an
    // 8-bit framebuffer shows visible steps on large flat washes.
    float grain = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) - 0.5;
    col += grain * uGrain;

    gl_FragColor = vec4(col, 1.0);
  }
`;
