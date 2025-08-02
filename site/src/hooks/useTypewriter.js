import { useState, useEffect, useMemo } from 'react';
import { TYPEWRITER_PHRASES, ANIMATION_CONFIG } from '../lib/constants';

export const useTypewriter = (phrases = TYPEWRITER_PHRASES) => {
  const [currentText, setCurrentText] = useState('');
  const [typewriterIndex, setTypewriterIndex] = useState(0);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const { typeSpeed, deleteSpeed, pauseDuration } = ANIMATION_CONFIG.typewriter;

  useEffect(() => {
    const timeout = setTimeout(() => {
      const currentPhrase = phrases[phraseIndex];
      
      if (!isDeleting && typewriterIndex < currentPhrase.length) {
        setCurrentText(currentPhrase.slice(0, typewriterIndex + 1));
        setTypewriterIndex(typewriterIndex + 1);
      } else if (isDeleting && typewriterIndex > 0) {
        setCurrentText(currentPhrase.slice(0, typewriterIndex - 1));
        setTypewriterIndex(typewriterIndex - 1);
      } else if (!isDeleting && typewriterIndex === currentPhrase.length) {
        setTimeout(() => setIsDeleting(true), pauseDuration);
      } else if (isDeleting && typewriterIndex === 0) {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      }
    }, isDeleting ? deleteSpeed : typeSpeed);

    return () => clearTimeout(timeout);
  }, [typewriterIndex, phraseIndex, isDeleting, phrases, typeSpeed, deleteSpeed, pauseDuration]);

  return currentText;
}; 