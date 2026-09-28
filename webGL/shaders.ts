export const vertexShader =  `
  uniform float uBend;   // 0..1   |scroll velocity|
  uniform float uDir;    // -1..1  +1 = scrolling down (content moving up)
  uniform float uDepth;  // px     max forward displacement at velocity 1
  uniform float uHalfH;  // px     half of the viewport height
  uniform float uFlat;   // 0..1   flat dead zone around the viewport center
  uniform float uFull;   // 0..1   distance where full depth is reached
  varying vec2 vUv;
  void main() {
    vUv = uv;
    vec4 world = modelMatrix * vec4(position, 1.0);
    float n = world.y / uHalfH;
    float t = clamp((abs(n) - uFlat) / max(uFull - uFlat, 0.001), 0.0, 1.3);
    float shape = t * t * t;
    shape *= 1.0 + 0.16 * uDir * sign(n);
    world.z += uDepth * uBend * shape;
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`;

export const fragmentShader = `
  uniform sampler2D uTexture;
  uniform vec2 uUvScale;   // object-fit mapping (cover / fill)
  varying vec2 vUv;
  void main() {
    vec2 uv = (vUv - 0.5) * uUvScale + 0.5;
    // Raw sRGB in, raw sRGB out: the flat state matches the DOM <img>.
    gl_FragColor = vec4(texture2D(uTexture, uv).rgb, 1.0);
  }
`;