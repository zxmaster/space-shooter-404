/**
 * Collision detection and handling
 */
export function checkCollisions(gameState) {
  const { bullets, objects, spaceship, score } = gameState;

  // Check bullet-object collisions
  for (let i = bullets.length - 1; i >= 0; i--) {
    const bullet = bullets[i];
    for (let j = objects.length - 1; j >= 0; j--) {
      const obj = objects[j];
      const dist = obj.distanceTo(bullet.x, bullet.y);
      if (dist < obj.size / 2) {
        bullets.splice(i, 1);
        objects.splice(j, 1);
        gameState.score += 100;
        document.getElementById('score').textContent = gameState.score;
        document.getElementById('targets').textContent = objects.length;

        if (objects.length === 0) {
          gameState.gameWon = true;
          return { collision: false, victory: true };
        }
        break;
      }
    }
  }

  // Check spaceship-object collisions
  if (!spaceship.invincible) {
    for (let obj of objects) {
      const dist = obj.distanceTo(spaceship.x, spaceship.y);
      if (dist < (obj.size + spaceship.size) / 2) {
        gameState.gameOver = true;
        return { collision: true, victory: false };
      }
    }
  }

  return { collision: false, victory: false };
}
