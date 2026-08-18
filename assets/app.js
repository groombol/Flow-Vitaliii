/* ============================================================
   АНФИСА. Дневник творчества
   Ноль зависимостей. Списки работ приходят из data.js, который
   собирает конвейер: node review/tools/media.mjs. Руками правятся
   только подборки и тексты в начале этого файла.
   Один и тот же файл обслуживает главную и страницу года:
   каждый блок включается, только если его разметка есть на странице.
   ============================================================ */
(() => {
'use strict';

const MEDIA = Array.isArray(window.MEDIA) ? window.MEDIA : [];

/* ---------- 1. Подборка для блока «Видео» ----------
   Первые два ролика Анфиса отметила как обязательные. */
const SHOWCASE = [
  ['2026-img-1530', '2026'],
  ['2026-img-0220', '2026 · Заказ'],
  ['2026-img-0219', '2026 · Заказ'],
  ['2026-img-0218', '2026 · Заказ'],
  ['2026-img-8148', '2026'],
  ['2026-aqpva8xmefptc74t3qtmshf6wao0hmj0-bx9vvsesch93p', '2026'],
  ['2025-aqo5ta79uuddw97vic65mqcf44cmfjn2pcax-dbqlea5vs', '2025 · Teplo Place, Волгоград'],
  ['2024-img-6060', '2024'],
];

/* ---------- 2. Годы ----------
   Один источник правды на обе страницы: тексты отсюда попадают и на диск
   главной, и в шапку страницы года. Обложка это ролик года, на наведении
   окно оживает. Если у года не окажется видео, подставится фотография. */
const YEARS = [
  {
    y: '2019', cover: '2019-img-0210', head: 'Первые влоги',
    text: 'Любить съёмку и монтаж я начала очень рано. Смотрела ролики на YouTube и мечтала делать что-то такое же красивое. Так появились короткие влоги о моей жизни, и их полюбили друзья. Здесь одна из самых первых моих работ.',
  },
  {
    y: '2023', cover: '2023-img-0217', head: 'Университет и первая команда',
    text: 'Год внеучебной жизни в РАНХиГС. Я собрала с нуля собственное направление для съёмки видео, и через несколько лет из него выросла команда для больших творческих проектов. В этом же году я вышла на Креативную лигу, всероссийский проект для студенческих СМИ, и заняла третье место, защищая вуз в одиночку. Параллельно работала в маленькой кондитерской: снимала контент и разбиралась, как устроены социальные сети и стратегии.',
  },
  {
    y: '2024', cover: '2024-img-6060', head: 'Teplo Place',
    text: 'Судьбоносный год. Я пришла работать в франшизу Teplo Place, познакомилась с огромным количеством людей и получила первые большие заказы. Эти же знакомства привели меня в Москву и к другим большим проектам.',
  },
  {
    y: '2025', cover: '2025-smotret-vlog', head: 'Дорога',
    text: 'В этом году я впервые поняла, что путешествовать не страшно, а прекрасно, и что именно этого мне не хватало все прошлые годы. За две недели мы объехали половину России на машине, и из поездки родился тот самый влог с лучшими моментами. После него было ещё много дорог и много материала, который потом отозвался только хорошим.',
  },
  {
    y: '2026', cover: '2026-img-1530', head: 'Свой стиль',
    text: 'Путешествия продолжились. Я наконец нашла свой стиль в фотографии и поняла, куда двигаться дальше. Окончила университет, увидела ещё несколько городов. Один из заказных роликов я сняла для New Star Camp, и именно он привёл меня к работе с Digital Lab, одной из крупных IT-компаний.',
  },
];

const VLOG = '2025-smotret-vlog';

/* ---------- 3. Вопросы ---------- */
const FAQ = [
  ['Сколько ты уже снимаешь?',
   'Снимаю с четырнадцати лет, сейчас мне двадцать один. Началось с того, что я часами смотрела чужие влоги и блоги и наблюдала за жизнью людей. Так набралась насмотренность, а потом захотелось монтировать самой.'],
  ['На что ты снимаешь?',
   'Большую часть фотографий я сняла на Canon 550D, самую базовую камеру, с которой начинают. Видео долго снимала на iPhone 14 Pro, а сейчас снимаю на iPhone 17 Pro Max.'],
  ['Что ты берёшь на себя?',
   'Могу снять и смонтировать. Могу собрать ролик из готового материала. Могу просто снять. И пофотографировать тоже могу.'],
  ['Сколько ждать готовое?',
   'Зависит от задачи и объёма. Обычно от съёмки до готового ролика проходит не больше недели.'],
  ['Возьмёшься за монтаж чужого материала?',
   'Да, работаю и с чужим материалом.'],
  ['Что ты снимаешь для себя?',
   'Влоги и эстетичные кадры архитектуры. Вдохновляют работодатели, которые стали моими друзьями: обожаю с ними креативить и воплощать идеи.'],
  ['К чему ты идёшь дальше?',
   'Хочу как можно больше разных масштабных проектов. И со своей стороны сделаю всё, чтобы они дошли до максимального результата.'],
];

/* ---------- 4. Как называются папки на человеческом языке ---------- */
const PROJECTS = {
  'ВУЗ': 'РАНХиГС',
  'Креативная лига': 'Креативная лига',
  'Кондитерская': 'Кондитерская',
  'Влог': 'Влог',
  'Материал для Teplo Place (Волгоград)': 'Teplo Place · Волгоград',
  'Перво меню бар Teplo Place (Волгоград)': 'Меню Teplo Place · Волгоград',
  'Teplo Place (Волгоград)': 'Teplo Place · Волгоград',
  'Teplo Place (Москва)': 'Teplo Place · Москва',
  'Teplo Place меню (Волгоград)': 'Меню Teplo Place · Волгоград',
  'Teplo Place меню (Москва)': 'Меню Teplo Place · Москва',
};
/* Подписи берутся из имён папок Анфисы и ничего не додумывают:
   что не лежит в названном проекте, подписано одним годом. */
const CATS = { history: 'История творчества', also: 'Смотрите также', order: 'Заказы', client: 'Teplo Place', vlog: 'Влог', loose: 'Работы' };

/* Фотографии в меню сняла Анфиса, вёрстку и текст делали в заведении.
   Это должно быть видно на самой карточке, а не только на словах. */
const CREDIT = { 'Перво меню бар Teplo Place (Волгоград)': 'фото Анфисы, вёрстка заведения' };

/* ============================================================
   Помощники
   ============================================================ */

const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduceMQ = matchMedia('(prefers-reduced-motion:reduce)');
const coarse = matchMedia('(pointer:coarse)');

const byKey = new Map(MEDIA.map(m => [m.k, m]));
const src = (k, suffix) => `assets/media/${k}${suffix}`;
const poster = m => m.t === 'v' ? src(m.k, '-p.jpg') : src(m.k, '-t.jpg');

const project = m => m.p ? (PROJECTS[m.p] || m.p) : null;
function caption(m) {
  const p = project(m);
  const extra = m.p && CREDIT[m.p] ? ` · ${CREDIT[m.p]}` : '';
  return `${m.y}${p ? ` · ${p}` : ''}${extra}`;
}
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

/* Наведение оживляет петлю, уход останавливает. Источник ставится
   лениво: до первого наведения ни один ролик не грузится. */
function armLoop(host, key) {
  const video = $('video', host);
  if (!video) return { play() {}, stop() {} };
  let armed = false;
  const play = () => {
    if (reduceMQ.matches) return;
    if (!armed) { armed = true; video.src = src(key, '-l.mp4'); }
    host.classList.add('playing');
    const p = video.play();
    if (p && p.catch) p.catch(() => {});
  };
  const stop = () => {
    host.classList.remove('playing');
    video.pause();
    try { video.currentTime = 0; } catch {}
  };
  host.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse' && !coarse.matches) play(); });
  host.addEventListener('pointerleave', e => { if (e.pointerType === 'mouse' && !coarse.matches) stop(); });
  return { play, stop };
}

/* ============================================================
   Стена работ
   Кладка считается скриптом: работа уходит в самую короткую колонку,
   а размеры берутся из настоящей пропорции кадра. Поэтому карточка
   ровно по снимку, рамка при наведении идёт по его краю, и колонки
   заканчиваются вровень. Часть работ занимает две колонки, чтобы
   стена не выглядела ровной мозаикой.
   ============================================================ */

const ratio = m => (m.w && m.h ? m.w / m.h : 0.75);

function markWide(list) {
  // Крупный кадр ставится примерно каждым восьмым. Горизонтальному хватает
  // и четырёх шагов: он ложится в две колонки естественнее вертикального,
  // а у Анфисы вертикальных кадров вчетверо больше, и без второго условия
  // целые экраны шли бы ровной мозаикой.
  const wide = new Set();
  let since = 0;
  list.forEach(m => {
    since++;
    const r = ratio(m);
    if ((since >= 4 && r >= 1.05) || since >= 8) { wide.add(m.k); since = 0; }
  });
  return wide;
}

function cellHTML(m, wide) {
  return `
    <button class="cell${wide ? ' wide' : ''}" type="button" data-k="${m.k}" data-r="${ratio(m).toFixed(4)}" aria-label="Открыть работу: ${esc(caption(m))}">
      <img src="${poster(m)}" alt="${esc(caption(m))}" loading="lazy" decoding="async" width="${m.w}" height="${m.h}">
      ${m.t === 'v' ? '<video muted loop playsinline preload="none" aria-hidden="true" tabindex="-1"></video><span class="play-badge" aria-hidden="true"></span>' : ''}
    </button>`;
}

function layoutWall(host) {
  const cells = $$('.cell', host);
  if (!cells.length) return;
  const st = getComputedStyle(host);
  const gap = parseFloat(st.getPropertyValue('--wall-gap')) || 12;
  const cols = parseInt(st.getPropertyValue('--cols'), 10) || 4;
  const colW = (host.clientWidth - gap * (cols - 1)) / cols;
  // высота каждой колонки на текущий момент: работа уходит в самую короткую
  const tops = new Array(cols).fill(0);

  // Хвост стены выравниваем: последние работы идут от высокой к низкой и
  // крупными не становятся, иначе одна башня в конце оставляет под стеной
  // пустую полосу в целый экран.
  // Хвост не длиннее половины стены: у коротких подборок порядок важнее,
  // там наверху стоят ролики, и трогать его нельзя.
  const tail = new Set(cells.slice(cells.length - Math.min(cols * 2, Math.floor(cells.length / 2))));
  const double = c => c.classList.contains('wide') && cols > 1 && !tail.has(c);
  const height = c => (double(c) ? colW * 2 + gap : colW) / (Number(c.dataset.r) || 0.75);

  const edge = cells.length - tail.size;
  const seq = cells.slice(0, edge).concat(cells.slice(edge).sort((a, b) => height(b) - height(a)));

  seq.forEach(c => {
    const two = double(c);
    let col = 0, best = Infinity;
    if (two) {
      // широкой нужны две соседние колонки, считаем по нижней из пары
      for (let i = 0; i < cols - 1; i++) {
        const t = Math.max(tops[i], tops[i + 1]);
        if (t < best - 0.5) { best = t; col = i; }
      }
    } else {
      for (let i = 0; i < cols; i++) {
        if (tops[i] < best - 0.5) { best = tops[i]; col = i; }
      }
    }
    const w = two ? colW * 2 + gap : colW;
    const h = height(c);
    const top = two ? Math.max(tops[col], tops[col + 1]) : tops[col];

    c.style.left = `${col * (colW + gap)}px`;
    c.style.top = `${top}px`;
    c.style.width = `${w}px`;
    c.style.height = `${h}px`;

    if (two) { tops[col] = tops[col + 1] = top + h + gap; }
    else { tops[col] = top + h + gap; }
  });

  host.style.height = `${Math.max(...tops) - gap}px`;
}

function layoutAllWalls() { $$('.wall').forEach(layoutWall); }

let wallTimer = 0;
addEventListener('resize', () => {
  clearTimeout(wallTimer);
  wallTimer = setTimeout(layoutAllWalls, 120);
});

/* ============================================================
   Просмотр кадра и ролика
   Открывается по клику, поэтому у страницы есть разрешение
   пользователя на звук. Если браузер всё равно откажет,
   ролик пойдёт немым, а кнопка звука останется на месте.
   ============================================================ */

const viewer = $('#viewer');
let vList = [], vIndex = 0, vReturn = null;

function viewerRender() {
  const m = vList[vIndex];
  if (!m) return;
  const many = vList.length > 1;
  const media = m.t === 'v'
    ? `<video src="${src(m.k, '-f.mp4')}" poster="${src(m.k, '-p.jpg')}" playsinline controls autoplay loop
              width="${m.w}" height="${m.h}"></video>`
    : `<img src="${src(m.k, '-m.jpg')}" alt="${esc(caption(m))}" width="${m.w}" height="${m.h}">`;

  viewer.innerHTML = `
    <figure>
      ${m.t === 'v' ? '<button class="v-sound" type="button" data-act="sound">Звук выключен</button>' : ''}
      <button class="v-close" type="button" data-act="close">Закрыть ✕</button>
      ${many ? '<button class="v-prev" type="button" data-act="prev" aria-label="Предыдущая работа">‹</button>' : ''}
      ${many ? '<button class="v-next" type="button" data-act="next" aria-label="Следующая работа">›</button>' : ''}
      ${media}
      <figcaption>${esc(caption(m))}${many ? ` · ${vIndex + 1} из ${vList.length}` : ''}</figcaption>
    </figure>`;

  const video = $('video', viewer);
  if (video) {
    const sound = $('.v-sound', viewer);
    // Сначала пробуем со звуком: клик по карточке это и есть разрешение.
    video.muted = false;
    const p = video.play();
    if (p && p.catch) p.catch(() => {
      video.muted = true;
      video.play().catch(() => {});
      if (sound) sound.textContent = 'Включить звук';
    });
    if (sound) {
      const sync = () => { sound.textContent = video.muted ? 'Включить звук' : 'Звук включён'; };
      sound.addEventListener('click', () => { video.muted = !video.muted; if (!video.muted) video.play().catch(() => {}); sync(); });
      video.addEventListener('volumechange', sync);
      sync();
    }
  }
  const first = $('.v-close', viewer);
  if (first) first.focus({ preventScroll: true });
}

function viewerOpen(list, index, returnTo) {
  if (!viewer || !list.length) return;
  vList = list; vIndex = index; vReturn = returnTo || null;
  viewer.classList.add('open');
  document.body.classList.add('locked');
  viewerRender();
}

function viewerClose() {
  if (!viewer) return;
  const video = $('video', viewer);
  if (video) video.pause();
  viewer.classList.remove('open');
  viewer.innerHTML = '';
  document.body.classList.remove('locked');
  if (vReturn && vReturn.focus) vReturn.focus({ preventScroll: true });
  vReturn = null;
}

function viewerStep(d) {
  if (vList.length < 2) return;
  vIndex = (vIndex + d + vList.length) % vList.length;
  viewerRender();
}

if (viewer) {
  viewer.addEventListener('click', e => {
    const act = e.target.closest('[data-act]');
    if (act) {
      const a = act.dataset.act;
      if (a === 'close') viewerClose();
      if (a === 'prev') viewerStep(-1);
      if (a === 'next') viewerStep(1);
      return;
    }
    // щелчок мимо кадра закрывает просмотр
    if (!e.target.closest('figure')) viewerClose();
  });
  addEventListener('keydown', e => {
    if (!viewer.classList.contains('open')) return;
    if (e.key === 'Escape') { e.preventDefault(); viewerClose(); }
    if (e.key === 'ArrowLeft') viewerStep(-1);
    if (e.key === 'ArrowRight') viewerStep(1);
  });
}

/* ============================================================
   02 Видео
   ============================================================ */

const vGrid = $('#vGrid');
if (vGrid) {
  const list = SHOWCASE.map(([k]) => byKey.get(k)).filter(Boolean);
  vGrid.innerHTML = SHOWCASE.map(([k, tag]) => {
    const m = byKey.get(k);
    if (!m) return '';
    return `
    <button class="v-card" type="button" data-k="${k}" aria-label="Смотреть ролик: ${esc(tag)}">
      <img src="${src(k, '-p.jpg')}" alt="" loading="lazy" decoding="async" width="${m.w}" height="${m.h}">
      <video muted loop playsinline preload="none" aria-hidden="true" tabindex="-1"></video>
      <span class="play-badge" aria-hidden="true"></span>
      <span class="tag">${esc(tag)}</span>
    </button>`;
  }).join('');

  $$('.v-card', vGrid).forEach(card => {
    armLoop(card, card.dataset.k);
    card.addEventListener('click', () => {
      const i = list.findIndex(m => m.k === card.dataset.k);
      viewerOpen(list, Math.max(0, i), card);
    });
  });
}

/* ============================================================
   03 История творчества: диск
   ============================================================ */

const disc = $('#disc');
if (disc) {
  const wheel = $('#wheel');
  const left = $('#storyLeft');
  const right = $('#storyRight');
  let active = YEARS.length - 1;      // открываемся на свежем годе
  let turn = active;                  // накопленный поворот пластины

  if (left) {
    left.innerHTML = YEARS.map(({ y, head, text }) => `
      <article class="st" data-y="${y}">
        <p class="st-year">${y}</p>
        <h3>${esc(head)}</h3>
        <p>${esc(text)}</p>
      </article>`).join('');
  }
  const texts = $$('.st', left || document);

  const covers = YEARS.map(({ y, cover }) => {
    const m = byKey.get(cover) || MEDIA.find(x => x.y === y && x.t === 'v') || MEDIA.find(x => x.y === y);
    return { y, m };
  });

  wheel.insertAdjacentHTML('beforeend', covers.map(({ y, m }, i) => `
    <button class="seg" type="button" style="--i:${i}" data-y="${y}" data-i="${i}">
      <span class="seg-in">
        ${m ? `<img src="${poster(m)}" alt="Кадр ${y} года" loading="lazy" decoding="async">` : ''}
        ${m && m.t === 'v' ? '<video muted loop playsinline preload="none" aria-hidden="true" tabindex="-1"></video>' : ''}
        <span class="seg-marks" aria-hidden="true"><i></i><i></i><i></i><i></i></span>
        <span class="seg-year">${y}</span>
      </span>
    </button>`).join(''));

  const segs = $$('.seg', wheel);
  const loops = segs.map((s, i) => covers[i].m && covers[i].m.t === 'v' ? armLoop(s, covers[i].m.k) : null);

  const N = YEARS.length;
  // кратчайший путь по кольцу: диск это круг, за последним годом снова первый
  const around = i => ((i - active + N + Math.floor(N / 2)) % N) - Math.floor(N / 2);

  function paint() {
    disc.style.setProperty('--turn', turn);
    segs.forEach((s, i) => {
      const pos = around(i);
      const on = pos === 0;
      s.style.setProperty('--pos', pos);
      s.toggleAttribute('data-on', on);
      s.toggleAttribute('data-far', Math.abs(pos) > 1);
      s.setAttribute('tabindex', on ? '0' : '-1');
      s.setAttribute('aria-label', on ? `Открыть ${covers[i].y} год` : `Перейти к ${covers[i].y} году`);
      const yl = $('.seg-year', s);
      if (yl) yl.textContent = on ? `${covers[i].y} · Открыть` : covers[i].y;
      // играет только окно в фокусе внимания, остальные ждут наведения
      if (loops[i]) (on ? loops[i].play : loops[i].stop)();
    });

    const year = covers[active].y;
    texts.forEach(t => t.classList.toggle('on', t.dataset.y === year));

    if (right) {
      const g = MEDIA.filter(m => m.y === year);
      const ph = g.filter(m => m.t === 'f').length, vd = g.filter(m => m.t === 'v').length;
      const parts = [];
      if (ph) parts.push(`${ph} фото`);
      if (vd) parts.push(`${vd} видео`);
      right.innerHTML = `<p class="st-count">${parts.join(' · ') || 'материал скоро появится'}</p>
        <a class="st-link" href="year.html?y=${year}">Открыть ${year} год →</a>`;
    }
  }

  // шаг по кольцу: счётчик поворотов растёт монотонно, поэтому пластина
  // всегда доворачивается в ту сторону, куда нажали
  const step = d => { turn += d; active = (active + d % N + N) % N; paint(); };

  segs.forEach((s, i) => {
    s.addEventListener('click', () => {
      // соседнее окно сначала подъезжает, активное открывает год
      const pos = around(i);
      if (pos !== 0) { step(pos); return; }
      location.href = `year.html?y=${covers[i].y}`;
    });
  });

  disc.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1); segs[active].focus(); }
    if (e.key === 'ArrowRight') { e.preventDefault(); step(1); segs[active].focus(); }
  });

  // смахивание: порог в четверть ширины окна, чтобы не спорить с прокруткой
  let sx = 0, sy = 0, swiping = false;
  disc.addEventListener('pointerdown', e => { sx = e.clientX; sy = e.clientY; swiping = true; });
  disc.addEventListener('pointerup', e => {
    if (!swiping) return;
    swiping = false;
    const dx = e.clientX - sx, dy = e.clientY - sy;
    if (Math.abs(dx) > 46 && Math.abs(dx) > Math.abs(dy)) step(dx < 0 ? 1 : -1);
  });
  disc.addEventListener('pointercancel', () => { swiping = false; });

  paint();
}

