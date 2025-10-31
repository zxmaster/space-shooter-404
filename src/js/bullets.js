/**
 * Bullet class - represents projectiles fired by the spaceship
 */
export class Bullet {
  constructor(x, y, rotation) {
    this.x = x;
    this.y = y;
    this.vx = Math.cos(rotation) * 10;
    this.vy = Math.sin(rotation) * 10;
    this.life = 100;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.life--;
  }

  isOutOfBounds(canvas) {
    return (
      this.life <= 0 || this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height
    );
  }

  draw(ctx) {
    ctx.fillStyle = '#00ffff';
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#00ffff';
    ctx.beginPath();
    ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  }
}

/**
 * Update all bullets in the game
 */
export function updateBullets(bullets, canvas) {
  for (let i = bullets.length - 1; i >= 0; i--) {
    bullets[i].update();
    if (bullets[i].isOutOfBounds(canvas)) {
      bullets.splice(i, 1);
    }
  }
}

/**
 * Draw all bullets
 */
export function drawBullets(ctx, bullets) {
  bullets.forEach((bullet) => bullet.draw(ctx));
}
