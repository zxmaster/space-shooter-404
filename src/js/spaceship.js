/**
 * Spaceship class - represents the player's ship
 */
export class Spaceship {
  constructor(canvas) {
    this.canvas = canvas;
    this.x = canvas.width / 2;
    this.y = canvas.height / 2;
    this.vx = 0;
    this.vy = 0;
    this.rotation = 0;
    this.size = 40;
    this.acceleration = 0.5;
    this.friction = 0.98;
    this.maxSpeed = 8;
    this.invincible = false;
  }

  update(keys, touchKeys) {
    const isUp = keys['w'] || keys['arrowup'] || touchKeys['up'];
    const isDown = keys['s'] || keys['arrowdown'] || touchKeys['down'];
    const isLeft = keys['a'] || keys['arrowleft'] || touchKeys['left'];
    const isRight = keys['d'] || keys['arrowright'] || touchKeys['right'];

    if (isUp) {
      this.vx += Math.cos(this.rotation) * this.acceleration;
      this.vy += Math.sin(this.rotation) * this.acceleration;
    }
    if (isDown) {
      this.vx -= Math.cos(this.rotation) * this.acceleration * 0.5;
      this.vy -= Math.sin(this.rotation) * this.acceleration * 0.5;
    }
    if (isLeft) {
      this.rotation -= 0.1;
    }
    if (isRight) {
      this.rotation += 0.1;
    }

    // Apply friction
    this.vx *= this.friction;
    this.vy *= this.friction;

    // Limit speed
    const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
    if (speed > this.maxSpeed) {
      this.vx = (this.vx / speed) * this.maxSpeed;
      this.vy = (this.vy / speed) * this.maxSpeed;
    }

    // Update position
    this.x += this.vx;
    this.y += this.vy;

    // Wrap around screen
    if (this.x < 0) this.x = this.canvas.width;
    if (this.x > this.canvas.width) this.x = 0;
    if (this.y < 0) this.y = this.canvas.height;
    if (this.y > this.canvas.height) this.y = 0;
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation + Math.PI / 4);

    // Add flashing effect when invincible
    if (this.invincible) {
      const flash = Math.floor(Date.now() / 200) % 2;
      ctx.globalAlpha = flash ? 1.0 : 0.4;
    }

    ctx.font = `${this.size}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowBlur = 20;
    ctx.shadowColor = this.invincible ? 'rgba(255, 215, 0, 0.8)' : 'rgba(100, 200, 255, 0.8)';
    ctx.fillText('🚀', 0, 0);

    ctx.globalAlpha = 1.0;
    ctx.restore();
  }

  reset(canvas) {
    this.canvas = canvas;
    this.x = canvas.width / 2;
    this.y = canvas.height / 2;
    this.vx = 0;
    this.vy = 0;
    this.rotation = 0;
    this.invincible = false;
  }
}
