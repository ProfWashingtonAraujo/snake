import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RefreshCcw, Home, Save, Trophy } from 'lucide-react';
import { saveScore } from '../utils/rankingHelpers';
import { DIFFICULTIES } from '../data/constants';

const GameOverModal = ({ score, difficulty, onRestart, onHome }) => {
  const [name, setName] = useState('');
  const [saved, setSaved] = useState(false);
  const normalizedName = name.replace(/[^a-zA-Z\s]/g, '').trim();

  const handleSave = (e) => {
    e.preventDefault();
    if (!normalizedName) return;
    
    saveScore({
      name: normalizedName,
      score,
      difficulty: DIFFICULTIES[difficulty].label,
      date: new Date().toLocaleDateString(),
    });
    setSaved(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-arcade-dark/90 backdrop-blur-md">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="glass-card w-full max-w-md p-8 border-t-4 border-t-arcade-pink relative overflow-hidden"
      >
        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-arcade-pink blur-xl opacity-50" />
        
        <div className="text-center space-y-2 mb-8">
          <h2 className="text-5xl font-black italic neon-text-pink leading-none">GAME<br/>OVER</h2>
          <p className="text-white/40 uppercase text-xs font-bold tracking-[0.2em]">Final Score</p>
          <div className="text-4xl font-black italic">{score.toString().padStart(6, '0')}</div>
        </div>

        {!saved ? (
          <form onSubmit={handleSave} className="space-y-4 mb-8">
            <div className="space-y-2">
              <label className="text-[10px] text-white/40 uppercase font-black tracking-widest block">
                Enter your name for the ranking
              </label>
              <div className="relative">
                <input
                  autoFocus
                  type="text"
                  maxLength={12}
                  value={name}
                  onChange={(e) => setName(e.target.value.replace(/[^a-zA-Z\s]/g, ''))}
                  placeholder="PLAYER ONE"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-arcade-neon transition-colors font-bold uppercase placeholder:text-white/20"
                />
              </div>
            </div>
            <button 
              type="submit"
              disabled={!normalizedName}
              className="w-full neon-button bg-arcade-neon/20 hover:bg-arcade-neon/30 text-arcade-neon border border-arcade-neon/30 py-3 rounded-xl font-bold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4" />
              SAVE SCORE
            </button>
          </form>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-500/10 border border-green-500/20 text-green-400 p-4 rounded-xl text-center font-bold mb-8 flex items-center justify-center gap-2"
          >
            <Trophy className="w-5 h-5" />
            SCORE SAVED TO RANKING!
          </motion.div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={onRestart}
            className="flex items-center justify-center gap-2 py-4 px-4 bg-white/5 hover:bg-white/10 rounded-xl transition-colors font-bold text-sm"
          >
            <RefreshCcw className="w-4 h-4" />
            PLAY AGAIN
          </button>
          <button 
            onClick={onHome}
            className="flex items-center justify-center gap-2 py-4 px-4 bg-white/5 hover:bg-white/10 rounded-xl transition-colors font-bold text-sm"
          >
            <Home className="w-4 h-4 text-white/60" />
            MENU
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default GameOverModal;
