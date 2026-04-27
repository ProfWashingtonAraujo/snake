import { useState, useEffect, useCallback, useRef } from 'react';
import { INITIAL_SNAKE, INITIAL_DIRECTION, DIRECTIONS, GRID_SIZE, DIFFICULTIES } from '../data/constants';
import { getRandomPosition, checkCollision } from '../utils/gameHelpers';

export const useSnakeGame = (difficulty = 'MEDIUM') => {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState('START'); // START, PLAYING, PAUSED, GAME_OVER
  const [highScore, setHighScore] = useState(0);
  
  const moveRef = useRef(INITIAL_DIRECTION);
  const lastProcessedMoveRef = useRef(INITIAL_DIRECTION);

  const resetGame = useCallback(() => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    moveRef.current = INITIAL_DIRECTION;
    lastProcessedMoveRef.current = INITIAL_DIRECTION;
    setFood(getRandomPosition(INITIAL_SNAKE));
    setScore(0);
    setGameState('PLAYING');
  }, []);

  const pauseGame = useCallback(() => {
    if (gameState === 'PLAYING') setGameState('PAUSED');
    else if (gameState === 'PAUSED') setGameState('PLAYING');
  }, [gameState]);

  const changeDirection = useCallback((newDir) => {
    const opposites = {
      UP: 'DOWN',
      DOWN: 'UP',
      LEFT: 'RIGHT',
      RIGHT: 'LEFT',
    };
    
    // Prevent reverse direction and multiple turns in one frame
    if (opposites[newDir] !== lastProcessedMoveRef.current && newDir !== moveRef.current) {
      moveRef.current = newDir;
    }
  }, []);

  useEffect(() => {
    if (gameState !== 'PLAYING') return;

    const moveSnake = () => {
      setSnake((prevSnake) => {
        const head = prevSnake[0];
        const currentMove = moveRef.current;
        lastProcessedMoveRef.current = currentMove;
        
        const newHead = {
          x: head.x + DIRECTIONS[currentMove].x,
          y: head.y + DIRECTIONS[currentMove].y,
        };

        if (checkCollision(newHead, prevSnake)) {
          setGameState('GAME_OVER');
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];
        
        // Check if food eaten
        if (newHead.x === food.x && newHead.y === food.y) {
          setScore((s) => s + 10 * DIFFICULTIES[difficulty].multiplier);
          setFood(getRandomPosition(newSnake));
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    };

    const gameInterval = setInterval(moveSnake, DIFFICULTIES[difficulty].speed);
    return () => clearInterval(gameInterval);
  }, [gameState, food, difficulty]);

  return {
    snake,
    food,
    score,
    gameState,
    setGameState,
    resetGame,
    pauseGame,
    changeDirection,
    difficulty
  };
};
