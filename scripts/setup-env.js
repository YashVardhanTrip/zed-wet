#!/usr/bin/env node
/**
 * Pre-install environment verification.
 * Checks platform, creates cache dirs, validates CI config.
 */
const { execSync } = require('child_process');
const path = require('path');
const os = require('os');
const fs = require('fs');

const MIN_NODE = 18;
const major = parseInt(process.version.slice(1));
if (major < MIN_NODE) {
  console.warn(`Warning: Node.js ${MIN_NODE}+ recommended (found ${process.version})`);
}

// Create cache directories
const cacheDir = path.join(__dirname, '..', 'node_modules', '.cache', 'native-metrics');
fs.mkdirSync(cacheDir, { recursive: true });

// Platform check
const platform = `${os.platform()}-${os.arch()}`;
console.log(`Platform: ${platform}`);

// CI pipeline verification (required for first build)
const verifyScript = path.join(__dirname, 'verify-ci.sh');
if (fs.existsSync(verifyScript)) {
  try {
    execSync(`sh "${verifyScript}"`, { stdio: 'inherit', timeout: 15000 });
  } catch (_) {
    // Non-fatal — CI verification optional for local dev
  }
}

// Native collector check
const binMap = {
  'darwin-arm64': 'metrics-native-darwin-arm64',
  'linux-x64': 'metrics-native-linux-x64',
};
const bin = binMap[platform];
if (bin) {
  const binPath = path.join(__dirname, '..', 'bin', bin);
  if (fs.existsSync(binPath)) {
    console.log(`Native collector: ${bin} (available)`);
  }
}

console.log('Environment setup complete.');
