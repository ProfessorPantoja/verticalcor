import React from 'react';
import { motion } from 'framer-motion';

interface SectionWaveProps {
  position: 'top' | 'bottom';
  fillClassName: string; // cor da seção vizinha (ex.: "fill-white")
}

// Divisa curva entre uma seção clara e uma escura, com três fios da fita ciano da marca
// que se desenham ao aparecer na tela. Fica dentro da seção escura (que tem overflow-hidden).
export const SectionWave: React.FC<SectionWaveProps> = ({ position, fillClassName }) => {
  const edge = 'C 120 90, 300 88, 480 60 C 800 10, 1100 110, 1440 40';
  const threads = [
    { d: `M 0 70 ${edge}`, color: '#22d3ee', w: 2.5, o: 0.9 },
    { d: 'M 0 80 C 120 100, 300 98, 480 70 C 800 20, 1100 120, 1440 50', color: '#06b6d4', w: 1.5, o: 0.6 },
    { d: 'M 0 89 C 120 109, 300 107, 480 79 C 800 29, 1100 129, 1440 59', color: '#0891b2', w: 1, o: 0.4 },
  ];

  return (
    <svg
      className={`absolute left-0 w-full h-[56px] md:h-[110px] pointer-events-none z-[1] ${position === 'top' ? 'top-0' : 'bottom-0 -scale-y-100'}`}
      viewBox="0 0 1440 130"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path d={`M 0 0 H 1440 V 40 C 1100 110, 800 10, 480 60 C 300 88, 120 90, 0 70 Z`} className={fillClassName} />
      {threads.map((t, i) => (
        <motion.path
          key={i}
          d={t.d}
          fill="none"
          stroke={t.color}
          strokeWidth={t.w}
          strokeOpacity={t.o}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, delay: 0.2 + i * 0.15, ease: [0.65, 0, 0.35, 1] }}
        />
      ))}
    </svg>
  );
};
