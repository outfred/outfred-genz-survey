import React from 'react';
import { Language } from '../types';

interface LanguageToggleProps {
  mode: Language;
  setMode: (mode: Language) => void;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ mode, setMode }) => {
  return (
    <div className="relative inline-flex h-10 w-48 items-center justify-center rounded-full bg-secondary p-1">
      <div
        className={`absolute h-8 w-[calc(50%-4px)] rounded-full bg-primary shadow transition-all duration-300 ease-in-out ${
          mode === 'ar' ? 'right-1' : 'right-[calc(50%+2px)]'
        }`}
      ></div>
      <button
        onClick={() => setMode('ar')}
        className={`z-10 w-1/2 text-sm font-bold transition-colors duration-300 font-arabic ${
          mode === 'ar' ? 'text-primary-foreground' : 'text-muted-foreground'
        }`}
      >
        عربي
      </button>
      <button
        onClick={() => setMode('fr')}
        className={`z-10 w-1/2 text-sm font-bold transition-colors duration-300 font-sans ${
          mode === 'fr' ? 'text-primary-foreground' : 'text-muted-foreground'
        }`}
      >
        Franco
      </button>
    </div>
  );
};

export default LanguageToggle;