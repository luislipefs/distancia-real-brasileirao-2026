import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { validateStandings } from '../src/model.js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const out = resolve(root, 'dist');
validateStandings(JSON.parse(await readFile(resolve(root, 'data/standings.json'), 'utf8')));
await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });
await cp(resolve(root, 'index.html'), resolve(out, 'index.html'));
for (const dir of ['src', 'assets', 'data']) await cp(resolve(root, dir), resolve(out, dir), { recursive: true });
await writeFile(resolve(out, '.nojekyll'), '');
console.log(`[build] Site estático validado em ${out}`);

