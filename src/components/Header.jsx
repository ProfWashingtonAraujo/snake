import React from 'react';
import { Trophy, Gamepad2, Settings } from 'lucide-react';

const Header = () => {
  return (
    <header className="w-full flex items-center justify-between p-6 animate-in fade-in slide-in-from-top duration-700">
      <div className="flex items-center gap-3">
        <div className="bg-arcade-neon/20 p-2 rounded-lg border border-arcade-neon/30">
          <Gamepad2 className="text-arcade-neon w-8 h-8" />
        </div>
        <div>
          <h1 className="text-2xl font-black tracking-tighter uppercase italic">
            Snake <span className="text-arcade-neon">Premium</span>
          </h1>
          <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-bold">
            Arcade Edition v1.0
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-white/5 rounded-full transition-colors">
          <Trophy className="w-5 h-5 text-arcade-yellow" />
        </button>
        <button className="p-2 hover:bg-white/5 rounded-full transition-colors">
          <Settings className="w-5 h-5 text-white/60" />
        </button>
      </div>
    </header>
  );
};

export default Header;
