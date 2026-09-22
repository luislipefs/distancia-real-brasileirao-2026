import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { normalizeEspnStandings } from './normalize.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const standingsPath = resolve(root, 'data/standings.json');
const statusPath = resolve(root, 'data/status.json');
const timestamp = new Date().toISOString();
const espnUrl = 'https://site.api.espn.com/apis/v2/sports/soccer/bra.1/standings?season=2026';

async function saveStatus(state, message) {
  await writeFile(statusPath, JSON.stringify({ state, attemptedAt: timestamp, message }, null, 2) + '\n');
}

async function espnGet() {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15000);
  try {
    const response = await fetch(espnUrl, { signal: controller.signal });
    if (!response.ok) throw new Error(`A fonte alternativa respondeu HTTP ${response.status}.`);
    return await response.json();
  } finally { clearTimeout(timer); }
}

async function updateFromEspn() {
  const raw = await espnGet();
  return normalizeEspnStandings(raw, timestamp);
}

try {
  const next = await updateFromEspn();
  await writeFile(standingsPath, JSON.stringify(next, null, 2) + '\n');
  await saveStatus('ok', `Classificação validada e atualizada via ${next.source.name}.`);
  console.log(`[standings] Classificação atualizada via ${next.source.name}: ${next.teams.length} clubes, ${timestamp}.`);
} catch (error) {
  const message = error instanceof Error ? error.message : 'Falha desconhecida.';
  await saveStatus('error', `Atualização falhou. Último dado válido preservado. ${message}`);
  console.error(`[standings] ${message} Último dado válido preservado.`);
  if (process.env.GITHUB_ACTIONS === 'true') console.log(`::warning::Atualização da classificação falhou: ${message}`);
}

