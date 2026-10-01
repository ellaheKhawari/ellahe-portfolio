'use client';

import { useCursorTrail } from '@/providers/CursorTrailProvider';
import { Shader } from 'shaders/react';

export default function CursorTrailBackground() {
  const { active } = useCursorTrail();

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        opacity: active ? 1 : 0,
        transition: 'opacity 0.4s ease',
      }}
    >
      <Shader
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          position: 'absolute',
          inset: 0,
        }}
        components={[
          {
            type: 'DotGrid',
            props: {
              id: 'trailDots',
              density: 40,
              dotSize: {
                type: 'map',
                source: 'trailFlow',
                channel: 'alpha',
                inputMax: 1,
                inputMin: 0,
                outputMax: 1,
                outputMin: 0,
              },
              twinkle: 0.9,
              visible: false,
            },
          },
          {
            type: 'ChromaFlow',
            props: { id: 'trailFlow', intensity: 1.4, radius: 2.9, visible: false },
          },
          {
            type: 'LinearGradient',
            props: {
              colorA: '#1e1e1f',
              colorB: '#070708',
              colorSpace: 'hsl',
              end: { x: 1, y: 0 },
              start: { x: 0, y: 1 },
            },
          },
          {
            type: 'LinearGradient',
            props: {
              colorA: '#000000',
              colorB: '#ffffff',
              colorSpace: 'hsl',
              end: { x: 1, y: 0 },
              maskSource: 'trailDots',
              start: { x: 0, y: 1 },
            },
          },
          { type: 'CursorRipples', props: {} },
          { type: 'FilmGrain', props: { strength: 0.1 } },
        ]}
      />
    </div>
  );
}