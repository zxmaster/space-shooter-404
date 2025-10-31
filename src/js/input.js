/**
 * Input handling for keyboard and touch controls
 */
export class InputHandler {
  constructor() {
    this.keys = {};
    this.touchKeys = {};
    this.setupKeyboard();
  }

  setupKeyboard() {
    window.addEventListener('keydown', (e) => {
      this.keys[e.key.toLowerCase()] = true;
    });

    window.addEventListener('keyup', (e) => {
      this.keys[e.key.toLowerCase()] = false;
    });
  }

  setupMobileControls(onFireCallback) {
    const controlBtns = document.querySelectorAll('.control-btn');
    controlBtns.forEach((btn) => {
      btn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const key = btn.dataset.key;
        this.touchKeys[key] = true;

        if (key === 'fire') {
          onFireCallback();
        }
      });

      btn.addEventListener('touchend', (e) => {
        e.preventDefault();
        const key = btn.dataset.key;
        this.touchKeys[key] = false;
      });
    });
  }

  isControlPressed() {
    return (
      this.keys[' '] ||
      this.keys['w'] ||
      this.keys['a'] ||
      this.keys['s'] ||
      this.keys['d'] ||
      this.keys['arrowup'] ||
      this.keys['arrowdown'] ||
      this.keys['arrowleft'] ||
      this.keys['arrowright']
    );
  }

  isFirePressed() {
    return this.keys[' '];
  }

  isEnterPressed() {
    return this.keys['enter'];
  }

  getKeys() {
    return this.keys;
  }

  getTouchKeys() {
    return this.touchKeys;
  }
}
