import { GRID_SIZE } from '../data/constants';

export const getRandomPosition = (snake) => {
  let newFood;
  while (true) {
    newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
    
    // Check if food spawned inside snake
    const isInsideSnake = snake.some(
      (segment) => segment.x === newFood.x && segment.y === newFood.y
    );
    
    if (!isInsideSnake) break;
  }
  return newFood;
};

export const checkCollision = (head, snake) => {
  // Wall collision
  if (
    head.x < 0 ||
    head.x >= GRID_SIZE ||
    head.y < 0 ||
    head.y >= GRID_SIZE
  ) {
    return true;
  }
  
  // Self collision (skip the head itself which is at index 0)
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === head.x && snake[i].y === head.y) {
      return true;
    }
  }
  
  return false;
};
