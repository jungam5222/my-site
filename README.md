# my-site

[yunmin.dev](https://yunmin.dev) — 홍윤민의 작업실. Cloudflare Workers 정적 에셋으로 배포됩니다.

## 내용 고치기

보이는 글은 거의 전부 `assets/js/data.js` 한 파일에 있어요. HTML은 건드리지 않아도 됩니다.

- `profile` 이름, 한 줄 소개, 연락처
- `cv`, `timeline`, `facts`, `now`, `stack` About 관련
- `projects` 해커톤/데이터톤/프로젝트 (`featured: true`면 메인에도 표시)
- `lab` 웹 실험 목록
- `climbing` 클라이밍 페이지
- `placeholder: true`가 붙은 항목은 화면에 '예시' 배지가 뜹니다. 실제 내용으로 바꾸면 지워주세요.

## 구조

```
index.html            메인
about/  projects/  lab/  climbing/   하위 페이지
lab/holds/            Hold Generator 실험
404.html              없는 주소일 때
assets/css/site.css   전체 스타일
assets/js/holds.js    클라이밍 홀드 SVG 생성기
assets/js/data.js     사이트 내용
assets/js/site.js     헤더/푸터와 각 페이지 렌더링
assets/vendor/        marked (마크다운 → HTML, MIT)
projects/<slug>/      프로젝트 상세 (index.html은 공통, content.md에 본문)
```

## 프로젝트 상세 페이지

프로젝트 카드를 누르면 `/projects/<slug>/`로 이동합니다.

1. `data.js`의 `projects`에 항목을 추가하고 `slug`를 정해요 (예: `slug: 'lg-aimers'`).
2. `projects/_template` 폴더를 복사해서 폴더 이름을 slug로 바꿔요 (예: `projects/lg-aimers/`).
3. 그 폴더의 `content.md`에 상세 설명과 진행 과정을 마크다운으로 써요. 이미지는 같은 폴더에 넣고 `![설명](사진.png)`로 넣으면 됩니다.

GitHub 같은 링크는 `data.js`의 `links`에 넣으면 상세 페이지에 버튼으로 나와요. `_template` 폴더는 배포되지 않아요.

## Lab 설명 페이지

Lab 항목에 `slug`가 있으면 `/lab/<slug>/` 설명 페이지를 거쳐 갑니다. 만드는 방법은 프로젝트와 같고, `lab/_template` 폴더를 복사해서 `content.md`를 쓰면 돼요. 게임 주소 같은 실제 링크는 `links`에 넣어요. `slug` 없이 `url`만 있으면 그 주소로 바로 이동합니다 (예: Hold Generator).

## 로컬에서 보기

```
python3 -m http.server 8787
```
그리고 http://localhost:8787 접속.
