import { createServer } from 'node:http';
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, 'dist');
const apiDir = path.join(__dirname, '.server', 'api');
const port = Number(process.env.PORT || 8080);

const hostHome = new Map([
  ['encontrodeusas.arianaborges.com', 'encontrodeusas.html'],
  ['clubelivromulhermaravilha.arianaborges.com', 'clubelivromulhermaravilha.html'],
  ['dedomagnetico.arianaborges.com', 'dedomagnetico.html'],
]);

const rewrites = new Map([
  ['/dedo-magnetico', 'dedomagnetico.html'],
  ['/dedomagnetico', 'dedomagnetico.html'],
  ['/kundalini-natal', 'kundalininatal.html'],
  ['/kundalininatal', 'kundalininatal.html'],
  ['/terca-do-reiki', 'tercadoreiki.html'],
  ['/tercadoreiki', 'tercadoreiki.html'],
]);

const types = new Map([
  ['.html', 'text/html; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.css', 'text/css; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.svg', 'image/svg+xml'],
  ['.png', 'image/png'],
  ['.jpg', 'image/jpeg'],
  ['.jpeg', 'image/jpeg'],
  ['.webp', 'image/webp'],
  ['.ico', 'image/x-icon'],
]);

function cleanPath(url) {
  const pathname = decodeURIComponent(new URL(url, 'http://x').pathname);
  return pathname.endsWith('/') && pathname !== '/' ? pathname.slice(0, -1) : pathname;
}

async function body(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const text = Buffer.concat(chunks).toString('utf8');
  if (!text) return undefined;
  const contentType = req.headers['content-type'] || '';
  if (contentType.includes('application/json')) {
    try { return JSON.parse(text); } catch { return text; }
  }
  return text;
}

function apiResponse(res) {
  return {
    statusCode: 200,
    headers: {},
    status(code) { this.statusCode = code; return this; },
    setHeader(key, value) { this.headers[key] = value; return this; },
    json(data) {
      res.writeHead(this.statusCode, { 'content-type': 'application/json; charset=utf-8', ...this.headers });
      res.end(JSON.stringify(data));
    },
    send(data) {
      const payload = typeof data === 'string' || Buffer.isBuffer(data) ? data : JSON.stringify(data);
      res.writeHead(this.statusCode, this.headers);
      res.end(payload);
    },
    end(data = '') { res.writeHead(this.statusCode, this.headers); res.end(data); },
  };
}

async function handleApi(req, res, pathname) {
  const name = pathname === '/webhook-infinitepay'
    ? 'webhook-infinitepay'
    : pathname.replace(/^\/api\//, '').split('/')[0];
  const file = path.join(apiDir, `${name}.js`);
  try {
    await stat(file);
  } catch {
    res.writeHead(404, { 'content-type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ error: 'Not Found' }));
    return;
  }
  const mod = await import(`${pathToFileURL(file).href}?t=${Date.now()}`);
  const reqLike = {
    method: req.method,
    url: `http://${req.headers.host || 'localhost'}${req.url}`,
    headers: req.headers,
    body: await body(req),
    query: Object.fromEntries(new URL(req.url, 'http://x').searchParams),
  };
  await mod.default(reqLike, apiResponse(res));
}

async function sendFile(res, file) {
  const full = path.normalize(path.join(distDir, file));
  if (!full.startsWith(distDir)) throw new Error('bad path');
  const info = await stat(full);
  if (!info.isFile()) throw new Error('not file');
  res.writeHead(200, { 'content-type': types.get(path.extname(full)) || 'application/octet-stream' });
  createReadStream(full).pipe(res);
}

createServer(async (req, res) => {
  try {
    const pathname = cleanPath(req.url || '/');
    if (pathname.startsWith('/api/') || pathname === '/webhook-infinitepay') return await handleApi(req, res, pathname);

    if (pathname === '/') {
      const host = String(req.headers.host || '').split(':')[0].toLowerCase();
      return await sendFile(res, hostHome.get(host) || 'index.html');
    }

    if (rewrites.has(pathname)) return await sendFile(res, rewrites.get(pathname));

    try { return await sendFile(res, pathname.slice(1)); }
    catch { return await sendFile(res, 'index.html'); }
  } catch (error) {
    console.error(error);
    res.writeHead(500, { 'content-type': 'text/plain; charset=utf-8' });
    res.end('Internal Server Error');
  }
}).listen(port, () => console.log(`Ariana Borges site listening on ${port}`));
