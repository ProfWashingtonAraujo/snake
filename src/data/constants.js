export const GRID_SIZE = 20;
export const INITIAL_SNAKE = [
  { x: 10, y: 10 },
  { x: 10, y: 11 },
  { x: 10, y: 12 },
];
export const INITIAL_DIRECTION = 'UP';

export const DIFFICULTIES = {
  EASY: {
    label: 'Fácil',
    speed: 220,
    minSpeed: 140,
    speedStep: 4,
    multiplier: 1,
    color: 'text-green-400',
  },
  MEDIUM: {
    label: 'Médio',
    speed: 200,
    minSpeed: 120,
    speedStep: 5,
    multiplier: 2,
    color: 'text-yellow-400',
  },
  HARD: {
    label: 'Difícil',
    speed: 110,
    minSpeed: 70,
    speedStep: 3,
    multiplier: 3,
    color: 'text-red-400',
  },
};

export const DIRECTIONS = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 },
};

export const KEYBOARD_MAPPING = {
  ArrowUp: 'UP',
  ArrowDown: 'DOWN',
  ArrowLeft: 'LEFT',
  ArrowRight: 'RIGHT',
  w: 'UP',
  s: 'DOWN',
  a: 'LEFT',
  d: 'RIGHT',
  W: 'UP',
  S: 'DOWN',
  A: 'LEFT',
  D: 'RIGHT',
};
