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
    { label: '학력', value: '고려대학교 · 컴퓨터학과 · 2학년' },
    { label: '관심 분야', value: 'LLM, 컴퓨터 비전, 데이터 분석 등', placeholder: true },
    { label: '대회', value: '해커톤 · 데이터톤 N회 참가, 수상 N회', placeholder: true },
  ],

  // 학력/경력 타임라인 (about 페이지)
  timeline: [
    { date: '2022.03', title: '광주과학고등학교 입학', desc: '', color: 'red' },
    { date: '2023.03 - .11', title: 'R&E 경진대회 정보과학 분야', desc: '레고 블록 Object Detection 모델 개발', color: 'orange' },
    { date: '2023.07', title: '전국 과학전람회 참가', desc: 'CNN 기법을 이용한 폐렴 여부 진단 및 정밀도와 재현율, F1 score 분석 / 우수상 수상', color: 'yellow' },
    { date: '2025.01', title: '광주과학고등학교 졸업', desc: '정보과학 전공', color: 'lime' },
    { date: '2025.03', title: '고려대학교 컴퓨터학과 입학', desc: '', color: 'green' },
    { date: '2025.10', title: '첫 해커톤 참가', desc: 'NASA Space Apps Challenge', color: 'teal' },
    { date: '2025.11', title: '첫 데이터톤 참가', desc: '정보대학 Inthon 데이터톤 트랙', color: 'blue' },
    { date: '2026.06 - .09', title: 'LG Aimers 9기', desc: '투구 제구 성공률 예측하기 / 리더보드 상위 4퍼센트', color: 'purple' },
    { date: '2026.08', title: 'AIKU 주니어톤', desc: '손필기 분류하기 / 1위', color: 'pink' },
    { date: '2026.10', title: '데이터톤 참가', desc: '정보대학 Inthon 데이터톤 트랙', color: 'red' },
    { date: '2026.11', title: '데이터톤 참가', desc: 'AIKU톤', color: 'orange' },
  ],

  // 쓸데없는 about me
  facts: [
    { color: 'red',    title: '클라이밍', body: '볼더링 위주로 하고, 최고 그레이드는 V7. 홈짐: 알레클라임 강동점.' },
    { color: 'yellow', title: '좋아하는 것', body: '스포츠를 좋아해요. 요즘은 클라이밍과 러닝을 하고있어요.' },
    { color: 'teal',   title: '요즘 빠진 것', body: 'Quordle, chain.le 같은 영어 단어 게임. 한국어 버전을 직접 만드는 중이에요.' },
    { color: 'purple', title: 'MBTI', body: 'ESTP' },
  ],

  // 지금 하고 있는 것
  now: [
    { color: 'green',  text: 'yunmin.dev 만드는 중 (지금 보고 계신 이 사이트)' },
    { color: 'blue',   text: '하늘의 별따기 게임 개발 중 → game.yunmin.dev' },
    { color: 'orange', text: '다음 해커톤 준비 중' },
  ],

  // 기술 스택
  stack: [
    { group: 'AI / ML', color: 'purple', items: ['Python', 'PyTorch', 'scikit-learn'], placeholder: true },
    { group: 'Data',    color: 'teal',   items: ['pandas', 'SQL'], placeholder: true },
    { group: 'Web',     color: 'orange', items: ['HTML/CSS/JS', 'Cloudflare Workers', 'Supabase'], placeholder: true },
    { group: 'Tools',   color: 'blue',   items: ['Git', 'Jupyter', 'Claude'], placeholder: true },
  ],

  /*
   * 프로젝트 / 대회
   * type: 'hackathon' | 'datathon' | 'project'
   * featured: true 면 메인 화면에도 노출
   * slug: 상세 페이지 주소 (/projects/<slug>/). 영어 소문자와 - 만 쓰세요.
   *   상세 설명은 projects/<slug>/content.md 에 마크다운으로 씁니다.
   *   새 프로젝트를 추가할 땐 projects/_template 폴더를 복사해서 이름을 slug로 바꾸면 돼요.
   * links: 상세 페이지 왼쪽에 버튼으로 나와요. 첫 번째 링크가 강조됩니다.
   * period, team: (선택) 상세 페이지 정보 칸에 표시. 예: period: '2026.08.01 – 08.02', team: '4인'
   */
  projects: [
    {
      title: 'AIKU 주니어톤',
      slug: 'aiku-juniorthon',
      type: 'datathon',
      event: '정보대학 인공지능 학회 AIKU',
      date: '2026.08',
      result: '1위',
      role: '팀원',
      summary: '손글씨 필기 사진을 보고 누구의 것인지 분류하는 문제를 해결하였다. ',
      tags: ['Image Classification'],
      links: [{ label: 'GitHub', url: 'https://github.com/jungam5222' }],
      color: 'red',
      featured: true,
    },
    {
      title: '데이터톤 프로젝트 이름',
      slug: 'example',
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
      slug: 'yunmin-dev',
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
    since: '2025',
    best: 'V7',
    home: '알레클라임 강동점',
    style: '볼더링',
    // 그레이드별 완등 수 (그래프용). 숫자만 바꾸면 됩니다.
    grades: [
      { grade: 'the climb purple', count: 2 }, { grade: 'peakers black', count: 2 }, { grade: 'sonsangwon pink', count: 2 },
      { grade: 'damjang black', count: 3 }, { grade: 'seoul forest black', count: 0 }, { grade: 'allez pink', count: 13 },
      { grade: 'allez black', count: 1 },
    ],
    // 최근 완등 기록
    log: [
      { date: '2026.07.12', gym: 'peakers 신촌', grade: 'black', color: 'yellow', note: '피커스 첫 검정, 패들패들' },
    ],
    gyms: [
      { name: 'allez', area: '강동', note: 'dynamic! crimp is dangerous.' },
    ],
  },

  // 다른 서브도메인
  elsewhere: [
    { title: 'game.yunmin.dev', desc: '하늘의 별따기를 시작으로 Quordle, chain.le 한국어판 같은 웹 게임들.', url: 'https://game.yunmin.dev', color: 'yellow', status: '운영 중' },
    { title: 'portfolio.yunmin.dev', desc: '경력과 프로젝트를 간결하게 정리한 CV.', url: 'https://portfolio.yunmin.dev', color: 'blue', status: '준비 중' },
  ],
};
