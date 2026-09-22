export const LANGUAGES = Object.freeze({
  pt: { flag: '🇧🇷', short: 'PT', label: 'Português', locale: 'pt-BR', htmlLang: 'pt-BR' },
  en: { flag: '🇬🇧', short: 'EN', label: 'English', locale: 'en-GB', htmlLang: 'en' },
  es: { flag: '🇪🇸', short: 'ES', label: 'Español', locale: 'es-ES', htmlLang: 'es' },
  ja: { flag: '🇯🇵', short: 'JA', label: '日本語', locale: 'ja-JP', htmlLang: 'ja' },
  fr: { flag: '🇫🇷', short: 'FR', label: 'Français', locale: 'fr-FR', htmlLang: 'fr' }
});

export const SUPPORTED_LANGUAGES = Object.keys(LANGUAGES);

const messages = {
  pt: {
    brandLabel: 'Distância Real, início', season: 'BRASILEIRÃO · SÉRIE A · 2026',
    competitionOfficial: 'CLASSIFICAÇÃO OFICIAL · CAMPEONATO BRASILEIRO SÉRIE A 2026',
    eyebrow: 'OUTRA FORMA DE LER A TABELA', titleLead: 'A tabela tem', titleEm: 'profundidade.',
    lead: 'Aqui, cada ponto ocupa uma linha. A distância entre clubes é a distância que existe no campeonato — sem comprimir os espaços.',
    point: 'PONTO', line: 'LINHA', skip: 'Pular para a visualização', dataStatus: 'Estado dos dados', distanceSummary: 'Resumo da distância',
    language: 'Idioma', theme: 'Tema', themeLight: 'Claro', themeDark: 'Escuro', toggleTheme: 'Alternar tema',
    demoTitle: 'Cenário fictício · nenhuma classificação real carregada', browserCacheTitle: 'Último dado salvo neste navegador',
    sourceUnavailableTitle: 'Fonte indisponível · último dado válido', liveStale: 'Dado real desatualizado · última coleta válida', liveValid: 'Dado real · última coleta válida',
    demoTime: 'Pontos apenas para testar a visualização', demoDetail: 'Escudos dos clubes · pontos e posições fictícios', updatedVia: 'Classificação validada e atualizada via {source}.',
    leader: 'LÍDER', leadOverSecond: 'VANTAGEM PARA O 2º', firstToLast: 'DO 1º AO 20º', tiedPoints: 'EMPATES POR PONTOS',
    pointsDistance: '{count} pontos de distância', onePointDistance: '1 ponto de distância', pointsValue: '{count} pontos', onePoint: '1 ponto',
    tieSummary: '{clubs} clubes empatados em {groups} linhas', noTies: 'Nenhum empate em pontos',
    visualizationIndex: '01 / A VISUALIZAÇÃO', vizTitle: 'Classificação por distância', vizLead: 'A posição ordena os clubes. A régua revela o tamanho real de cada disputa.',
    distanceView: 'Distância real', tableView: 'Tabela tradicional', viewMode: 'Modo de visualização',
    champion: 'Campeão', directLibertadores: 'Libertadores · fase de grupos · 1º ao 4º', libertadoresGroup: 'Libertadores · fase de grupos', preLibertadores: 'Pré-Libertadores', relegation: 'Rebaixamento', fixedBands: 'Faixas fixas do campeonato',
    pointsClubs: 'PONTOS / CLUBES', tableCaption: 'POS. / CLUBES / PONTOS', fixedScale: 'RÉGUA FIXA · {step} PX / PONTO',
    chartAria: 'Régua de distância. Role horizontalmente se necessário.', tableAria: 'Tabela tradicional. Role horizontalmente se necessário.',
    chartNote: 'Cada traço equivale a um ponto. Clubes empatados compartilham exatamente a mesma altura.',
    clubFocus: 'CLUBE EM FOCO', inTable: 'NA CLASSIFICAÇÃO', fromLeader: 'DO LÍDER', pointsAbove: 'PONTUAÇÃO ACIMA', pointsBelow: 'PONTUAÇÃO ABAIXO',
    selectClub: 'Selecione outro clube na régua ou na tabela para comparar as distâncias.',
    rules: 'Regras do campeonato', brazilianChampion: 'Campeão brasileiro', directRange: '1º ao 4º', preRange: '5º', relegationRange: '17º–20º',
    rulesNote: 'A distribuição continental pode mudar quando campeões da Libertadores, Sul-Americana ou Copa do Brasil já estão classificados.',
    sources: 'Fontes: ', footerTagline: 'Um ponto. Uma linha. A disputa como ela é.', independence: 'Projeto independente · não afiliado à CBF ou aos clubes.',
    position: 'Posição', club: 'Clube', points: 'Pontos', played: 'Jogos', goalDifference: 'Saldo', distanceLeader: 'Distância do líder',
    waitingData: 'Aguardando dados reais', loadErrorTitle: 'Não foi possível abrir a classificação.', loadErrorText: 'Confira sua conexão e tente recarregar a página.', retry: 'Tentar novamente',
    samePoints: 'mesma pontuação', aheadOf: 'à frente de {team}', behind: 'atrás de {team}',
    zoneSettings: 'Faixas por posição', adjustable: 'AJUSTÁVEIS', topBand: 'Faixa superior', middleBand: 'Faixa intermediária até', bottomBand: 'Faixa inferior',
    configNote: 'Esses controles mudam apenas as cores. As vagas reais dependem do regulamento, títulos e critérios de desempate.'
  },
  en: {
    brandLabel: 'Real Distance, home', season: 'BRAZILIAN LEAGUE · SERIE A · 2026',
    competitionOfficial: 'OFFICIAL STANDINGS · BRAZILIAN SERIE A 2026', eyebrow: 'ANOTHER WAY TO READ THE TABLE', titleLead: 'The table has', titleEm: 'depth.',
    lead: 'Here, every point takes one line. The distance between clubs is the distance in the competition — with no compressed gaps.',
    point: 'POINT', line: 'LINE', skip: 'Skip to visualization', dataStatus: 'Data status', distanceSummary: 'Distance summary',
    language: 'Language', theme: 'Theme', themeLight: 'Light', themeDark: 'Dark', toggleTheme: 'Toggle theme',
    demoTitle: 'Demo scenario · no live table loaded', browserCacheTitle: 'Last table saved in this browser', sourceUnavailableTitle: 'Source unavailable · last valid table',
    liveStale: 'Live data is out of date · last valid update', liveValid: 'Live data · last valid update', demoTime: 'Points for testing the visualization',
    demoDetail: 'Club crests · fictional points and positions', updatedVia: 'Standings validated and updated via {source}.',
    leader: 'LEADER', leadOverSecond: 'LEAD OVER 2ND', firstToLast: '1ST TO 20TH', tiedPoints: 'TIED POINT TOTALS',
    pointsDistance: '{count} points of distance', onePointDistance: '1 point of distance', pointsValue: '{count} points', onePoint: '1 point',
    tieSummary: '{clubs} clubs tied across {groups} lines', noTies: 'No teams level on points',
    visualizationIndex: '01 / THE VISUALIZATION', vizTitle: 'Standings by distance', vizLead: 'Position orders the clubs. The scale reveals the real size of every contest.',
    distanceView: 'Real distance', tableView: 'Traditional table', viewMode: 'View mode',
    champion: 'Champion', directLibertadores: 'Libertadores · group stage · 1st to 4th', libertadoresGroup: 'Libertadores · group stage', preLibertadores: 'Libertadores · qualifying round', relegation: 'Relegation', fixedBands: 'Fixed competition bands',
    pointsClubs: 'POINTS / CLUBS', tableCaption: 'POS. / CLUBS / POINTS', fixedScale: 'FIXED SCALE · {step} PX / POINT',
    chartAria: 'Distance ladder. Scroll horizontally if needed.', tableAria: 'Traditional table. Scroll horizontally if needed.',
    chartNote: 'Every tick equals one point. Tied clubs share exactly the same height.',
    clubFocus: 'CLUB IN FOCUS', inTable: 'IN THE TABLE', fromLeader: 'FROM LEADER', pointsAbove: 'POINTS ABOVE', pointsBelow: 'POINTS BELOW',
    selectClub: 'Select another club on the ladder or table to compare distances.',
    rules: 'Competition rules', brazilianChampion: 'Brazilian champion', directRange: '1st to 4th', preRange: '5th', relegationRange: '17th–20th',
    rulesNote: 'Continental places can change when Libertadores, Sudamericana, or Copa do Brasil winners are already qualified.',
    sources: 'Sources: ', footerTagline: 'One point. One line. The contest as it is.', independence: 'Independent project · not affiliated with CBF or the clubs.',
    position: 'Position', club: 'Club', points: 'Points', played: 'Played', goalDifference: 'GD', distanceLeader: 'Distance from leader',
    waitingData: 'Waiting for live data', loadErrorTitle: 'The standings could not be opened.', loadErrorText: 'Check your connection and reload the page.', retry: 'Try again',
    samePoints: 'same points', aheadOf: 'ahead of {team}', behind: 'behind {team}',
    zoneSettings: 'Competition bands', adjustable: 'ADJUSTABLE', topBand: 'Top band', middleBand: 'Middle band through', bottomBand: 'Bottom band',
    configNote: 'These controls only change colours. Actual places depend on competition rules, titles and tie-break criteria.'
  },
  es: {
    brandLabel: 'Distancia Real, inicio', season: 'BRASILEIRÃO · SERIE A · 2026',
    competitionOfficial: 'CLASIFICACIÓN OFICIAL · CAMPEONATO BRASILEÑO SERIE A 2026', eyebrow: 'OTRA FORMA DE LEER LA TABLA', titleLead: 'La tabla tiene', titleEm: 'profundidad.',
    lead: 'Aquí, cada punto ocupa una línea. La distancia entre clubes es la distancia real del campeonato, sin comprimir los espacios.',
    point: 'PUNTO', line: 'LÍNEA', skip: 'Saltar a la visualización', dataStatus: 'Estado de los datos', distanceSummary: 'Resumen de distancias',
    language: 'Idioma', theme: 'Tema', themeLight: 'Claro', themeDark: 'Oscuro', toggleTheme: 'Cambiar tema',
    demoTitle: 'Escenario de demostración · sin tabla real', browserCacheTitle: 'Última tabla guardada en este navegador', sourceUnavailableTitle: 'Fuente no disponible · último dato válido',
    liveStale: 'Datos reales desactualizados · última actualización válida', liveValid: 'Datos reales · última actualización válida', demoTime: 'Puntos para probar la visualización',
    demoDetail: 'Escudos reales · puntos y posiciones ficticios', updatedVia: 'Clasificación validada y actualizada vía {source}.',
    leader: 'LÍDER', leadOverSecond: 'VENTAJA SOBRE EL 2.º', firstToLast: 'DEL 1.º AL 20.º', tiedPoints: 'EMPATES EN PUNTOS',
    pointsDistance: '{count} puntos de distancia', onePointDistance: '1 punto de distancia', pointsValue: '{count} puntos', onePoint: '1 punto',
    tieSummary: '{clubs} clubes empatados en {groups} líneas', noTies: 'Ningún empate en puntos',
    visualizationIndex: '01 / LA VISUALIZACIÓN', vizTitle: 'Clasificación por distancia', vizLead: 'La posición ordena los clubes. La escala revela el tamaño real de cada disputa.',
    distanceView: 'Distancia real', tableView: 'Tabla tradicional', viewMode: 'Modo de visualización',
    champion: 'Campeón', directLibertadores: 'Libertadores · fase de grupos · 1.º al 4.º', libertadoresGroup: 'Libertadores · fase de grupos', preLibertadores: 'Pre-Libertadores', relegation: 'Descenso', fixedBands: 'Zonas fijas del campeonato',
    pointsClubs: 'PUNTOS / CLUBES', tableCaption: 'POS. / CLUBES / PUNTOS', fixedScale: 'ESCALA FIJA · {step} PX / PUNTO',
    chartAria: 'Escala de distancias. Desplázate horizontalmente si es necesario.', tableAria: 'Tabla tradicional. Desplázate horizontalmente si es necesario.',
    chartNote: 'Cada marca equivale a un punto. Los clubes empatados comparten exactamente la misma altura.',
    clubFocus: 'CLUB EN FOCO', inTable: 'EN LA CLASIFICACIÓN', fromLeader: 'DEL LÍDER', pointsAbove: 'PUNTOS ARRIBA', pointsBelow: 'PUNTOS ABAJO',
    selectClub: 'Selecciona otro club en la escala o la tabla para comparar distancias.',
    rules: 'Reglas del campeonato', brazilianChampion: 'Campeón brasileño', directRange: '1.º al 4.º', preRange: '5.º', relegationRange: '17.º–20.º',
    rulesNote: 'La distribución continental puede cambiar cuando los campeones de la Libertadores, Sudamericana o Copa de Brasil ya están clasificados.',
    sources: 'Fuentes: ', footerTagline: 'Un punto. Una línea. La disputa tal como es.', independence: 'Proyecto independiente · no afiliado a la CBF ni a los clubes.',
    position: 'Posición', club: 'Club', points: 'Puntos', played: 'Partidos', goalDifference: 'DG', distanceLeader: 'Distancia del líder',
    waitingData: 'Esperando datos reales', loadErrorTitle: 'No se pudo abrir la clasificación.', loadErrorText: 'Comprueba tu conexión y recarga la página.', retry: 'Intentar de nuevo',
    samePoints: 'misma puntuación', aheadOf: 'por delante de {team}', behind: 'por detrás de {team}',
    zoneSettings: 'Zonas por posición', adjustable: 'AJUSTABLES', topBand: 'Zona superior', middleBand: 'Zona intermedia hasta', bottomBand: 'Zona inferior',
    configNote: 'Estos controles solo cambian los colores. Las plazas reales dependen del reglamento, los títulos y los criterios de desempate.'
  },
  ja: {
    brandLabel: 'リアル・ディスタンス、ホーム', season: 'ブラジレイロン · セリエA · 2026',
    competitionOfficial: '2026 ブラジル全国選手権セリエA 公式順位表', eyebrow: '順位表を別の角度から読む', titleLead: '順位表には', titleEm: '奥行きがある。',
    lead: 'ここでは、1ポイントが1本のライン。クラブ間の距離を圧縮せず、そのまま可視化します。',
    point: 'ポイント', line: 'ライン', skip: '可視化へ移動', dataStatus: 'データ状況', distanceSummary: 'ポイント差の概要',
    language: '言語', theme: 'テーマ', themeLight: 'ライト', themeDark: 'ダーク', toggleTheme: 'テーマを切り替える',
    demoTitle: 'デモデータ · 実際の順位表は未読込', browserCacheTitle: 'このブラウザに保存された最新順位表', sourceUnavailableTitle: 'データ元に接続できません · 最終有効データ',
    liveStale: '実データは更新待ち · 最終有効データ', liveValid: '実データ · 最終有効更新', demoTime: '表示確認用のポイント',
    demoDetail: 'クラブエンブレム · 架空のポイントと順位', updatedVia: '{source} により順位表を確認・更新しました。',
    leader: '首位', leadOverSecond: '2位との差', firstToLast: '1位から20位', tiedPoints: '同ポイント',
    pointsDistance: '{count}ポイント差', onePointDistance: '1ポイント差', pointsValue: '{count}ポイント', onePoint: '1ポイント',
    tieSummary: '{groups}本のラインで{clubs}クラブが同点', noTies: '同ポイントのクラブなし',
    visualizationIndex: '01 / ビジュアライゼーション', vizTitle: 'ポイント差で見る順位表', vizLead: '順位は並びを示し、スケールは争いの本当の距離を示します。',
    distanceView: 'リアル距離', tableView: '通常の順位表', viewMode: '表示モード',
    champion: '優勝', directLibertadores: 'リベルタドーレス本戦 · 1位〜4位', libertadoresGroup: 'リベルタドーレス本戦', preLibertadores: 'リベルタドーレス予選', relegation: '降格', fixedBands: '大会規定による固定ゾーン',
    pointsClubs: 'ポイント / クラブ', tableCaption: '順位 / クラブ / ポイント', fixedScale: '固定スケール · 1ポイント {step} PX',
    chartAria: 'ポイント差のスケール。必要に応じて横にスクロールできます。', tableAria: '通常の順位表。必要に応じて横にスクロールできます。',
    chartNote: '1目盛りは1ポイント。勝点が同じクラブは同じ高さに並びます。',
    clubFocus: '選択中のクラブ', inTable: '順位', fromLeader: '首位との差', pointsAbove: '上のクラブとの差', pointsBelow: '下のクラブとの差',
    selectClub: 'スケールまたは順位表でクラブを選び、差を比較できます。',
    rules: '大会ルール', brazilianChampion: 'ブラジル王者', directRange: '1位〜4位', preRange: '5位', relegationRange: '17位〜20位',
    rulesNote: 'リベルタドーレス、スダメリカーナ、コパ・ド・ブラジルの優勝クラブがすでに上位の場合、出場枠は変動することがあります。',
    sources: '出典: ', footerTagline: '1ポイント。1ライン。ありのままの争い。', independence: '独立プロジェクト · CBFおよび各クラブとは無関係です。',
    position: '順位', club: 'クラブ', points: '勝点', played: '試合', goalDifference: '得失点差', distanceLeader: '首位との差',
    waitingData: '実データを待っています', loadErrorTitle: '順位表を開けませんでした。', loadErrorText: '接続を確認して、ページを再読み込みしてください。', retry: '再試行',
    samePoints: '同ポイント', aheadOf: '{team}より上', behind: '{team}より下',
    zoneSettings: '順位ゾーン', adjustable: '調整可能', topBand: '上位ゾーン', middleBand: '中位ゾーン上限', bottomBand: '下位ゾーン',
    configNote: 'この設定は色だけを変更します。実際の出場枠は大会規定、タイトル、順位決定基準によります。'
  },
  fr: {
    brandLabel: 'Distance Réelle, accueil', season: 'BRASILEIRÃO · SÉRIE A · 2026',
    competitionOfficial: 'CLASSEMENT OFFICIEL · CHAMPIONNAT BRÉSILIEN SÉRIE A 2026', eyebrow: 'UNE AUTRE LECTURE DU CLASSEMENT', titleLead: 'Le classement a', titleEm: 'de la profondeur.',
    lead: 'Ici, chaque point occupe une ligne. La distance entre les clubs est celle du championnat, sans comprimer les écarts.',
    point: 'POINT', line: 'LIGNE', skip: 'Aller à la visualisation', dataStatus: 'État des données', distanceSummary: 'Résumé des écarts',
    language: 'Langue', theme: 'Thème', themeLight: 'Clair', themeDark: 'Sombre', toggleTheme: 'Changer de thème',
    demoTitle: 'Scénario de démonstration · aucun classement réel', browserCacheTitle: 'Dernier classement enregistré dans ce navigateur', sourceUnavailableTitle: 'Source indisponible · dernières données valides',
    liveStale: 'Données réelles anciennes · dernière mise à jour valide', liveValid: 'Données réelles · dernière mise à jour valide', demoTime: 'Points utilisés pour tester la visualisation',
    demoDetail: 'Écussons des clubs · points et positions fictifs', updatedVia: 'Classement validé et mis à jour via {source}.',
    leader: 'LEADER', leadOverSecond: 'AVANCE SUR LE 2E', firstToLast: 'DU 1ER AU 20E', tiedPoints: 'ÉGALITÉS DE POINTS',
    pointsDistance: '{count} points d’écart', onePointDistance: '1 point d’écart', pointsValue: '{count} points', onePoint: '1 point',
    tieSummary: '{clubs} clubs à égalité sur {groups} lignes', noTies: 'Aucune égalité de points',
    visualizationIndex: '01 / LA VISUALISATION', vizTitle: 'Classement par distance', vizLead: 'La position ordonne les clubs. L’échelle révèle l’écart réel de chaque lutte.',
    distanceView: 'Distance réelle', tableView: 'Classement classique', viewMode: 'Mode d’affichage',
    champion: 'Champion', directLibertadores: 'Libertadores · phase de groupes · 1er au 4e', libertadoresGroup: 'Libertadores · phase de groupes', preLibertadores: 'Pré-Libertadores', relegation: 'Relégation', fixedBands: 'Zones fixes du championnat',
    pointsClubs: 'POINTS / CLUBS', tableCaption: 'POS. / CLUBS / POINTS', fixedScale: 'ÉCHELLE FIXE · {step} PX / POINT',
    chartAria: 'Échelle des écarts. Faites défiler horizontalement si nécessaire.', tableAria: 'Classement classique. Faites défiler horizontalement si nécessaire.',
    chartNote: 'Chaque graduation vaut un point. Les clubs à égalité occupent exactement la même hauteur.',
    clubFocus: 'CLUB SÉLECTIONNÉ', inTable: 'AU CLASSEMENT', fromLeader: 'DU LEADER', pointsAbove: 'POINTS AU-DESSUS', pointsBelow: 'POINTS EN DESSOUS',
    selectClub: 'Sélectionnez un autre club sur l’échelle ou dans le tableau pour comparer les écarts.',
    rules: 'Règles du championnat', brazilianChampion: 'Champion du Brésil', directRange: '1er au 4e', preRange: '5e', relegationRange: '17e–20e',
    rulesNote: 'La répartition continentale peut changer si les vainqueurs de la Libertadores, de la Sudamericana ou de la Coupe du Brésil sont déjà qualifiés.',
    sources: 'Sources : ', footerTagline: 'Un point. Une ligne. La lutte telle qu’elle est.', independence: 'Projet indépendant · non affilié à la CBF ni aux clubs.',
    position: 'Position', club: 'Club', points: 'Points', played: 'Matchs', goalDifference: 'Diff.', distanceLeader: 'Écart du leader',
    waitingData: 'En attente des données réelles', loadErrorTitle: 'Impossible d’ouvrir le classement.', loadErrorText: 'Vérifiez votre connexion et rechargez la page.', retry: 'Réessayer',
    samePoints: 'même nombre de points', aheadOf: 'devant {team}', behind: 'derrière {team}',
    zoneSettings: 'Zones par position', adjustable: 'RÉGLABLES', topBand: 'Zone supérieure', middleBand: 'Zone intermédiaire jusqu’à', bottomBand: 'Zone inférieure',
    configNote: 'Ces réglages modifient seulement les couleurs. Les places réelles dépendent du règlement, des titres et des critères de départage.'
  }
};

export function t(language, key, values = {}) {
  const template = messages[language]?.[key] ?? messages.pt[key] ?? key;
  return Object.entries(values).reduce((text, [name, value]) => text.replaceAll(`{${name}}`, String(value)), template);
}

export function localeFor(language) { return LANGUAGES[language]?.locale || LANGUAGES.pt.locale; }

export function formatPoints(language, count) {
  return t(language, count === 1 ? 'onePoint' : 'pointsValue', { count });
}

export function ordinal(language, rank) {
  if (language === 'ja') return `${rank}位`;
  if (language === 'en') {
    const suffix = rank % 100 >= 11 && rank % 100 <= 13 ? 'th' : ({ 1: 'st', 2: 'nd', 3: 'rd' }[rank % 10] || 'th');
    return `${rank}${suffix}`;
  }
  if (language === 'fr') return rank === 1 ? '1er' : `${rank}e`;
  if (language === 'es') return `${rank}.º`;
  return `${rank}º`;
}

