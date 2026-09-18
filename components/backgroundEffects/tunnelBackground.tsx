"use client";

import { useEffect, useRef, type RefObject } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { GammaCorrectionShader } from "three/examples/jsm/shaders/GammaCorrectionShader.js";
import { CopyShader } from "three/examples/jsm/shaders/CopyShader.js";

/**
 * TunnelBackground (section-scoped)
 * --------------------------------
 * پس‌زمینه‌ی تونل که فقط داخل والدِ خودش رندر می‌شود (position: absolute).
 * والد باید position: relative و overflow: hidden داشته باشد.
 *
 * progressRef: به المنت بلندِ «پین» اشاره می‌کند. پیشرفت اسکرول از روی
 * موقعیت آن المنت نسبت به ویوپورت حساب می‌شود، نه از کل صفحه.
 * اگر ندهید، خود کانتینر ملاک قرار می‌گیرد.
 */

const PARAMS = {
  atmoColor: "#98d1e1",
  bgColor: "#0a0a0a",
  colorHigh: "#335f7a",
  colorLow: "#0a0a0a",
  flameColor: "#9dc4dd",
  flameColor2: "#ceb8ff",

  atmoCount: 300,
  atmoSize: 24,
  atmoSpeed: 1,
  brightness: 0.25,
  flameAmt: 0.4,
  opacity: 1.46,
  parallax: 0.05,
  pointSize: 1,
  pointerRadius: 2.4,
  pointerStrength: 0.75,
  scale: 0.16,
  scrollFly: 34.4,
  scrollRoll: 0.85,
  scrollSwirl: 1.5,
  spin: 0.06,
  steer: 0.5,
  swirl: 0.39,
};

const LAYERS = { NONE: 0, TORUS_SCENE: 1, BLOOM_SCENE: 2, ENTIRE_SCENE: 3 } as const;

const Lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

