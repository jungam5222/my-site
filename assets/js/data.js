/*
 * data.js — 사이트에 보이는 내용은 전부 여기서 고칩니다.
 * HTML은 건드리지 않고 이 파일만 수정하면 모든 페이지에 반영돼요.
 *
 * 색 이름: red, orange, yellow, lime, green, teal, blue, purple, pink
 * 번호가 붙는 것들(섹션 제목, 타임라인, 프로젝트, Lab)은 위 순서대로 색이 자동으로 정해져요.
 *   프로젝트는 날짜가 최신인 것부터, Lab과 타임라인은 적힌 순서대로입니다.
 * placeholder: true 인 항목은 '예시' 배지가 붙습니다. 실제 내용으로 바꾸면 지워주세요.
 *
 * 영어 버전: 항목마다 en: { ... } 에 영어 글자를 적어요. 오른쪽 위 EN을 누르면 그 값으로 바뀝니다.
 *   en을 안 적은 항목이나 칸은 영어 화면에서도 한국어 그대로 나와요.
 *   새 항목을 추가하면 en도 같이 적어주세요. (예: { title: '...', desc: '...', en: { title: '...', desc: '...' } })
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
    en: {
      tagline: 'I solve problems at hackathons and datathons, and climb walls on weekends.',
      intro: 'An AI developer who builds models and works with data. This is my workshop: things I’ve made, things I’ve learned, and things I just wanted to try.',
    },
    /*
     * 연락처 / 링크: url을 채운 것만 사이트에 나와요. 순서대로 표시됩니다.
     * 이메일은 'mailto:주소' 형식으로 적어주세요.
     */
    contacts: [
      { label: 'Email',          url: 'mailto:hym1029384756@gmail.com' },  // 'mailto:you@example.com'
      { label: 'GitHub',         url: 'https://github.com/jungam5222' },
      { label: 'LinkedIn',       url: 'https://www.linkedin.com/in/윤민-홍-829857381' },  // 'https://www.linkedin.com/in/아이디'
      { label: 'Blog',           url: '' },  // velog, tistory, medium 등
      { label: 'Kaggle',         url: '' },  // 'https://www.kaggle.com/아이디'
      { label: 'DACON',          url: '' },  // 'https://dacon.io/myprofile/번호'
      { label: 'Hugging Face',   url: '' },  // 'https://huggingface.co/아이디'
      { label: 'Google Scholar', url: '' },
      { label: 'solved.ac',      url: '' },  // 'https://solved.ac/profile/아이디'
      { label: 'LeetCode',       url: '' },
      { label: 'Stack Overflow', url: '' },
      { label: 'X',              url: '' },  // 'https://x.com/아이디'
      { label: 'Instagram',      url: 'https://www.instagram.com/oeee._.eeeo' },
      { label: 'Discord',        url: 'https://discord.gg/4aBJjXBq' },
      { label: '오픈채팅',        url: '', en: { label: 'Open chat' } },  // 카카오톡 오픈채팅 링크
      { label: '이력서',          url: '', en: { label: 'Résumé' } },  // PDF 링크 (예: '/assets/resume.pdf')
    ],
  },

  /*
   * 메인 화면: 이름 아래 한두 줄과, 벽의 루트 5개.
   * 루트 하나 = 하위 페이지 하나. 벽에서 꼭대기(TOP) 홀드를 누르면 그 페이지로 가요.
   * hook의 **글자**는 형광펜으로 강조돼요.
   * teaser에 {projects} {lab} {best} 를 쓰면 프로젝트 개수, Lab 개수, 클라이밍 최고 그레이드로 바뀌어요.
   * grade는 벽의 시작 테이프에 적히는 글자예요 (재미용).
   */
  home: {
    hook: ['데이터톤 **1위**, 볼더링 **V7**.', '둘 중 뭐가 더 어려웠을까요?'],
    en: { hook: ['**1st** at a datathon, **V7** on the wall.', 'Guess which one was harder?'] },
    routes: [
      { title: 'About',    url: '/about/',    color: 'yellow', grade: 'V1', teaser: '과학고에서 컴퓨터학과 부학생회장까지. MBTI는 들어가 보면 알아요.', en: { teaser: "From a science high school to vice president of the CS student council. My MBTI is waiting inside." } },
      { title: 'Projects', url: '/projects/', color: 'red',    grade: 'V4', teaser: '프로젝트 {projects}개. 1위 한 번, 상위 4% 한 번. 나머지 이야기는 들어가서 확인해 보세요.', en: { teaser: "{projects} projects. One 1st place, one top 4%. Climb in for the rest of the story." } },
      { title: 'Lab',      url: '/lab/',      color: 'blue',   grade: 'V3', teaser: '게임, 홀드 생성기, 지금 보고 있는 이 사이트까지. 그냥 만들어 보고 싶었던 것들.', en: { teaser: "A game, a hold generator, and the site you’re on right now. Things I just wanted to make." } },
      { title: 'Climbing', url: '/climbing/', color: 'purple', grade: '{best}', teaser: '최고 그레이드 {best}. 주말마다 어느 벽에 붙어 있는지 궁금하다면.', en: { teaser: "Best grade {best}. Curious which wall I’m hanging on every weekend?" } },
      { title: 'Game',     url: 'https://game.yunmin.dev', color: 'green', grade: 'V0', teaser: '남들이 못 떠올린 단어일수록 점수가 높아요. 한 판 해볼래요?', en: { teaser: "A Korean word game where the answers nobody else thinks of score highest. Up for a round?" } },
    ],
  },

  // CV 요약 (about 섹션 왼쪽)
  cv: [
    { label: '학력', value: '고려대학교 컴퓨터학과 · 수학과 이중전공 · 2학년', en: { label: "Education", value: "Korea University · Computer Science & Mathematics (double major) · 2nd year" } },
    { label: '관심 분야', value: 'LLM, 컴퓨터 비전, 데이터 분석 등', placeholder: true, en: { label: "Interests", value: "LLMs, computer vision, data analysis, and more" } },
    { label: '대회', value: '해커톤 · 데이터톤 6회 참가 · AIKU 주니어톤 1위 · LG Aimers 상위 4%', en: { label: "Competitions", value: "6 hackathons & datathons · 1st at AIKU Juniorthon · Top 4% at LG Aimers" } },
    { label: '활동', value: '컴퓨터학과 부학생회장 · AIKU · KUICS · Liberty', en: { label: "Activities", value: "Vice president of the CS student council · AIKU · KUICS · Liberty" } },
  ],

  // 학력/경력 타임라인 (about 페이지)
  timeline: [
    { date: '2022.03 – 2025.01', title: '광주과학고등학교', desc: '정보과학 전공', en: { title: "Gwangju Science Academy for the Gifted", desc: "Information science track" } },
    { date: '2022.03 – 2024.12', title: '!DEA', desc: '광주과학고등학교 정보과학 동아리', en: { title: "!DEA", desc: "Information science club at Gwangju Science Academy" } },
    { date: '2022.03 – 2022.11', title: 'R&E 경진대회 정보과학 분야', desc: '학교 웹사이트 개발', en: { title: "R&E Competition · Information Science", desc: "Built the school website" } },
    { date: '2023.03 – 2023.11', title: 'R&E 경진대회 정보과학 분야', desc: '레고 블록 Object Detection 모델 개발', en: { title: "R&E Competition · Information Science", desc: "Object detection model for Lego bricks" } },
    { date: '2023.07', title: '전국 과학전람회', desc: 'CNN 기법으로 흉부 X선 폐렴 진단 및 정밀도, 재현율, F1 score 분석 / 우수상', en: { title: "National Science Fair", desc: "Diagnosed pneumonia from chest X-rays with CNNs, analyzed by precision, recall and F1 score / Excellence Award" } },
    { date: '2025.03 – Now', title: '고려대학교 컴퓨터학과', desc: '', en: { title: "Korea University, Computer Science", desc: "" } },
    { date: '2025.03 – Now', title: 'Liberty', desc: '정보대학 밴드 동아리', en: { title: "Liberty", desc: "Band club, College of Informatics" } },
    { date: '2025.03 – 2026.01', title: '백구회', desc: '중앙동아리 야구부', en: { title: "Baekguhoe", desc: "Central baseball club" } },
    { date: '2025.10', title: '첫 해커톤 참가', desc: 'NASA Space Apps Challenge', en: { title: "First hackathon", desc: "NASA Space Apps Challenge" } },
    { date: '2025.11', title: '첫 데이터톤 참가', desc: '정보대학 Inthon 데이터톤 트랙', en: { title: "First datathon", desc: "Inthon datathon track, College of Informatics" } },
    { date: '2025.11 – Now', title: '고려대학교 컴퓨터학과 부학생회장', desc: '제2대 학생회 \'영원\'', en: { title: "Vice president, Korea University CS student council", desc: "2nd student council 'Youngone'" } },
    { date: '2026.03 – Now', title: 'KUICS', desc: '정보대학 보안 동아리', en: { title: "KUICS", desc: "Security club, College of Informatics" } },
    { date: '2026.06 – 2026.09', title: 'LG Aimers 9기', desc: '투구 제구 성공률 예측 / 리더보드 상위 4%', en: { title: "LG Aimers, 9th cohort", desc: "Predicting pitch command success / Top 4% on the leaderboard" } },
    { date: '2026.07 – Now', title: 'AIKU', desc: '정보대학 인공지능 학회', en: { title: "AIKU", desc: "AI society, College of Informatics" } },
    { date: '2026.08', title: 'AIKU 주니어톤', desc: '손글씨 필기 분류 / 1위', en: { title: "AIKU Juniorthon", desc: "Handwriting classification / 1st place" } },
    { date: '2026.09 – Now', title: '고려대학교 수학과 이중전공', desc: '', en: { title: "Korea University, Mathematics double major", desc: "" } },
    { date: '2026.09', title: '연고전 AI 해커톤', desc: '"깃발대항전" 게임 Agent 개발', en: { title: "Yonsei × Korea AI Hackathon", desc: "Built a game agent for \"Flag Battle\"" } },
    { date: '2026.11', title: 'Inthon 2026 데이터톤 트랙', desc: '이미지 시퀀스 멀티모달 추론 / Public 0.599', en: { title: "Inthon 2026 Datathon Track", desc: "Multimodal reasoning over image sequences / public score 0.599" } },
  ],

  // 쓸데없는 about me
  facts: [
    { color: 'red',    title: '클라이밍', body: '볼더링 위주로 하고, 최고 그레이드는 V7. 홈짐: 알레클라임 강동점.', en: { title: "Climbing", body: "Mostly bouldering, best grade V7. Home gym: Allez Climb Gangdong." } },
    { color: 'yellow', title: '좋아하는 것', body: '스포츠를 좋아해요. 요즘은 클라이밍과 러닝을 하고있어요.', en: { title: "Things I like", body: "I love sports. These days it’s climbing and running." } },
    { color: 'teal',   title: '요즘 빠진 것', body: 'Quordle, chain.le 같은 영어 단어 게임. 한국어 버전을 직접 만드는 중이에요.', en: { title: "Into lately", body: "Word games like Quordle and chain.le. I’m building Korean versions myself." } },
    { color: 'purple', title: 'MBTI', body: 'ESTP' },
  ],

  // 지금 하고 있는 것
  now: [
    { color: 'green',  text: 'yunmin.dev 만드는 중 (지금 보고 계신 이 사이트)', en: { text: "Building yunmin.dev (the site you’re looking at)" } },
    { color: 'blue',   text: '하늘의 별따기 게임 개발 중 → game.yunmin.dev', en: { text: "Making the word game Starvest → game.yunmin.dev" } },
    { color: 'orange', text: '다음 해커톤 준비 중', en: { text: "Getting ready for the next hackathon" } },
  ],

  // 기술 스택
  stack: [
    { group: 'AI / ML', color: 'purple', items: ['Python', 'PyTorch', 'scikit-learn'] },
    { group: 'Data',    color: 'teal',   items: ['pandas', 'SQL'] },
    { group: 'Web',     color: 'orange', items: ['HTML/CSS/JS', 'Cloudflare Workers'] },
    { group: 'Tools',   color: 'blue',   items: ['Git', 'Claude'] },
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
      title: 'Inthon 2026 데이터톤 트랙',
      slug: 'inthon-2026',
      type: 'datathon',
      event: '고려대학교 정보대학',
      date: '2026.11',
      result: '',
      role: 'Data Augmentation · Text Centrality · 발표',
      team: '3인 · Medoid Trio',
      summary: '연속된 이미지 시퀀스를 가장 잘 설명하는 문장을 5개 선지 중에서 고르는 멀티모달 추론 문제. 텍스트 중심성(medoid)과 SmolVLM zero-shot 신호를 앙상블하고 파인튜닝해 Public 0.599.',
      en: { title: "Inthon 2026 Datathon Track", event: "Korea University College of Informatics", team: "3 people · Medoid Trio", role: "Data augmentation · text centrality · presentation", summary: "Multimodal reasoning: pick the caption that best describes an image sequence out of five. Ensembled text centrality (medoid) with a zero-shot SmolVLM signal, then fine-tuned, for a public score of 0.599." },
      tags: ['Multimodal', 'SigLIP', 'SmolVLM', 'Data Augmentation'],
      links: [{ label: '발표자료 (PDF)', url: '/projects/inthon-2026/medoid-trio-slides.pdf', en: { label: 'Slides (PDF)' } }],
      featured: true,
    },
    {
      title: '연고전 AI 해커톤',
      slug: 'yonkojeon-ai-hackathon',
      type: 'hackathon',
      event: '연세대학교 인공지능융합대학 학생회 X 고려대학교 정보대학 학생회',
      date: '2026.09',
      result: '리더보드 27위 / 104팀',
      role: '봇 개발 (3명이 각자 개발)',
      team: '3인 · 마른하늘에 날벼樂',
      summary: '2인 대전 전략 게임 "깃발대항전"을 플레이하는 봇을 C++ 탐색 기반으로 개발. 리플레이 분석으로 약점을 찾아 고친 최종 봇이 이전 버전 상대 승률 76%.',
      en: { title: "Yonsei × Korea AI Hackathon", event: "Student councils of Yonsei College of AI Convergence × Korea University College of Informatics", result: "27th of 104 teams on the leaderboard", role: "Bot development (each of us built our own)", team: "3 people · 마른하늘에 날벼樂", summary: "Built a search-based C++ bot for \"Flag Battle\", a two-player strategy game. Fixes found through replay analysis gave the final bot a 76% win rate over its previous version." },
      tags: ['Game Agent', 'C++', 'Search'],
      links: [],
      featured: true,
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
      en: { event: "Personal project", result: "Live", role: "Planning · design · development", summary: "A personal website themed on climbing holds. Deployed as static files on Cloudflare Workers, with every hold drawn in code." },
      tags: ['HTML', 'CSS', 'JS', 'Cloudflare'],
      links: [{ label: 'GitHub', url: 'https://github.com/jungam5222/my-site' }],
      featured: true,
    },
    {
      title: 'AIKU 주니어톤',
      slug: 'aiku-juniorthon',
      type: 'datathon',
      event: '고려대학교 인공지능 학회 AIKU',
      date: '2026.08',
      result: '1위',
      role: '팀원',
      summary: '손글씨 필기 사진을 보고 누구의 필기인지 분류하는 이미지 분류 문제.',
      en: { title: "AIKU Juniorthon", event: "AIKU, Korea University AI society", result: "1st place", role: "Team member", summary: "Image classification: tell whose handwriting is in a photo of their notes." },
      tags: ['Image Classification'],
      links: [{ label: 'GitHub', url: 'https://github.com/jungam5222' }],
      featured: true,
    },
    {
      title: 'LG Aimers 9기',
      slug: 'lg-aimers-9',
      type: 'datathon',
      event: 'LG AI연구원',
      date: '2026.06',
      period: '2026.06 – 2026.09',
      result: '리더보드 상위 4%',
      role: '야구 도메인 지식 기반 EDA · 모델 개발',
      summary: '투구 데이터를 바탕으로 제구 성공률을 예측. 야구 도메인 지식을 바탕으로 EDA 수행 및 모델 개발에 참여.',
      en: { title: "LG Aimers, 9th cohort", event: "LG AI Research", result: "Top 4% on the leaderboard", role: "Baseball-informed EDA · modeling", summary: "Predicted pitch command success from pitching data. Ran EDA grounded in baseball knowledge and helped build the model." },
      tags: ['EDA', 'Tabular'],
      links: [],
      featured: true,
    },
    {
      title: 'Inthon 2025 데이터톤 트랙',
      slug: 'inthon-2025',
      type: 'datathon',
      event: '고려대학교 정보대학',
      date: '2025.11',
      result: '',
      role: '',
      summary: '첫 데이터톤 참가.',
      en: { title: "Inthon 2025 Datathon Track", event: "Korea University College of Informatics", summary: "My first datathon." },
      tags: [],
      links: [],
      featured: true,
    },
    {
      title: 'NASA Space Apps Challenge',
      slug: 'nasa-space-apps-2025',
      type: 'hackathon',
      event: 'NASA',
      date: '2025.10',
      result: '',
      role: 'AI 분야 전담',
      summary: '첫 해커톤 참가. AI 분야(Tabular data 기반 모델 개발, LLM API 활용) 전담.',
      en: { role: "AI lead", summary: "My first hackathon. Owned the AI side: tabular-data models and LLM API integration." },
      tags: ['Tabular', 'LLM API'],
      links: [],
      featured: true,
    },
    {
      title: '전국 과학전람회 · CNN 폐렴 진단',
      slug: 'science-fair-pneumonia',
      type: 'project',
      event: '전국 과학전람회',
      date: '2023.07',
      result: '우수상',
      role: '',
      summary: 'CNN 기법으로 흉부 X선의 폐렴 여부를 진단하고 정밀도, 재현율, F1 score를 분석.',
      en: { title: "National Science Fair · CNN Pneumonia Diagnosis", event: "National Science Fair", result: "Excellence Award", summary: "Diagnosed pneumonia from chest X-rays with CNNs and analyzed precision, recall and F1 score." },
      tags: ['CNN', 'Image Classification'],
      links: [],
      featured: false,
    },
    {
      title: 'R&E · 레고 블록 Object Detection',
      slug: 'rne-lego-detection',
      type: 'project',
      event: 'R&E 경진대회 · 정보과학 분야',
      date: '2023.03',
      period: '2023.03 – 2023.11',
      result: '',
      role: '',
      summary: '레고 블록을 찾아내는 Object Detection 모델 개발.',
      en: { title: "R&E · Lego Brick Object Detection", event: "R&E Competition · Information Science", summary: "Built an object detection model that finds Lego bricks." },
      tags: ['Object Detection'],
      links: [],
      featured: false,
    },
    {
      title: 'R&E · 학교 웹사이트 개발',
      slug: 'rne-school-website',
      type: 'project',
      event: 'R&E 경진대회 · 정보과학 분야',
      date: '2022.03',
      period: '2022.03 – 2022.11',
      result: '',
      role: '',
      summary: '광주과학고등학교 웹사이트 개발.',
      en: { title: "R&E · School Website", event: "R&E Competition · Information Science", summary: "Built the website for Gwangju Science Academy." },
      tags: ['Web'],
      links: [],
      featured: false,
    },
  ],

  /*
   * Lab: 웹 개발 실험 공간
   * slug가 있으면 /lab/<slug>/ 설명 페이지를 거쳐 갑니다 (프로젝트와 같은 방식).
   *   설명은 lab/<slug>/content.md 에 쓰고, 실제 링크는 links에 넣으세요.
   *   새로 만들 땐 lab/_template 폴더를 복사해서 이름을 slug로 바꾸면 돼요.
   * slug 없이 url만 있으면 그 주소로 바로 이동합니다.
   */
  lab: [
    {
      title: '하늘의 별따기',
      desc: '남들이 떠올리지 못한 답일수록 더 높이 날아오르는 한국어 낱말 게임. 영어로만 즐길 수 있던 krillion.io를 한국어로 만들었어요. 하루 7문제, 만점 700점.',
      date: '2026.10',
      slug: 'starvest',
      en: { title: "Starvest", desc: "A Korean word game where the answers nobody else thinks of fly highest. krillion.io only existed in English, so I made a Korean one. 7 questions a day, 700 points max." },
      tags: ['Web Game', 'HTML/JS', 'Python'],
      links: [
        { label: '게임 하러 가기', url: 'https://game.yunmin.dev/starvest/', en: { label: 'Play the game' } },
        { label: 'GitHub', url: 'https://github.com/jungam5222/game-dev' },
      ],
      status: 'live',
    },
    {
      title: 'yunmin.dev',
      desc: '지금 보고 계신 이 사이트. 클라이밍 벽을 모티프로 HTML, CSS, JS만으로 만들고 Cloudflare Workers에 올렸어요.',
      date: '2026.10',
      slug: 'yunmin-dev',
      // Projects의 yunmin.dev와 같은 글을 씁니다
      content: '/projects/yunmin-dev/content.md',
      en: { desc: "The site you’re on. A climbing-wall theme built with plain HTML, CSS and JS, hosted on Cloudflare Workers." },
      tags: ['HTML', 'CSS', 'JS', 'Cloudflare'],
      links: [{ label: 'GitHub', url: 'https://github.com/jungam5222/my-site' }],
      status: 'live',
    },
    {
      title: 'me.yunmin.dev',
      desc: '학력, 대회, 연구, 프로젝트, 활동을 한 장에 간결하게 정리한 CV 사이트. yunmin.dev와 같은 디자인이고 PDF로도 저장할 수 있어요.',
      date: '2026.10',
      slug: 'me',
      en: { desc: "A one-page CV covering education, competitions, research, projects and activities. Same design as yunmin.dev, and it saves cleanly as a PDF." },
      tags: ['CV', 'HTML/CSS/JS', 'Cloudflare'],
      links: [
        { label: 'CV 보기', url: 'https://me.yunmin.dev', en: { label: 'View CV' } },
        { label: 'GitHub', url: 'https://github.com/jungam5222/me.yunmin.dev' },
      ],
      status: 'live',
    },
    {
      title: 'Hold Generator',
      desc: '버튼 한 번에 새로운 클라이밍 홀드를 만들어요. 이 사이트의 홀드도 전부 여기서 나왔습니다.',
      date: '2026.10',
      url: '/lab/holds/',
      en: { desc: "Make a new climbing hold with one click. Every hold on this site came from here." },
      status: 'live',
    },
    {
      title: '다음 실험',
      desc: '만들고 싶은 걸 여기 하나씩 추가할 예정.',
      date: '—',
      url: '',
      en: { title: "Next experiment", desc: "Whatever I want to build next goes here." },
      status: 'soon',
    },
  ],

  // 클라이밍 페이지
  climbing: {
    since: '2025',
    best: 'V7',
    home: '알레클라임 강동점',
    style: '볼더링',
    en: { home: 'Allez Climb Gangdong', style: 'Bouldering' },
    // 그레이드별 완등 수 (그래프용). 숫자만 바꾸면 됩니다.
    grades: [
      { grade: 'the climb purple', count: 2 }, { grade: 'peakers black', count: 2 }, { grade: 'sonsangwon pink', count: 5 },
      { grade: 'damjang black', count: 3 }, { grade: 'seoul forest black', count: 0 }, { grade: 'allez pink', count: 13 },
      { grade: 'allez black', count: 1 },
    ],
    // 최근 완등 기록
    log: [
      { date: '2026.07.12', gym: 'peakers 신촌', grade: 'black', color: 'yellow', note: '피커스 첫 검정, 패들패들', en: { gym: "Peakers Sinchon", note: "First black at Peakers, legs shaking" } },
    ],
    gyms: [
      { name: 'allez', area: '강동', note: 'dynamic! crimp is dangerous.', en: { area: "Gangdong" } },
    ],
  },

  // 다른 서브도메인
  elsewhere: [
    { title: 'game.yunmin.dev', desc: '하늘의 별따기를 시작으로 Quordle, chain.le 한국어판 같은 웹 게임들.', url: 'https://game.yunmin.dev', color: 'yellow', status: '운영 중', en: { desc: "Web games, starting with Starvest and Korean takes on Quordle and chain.le.", status: "Live" } },
    { title: 'me.yunmin.dev', desc: '학력, 대회, 연구, 프로젝트, 활동을 간결하게 정리한 CV.', url: 'https://me.yunmin.dev', color: 'blue', status: '운영 중', en: { desc: "A concise CV of education, competitions, research, projects and activities.", status: "Live" } },
  ],
};
