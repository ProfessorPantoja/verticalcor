import React from 'react';
import { motion } from 'framer-motion';

interface BrandRibbonProps {
  className?: string;
  delay?: number;
  duration?: number;
  opacity?: number;
}

// Fita de tinta inspirada na fita ciano da logo: três faixas (clara, média, escura)
// que se desenham na tela. É a assinatura visual do site.
export const BrandRibbon: React.FC<BrandRibbonProps> = ({ className = '', delay = 0.3, duration = 2.2, opacity = 1 }) => {
  const id = React.useId().replace(/:/g, '');
  const bands = [
    { d: 'M -80 640 C 220 470, 470 700, 760 520 S 1180 250, 1540 300', w: 74, color: `url(#${id}-escura)`, o: 0.9 },
    { d: 'M -80 600 C 230 430, 480 650, 770 470 S 1190 210, 1540 250', w: 46, color: `url(#${id}-media)`, o: 0.95 },
    { d: 'M -80 565 C 240 400, 490 610, 780 430 S 1200 180, 1540 215', w: 22, color: `url(#${id}-clara)`, o: 1 },
  ];

  return (
    <svg
      className={`pointer-events-none ${className}`}
      viewBox="0 0 1440 800"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      style={{ opacity }}
    >
      <defs>
        <linearGradient id={`${id}-escura`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#1F8AC4" stopOpacity="0" />
          <stop offset="0.25" stopColor="#1F8AC4" />
          <stop offset="1" stopColor="#0891B2" />
        </linearGradient>
        <linearGradient id={`${id}-media`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#2CB6DB" stopOpacity="0" />
          <stop offset="0.25" stopColor="#2CB6DB" />
          <stop offset="1" stopColor="#06B6D4" />
        </linearGradient>
        <linearGradient id={`${id}-clara`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#41CFE5" stopOpacity="0" />
          <stop offset="0.25" stopColor="#41CFE5" />
          <stop offset="1" stopColor="#A5F3FC" />
        </linearGradient>
      </defs>
      {bands.map((b, i) => (
        <motion.path
          key={i}
          d={b.d}
          fill="none"
          stroke={b.color}
          strokeWidth={b.w}
          strokeLinecap="round"
          strokeOpacity={b.o}
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration, delay: delay + i * 0.15, ease: [0.65, 0, 0.35, 1] }}
        />
      ))}
    </svg>
  );
};
