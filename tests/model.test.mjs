import test from 'node:test';
import assert from 'node:assert/strict';
import { distanceBetween, pointRows, validateStandings, zoneForRank, POINT_STEP, safeCrestUrl, FIXED_ZONES } from '../src/model.js';
import { normalizeEspnStandings } from '../scripts/normalize.mjs';

const demoPoints = [58, 54, 51, 47, 47, 43, 42, 39, 39, 37, 34, 34, 32, 31, 29, 27, 27, 23, 21, 17];
const demoIds = [121, 127, 135, 120, 118, 126, 124, 131, 130, 1062, 119, 128, 133, 134, 794, 136, 147, 1198, 7848, 132];
const demo = {
  schemaVersion: 1,
  mode: 'demo',
  season: 2026,
  competition: 'Série A',
  updatedAt: null,
  source: { name: 'Cenário fictício para demonstração', url: null },
  teams: demoPoints.map((points, index) => ({
    id: demoIds[index], name: `Clube ${index + 1}`, rank: index + 1, points,
    played: 27, goalDifference: 0,
    crestUrl: `https://a.espncdn.com/i/teamlogos/soccer/500/${demoIds[index]}.png`
  }))
};

test('todas as linhas inteiras existem entre o líder e o último colocado', () => {
  const rows = pointRows(validateStandings(demo).teams);
  assert.equal(rows.length, 42);
  assert.equal(rows[0].points, 58);
  assert.equal(rows[1].points, 57);
  assert.equal(rows[1].clubs.length, 0);
  assert.equal(rows.at(-1).points, 17);
  assert.equal(rows[4].y - rows[0].y, 4 * POINT_STEP);
});

test('empates compartilham altura, mantendo ordem de desempate separada', () => {
  const rows = pointRows(demo.teams);
  const tied = rows.find(row => row.points === 47);
  assert.deepEqual(tied.clubs.map(team => team.rank), [4, 5]);
  assert.equal(tied.y, (58 - 47) * POINT_STEP);
  assert.equal(distanceBetween(demo.teams[0], demo.teams[1]), 4);
});

test('rejeita tabela incompleta e classificação que contradiz os pontos', () => {
  assert.throws(() => validateStandings({ ...demo, teams: demo.teams.slice(0, 19) }));
  const bad = structuredClone(demo);
  bad.teams[1].points = 60;
  assert.throws(() => validateStandings(bad));
});

test('zonas fixas usam colocação sem alterar a altura de empate', () => {
  assert.deepEqual(FIXED_ZONES, { champion: 1, direct: 4, continental: 5, relegation: 4 });
  assert.equal(zoneForRank(1, 20, FIXED_ZONES), 'champion');
  assert.equal(zoneForRank(4, 20, FIXED_ZONES), 'direct');
  assert.equal(zoneForRank(5, 20, FIXED_ZONES), 'continental');
  assert.equal(zoneForRank(17, 20, FIXED_ZONES), 'relegation');
});

test('normalizador da ESPN preserva classificação, pontos e escudos permitidos', () => {
  const entries = demo.teams.map(team => ({
    team: {
      id: String(team.id),
      shortDisplayName: team.name,
      logos: [{ href: team.crestUrl }]
    },
    stats: [
      { name: 'rank', value: team.rank },
      { name: 'points', value: team.points },
      { name: 'gamesPlayed', value: team.played },
      { name: 'pointDifferential', value: team.goalDifference }
    ]
  }));
  const normalized = normalizeEspnStandings({ children: [{ standings: { season: 2026, entries } }] }, '2026-09-21T12:00:00.000Z');
  assert.equal(normalized.mode, 'live');
  assert.equal(normalized.source.name, 'ESPN');
  assert.equal(normalized.source.references.length, 2);
  assert.equal(normalized.teams.length, 20);
  assert.equal(normalized.teams[0].points, 58);
  assert.match(normalized.teams[0].crestUrl, /a\.espncdn\.com/);
  assert.equal(safeCrestUrl('https://evil.example/football/teams/123.png'), '');
});

test('os vinte clubes da demonstração têm escudos correspondentes no CDN ESPN', () => {
  assert.equal(new Set(demo.teams.map(team => team.id)).size, 20);
  for (const team of demo.teams) {
    assert.equal(safeCrestUrl(team.crestUrl), team.crestUrl);
  }
});


