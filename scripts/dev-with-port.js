#!/usr/bin/env node

const { spawn } = require('child_process');
const net = require('net');

async function isPortAvailable(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.listen(port, () => {
      server.once('close', () => resolve(true));
      server.close();
    });
    server.on('error', () => resolve(false));
  });
}

async function findAvailablePort(startPort = 3000) {
  let port = startPort;
  while (!(await isPortAvailable(port))) {
    console.log(`Port ${port} is in use, trying ${port + 1}...`);
    port++;
  }
  return port;
}

async function startDev() {
  const availablePort = await findAvailablePort(3000);
  
  console.log(`Starting development server on port ${availablePort}...`);
  
  const args = ['dev', '--turbopack', '--port', availablePort.toString()];
  const child = spawn('npx', ['next', ...args], {
    stdio: 'inherit',
    shell: true
  });

  child.on('error', (error) => {
    console.error(`Error starting development server: ${error.message}`);
    process.exit(1);
  });

  child.on('close', (code) => {
    process.exit(code);
  });

  // Handle graceful shutdown
  process.on('SIGINT', () => {
    child.kill('SIGINT');
  });

  process.on('SIGTERM', () => {
    child.kill('SIGTERM');
  });
}

startDev().catch((error) => {
  console.error('Failed to start development server:', error);
  process.exit(1);
});