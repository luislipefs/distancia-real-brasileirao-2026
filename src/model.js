export const POINT_STEP = 48;
export const FIXED_ZONES = Object.freeze({ champion: 1, direct: 4, continental: 5, relegation: 4 });

export function validateStandings(data) {
  if (!data || data.schemaVersion !== 1 || data.season !== 2026 || !['demo', 'live'].includes(data.mode)) throw new Error('Metadados da classificação inválidos.');
  if (!Array.isArray(data.teams) || data.teams.length !== 20) throw new Error('A Série A precisa conter exatamente 20 clubes.');
  const ids = new Set();
  const ranks = new Set();
  for (const team of data.teams) {
    if (!Number.isInteger(team.id) || ids.has(team.id)) throw new Error('Identificador de clube inválido ou duplicado.');
    if (!Number.isInteger(team.rank) || team.rank < 1 || team.rank > 20 || ranks.has(team.rank)) throw new Error('Posição inválida ou duplicada.');
    if (typeof team.name !== 'string' || !team.name.trim() || !Number.isInteger(team.points) || team.points < 0 || team.points > 114) throw new Error('Nome ou pontuação inválidos.');
    if (!Number.isInteger(team.played) || team.played < 0 || team.played > 38) throw new Error('Jogos inválidos.');
    ids.add(team.id); ranks.add(team.rank);
  }
  const ordered = [...data.teams].sort((a, b) => a.rank - b.rank);
  for (let i = 1; i < ordered.length; i++) if (ordered[i].points > ordered[i - 1].points) throw new Error('Posições incompatíveis com os pontos.');
  return data;
}

export function pointRows(teams) {
  const byPoints = new Map();
  for (const team of teams) {
    if (!byPoints.has(team.points)) byPoints.set(team.points, []);
    byPoints.get(team.points).push(team);
  }
  const max = Math.max(...teams.map(team => team.points));
  const min = Math.min(...teams.map(team => team.points));
  return Array.from({ length: max - min + 1 }, (_, i) => {
    const points = max - i;
    return { points, clubs: (byPoints.get(points) || []).sort((a, b) => a.rank - b.rank), y: i * POINT_STEP };
  });
}

export function distanceBetween(a, b) { return a.points - b.points; }

export function zoneForRank(rank, total, zones) {
  const champion = Math.max(0, Math.min(total, Number(zones.champion ?? FIXED_ZONES.champion) || 0));
  const direct = Math.max(0, Math.min(total, Number(zones.direct) || 0));
  const continental = Math.max(direct, Math.min(total, Number(zones.continental) || 0));
  const relegation = Math.max(0, Math.min(total, Number(zones.relegation) || 0));
  if (rank <= champion) return 'champion';
  if (rank <= direct) return 'direct';
  if (rank <= continental) return 'continental';
  if (rank > total - relegation) return 'relegation';
  return 'neutral';
}

export function safeCrestUrl(value) {
  if (typeof value !== 'string') return '';
  try {
    const url = new URL(value);
    const espn = url.hostname === 'a.espncdn.com' && /^\/i\/teamlogos\/soccer\/500\/\d+\.png$/.test(url.pathname);
    return url.protocol === 'https:' && espn ? url.href : '';
  } catch { return ''; }
}

