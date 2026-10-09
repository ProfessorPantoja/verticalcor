import React from 'react';

interface SectionHeadingProps {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: 'center' | 'left';
  dark?: boolean; // seção de fundo escuro (marinho)
}

// Padrão único de título de seção: chamada em ciano + título + subtítulo
export const SectionHeading: React.FC<SectionHeadingProps> = ({ eyebrow, title, subtitle, align = 'center', dark = false }) => (
  <div className={align === 'center' ? 'text-center max-w-3xl mx-auto' : 'max-w-2xl'}>
    <span className={`block text-sm font-bold tracking-widest uppercase mb-3 ${dark ? 'text-cyan-400' : 'text-cyan-600'}`}>
      {eyebrow}
    </span>
    <h2 className={`text-3xl md:text-5xl font-extrabold tracking-tight leading-[1.1] ${dark ? 'text-white' : 'text-navy-900'}`}>
      {title}
    </h2>
    {subtitle && (
      <p className={`mt-5 text-lg leading-relaxed ${dark ? 'text-slate-300' : 'text-slate-600'}`}>
        {subtitle}
      </p>
    )}
  </div>
);
