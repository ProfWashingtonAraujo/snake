import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import GameBoard from './components/GameBoard';
import ScorePanel from './components/ScorePanel';
import StartScreen from './components/StartScreen';
import GameOverModal from './components/GameOverModal';
import RankingPanel from './components/RankingPanel';
import MobileControls from './components/MobileControls';
import { useSnakeGame } from './hooks/useSnakeGame';
import { KEYBOARD_MAPPING } from './data/constants';
import { getBestScore } from './utils/rankingHelpers';

function App() {
  const [difficulty, setDifficulty] = useState('MEDIUM');
  const [view, setView] = useState('MENU'); // MENU, GAME, RANKING
  const {
    snake,
    food,
    score,
    gameState,
    setGameState,
    resetGame,
    pauseGame,
    changeDirection
  } = useSnakeGame(difficulty);

  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    setHighScore(getBestScore());
  }, [gameState]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (view !== 'GAME') return;
      
      if (e.code === 'Space') {
        e.preventDefault();
        pauseGame();
        return;
      }

      const dir = KEYBOARD_MAPPING[e.key];
      if (dir) {
        e.preventDefault();
        changeDirection(dir);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [view, pauseGame, changeDirection]);

  // Swipe detection for mobile
  useEffect(() => {
    let touchStartX = 0;
    let touchStartY = 0;

    const handleTouchStart = (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      if (view !== 'GAME' || gameState !== 'PLAYING') return;
      
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      
      const dx = touchEndX - touchStartX;
      const dy = touchEndY - touchStartY;
      
      if (Math.abs(dx) > Math.abs(dy)) {
        if (Math.abs(dx) > 30) {
          changeDirection(dx > 0 ? 'RIGHT' : 'LEFT');
        }
      } else {
        if (Math.abs(dy) > 30) {
          changeDirection(dy > 0 ? 'DOWN' : 'UP');
        }
      }
    };

    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [view, gameState, changeDirection]);

  const startGame = () => {
    setView('GAME');
    resetGame();
  };

  return (
    <div className="min-h-screen bg-arcade-dark flex flex-col items-center overflow-x-hidden">
      {/* Background Ambience */}
      <div className="fixed inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-arcade-neon/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-arcade-pink/10 blur-[100px] rounded-full pointer-events-none" />

      <Header />

      <main className="flex-1 w-full max-w-6xl flex flex-col items-center justify-center p-4 relative z-10">
        {view === 'MENU' && (
          <StartScreen 
            onStart={startGame} 
            onShowRanking={() => setView('RANKING')}
            highScore={highScore}
            currentDifficulty={difficulty}
            setDifficulty={setDifficulty}
          />
        )}

        {view === 'RANKING' && (
          <RankingPanel onBack={() => setView('MENU')} />
        )}

        {view === 'GAME' && (
          <div className="flex flex-col sm:flex-row gap-8 items-center sm:items-start animate-in fade-in zoom-in duration-500">
            <ScorePanel 
              score={score} 
              highScore={highScore} 
              difficulty={difficulty} 
            />
            
            <div className="flex flex-col items-center">
              <GameBoard 
                snake={snake} 
                food={food} 
                gameState={gameState} 
              />
              <MobileControls 
                onDirectionChange={changeDirection} 
                onPause={pauseGame}
                isPaused={gameState === 'PAUSED'}
              />
            </div>
            
            {/* Desktop Controls Info */}
            <div className="hidden lg:flex flex-col gap-4 w-48 text-white/20 uppercase font-black text-[10px] tracking-[0.2em]">
              <div className="glass-card p-4 space-y-2">
                <p className="text-white/40">Controls</p>
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between"><span>WASD / ARROWS</span><span className="text-white/60 text-[8px]">Move</span></div>
                  <div className="flex justify-between"><span>SPACE</span><span className="text-white/60 text-[8px]">Pause</span></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {gameState === 'GAME_OVER' && view === 'GAME' && (
        <GameOverModal 
          score={score} 
          difficulty={difficulty}
          onRestart={resetGame}
          onHome={() => setView('MENU')}
        />
      )}

      {/* Footer */}
      <footer className="w-full p-6 text-center text-white/10 text-[10px] font-bold tracking-widest uppercase">
        © 2024 Snake Premium Arcade • Developed with React & Tailwind
      </footer>
    </div>
  );
}

export default App;
