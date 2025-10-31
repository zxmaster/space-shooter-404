/**
 * UI and background effects
 */
export function generateStars() {
  const starsContainer = document.getElementById('stars');
  for (let i = 0; i < 150; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.animationDelay = Math.random() * 3 + 's';
    starsContainer.appendChild(star);
  }
}

export function showMessage(text, color = 'white') {
  const msg = document.getElementById('gameMessage');
  const msgText = document.getElementById('gameMessageText');
  msgText.textContent = text;
  msg.style.color = color;
  msg.style.display = 'block';
  document.getElementById('restartBtn').style.display = 'inline-block';
  document.getElementById('restartHint').style.display = 'block';
}

export function hideMessage() {
  document.getElementById('gameMessage').style.display = 'none';
}

export function showStartScreen() {
  document.getElementById('welcomeScreen').style.display = 'block';
  document.getElementById('startInstruction').style.display = 'block';
  document.getElementById('gameHud').style.display = 'none';
  document.getElementById('mobileControls').style.display = 'none';
}

export function hideStartScreen() {
  document.getElementById('welcomeScreen').style.display = 'none';
  document.getElementById('startInstruction').style.display = 'none';
  document.getElementById('gameHud').style.display = 'block';

  if (window.innerWidth <= 1024) {
    document.getElementById('mobileControls').style.display = 'block';
  }
}

export function updateHUD(score, targetsLeft) {
  document.getElementById('score').textContent = score;
  document.getElementById('targets').textContent = targetsLeft;
}
