import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import sharp from 'sharp';
import ts from 'typescript';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const source = await fs.readFile('data/portfolio.ts', 'utf8');
const data = { exports: {} };
new Function('module', 'exports', 'require', ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText)(data, data.exports, require);
const sources = new Set(data.exports.PROJECTS.map(project => project.thumbnail));
const featured = await fs.readFile('components/home/FeaturedProjects.tsx', 'utf8');
for (const match of featured.matchAll(/thumbnail:\s*"([^"]+)"/g)) sources.add(match[1]);
await fs.mkdir('public/images/thumbnails', { recursive: true });
const manifest = {};
for (const src of sources) {
  if (!src.startsWith('/')) continue;
  const input = path.join('public', src);
  const hash = createHash('sha256').update(await fs.readFile(input)).digest('hex').slice(0, 12);
  const variants = {};
  for (const width of [480, 960, 1440]) {
    const output = `/images/thumbnails/${hash}-${width}.webp`;
    const result = await sharp(input).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 80 }).toFile(path.join('public', output));
    variants[result.width] = output;
  }
  const blur = await sharp(input).rotate().resize({ width: 20 }).webp({ quality: 40 }).toBuffer();
  manifest[src] = { variants, blur: `data:image/webp;base64,${blur.toString('base64')}` };
}
await fs.writeFile('lib/thumbnail-manifest.json', JSON.stringify(manifest, null, 2) + '\n');
console.log(`Generated ${Object.keys(manifest).length} thumbnail sets.`);