/* ============================================================
   04 Смотрите также: стена
   ============================================================ */

const wall = $('#wall');
if (wall) {
  const chips = $('#chips');
  const more = $('#wallMore');
  const STEP = 48;

  // новое сверху: последний год идёт первым
  const ALL = [...MEDIA].sort((a, b) => b.y.localeCompare(a.y) || a.k.localeCompare(b.k));
  const years = [...new Set(ALL.map(m => m.y))].sort((a, b) => b.localeCompare(a));

  let filter = 'all', shown = 0, list = ALL;

  if (chips) {
    chips.innerHTML = [['all', 'Всё'], ...years.map(y => [y, y])]
      .map(([v, t]) => `<button class="chip" type="button" data-f="${v}" aria-pressed="${v === 'all'}">${t}</button>`).join('');
  }

  let wide = markWide(ALL);

  function draw(reset) {
    if (reset) { wall.innerHTML = ''; shown = 0; }
    const part = list.slice(shown, shown + STEP);
    wall.insertAdjacentHTML('beforeend', part.map(m => cellHTML(m, wide.has(m.k))).join(''));
    part.forEach(m => {
      const el = wall.querySelector(`.cell[data-k="${m.k}"]`);
      if (!el) return;
      if (m.t === 'v') armLoop(el, m.k);
      el.addEventListener('click', () => viewerOpen(list, list.findIndex(x => x.k === m.k), el));
    });
    shown += part.length;
    layoutWall(wall);
    if (more) more.style.display = shown >= list.length ? 'none' : '';
  }

  if (chips) {
    chips.addEventListener('click', e => {
      const b = e.target.closest('.chip');
      if (!b) return;
      filter = b.dataset.f;
      $$('.chip', chips).forEach(c => c.setAttribute('aria-pressed', String(c === b)));
      list = filter === 'all' ? ALL : ALL.filter(m => m.y === filter);
      // после отбора порядок другой, значит и крупные акценты другие
      wide = markWide(list);
      draw(true);
    });
  }
  if (more) more.addEventListener('click', () => draw(false));
  draw(true);
}

