import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const projectRoot = process.cwd();
const runtimeRoot = path.join(os.tmpdir(), 'dbfapp-next-runtime');

const removablePaths = ['.next', '.next-dev', 'out'];

for (const relativePath of removablePaths) {
  fs.rmSync(path.join(projectRoot, relativePath), { recursive: true, force: true });
}

for (const entry of fs.readdirSync(projectRoot)) {
  if (entry.startsWith('.next-stale-')) {
    fs.rmSync(path.join(projectRoot, entry), { recursive: true, force: true });
  }
}

fs.rmSync(runtimeRoot, { recursive: true, force: true });
