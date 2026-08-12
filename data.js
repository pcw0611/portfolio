// ============================================================
// 사이트 데이터. admin.html 관리 페이지에서 저장하면 이 파일이
// 자동으로 다시 생성됩니다. 직접 수정해도 됩니다.
// ============================================================

const ADMIN_PASSWORD = "1234"; // 관리 페이지 비밀번호

const PROFILE = {
  "name": "박찬욱",
  "tagline": "Game Client Programmer",
  "name_en": "Chanwook Park",
  "name_ja": "パク・チャヌク",
  "githubUrl": "https://github.com/pcw0611",
  "email": "pcw0611@gmail.com"
};

const TABS = [
  {
    "id": "commercial",
    "label": "상용화 게임",
    "label_en": "Commercial games",
    "label_ja": "商用ゲーム"
  },
  {
    "id": "personal",
    "label": "개인 프로젝트",
    "label_en": "Personal projects",
    "label_ja": "個人プロジェクト"
  }
];

const PROJECTS = [
  {
    "category": "commercial",
    "title": "이사만루",
    "subtitle": "모바일 온라인 야구 게임 · 개발 및 라이브 서비스",
    "youtubeId": "BhuakHSvScs",
    "tags": [
      "Unity"
    ],
    "period": "2020.02 – 2021.02",
    "role": "클라이언트 · 라이브 서비스 · 빌드  ·  유지 보수",
    "playUrl": "https://play.google.com/store/apps/details?id=com.gonggames.kbo3.aos.google.kr&hl=ko",
    "githubUrl": "",
    "blocks": [
      {
        "type": "text",
        "text": "- 미션, 업적, 경매장 등의 아웃 컨텐츠를 개발\n- 게임 출시 전 프로덕션 기간(1년 5개월)과, 출시 후 라이브 서비스 기간(1년)을 전부 경험"
      }
    ],
    "i18n": {
      "en": {
        "title": "Isaman-ru (Baseball Manager)",
        "subtitle": "Mobile online baseball game · Development and live service",
        "role": "Client · Live service · Build · Maintenance",
        "blocks": {
          "0": "- Developed out-game content such as missions, achievements, and the auction house\n- Experienced both the pre-launch production phase (1 year 5 months) and the post-launch live service phase (1 year)"
        }
      },
      "ja": {
        "title": "イサマンル(野球マネージャーゲーム)",
        "subtitle": "モバイルオンライン野球ゲーム・開発およびライブサービス",
        "role": "クライアント・ライブサービス・ビルド・保守",
        "blocks": {
          "0": "- ミッション、実績、オークション場などのアウトゲームコンテンツを開発\n- ゲームリリース前のプロダクション期間(1年5ヶ月)とリリース後のライブサービス期間(1年)の両方を経験"
        }
      }
    }
  },
  {
    "category": "commercial",
    "title": "쥬니버 스쿨",
    "subtitle": "네이버 IP의 유아용 게임",
    "youtubeId": "Z4ck71ljhqE",
    "tags": [
      "Unity"
    ],
    "blocks": [
      {
        "type": "image",
        "src": "img/1784894104659-images-1.jpg"
      },
      {
        "type": "text",
        "text": "- 네이버 계열사 프리랜서로서 하청 업무 진행\n- 대기업 프로세스 경험 및 30명 이상의 내 · 외부 팀원과 협업\n- 평균 3일~1주 단위로 1개의 강의를 개발함"
      }
    ],
    "period": "2021.12 – 2023.02",
    "role": "클라이언트 · 1인",
    "playUrl": "",
    "githubUrl": "",
    "i18n": {
      "en": {
        "title": "Junior Naver School",
        "subtitle": "Naver IP kids' game",
        "role": "Client · Solo",
        "blocks": {
          "1": "- Took on this project as a subcontract through a freelance role at a Naver affiliate\n- Collaborated with 30+ internal and external team members under a large-company process\n- Developed roughly one lesson every 3 days to a week"
        }
      },
      "ja": {
        "title": "ジュニバー・スクール",
        "subtitle": "NAVER IPの幼児向けゲーム",
        "role": "クライアント・個人",
        "blocks": {
          "1": "- NAVER系列会社のフリーランス業務として下請けで進行\n- 大企業のプロセスで30名以上の社内外チームメンバーと協業\n- 平均3日~1週間単位で1つのレッスンを開発"
        }
      }
    }
  },
  {
    "category": "commercial",
    "title": "JumpingPeng",
    "subtitle": "암호화폐 KAIA를 연동한 P2E 웹 게임 (탈중앙화 앱)",
    "youtubeId": "ucpYRTGWh7Y",
    "tags": [
      "Unity",
      "WebGL"
    ],
    "blocks": [
      {
        "type": "image",
        "src": "img/1784896278226-ghzipyvaeaa-qvy.jpg"
      },
      {
        "type": "text",
        "text": "- LINE과 협업하여 DApp Market 출시 시점에 스타터로 탈중앙화 앱 개발\n- 이더리움 기반 KAIA 암호화폐와 연동\n- 기존 모바일에서 구동되던 3D 게임을 웹 게임으로 마이그레이션하여, 최적화를 진행하는 작업\n- 각종 DApp 관련 Third Party 적용 및 협업 경험"
      }
    ],
    "period": "2024.08 – 2025.01",
    "role": "클라이언트 · 서버 · 빌드 · 마켓 출시 · 1인",
    "playUrl": "",
    "githubUrl": "",
    "i18n": {
      "en": {
        "subtitle": "P2E web game integrated with the KAIA cryptocurrency (decentralized app)",
        "role": "Client · Server · Build · Market launch · Solo",
        "blocks": {
          "1": "- Collaborated with LINE to develop a decentralized app as a launch-time starter for the DApp Market\n- Integrated with the Ethereum-based KAIA cryptocurrency\n- Migrated a 3D game originally built for mobile into a web game, along with optimization work\n- Experience integrating and collaborating with various DApp-related third parties"
        }
      },
      "ja": {
        "subtitle": "暗号資産KAIAと連携したP2Eウェブゲーム(分散型アプリ)",
        "role": "クライアント・サーバー・ビルド・マーケットリリース・個人",
        "blocks": {
          "1": "- LINEと協業し、DApp Marketリリース時のスターターとして分散型アプリを開発\n- イーサリアムベースの暗号資産KAIAと連携\n- 既存のモバイル向け3DゲームをWebゲームに移行し、最適化を実施\n- 各種DApp関連のサードパーティ連携・協業経験"
        }
      }
    }
  },
  {
    "category": "commercial",
    "title": "Bubble Galaxia",
    "subtitle": "퍼즐 액션 로그라이크 게임",
    "youtubeId": "1Y1CjXFrXMg",
    "tags": [],
    "blocks": [
      {
        "type": "text",
        "text": "- 기획/아트/프로그래밍 각 1명 씩 소규모 개발\n- 퍼즐 버블 베이스에 액션 턴제 로그라이크를 첨가한 게임\n- 초기 프레임워크 구성 및 프로그래밍 전체 리딩\n- Microsoft PlayFab을 통해 DB/Server 구성"
      }
    ],
    "period": "2024.02 – 2024.08",
    "role": "클라이언트 · 서버 · 빌드 · 마켓 출시 · 1인",
    "playUrl": "https://play.google.com/store/apps/details?id=com.idanote.bubblegalaxia&hl=ko",
    "githubUrl": "",
    "i18n": {
      "en": {
        "subtitle": "Puzzle action roguelike game",
        "role": "Client · Server · Build · Market launch · Solo",
        "blocks": {
          "0": "- Small team of one each for planning, art, and programming\n- A puzzle-bubble game with turn-based action roguelike elements added\n- Set up the initial framework and led all of the programming\n- Built the DB/server using Microsoft PlayFab"
        }
      },
      "ja": {
        "subtitle": "パズルアクションローグライクゲーム",
        "role": "クライアント・サーバー・ビルド・マーケットリリース・個人",
        "blocks": {
          "0": "- 企画/アート/プログラミング各1名の小規模開発\n- パズルバブルをベースにアクションターン制ローグライクを加えたゲーム\n- 初期フレームワークの構築とプログラミング全体のリード\n- Microsoft PlayFabを通じたDB/サーバー構築"
        }
      }
    }
  },
  {
    "category": "personal",
    "title": "심층 深層 v0.3.3 : 쿼터뷰 오토 아레나",
    "subtitle": "스킬의 선택·시전·쿨다운을 한눈에 읽게 만든 방치형 핵앤슬래시",
    "youtubeId": "",
    "tags": [
      "Unity 6",
      "URP 2D",
      "Mobile UI/UX",
      "Auto Battler",
      "AI-assisted Development"
    ],
    "blocks": [
      {
        "type": "image",
        "src": "img/shimcheung-033-skill-casting.png",
        "layout": "portrait",
        "caption": "현재 · v0.3.3 — 스킬별 시전 코로나, 퀵슬롯 쿨다운, 설정/HUD를 다듬은 최신 개발 화면"
      },
      {
        "type": "text",
        "text": "v0.3.3에서는 4칸 스킬 퀵슬롯의 선택·장착·클릭 피드백과 쿨다운 마스크를 다시 설계했습니다. 시전 중에는 검 투척이 금색, 휠윈드가 청백색, 폭주가 적색 코로나로 점화되어 자동 전투에서도 어떤 스킬이 발동했는지 즉시 읽힙니다."
      },
      {
        "type": "text",
        "text": "검 투척 전용 검과 잔상, 고속 휠윈드의 전·후면 모션과 회전 VFX, 캐릭터 크기의 폭주 오라를 제작 리소스로 연결했습니다. 설정 팝업, 전투 HUD, 미니맵, 보스 HP·카메라와 좌우 조우 동선도 함께 다듬었습니다. 기존 진행과 경제는 유지했고, 큰 구조 리팩터링과 D2식 아이템은 0.4부터 시작합니다."
      },
      {
        "type": "image",
        "src": "img/shimcheung-arena.png",
        "caption": "초기 프로토타입 — 도형 중심으로 전투 루프와 가독성을 먼저 검증하던 단계"
      },
      {
        "type": "pdf",
        "src": "img/shimcheung-quarterview-arena.pdf"
      }
    ],
    "period": "2026.08 · 모바일 출시 목표로 개발 중 · v0.3.3 공개 빌드",
    "role": "게임 기획 · 전투 설계 · 클라이언트 · UI/VFX 디렉팅 · 1인",
    "playUrl": "game/abyss/",
    "downloadUrl": "https://github.com/pcw0611/portfolio/releases/download/abyss-v0.3.3/Shimcheung-v0.3.3-win64.zip",
    "githubUrl": "https://github.com/pcw0611/abyss",
    "i18n": {
      "en": {
        "title": "Shimcheung v0.3.3 : Quarter-View Auto Arena",
        "subtitle": "An idle hack-and-slash where skill selection, casting, and cooldowns read at a glance",
        "period": "2026.08 · In development for mobile release · v0.3.3 public build",
        "role": "Game design · Combat design · Client · UI/VFX direction · Solo",
        "blocks": [
          null,
          "v0.3.3 redesigns the four-slot skill bar with explicit selection and equip states, immediate tap feedback, and readable cooldown masks. Gold, blue-white, and red casting coronas distinguish Sword Throw, Whirlwind, and Frenzy even during hands-off combat.",
          "Authored assets now drive Sword Throw trails, high-speed front/back Whirlwind motion and VFX, and a character-scale Frenzy aura. Settings, combat HUD, minimap, boss health/camera, and the left-to-right boss encounter were refined while progression and economy stayed intact. The large structural refactor and D2-style items start in 0.4.",
          null,
          null
        ]
      },
      "ja": {
        "title": "深層 v0.3.3 : クォータービュー・オートアリーナ",
        "subtitle": "スキルの選択・発動・クールダウンを一目で読める放置型ハクスラ",
        "period": "2026.08 · モバイル版リリースに向けて開発中 · v0.3.3 公開ビルド",
        "role": "ゲーム企画・戦闘設計・クライアント・UI/VFXディレクション・個人",
        "blocks": [
          null,
          "v0.3.3では4枠のスキルクイックスロットに、選択・装着状態、即時タップフィードバック、読みやすいクールダウンマスクを追加しました。剣投げは金色、ワールウィンドは青白色、フレンジーは赤色のコロナで発動を区別します。",
          "剣投げの残像、高速ワールウィンドの前後モーションと回転VFX、キャラクターサイズのフレンジーオーラを制作素材で実装しました。設定、戦闘HUD、ミニマップ、ボスHP・カメラ、左右の遭遇動線も改善し、進行と経済は維持しています。大規模な構造リファクタリングとD2型アイテムは0.4から開始します。",
          null,
          null
        ]
      }
    }
  },
  {
    "category": "personal",
    "title": "우당탕 타워",
    "subtitle": "AI 협업으로 설계·검증한 소셜 3D 블록 스택 게임",
    "youtubeId": "ikgGALcqy00",
    "videoAspect": "short",
    "tags": [
      "TypeScript",
      "Three.js",
      "cannon-es",
      "WebGL",
      "AI-assisted Development"
    ],
    "blocks": [
      {
        "type": "pdf",
        "src": "img/udangtang-tower-ai-collaboration.pdf"
      }
    ],
    "period": "2026.07 – 진행 중",
    "role": "게임 기획 · 클라이언트/물리 · AI 개발 디렉팅 · 1인",
    "playUrl": "https://udangtang-tower.pcw0611.workers.dev",
    "githubUrl": "https://github.com/pcw0611/udangtang-tower",
    "i18n": {
      "en": {
        "title": "Udangtang Tower",
        "subtitle": "A social 3D block-stacking game designed and validated through AI collaboration",
        "period": "2026.07 – In progress",
        "role": "Game design · Client/physics · AI development direction · Solo",
        "blocks": {}
      },
      "ja": {
        "title": "ウダンタンタワー",
        "subtitle": "AI協業で設計・検証したソーシャル3Dブロック積みゲーム",
        "period": "2026.07 – 開発中",
        "role": "ゲーム企画・クライアント/物理・AI開発ディレクション・個人",
        "blocks": {}
      }
    }
  },
  {
    "category": "personal",
    "title": "네온 아르카나 : 사이버 리프트",
    "subtitle": "탄막이 쏟아지는 하드코어 뱀서라이크",
    "youtubeId": "",
    "tags": [
      "AI-assisted Development"
    ],
    "blocks": [
      {
        "type": "image",
        "src": "img/1784945498488-12345.png"
      },
      {
        "type": "text",
        "text": "게임 플레이 화면\n\n어려운 탄막 게임과 '뱀파이어 서바이벌'에 감명 받아 만든 게임입니다\n난이도는 어려운 것이 맞습니다! 도전해 보세요!"
      },
      {
        "type": "image",
        "src": "img/1784945015415-12345.png"
      },
      {
        "type": "text",
        "text": "어드민 페이지 구성"
      }
    ],
    "period": "진행 중",
    "role": "",
    "playUrl": "https://neon-arcana-survivors.pcw0611.workers.dev/",
    "githubUrl": "https://github.com/pcw0611/neon-arcana-survivors/blob/main/GAME_GUIDE.md"
  },
  {
    "category": "personal",
    "title": "Admin 페이지 구성",
    "subtitle": "게임 밸런스와 릴리스를 안전하게 다루기 위한 로컬 전용 운영 콘솔",
    "youtubeId": "",
    "tags": [
      "TypeScript",
      "Cloudflare D1",
      "Release Pipeline",
      "AI-assisted Development"
    ],
    "blocks": [
      {
        "type": "image",
        "src": "img/1785824786375-img.png"
      },
      {
        "type": "pdf",
        "src": "img/udangtang-tower-admin-case-study.pdf"
      }
    ],
    "period": "2026.08",
    "role": "게임 운영 도구 설계 · 밸런스 데이터 구조 · 릴리스 안전장치 · 1인",
    "playUrl": "admin-demo.html",
    "githubUrl": "https://github.com/pcw0611/udangtang-tower/blob/main/ADMIN_GUIDE.md",
    "i18n": {
      "en": {
        "title": "Udangtang Tower Local Admin",
        "subtitle": "A local-only operations console for safe game balancing and releases",
        "period": "2026.08",
        "role": "Game operations tooling · Balance data design · Release safeguards · Solo",
        "blocks": {}
      },
      "ja": {
        "title": "ウダンタンタワー ローカル管理ツール",
        "subtitle": "ゲームバランスとリリースを安全に扱うローカル専用運用コンソール",
        "period": "2026.08",
        "role": "ゲーム運用ツール設計・バランスデータ構造・リリース安全装置・個人",
        "blocks": {}
      }
    }
  },
  {
    "category": "personal",
    "title": "데이터 주도 콘텐츠 구조",
    "subtitle": "게임 콘텐츠를 코드의 enum에서 떼어내 검증 가능한 데이터 스냅샷으로 옮긴 리팩터링",
    "youtubeId": "",
    "tags": [
      "Unity 6",
      "Architecture",
      "Data-Driven Design",
      "Google Sheets Pipeline",
      "Save Migration",
      "Human-in-the-loop AI"
    ],
    "blocks": [
      {
        "type": "text",
        "text": "심층 0.4는 신규 콘텐츠를 하나도 넣지 않은 리팩터링 버전입니다. 강화·스킬·적·존·보스가 코드의 enum과 배열 위치에 묶여 있어서, 콘텐츠를 한 줄 늘릴 때마다 enum·정의표·세이브 배열을 함께 고쳐야 했습니다. AI 보조로 빠르게 쌓아 올린 코드를 다시 읽다가, 지금은 동작하지만 콘텐츠가 늘고 담당자가 바뀌면 반드시 어긋나는 구조라고 판단해 방향을 되돌렸습니다."
      },
      {
        "type": "text",
        "text": "값의 성격에 따라 소유자를 셋으로 나눴습니다. 콘텐츠는 안정 문자열 ID를 정본으로 쓰는 데이터 행, 실행은 등록된 behavior/effect/visual 계약, 여러 계층이 공유하는 구조 규칙은 명명된 시스템 계약입니다. 결과적으로 콘텐츠 enum 직접 참조 228곳이 0곳이 되었고, 기존 행동을 재사용하는 콘텐츠는 코드 수정 없이 데이터 행만 추가하면 됩니다."
      },
      {
        "type": "text",
        "text": "제작은 Google Sheets에서 하고, Unity 메뉴 하나가 11개 탭을 내려받아 전체 검증한 뒤 CSV와 런타임 JSON을 원자적으로 교체합니다. 하나라도 검증에 실패하면 기존 데이터를 그대로 유지합니다. manifest는 파일 목록이 아니라 계약이라, 도메인별 콘텐츠 버전·SHA-256·의존성을 로드 전에 확인해 서로 다른 세대의 데이터가 섞이는 상황을 차단합니다."
      },
      {
        "type": "text",
        "text": "사람이 편집하는 데이터에는 잘못된 값이 반드시 들어오므로, 모든 Player 빌드 앞에 validator를 두었습니다. 잘못된 schema·체크섬·중복 ID·누락 현지화·미등록 behavior/visual·도메인 간 참조 붕괴·버전 혼합·의존성 누락 10종을 차단하고, v6→v7 세이브 변환과 롤백 미러, 미래 ID 보존, 결정론적 층 구성, 의존성 주입을 함께 고정합니다. 이 검증이 실제로 결함 하나를 사람보다 먼저 발견했습니다."
      },
      {
        "type": "text",
        "text": "총 코드량은 오히려 늘었습니다. 늘어난 쪽이 검증·호환·에디터 도구이기 때문에 'LOC 감소'가 아니라 '무엇이 바뀌기 쉬워졌는가'로 정리했습니다. 세이브는 v7에서 안정 ID를 정본으로 쓰면서 구버전 ordinal 배열을 롤백 미러로 유지해, 구버전에서 실행해도 진행이 깨지지 않고 모르는 미래 ID는 보존합니다."
      }
    ],
    "period": "2026.08 · 시스템 골자 리팩터링 · schema v3 / 0.4.0-core.7",
    "role": "아키텍처 설계 · 구현 · 데이터 파이프라인 · 검증 · 1인",
    "docsUrl": "case/abyss-data-driven/",
    "githubUrl": "https://github.com/pcw0611/abyss",
    "i18n": {
      "en": {
        "title": "Shimcheung 0.4 : Data-Driven Content Architecture",
        "subtitle": "Refactoring game content out of C# enums into a verifiable data snapshot",
        "period": "2026.08 · Core systems refactor · schema v3 / 0.4.0-core.7",
        "role": "Architecture · Implementation · Data pipeline · Verification · Solo",
        "blocks": [
          "Shimcheung 0.4 shipped no new content on purpose. Upgrades, skills, enemies, zones, and bosses were bound to C# enums and array positions, so adding a single content row meant editing the enum, the definition table, and the save array together. Reviewing code that had been assembled quickly with AI assistance, I judged that it worked today but would silently drift as content grew and hands changed, and reversed the direction.",
          "Ownership was split three ways by the nature of the value: content became data rows keyed by stable string IDs, execution became registered behavior/effect/visual contracts, and structural rules shared across layers became named system contracts. Direct references to content enums went from 228 to 0, and content that reuses an existing behavior now needs a data row instead of a code change.",
          "Authoring happens in Google Sheets. One Unity menu downloads all 11 tabs, validates the whole workbook, and atomically replaces both the CSV source and the runtime JSON — if any tab fails, the existing data is kept untouched. The manifest is a contract rather than a file list: it carries per-domain content version, SHA-256, and dependencies, so a partially updated snapshot is rejected before load.",
          "Because human-edited data will eventually be wrong, a validator runs before every player build. It rejects bad schema, checksum mismatches, duplicate IDs, missing localization, unregistered behavior/visual IDs, broken cross-domain references, mixed versions, and missing dependencies, and it pins the v6→v7 save migration, rollback mirror, future-ID preservation, deterministic floor composition, and dependency injection. This suite caught a real defect before a human did.",
          "Total line count went up, not down. The growth is in verification, compatibility, and editor tooling, so the result is framed as what became easy to change rather than as an LOC reduction. Saves moved to v7 with stable IDs as the source of truth while keeping the legacy ordinal arrays as a rollback mirror, so an older build still loads the save and unknown future IDs survive the round trip."
        ]
      },
      "ja": {
        "title": "深層 0.4 : データ駆動のコンテンツ構造",
        "subtitle": "ゲームコンテンツをenumから切り離し、検証可能なデータスナップショットへ移した設計改修",
        "period": "2026.08 · システム基盤のリファクタリング · schema v3 / 0.4.0-core.7",
        "role": "アーキテクチャ設計・実装・データパイプライン・検証・個人",
        "blocks": [
          "深層0.4は新規コンテンツを一切追加しないリファクタリング版です。強化・スキル・敵・ゾーン・ボスがコードのenumと配列位置に縛られており、コンテンツを1行増やすたびにenum・定義表・セーブ配列を同時に修正する必要がありました。AI支援で素早く積み上げたコードを読み直し、今は動くがコンテンツが増え担当者が変われば必ず破綻する構造だと判断して方向を戻しました。",
          "値の性質に応じて所有者を三つに分けました。コンテンツは安定した文字列IDを正とするデータ行、実行は登録されたbehavior/effect/visual契約、複数層が共有する構造規則は名前を持つシステム契約です。コンテンツenumの直接参照は228箇所から0になり、既存の挙動を再利用するコンテンツはコード修正なしでデータ行の追加だけで済みます。",
          "制作はGoogle Sheetsで行い、Unityのメニュー一つで11タブを取得して全体を検証し、CSVとランタイムJSONを原子的に差し替えます。一つでも検証に失敗すれば既存データはそのまま維持されます。manifestはファイル一覧ではなく契約であり、ドメインごとのコンテンツバージョン・SHA-256・依存関係をロード前に確認して、世代の異なるデータが混ざる状況を防ぎます。",
          "人が編集するデータには必ず誤りが入るため、すべてのPlayerビルドの前にvalidatorを置きました。不正なschema、チェックサム不一致、ID重複、ローカライズ欠落、未登録のbehavior/visual ID、ドメイン間参照の破綻、バージョン混在、依存関係欠落の10種を遮断し、v6→v7のセーブ変換とロールバックミラー、将来IDの保持、決定論的な階層構成、依存性注入も固定します。この検証は実際に人より先に不具合を一つ発見しました。",
          "総コード量はむしろ増えました。増えたのは検証・互換・エディタツールなので、「LOC削減」ではなく「何が変更しやすくなったか」として整理しています。セーブはv7で安定IDを正としつつ、旧版のordinal配列をロールバックミラーとして保持し、旧ビルドで起動しても進行が壊れず、未知の将来IDも保存されます。"
        ]
      }
    }
  },
  {
    "category": "personal",
    "isStudentWork": true,
    "title": "바람의 나라",
    "subtitle": "C++ 콘솔 모작",
    "youtubeId": "_AudzWXEM6A",
    "tags": [
      "C++",
      "Win32 API",
      "GDI"
    ],
    "blocks": [
      {
        "type": "pdf",
        "src": "img/baram-tech-doc.pdf"
      }
    ],
    "period": "",
    "role": "",
    "playUrl": "https://github.com/pcw0611/codes/releases/download/baram-v1.0/Baram_Playable_Win64.zip",
    "githubUrl": "https://github.com/pcw0611/codes/tree/master/projects/baram_clone"
  },
  {
    "category": "personal",
    "isStudentWork": true,
    "title": "메이플스토리 : 메르세데스",
    "subtitle": "Win32 · GDI+ 액션 RPG 프로토타입",
    "youtubeId": "RkhODsY-uac",
    "tags": [
      "C++",
      "Win32 API",
      "GDI+"
    ],
    "blocks": [
      {
        "type": "pdf",
        "src": "img/maple-tech-doc.pdf"
      }
    ],
    "period": "",
    "role": "",
    "playUrl": "",
    "githubUrl": ""
  },
  {
    "category": "personal",
    "isStudentWork": true,
    "title": "길건너 친구들",
    "subtitle": "카피 작품",
    "youtubeId": "wvwBp1RAkI0",
    "tags": [
      "Unity"
    ],
    "blocks": [
      {
        "type": "pdf",
        "src": "img/crossy-road-tech-doc.pdf"
      }
    ],
    "period": "",
    "role": "",
    "playUrl": "",
    "githubUrl": "https://github.com/pcw0611/codes/tree/master/projects/crossy_road_clone"
  },
  {
    "category": "personal",
    "isStudentWork": true,
    "title": "던전앤파이터 프로토타입",
    "subtitle": "Win32 · Direct2D 액션 RPG 프로토타입 모작 (미완성)",
    "youtubeId": "VURPbOFGN4M",
    "tags": [
      "C++",
      "Win32 API",
      "MFC"
    ],
    "blocks": [
      {
        "type": "pdf",
        "src": "img/dnf-tech-doc.pdf"
      }
    ],
    "period": "",
    "role": "",
    "playUrl": "",
    "githubUrl": ""
  },
  {
    "category": "personal",
    "title": "Bang Dream!",
    "subtitle": "카피 작품",
    "youtubeId": "K6PNCR38nDU",
    "tags": [
      "Unity"
    ],
    "blocks": [
      {
        "type": "pdf",
        "src": "img/bangdream-tech-doc.pdf"
      }
    ],
    "period": "",
    "role": "",
    "playUrl": "",
    "githubUrl": "https://github.com/pcw0611/codes/tree/master/projects/bangdream_clone"
  },
  {
    "category": "personal",
    "title": "명일방주 프로토타입",
    "subtitle": "리소스 활용 턴제 전투 프로토타입",
    "youtubeId": "",
    "tags": [
      "Unity",
      "UniRx"
    ],
    "blocks": [
      {
        "type": "text",
        "text": "- '명일방주(Arknights)' IP 리소스를 활용해 턴제 수집형 RPG의 핵심 시스템을 상용화 게임 수준의 테크닉으로 구현한 개인 프로토타입 (비상업적 · 포트폴리오 목적)\n- 전투 · 필살기 · 인게임 다이얼로그, 세 시스템을 각각 버전을 나눠 순차적으로 개발"
      },
      {
        "type": "image",
        "src": "img/arknights-v00-intro.gif"
      },
      {
        "type": "image",
        "src": "img/arknights-v00-battle.gif"
      },
      {
        "type": "text",
        "text": "- v0.0: 인트로 연출과 초기 전투 화면 목업으로 시작한 최초 프로토타입"
      },
      {
        "type": "text",
        "text": "- 전투는 상태 머신(대기 · 전투 · 다음 라운드 · 승리 · 패배)으로 라운드를 진행하며, 캐릭터별로 시간에 따라 쌓이는 턴 포인트(TP)가 가득 차면 자동으로 공격 차례가 옴\n- 공격할 때마다 별도의 스킬 포인트(SP)가 쌓이고, SP가 일정치 이상이면 다음 턴이 일반 공격 대신 필살기로 전환되는 방식으로 구현"
      },
      {
        "type": "image",
        "src": "img/arknights-v01-battle.gif"
      },
      {
        "type": "text",
        "text": "- 필살기는 카메라 줌인 → 컷신 영상 재생 → 줌아웃 → 모션 · 이펙트 · 데미지 적용의 5단계 상태로 연출되며, UniRx의 반응형 스트림(UpdateAsObservable)으로 각 단계 전환과 카메라 보간을 처리\n- 피격 시 Spine 스켈레톤의 컬러 채널을 보간해 히트 플래시를, 사망 시에는 애니메이션이 실제로 끝나는 시점을 관찰해 그 다음에 오브젝트를 정리하도록 구현"
      },
      {
        "type": "image",
        "src": "img/arknights-v01-lethal.gif"
      },
      {
        "type": "text",
        "text": "- v0.1: TP가 가득 차면 자동으로 전투가 진행되고, SP가 다 쌓이면 위 영상처럼 컷신과 함께 필살기가 발동"
      },
      {
        "type": "image",
        "src": "img/arknights-v02-mechanism.png"
      },
      {
        "type": "text",
        "text": "- 인게임 다이얼로그는 시나리오 작성자가 쓴 대본(텍스트 파일)을 한 줄씩 커맨드로 변환해 큐에 쌓아두고 순서대로 실행하는 커맨드 패턴으로 구현\n- 배경 · 캐릭터 지정 커맨드는 자동으로 다음 줄로 넘어가고, 대사(Talk) 커맨드는 사용자가 터치해야 다음으로 진행되도록 커맨드별로 자동 진행 여부를 다르게 처리"
      },
      {
        "type": "image",
        "src": "img/arknights-dialog-demo.gif"
      }
    ],
    "period": "",
    "role": "",
    "playUrl": "",
    "githubUrl": "https://github.com/pcw0611/codes/tree/master/projects/arknights-like"
  }
];

