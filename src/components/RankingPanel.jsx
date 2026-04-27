import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, ArrowLeft, Trash2 } from 'lucide-react';
import { getRanking, clearRanking } from '../utils/rankingHelpers';

const RankingPanel = ({ onBack }) => {
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    setRanking(getRanking());
  }, []);

  const handleClear = () => {
    if (window.confirm('Clear all ranking data? This cannot be undone.')) {
      clearRanking();
      setRanking([]);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 max-w-lg w-full gap-6 animate-in fade-in slide-in-from-bottom duration-500">
      <div className="flex items-center justify-between w-full">
        <button onClick={onBack} className="p-2 hover:bg-white/5 rounded-full transition-colors group">
          <ArrowLeft className="w-6 h-6 text-white/40 group-hover:text-white" />
        </button>
        <h2 className="text-3xl font-black italic tracking-tighter uppercase leading-none">
          LOCAL <span className="text-arcade-neon">RANKING</span>
        </h2>
        <button onClick={handleClear} className="p-2 hover:bg-red-500/10 rounded-full transition-colors group">
          <Trash2 className="w-5 h-5 text-white/20 group-hover:text-red-500" />
        </button>
      </div>

      <div className="glass-card w-full overflow-hidden">
        {ranking.length > 0 ? (
          <div className="divide-y divide-white/5">
            {ranking.map((entry, index) => (
              <div 
                key={entry.id} 
                className="flex items-center gap-4 p-4 hover:bg-white/5 transition-colors"
              >
                <div className={`
                  w-8 h-8 rounded-lg flex items-center justify-center font-black italic
                  ${index === 0 ? 'bg-arcade-yellow text-arcade-dark shadow-[0_0_10px_rgba(255,255,0,0.5)]' : 
                    index === 1 ? 'bg-slate-300 text-arcade-dark' :
                    index === 2 ? 'bg-orange-400 text-arcade-dark' : 'bg-white/10 text-white/40'}
                `}>
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="font-bold uppercase text-sm tracking-tight">{entry.name}</div>
                  <div className="text-[10px] text-white/20 uppercase font-black">{entry.difficulty} • {entry.date}</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-black italic text-arcade-neon">
                    {entry.score.toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center space-y-3">
            <Trophy className="w-12 h-12 text-white/10 mx-auto" />
            <p className="text-white/40 uppercase text-xs font-black tracking-widest">No scores recorded yet</p>
          </div>
        )}
      </div>

      <p className="text-center text-[10px] text-white/20 uppercase font-black tracking-[0.2em]">
        Top 10 players stored locally
      </p>
    </div>
  );
};

export default RankingPanel;
