import { safeCrestUrl, zoneForRank } from './model.js';
import { formatPoints, localeFor, ordinal, t } from './i18n.js';

export function el(tag, className = '', text = '') {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

export function crest(team) {
  const wrap = el('span', 'crest');
  const fallback = el('span', 'crest-fallback', team.name.split(/\s+/).map(word => word[0]).slice(0, 2).join('').toUpperCase());
  fallback.setAttribute('aria-hidden', 'true');
  wrap.append(fallback);
  const url = safeCrestUrl(team.crestUrl);
  if (url) {
    const img = el('img', 'crest-image');
    img.src = url;
    img.alt = '';
    img.loading = 'lazy';
    img.addEventListener('load', () => wrap.classList.add('has-image'));
    img.addEventListener('error', () => img.remove());
    wrap.append(img);
  }
  return wrap;
}

export function clubButton(team, selected, zones, total, onSelect, language = 'pt') {
  const button = el('button', `club-pill zone-${zoneForRank(team.rank, total, zones)}${team.id === selected?.id ? ' is-selected' : ''}`);
  button.type = 'button';
  button.setAttribute('aria-pressed', String(team.id === selected?.id));
  const diff = selected ? team.points - selected.points : 0;
  const relation = diff > 0 ? t(language, 'aheadOf', { team: selected.name }) : t(language, 'behind', { team: selected.name });
  const comparison = diff === 0 ? t(language, 'samePoints') : `${formatPoints(language, Math.abs(diff))} ${relation}`;
  button.setAttribute('aria-label', `${ordinal(language, team.rank)} ${team.name}, ${formatPoints(language, team.points)}, ${comparison}`);
  button.append(crest(team), el('span', 'club-rank', String(team.rank).padStart(2, '0')), el('span', 'club-name', team.name));
  if (selected && team.id !== selected.id) button.append(el('span', 'club-diff', `${diff > 0 ? '+' : ''}${diff}`));
  button.addEventListener('click', () => onSelect(team.id));
  return button;
}

export function formatDate(value, language = 'pt') {
  if (!value || Number.isNaN(Date.parse(value))) return t(language, 'waitingData');
  return new Intl.DateTimeFormat(localeFor(language), { dateStyle: 'medium', timeStyle: 'short', timeZone: 'America/Sao_Paulo' }).format(new Date(value)) + ' (Brasília)';
}