function hexToVec3(hex: string): THREE.Vector3 {
  const n = parseInt(hex.slice(1), 16);
  return new THREE.Vector3(((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255);
}

const SNOISE = /* glsl */ `
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
float snoise(vec3 v){
  const vec2 C = vec2(1.0/6.0, 1.0/3.0); const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i = floor(v + dot(v, C.yyy)); vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz); vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy); vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + 1.0 * C.xxx; vec3 x2 = x0 - i2 + 2.0 * C.xxx; vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
  i = mod(i, 289.0);
  vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 1.0/7.0; vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z *ns.z);
  vec4 x_ = floor(j * ns.z); vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ *ns.x + ns.yyyy; vec4 y = y_ *ns.x + ns.yyyy; vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy); vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0)*2.0 + 1.0; vec4 s1 = floor(b1)*2.0 + 1.0; vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy; vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
  vec3 p0 = vec3(a0.xy,h.x); vec3 p1 = vec3(a0.zw,h.y); vec3 p2 = vec3(a1.xy,h.z); vec3 p3 = vec3(a1.zw,h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.5 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0); m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}
`;

const TUNNEL_VERTEX = /* glsl */ `
uniform float uTime; uniform float uSize; uniform float uSwirl; uniform float uScale;
uniform vec3 uColLow; uniform vec3 uColHigh;
uniform vec3 uCursor; uniform float uRepelRadius; uniform float uRepelStrength; uniform float uActivity;
varying float vFade; varying vec3 vColor;
${SNOISE}
void main() {
  vec3 wp = vec3(position.x * 7.0, 0.0, position.z * 25.0);
  wp.x += position.y * 6.0;
  float wn = snoise(vec3(wp.x * 0.08, wp.z * 0.08, uTime * 0.15)) * 2.0;
  wn += snoise(vec3(wp.x * 0.16, wp.z * 0.16, uTime * 0.3)) * 0.8;

  float tunnelR = 12.0;
  float currentSliceRadius = sqrt(max(0.0, 17.64 - position.z * position.z));
  float maxSliceWidth = 9.2195 * currentSliceRadius;
  float normalizedX = wp.x / (maxSliceWidth + 0.001);
  float tunnelAngle = normalizedX * 3.14159265;

  float jitterAngle = snoise(vec3(position.x * 15.0, position.y * 15.0, uTime * 0.1)) * 0.35;
  float jitterZ = snoise(vec3(position.y * 15.0, position.z * 15.0, uTime * 0.1)) * 4.0;
  float ambientSwirl = snoise(vec3(position.x * 5.0, position.y * 5.0, uTime * 0.2)) * 3.0;
  tunnelAngle += jitterAngle + ambientSwirl * uSwirl;

  float dynamicR = tunnelR - wn;
  vec3 tunnelPos = vec3(dynamicR * sin(tunnelAngle), -dynamicR * cos(tunnelAngle), wp.z + jitterZ);

  vec3 finalPos = tunnelPos * uScale;
  vec4 modelPosition = modelMatrix * vec4(finalPos, 1.0);
  vec3 toP = modelPosition.xyz - uCursor;
  float cd = length(toP);
  float fall = smoothstep(uRepelRadius, 0.0, cd);
  modelPosition.xyz += normalize(toP + vec3(0.0001)) * fall * uRepelStrength * uActivity;
  vec4 mvPosition = viewMatrix * modelPosition;

  float colMix = smoothstep(-3.0, 3.0, position.y + position.x * 0.5);
  vColor = mix(uColLow, uColHigh, clamp(colMix, 0.0, 1.0));
  vFade = 1.0;

  gl_PointSize = uSize * (10.0 / -mvPosition.z);
  gl_PointSize = max(gl_PointSize, 1.5);
  gl_Position = projectionMatrix * mvPosition;
}
`;

const TUNNEL_FRAGMENT = /* glsl */ `
uniform float uOpacity; uniform float uBrightness; uniform float uAppear;
varying float vFade; varying vec3 vColor;
void main() {
  vec2 xy = gl_PointCoord - 0.5;
  float ll = length(xy);
  if (ll > 0.5) discard;
  float a = smoothstep(0.5, 0.1, ll);
  gl_FragColor = vec4(vColor * uBrightness, vFade * a * uOpacity * uAppear);
}
`;

const ATMO_VERTEX = /* glsl */ `
attribute float size; attribute float seed; uniform float uTime; uniform vec2 uRes;
varying float vA;
vec3 warp(vec3 p, float t){ float c=0.9,a=1.9,b=0.02,s=0.05; p*=2.;
  p.x+=c*sin(s*t+a*p.y)+t*b; p.y+=c*cos(s*t+a*p.x); p.y+=c*sin(s*t+a*p.z)+t*b;
  p.z+=c*cos(s*t+a*p.y); p.z+=c*sin(s*t+a*p.x)+t*b; p.x+=c*cos(s*t+a*p.z);
  return cos(p+vec3(1,2,4)); }
void main(){
  vec3 v = position*4.0 + warp(position, uTime)*1.2;
  vec4 mv = modelViewMatrix * vec4(v, 1.0);
  float r = length(v); float farF = 1.0 - smoothstep(5.0, 6.5, r); float nearF = smoothstep(0.0, 0.5, -mv.z);
  vA = farF * nearF;
  gl_PointSize = size * uRes.y / 900.0 / -mv.z; gl_PointSize = max(gl_PointSize, 1.0);
  gl_Position = projectionMatrix * mv;
}
`;

const ATMO_FRAGMENT = /* glsl */ `
uniform vec3 uColor; varying float vA;
void main(){ vec2 p = gl_PointCoord - 0.5; float l = length(p); if (l > 0.5) discard;
  float tex = smoothstep(0.5, 0.0, l); gl_FragColor = vec4(uColor * tex, tex * vA * 0.6); }
`;

const FINAL_VERTEX = /* glsl */ `
varying vec2 vUv;
void main(){ vUv = uv; gl_Position = vec4(position, 1.0); }
`;

const FINAL_FRAGMENT = /* glsl */ `
uniform float iTime; uniform sampler2D tDiffuse; uniform sampler2D bloomTexture; uniform sampler2D torusTexture; uniform sampler2D haloTexture;
uniform vec3 uBg; uniform vec3 uFlameA; uniform vec3 uFlameB; uniform float uFlameAmt;
varying vec2 vUv;
vec3 warp3d(vec3 pos, float t){ float curv=.8,a=1.9,b=0.7; pos*=2.;
  pos.x+=curv*sin(t+a*pos.y)+t*b; pos.y+=curv*cos(t+a*pos.x);
  pos.y+=curv*sin(t+a*pos.z)+t*b; pos.z+=curv*cos(t+a*pos.y);
  pos.z+=curv*sin(t+a*pos.x)+t*b; pos.x+=curv*cos(t+a*pos.z);
  return 0.5+0.5*cos(pos.xyz+vec3(1,2,4)); }
void main(){
  vec2 uv = 2.*vUv - 1.;
  vec3 w = pow(warp3d(vec3(uv.x, sin(uv.y), uv.y), iTime*1.5), vec3(1.5));
  vec3 flame = 1.5*uFlameA*w.x; flame*=w.y; flame += uFlameB*w.z;
  flame *= smoothstep(0.25, 1., abs(uv.y));
  float md = smoothstep(-0.7, 1., -uv.y*uv.x); flame *= md*md;
  vec3 bg = uBg * (1.0 - 0.4 * length(uv));
  vec3 halo = texture2D(haloTexture, vUv).xyz;
  gl_FragColor = vec4(bg + flame*uFlameAmt + texture2D(bloomTexture, vUv).xyz + texture2D(torusTexture, vUv).xyz + texture2D(tDiffuse, vUv).xyz + halo, 1.);
}
`;

const FinalPassShader = {
  uniforms: {
    iTime: { value: 0 },
    tDiffuse: { value: null as THREE.Texture | null },
    torusTexture: { value: null as THREE.Texture | null },
    bloomTexture: { value: null as THREE.Texture | null },
    haloTexture: { value: null as THREE.Texture | null },
    uBg: { value: hexToVec3(PARAMS.bgColor) },
    uFlameA: { value: hexToVec3(PARAMS.flameColor) },
    uFlameB: { value: hexToVec3(PARAMS.flameColor2) },
    uFlameAmt: { value: PARAMS.flameAmt },
  },
  vertexShader: FINAL_VERTEX,
  fragmentShader: FINAL_FRAGMENT,
};

interface PointerState {
  active: boolean;
  lastMove: number;
  activity: number;
  world: THREE.Vector3;
}

export interface TunnelBackgroundProps {
  /** المنت بلندِ پین‌شونده که پیشرفت اسکرول از روی آن حساب می‌شود. */
  progressRef?: RefObject<HTMLElement | null>;
  /** کلاس اضافه برای کانتینر. */
  className?: string;
}

export default function TunnelBackground({ progressRef, className }: TunnelBackgroundProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = hostRef.current;
    if (!canvas || !host) return;

    const getSize = () => ({
      w: Math.max(1, host.clientWidth),
      h: Math.max(1, host.clientHeight),
    });

    let { w: width, h: height } = getSize();
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    // ---- renderer / scene / camera --------------------------------------
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
    renderer.setPixelRatio(dpr);
    renderer.setSize(width, height, false);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.VSMShadowMap;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    scene.fog = new THREE.Fog(0x000000, 0, 15);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 400);
    camera.position.set(0, 0, 20);
    camera.layers.enable(LAYERS.TORUS_SCENE);
    camera.layers.enable(LAYERS.BLOOM_SCENE);
    camera.layers.enable(LAYERS.ENTIRE_SCENE);
    scene.add(camera);

    // ---- tunnel points ----------------------------------------------------
    const tunnelGroup = new THREE.Group();
    scene.add(tunnelGroup);

    const tunnelGeometry = new THREE.SphereGeometry(4.2, 200, 600);
    const tunnelUniforms = {
      uTime: { value: 0 },
      uAppear: { value: 0 },
      uColLow: { value: hexToVec3(PARAMS.colorLow) },
      uColHigh: { value: hexToVec3(PARAMS.colorHigh) },
      uOpacity: { value: PARAMS.opacity },
      uSize: { value: PARAMS.pointSize },
      uBrightness: { value: PARAMS.brightness },
      uSwirl: { value: PARAMS.swirl },
      uScale: { value: PARAMS.scale },
      uCursor: { value: new THREE.Vector3() },
      uRepelRadius: { value: PARAMS.pointerRadius },
      uRepelStrength: { value: PARAMS.pointerStrength },
      uActivity: { value: 0 },
    };
    const tunnelMaterial = new THREE.ShaderMaterial({
      uniforms: tunnelUniforms,
      vertexShader: TUNNEL_VERTEX,
      fragmentShader: TUNNEL_FRAGMENT,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const tunnelPoints = new THREE.Points(tunnelGeometry, tunnelMaterial);
    tunnelPoints.frustumCulled = false;
    tunnelPoints.layers.enable(LAYERS.ENTIRE_SCENE);
    tunnelGroup.add(tunnelPoints);

    // ---- atmosphere points --------------------------------------------
    const N = PARAMS.atmoCount;
    const positions = new Float32Array(N * 3);
    const sizes = new Float32Array(N);
    const seeds = new Float32Array(N);
    for (let i = 0; i < N; i++) {
      positions[i * 3] = 2 * Math.random() - 1;
      positions[i * 3 + 1] = 2 * Math.random() - 1;
      positions[i * 3 + 2] = 2 * Math.random() - 1;
      sizes[i] = PARAMS.atmoSize * (0.4 + Math.random());
      seeds[i] = Math.random();
    }
    const atmoGeometry = new THREE.BufferGeometry();
    atmoGeometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    atmoGeometry.setAttribute("size", new THREE.Float32BufferAttribute(sizes, 1));
    atmoGeometry.setAttribute("seed", new THREE.Float32BufferAttribute(seeds, 1));

    const atmoUniforms = {
      uTime: { value: 0 },
      uColor: { value: hexToVec3(PARAMS.atmoColor) },
      uRes: { value: new THREE.Vector2(width * dpr, height * dpr) },
    };
    const atmoMaterial = new THREE.ShaderMaterial({
      uniforms: atmoUniforms,
      vertexShader: ATMO_VERTEX,
      fragmentShader: ATMO_FRAGMENT,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      depthTest: false,
    });
    const atmoPoints = new THREE.Points(atmoGeometry, atmoMaterial);
    atmoPoints.frustumCulled = false;
    atmoPoints.layers.enable(LAYERS.ENTIRE_SCENE);
    atmoPoints.onBeforeRender = () => {
      const t = performance.now() / 1000;
      atmoUniforms.uTime.value = t * PARAMS.atmoSpeed * 8.0;
      atmoPoints.position.copy(camera.position);
      finalPass.uniforms.iTime.value = t;
    };
    scene.add(atmoPoints);

    // ---- postprocessing --------------------------------------------------
    const renderScene = new RenderPass(scene, camera);

    const torusComposer = new EffectComposer(renderer);
    torusComposer.renderToScreen = false;
    torusComposer.addPass(renderScene);
    torusComposer.addPass(new ShaderPass(GammaCorrectionShader));
    torusComposer.addPass(new UnrealBloomPass(new THREE.Vector2(width, height), 0.22, 0.2, 0));
    torusComposer.addPass(new ShaderPass(CopyShader));

    const bloomComposer = new EffectComposer(renderer);
    bloomComposer.renderToScreen = false;
    bloomComposer.addPass(renderScene);
    bloomComposer.addPass(new UnrealBloomPass(new THREE.Vector2(width, height), 0.7, 0.6, 0));
    bloomComposer.addPass(new ShaderPass(GammaCorrectionShader));

    const finalPass = new ShaderPass(FinalPassShader);
    finalPass.uniforms.bloomTexture.value = bloomComposer.renderTarget1.texture;
    finalPass.uniforms.torusTexture.value = torusComposer.renderTarget1.texture;

    const finalComposer = new EffectComposer(renderer);
    finalComposer.addPass(renderScene);
    finalComposer.addPass(finalPass);

    torusComposer.setPixelRatio(dpr);
    bloomComposer.setPixelRatio(dpr);
    finalComposer.setPixelRatio(dpr);
    torusComposer.setSize(width, height);
    bloomComposer.setSize(width, height);
    finalComposer.setSize(width, height);

    // ---- scroll progress (نسبت به سکشن، نه کل صفحه) ----------------------
    let scrollSmooth = 0;
    let scrollCurrent = 0;

    const readProgress = () => {
      const el = progressRef?.current ?? host;
      const rect = el.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      if (travel <= 0) return 0;
      return clamp01(-rect.top / travel);
    };

    // ---- pointer state -----------------------------------------------
    const mouseTarget = { x: 0, y: 0 };
    const mouse = { x: 0, y: 0 };
    const POINTER: PointerState = {
      active: false,
      lastMove: performance.now(),
      activity: 0,
      world: new THREE.Vector3(),
    };

    const onMouseMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      const inside =
        e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
      if (!inside) {
        POINTER.active = false;
        return;
      }
      mouseTarget.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      mouseTarget.y = -(((e.clientY - r.top) / r.height) * 2 - 1);
      POINTER.active = true;
      POINTER.lastMove = performance.now();
    };
    const onMouseOut = () => {
      POINTER.active = false;
    };

    const _ndc = new THREE.Vector3();
    const _dir = new THREE.Vector3();
    const _tgt = new THREE.Vector3();
    function updatePointerWorld() {
      _tgt.set(0, 0, 0);
      if (POINTER.active) {
        _ndc.set(mouse.x, mouse.y, 0.5).unproject(camera);
        _dir.copy(_ndc).sub(camera.position).normalize();
        const dn = _dir.z;
        if (Math.abs(dn) > 1e-4) {
          const tt = -camera.position.z / dn;
          if (tt > 0 && Number.isFinite(tt)) {
            _tgt.copy(camera.position).addScaledVector(_dir, tt);
          }
        }
      }
      POINTER.world.lerp(_tgt, 0.12);
      const idle = (performance.now() - POINTER.lastMove) / 1000;
      POINTER.activity += ((POINTER.active && idle < 3 ? 1 : 0) - POINTER.activity) * 0.06;
    }

    // ---- per-frame scene update ---------------------------------------
    let rollPhase = 0;
    let t0 = performance.now() / 1000;
    const appearStart = performance.now();

    function updateScene(scroll: number, m: { x: number; y: number }) {
      const t = performance.now() / 1000;
      const dt = Math.min(0.05, t - t0);
      t0 = t;
      tunnelUniforms.uTime.value = t;

      camera.position.set(
        m.x * PARAMS.parallax,
        m.y * PARAMS.parallax,
        20 - scroll * PARAMS.scrollFly
      );
      camera.lookAt(m.x * PARAMS.steer, m.y * PARAMS.steer, camera.position.z - 12);
      updatePointerWorld();

      tunnelUniforms.uSwirl.value = PARAMS.swirl * (1 + scroll * PARAMS.scrollSwirl);
      rollPhase += dt * (PARAMS.spin + scroll * PARAMS.scrollRoll);
      tunnelGroup.rotation.z = rollPhase;

      tunnelUniforms.uCursor.value.copy(POINTER.world);
      tunnelUniforms.uActivity.value = POINTER.activity;
      const elapsed = (performance.now() - appearStart) / 1000;
      tunnelUniforms.uAppear.value = clamp01((elapsed - 0.2) / 1.4);
    }

    // ---- visibility (وقتی سکشن دیده نمی‌شود، رندر نکن) -------------------
    let visible = true;
    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? true;
      },
      { rootMargin: "100px" }
    );
    io.observe(host);

    // ---- render loop ----------------------------------------------------
    let rafId = 0;
    function render() {
      rafId = requestAnimationFrame(render);
      if (!visible) return;

      scrollSmooth = Lerp(scrollSmooth, readProgress(), 0.1);
      scrollCurrent = Lerp(scrollCurrent, scrollSmooth, 0.06);
      mouse.x = Lerp(mouse.x, mouseTarget.x, 0.06);
      mouse.y = Lerp(mouse.y, mouseTarget.y, 0.06);

      updateScene(scrollCurrent, mouse);

      camera.layers.set(LAYERS.TORUS_SCENE);
      torusComposer.render();
      camera.layers.set(LAYERS.BLOOM_SCENE);
      bloomComposer.render();
      camera.layers.set(LAYERS.ENTIRE_SCENE);
      finalComposer.render();
    }
    render();

    // ---- resize (بر اساس اندازه‌ی کانتینر، نه پنجره) ---------------------
    function onResize() {
      const s = getSize();
      width = s.w;
      height = s.h;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      renderer.setPixelRatio(dpr);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      for (const composer of [torusComposer, bloomComposer, finalComposer]) {
        composer.setPixelRatio(dpr);
        composer.setSize(width, height);
      }
      atmoUniforms.uRes.value.set(width * dpr, height * dpr);
    }

    const ro = new ResizeObserver(onResize);
    ro.observe(host);
    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseout", onMouseOut);

    // ---- cleanup ----------------------------------------------------
    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseout", onMouseOut);

      tunnelGeometry.dispose();
      tunnelMaterial.dispose();
      atmoGeometry.dispose();
      atmoMaterial.dispose();
      torusComposer.dispose();
      bloomComposer.dispose();
      finalComposer.dispose();
      renderer.dispose();
    };
  }, [progressRef]);

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}
      style={{ zIndex: 0 }}
    >
      <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: "100%" }} />
    </div>
  );
}