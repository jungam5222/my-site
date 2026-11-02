/*
 * i18n.js — 한국어 / English 전환.
 * <head>에서 가장 먼저 읽혀서 어떤 언어로 보여줄지 정합니다.
 *   1) 주소에 ?lang=en 또는 ?lang=ko 가 있으면 그 언어 (기억해 둠)
 *   2) 전에 오른쪽 위 KO / EN 버튼으로 고른 언어
 *   3) 처음 온 사람은 브라우저 언어가 한국어면 KO, 아니면 EN
 */
(function () {
  const KEY = 'yunmin.lang';
  const ok = (l) => l === 'ko' || l === 'en';
  let lang = null;
  try {
    const q = new URLSearchParams(location.search).get('lang');
    if (ok(q)) { lang = q; localStorage.setItem(KEY, q); }
    if (!lang) { const s = localStorage.getItem(KEY); if (ok(s)) lang = s; }
  } catch (e) { /* 저장소를 못 쓰는 브라우저 */ }
  if (!lang) lang = /^ko\b/i.test(navigator.language || '') ? 'ko' : 'en';

  window.LANG = lang;
  window.setLang = function (l) {
    if (!ok(l)) return;
    try { localStorage.setItem(KEY, l); } catch (e) { /* 무시 */ }
    const u = new URL(location.href);
    if (u.searchParams.has('lang')) u.searchParams.set('lang', l);
    location.replace(u.href);
  };

  const root = document.documentElement;
  root.lang = lang;
  root.classList.add('lang-' + lang);
  // 영어일 때 한국어 글자가 잠깐 보이지 않게, site.js가 바꿀 때까지 본문을 숨겨둡니다
  if (lang === 'en') setTimeout(() => root.classList.add('i18n-ready'), 1500);
})();