/* ============================================================
   05 Влог
   ============================================================ */

const vlogBg = $('#vlogBg');
const vlogPlay = $('#vlogPlay');
if (vlogBg && 'IntersectionObserver' in window) {
  // фон это лёгкая шестисекундная петля, полный ролик ждёт кнопки
  new IntersectionObserver(es => {
    es.forEach(e => {
      if (e.isIntersecting && !reduceMQ.matches) {
        if (!vlogBg.src) vlogBg.src = src(VLOG, '-l.mp4');
        vlogBg.play().catch(() => {});
      } else vlogBg.pause();
    });
  }, { threshold: 0.15 }).observe(vlogBg.closest('section'));
  vlogBg.poster = src(VLOG, '-p.jpg');
}
if (vlogPlay) {
  vlogPlay.addEventListener('click', () => {
    const m = byKey.get(VLOG);
    if (m) viewerOpen([m], 0, vlogPlay);
  });
}

/* ============================================================
   06 Вопросы
   ============================================================ */

const qs = $('#qs');
if (qs) {
  qs.innerHTML = FAQ.map(([q, a]) => `
    <details><summary>${esc(q)}<span class="pm" aria-hidden="true"></span></summary><div class="qa"><p>${esc(a)}</p></div></details>`).join('');

  /* Створка едет в обе стороны. На закрытии браузер прячет содержимое
     сразу, как только снят open, поэтому атрибут снимается не раньше,
     чем высота дойдёт до нуля. */
  $$('details', qs).forEach(d => {
    const box = $('.qa', d);
    const sum = $('summary', d);
    let running = null;

    const settle = (fn) => {
      if (running) box.removeEventListener('transitionend', running);
      running = e => {
        if (e.propertyName !== 'height') return;
        box.removeEventListener('transitionend', running);
        running = null;
        fn();
      };
      box.addEventListener('transitionend', running);
    };

    sum.addEventListener('click', e => {
      e.preventDefault();
      if (reduceMQ.matches) { d.open = !d.open; box.style.height = ''; return; }

      if (!d.open) {
        d.open = true;
        box.style.height = '0px';
        const h = box.scrollHeight;
        requestAnimationFrame(() => { box.style.height = h + 'px'; });
        settle(() => { box.style.height = ''; });
      } else {
        box.style.height = box.scrollHeight + 'px';
        requestAnimationFrame(() => { box.style.height = '0px'; });
        settle(() => { d.open = false; box.style.height = ''; });
      }
    });
  });
}

