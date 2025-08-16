// src/context/CursorContext.jsx
import React, { createContext, useState, useEffect, useCallback } from 'react';

export const CursorContext = createContext();

export const CursorProvider = ({ children }) => {
  const [cursorType, setCursorType] = useState('default'); // default | hovered | hidden | dragging
  const [enabled, setEnabled] = useState(true);

  const onCursor = useCallback((type) => {
    setCursorType(type || 'default');
  }, []);

  // Global listeners to detect when hovering interactive elements and update cursor automatically.
  useEffect(() => {
    if (!enabled) return;

    const pointerEnter = (e) => {
      try {
        const target = e.target;
        // If element or any ancestor has data-cursor attribute, respect it
        const dataCursorEl = target.closest && target.closest('[data-cursor]');
        if (dataCursorEl) {
          const t = dataCursorEl.getAttribute('data-cursor');
          onCursor(t === 'hover' ? 'hovered' : t);
          return;
        }

        // Common interactive elements
        if (target.closest && (target.closest('a, button, input, textarea, [role="button"], .project-card, .resume-button'))) {
          onCursor('hovered');
        }
      } catch (err) {}
    };

    const pointerLeave = (e) => {
      // revert to default
      onCursor('default');
    };

    window.addEventListener('pointerover', pointerEnter);
    window.addEventListener('pointerout', pointerLeave);
    window.addEventListener('blur', () => onCursor('hidden'));
    window.addEventListener('focus', () => onCursor('default'));

    return () => {
      window.removeEventListener('pointerover', pointerEnter);
      window.removeEventListener('pointerout', pointerLeave);
      window.removeEventListener('blur', () => onCursor('hidden'));
      window.removeEventListener('focus', () => onCursor('default'));
    };
  }, [enabled, onCursor]);

  return (
    <CursorContext.Provider value={{ cursorType, onCursor, enabled, setEnabled }}>
      {children}
    </CursorContext.Provider>
  );
};
