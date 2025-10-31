/**
 * SpaceObject class - represents asteroids, planets, and other space objects
 */
export class SpaceObject {
  constructor(canvas, emojiCache) {
    this.canvas = canvas;
    this.emojiCache = emojiCache;
    this.emojis = ['🛸', '🌙', '⭐', '🪐', '☄️', '🚀', '🛰️', '👽', '🌟', '💫'];
    this.emoji = this.emojis[Math.floor(Math.random() * this.emojis.length)];
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
    this.size = 30 + Math.random() * 30;
    this.rotation = Math.random() * Math.PI * 2;
    this.rotationSpeed = (Math.random() - 0.5) * 0.02;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.rotation += this.rotationSpeed;

    if (this.x < 0 || this.x > this.canvas.width) {
      this.vx *= -1;
      this.x = Math.max(0, Math.min(this.canvas.width, this.x));
    }
    if (this.y < 0 || this.y > this.canvas.height) {
      this.vy *= -1;
      this.y = Math.max(0, Math.min(this.canvas.height, this.y));
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);

    const cacheKey = `${this.emoji}_${this.size}`;
    if (!this.emojiCache[cacheKey]) {
      const tempCanvas = document.createElement('canvas');
      const tempSize = this.size * 2;
      tempCanvas.width = tempSize;
      tempCanvas.height = tempSize;
      const tempCtx = tempCanvas.getContext('2d');
      tempCtx.font = `${this.size}px Arial`;
      tempCtx.textAlign = 'center';
      tempCtx.textBaseline = 'middle';
      tempCtx.shadowBlur = 15;
      tempCtx.shadowColor = 'rgba(255, 255, 255, 0.5)';
      tempCtx.fillText(this.emoji, tempSize / 2, tempSize / 2);
      this.emojiCache[cacheKey] = tempCanvas;
    }

    const cached = this.emojiCache[cacheKey];
    ctx.drawImage(cached, -cached.width / 2, -cached.height / 2);
    ctx.restore();
  }

  distanceTo(x, y) {
    const dx = this.x - x;
    const dy = this.y - y;
    return Math.sqrt(dx * dx + dy * dy);
  }
}

/**
 * Creates space objects with proper spacing
 */
export function createSpacedObjects(count, canvas, spaceship, objects, emojiCache) {
  const gridSize = Math.ceil(Math.sqrt(count));
  const cellWidth = canvas.width / gridSize;
  const cellHeight = canvas.height / gridSize;

  for (let i = 0; i < count; i++) {
    let attempts = 0;
    let obj;
    let tooClose = true;

    while (tooClose && attempts < 50) {
      const gridX = i % gridSize;
      const gridY = Math.floor(i / gridSize);

      obj = new SpaceObject(canvas, emojiCache);
      obj.x = gridX * cellWidth + Math.random() * cellWidth;
      obj.y = gridY * cellHeight + Math.random() * cellHeight;

      const angle = (i * 2.4 + Math.random() * 0.5) % (Math.PI * 2);
      const speed = 0.8 + Math.random() * 1.2;
      obj.vx = Math.cos(angle) * speed;
      obj.vy = Math.sin(angle) * speed;

      tooClose = false;

      // Check distance from spaceship
      const distToShip = obj.distanceTo(spaceship.x, spaceship.y);
      if (distToShip < 150) {
        tooClose = true;
      }

      for (let existing of objects) {
        const distance = obj.distanceTo(existing.x, existing.y);
        const minDistance = (obj.size + existing.size) / 2 + 50;
        if (distance < minDistance) {
          tooClose = true;
          break;
        }
      }

      attempts++;
    }

    if (obj) {
      objects.push(obj);
    }
  }
}
