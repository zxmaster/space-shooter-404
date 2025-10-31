import { Bullet, drawBullets, updateBullets } from './bullets.js';
import { checkCollisions } from './collision.js';
import { InputHandler } from './input.js';
import { createSpacedObjects } from './objects.js';
import { Spaceship } from './spaceship.js';
import { generateStars, hideMessage, hideStartScreen, showMessage, updateHUD } from './ui.js';

/**
 * Main Game class - manages the entire game state and loop
 */
class Game {
  constructor() {
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d', { alpha: false });
    this.resizeCanvas();

    this.emojiCache = {};
    this.objects = [];
    this.bullets = [];
    this.spaceship = new Spaceship(this.canvas);
    this.inputHandler = new InputHandler();

    this.gameStarted = false;
    this.gameOver = false;
    this.gameWon = false;
    this.score = 0;
    this.invincibilityTimer = null;

    this.lastFireTime = 0;
    this.fireDelay = 200; // Minimum delay between shots in milliseconds

    this.init();
  }

  init() {
    generateStars();
    createSpacedObjects(15, this.canvas, this.spaceship, this.objects, this.emojiCache);
    this.setupEventListeners();
    this.animate();
  }

  setupEventListeners() {
    // Keyboard controls
    window.addEventListener('keydown', (e) => {
      if (!this.gameStarted && !this.gameOver && this.inputHandler.isControlPressed()) {
        this.startGame();
      }

      if (e.key === ' ' && this.gameStarted && !this.gameOver && !this.gameWon) {
        e.preventDefault();
        this.shoot();
      }

      if (e.key === 'Enter' && (this.gameOver || this.gameWon)) {
        this.restartGame();
      }
    });

    // Mobile controls
    this.inputHandler.setupMobileControls(() => {
      if (!this.gameStarted && !this.gameOver) {
        this.startGame();
      }
      if (this.gameStarted && !this.gameOver && !this.gameWon) {
        this.shoot();
      }
    });

    // Restart button
    document.getElementById('restartBtn').addEventListener('click', () => {
      this.restartGame();
    });

    // Window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        this.resizeCanvas();
        this.emojiCache = {};
      }, 250);
    });
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  startGame() {
    this.gameStarted = true;
    this.spaceship.invincible = true;
    hideStartScreen();
    updateHUD(this.score, this.objects.length);

    // Remove invincibility after 3 seconds
    this.invincibilityTimer = setTimeout(() => {
      this.spaceship.invincible = false;
    }, 3000);
  }

  shoot() {
    const currentTime = Date.now();
    if (currentTime - this.lastFireTime < this.fireDelay) {
      return; // Too soon to fire again
    }

    this.bullets.push(new Bullet(this.spaceship.x, this.spaceship.y, this.spaceship.rotation));
    this.lastFireTime = currentTime;
  }

  restartGame() {
    // Reset game state
    this.gameStarted = false;
    this.gameOver = false;
    this.gameWon = false;
    this.score = 0;

    if (this.invincibilityTimer) {
      clearTimeout(this.invincibilityTimer);
    }

    // Reset spaceship
    this.spaceship.reset(this.canvas);

    // Clear bullets and objects
    this.bullets.length = 0;
    this.objects.length = 0;

    // Reset UI
    updateHUD(0, 0);
    hideMessage();
    document.getElementById('restartBtn').style.display = 'none';
    document.getElementById('restartHint').style.display = 'none';

    // Recreate objects
    createSpacedObjects(15, this.canvas, this.spaceship, this.objects, this.emojiCache);

    // Show start instruction
    document.getElementById('startInstruction').style.display = 'block';
  }

  update() {
    if (!this.gameStarted || this.gameOver || this.gameWon) return;

    // Update spaceship
    this.spaceship.update(this.inputHandler.getKeys(), this.inputHandler.getTouchKeys());

    // Update objects
    this.objects.forEach((obj) => obj.update());

    // Update bullets
    updateBullets(this.bullets, this.canvas);

    // Check collisions
    const result = checkCollisions({
      bullets: this.bullets,
      objects: this.objects,
      spaceship: this.spaceship,
      score: this.score,
      gameOver: this.gameOver,
      gameWon: this.gameWon,
    });

    if (result.collision) {
      this.gameOver = true;
      showMessage('GAME OVER 💥', '#ff0000');
      if (this.invincibilityTimer) {
        clearTimeout(this.invincibilityTimer);
      }
    }

    if (result.victory) {
      this.gameWon = true;
      showMessage('CONGRATULATIONS! 🎉', '#00ff00');
    }
  }

  draw() {
    // Clear canvas
    this.ctx.fillStyle = '#1a1a2e';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw objects
    this.objects.forEach((obj) => obj.draw(this.ctx));

    // Draw spaceship and bullets if game started
    if (this.gameStarted) {
      this.spaceship.draw(this.ctx);
      drawBullets(this.ctx, this.bullets);
    }
  }

  animate() {
    this.update();
    this.draw();
    requestAnimationFrame(() => this.animate());
  }
}

// Initialize game when DOM is ready
new Game();
