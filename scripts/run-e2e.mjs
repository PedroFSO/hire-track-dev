import { spawn } from 'node:child_process';
import http from 'node:http';

const nodeCommand = process.execPath;
const playwrightArgs = process.argv.slice(2);

const run = (command, args, options = {}) =>
  new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: 'inherit',
      shell: false,
      ...options,
    });

    child.on('error', reject);
    child.on('exit', (code) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(new Error(`${command} ${args.join(' ')} exited with code ${code}`));
    });
  });

const waitForServer = (url, timeoutMs = 120_000) => {
  const startedAt = Date.now();

  return new Promise((resolve, reject) => {
    const check = () => {
      const request = http.get(url, (response) => {
        response.resume();
        resolve();
      });

      request.on('error', () => {
        if (Date.now() - startedAt > timeoutMs) {
          reject(new Error(`Timed out waiting for ${url}`));
          return;
        }

        setTimeout(check, 250);
      });
    };

    check();
  });
};

let preview;

try {
  await run(nodeCommand, ['./node_modules/vue-tsc/bin/vue-tsc.js', '-b']);
  await run(nodeCommand, ['./node_modules/vite/bin/vite.js', 'build']);

  preview = spawn(nodeCommand, ['./node_modules/vite/bin/vite.js', 'preview', '--host', '0.0.0.0', '--port', '4173'], {
    stdio: 'inherit',
    shell: false,
  });

  await waitForServer('http://127.0.0.1:4173');
  await run(nodeCommand, ['./node_modules/@playwright/test/cli.js', 'test', ...playwrightArgs], {
    env: {
      ...process.env,
      PLAYWRIGHT_SKIP_WEB_SERVER: 'true',
    },
  });
} finally {
  if (preview && !preview.killed) {
    preview.kill();
  }
}
