import React from 'react';

interface SpotlightProps {
  className?: string;
  children: React.ReactNode;
}

// Card com holofote: uma luz ciano segue o mouse e acende a borda (estilos em index.css).
// Só aparece em aparelhos com mouse; no toque o card fica como está.
export const Spotlight: React.FC<SpotlightProps> = ({ className = '', children }) => {
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--x', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--y', `${e.clientY - rect.top}px`);
  };

  return (
    <div className={`spotlight ${className}`} onPointerMove={handlePointerMove}>
      {children}
    </div>
  );
};
