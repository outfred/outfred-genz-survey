import React from 'react';
import { Language } from '../types';

interface LanguageToggleProps {
  mode: Language;
  setMode: (mode: Language) => void;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ mode, setMode }) => {
  const isAr = mode === 'ar';

  return (
    <div dir="ltr" className="relative flex h-12 w-56 items-center rounded-full bg-secondary/80 p-1 shadow-inner border border-primary/20 backdrop-blur-sm">
      <div
        className={`absolute h-10 w-[calc(50%-4px)] rounded-full bg-primary shadow-md transition-all duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] ${isAr ? 'left-[calc(50%+2px)]' : 'left-1'
          }`}
      ></div>

      <button
        onClick={() => setMode('fr')}
        className={`z-10 w-1/2 rounded-full py-2 text-sm font-bold transition-colors duration-300 font-sans ${!isAr ? 'text-primary-foreground' : 'text-foreground/70 hover:text-primary'
          }`}
      >
        Franco
      </button>

      <button
        onClick={() => setMode('ar')}
        className={`z-10 w-1/2 rounded-full py-2 text-sm font-bold transition-colors duration-300 font-arabic ${isAr ? 'text-primary-foreground' : 'text-foreground/70 hover:text-primary'
          }`}
      >
        عربي
      </button>
    </div>
  );
};

export default LanguageToggle;