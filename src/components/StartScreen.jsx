import React from 'react';
import { motion } from 'framer-motion';
import { Play, Trophy, Info } from 'lucide-react';
import { DIFFICULTIES } from '../data/constants';

const StartScreen = ({ onStart, onShowRanking, highScore, currentDifficulty, setDifficulty }) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 max-w-lg w-full gap-8 animate-in fade-in zoom-in duration-500">
      <div className="text-center space-y-2">
        <motion.h1 
          animate={{ textShadow: ['0 0 10px #00f3ff44', '0 0 20px #00f3ff88', '0 0 10px #00f3ff44'] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-5xl sm:text-7xl font-black italic tracking-tighter uppercase leading-none"
        >
          SNAKE<br />
          <span className="text-arcade-neon">PREMIUM</span>
        </motion.h1>
        <p className="text-white/40 uppercase tracking-[0.3em] text-xs font-bold">The Ultimate Arcade Experience</p>
      </div>

      <div className="glass-card w-full p-6 space-y-6">
        <div className="space-y-3">
          <label className="text-[10px] text-white/40 uppercase font-black tracking-widest block text-center">
            Select Difficulty
          </label>
          <div className="grid grid-cols-3 gap-2">
            {Object.entries(DIFFICULTIES).map(([key, diff]) => (
              <button
                key={key}
                onClick={() => setDifficulty(key)}
                className={`
                  py-2 px-3 rounded-lg text-xs font-bold transition-all border
                  ${currentDifficulty === key 
                    ? `bg-white/10 ${diff.color} border-white/20 scale-105 shadow-lg` 
                    : 'bg-transparent text-white/40 border-transparent hover:border-white/10'}
                `}
              >
                {diff.label}
              </button>
            ))}
          </div>
        </div>

        <button 
          onClick={onStart}
          className="w-full neon-button neon-button-primary group flex items-center justify-center gap-3 py-4"
        >
          <Play className="w-6 h-6 fill-current transition-transform group-hover:scale-110" />
          START GAME
        </button>

        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={onShowRanking}
            className="flex items-center justify-center gap-2 py-3 px-4 glass-card hover:bg-white/10 transition-colors text-sm font-bold"
          >
            <Trophy className="w-4 h-4 text-arcade-yellow" />
            RANKING
          </button>
          <button className="flex items-center justify-center gap-2 py-3 px-4 glass-card hover:bg-white/10 transition-colors text-sm font-bold">
            <Info className="w-4 h-4 text-white/60" />
            HOW TO PLAY
          </button>
        </div>
      </div>

      {highScore > 0 && (
        <div className="flex items-center gap-2 text-white/40 font-bold italic">
          <Trophy className="w-4 h-4 text-arcade-yellow" />
          <span className="text-xs uppercase tracking-widest">Global Best:</span>
          <span className="text-white">{highScore.toString().padStart(6, '0')}</span>
        </div>
      )}
    </div>
  );
};

export default StartScreen;
