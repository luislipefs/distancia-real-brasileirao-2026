import { FIXED_ZONES, POINT_STEP, distanceBetween, pointRows, validateStandings, zoneForRank } from './model.js?v=20260922-5';
import { crest, el, formatDate } from './components.js?v=20260922-5';
import { LANGUAGES, SUPPORTED_LANGUAGES, formatPoints, ordinal, t } from './i18n.js?v=20260922-6';

const app = document.querySelector('#app');
const storage = {
  get(key, fallback) { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } },
  set(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); } catch {} }
};

const browserLanguage = navigator.language?.slice(0, 2).toLowerCase();
const state = {
  data: null,
  status: null,
  selectedId: null,
  view: storage.get('dr-view', 'distance'),
  language: storage.get('dr-language', SUPPORTED_LANGUAGES.includes(browserLanguage) ? browserLanguage : 'pt'),
  theme: storage.get('dr-theme', matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'),
  zones: { ...FIXED_ZONES, ...(new URLSearchParams(location.search).get('config') === '1' ? storage.get('dr-zones', {}) : {}) },
  showZoneConfig: new URLSearchParams(location.search).get('config') === '1',
  browserCache: false
};

if (!['distance', 'table'].includes(state.view)) state.view = 'distance';
if (!['light', 'dark'].includes(state.theme)) state.theme = 'dark';
if (!SUPPORTED_LANGUAGES.includes(state.language)) state.language = 'pt';
document.documentElement.dataset.theme = state.theme;

async function load() {
  try {
    const [dataResponse, statusResponse] = await Promise.all([
      fetch('./data/standings.json', { cache: 'no-store' }),
      fetch('./data/status.json', { cache: 'no-store' })
    ]);
    if (!dataResponse.ok || !statusResponse.ok) throw new Error('Standings unavailable.');
    state.data = validateStandings(await dataResponse.json());
    state.data.teams.sort((a, b) => a.rank - b.rank);
    state.status = await statusResponse.json();
    if (state.data.mode === 'live') storage.set('dr-last-live', state.data);
  } catch {
    const cached = storage.get('dr-last-live', null);
    try {
      state.data = validateStandings(cached);
      state.data.teams.sort((a, b) => a.rank - b.rank);
      state.browserCache = true;
      state.status = { state: 'error' };
    } catch {
      app.innerHTML = `<main class="load-error"><h1>${t(state.language, 'loadErrorTitle')}</h1><p>${t(state.language, 'loadErrorText')}</p><button type="button" id="retry">${t(state.language, 'retry')}</button></main>`;
      app.querySelector('#retry').addEventListener('click', () => location.reload());
      return;
    }
  }
  state.selectedId = state.data.teams[0].id;
  render();
}

function selected() { return state.data.teams.find(team => team.id === state.selectedId) || state.data.teams[0]; }
function pointDistance(count) { return t(state.language, count === 1 ? 'onePointDistance' : 'pointsDistance', { count }); }

function statusText() {
  if (state.data.mode === 'demo') return t(state.language, 'demoTitle');
  if (state.browserCache) return t(state.language, 'browserCacheTitle');
  if (state.status?.state === 'error' || state.status?.state === 'warning') return t(state.language, 'sourceUnavailableTitle');
  const age = Date.now() - Date.parse(state.data.updatedAt);
  if (!Number.isFinite(age) || age > 3 * 60 * 60 * 1000) return t(state.language, 'liveStale');
  return t(state.language, 'liveValid');
}

function languageOptions() {
  return SUPPORTED_LANGUAGES.map(code => {
    const language = LANGUAGES[code];
    return `<option value="${code}"${code === state.language ? ' selected' : ''}>${language.flag} ${language.short} · ${language.label}</option>`;
  }).join('');
}

function shell() {
  const currentLanguage = LANGUAGES[state.language];
  const themeLabel = t(state.language, state.theme === 'dark' ? 'themeDark' : 'themeLight');
  const themeIcon = state.theme === 'dark' ? '☾' : '☀';
  app.innerHTML = `
    <div class="site-shell">
      <header class="topbar">
        <a class="brand" href="#top" aria-label="${t(state.language, 'brandLabel')}"><span class="brand-mark" aria-hidden="true"><i></i><i></i><i></i></span><span>DISTÂNCIA<span class="brand-accent"> REAL</span></span></a>
        <div class="topbar-right">
          <span class="season-tag">${t(state.language, 'season')}</span>
          <label class="header-control language-control" aria-label="${t(state.language, 'language')}"><span id="language-flag" class="control-icon" aria-hidden="true">${currentLanguage.flag}</span><select id="language-select">${languageOptions()}</select><span class="select-chevron" aria-hidden="true">⌄</span></label>
          <button id="theme-toggle" class="header-control theme-control" type="button" aria-label="${t(state.language, 'toggleTheme')}" aria-pressed="${state.theme === 'dark'}"><span class="control-icon theme-icon" aria-hidden="true">${themeIcon}</span><span class="control-label">${themeLabel}</span><span class="theme-switch" aria-hidden="true"><i></i></span></button>
        </div>
      </header>
      <main id="top">
        <section class="intro" aria-labelledby="page-title">
          <div class="intro-main"><p class="competition-kicker">${t(state.language, 'competitionOfficial')}</p><p class="eyebrow"><span class="eyebrow-rule"></span>${t(state.language, 'eyebrow')}</p><h1 id="page-title">${t(state.language, 'titleLead')}<br><em>${t(state.language, 'titleEm')}</em></h1><p class="lead">${t(state.language, 'lead')}</p></div>
          <div class="intro-aside" aria-hidden="true"><span class="formula-num">01</span><span class="formula-line"></span><span class="formula-label">${t(state.language, 'point')}</span><span class="formula-equals">=</span><span class="formula-num">01</span><span class="formula-line"></span><span class="formula-label">${t(state.language, 'line')}</span></div>
        </section>
        <section class="status-strip" aria-label="${t(state.language, 'dataStatus')}"><div class="status-main"><span id="status-dot" class="status-dot"></span><strong id="status-title"></strong><span id="status-time"></span></div><span id="status-detail"></span></section>
        <section class="overview" aria-label="${t(state.language, 'distanceSummary')}">
          <div class="overview-item"><span class="overview-label">${t(state.language, 'leader')}</span><div id="leader-identity" class="overview-team"><span id="leader-crest" class="overview-crest"></span><strong id="leader-name"></strong></div><span id="leader-points"></span></div>
          <div class="overview-item"><span class="overview-label overview-label-with-crest">${t(state.language, 'leadOverSecond')} <span id="second-crest" class="overview-inline-crest"></span></span><strong id="leader-gap"></strong><span>${pointDistance(2).replace(/^2\s*/, '')}</span></div>
          <div class="overview-item"><span class="overview-label">${t(state.language, 'firstToLast')}</span><strong id="total-spread"></strong><span>${pointDistance(2).replace(/^2\s*/, '')}</span></div>
          <div class="overview-item tie-points"><span class="overview-label">${t(state.language, 'tiedPoints')}</span><strong id="ties-points"></strong><span id="ties-summary"></span></div>
        </section>
        <section id="visualizacao" class="workspace" aria-labelledby="viz-title">
          <div class="workspace-head"><div><p class="section-index">${t(state.language, 'visualizationIndex')}</p><h2 id="viz-title">${t(state.language, 'vizTitle')}</h2><p class="workspace-sub">${t(state.language, 'vizLead')}</p></div><div class="view-switch" role="group" aria-label="${t(state.language, 'viewMode')}"><button id="distance-tab" type="button">${t(state.language, 'distanceView')}</button><button id="table-tab" type="button">${t(state.language, 'tableView')}</button></div></div>
          <div class="legend"><span><i class="legend-swatch champion"></i>${t(state.language, 'champion')}</span><span><i class="legend-swatch direct"></i>${t(state.language, 'directLibertadores')}</span><span><i class="legend-swatch continental"></i>${t(state.language, 'preLibertadores')}</span><span><i class="legend-swatch relegation"></i>${t(state.language, 'relegation')}</span><span class="legend-note">${t(state.language, 'fixedBands')}</span></div>
          <div class="workspace-grid"><div class="chart-card"><div class="chart-head"><span id="chart-caption"></span><span>${t(state.language, 'fixedScale', { step: POINT_STEP })}</span></div><div id="chart-content"></div></div><aside class="side-panel"><div class="side-inner"><p class="side-eyebrow">${t(state.language, 'clubFocus')}</p><div id="selected-detail"></div><div class="zone-settings"><div class="zone-title"><h3>${t(state.language, 'zoneSettings')}</h3><span>${t(state.language, 'adjustable')}</span></div><label>${t(state.language, 'topBand')} <select id="direct-count"></select></label><label>${t(state.language, 'middleBand')} <select id="continental-count"></select></label><label>${t(state.language, 'bottomBand')} <select id="relegation-count"></select></label><p id="zone-explanation"></p></div></div></aside></div>
        </section>
      </main>
      <footer class="footer"><div><strong>DISTÂNCIA REAL</strong><p>${t(state.language, 'footerTagline')}</p></div><div><span id="source-link"></span><p>${t(state.language, 'independence')}</p></div></footer>
    </div>`;
}

function renderStatus() {
  const isDemo = state.data.mode === 'demo';
  app.querySelector('#status-dot').classList.toggle('is-demo', isDemo);
  app.querySelector('#status-title').textContent = statusText();
  app.querySelector('#status-time').textContent = isDemo ? t(state.language, 'demoTime') : formatDate(state.data.updatedAt, state.language);
  app.querySelector('#status-detail').textContent = isDemo ? t(state.language, 'demoDetail') : t(state.language, 'updatedVia', { source: state.data.source?.name || 'ESPN' });
  const source = app.querySelector('#source-link');
  source.replaceChildren(el('span', 'source-label', t(state.language, 'sources')));
  const links = [{ name: state.data.source?.name || 'ESPN', url: state.data.source?.url }, ...(state.data.source?.references || [])].filter(item => item?.url);
  links.forEach((item, index) => { if (index) source.append(document.createTextNode(' · ')); const link = el('a', '', item.name); link.href = item.url; link.target = '_blank'; link.rel = 'noopener noreferrer'; source.append(link); });
}

function renderOverview() {
  const teams = [...state.data.teams].sort((a, b) => a.rank - b.rank);
  const leaderCrest = app.querySelector('#leader-crest'); leaderCrest.replaceChildren(crest(teams[0])); leaderCrest.setAttribute('aria-label', teams[0].name); leaderCrest.title = teams[0].name;
  app.querySelector('#leader-name').textContent = teams[0].name;
  app.querySelector('#leader-points').textContent = formatPoints(state.language, teams[0].points);
  const runnerUp = teams[1];
  const secondCrest = app.querySelector('#second-crest'); secondCrest.replaceChildren(crest(runnerUp)); secondCrest.setAttribute('aria-label', runnerUp.name); secondCrest.title = runnerUp.name;
  app.querySelector('#leader-gap').textContent = String(teams[0].points - runnerUp.points).padStart(2, '0');
  app.querySelector('#total-spread').textContent = String(teams[0].points - teams.at(-1).points).padStart(2, '0');
  const counts = new Map();
  teams.forEach(team => counts.set(team.points, (counts.get(team.points) || 0) + 1));
  const ties = [...counts.entries()].filter(([, count]) => count > 1).sort((a, b) => b[0] - a[0]);
  const tiedClubs = ties.reduce((sum, [, count]) => sum + count, 0);
  app.querySelector('#ties-points').textContent = ties.length ? ties.map(([points]) => points).join(' · ') : '—';
  app.querySelector('#ties-summary').textContent = ties.length ? t(state.language, 'tieSummary', { clubs: tiedClubs, groups: ties.length }) : t(state.language, 'noTies');
}

function closePointGroups(teams, maxSpread = 4) {
  const groups = [];
  let group = [];
  for (const team of [...teams].sort((a, b) => a.rank - b.rank)) {
    if (group.length && group[0].points - team.points > maxSpread) {
      if (group.length > 1) groups.push(group);
      group = [];
    }
    group.push(team);
  }
  if (group.length > 1) groups.push(group);
  return groups;
}

function renderChart() {
  const content = app.querySelector('#chart-content'); content.replaceChildren();
  const current = selected();
  app.querySelector('#chart-caption').textContent = state.view === 'distance' ? t(state.language, 'pointsClubs') : t(state.language, 'tableCaption');
  app.querySelector('#distance-tab').setAttribute('aria-pressed', String(state.view === 'distance'));
  app.querySelector('#table-tab').setAttribute('aria-pressed', String(state.view === 'table'));
  content.className = 'chart-content-enter';
  if (state.view === 'table') return renderTable(content);
  const teams = [...state.data.teams].sort((a, b) => a.rank - b.rank);
  const maxPoints = teams[0].points;
  const minPoints = teams.at(-1).points;
  const pointSpan = maxPoints - minPoints;
  const plotHeight = pointSpan * POINT_STEP + POINT_STEP;
  const baseY = pointSpan * POINT_STEP + POINT_STEP / 2;
  const groups = closePointGroups(teams);
  const scroll = el('div', 'chart-scroll'); scroll.tabIndex = 0; scroll.setAttribute('aria-label', t(state.language, 'chartAria'));

  const insights = el('div', 'profile-insights');
  insights.append(el('span', 'profile-insights-title', t(state.language, 'closeGroups')));
  const groupList = el('div', 'profile-group-list');
  groups.forEach(group => groupList.append(el('span', 'profile-group-chip', t(state.language, 'closeGroupRange', {
    clubs: group.length,
    high: group[0].points,
    low: group.at(-1).points
  }))));
  if (!groups.length) groupList.append(el('span', 'profile-group-empty', t(state.language, 'noTies')));
  insights.append(groupList);

  const chart = el('div', 'score-profile');
  chart.style.setProperty('--point-step', `${POINT_STEP}px`);
  chart.style.setProperty('--team-count', String(teams.length));
  chart.style.setProperty('--profile-height', `${plotHeight}px`);

  const board = el('div', 'score-board');
  board.style.setProperty('--team-count', String(teams.length));
  const axis = el('div', 'score-axis');
  axis.setAttribute('aria-hidden', 'true');
  const field = el('div', 'score-field');
  field.style.height = `${plotHeight}px`;
  field.setAttribute('role', 'group');
  field.setAttribute('aria-label', t(state.language, 'chartAria'));
  const labels = el('div', 'score-team-labels');
  labels.style.gridTemplateColumns = `repeat(${teams.length}, minmax(0, 1fr))`;

  const rows = pointRows(teams);
  rows.forEach((row, index) => {
    const y = index * POINT_STEP + POINT_STEP / 2;
    const guide = el('span', `score-guide${row.points % 5 === 0 ? ' is-major' : ''}${row.clubs.length ? ' is-occupied' : ''}`);
    guide.style.top = `${y}px`;
    field.append(guide);
    if (row.points % 5 === 0 || row.clubs.length || row.points === minPoints) {
      const label = el('span', `score-axis-value${row.clubs.length ? ' is-occupied' : ''}`, String(row.points));
      label.style.top = `${y}px`;
      axis.append(label);
    }
  });

  for (const group of groups) {
    const firstIndex = teams.findIndex(team => team.id === group[0].id);
    const highY = (maxPoints - group[0].points) * POINT_STEP + POINT_STEP / 2;
    const lowY = (maxPoints - group.at(-1).points) * POINT_STEP + POINT_STEP / 2;
    const band = el('span', 'score-cluster-band');
    band.style.left = `${(firstIndex / teams.length) * 100}%`;
    band.style.width = `${(group.length / teams.length) * 100}%`;
    band.style.top = `${Math.max(0, highY - 17)}px`;
    band.style.height = `${Math.max(34, lowY - highY + 34)}px`;
    field.append(band);
  }

  teams.forEach((team, index) => {
    const zone = `zone-${zoneForRank(team.rank, teams.length, state.zones)}`;
    const top = (maxPoints - team.points) * POINT_STEP + POINT_STEP / 2;
    const lane = el('span', `score-lane ${zone}`);
    lane.style.left = `${(index / teams.length) * 100}%`;
    lane.style.width = `${100 / teams.length}%`;
    field.append(lane);
    const bar = el('span', `score-value-bar ${zone}`);
    bar.style.left = `${((index + .5) / teams.length) * 100}%`;
    bar.style.top = `${top}px`;
    bar.style.height = `${Math.max(2, baseY - top)}px`;
    field.append(bar);
    if (index > 0) {
      const columnRule = el('span', 'score-column-rule');
      columnRule.style.left = `${(index / teams.length) * 100}%`;
      field.append(columnRule);
    }
  });

  const svgNS = 'http://www.w3.org/2000/svg';
  const lineSvg = document.createElementNS(svgNS, 'svg');
  lineSvg.classList.add('score-profile-line');
  lineSvg.setAttribute('viewBox', `0 0 1000 ${plotHeight}`);
  lineSvg.setAttribute('preserveAspectRatio', 'none');
  lineSvg.setAttribute('aria-hidden', 'true');
  const path = document.createElementNS(svgNS, 'path');
  const linePoints = teams.map((team, index) => {
    const x = ((index + .5) / teams.length) * 1000;
    const y = (maxPoints - team.points) * POINT_STEP + POINT_STEP / 2;
    return `${index ? 'L' : 'M'} ${x} ${y}`;
  }).join(' ');
  path.setAttribute('d', linePoints);
  path.setAttribute('fill', 'none');
  path.setAttribute('vector-effect', 'non-scaling-stroke');
  lineSvg.append(path);
  field.append(lineSvg);

  teams.forEach((team, index) => {
    const top = (maxPoints - team.points) * POINT_STEP + POINT_STEP / 2;
    const marker = el('button', `score-marker zone-${zoneForRank(team.rank, teams.length, state.zones)}${team.id === current.id ? ' is-selected' : ''}`);
    marker.type = 'button';
    marker.dataset.teamId = String(team.id);
    marker.style.setProperty('--team-order', String(index));
    marker.style.left = `${((index + .5) / teams.length) * 100}%`;
    marker.style.top = `${top}px`;
    marker.setAttribute('aria-pressed', String(team.id === current.id));
    marker.setAttribute('aria-label', `${ordinal(state.language, team.rank)} ${team.name}, ${formatPoints(state.language, team.points)}`);
    marker.title = `${team.name} · ${formatPoints(state.language, team.points)}`;
    const teamCrest = crest(team);
    teamCrest.setAttribute('aria-hidden', 'true');
    marker.append(teamCrest, el('span', 'score-marker-rank', String(team.rank).padStart(2, '0')));
    marker.addEventListener('click', () => {
      state.selectedId = team.id;
      renderChart();
      renderSelected();
      app.querySelector(`.score-marker[data-team-id="${team.id}"]`)?.focus({ preventScroll: true });
    });
    field.append(marker);

    const label = el('div', 'score-team-label');
    const rankLabel = el('span', 'score-team-rank', String(team.rank).padStart(2, '0'));
    const nameLabel = el('span', 'score-team-name', team.name);
    nameLabel.title = team.name;
    label.append(rankLabel, nameLabel);
    labels.append(label);
  });

  for (let index = 1; index < teams.length; index++) {
    const gap = teams[index - 1].points - teams[index].points;
    if (gap < 5) continue;
    const y1 = (maxPoints - teams[index - 1].points) * POINT_STEP + POINT_STEP / 2;
    const y2 = (maxPoints - teams[index].points) * POINT_STEP + POINT_STEP / 2;
    const label = el('span', 'score-gap-label', pointDistance(gap));
    label.style.left = `${(index / teams.length) * 100}%`;
    label.style.top = `${(y1 + y2) / 2}px`;
    label.setAttribute('aria-label', pointDistance(gap));
    field.append(label);
  }

  const baseNote = el('p', 'profile-baseline-note', t(state.language, 'profileBase', { points: minPoints }));
  board.append(axis, field, labels, baseNote);
  chart.append(board);
  scroll.append(chart);
  content.append(insights, scroll, el('p', 'chart-footnote', t(state.language, 'chartNote')));
}

function renderTable(content) {
  const scroll = el('div', 'table-scroll'); scroll.tabIndex = 0; scroll.setAttribute('aria-label', t(state.language, 'tableAria'));
  const table = el('table', 'standings-table');
  const thead = el('thead'); const header = el('tr');
  for (const label of ['position', 'club', 'points', 'played', 'goalDifference', 'distanceLeader']) header.append(el('th', '', t(state.language, label)));
  thead.append(header); table.append(thead);
  const tbody = el('tbody'); const leader = state.data.teams[0];
  for (const team of [...state.data.teams].sort((a, b) => a.rank - b.rank)) {
    const tr = el('tr', `table-row zone-${zoneForRank(team.rank, 20, state.zones)}${team.id === state.selectedId ? ' is-selected' : ''}`);
    const rank = el('td', '', String(team.rank).padStart(2, '0')); rank.setAttribute('data-label', t(state.language, 'position'));
    const name = el('td', 'table-club'); name.setAttribute('data-label', t(state.language, 'club'));
    const button = el('button', 'table-club-button'); button.type = 'button'; button.setAttribute('aria-pressed', String(team.id === state.selectedId)); button.append(crest(team), el('span', '', team.name)); button.dataset.teamId = String(team.id);
    button.addEventListener('click', () => { state.selectedId = team.id; renderChart(); renderSelected(); app.querySelector(`.table-club-button[data-team-id="${team.id}"]`)?.focus({ preventScroll: true }); }); name.append(button);
    const points = el('td', 'table-points', String(team.points)); points.setAttribute('data-label', t(state.language, 'points'));
    const played = el('td', '', String(team.played)); played.setAttribute('data-label', t(state.language, 'played'));
    const gd = el('td', '', team.goalDifference == null ? '—' : String(team.goalDifference)); gd.setAttribute('data-label', t(state.language, 'goalDifference'));
    const gap = el('td', '', formatPoints(state.language, distanceBetween(leader, team))); gap.setAttribute('data-label', t(state.language, 'distanceLeader'));
    tr.append(rank, name, points, played, gd, gap); tbody.append(tr);
  }
  table.append(tbody); scroll.append(table); content.append(scroll);
}

function renderSelected() {
  const current = selected(); const leader = state.data.teams[0];
  const above = [...state.data.teams].filter(team => team.points > current.points).sort((a, b) => a.points - b.points)[0];
  const below = [...state.data.teams].filter(team => team.points < current.points).sort((a, b) => b.points - a.points)[0];
  const holder = app.querySelector('#selected-detail'); holder.replaceChildren();
  const identity = el('div', 'selected-identity'); identity.append(crest(current), el('div', 'selected-name', current.name));
  const position = el('div', 'selected-position'); position.append(el('strong', '', ordinal(state.language, current.rank)), el('span', '', t(state.language, 'inTable')));
  const points = el('div', 'selected-points'); points.append(el('strong', '', String(current.points)), el('span', '', t(state.language, 'points').toUpperCase()));
  const comparison = el('div', 'comparisons');
  for (const [label, team] of [[t(state.language, 'fromLeader'), leader], [t(state.language, 'pointsAbove'), above?.id === leader.id ? null : above], [t(state.language, 'pointsBelow'), below]]) {
    if (!team || team.id === current.id) continue;
    const line = el('div', 'comparison-row'); line.append(el('span', '', label), el('strong', '', formatPoints(state.language, Math.abs(team.points - current.points)))); comparison.append(line);
  }
  holder.append(identity, position, points, comparison, el('p', 'selection-note', t(state.language, 'selectClub')));
}

function setupZonePanel() {
  const admin = app.querySelector('.zone-settings'); admin.classList.add('admin-zone-settings'); admin.hidden = !state.showZoneConfig;
  const publicRules = el('div', 'zone-settings public-zone-settings');
  const title = el('div', 'zone-title'); title.append(el('h3', '', t(state.language, 'rules')), el('span', '', '2026'));
  const list = el('ul', 'zone-rule-list');
  for (const [range, label] of [[ordinal(state.language, 1), t(state.language, 'brazilianChampion')], [t(state.language, 'directRange'), t(state.language, 'libertadoresGroup')], [t(state.language, 'preRange'), t(state.language, 'preLibertadores')], [t(state.language, 'relegationRange'), t(state.language, 'relegation')]]) {
    const item = el('li'); item.append(el('strong', '', range), el('span', '', label)); list.append(item);
  }
  publicRules.append(title, list, el('p', '', t(state.language, 'rulesNote'))); admin.before(publicRules);
}

function updateThemeControl() {
  const theme = app.querySelector('#theme-toggle'); theme.setAttribute('aria-pressed', String(state.theme === 'dark'));
  theme.querySelector('.theme-icon').textContent = state.theme === 'dark' ? '☾' : '☀';
  theme.querySelector('.control-label').textContent = t(state.language, state.theme === 'dark' ? 'themeDark' : 'themeLight');
}

function renderControls() {
  const languageSelect = app.querySelector('#language-select');
  languageSelect.addEventListener('change', () => {
    const nextLanguage = languageSelect.value; document.documentElement.classList.add('ui-transition');
    window.setTimeout(() => { state.language = nextLanguage; storage.set('dr-language', state.language); render(); requestAnimationFrame(() => document.documentElement.classList.remove('ui-transition')); }, 120);
  });
  app.querySelector('#theme-toggle').addEventListener('click', () => { state.theme = state.theme === 'dark' ? 'light' : 'dark'; document.documentElement.dataset.theme = state.theme; storage.set('dr-theme', state.theme); updateThemeControl(); });
  app.querySelector('#distance-tab').addEventListener('click', () => { state.view = 'distance'; storage.set('dr-view', state.view); renderChart(); });
  app.querySelector('#table-tab').addEventListener('click', () => { state.view = 'table'; storage.set('dr-view', state.view); renderChart(); });
  if (!state.showZoneConfig) return;
  for (const [id, key] of [['direct-count', 'direct'], ['continental-count', 'continental'], ['relegation-count', 'relegation']]) {
    const select = app.querySelector(`#${id}`); const max = key === 'relegation' ? 8 : 10;
    for (let n = 0; n <= max; n++) { const option = el('option', '', String(n)); option.value = String(n); select.append(option); }
    select.value = String(state.zones[key]);
    select.addEventListener('change', () => { state.zones[key] = Number(select.value); if (state.zones.continental < state.zones.direct) { state.zones.continental = state.zones.direct; app.querySelector('#continental-count').value = String(state.zones.continental); } storage.set('dr-zones', state.zones); renderZoneExplanation(); renderChart(); });
  }
  renderZoneExplanation();
}

function renderZoneExplanation() { app.querySelector('#zone-explanation').textContent = t(state.language, 'configNote'); }

function render() {
  document.documentElement.lang = LANGUAGES[state.language].htmlLang;
  document.querySelector('.skip-link').textContent = t(state.language, 'skip');
  shell(); setupZonePanel(); renderStatus(); renderOverview(); renderControls(); renderChart(); renderSelected();
  requestAnimationFrame(() => app.classList.add('is-ready'));
}

load();

