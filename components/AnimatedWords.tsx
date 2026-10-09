import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedWordsProps {
  text: string;
  delay?: number;
  wordClassName?: string;
}

// Entrada palavra por palavra: cada palavra sobe de dentro de uma "janela" (máscara).
// O texto não muda; leitores de tela leem a frase inteira pelo trecho sr-only.
export const AnimatedWords: React.FC<AnimatedWordsProps> = ({ text, delay = 0, wordClassName = '' }) => {
  const words = text.split(' ');
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, i) => (
          <React.Fragment key={i}>
            <span className="inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em]">
              <motion.span
                className={`inline-block ${wordClassName}`}
                initial={{ y: '110%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 0.8, delay: delay + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              >
                {word}
              </motion.span>
            </span>
            {i < words.length - 1 && ' '}
          </React.Fragment>
        ))}
      </span>
    </>
  );
};
