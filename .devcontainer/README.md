# DevContainer with Docker Compose

This devcontainer setup uses Docker Compose to provide a consistent development environment with direct host access to build artifacts.

## 🎯 Features

- **Docker Compose**: Multi-service support (ready for future expansion)
- **Direct Host Access**:
  - `dist/`: Build artifacts immediately available on host filesystem
  - `node_modules`: Cached in named volume for better performance
- **Port Forwarding**: Vite dev server on port 3000
- **VS Code Integration**: Pre-configured extensions and settings

## 📦 Volume Management

### Bind Mounts

1. **dist directory**: Directly mounted to host
   - Build artifacts automatically appear in `./dist` on your host machine
   - No extraction needed!
   - Real-time access to build output
   - Located at: `/workspaces/space-shooter-404/dist` (container) = `./dist` (host)

### Named Volumes

2. **node-modules**: Contains npm dependencies
   - Improves performance on Windows/Mac hosts
   - Prevents permission issues
   - Located at: `/workspaces/space-shooter-404/node_modules`

## 🚀 Usage

### First Time Setup

1. Open the project in VS Code
2. Press `F1` and select "Dev Containers: Reopen in Container"
3. Wait for container to build and dependencies to install
4. Run `npm run dev` to start development

### Building for Production

```bash
# Inside the container
npm run build

# That's it! Artifacts are immediately in ./dist on your host machine
```

### Accessing Build Artifacts

**From Host Machine:**

```bash
# No extraction needed - just access directly!
ls dist/
open dist/404.html
```

**From Inside Container:**

```bash
# Same location
ls /workspaces/space-shooter-404/dist/
```

## 🔧 Docker Compose Commands

If you need to manage the containers manually:

```bash
# Start containers
docker-compose -f .devcontainer/docker-compose.yml up -d

# Stop containers
docker-compose -f .devcontainer/docker-compose.yml down

# Rebuild containers
docker-compose -f .devcontainer/docker-compose.yml up -d --build

# View logs
docker-compose -f .devcontainer/docker-compose.yml logs -f

# Remove volumes (⚠️ destroys build artifacts)
docker-compose -f .devcontainer/docker-compose.yml down -v
```

## 📋 Volume Management Commands

### View dist contents from host

```bash
# Just use normal commands!
ls -la dist/
cat dist/404.html
```

### Backup dist directory

```bash
# Standard tar backup
tar czf dist-backup.tar.gz dist/

# Or copy to another location
cp -r dist/ ~/backups/space-shooter-dist-$(date +%Y%m%d)/
```

### Clean dist directory

```bash
# From host
rm -rf dist/*

# Or from inside container
npm run build  # Rebuilds automatically
```

## 🔄 Updating the Setup

After modifying the `docker-compose.yml` or `Dockerfile`:

1. From VS Code: `F1` → "Dev Containers: Rebuild Container"
2. Or manually: `docker-compose -f .devcontainer/docker-compose.yml up -d --build`

## 🐛 Troubleshooting

### Permission issues

If you encounter permission issues with the dist directory:

- The container runs as `node` user (UID 1000)
- On Linux, you may need to adjust ownership: `sudo chown -R $USER:$USER dist/`
- On Windows/Mac with Docker Desktop, permissions are handled automatically

### Dist directory empty after build

1. Check if build succeeded: `npm run build` should complete without errors
2. Verify mount is correct: `docker-compose -f .devcontainer/docker-compose.yml config`
3. Check from inside container: `ls -la /workspaces/space-shooter-404/dist`

### Clean slate rebuild

To start completely fresh:

```bash
# Remove containers and node_modules volume
docker-compose -f .devcontainer/docker-compose.yml down -v
docker-compose -f .devcontainer/docker-compose.yml up -d --build
```

Note: This won't delete your `dist` folder since it's a bind mount to the host.

## 🎨 Customization

### Adding More Services

To add services (e.g., nginx for serving static files):

```yaml
services:
  app:
    # ... existing config ...

  nginx:
    image: nginx:alpine
    volumes:
      - ../dist:/usr/share/nginx/html:ro
    ports:
      - '8080:80'
```

### Using a Named Volume Instead

If you prefer a named volume (e.g., for better performance on Windows/Mac):

```yaml
volumes:
  # Add back:
  - dist-volume:/workspaces/space-shooter-404/dist

volumes:
  dist-volume:
    driver: local
```

Then you'd need to extract files using Docker commands when needed.

## ⚡ Performance Notes

**Bind Mount (Current Setup)**

- ✅ Immediate host access to artifacts
- ✅ Simple workflow
- ⚠️ Slightly slower I/O on Windows/Mac (but negligible for build output)

**Named Volume (Alternative)**

- ✅ Better I/O performance on Windows/Mac
- ⚠️ Requires extraction step to access files on host
- ⚠️ More complex workflow

## 📚 Resources

- [VS Code DevContainer Documentation](https://code.visualstudio.com/docs/devcontainers/containers)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Docker Volumes Documentation](https://docs.docker.com/storage/volumes/)
