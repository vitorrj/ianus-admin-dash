#!/bin/bash

# Navigate to the script's directory (for double-click execution)
cd "$(dirname "$0")"

echo "================================"
echo "  Ianus Admin Dashboard Setup"
echo "================================"
echo ""

# Check if node is installed
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed."
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "Node version: $(node -v)"
echo "npm version: $(npm -v)"
echo ""

# Install dependencies if node_modules doesn't exist or package.json is newer
if [ ! -d "node_modules" ] || [ "package.json" -nt "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
    echo ""
fi

echo "Starting development server on port 4000..."
echo ""

# Open browser after a short delay (in background)
(sleep 2 && open "http://localhost:4000") &

# Run the dev server on port 4000
npm run dev -- -p 4000
