/*
 * data.js — 사이트에 보이는 내용은 전부 여기서 고칩니다.
 * HTML은 건드리지 않고 이 파일만 수정하면 모든 페이지에 반영돼요.
 *
 * 색 이름: red, orange, yellow, lime, green, teal, blue, purple, pink
 * placeholder: true 인 항목은 '예시' 배지가 붙습니다. 실제 내용으로 바꾸면 지워주세요.
 */
window.SITE = {
  profile: {
    nameKo: '홍윤민',
    nameEn: 'Yunmin Hong',
    role: 'AI Developer',
    location: 'Seoul',
    // 메인 화면 큰 제목 아래 한 줄
    tagline: '해커톤과 데이터톤에서 문제를 풀고, 주말에는 벽을 오릅니다.',
    // 메인 화면 소개 문단
    intro: '모델을 만들고 데이터를 다루는 AI 개발자입니다. 이곳은 제가 만든 것과 배운 것, 그리고 그냥 해보고 싶었던 것들을 자유롭게 올려두는 작업실이에요.',
    email: '',            // 예: 'hello@yunmin.dev' (비워두면 표시 안 함)
    github: 'jungam5222',
    links: [
      // { label: 'LinkedIn', url: 'https://www.linkedin.com/in/...' },
    ],
  },

  // CV 요약 (about 섹션 왼쪽)
  cv: [
    { label: '지금', value: '소속 / 하는 일을 적어주세요', placeholder: true },
    { label: '학력', value: '학교 · 전공 · 기간', placeholder: true },
    { label: '관심 분야', value: 'LLM, 컴퓨터 비전, 데이터 분석 등', placeholder: true },
    { label: '대회', value: '해커톤 · 데이터톤 N회 참가, 수상 N회', placeholder: true },
  ],

  // 학력/경력 타임라인 (about 페이지)
  timeline: [
    { date: '20XX.03 –', title: '학교 / 회사 이름', desc: '전공 또는 직무', color: 'blue', placeholder: true },
    { date: '20XX.07', title: '첫 해커톤 참가', desc: '어떤 대회였는지 한 줄', color: 'orange', placeholder: true },
  ],

  // 쓸데없는 about me
  facts: [
    { color: 'red',    title: '클라이밍', body: '볼더링 위주로 하고, 최고 그레이드는 V?. 홈짐은 어디인지 알려주세요.', placeholder: true },
    { color: 'yellow', title: '좋아하는 것', body: '커피? 게임? 여기에 채워주세요.', placeholder: true },
    { color: 'teal',   title: '요즘 빠진 것', body: 'Quordle, chain.le 같은 영어 단어 게임. 한국어 버전을 직접 만드는 중이에요.' },
    { color: 'purple', title: 'MBTI', body: '????', placeholder: true },
  ],

  // 지금 하고 있는 것
  now: [
    { color: 'green',  text: 'yunmin.dev 만드는 중 (지금 보고 계신 이 사이트)' },
    { color: 'blue',   text: '하늘의 별따기 게임 개발 중 → game.yunmin.dev' },
    { color: 'orange', text: '다음 해커톤 준비 중', placeholder: true },
  ],

  // 기술 스택
  stack: [
    { group: 'AI / ML', color: 'purple', items: ['Python', 'PyTorch', 'scikit-learn'], placeholder: true },
    { group: 'Data',    color: 'teal',   items: ['pandas', 'SQL'], placeholder: true },
    { group: 'Web',     color: 'orange', items: ['HTML/CSS/JS', 'Cloudflare Workers', 'Supabase'] },
    { group: 'Tools',   color: 'blue',   items: ['Git', 'Jupyter', 'Claude'], placeholder: true },
  ],

  /*
   * 프로젝트 / 대회
   * type: 'hackathon' | 'datathon' | 'project'
   * featured: true 면 메인 화면에도 노출
   */
  projects: [
    {
      title: '해커톤 프로젝트 이름',
      type: 'hackathon',
      event: '대회명 · 주최',
      date: '2025.08',
      result: '수상 내역',
      role: '맡은 역할',
      summary: '어떤 문제를 풀었고, 무엇을 만들었는지 두세 줄로 적어주세요.',
      tags: ['LLM', 'RAG', 'FastAPI'],
      links: [{ label: 'GitHub', url: 'https://github.com/jungam5222' }],
      color: 'red',
      featured: true,
      placeholder: true,
    },
    {
      title: '데이터톤 프로젝트 이름',
      type: 'datathon',
      event: '대회명 · 주최',
      date: '2025.05',
      result: '수상 내역',
      role: '맡은 역할',
      summary: '데이터, 접근 방법, 결과 지표를 간단히.',
      tags: ['XGBoost', 'Feature Engineering'],
      links: [],
      color: 'blue',
      featured: true,
      placeholder: true,
    },
    {
      title: 'yunmin.dev',
      type: 'project',
      event: '개인 프로젝트',
      date: '2026.10',
      result: '운영 중',
      role: '기획 · 디자인 · 개발',
      summary: '클라이밍 홀드를 모티프로 만든 개인 웹사이트. Cloudflare Workers에 정적 파일로 배포하고, 홀드는 전부 코드로 그립니다.',
      tags: ['HTML', 'CSS', 'JS', 'Cloudflare'],
      links: [{ label: 'GitHub', url: 'https://github.com/jungam5222/my-site' }],
      color: 'green',
      featured: true,
    },
  ],

  /*
   * Lab: 웹 개발 실험 공간
   * url은 /lab/폴더명/ 형식으로 만들면 됩니다.
   */
  lab: [
    {
      title: 'Hold Generator',
      desc: '버튼 한 번에 새로운 클라이밍 홀드를 만들어요. 이 사이트의 홀드도 전부 여기서 나왔습니다.',
      date: '2026.10',
      url: '/lab/holds/',
      color: 'pink',
      status: 'live',
    },
    {
      title: '다음 실험',
      desc: '만들고 싶은 걸 여기 하나씩 추가할 예정.',
      date: '—',
      url: '',
      color: 'lime',
      status: 'soon',
    },
  ],

  // 클라이밍 페이지
  climbing: {
    since: '20XX',
    best: 'V?',
    home: '홈짐 이름',
    style: '볼더링',
    placeholder: true,
    // 그레이드별 완등 수 (그래프용). 숫자만 바꾸면 됩니다.
    grades: [
      { grade: 'V0', count: 0 }, { grade: 'V1', count: 0 }, { grade: 'V2', count: 0 },
      { grade: 'V3', count: 0 }, { grade: 'V4', count: 0 }, { grade: 'V5', count: 0 },
      { grade: 'V6', count: 0 },
    ],
    // 최근 완등 기록
    log: [
      { date: '2026.10.05', gym: '암장 이름', grade: 'V?', color: 'yellow', note: '기억에 남는 문제 한 줄', placeholder: true },
    ],
    gyms: [
      { name: '자주 가는 암장', area: '지역', note: '한 줄 평', placeholder: true },
    ],
  },

  // 다른 서브도메인
  elsewhere: [
    { title: 'game.yunmin.dev', desc: '하늘의 별따기를 시작으로 Quordle, chain.le 한국어판 같은 웹 게임들.', url: 'https://game.yunmin.dev', color: 'yellow', status: '준비 중' },
    { title: 'portfolio.yunmin.dev', desc: '경력과 프로젝트를 간결하게 정리한 CV.', url: 'https://portfolio.yunmin.dev', color: 'blue', status: '준비 중' },
  ],
};
