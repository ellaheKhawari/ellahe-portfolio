'use client';

import { createContext, useContext, useState } from 'react';

const CursorTrailContext = createContext<{
  active: boolean;
  disable: () => void;
  enable: () => void;
} | null>(null);

export function CursorTrailProvider({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState(true);
  return (
    <CursorTrailContext.Provider
      value={{ active, disable: () => setActive(false), enable: () => setActive(true) }}
    >
      {children}
    </CursorTrailContext.Provider>
  );
}

export function useCursorTrail() {
  const ctx = useContext(CursorTrailContext);
  if (!ctx) throw new Error('useCursorTrail must be used inside CursorTrailProvider');
  return ctx;
}