import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Target, Zap } from 'lucide-react';
import { DIFFICULTIES } from '../data/constants';

const ScorePanel = ({ score, highScore, difficulty }) => {
  const currentDiff = DIFFICULTIES[difficulty];

  return (
    <div className="flex flex-col gap-4 w-full sm:w-48">
      <div className="glass-card p-4 flex items-center justify-between sm:flex-col sm:items-start sm:gap-1">
        <div className="flex items-center gap-2 text-white/40 uppercase text-[10px] font-bold tracking-widest">
          <Target className="w-3 h-3" />
          Score
        </div>
        <motion.div 
          key={score}
          initial={{ scale: 1.2, color: '#00f3ff' }}
          animate={{ scale: 1, color: '#ffffff' }}
          className="text-2xl font-black italic"
        >
          {score.toString().padStart(6, '0')}
        </motion.div>
      </div>

      <div className="glass-card p-4 flex items-center justify-between sm:flex-col sm:items-start sm:gap-1">
        <div className="flex items-center gap-2 text-white/40 uppercase text-[10px] font-bold tracking-widest">
          <Trophy className="w-3 h-3 text-arcade-yellow" />
          Best
        </div>
        <div className="text-xl font-black italic text-white/80">
          {highScore.toString().padStart(6, '0')}
        </div>
      </div>

      <div className="glass-card p-4 flex items-center justify-between sm:flex-col sm:items-start sm:gap-1">
        <div className="flex items-center gap-2 text-white/40 uppercase text-[10px] font-bold tracking-widest">
          <Zap className="w-3 h-3 text-arcade-pink" />
          Level
        </div>
        <div className={`text-sm font-bold uppercase ${currentDiff.color}`}>
          {currentDiff.label}
        </div>
      </div>
    </div>
  );
};

export default ScorePanel;