// 태그 색상 계열. 새 태그를 쓰면 여기에 계열만 등록하면 됩니다 (미등록 태그는 회색).
const TAG_GROUP = {
  "C#": "custom1",
  "C++": "custom1",
  "UGUI": "engine",
  "JavaScript": "custom1",
  "WebGL": "engine",
  "SVN": "ai",
  "CDN": "ai",
  "GitHub": "ai",
  "Claude": "perf",
  "2D": "engine",
  "3D": "engine",
  "AdMob": "etc",
  "AdSense": "etc",
  "UniRx": "engine",
  "UniTask": "engine",
  "Slack": "ai",
  "Python": "custom1",
  "IAP": "etc",
  "Cursor": "perf",
  "Visual Studio": "custom2",
  "Rider": "custom2",
  "Visual Studio Code": "custom2",
  "MySql": "custom1",
  "DoTween": "engine",
  "Sign in with Apple": "custom3",
  "NAVER GAMEPOT": "custom3",
  "ThinkingData": "custom3",
  "PlayFab": "custom3",
  "LINE SDK": "custom3",
  "KAIA(Crypto) SDK": "custom3",
  "Line Mini DApp SDK": "custom3",
  "Tencent Cloud CDN": "graphics",
  "Custom Tools": "engine",
  "Unity AI": "engine",
  "iOS": "graphics",
  "Android": "graphics",
  "App Store": "graphics",
  "Google Play": "graphics",
  "Node.js": "custom1",
  "Firebase": "custom3",
  "Asset Bundle": "engine",
  "Sign in with Google": "custom3",
  "Codex": "perf",
  "TypeScript": "etc",
  "Three.js": "etc",
  "cannon-es": "etc",
  "Win32 API": "etc",
  "GDI": "etc",
  "GDI+": "etc",
  "MFC": "etc",
  "Cloudflare D1": "etc",
  "Release Pipeline": "etc",
  "Unity 6": "engine",
  "URP 2D": "engine",
  "Mobile UI/UX": "engine",
  "Human-in-the-loop AI": "perf",
  "Google Sheets Pipeline": "graphics",
  "Architecture": "custom4",
  "Data-Driven Design": "custom4",
  "Save Migration": "custom4",
  "Auto Battler": "custom4"
};

