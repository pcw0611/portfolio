# HANDOFF

- 현재 담당: Codex
- 인계 대상: 이후 포트폴리오 담당자
- 브랜치: `main`
- 대상: 심층(深層) v0.5.3 카드와 공개 WebGL

## 심층 v0.5.3 운영 경계·우편·밸런스 릴리스 — 2026-08-15

- `data.js`의 심층 카드를 한국어·영어·일본어 모두 v0.5.3 기준으로 갱신했다. DEV에서 검증한
  동일 서버 ZIP의 DEMO 승격, 서버 권위 우편·KST 운영툴, 층과 무관한 플레이어 HP, 10레벨 보너스
  삭제와 장비 주옵션·네르 다음 보상 응답성 수정을 중심으로 설명한다.
- 사용자 컨펌 화면을 `img/shimcheung-053-mail.png`로 보관하고 카드 대표 화면에 연결했다.
- 공개 WebGL 후보를 Unity 6의 0.5.3 DEMO release build로 교체했다. 파일 8개, 총 89.68 MiB이며
  `index.html`의 `productVersion`은 `0.5.3`이다. 로컬 HTTP에서 로더 완료, 405×720의 정확한 9:16,
  타이틀 `v0.5.3 · DEMO`, 브라우저 오류 0을 확인했다. Unity의 기존 filesystem deprecation과
  사용하지 않는 FSR 보조 패스 경고 2건은 남는다.
- Windows 다운로드는 portfolio release `abyss-v0.5.3`의
  `Shimcheung-v0.5.3-win64.zip`을 가리킨다. ZIP은 153.84 MiB, SHA-256
  `CA6B8FD80C3CFDF4415CC9B57FB88CFB027747349AF4808E0D7FF625C8804A9F`다.
- 아직 이 단락 작성 시점에는 GitHub push·Release 생성·공개 Pages fresh HTTP 확인 전이다.
  공개 확인이 끝나면 별도 완료 기록을 위에 추가한다.

## 심층 v0.5.2.2 서버 저장·보상 안정화 릴리스 — 2026-08-14

- `data.js`의 심층 카드를 한국어·영어·일본어 모두 v0.5.2.2 기준으로 갱신했다. 일반 저장에 밀리던
  네르 보상 기아, 같은 operation ID 재시도, 서버 확정 revision, 장비 삭제 권한과 before/desired
  복구 스냅샷을 이번 버전의 중심으로 설명한다.
- 대표 화면은 `img/shimcheung-0522-ner-inventory.png`와
  `img/shimcheung-0522-ner-reward.png` 두 장이다. 자동 분해·장비 가방과 서버 확정 보상이라는
  v0.5.2.2의 실제 플레이 아이덴티티를 사용했다.
- 공개 WebGL 후보를 Unity 6의 0.5.2.2 STAGING release build로 교체했다. 파일 8개, 총
  89.72 MiB이며 `index.html`의 `productVersion`은 `0.5.2.2`다.
- Windows 다운로드는 공개 portfolio release `abyss-v0.5.2.2`의
  `Shimcheung-v0.5.2.2-win64.zip`을 가리킨다. ZIP은 153.80 MiB, SHA-256
  `FBFF37B4F36841EA68D40295109DAFFDEC0339B3DBB3EB99E7AB9E242F9D4D52`다.
- 로컬 브라우저에서 카드·이미지·다운로드/리뷰 링크와 한국어·영어·일본어 제목을 확인했다. WebGL은
  로더 완료, 정확한 9:16 캔버스, 타이틀의 `v0.5.2.2 · STAGING`과 브라우저 오류 0건을 확인했다.
  공개 GitHub Pages 배포도 성공했고 fresh HTTP에서 v0.5.2.2 카드 데이터와 WebGL index를 확인했다.
  공개 WebGL은 브라우저에서도 로더 완료, 정확한 9:16, `v0.5.2.2 · STAGING`, 오류 0건이었다.
  공개 리뷰 페이지의 대표 이미지 두 장도 원본 크기로 로드됐다.
- 현재 공개 DEMO와 Unity Editor는 같은 PlayFab 서버 자원을 사용한다. DEV/DEMO 분리는 다음 필수
  운영 패치 0.5.2.3이며, 그 전 서버 변경은 공개 구버전과 역호환해야 한다.

## 심층 v0.5.2.1 장비 파밍·서버 한계 갱신 — 2026-08-14

- `data.js`의 심층 카드를 한국어·영어·일본어 모두 v0.5.2.1 기준으로 갱신했다. v0.5.2의 UID 장비,
  7부위, 가방·네르·자동 분해와 Economy V2 저장 구조, v0.5.2.1의 Entity Object 용량·Economy
  batch·네르 보상 장애 복구를 함께 설명한다.
- 공개 WebGL을 Unity 6의 0.5.2.1 STAGING release build로 교체했다. 파일 8개, 총 89.65 MiB이며
  `index.html`의 `productVersion`은 `0.5.2.1`이다.
- Windows 다운로드는 공개 portfolio release `abyss-v0.5.2.1`의
  `Shimcheung-v0.5.2.1-win64.zip`을 가리킨다. ZIP은 153.80 MiB, SHA-256
  `6BBF6288466B69B4D35AE4F380B6302EB52A3406106E2686ED76CED8B4F35B10`이다.
- 개발 리뷰는 누락됐던 0.5.2 기능 리뷰와 0.5.2.1 서버 한계 리뷰를 모두 게시한다. 카드의 GitHub
  버튼은 상세 0.5.2.1 페이지를 연다.
