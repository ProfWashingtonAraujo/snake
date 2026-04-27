import React from 'react';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

const MobileControls = ({ onDirectionChange, onPause, isPaused }) => {
  const Button = ({ children, onClick, className = "" }) => (
    <button 
      className={`bg-arcade-surface/80 active:bg-arcade-neon active:text-arcade-dark border border-white/10 rounded-2xl p-6 transition-all active:scale-90 shadow-lg ${className}`}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      {children}
    </button>
  );

  return (
    <div className="flex flex-col items-center gap-4 mt-8 sm:hidden w-full px-6 animate-in fade-in slide-in-from-bottom duration-700">
      <div className="grid grid-cols-3 gap-3 max-w-[280px]">
        <div />
        <Button onClick={() => onDirectionChange('UP')} className="flex items-center justify-center">
          <ChevronUp className="w-8 h-8" />
        </Button>
        <div />
        
        <Button onClick={() => onDirectionChange('LEFT')} className="flex items-center justify-center">
          <ChevronLeft className="w-8 h-8" />
        </Button>
        <Button onClick={onPause} className="bg-arcade-neon/10 border-arcade-neon/30 text-arcade-neon flex items-center justify-center">
          {isPaused ? <Play className="w-8 h-8 fill-current" /> : <Pause className="w-8 h-8 fill-current" />}
        </Button>
        <Button onClick={() => onDirectionChange('RIGHT')} className="flex items-center justify-center">
          <ChevronRight className="w-8 h-8" />
        </Button>
        
        <div />
        <Button onClick={() => onDirectionChange('DOWN')} className="flex items-center justify-center">
          <ChevronDown className="w-8 h-8" />
        </Button>
        <div />
      </div>
    </div>
  );
};

export default MobileControls;
