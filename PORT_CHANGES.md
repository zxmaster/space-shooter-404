# Space Shooter 404 - Quick Reference

## 🚀 Port Changes Summary

**OLD**: Port 3000 (conflicted with Grafana)
**NEW**: Port 5173 (Vite default)

## 📌 Quick Commands

### Development

```bash
# Inside VSCode DevContainer
npm run dev                    # Start Vite dev server (port 5173)
npm run dev:all               # Dev server + 404 watcher

# With Docker Compose
npm run docker:dev            # Start dev server with Traefik
npm run docker:logs           # View container logs
npm run docker:down           # Stop all containers
```

### Production

```bash
npm run build                 # Build for production
npm run preview              # Preview build (port 4173)
npm run docker:prod          # Nginx container (port 8080)
```

### Both (Dev + Prod)

```bash
npm run docker:all           # Start both profiles
```

## 🌐 Access URLs

### Local Development

- **Direct**: http://localhost:5173
- **Traefik**: http://space-shooter.localhost

### Production Preview

- **Direct**: http://localhost:8080
- **Traefik**: http://space-shooter-prod.localhost

### Simple Browser in VSCode

1. Press `Ctrl+Shift+P`
2. Type "Simple Browser: Show"
3. Enter: `http://localhost:5173`

## 🎮 VSCode Launch Configurations

Press `F5` or use Run & Debug panel:

- **Launch Vite Dev Server** - Full debug with Chrome
- **Launch with Live Preview** - Integrated browser
- **Launch Dev with 404 Watch** - Dev server + file watcher
- **Attach to Existing Vite Server** - Connect to running server
- **Preview Production Build** - Test production build

## 🛠️ Tasks (Ctrl+Shift+P → "Tasks: Run Task")

- **Start Vite Dev Server** (default build task)
- **Start Dev with 404 Watch**
- **Build for Production**
- **Preview Production Build**
- **Run Linter**
- **Kill Vite Server**

## 🐋 Traefik Integration

Your existing Traefik setup will automatically route:

- `space-shooter.localhost` → Dev server (5173)
- `space-shooter-prod.localhost` → Nginx (8080)

### Requirements

- Traefik container running
- Network `traefik-network` exists
- Web entrypoint configured (port 80)

### Create Network (if needed)

```bash
docker network create traefik-network
```

## 🔍 Troubleshooting

### Port in use

```bash
lsof -i :5173              # Check what's using the port
kill $(lsof -t -i:5173)   # Kill the process
```

### DevContainer rebuild

```bash
# Press Ctrl+Shift+P
# "Dev Containers: Rebuild Container"
```

### Check Traefik routing

```bash
docker-compose ps                                    # Check containers
docker logs space-shooter-dev                        # View logs
curl -H "Host: space-shooter.localhost" http://localhost
```

## 📝 Configuration Files Updated

- ✅ `vite.config.js` - Port 5173, host 0.0.0.0
- ✅ `.vscode/launch.json` - All URLs updated
- ✅ `.vscode/settings.json` - Live Preview port
- ✅ `.vscode/tasks.json` - Kill server task
- ✅ `.devcontainer/docker-compose.yml` - Port forwarding
- ✅ `docker-compose.yml` - NEW: Traefik integration
- ✅ `nginx.conf` - NEW: Production server config
- ✅ `package.json` - Docker helper scripts

## 🎯 Recommended Workflow

1. **Daily Development**: Use `npm run dev` in DevContainer
2. **Testing with Traefik**: Use `npm run docker:dev`
3. **Production Test**: Build, then `npm run docker:prod`
4. **Debugging**: Press `F5` in VSCode

## 📚 More Info

See `DOCKER_TRAEFIK_SETUP.md` for detailed documentation.
