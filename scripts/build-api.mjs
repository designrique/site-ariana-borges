import { mkdir, readdir, rm } from 'node:fs/promises';
import path from 'node:path';
import { build } from 'esbuild';

const root = process.cwd();
const apiDir = path.join(root, 'api');
const outDir = path.join(root, '.server', 'api');
const entries = (await readdir(apiDir))
  .filter((file) => file.endsWith('.ts') && !file.startsWith('_'))
  .map((file) => path.join(apiDir, file));

await rm(outDir, { recursive: true, force: true });
await mkdir(outDir, { recursive: true });

await build({
  entryPoints: entries,
  outdir: outDir,
  bundle: true,
  platform: 'node',
  target: 'node20',
  format: 'esm',
  sourcemap: false,
  logLevel: 'info',
});