/* ============================================================
   Страница года
   ============================================================ */

const feed = $('#yearFeed');
if (feed) {
  const asked = new URLSearchParams(location.search).get('y');
  const info = YEARS.find(x => x.y === asked) || YEARS[YEARS.length - 1];
  const year = info.y;
  const list = MEDIA.filter(m => m.y === year);

  const titleEl = $('#yearTitle'), headEl = $('#yearHead'), textEl = $('#yearText'), countEl = $('#yearCount');
  if (titleEl) titleEl.textContent = year;
  if (headEl) headEl.textContent = info.head;
  if (textEl) textEl.textContent = info.text;
  document.title = `${year}. ${info.head} · Анфиса`;

  const ph = list.filter(m => m.t === 'f').length, vd = list.filter(m => m.t === 'v').length;
  if (countEl) countEl.textContent = [ph ? `${ph} фото` : '', vd ? `${vd} видео` : ''].filter(Boolean).join(' · ');

  // Внутри года материал идёт группами. Наверх поднимается то, ради чего
  // сюда заходят: съёмки с роликами. Дальше остальные работы, а подборка
  // «Смотрите также» всегда закрывает страницу.
  const groups = new Map();
  for (const m of list) {
    const g = project(m) || CATS[m.c[0]] || 'Работы';
    if (!groups.has(g)) groups.set(g, []);
    groups.get(g).push(m);
  }
  // и в самой группе ролики идут первыми, фотографии следом
  for (const items of groups.values()) {
    items.sort((a, b) => (b.t === 'v') - (a.t === 'v'));
  }

  const clips = g => groups.get(g).filter(m => m.t === 'v').length;
  const rank = g => (g === CATS.also ? 2 : clips(g) ? 0 : 1);
  const order = [...groups.keys()].sort((a, b) =>
    rank(a) - rank(b) ||
    clips(b) - clips(a) ||
    groups.get(b).length - groups.get(a).length ||
    a.localeCompare(b));

  // просмотр листается в том же порядке, в каком работы стоят на странице
  const shownOrder = order.flatMap(g => groups.get(g));

  feed.innerHTML = order.map(g => {
    const items = groups.get(g);
    const credit = items[0].p && CREDIT[items[0].p] ? `<span class="grp-note">${esc(CREDIT[items[0].p])}</span>` : '';
    return `
    <section class="grp">
      <header class="grp-head"><h2>${esc(g)}</h2><span class="grp-count">${items.length}</span>${credit}</header>
      <div class="wall">${(() => { const w = markWide(items); return items.map(m => cellHTML(m, w.has(m.k))).join(''); })()}</div>
    </section>`;
  }).join('');

  $$('.cell', feed).forEach(el => {
    const m = byKey.get(el.dataset.k);
    if (!m) return;
    if (m.t === 'v') armLoop(el, m.k);
    el.addEventListener('click', () => viewerOpen(shownOrder, shownOrder.findIndex(x => x.k === m.k), el));
  });
  layoutAllWalls();

  // соседние годы внизу страницы
  const nav = $('#yearNav');
  if (nav) {
    const ys = YEARS.map(x => x.y);
    const i = ys.indexOf(year);
    const link = (y, t) => y ? `<a class="st-link" href="year.html?y=${y}">${t}</a>` : '<span></span>';
    nav.innerHTML = link(ys[i - 1], `← ${ys[i - 1] || ''}`) + link(ys[i + 1], `${ys[i + 1] || ''} →`);
  }
}

