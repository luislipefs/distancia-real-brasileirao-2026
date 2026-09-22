import { validateStandings, safeCrestUrl } from '../src/model.js';

export function normalizeEspnStandings(payload, updatedAt) {
  const group = payload?.children?.find(item => item?.standings?.season === 2026);
  const entries = group?.standings?.entries;
  if (!Array.isArray(entries)) throw new Error('Estrutura da classificação alternativa inesperada.');
  const stat = (entry, name) => entry?.stats?.find(item => item?.name === name)?.value;
  const teams = entries.map(entry => ({
    id: Number(entry?.team?.id),
    name: entry?.team?.shortDisplayName || entry?.team?.displayName,
    rank: stat(entry, 'rank'),
    points: stat(entry, 'points'),
    played: stat(entry, 'gamesPlayed'),
    goalDifference: stat(entry, 'pointDifferential'),
    crestUrl: safeCrestUrl(entry?.team?.logos?.[0]?.href)
  }));
  return validateStandings({
    schemaVersion: 1,
    mode: 'live',
    season: 2026,
    competition: 'Série A',
    updatedAt,
    source: {
      name: 'ESPN',
      url: 'https://www.espn.com.br/futebol/classificacao/_/liga/bra.1',
      references: [
        { name: 'CBF', url: 'https://www.cbf.com.br/futebol-brasileiro/tabelas/campeonato-brasileiro/serie-a' },
        { name: 'ge', url: 'https://ge.globo.com/futebol/brasileirao-serie-a/' }
      ]
    },
    teams
  });
}

