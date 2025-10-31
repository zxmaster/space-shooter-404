FROM mcr.microsoft.com/devcontainers/javascript-node:20

# Install additional tools if needed
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends \
    git \
    && apt-get clean -y && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /workspaces/space-shooter-404

# Switch to node user
USER node