/* ============================================================
   Общее поведение страницы
   ============================================================ */

const navEl = $('#nav');
// Прозрачной шапка бывает только над кадром героя. На странице года героя нет,
// поэтому подложка стоит сразу и никогда не снимается.
const hasHero = !!$('.hero-frame');
let navSolid = null;
function navState() {
  if (!navEl) return;
  const solid = !hasHero || window.scrollY > 40;
  if (solid !== navSolid) { navSolid = solid; navEl.classList.toggle('solid', solid); }
}
if (hasHero) addEventListener('scroll', navState, { passive: true });
navState();

if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((es, obs) => {
    es.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('in');
      setTimeout(() => e.target.classList.add('settled'), 1200);
      obs.unobserve(e.target);
    });
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0.06 });
  $$('.reveal').forEach(s => io.observe(s));
} else {
  $$('.reveal').forEach(s => s.classList.add('in', 'settled'));
}

/* ---------- форма ---------- */
const form = $('#form');
const sent = $('#sent');
if (form) {
  const live = !form.action.includes('PLACEHOLDER');
  if (!live) {
    const note = $('.form-note');
    if (note) note.textContent = 'Приёмник письма ещё не подключён';
  }

  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (!form.reportValidity()) return;

    if (!live) {
      sent.textContent = 'Форма готова, осталось подключить приёмник писем. Пока напишите в Telegram или на почту.';
      sent.classList.add('show');
      return;
    }

    const btn = $('button[type=submit]', form);
    btn.disabled = true;
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      if (!res.ok) throw new Error('bad status');
      form.classList.add('done');
      sent.classList.add('show');
    } catch {
      btn.disabled = false;
      sent.textContent = 'Письмо не ушло. Напишите, пожалуйста, в Telegram или на почту.';
      sent.classList.add('show');
    }
  });
}