// 기술 스택 카테고리(부모 노드) 목록. 화면에 나오는 순서는 숙련도 기준으로 자동 정렬됩니다.
const TAG_GROUP_ORDER = [
  "engine",
  "graphics",
  "ai",
  "perf",
  "etc",
  "custom1",
  "custom2",
  "custom3",
  "custom4"
];

const TAG_STYLES = {
  "engine": {
    "bg": "#26215C",
    "fg": "#CECBF6",
    "label": "Unity",
    "label_en": "Game engine",
    "label_ja": "ゲームエンジン"
  },
  "graphics": {
    "bg": "hsl(200, 55%, 16%)",
    "fg": "hsl(200, 55%, 78%)",
    "label": "Build & Deployment",
    "label_en": "Build & deploy",
    "label_ja": "ビルド・リリース"
  },
  "ai": {
    "bg": "hsl(340, 55%, 16%)",
    "fg": "hsl(340, 55%, 78%)",
    "label": "Infrastructure & Collaboration",
    "label_en": "Infra & collab",
    "label_ja": "インフラ・共同作業"
  },
  "perf": {
    "bg": "hsl(40, 60%, 16%)",
    "fg": "hsl(40, 60%, 78%)",
    "label": "AI-assisted Development",
    "label_en": "AI tools",
    "label_ja": "AIツール"
  },
  "etc": {
    "bg": "#2C2C2A",
    "fg": "#D3D1C7",
    "label": "Ads & Monetization",
    "label_en": "Ads & monetization",
    "label_ja": "広告・収益化"
  },
  "custom1": {
    "bg": "hsl(227, 100%, 16%)",
    "fg": "hsl(227, 100%, 78%)",
    "label": "Languages",
    "label_en": "",
    "label_ja": ""
  },
  "custom2": {
    "bg": "hsl(76, 90%, 16%)",
    "fg": "hsl(76, 90%, 78%)",
    "label": "IDE",
    "label_en": "",
    "label_ja": ""
  },
  "custom3": {
    "bg": "hsl(299, 100%, 16%)",
    "fg": "hsl(299, 100%, 78%)",
    "label": "Third Party",
    "label_en": "",
    "label_ja": ""
  },
  "custom4": {
    "bg": "hsl(165, 55%, 16%)",
    "fg": "hsl(165, 55%, 78%)",
    "label": "Architecture & Design",
    "label_en": "Architecture & design",
    "label_ja": "設計・アーキテクチャ"
  }
};

// 태그별 숙련도 (0~100). 기술 스택 시각화에서 크기·중심 배치에 사용됩니다.
const TAG_PROFICIENCY = {
  "Unity": 68,
  "C#": 90,
  "JavaScript": 20,
  "VibeCoding": 75,
  "Claude": 55,
  "WebGL": 50,
  "GitHub": 30,
  "CDN": 30,
  "SVN": 25,
  "C++": 40,
  "Unreal": 45,
  "2D": 100,
  "3D": 90,
  "AdMob": 40,
  "AdSense": 40,
  "Launching": 60,
  "Web": 45,
  "UGUI": 100,
  "Python": 30,
  "MySql": 20,
  "Cursor": 40,
  "Visual Studio": 40,
  "Visual Studio Code": 35,
  "Rider": 50,
  "UniRx": 75,
  "UniTask": 55,
  "DoTween": 85,
  "Sign in with Apple": 20,
  "NAVER GAMEPOT": 35,
  "ThinkingData": 30,
  "Android": 40,
  "App Store": 40,
  "Google Play": 35,
  "Node.js": 20,
  "Firebase": 35,
  "Asset Bundle": 75,
  "Sign in with Google": 30,
  "Slack": 35,
  "Codex": 65
};
