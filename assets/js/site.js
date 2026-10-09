/*
 * site.js — 공통 헤더/푸터와 각 페이지 내용을 data.js에서 읽어 그립니다.
 * 각 HTML의 <body data-page="..."> 값으로 어떤 페이지인지 구분해요.
 */
(function () {
  const S = window.SITE;
  const H = window.Holds;
  const P = S.profile;
  const page = document.body.dataset.page || 'home';
  const navKey = document.body.dataset.nav || page;

  const $ = (sel, root = document) => root.querySelector(sel);
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const hex = (c) => H.resolveColor(c);
  const pad = (n) => String(n).padStart(2, '0');
  const ph = (o) => (o && o.placeholder ? '<span class="ph" title="아직 채우지 않은 내용">예시</span>' : '');
  const isExternal = (url) => /^https?:/.test(url);
  const linkAttrs = (url) => (isExternal(url) ? ' target="_blank" rel="noopener"' : '');

  const TYPE_LABEL = { hackathon: '해커톤', datathon: '데이터톤', project: '프로젝트' };
  const TYPE_COLOR = { hackathon: 'red', datathon: 'blue', project: 'green' };

  const NAV = [
    { key: 'about', label: 'About', url: '/about/' },
    { key: 'projects', label: 'Projects', url: '/projects/' },
    { key: 'lab', label: 'Lab', url: '/lab/' },
    { key: 'climbing', label: 'Climbing', url: '/climbing/' },
    { key: 'game', label: 'Game', url: 'https://game.yunmin.dev', ext: true },
  ];

  /* ---------- 공통: 헤더 ---------- */
  function renderHeader() {
    const el = document.createElement('header');
    el.className = 'site-header';
    el.innerHTML = `
      <div class="wrap header-inner">
        <a class="logo" href="/" aria-label="yunmin.dev 홈">
          ${H.svg({ seed: 7, type: 'jug', color: 'red', size: 28, rotate: 20 })}
          <span>yunmin<b>.dev</b></span>
        </a>
        <nav class="nav" aria-label="주요 메뉴">
          ${NAV.map((n) => `<a href="${n.url}"${n.ext ? linkAttrs(n.url) : ''}${n.key === navKey ? ' aria-current="page"' : ''}>${n.label}${n.ext ? '<span class="ext">↗</span>' : ''}</a>`).join('')}
        </nav>
      </div>`;
    document.body.prepend(el);
    const onScroll = () => el.classList.toggle('scrolled', window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- 공통: 푸터 ---------- */
  function contactLinks() {
    const out = [];
    if (P.email) out.push({ label: 'Email', url: `mailto:${P.email}` });
    if (P.github) out.push({ label: 'GitHub', url: `https://github.com/${P.github}` });
    (P.links || []).forEach((l) => out.push(l));
    return out;
  }

  function renderFooter() {
    const el = document.createElement('footer');
    el.className = 'site-footer';
    const holds = ['red', 'orange', 'yellow', 'green', 'teal', 'blue', 'purple', 'pink']
      .map((c, i) => H.svg({ seed: 40 + i, color: c, size: 26 })).join('');
    el.innerHTML = `
      <div class="wrap">
        <div class="footer-holds" aria-hidden="true">${holds}</div>
        <div class="footer-grid">
          <div>
            <p class="footer-title">yunmin<b>.dev</b></p>
            <p class="muted">${esc(P.nameKo)}의 작업실. 만들고, 배우고, 오릅니다.</p>
          </div>
          <div>
            <p class="footer-label">둘러보기</p>
            <a href="/">Home</a>${NAV.filter((n) => !n.ext).map((n) => `<a href="${n.url}">${n.label}</a>`).join('')}
          </div>
          <div>
            <p class="footer-label">다른 곳</p>
            ${S.elsewhere.map((e) => `<a href="${e.url}"${linkAttrs(e.url)}>${esc(e.title)} ↗</a>`).join('')}
          </div>
          <div>
            <p class="footer-label">연락</p>
            ${contactLinks().map((l) => `<a href="${l.url}"${linkAttrs(l.url)}>${esc(l.label)}</a>`).join('')}
          </div>
        </div>
        <div class="footer-bottom">
          <span>© ${new Date().getFullYear()} ${esc(P.nameEn)}</span>
          <a href="#top">Top ↑</a>
        </div>
      </div>`;
    document.body.append(el);
  }

  /* ---------- 섹션 제목 (루트 테이프 모양) ---------- */
  function secHead(num, title, sub, color, more) {
    return `
      <div class="sec-head">
        <span class="tape" style="--c:${hex(color)}">${num}</span>
        <h2>${title}</h2>
        ${sub ? `<span class="sec-sub">${sub}</span>` : ''}
        ${more ? `<a class="sec-more" href="${more}">전체 보기 →</a>` : ''}
      </div>`;
  }

  /* ---------- 조각들 ---------- */
  function cvList() {
    return `<dl class="cv">${S.cv.map((c) => `<div><dt>${esc(c.label)}</dt><dd>${esc(c.value)}${ph(c)}</dd></div>`).join('')}</dl>`;
  }

  function factCards() {
    return `<div class="facts">${S.facts.map((f, i) => `
      <article class="fact" style="--c:${hex(f.color)}">
        <div class="fact-hold">${H.svg({ seed: 100 + i, color: f.color, size: 44 })}</div>
        <h3>${esc(f.title)}${ph(f)}</h3>
        <p>${esc(f.body)}</p>
      </article>`).join('')}</div>`;
  }

  function nowList() {
    return `<ul class="now">${S.now.map((n, i) => `
      <li>${H.svg({ seed: 200 + i, color: n.color, size: 26 })}<span>${esc(n.text)}${ph(n)}</span></li>`).join('')}</ul>`;
  }

  function stackList() {
    return `<div class="stack">${S.stack.map((s) => `
      <div class="stack-row" style="--c:${hex(s.color)}">
        <span class="stack-group">${esc(s.group)}${ph(s)}</span>
        <div class="chips">${s.items.map((t) => `<span class="chip">${esc(t)}</span>`).join('')}</div>
      </div>`).join('')}</div>`;
  }

  // 프로젝트 상세 페이지 주소: /projects/<slug>/
  const projectUrl = (p) => (p.slug ? `/projects/${p.slug}/` : '/projects/');
  const projectSeed = (p) => 300 + S.projects.indexOf(p);

  function projectRow(p, i) {
    return `
      <a class="row-card" href="${projectUrl(p)}" style="--c:${hex(p.color)}">
        <span class="row-num">${pad(i + 1)}</span>
        <span class="row-hold">${H.svg({ seed: projectSeed(p), color: p.color, size: 40 })}</span>
        <span class="row-main">
          <span class="row-title">${esc(p.title)}${ph(p)}</span>
          <span class="row-sub">${esc(p.event)} · ${esc(p.result)}</span>
        </span>
        <span class="tag" style="--c:${hex(TYPE_COLOR[p.type])}">${TYPE_LABEL[p.type] || p.type}</span>
        <span class="row-date">${esc(p.date)}</span>
        <span class="row-arrow">→</span>
      </a>`;
  }

  function projectCard(p, i) {
    return `
      <a class="p-card" href="${projectUrl(p)}" data-type="${p.type}" style="--c:${hex(p.color)}">
        <div class="p-top">
          <span class="row-num">${pad(i + 1)}</span>
          <span class="tag" style="--c:${hex(TYPE_COLOR[p.type])}">${TYPE_LABEL[p.type] || p.type}</span>
          <span class="row-date">${esc(p.date)}</span>
        </div>
        <div class="p-hold">${H.svg({ seed: projectSeed(p), color: p.color, size: 72 })}</div>
        <h3>${esc(p.title)}${ph(p)}</h3>
        <p class="p-event">${esc(p.event)}</p>
        <p class="p-result">🏆 ${esc(p.result)}</p>
        <p>${esc(p.summary)}</p>
        <p class="p-role"><b>역할</b> ${esc(p.role)}</p>
        <div class="chips">${(p.tags || []).map((t) => `<span class="chip">${esc(t)}</span>`).join('')}</div>
        <span class="p-more">자세히 보기 →</span>
      </a>`;
  }

  function labRow(l, i) {
    const tag = l.status === 'live' ? '<span class="status live">live</span>' : '<span class="status">soon</span>';
    const inner = `
        <span class="row-num">${pad(i + 1)}</span>
        <span class="row-hold">${H.svg({ seed: 400 + i, color: l.color, size: 40 })}</span>
        <span class="row-main">
          <span class="row-title">${esc(l.title)}</span>
          <span class="row-sub">${esc(l.desc)}</span>
        </span>
        ${tag}
        <span class="row-date">${esc(l.date)}</span>
        <span class="row-arrow">${l.url ? '→' : ''}</span>`;
    return l.url
      ? `<a class="row-card" href="${l.url}"${linkAttrs(l.url)} style="--c:${hex(l.color)}">${inner}</a>`
      : `<div class="row-card is-disabled" style="--c:${hex(l.color)}">${inner}</div>`;
  }

  function elsewhereCards() {
    return `<div class="elsewhere">${S.elsewhere.map((e, i) => `
      <a class="else-card" href="${e.url}"${linkAttrs(e.url)} style="--c:${hex(e.color)}">
        <div class="else-hold">${H.svg({ seed: 500 + i, color: e.color, size: 56 })}</div>
        <div>
          <p class="else-title">${esc(e.title)} <span class="status">${esc(e.status)}</span></p>
          <p class="muted">${esc(e.desc)}</p>
        </div>
        <span class="row-arrow">↗</span>
      </a>`).join('')}</div>`;
  }

  /* ---------- 메인: 클라이밍 벽 ---------- */
  // 루트 = 같은 색 홀드 묶음. x, y는 벽 안에서의 % 위치 (y는 아래가 100)
  const ROUTES = [
    { color: 'red',    grade: 'V2', holds: [[14, 88], [22, 68], [16, 48], [28, 30], [24, 10]] },
    { color: 'blue',   grade: 'V4', holds: [[46, 85], [38, 70], [52, 55], [44, 36], [56, 14]] },
    { color: 'yellow', grade: 'V1', holds: [[72, 88], [64, 68], [76, 52], [66, 32], [74, 10]] },
    { color: 'purple', grade: 'V5', holds: [[92, 80], [89, 56], [92, 34]] },
    { color: 'green',  grade: 'V0', holds: [[32, 84], [34, 56], [8, 24]] },
  ];

  function renderWall(root) {
    if (!root) return;
    let seed = 1;
    const holds = [];
    ROUTES.forEach((r, ri) => {
      r.holds.forEach(([x, y], hi) => {
        const isStart = hi === 0, isTop = hi === r.holds.length - 1;
        const size = isTop ? 72 : 54 + ((seed * 7) % 24);
        holds.push(`
          <button class="wall-hold" type="button" data-route="${ri}" data-idx="${hi}"
            style="left:${x}%;top:${y}%;--w:${(size / 5).toFixed(1)}%" aria-label="${H.PALETTE[r.color].ko} 루트 ${hi + 1}번 홀드">
            ${H.svg({ seed: seed++ * 13, color: r.color, size })}
            ${isStart ? `<span class="start-tape" style="--c:${hex(r.color)}">${r.grade}</span>` : ''}
            ${isTop ? '<span class="top-tape">TOP</span>' : ''}
          </button>`);
      });
    });
    root.innerHTML = `
      <div class="wall-inner">${holds.join('')}</div>
      <div class="wall-hint" aria-live="polite">홀드를 눌러 루트를 완등해 보세요</div>`;

    const hint = $('.wall-hint', root);
    const touched = ROUTES.map(() => new Set());
    const defaultHint = hint.textContent;

    root.addEventListener('mouseover', (e) => {
      const b = e.target.closest('.wall-hold');
      if (!b) return;
      root.dataset.focus = b.dataset.route;
      const r = ROUTES[b.dataset.route];
      hint.textContent = `${H.PALETTE[r.color].ko} 루트 · ${r.grade} · ${touched[b.dataset.route].size}/${r.holds.length}`;
    });
    root.addEventListener('mouseleave', () => { delete root.dataset.focus; hint.textContent = defaultHint; });

    root.addEventListener('click', (e) => {
      const b = e.target.closest('.wall-hold');
      if (!b) return;
      const ri = +b.dataset.route;
      const r = ROUTES[ri];
      root.dataset.focus = ri;
      b.classList.remove('grab'); void b.offsetWidth; b.classList.add('grab');
      b.classList.add('touched');
      touched[ri].add(+b.dataset.idx);
      if (touched[ri].size === r.holds.length) {
        hint.textContent = `${H.PALETTE[r.color].ko} ${r.grade} 완등! 🎉`;
        hint.classList.add('sent');
        root.querySelectorAll(`.wall-hold[data-route="${ri}"]`).forEach((h, k) => {
          setTimeout(() => { h.classList.remove('grab'); void h.offsetWidth; h.classList.add('grab'); }, k * 90);
        });
        burst(b);
        setTimeout(() => {
          hint.classList.remove('sent');
          touched[ri].clear();
          root.querySelectorAll(`.wall-hold[data-route="${ri}"]`).forEach((h) => h.classList.remove('touched'));
        }, 2600);
      } else {
        hint.textContent = `${H.PALETTE[r.color].ko} 루트 · ${r.grade} · ${touched[ri].size}/${r.holds.length}`;
      }
    });
  }

  // 완등 시 초크 가루
  function burst(target) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = target.getBoundingClientRect();
    for (let i = 0; i < 18; i++) {
      const d = document.createElement('span');
      d.className = 'chalk';
      const a = Math.random() * Math.PI * 2, r = 40 + Math.random() * 60;
      d.style.left = rect.left + rect.width / 2 + 'px';
      d.style.top = rect.top + rect.height / 2 + 'px';
      d.style.setProperty('--dx', Math.cos(a) * r + 'px');
      d.style.setProperty('--dy', Math.sin(a) * r + 'px');
      document.body.append(d);
      setTimeout(() => d.remove(), 900);
    }
  }

  /* ---------- 오른쪽 루트 내비 (섹션 진행 표시) ---------- */
  function renderRouteNav() {
    const secs = [...document.querySelectorAll('main section[id][data-color]')];
    if (secs.length < 3) return;
    const nav = document.createElement('nav');
    nav.className = 'route-nav';
    nav.setAttribute('aria-label', '섹션 이동');
    nav.innerHTML = secs.slice().reverse().map((s, i) => `
      <a href="#${s.id}" data-target="${s.id}" style="--c:${hex(s.dataset.color)}" title="${esc(s.dataset.title || s.id)}">
        ${H.svg({ seed: 600 + i, color: s.dataset.color, size: 22 })}
        <span>${esc(s.dataset.title || s.id)}</span>
      </a>`).join('');
    document.body.append(nav);
    const links = [...nav.querySelectorAll('a')];
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const idx = secs.indexOf(en.target);
        links.forEach((l) => {
          const li = secs.findIndex((s) => s.id === l.dataset.target);
          l.classList.toggle('reached', li <= idx);
          l.classList.toggle('active', li === idx);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    secs.forEach((s) => io.observe(s));
  }

  /* ---------- 스크롤 등장 애니메이션 ---------- */
  function reveal() {
    const els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) { els.forEach((e) => e.classList.add('in')); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    els.forEach((e) => io.observe(e));
  }

  /* ---------- 연락 박스 장식 홀드 ---------- */
  function decorateContact() {
    document.querySelectorAll('.contact').forEach((box) => {
      const spots = [[4, 18, 'red', 46], [11, 70, 'yellow', 34], [90, 14, 'blue', 40], [95, 62, 'green', 50], [82, 88, 'pink', 30], [20, 92, 'teal', 28]];
      const deco = document.createElement('div');
      deco.className = 'contact-holds';
      deco.setAttribute('aria-hidden', 'true');
      deco.innerHTML = spots.map(([x, y, c, s], i) =>
        H.svg({ seed: 950 + i, color: c, size: s }).replace('<svg ', `<svg style="left:${x}%;top:${y}%;transform:translate(-50%,-50%)" `)).join('');
      box.prepend(deco);
    });
  }

  const fill = (id, html) => { const el = document.getElementById(id); if (el) el.innerHTML = html; };

  /* ---------- 페이지별 ---------- */
  const pages = {
    home() {
      fill('hero-name', `${esc(P.nameEn)}<span class="dot">.</span>`);
      fill('hero-meta', `<span>${esc(P.location)}</span><span>${esc(P.role)}</span>`);
      fill('hero-tagline', esc(P.tagline));
      fill('hero-intro', esc(P.intro));
      renderWall($('#wall'));
      fill('about-head', secHead('01', 'About', 'CV 요약 + 쓸데없는 이야기', 'red', '/about/'));
      fill('about-cv', cvList());
      fill('about-facts', factCards());
      fill('now-head', secHead('02', 'Now', '요즘 하고 있는 것', 'orange'));
      fill('now-list', nowList());
      fill('stack-list', stackList());
      fill('projects-head', secHead('03', 'Projects', '해커톤 · 데이터톤 · 사이드 프로젝트', 'blue', '/projects/'));
      fill('projects-list', S.projects.filter((p) => p.featured).map(projectRow).join(''));
      fill('lab-head', secHead('04', 'Lab', '웹 개발 놀이터', 'pink', '/lab/'));
      fill('lab-list', S.lab.map(labRow).join(''));
      fill('else-head', secHead('05', 'Elsewhere', 'yunmin.dev의 다른 방들', 'yellow'));
      fill('else-list', elsewhereCards());
      fill('contact-links', contactLinks().map((l) => `<a class="btn" href="${l.url}"${linkAttrs(l.url)}>${esc(l.label)} ↗</a>`).join(''));
    },

    about() {
      fill('about-name', `${esc(P.nameKo)} <span class="muted">${esc(P.nameEn)}</span>`);
      fill('about-intro', esc(P.intro));
      fill('cv-head', secHead('01', '요약', '', 'red'));
      fill('about-cv', cvList());
      fill('tl-head', secHead('02', '지나온 길', '', 'blue'));
      fill('timeline', S.timeline.map((t, i) => `
        <li style="--c:${hex(t.color)}">
          <span class="tl-hold">${H.svg({ seed: 700 + i, color: t.color, size: 30 })}</span>
          <span class="tl-date">${esc(t.date)}</span>
          <div><p class="tl-title">${esc(t.title)}${ph(t)}</p><p class="muted">${esc(t.desc)}</p></div>
        </li>`).join(''));
      fill('stack-head', secHead('03', 'Toolbox', '자주 쓰는 도구', 'teal'));
      fill('stack-list', stackList());
      fill('facts-head', secHead('04', '쓸데없는 About Me', '', 'purple'));
      fill('about-facts', factCards());
      fill('contact-links', contactLinks().map((l) => `<a class="btn" href="${l.url}"${linkAttrs(l.url)}>${esc(l.label)} ↗</a>`).join(''));
    },

    projects() {
      const list = $('#project-grid');
      const sorted = S.projects.slice().sort((a, b) => String(b.date).localeCompare(String(a.date)));
      list.innerHTML = sorted.map(projectCard).join('');
      const counts = sorted.reduce((m, p) => ((m[p.type] = (m[p.type] || 0) + 1), m), {});
      const filters = [['all', '전체', sorted.length], ...Object.keys(TYPE_LABEL).map((k) => [k, TYPE_LABEL[k], counts[k] || 0])];
      const bar = $('#filters');
      bar.innerHTML = filters.map(([k, label, n]) =>
        `<button type="button" class="filter${k === 'all' ? ' on' : ''}" data-f="${k}" style="--c:${hex(TYPE_COLOR[k] || 'orange')}">${label} <span>${n}</span></button>`).join('');
      bar.addEventListener('click', (e) => {
        const b = e.target.closest('.filter');
        if (!b) return;
        bar.querySelectorAll('.filter').forEach((x) => x.classList.toggle('on', x === b));
        list.querySelectorAll('.p-card').forEach((c) => { c.hidden = b.dataset.f !== 'all' && c.dataset.type !== b.dataset.f; });
      });
    },

    project() {
      const root = $('#project');
      const slug = location.pathname.split('/').filter(Boolean)[1];
      const p = S.projects.find((x) => x.slug === slug);
      if (!p) {
        root.innerHTML = `<div class="wrap page-hero"><p class="eyebrow">/projects/${esc(slug)}</p><h1>프로젝트를 찾을 수 없어요</h1>
          <p class="lead">data.js의 projects에 slug: '${esc(slug)}' 항목이 있는지 확인해 주세요.</p>
          <div class="hero-cta"><a class="btn" href="/projects/">← 모든 프로젝트</a></div></div>`;
        return;
      }
      document.title = `${p.title} · yunmin.dev`;
      const sorted = S.projects.slice().sort((a, b) => String(b.date).localeCompare(String(a.date)));
      const k = sorted.indexOf(p);
      const prev = sorted[k - 1], next = sorted[k + 1];
      const meta = [['대회', p.event], ['기간', p.period || p.date], ['결과', p.result], ['역할', p.role], ['팀', p.team]]
        .filter(([, v]) => v);
      const links = (p.links || []).filter((l) => l.url);

      root.innerHTML = `
        <header class="page-hero proj-hero" style="--c:${hex(p.color)}">
          <div class="wrap">
            <p class="eyebrow"><a href="/projects/">/projects</a> / ${esc(p.slug)}</p>
            <div class="proj-title">
              <div>
                <div class="p-top">
                  <span class="tag" style="--c:${hex(TYPE_COLOR[p.type])}">${TYPE_LABEL[p.type] || p.type}</span>
                  <span class="row-date">${esc(p.date)}</span>
                </div>
                <h1>${esc(p.title)}${ph(p)}</h1>
                <p class="lead">${esc(p.summary)}</p>
              </div>
              <div class="proj-hold">${H.svg({ seed: projectSeed(p), color: p.color, size: 132 })}</div>
            </div>
          </div>
        </header>
        <section class="proj-body-sec">
          <div class="wrap proj-layout">
            <aside class="proj-side">
              <div class="panel">
                <p class="panel-title">프로젝트 정보</p>
                <dl class="cv">${meta.map(([k2, v]) => `<div><dt>${k2}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>
                ${(p.tags || []).length ? `<div class="chips proj-tags">${p.tags.map((t) => `<span class="chip">${esc(t)}</span>`).join('')}</div>` : ''}
                ${links.length ? `<div class="proj-links">${links.map((l, j) =>
                  `<a class="btn${j === 0 ? ' primary' : ''}" href="${l.url}"${linkAttrs(l.url)}>${esc(l.label)} ↗</a>`).join('')}</div>` : ''}
              </div>
            </aside>
            <article class="prose" id="project-body"><p class="muted">불러오는 중…</p></article>
          </div>
        </section>
        <nav class="wrap proj-nav" aria-label="다른 프로젝트">
          ${prev ? `<a class="row-card" href="${projectUrl(prev)}" style="--c:${hex(prev.color)}"><span class="row-main"><span class="row-sub">← 최근 프로젝트</span><span class="row-title">${esc(prev.title)}</span></span></a>` : '<span></span>'}
          ${next ? `<a class="row-card next" href="${projectUrl(next)}" style="--c:${hex(next.color)}"><span class="row-main"><span class="row-sub">이전 프로젝트 →</span><span class="row-title">${esc(next.title)}</span></span></a>` : '<span></span>'}
        </nav>`;

      const body = $('#project-body');
      fetch(`/projects/${p.slug}/content.md`, { cache: 'no-cache' })
        .then((r) => (r.ok ? r.text() : Promise.reject(r.status)))
        .then((md) => {
          body.innerHTML = window.marked ? window.marked.parse(md) : `<pre>${esc(md)}</pre>`;
          // 소제목마다 작은 홀드
          const colors = H.COLOR_KEYS;
          body.querySelectorAll('h2').forEach((h, j) => {
            h.insertAdjacentHTML('afterbegin', H.svg({ seed: 1000 + j, color: colors[(colors.indexOf(p.color) + j) % colors.length], size: 26 }));
          });
          body.querySelectorAll('a[href^="http"]').forEach((a) => { a.target = '_blank'; a.rel = 'noopener'; });
        })
        .catch(() => {
          body.innerHTML = '<p class="muted">상세 설명을 아직 작성하는 중이에요. 🧗</p>';
        });
    },

    lab() {
      fill('lab-list', S.lab.map(labRow).join(''));
    },

    climbing() {
      const C = S.climbing;
      fill('climb-stats', [
        ['시작', C.since], ['최고 그레이드', C.best], ['홈짐', C.home], ['스타일', C.style],
      ].map(([k, v], i) => `
        <div class="stat" style="--c:${hex(['red', 'orange', 'blue', 'green'][i])}">
          <span class="stat-k">${k}</span><span class="stat-v">${esc(v)}</span>
        </div>`).join('') + (C.placeholder ? '<p class="muted small">아직 예시 값이에요.</p>' : ''));

      const max = Math.max(1, ...C.grades.map((g) => g.count));
      const gradeColors = ['yellow', 'orange', 'green', 'blue', 'red', 'purple', 'pink', 'teal', 'lime'];
      // 'allez pink'처럼 이름에 색이 들어 있으면 그 색으로 그립니다
      const EXTRA = { black: '#2B2622', white: '#CFC6B4', gray: '#9A9384', grey: '#9A9384', brown: '#8A5A3B' };
      const barColor = (g, i) => {
        const c = g.color || String(g.grade).toLowerCase().split(/\s+/).reverse().find((w) => H.PALETTE[w] || EXTRA[w]);
        return EXTRA[c] || hex(c || gradeColors[i % gradeColors.length]);
      };
      fill('grade-chart', C.grades.map((g, i) => `
        <div class="bar-row">
          <span class="bar-k">${esc(g.grade)}</span>
          <span class="bar"><span style="width:${(g.count / max) * 100}%;--c:${barColor(g, i)}"></span></span>
          <span class="bar-v">${g.count}</span>
        </div>`).join(''));

      fill('climb-log', C.log.map((l, i) => `
        <li>
          <span class="row-hold">${H.svg({ seed: 800 + i, color: l.color, size: 34 })}</span>
          <span class="tag" style="--c:${hex(l.color)}">${esc(l.grade)}</span>
          <div><p class="tl-title">${esc(l.gym)}${ph(l)}</p><p class="muted">${esc(l.note)}</p></div>
          <span class="row-date">${esc(l.date)}</span>
        </li>`).join(''));

      fill('gyms', C.gyms.map((g, i) => `
        <article class="fact" style="--c:${hex(['teal', 'pink', 'lime'][i % 3])}">
          <div class="fact-hold">${H.svg({ seed: 900 + i, color: ['teal', 'pink', 'lime'][i % 3], size: 40 })}</div>
          <h3>${esc(g.name)}${ph(g)}</h3>
          <p class="muted">${esc(g.area)}</p>
          <p>${esc(g.note)}</p>
        </article>`).join(''));
    },
  };

  /* ---------- 실행 ---------- */
  document.body.id = 'top';
  renderHeader();
  (pages[page] || (() => {}))();
  renderFooter();
  decorateContact();
  renderRouteNav();
  reveal();
})();
