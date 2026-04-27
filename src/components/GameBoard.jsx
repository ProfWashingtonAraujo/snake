import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GRID_SIZE } from '../data/constants';

const GameBoard = ({ snake, food, gameState }) => {
  return (
    <div className="relative glass-card p-2 sm:p-4 border-2 border-arcade-neon/20 shadow-[0_0_50px_rgba(0,243,255,0.1)] overflow-hidden">
      <div 
        className="relative grid bg-black/40 rounded-lg overflow-hidden"
        style={{
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
          gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`,
          width: 'min(85vw, 500px)',
          height: 'min(85vw, 500px)',
        }}
      >
        {/* Grid Background Effect */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" 
          style={{
            backgroundImage: `linear-gradient(#00f3ff11 1px, transparent 1px), linear-gradient(90deg, #00f3ff11 1px, transparent 1px)`,
            backgroundSize: `${100 / GRID_SIZE}% ${100 / GRID_SIZE}%`
          }} 
        />

        {/* Snake Rendering */}
        {snake.map((segment, index) => {
          const isHead = index === 0;
          return (
            <motion.div
              key={`${index}-${segment.x}-${segment.y}`}
              layoutId={isHead ? 'snake-head' : undefined}
              initial={false}
              animate={{
                gridColumnStart: segment.x + 1,
                gridRowStart: segment.y + 1,
                scale: isHead ? 1.1 : 0.9,
              }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 30,
                mass: 1
              }}
              className={`
                relative rounded-[20%] z-10
                ${isHead 
                  ? 'bg-arcade-neon shadow-[0_0_15px_rgba(0,243,255,0.8)] z-20' 
                  : 'bg-arcade-neon/60 border border-arcade-neon/20'}
              `}
            >
              {isHead && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-[20%] h-[20%] bg-arcade-dark rounded-full mx-[10%]" />
                  <div className="w-[20%] h-[20%] bg-arcade-dark rounded-full mx-[10%]" />
                </div>
              )}
            </motion.div>
          );
        })}

        {/* Food Rendering */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            filter: ['brightness(1)', 'brightness(1.5)', 'brightness(1)'],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            gridColumnStart: food.x + 1,
            gridRowStart: food.y + 1,
          }}
          className="bg-arcade-pink rounded-full shadow-[0_0_15px_rgba(255,0,255,0.8)] z-10"
        />

        {/* Overlay for States */}
        <AnimatePresence>
          {gameState === 'PAUSED' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm z-30 flex items-center justify-center"
            >
              <div className="text-center">
                <h2 className="text-4xl font-black italic neon-text-blue animate-pulse">PAUSED</h2>
                <p className="text-white/60 text-sm mt-2">Press SPACE to resume</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default GameBoard;
