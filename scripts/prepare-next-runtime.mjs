import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const requestedName = process.argv[2];

if (!requestedName || !requestedName.startsWith('.next')) {
  console.error('Usage: node scripts/prepare-next-runtime.mjs .next|.next-dev');
  process.exit(1);
}

const projectRoot = process.cwd();
const linkPath = path.join(projectRoot, requestedName);
const runtimeRoot = path.join(os.tmpdir(), 'dbfapp-next-runtime');
const targetPath = path.join(runtimeRoot, requestedName);

fs.mkdirSync(runtimeRoot, { recursive: true });
fs.mkdirSync(targetPath, { recursive: true });

try {
  const existing = fs.lstatSync(linkPath);
  if (existing.isSymbolicLink()) {
    const currentTarget = fs.readlinkSync(linkPath);
    const resolvedTarget = path.resolve(path.dirname(linkPath), currentTarget);
    if (resolvedTarget === targetPath) {
      process.exit(0);
    }
  }

  fs.rmSync(linkPath, { recursive: true, force: true });
} catch (error) {
  if (error.code !== 'ENOENT') {
    throw error;
  }
}

const linkType = process.platform === 'win32' ? 'junction' : 'dir';
fs.symlinkSync(targetPath, linkPath, linkType);
