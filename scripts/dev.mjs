// Local server: serves the repo as static files and runs /api/* functions,
// the same way Vercel does. Reads secrets from .env.
// Usage: node scripts/dev.mjs   (PORT defaults to 4321)
import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const port = Number(process.env.PORT) || 4321;

const envFile = path.join(root, '.env');
if (existsSync(envFile)) {
  for (const line of readFileSync(envFile, 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !(m[1] in process.env)) process.env[m[1]] = m[2].replace(/^['"]|['"]$/g, '');
  }
}

const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.webp': 'image/webp', '.ico': 'image/x-icon', '.md': 'text/plain; charset=utf-8', '.woff2': 'font/woff2' };

http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  try {
    const api = url.pathname.match(/^\/api\/([a-z0-9-]+)\/?$/i);
    if (api) {
      const file = path.join(root, 'api', `${api[1]}.js`);
      if (!existsSync(file)) { res.statusCode = 404; return res.end('Not found'); }
      const mod = await import(`${pathToFileURL(file).href}?t=${Date.now()}`);
      return await mod.default(req, res);
    }
    let file = path.join(root, decodeURIComponent(url.pathname));
    if (!file.startsWith(root)) { res.statusCode = 403; return res.end(); }
    if ((await stat(file).catch(() => null))?.isDirectory()) file = path.join(file, 'index.html');
    const body = await readFile(file);
    res.setHeader('Content-Type', types[path.extname(file).toLowerCase()] || 'application/octet-stream');
    res.setHeader('Cache-Control', 'no-store');
    res.end(body);
  } catch (err) {
    if (err.code === 'ENOENT') { res.statusCode = 404; return res.end('Not found'); }
    console.error(err);
    if (!res.headersSent) { res.statusCode = 500; res.end('Server error'); }
  }
}).listen(port, () => console.log(`Listo en http://localhost:${port}`));
