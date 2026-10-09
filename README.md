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
```

새 Lab 실험은 `lab/<이름>/index.html`을 만들고 `data.js`의 `lab`에 한 줄 추가하면 됩니다.

## 로컬에서 보기

```
python3 -m http.server 8787
```
그리고 http://localhost:8787 접속.
