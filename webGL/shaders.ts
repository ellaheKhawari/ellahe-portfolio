export const vertexShader = `
  uniform float uBend;   
  uniform float uDir;    
  uniform float uDepth;  
  uniform float uHalfH; 
  uniform float uFlat;   
  uniform float uFull;   
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
  uniform vec2 uFitScale;
  uniform vec2 uFitOffset;
  varying vec2 vUv;
  void main() {
    vec2 p = vec2(vUv.x, 1.0 - vUv.y);
    vec2 t = (p - uFitOffset) / uFitScale;
    float e = 0.004;
    if (t.x < -e || t.x > 1.0 + e || t.y < -e || t.y > 1.0 + e) discard;
    vec2 c = clamp(t, 0.0, 1.0);
    vec4 color = texture2D(uTexture, vec2(c.x, 1.0 - c.y));
    gl_FragColor = vec4(color.rgb, 1.0);
  }
`;