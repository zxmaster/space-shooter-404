# 🚀 Space Shooter 404 Page

An interactive 404 error page featuring a fun space shooter game built with vanilla JavaScript, HTML5 Canvas, and Vite. Transform your error page into an engaging gaming experience with a modern, modular architecture!

![404 Space Shooter](https://img.shields.io/badge/404-Space%20Shooter-blue)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![Canvas](https://img.shields.io/badge/Canvas-API-green)

## 🎮 Features

- **Interactive Space Shooter Game**: Turn 404 errors into a fun gaming experience
- **Modular Architecture**: Clean separation of concerns with ES6 modules
- **Modern Build Setup**: Powered by Vite for fast development and optimized builds
- **DevContainer Support**: Ready-to-use development environment with VS Code
- **Smooth Controls**: WASD/Arrow keys for movement, SPACE for shooting
- **Mobile-Friendly**: Touch controls for mobile and tablet devices
- **Beautiful UI**: Gradient backgrounds with animated starfield
- **Collision Detection**: Advanced physics-based collision system
- **Score Tracking**: Real-time score and target counter
- **Responsive Design**: Adapts to any screen size
- **Performance Optimized**: Canvas caching for smooth 60fps gameplay

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

### Prerequisites

- Node.js 20.x or higher
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/zxmaster/space-shooter-404.git
   cd space-shooter-404
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

   The game will open at `http://localhost:3000`

4. **Auto-generate 404.html on changes (optional)**

   For automatic 404.html generation during development:

   ```bash
   # Run dev server + 404 watcher
   npm run dev:all

   # Or run 404 watcher separately
   npm run watch:404
   ```

   This watches `src/` and automatically rebuilds `404.html` whenever you save changes!

### Using DevContainer (Docker Compose)

If you're using VS Code with the Remote - Containers extension:

1. Open the project in VS Code
2. Press `F1` and select "Dev Containers: Reopen in Container"
3. Wait for the container to build and dependencies to install
4. Run `npm run dev` in the integrated terminal

**Benefits of Docker Compose Setup:**

- 🗂️ **Direct host access** to `dist` folder - no extraction needed!
- ⚡ **Fast node_modules** via named volume
- 🚀 **Ready for multi-service expansion** (add nginx, APIs, etc.)
- 📚 **Full documentation** in `.devcontainer/README.md`

**Build artifacts are immediately available:**

```bash
# Build inside container
npm run build

# Access from host - no extraction needed!
ls dist/
open dist/404.html
```

## 📁 Project Structure

```
space-shooter-404/
├── .devcontainer/
│   ├── devcontainer.json      # VS Code DevContainer configuration
│   ├── docker-compose.yml     # Docker Compose services
│   ├── Dockerfile             # Container image definition
│   └── README.md              # DevContainer documentation
├── src/
│   ├── js/
│   │   ├── main.js            # Main game controller
│   │   ├── spaceship.js       # Spaceship class and logic
│   │   ├── objects.js         # Space objects (asteroids, planets, etc.)
│   │   ├── bullets.js         # Bullet mechanics
│   │   ├── collision.js       # Collision detection
│   │   ├── input.js           # Input handling (keyboard & touch)
│   │   └── ui.js              # UI and visual effects
│   ├── styles/
│   │   ├── main.css           # Base styles
│   │   ├── animations.css     # Animations and keyframes
│   │   └── game.css           # Game-specific UI styles
│   └── index.html             # Main HTML template
├── scripts/
│   ├── post-build.js          # Build script to generate 404.html
│   └── watch-404.js           # Auto-rebuild 404.html on file changes
├── dist/                      # Build output (generated)
├── package.json
├── vite.config.js
├── .eslintrc.json
├── .prettierrc
└── README.md
```

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start Vite dev server with hot reload (port 3000)
- `npm run watch:404` - Auto-rebuild 404.html whenever src/ files change
- `npm run dev:all` - Run both dev server AND 404 watcher simultaneously
- `npm run build` - Production build (generates `404.html` in dist/ only)
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality

### Development Workflows

#### Option 1: Standard Development (Recommended for most work)

```bash
npm run dev
```

- Vite dev server with instant HMR
- Perfect for rapid development and testing
- View at http://localhost:3000

#### Option 2: Development + Auto 404.html Generation

```bash
npm run dev:all
```

- Runs Vite dev server (port 3000)
- Automatically rebuilds `404.html` on every file change
- Perfect when you need the production 404.html file constantly updated
- Artifacts appear in `dist/404.html` and root `404.html`

#### Option 2: Development + Auto 404.html Generation

```bash
npm run dev:all
```

- Runs Vite dev server (port 3000)
- Automatically rebuilds `404.html` on every file change
- Perfect when you need the production 404.html file constantly updated
- Artifacts appear in `dist/404.html` only

#### Option 3: Just Watch 404.html Generation

```bash
npm run watch:404
```

- Only watches and rebuilds 404.html
- No dev server
- Useful for CI/CD or when you just need the artifact

### Building for Production

```bash
npm run build
```

This will:

1. Clear and rebuild the `dist/` folder
2. Build the project with Vite
3. Create `404.html` from `index.html` in `dist/`
4. Remove `index.html` (keeping only `404.html`)

**Output:** `dist/404.html` and `dist/assets/` ready for deployment!

## 🎨 Customization

### Modifying Space Objects

Edit `src/js/objects.js` to change:

- Object emojis in the `emojis` array
- Object sizes and speed ranges
- Movement patterns and collision bouncing
- Initial spawn patterns

Example:

```javascript
this.emojis = ['🛸', '🌙', '⭐', '🪐', '☄️', '🚀', '🛰️', '👽', '🌟', '💫'];
```

### Adjusting Game Difficulty

Edit `src/js/main.js`:

- Change the number of objects: `createSpacedObjects(15, ...)`
- Modify invincibility duration (default: 3000ms)
- Adjust fire rate delay (default: 200ms)
- Customize spaceship speed in `src/js/spaceship.js`

Example:

```javascript
// In main.js
createSpacedObjects(20, this.canvas, this.spaceship, this.objects, this.emojiCache);

// Adjust fire rate
this.fireDelay = 100; // Faster shooting

// In spaceship.js
this.acceleration = 0.7; // Faster acceleration
this.maxSpeed = 10; // Higher top speed
```

### Styling

CSS is split into three files for easy customization:

- `src/styles/main.css`: Base layout and structure
- `src/styles/animations.css`: All keyframe animations
- `src/styles/game.css`: Game UI and mobile controls

Modify gradient backgrounds:

```css
body {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
}
```

## 📦 Deployment

### GitHub Pages

1. Build the project:

   ```bash
   npm run build
   ```

2. The `404.html` file will be created in both `dist/` and root folders

3. Push to your GitHub repository and enable GitHub Pages

4. GitHub will automatically use `404.html` for 404 errors

### Netlify

1. Build the project:

   ```bash
   npm run build
   ```

2. Deploy the `dist/` folder to Netlify

3. Netlify automatically recognizes `404.html`

### Vercel

1. Build the project:

   ```bash
   npm run build
   ```

2. Deploy the `dist/` folder to Vercel

3. Vercel automatically uses `404.html` for error pages

### Other Hosting

Simply upload the contents of the `dist/` folder to your web server. The build includes all necessary assets bundled and optimized.

For custom server configurations:

- **Apache**: Add `ErrorDocument 404 /404.html` to `.htaccess`
- **Nginx**: Add `error_page 404 /404.html;` to your config

## 🧩 Architecture

The game follows a modular architecture for maintainability and scalability:

- **Game Loop** (`main.js`): Central game state management and animation loop
- **Entity Classes**: Spaceship, SpaceObject, Bullet with their own update/draw methods
- **Input Handler**: Unified keyboard and touch input management
- **Collision System**: Dedicated collision detection logic
- **UI Manager**: Centralized UI state and messaging

### Module Breakdown

```
main.js         → Game orchestration, game loop
spaceship.js    → Player ship physics and rendering
objects.js      → Space object spawning and behavior
bullets.js      → Projectile mechanics
collision.js    → Collision detection algorithms
input.js        → Keyboard and touch event handling
ui.js           → UI updates and visual effects
```

## 🔧 VS Code Extensions

The DevContainer includes these pre-configured extensions:

- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Live Server**: Development server (optional alternative)
- **Path Intellisense**: Auto-complete for file paths
- **CSS Peek**: Navigate to CSS definitions
- **Auto Rename Tag**: Sync HTML tag renaming

## 🎮 How to Play

1. **Start the development server** with `npm run dev`
2. **Read the instructions** displayed on screen
3. **Press any control key** to start the game
4. **Navigate** your spaceship using WASD or Arrow keys (or D-pad on mobile)
5. **Shoot** space objects with SPACE bar (or Fire button on mobile)
6. **Avoid collisions** - you have 3 seconds of invincibility at start
7. **Destroy all targets** to win!
8. **Press ENTER** or click "Play Again" to restart

## 🔧 Technical Details

### Technologies Used

- **HTML5**: Structure and semantic markup
- **CSS3**: Animations, gradients, and responsive design
- **JavaScript (ES6+)**: Game logic, modules, and canvas rendering
- **Vite**: Build tool and development server
- **Canvas API**: High-performance 2D graphics rendering

### Performance Optimizations

- **Emoji Caching**: Pre-rendered emojis stored in canvas cache for faster rendering
- **ES6 Modules**: Code splitting for better organization and maintainability
- **Vite HMR**: Hot module replacement for instant development feedback
- **Optimized Builds**: Minification and bundling for production
- **RequestAnimationFrame**: Smooth 60fps animation loop
- **Efficient Collision Detection**: Distance-based calculations
- **Debounced Resize**: Prevents excessive redraws on window resize
- **Alpha Channel Disabled**: `canvas.getContext('2d', { alpha: false })`

- **Optimized Builds**: Minification and bundling for production

### Browser Compatibility

- ✅ Chrome/Edge (Chromium) - Recommended
- ✅ Firefox
- ✅ Safari
- ✅ Opera
- ✅ Mobile browsers (iOS Safari, Chrome Mobile, Samsung Internet)

Requires:

- HTML5 Canvas support
- ES6+ JavaScript features (modules, classes, arrow functions)
- CSS3 animations and transforms

## 📱 Responsive Design

The page automatically adapts to different screen sizes:

- **Desktop (>1024px)**: Keyboard controls
- **Tablet/Mobile (≤1024px)**: Touch controls with D-pad and fire button
- **All devices**: Responsive canvas that fills viewport

## 🎯 Use Cases

- **Custom 404 Pages**: Make error pages engaging and memorable
- **Portfolio Projects**: Showcase web development and game design skills
- **Gaming Websites**: Themed error pages for gaming-related sites
- **Educational**: Learn modern JavaScript, Canvas API, and game development
- **Easter Eggs**: Hidden interactive experiences on websites
- **Developer Showcase**: Demonstrate modular architecture and best practices

## 🤝 Contributing

Contributions are welcome! Here are some ideas:

- Add sound effects and background music
- Implement power-ups and special weapons
- Create difficulty levels and progressive challenges
- Add high score tracking with localStorage
- Multiplayer mode support
- More space objects, enemies, and animations
- Boss battles and special events
- Particle effects and visual polish

Please feel free to submit a Pull Request!

## � License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Emoji graphics provided by native browser emoji support
- Inspired by classic arcade space shooters
- Built with modern web technologies and best practices
- Created to make 404 errors fun and engaging

## 📞 Contact

**Repository**: [github.com/zxmaster/space-shooter-404](https://github.com/zxmaster/space-shooter-404)

---

**Made with 🚀 by zxmaster** | _Turn errors into adventures!_
