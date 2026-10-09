/*
 * holds.js — 클라이밍 홀드 SVG 생성기
 * 같은 seed를 넣으면 항상 같은 모양이 나옵니다.
 *   Holds.svg({ seed: 3, type: 'jug', color: 'red', size: 64 })
 */
(function () {
  const PALETTE = {
    red:    { ko: '빨강', hex: '#E5483B' },
    orange: { ko: '주황', hex: '#F2892B' },
    yellow: { ko: '노랑', hex: '#F2BE22' },
    lime:   { ko: '연두', hex: '#8DC63F' },
    green:  { ko: '초록', hex: '#2E9E5B' },
    teal:   { ko: '청록', hex: '#1FA5A0' },
    blue:   { ko: '파랑', hex: '#2F6BDB' },
    purple: { ko: '보라', hex: '#8B55D6' },
    pink:   { ko: '분홍', hex: '#EE6AA7' },
  };
  const COLOR_KEYS = Object.keys(PALETTE);

  // 홀드 종류별 기본 형태 (반지름 x/y, 꼭짓점 수, 울퉁불퉁한 정도)
  const TYPES = {
    jug:    { rx: 44, ry: 32, n: 7, jitter: 0.32 },
    crimp:  { rx: 48, ry: 15, n: 8, jitter: 0.22 },
    sloper: { rx: 42, ry: 38, n: 6, jitter: 0.12 },
    pinch:  { rx: 22, ry: 46, n: 7, jitter: 0.26 },
    pocket: { rx: 38, ry: 34, n: 8, jitter: 0.24 },
    edge:   { rx: 40, ry: 22, n: 6, jitter: 0.18 },
  };
  const TYPE_KEYS = Object.keys(TYPES);

  function rng(seed) {
    let a = (seed * 2654435761) >>> 0;
    return function () {
      a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function hexToRgb(hex) {
    const n = parseInt(hex.slice(1), 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  // amt < 0 이면 어둡게, > 0 이면 밝게
  function shade(hex, amt) {
    const [r, g, b] = hexToRgb(hex);
    const t = amt < 0 ? 0 : 255;
    const p = Math.abs(amt);
    const f = (c) => Math.round(c + (t - c) * p);
    return `rgb(${f(r)},${f(g)},${f(b)})`;
  }

  function blobPoints(rand, { rx, ry, n, jitter }) {
    const pts = [];
    const off = rand() * Math.PI * 2;
    for (let i = 0; i < n; i++) {
      const a = off + (i / n) * Math.PI * 2 + (rand() - 0.5) * 0.35;
      const r = 1 + (rand() - 0.5) * 2 * jitter;
      pts.push([Math.cos(a) * rx * r, Math.sin(a) * ry * r]);
    }
    return pts;
  }

  // 닫힌 Catmull-Rom 곡선을 베지어 path로
  function smoothPath(pts, scale = 1, dx = 0, dy = 0) {
    const P = pts.map(([x, y]) => [x * scale + dx, y * scale + dy]);
    const n = P.length;
    const f = (v) => v.toFixed(1);
    let d = `M${f(P[0][0])},${f(P[0][1])}`;
    for (let i = 0; i < n; i++) {
      const p0 = P[(i - 1 + n) % n], p1 = P[i], p2 = P[(i + 1) % n], p3 = P[(i + 2) % n];
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
      const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      d += `C${f(c1[0])},${f(c1[1])} ${f(c2[0])},${f(c2[1])} ${f(p2[0])},${f(p2[1])}`;
    }
    return d + 'Z';
  }

  function resolveColor(color) {
    if (!color) return PALETTE.red.hex;
    if (color[0] === '#') return color;
    return (PALETTE[color] || PALETTE.red).hex;
  }

  function svg(opts = {}) {
    const seed = opts.seed ?? 1;
    const rand = rng(seed);
    const type = opts.type || TYPE_KEYS[Math.floor(rand() * TYPE_KEYS.length)];
    const hex = resolveColor(opts.color || COLOR_KEYS[Math.floor(rand() * COLOR_KEYS.length)]);
    const size = opts.size || 64;
    const rot = opts.rotate ?? Math.round(rand() * 360);
    const pts = blobPoints(rand, TYPES[type] || TYPES.jug);
    const body = smoothPath(pts);
    const side = smoothPath(pts, 1, 2, 5);
    const hi = smoothPath(pts, 0.55, -7, -9);

    // 손에 잡히는 질감 (작은 점들)
    let grit = '';
    for (let i = 0; i < 9; i++) {
      const a = rand() * Math.PI * 2, r = rand() * 0.75;
      const t = TYPES[type] || TYPES.jug;
      grit += `<circle cx="${(Math.cos(a) * t.rx * r).toFixed(1)}" cy="${(Math.sin(a) * t.ry * r).toFixed(1)}" r="${(0.8 + rand() * 1.2).toFixed(1)}"/>`;
    }

    // 볼트 구멍 위치: 홀드 중앙 근처
    const bx = ((rand() - 0.5) * 8).toFixed(1), by = ((rand() - 0.5) * 6).toFixed(1);
    const pocket = type === 'pocket'
      ? `<ellipse cx="${(-bx * 1.6).toFixed(1)}" cy="${(14 - by).toFixed(1)}" rx="11" ry="7" fill="${shade(hex, -0.55)}"/>`
      : '';

    const label = opts.label ? `<title>${opts.label}</title>` : '';
    return `<svg class="hold-svg" viewBox="-62 -62 124 124" width="${size}" height="${size}" aria-hidden="${opts.label ? 'false' : 'true'}" role="img">${label}` +
      `<g transform="rotate(${rot})">` +
      `<path d="${side}" fill="${shade(hex, -0.38)}"/>` +
      `<path d="${body}" fill="${hex}"/>` +
      `<path d="${hi}" fill="#fff" opacity=".2"/>` +
      `<g fill="${shade(hex, -0.3)}" opacity=".35">${grit}</g>` +
      pocket +
      `</g>` +
      `<circle cx="${bx}" cy="${by}" r="6.5" fill="${shade(hex, -0.42)}"/>` +
      `<circle cx="${bx}" cy="${by}" r="3.4" fill="#2a2622" opacity=".75"/>` +
      `</svg>`;
  }

  window.Holds = { svg, PALETTE, COLOR_KEYS, TYPE_KEYS, TYPES, rng, shade, resolveColor };
})();