- 로컬 브라우저에서 개인 프로젝트 카드, download/review 링크, 한국어·영어·일본어 렌더를 확인했고
  JavaScript 오류는 0개였다. WebGL도 로더 완료, 405×720의 정확한 9:16 캔버스, 타이틀의
  `v0.5.2.1 · STAGING`과 브라우저 오류 0을 확인했다. GitHub Pages 배포 뒤 공개 카드의 download·review
  링크와 공개 WebGL 로더 완료, 405×720의 9:16 캔버스, 오류 0도 다시 확인했다.
- 현재 공개 DEMO와 Unity Editor가 같은 PlayFab title/Function App을 사용한다. 0.5.2.2에서
  DEV/DEMO 환경을 분리하기 전까지 서버 변경은 공개 클라이언트와 역호환해야 한다.

## 변경

- `data.js`의 심층 항목을 한국어·영어·일본어 모두 v0.3.3 기준으로 갱신했다.
- 퀵슬롯 선택·장착·쿨다운 UX, 스킬별 시전 코로나, 검 투척 잔상, 고속 휠윈드 후면 모션, 폭주 오라, 설정/HUD/보스 연출 개선을 강조했다.
- `img/shimcheung-033-skill-casting.png`는 프로젝트의 1080×1920 전체 화면 캡처를 사용했다. 62×31px 임시 조각은 사용하지 않았다.
- `game/abyss/`에 Unity 6 WebGL 프로덕션 빌드를 배치하고 카드의 플레이 링크를 연결했다.
- 기존 v0.3 아키텍처 PDF는 당시 구조 기록으로 유지했다. 구조 리팩터링은 v0.3.3에 포함하지 않으며 0.4부터 진행한다.

## 검증

- `node --check data.js` 통과.
- 로컬 HTTP에서 WebGL 로더 완료, 9:16 캔버스 생성, v0.3.3 게임 제목 표시와 오류 로그 0을 확인했다.
- GitHub Pages는 `main` 루트 배포 관례를 따른다.

## 미검증·위험

- WebGL은 모바일 세로 뷰포트에서 로딩과 캔버스 생성을 확인했지만 장시간 플레이·브라우저별 성능은 추가 확인이 필요하다.
- 시작 시 URP가 미사용 FSR 보조 패스를 초기화하며 EASU 셰이더 미지원 경고를 남긴다. 프로젝트 필터는 `Linear`이고 패키지 소스상 이 경로에서는 FSR 패스를 실행하지 않는다.
- 기존 PDF는 0.3 당시 구조 회고이므로 0.4 리팩터링 이후 별도 최신화가 필요할 수 있다.

## 심층 v0.5.1 포트폴리오 갱신 — 2026-08-13

- `data.js`의 심층 카드를 한국어·영어·일본어 모두 v0.5.1 기준으로 갱신했다.
- 새 대표 이미지는 승인 타이틀 키아트 `img/shimcheung-051-title.png`와 최신 인게임 메인 UI
  `img/shimcheung-051-main-ui.png`다.
- Windows 다운로드는 비로그인 방문자도 받을 수 있도록 공개 포트폴리오 저장소의
  `abyss-v0.5.1` 릴리스 자산을 가리킨다. 같은 ZIP은 게임 저장소의 정식 `v0.5.1` 릴리스에도 보관한다.
- 카드의 WebGL 플레이 링크를 v0.5.1로 교체했다. 공개 WebGL은 `UNITY_WEBGL`에서만 개발 게스트
  생성을 허용하는 STAGING 릴리스이며, Brotli와 브라우저 해제 fallback을 함께 사용한다.
- 로컬 Chrome에서 새 guest origin의 PlayFab/CORS 오류 0건과 인트로·대기 영상 2개 요청을 확인했다.
  타이틀 MP4는 `StreamingAssets` URL로 같은 origin에서 브라우저 스트리밍한다.
- 최종 WebGL 빌드는 88.27MB다. 참조되지 않은 구형 타이틀 영상 3개와 키아트 1개는 원본을
  `Assets/_Archive/Title`에 보존하고 `Resources` 강제 포함에서 제외했다.
- 다음 게임 버전은 전리품 보관함과 일반·희귀 아이템 파밍 1차인 v0.5.2로 표시했다.
- v0.5.1 첫 Windows ZIP에서 빈 게스트 서버와 오래된 로컬 revision 조합이 영구 충돌하던 문제를
  수정했다. 공개 다운로드는 `Shimcheung-v0.5.1-win64-r2.zip`으로 교체했으며 SHA-256은
  `DACACCDE475C77D85C709C0B39F8E891B6856E665D63CE13A86ACE13531F4746`이다.
- 개발 리뷰 링크는 새로 배포한 `abyss-review-book/reviews/0.5.1/` 한눈에 보기로 갱신했다.

## 심층 v0.5.1 WebGL 세로 화면 핫픽스 — 2026-08-13

- Unity 기본 WebGL 템플릿이 PC에서 `960×600` 가로 캔버스를 강제해 9:16 게임 화면과 가방 UI가
  좁은 세로 띠로 레터박싱되던 배포를 교체했다.
- 새 `Portrait` 템플릿은 PC·모바일 모두 브라우저 영역 안에서 9:16을 유지하고 바깥 배경을 검정으로
  고정한다. Unity 초기 렌더 기준도 `540×960`으로 변경했다.
- 로컬 Chrome 2844×1412 영역에서 표시 캔버스 794.58×1412.59(정확한 9:16), 내부 렌더 타깃
  1073×1907, 브라우저 오류 0을 확인했다. PlayFab 로그인·CloudScript와 타이틀 MP4 2개도 정상 요청됐다.