/* ---------- reduced motion живьём ---------- */
reduceMQ.addEventListener('change', e => {
  if (!e.matches) return;
  $$('.reveal').forEach(s => s.classList.add('in', 'settled'));
  $$('video').forEach(v => { if (!v.controls) v.pause(); });
});

/* ---------- вкладка скрыта: всё замирает ---------- */
addEventListener('visibilitychange', () => {
  document.body.classList.toggle('paused', document.hidden);
  if (document.hidden) $$('video').forEach(v => { if (!v.controls) v.pause(); });
});

/* ---------- ПОРТФОЛИО ровно по ширине сетки ----------
   Кегль считается из измеренной строки, а не подбирается в vw: у Unbounded
   широкие круглые литеры, и на разных окнах слово иначе не встаёт впритык
   к обоим полям. Появления у слова нет: оно стоит с первого кадра. */
const heroWord = $('#heroWord');
if (heroWord) {
  const inner = $('.hero-word-in', heroWord);
  const fit = () => {
    const avail = heroWord.clientWidth;
    const now = inner.getBoundingClientRect().width;
    if (!avail || !now) return;
    const size = parseFloat(getComputedStyle(heroWord).fontSize);
    heroWord.style.setProperty('--hero-fs', (size * avail / now).toFixed(2) + 'px');
  };
  // второй проход снимает погрешность округления первого
  const fitTwice = () => { fit(); requestAnimationFrame(fit); };
  fitTwice();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitTwice);
  let heroTimer = 0;
  addEventListener('resize', () => { clearTimeout(heroTimer); heroTimer = setTimeout(fitTwice, 100); });
}

document.body.classList.add('ready');
})();
