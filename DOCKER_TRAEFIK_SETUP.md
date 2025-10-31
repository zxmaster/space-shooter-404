# Docker & Traefik Setup Guide

## 🎯 Overview

This project now uses **port 5173** (Vite's default) instead of 3000 to avoid conflicts with Grafana and other services.

## 🚀 Quick Start

### Development (Inside DevContainer)

```bash
# Just use npm as usual - devcontainer is already configured
npm run dev
# Access at: http://localhost:5173
```

### Development (With Docker Compose)

```bash
# Start development server with Traefik integration
docker-compose --profile dev up -d

# Access via:
# - Direct: http://localhost:5173
# - Traefik: http://space-shooter.localhost (if Traefik is running)
```

### Production Preview

```bash
# Build the project first
npm run build

# Start nginx server with Traefik integration
docker-compose --profile prod up -d

# Access via:
# - Direct: http://localhost:8080
# - Traefik: http://space-shooter-prod.localhost (if Traefik is running)
```

## 🔧 Port Configuration

| Service         | Port | Purpose                  |
| --------------- | ---- | ------------------------ |
| Vite Dev Server | 5173 | Development with HMR     |
| Vite Preview    | 4173 | Production build preview |
| Nginx (Docker)  | 8080 | Production container     |
| Grafana         | 3000 | ⚠️ Reserved - don't use  |

## 🌐 Traefik Integration

### Prerequisites

Ensure your Traefik container is configured with:

- A network named `traefik-network`
- Web entrypoint (typically port 80)
- Optional: websecure entrypoint (port 443) for HTTPS

### Accessing via Traefik

**Development:**

- URL: `http://space-shooter.localhost`
- Automatically proxied to port 5173

**Production:**

- URL: `http://space-shooter-prod.localhost`
- Automatically proxied to nginx container

### Customizing Domain Names

Edit `docker-compose.yml` and change these labels:

```yaml
# Change this line:
- 'traefik.http.routers.space-shooter-dev.rule=Host(`space-shooter.localhost`)'

# To your preferred domain:
- 'traefik.http.routers.space-shooter-dev.rule=Host(`myapp.localhost`)'
```

## 📁 Project Structure

```
space-shooter-404/
├── .devcontainer/
│   ├── docker-compose.yml    # DevContainer config (port 5173)
│   └── Dockerfile
├── docker-compose.yml         # Main Docker Compose (Traefik ready)
├── nginx.conf                 # Production nginx config
├── .env.example              # Environment variables template
└── dist/                     # Build output (bind mounted)
```

## 🔄 Common Workflows

### 1. Local Development (VSCode)

```bash
# Inside devcontainer - ports already forwarded
npm run dev
# Press F5 or use "Launch Vite Dev Server" configuration
```

### 2. Docker Development with Traefik

```bash
# Start with Docker Compose
docker-compose --profile dev up -d

# View logs
docker-compose logs -f space-shooter-dev

# Stop
docker-compose --profile dev down
```

### 3. Production Preview

```bash
# Build
npm run build

# Start nginx container
docker-compose --profile prod up -d

# Test 404 page
curl http://localhost:8080/nonexistent
curl http://space-shooter-prod.localhost/nonexistent
```

### 4. Both Dev and Prod Together

```bash
# Start all services
docker-compose --profile dev --profile prod up -d

# Access:
# - Dev: http://localhost:5173 or http://space-shooter.localhost
# - Prod: http://localhost:8080 or http://space-shooter-prod.localhost
```

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Check what's using port 5173
lsof -i :5173

# Kill process if needed
kill $(lsof -t -i:5173)
```

### Traefik Not Working

```bash
# Check if traefik-network exists
docker network ls | grep traefik

# Create if missing
docker network create traefik-network

# Ensure Traefik is running
docker ps | grep traefik

# Check Traefik logs
docker logs traefik
```

### DevContainer Port Conflict

If port 5173 is already in use on your host:

1. Edit `.devcontainer/docker-compose.yml`
2. Change `"5173:5173"` to `"<your-port>:5173"`
3. Update Vite config if needed

### Cannot Access via Traefik Domain

```bash
# Check Docker Compose is using the correct network
docker-compose ps

# Verify container is on traefik-network
docker inspect space-shooter-dev | grep NetworkMode

# Test Traefik routing
curl -H "Host: space-shooter.localhost" http://localhost
```

## 📝 Configuration Files

### vite.config.js

```javascript
server: {
  port: 5173,
  host: '0.0.0.0',    // Allow Docker access
  strictPort: true,    // Fail if port in use
  open: false,         // VSCode handles opening
}
```

### .devcontainer/docker-compose.yml

- Forwards ports 5173 and 4173
- Bind mounts `dist/` for immediate access
- Uses named volume for `node_modules`

### docker-compose.yml (Main)

- Two profiles: `dev` and `prod`
- Traefik labels configured
- External network: `traefik-network`

## 🎨 Best Practices

1. **Development**: Use devcontainer or `npm run dev` directly
2. **Testing**: Use Docker Compose with profiles
3. **Production**: Build image with dist folder or deploy nginx + static files
4. **Traefik**: Use for local multi-service development
5. **Port Management**: Keep 5173 for Vite, avoid hardcoding ports

## 🔐 HTTPS with Traefik

To enable HTTPS (commented out in docker-compose.yml):

1. Ensure Traefik has SSL configured
2. Uncomment the `-secure` router sections in docker-compose.yml
3. Restart containers:

```bash
docker-compose --profile dev down
docker-compose --profile dev up -d
```

Access via:

- `https://space-shooter.localhost`
- `https://space-shooter-prod.localhost`

## 📚 Additional Resources

- [Vite Server Options](https://vitejs.dev/config/server-options.html)
- [Traefik Docker Labels](https://doc.traefik.io/traefik/routing/providers/docker/)
- [Nginx Configuration](https://nginx.org/en/docs/)
- [VSCode DevContainers](https://code.visualstudio.com/docs/devcontainers/containers)
