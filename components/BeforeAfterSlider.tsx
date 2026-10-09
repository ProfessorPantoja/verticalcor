import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeftRight } from 'lucide-react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
}

const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({ beforeImage, afterImage }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mantém a largura do container em estado, atualizando em resize/rotação de tela
  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const updateWidth = () => setContainerWidth(element.offsetWidth);
    updateWidth();

    const observer = new ResizeObserver(updateWidth);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const moveTo = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    setSliderPosition(Math.min(Math.max(x, 0), 100));
  };

  // Pointer events cobrem mouse, toque e caneta. O touch-action: pan-y deixa a
  // rolagem vertical com o navegador; só o arraste lateral move a barra.
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setHasInteracted(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    // No toque, só move ao arrastar (um deslize vertical para rolar não pula a barra)
    if (e.pointerType !== 'touch') moveTo(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging) moveTo(e.clientX);
  };

  const stopDragging = () => setIsDragging(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const step = e.shiftKey ? 10 : 2;
    if (e.key === 'ArrowLeft') setSliderPosition((p) => Math.max(p - step, 0));
    else if (e.key === 'ArrowRight') setSliderPosition((p) => Math.min(p + step, 100));
    else if (e.key === 'Home') setSliderPosition(0);
    else if (e.key === 'End') setSliderPosition(100);
    else return;
    e.preventDefault();
    setHasInteracted(true);
  };

  return (
    <div
      className="relative w-full max-w-4xl mx-auto aspect-[4/3] md:aspect-video rounded-xl overflow-hidden shadow-2xl select-none cursor-ew-resize group"
      style={{ touchAction: 'pan-y' }}
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={stopDragging}
      onPointerCancel={stopDragging}
    >
      {/* After Image (Base) */}
      <img
        src={afterImage}
        alt="Depois da pintura"
        draggable={false}
        className="absolute top-0 left-0 w-full h-full object-cover"
      />

      <div className={`absolute top-4 right-4 bg-navy-900/80 text-white px-3 py-1 rounded-full text-sm font-bold backdrop-blur-sm z-10 transition-opacity duration-300 ${sliderPosition > 93 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        DEPOIS
      </div>

      {/* Before Image (Overlay) */}
      <div
        className="absolute top-0 left-0 h-full w-full overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        <img
          src={beforeImage}
          alt="Antes da pintura"
          draggable={false}
          className="absolute top-0 left-0 h-full w-full object-cover max-w-none"
          style={{ width: containerWidth || '100%' }}
        />
        <div className={`absolute top-4 left-4 bg-gray-900/80 text-white px-3 py-1 rounded-full text-sm font-bold backdrop-blur-sm z-10 transition-opacity duration-300 ${sliderPosition < 7 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          ANTES
        </div>
      </div>

      {/* Slider Handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20 shadow-[0_0_10px_rgba(0,0,0,0.5)]"
        style={{ left: `${sliderPosition}%` }}
      >
        <div
          role="slider"
          tabIndex={0}
          aria-label="Comparar antes e depois"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(sliderPosition)}
          onKeyDown={handleKeyDown}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-cyan-500 w-11 h-11 rounded-full flex items-center justify-center shadow-lg border-2 border-white hover:scale-110 transition-transform focus-visible:ring-4 focus-visible:ring-cyan-300"
        >
          <ArrowLeftRight className="w-5 h-5 text-white" />
        </div>
      </div>

      <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap text-white/90 text-sm bg-black/40 px-4 py-1 rounded-full backdrop-blur-md pointer-events-none transition-opacity duration-500 ${hasInteracted ? 'opacity-0' : 'opacity-100'}`}>
        Arraste para comparar
      </div>
    </div>
  );
};

export default BeforeAfterSlider;
