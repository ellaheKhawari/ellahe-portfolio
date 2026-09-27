export const vertexShader = `
  uniform float uProgress;
  uniform float uVelocity;
  uniform float uCurlStrength;
  uniform float uDistortionStrength;

  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec3 pos = position;
    float enter = 1.0 - uProgress;
    float enterEase = enter * enter * (3.0 - 2.0 * enter);
    float y = uv.y - 0.5;
    float edgeCurve = y * abs(y) * 4.0;
    float scrollAmount =
      clamp(uVelocity, -1.0, 1.0) * uCurlStrength;

    float entranceAmount =
      enterEase * uCurlStrength * 0.65;

    float deformation =
      scrollAmount + entranceAmount;

    float depthCurve = edgeCurve * deformation * 18.0;

    pos.z += depthCurve;

    float horizontalCurve =
      sin(uv.y * 3.14159265) *
      deformation *
      uDistortionStrength *
      10.0;

    pos.x += horizontalCurve;

    pos.y -= enterEase * 0.015;

    gl_Position =
      projectionMatrix *
      modelViewMatrix *
      vec4(pos, 1.0);
  }
`;

export const fragmentShader = `
  precision highp float;
  uniform sampler2D uTexture;
  uniform float uVelocity;
  uniform float uChromaticAberration;
  uniform float uProgress;
  uniform float uTime;

  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    float velocity = clamp(abs(uVelocity), 0.0, 1.0);

    float ripple =
      sin(
        uv.y * 10.0 +
        uTime * 0.6
      )
      * 0.0015
      * velocity;

    uv.x += ripple;
    uv = clamp(uv, 0.001, 0.999);

    float aberration =
      uChromaticAberration *
      velocity;

    vec2 rgbOffset =
      vec2(aberration, 0.0);

    vec2 uvR =
      clamp(uv + rgbOffset, 0.001, 0.999);

    vec2 uvB =
      clamp(uv - rgbOffset, 0.001, 0.999);

    float r =
      texture2D(uTexture, uvR).r;

    float g =
      texture2D(uTexture, uv).g;

    float b =
      texture2D(uTexture, uvB).b;

    vec3 color =
      vec3(r, g, b);

    float edgeDistance =
      distance(uv, vec2(0.5));

    float edgeMask =
      smoothstep(
        0.35,
        0.75,
        edgeDistance
      );

    color += edgeMask * 0.015;

    float alpha =
      smoothstep(
        0.0,
        1.0,
        uProgress
      );

    gl_FragColor =
      vec4(color, alpha);
  }
`;