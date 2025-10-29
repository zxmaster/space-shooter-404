# 🚀 Space Shooter 404 Page

An interactive 404 error page featuring a fun space shooter game built with vanilla JavaScript and HTML5 Canvas. Transform your error page into an engaging gaming experience!

![404 Space Shooter](https://img.shields.io/badge/404-Space%20Shooter-blue)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Canvas](https://img.shields.io/badge/Canvas-API-green)

## 🎮 Features

- **Interactive Space Shooter Game**: Turn 404 errors into a fun gaming experience
- **Smooth Controls**: WASD/Arrow keys for movement, SPACE for shooting
- **Mobile-Friendly**: Touch controls for mobile and tablet devices
- **Beautiful UI**: Gradient backgrounds with animated starfield
- **Collision Detection**: Advanced physics-based collision system
- **Score Tracking**: Real-time score and target counter
- **Responsive Design**: Adapts to any screen size
- **Performance Optimized**: Canvas caching for smooth 60fps gameplay
- **Easter Egg**: Hidden game unlocked on the 404 page

## 🎯 Game Mechanics

### Objective

Destroy all space objects while avoiding collisions to win the game!

### Controls

#### Desktop

- **W / ↑**: Move forward
- **S / ↓**: Move backward
- **A / ←**: Rotate left
- **D / →**: Rotate right
- **SPACE**: Fire bullets
- **ENTER**: Restart game (after game over/win)

#### Mobile/Tablet

- **D-Pad**: Navigate your spaceship
- **🔥 Fire Button**: Shoot bullets
- Touch controls automatically appear on screens ≤1024px

### Game Features

- **Invincibility Period**: 3 seconds of protection when starting
- **Dynamic Difficulty**: 15 random space objects with varied speeds
- **Collision Physics**: Realistic bounce mechanics for objects
- **Screen Wrapping**: Spaceship wraps around screen edges
- **Win Condition**: Destroy all targets
- **Lose Condition**: Collide with any space object

## 🚀 Quick Start

### Local Development

1. **Clone or download the repository**

   ```bash
   git clone https://github.com/zxmaster/space-shooter-404.git
   cd space-shooter-404
   ```

2. **Open the file**

   Simply open `404.html` in your web browser:

   - Double-click the file, or
   - Right-click → Open with → Your Browser

3. **Or use a local server** (recommended)

   ```bash
   # Using Python 3
   python -m http.server 8000

   # Using Node.js (if you have http-server installed)
   npx http-server

   # Using PHP
   php -S localhost:8000
   ```

   Then navigate to `http://localhost:8000/404.html`

## 📁 Project Structure

```
space-shooter-404/
│
├── 404.html          # Main HTML file with embedded CSS & JavaScript
└── README.md         # This file
```

## 🎨 Customization

### Change Space Objects

Edit the `emojis` array in the JavaScript section:

```javascript
const emojis = ['🛸', '🌙', '⭐', '🪐', '☄️', '🚀', '🛰️', '👽', '🌟', '💫'];
```

### Adjust Difficulty

Modify these parameters in the code:

```javascript
// Number of objects (line ~723)
createSpacedObjects(15);  // Change 15 to desired number

// Spaceship speed (line ~372)
maxSpeed: 8,              // Increase for faster movement
acceleration: 0.5,        // Increase for quicker acceleration

// Invincibility duration (line ~512)
setTimeout(() => {
  invincible = false;
}, 3000);                 // Change 3000ms (3s) to desired duration
```

### Modify Colors

Update the CSS gradient backgrounds:

```css
body {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
}

.btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

## 🌐 Deployment

### GitHub Pages

1. Push to your GitHub repository
2. Go to Settings → Pages
3. Select your branch and `/root` folder
4. Configure your 404 page in repository settings

### Netlify

1. Create a `_redirects` file:
   ```
   /*    /404.html   404
   ```
2. Deploy your site

### Vercel

1. Create a `vercel.json`:
   ```json
   {
     "routes": [{ "handle": "filesystem" }, { "src": "/(.*)", "status": 404, "dest": "/404.html" }]
   }
   ```
2. Deploy with Vercel CLI or GitHub integration

### Apache Server

Add to your `.htaccess`:

```apache
ErrorDocument 404 /404.html
```

### Nginx

Add to your server configuration:

```nginx
error_page 404 /404.html;
location = /404.html {
    internal;
}
```

## 🎮 How to Play

1. **Land on the 404 page** (or open the HTML file directly)
2. **Read the instructions** displayed on screen
3. **Press any control key** to start the game
4. **Navigate** your spaceship using WASD or Arrow keys
5. **Shoot** space objects with SPACE bar
6. **Avoid collisions** - you have 3 seconds of invincibility at start
7. **Destroy all targets** to win!
8. **Press ENTER** or click "Play Again" to restart

## 🔧 Technical Details

### Technologies Used

- **HTML5**: Structure and semantic markup
- **CSS3**: Animations, gradients, and responsive design
- **JavaScript (ES6+)**: Game logic and canvas rendering
- **Canvas API**: High-performance 2D graphics rendering

### Performance Optimizations

- **Emoji Caching**: Pre-rendered emojis stored in canvas cache
- **RequestAnimationFrame**: Smooth 60fps animation loop
- **Efficient Collision Detection**: Distance-based calculations
- **Debounced Resize**: Prevents excessive redraws on window resize
- **Alpha Channel Disabled**: `canvas.getContext('2d', { alpha: false })`

### Browser Compatibility

- ✅ Chrome/Edge (Chromium) - Recommended
- ✅ Firefox
- ✅ Safari
- ✅ Opera
- ✅ Mobile browsers (iOS Safari, Chrome Mobile, Samsung Internet)

Requires:

- HTML5 Canvas support
- ES6 JavaScript features
- CSS3 animations

## 📱 Responsive Design

The page automatically adapts to different screen sizes:

- **Desktop (>1024px)**: Keyboard controls only
- **Tablet/Mobile (≤1024px)**: Touch controls with D-pad and fire button
- **All devices**: Responsive canvas that fills viewport

## 🎯 Use Cases

- **Custom 404 Pages**: Make error pages memorable
- **Portfolio Projects**: Showcase creative web development skills
- **Gaming Websites**: Themed error pages for gaming sites
- **Educational**: Learn Canvas API and game development
- **Easter Eggs**: Hidden games on websites

## 🤝 Contributing

Contributions are welcome! Here are some ideas:

- Add sound effects
- Implement power-ups
- Create difficulty levels
- Add high score tracking with localStorage
- Multiplayer mode
- More space objects and animations
- Boss battles

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Emoji graphics provided by native browser emoji support
- Inspired by classic arcade space shooters
- Built with ❤️ for making the web more fun

## 📞 Contact

**Repository**: [github.com/zxmaster/space-shooter-404](https://github.com/zxmaster/space-shooter-404)

---

**Made with 🚀 by zxmaster** | _Turn errors into adventures!_
