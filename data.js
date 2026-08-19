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
  },
  {
    "id": "tech",
    "label": "기술 사례",
    "label_en": "Engineering cases",
    "label_ja": "技術事例"
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
    },
    "thumb": "img/1787124083458-11234.png"
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
      },
      {
        "type": "pdf",
        "src": "img/1786521422652-unity_-_-_-_-_-_-1.pdf"
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
    "category": "personal",
    "inDevelopment": true,
    "title": "에버리아",
    "subtitle": "웹  2D 사이드스크롤 MMORPG · 상시 운영 중",
    "youtubeId": "9dIh5LhIcEM",
    "tags": [
      "JavaScript",
      "Node.js",
      "WebSocket",
      "Canvas 2D",
      "Live Service",
      "AI-assisted Development"
    ],
    "period": "2026.08",
    "role": "기획 · 서버 · 클라이언트 · AI · 운영 도구 · 배포",
    "playUrl": "https://everia.duckdns.org",
    "githubUrl": "",
    "blocks": [
      {
        "type": "text",
        "text": "링크만 누르면 브라우저에서 바로 접속하는 2D 사이드스크롤 MMORPG입니다. 서버, 클라이언트, AI, 운영 도구, 배포까지 직접 만들었고 오라클 무료 VM에서 상시 운영 중입니다.\n\n- 런타임 외부 의존성 0. HTTP 정적 서버, WebSocket 프로토콜, 비밀번호 해시, 저장 계층을 직접 구현했습니다\n- Lv.1~120, 4차 전직 8종, 맵 26개, 대륙 2개. 레이드·성흔·경매·랭킹까지 라이브 서비스 형태로 운영합니다\n- 코드는 비공개이며, 위 주소로 바로 플레이할 수 있습니다"
      },
      {
        "type": "image",
        "src": "img/everia-01-field.jpg"
      },
      {
        "type": "text",
        "text": "전투 판정은 전부 서버 권위입니다. 몬스터 좌표와 HP, 데미지, 드롭 생성과 습득, 경험치, 퀘스트, 상점 거래, 전직을 서버가 처리하고 클라이언트는 자기 캐릭터의 물리(중력·점프·로프)만 계산합니다. 반응성을 위해 이동은 클라이언트가 보내되 서버가 맵 범위로 클램프합니다.\n\n지형은 시드 기반 결정적 생성이라 맵 26개를 손으로 찍지 않고도 서버와 클라이언트가 같은 발판·로프를 갖습니다. 밸런스 수치는 공용 모듈 하나를 서버와 브라우저가 그대로 import 해서 단일 출처를 유지합니다."
      },
      {
        "type": "image",
        "src": "img/everia-13-crowd.jpg"
      },
      {
        "type": "text",
        "text": "1인 서버에서 가장 어려운 것은 '사람이 있는 느낌'입니다. 그래서 생활 패턴을 가진 AI 인구를 상태머신으로 만들었습니다.\n\n- KST 시간대별 접속 곡선과 레벨 분포를 따라 접속하고 종료합니다\n- 사냥, 퀘스트, 상점, 경매, 파티, 레이드, 월드 채팅, 스타포스 강화까지 일반 유저와 같은 프로토콜로 수행합니다\n- 성향에 따라 흥미가 식어 영구 이탈하고, 새 닉네임의 신규 AI가 시차를 두고 들어옵니다\n\n로컬 PC에서는 AI 200명 동시 구동까지 문제없이 돌았습니다."
      },
      {
        "type": "image",
        "src": "img/everia-14-custom.jpg"
      },
      {
        "type": "image",
        "src": "img/everia-10-auction.jpg"
      },
      {
        "type": "text",
        "text": "외형은 머리 모양과 색, 표정, 성별, 피부를 즉시 미리보기로 바꿉니다. 모든 스프라이트는 이미지 파일 없이 코드로 그립니다.\n\n경매장은 Lv.20 제한, 가격대 검증, 상세 검색, 등록 유예와 마감 정산, 반품·복구 로그를 갖춘 실제 거래 시스템입니다. 판매 수수료 5%와 상점 기본품 가격 상·하한으로 시세 붕괴를 막았습니다."
      },
      {
        "type": "image",
        "src": "img/everia-02-runes.jpg"
      },
      {
        "type": "image",
        "src": "img/everia-03-starforce.jpg"
      },
      {
        "type": "text",
        "text": "Lv.120 이후가 본 게임입니다.\n\n- 계정 공용 입장 토큰(4시간에 1개, 최대 10개)으로 모든 레이드 입장을 통제합니다\n- 룬 5+1 소켓이 4차 주력기의 범위·타수·운용을 바꿉니다\n- 각인석으로 해방한 뒤 최대 20성까지 올리는 스타포스, 유니크 옵션을 다시 뽑는 카오스 큐브\n- 몬스터가 무한 재생성되고 보스가 난입하는 성흔, 주간 보상은 매주 월요일 00:00 KST 초기화\n\n목표 성장 기간은 한 달 이상입니다. 실제 전투 공식을 그대로 호출하는 시뮬레이션으로 성장 프로필별 클리어 타임을 산출해 난이도 배율을 조정했습니다."
      },
      {
        "type": "image",
        "src": "img/everia-04-raid.jpg"
      },
      {
        "type": "image",
        "src": "img/everia-11-oplog.jpg"
      },
      {
        "type": "text",
        "text": "라이브 서비스에서 실제로 필요한 것은 게임 밖에 있습니다. 운영 콘솔은 루프백 전용으로 두고 SSH 터널로만 접근합니다.\n\n- 실시간 로그: 접속, 레벨업, 지역 이동, 사망, 시스템 이벤트를 필터로 나눠 봅니다\n- 아이템 원장·복구: 캐릭터별 아이템 이동 기록을 조회하고 유실분을 보관함으로 되돌립니다\n- 계정·IP 차단과 해제, 가입 제한, AI 인원 제어, 전체 공지 방송\n- 재시작 없이 계정 데이터를 보정하는 무중단 절차를 갖춰 접속자를 끊지 않고 지급과 정정을 처리합니다"
      },
      {
        "type": "image",
        "src": "img/everia-12-ledger.jpg"
      },
      {
        "type": "image",
        "src": "img/everia-05-cctv.jpg"
      },
      {
        "type": "text",
        "text": "CCTV는 운영 콘솔 중 유일하게 공개된 화면입니다. 전체 맵 프리뷰에서 인원이 있는 맵을 고르면 서버 20틱 상태를 그대로 받아 관전할 수 있고, 특정 유저를 추적하거나 확대·전체 보기로 지형 전체를 볼 수 있습니다. 관전자 수와 IP당 동시 관전을 제한해 1 OCPU 서버에서도 부하가 튀지 않게 했습니다."
      },
      {
        "type": "image",
        "src": "img/everia-09-mobile.jpg"
      },
      {
        "type": "text",
        "text": "기술 선택은 '설치 실패와 버전 충돌이 없을 것'을 첫 기준으로 삼았습니다.\n\n- Node.js 22, 런타임 의존성 0, JSON 파일 저장(디바운스 + 임시 파일 원자적 교체 + 리비전 검사)\n- 자체 WebSocket 구현, Canvas 2D 렌더링, 이미지·음원 파일 없이 절차적 생성\n- 무료 VM(1 OCPU · 1GB) 실측: 40명 동시 접속에서 몹 동기화 151ms, 공격 왕복 p95 7ms, 메모리 108MB\n- 모바일 844×390 레이아웃과 가상 조작을 지원하고, 데스크톱 앱은 Electron으로 패키징합니다\n- 배포는 코드만 올리고 저장 데이터는 절대 덮지 않는 절차로 고정했습니다"
      },
      {
        "type": "text",
        "text": "한계도 분명합니다. 계정을 단일 JSON 파일로 저장하므로 수백~수천 계정 규모에서는 SQLite나 Postgres로의 이전이 필요합니다. 이동 검증이 없어 공개 서버로 키우려면 클라이언트 권한부터 좁혀야 합니다. 현재 구조는 친구 단위 규모에서 반응성과 구현 단순함을 우선한 선택입니다."
      }
    ],
    "i18n": {
      "en": {
        "title": "Everia Online",
        "subtitle": "A browser-based 2D side-scrolling MMORPG built with zero runtime dependencies · live in operation",
        "role": "Design · Server · Client · AI · Operations tooling · Deployment",
        "blocks": {
          "0": "A 2D side-scrolling MMORPG you can join from a browser with a single link. I built the server, client, AI, operations tooling and deployment myself, and it runs continuously on a free Oracle VM.\n\n- Zero runtime dependencies. The static HTTP server, WebSocket protocol, password hashing and persistence layer are all hand-written\n- Lv.1–120, eight 4th-job classes, 26 maps, two continents, with raids, endless hunting grounds, an auction house and rankings operated as a live service\n- The source is private; the play link above connects directly",
          "2": "All combat is server-authoritative. Monster positions and HP, damage, drop creation and pickup, experience, quests, shop trades and job advancement are handled on the server, while the client only simulates its own character physics (gravity, jumps, ropes). Movement is sent by the client for responsiveness, then clamped to map bounds by the server.\n\nTerrain is generated deterministically from a seed, so 26 maps share identical platforms and ropes between server and client without hand authoring. Balance values live in one shared module imported by both the server and the browser, keeping a single source of truth.",
          "4": "The hardest part of a one-person server is making the world feel populated. So the AI population is a state machine with daily-life patterns.\n\n- Bots log in and out along a KST time-of-day curve and a level distribution\n- They hunt, run quests, shop, trade on the auction house, party up, raid, chat in world channels and push starforce upgrades using the same protocol as human players\n- Depending on disposition they lose interest and retire permanently, and new AI with new names join after a delay\n\nOn a local PC, 200 concurrent AI ran without trouble.",
          "7": "Appearance editing swaps hair style and colour, expression, gender and skin tone with an instant preview. Every sprite is drawn in code, with no image files.\n\nThe auction house is a real trading system: a level 20 requirement, price-range validation, detailed search, listing grace periods and settlement on expiry, plus return and recovery logs. A 5% sales fee and price floors and ceilings on shop goods keep the economy from collapsing.",
          "10": "The real game begins after Lv.120.\n\n- Every raid entry is gated by account-wide tokens (one every four hours, up to ten)\n- A 5+1 rune socket layout changes the range, hit count and handling of 4th-job core skills\n- Starforce takes gear to 20 stars after unlocking it with sigil stones, and chaos cubes reroll unique options\n- Endless hunting grounds respawn monsters indefinitely with bosses breaking in; weekly rewards reset Monday 00:00 KST\n\nThe intended progression is a month or more. I derived clear times per growth profile from a simulation that calls the real combat formulas, then tuned the difficulty multipliers.",
          "13": "What a live service really needs sits outside the game. The operations console is loopback-only and reachable through an SSH tunnel.\n\n- Real-time log: logins, level-ups, map moves, deaths and system events, split by filter\n- Item ledger and recovery: look up per-character item movement and return lost items to storage\n- Account and IP bans and unbans, registration limits, AI headcount control, server-wide announcements\n- A zero-downtime procedure for correcting account data, so grants and fixes ship without disconnecting anyone",
          "16": "The CCTV view is the only publicly exposed part of the console. Pick a populated map from the overview grid and you can spectate the server's 20-tick state directly, follow a specific player, or zoom out to see the whole terrain. Viewer counts and per-IP concurrency are capped so load stays flat on a single-OCPU server.",
          "18": "Technology choices were led by one rule: nothing should fail to install or clash on versions.\n\n- Node.js 22, zero runtime dependencies, JSON file persistence (debounced writes, atomic temp-file swap, revision checks)\n- A hand-written WebSocket implementation, Canvas 2D rendering, procedurally generated art and sound with no asset files\n- Measured on a free VM (1 OCPU, 1 GB): 151 ms mob sync and 7 ms p95 attack round-trip at 40 concurrent players, 108 MB memory\n- Mobile support at 844×390 with virtual controls; the desktop app is packaged with Electron\n- Deployment ships code only and never overwrites saved data",
          "19": "The limits are clear. Accounts live in a single JSON file, so a few hundred to a few thousand accounts would require moving to SQLite or Postgres. There is no movement validation, so growing this into a public server would mean narrowing client authority first. The current design deliberately favours responsiveness and simplicity at the scale of a group of friends."
        }
      },
      "ja": {
        "title": "エベリア・オンライン",
        "subtitle": "ランタイム外部依存ゼロで作ったブラウザ2D横スクロールMMORPG・常時運営中",
        "role": "企画・サーバー・クライアント・AI・運営ツール・デプロイ",
        "blocks": {
          "0": "リンクを開くだけでブラウザから参加できる2D横スクロールMMORPGです。サーバー、クライアント、AI、運営ツール、デプロイまで自分で作り、Oracleの無料VMで常時運営しています。\n\n- ランタイム外部依存ゼロ。静的HTTPサーバー、WebSocketプロトコル、パスワードハッシュ、保存層をすべて自作しました\n- Lv.1〜120、4次職8種、マップ26、大陸2。レイド・無限狩場・オークション・ランキングまでライブサービスとして運営しています\n- コードは非公開で、上のアドレスからそのままプレイできます",
          "2": "戦闘判定はすべてサーバー権威です。モンスターの座標とHP、ダメージ、ドロップの生成と取得、経験値、クエスト、商店取引、転職はサーバーが処理し、クライアントは自キャラの物理（重力・ジャンプ・ロープ）だけを計算します。反応性のため移動はクライアントが送り、サーバーがマップ範囲にクランプします。\n\n地形はシードによる決定的生成なので、26のマップを手で置かずともサーバーとクライアントが同じ足場とロープを持ちます。バランス数値は共有モジュール一つをサーバーとブラウザが同じままimportし、単一の情報源を保ちます。",
          "4": "一人サーバーで最も難しいのは「人がいる感覚」です。そこで生活パターンを持つAI人口をステートマシンで作りました。\n\n- KSTの時間帯別接続カーブとレベル分布に沿って接続・終了します\n- 狩り、クエスト、商店、オークション、パーティ、レイド、ワールドチャット、スターフォース強化まで一般ユーザーと同じプロトコルで行います\n- 性向によって興味が薄れ永久離脱し、新しい名前のAIが時間差で入ってきます\n\nローカルPCではAI200人の同時稼働まで問題なく動きました。",
          "7": "外見は髪型と色、表情、性別、肌をその場のプレビューで変更します。すべてのスプライトは画像ファイルなしにコードで描いています。\n\nオークションはLv.20制限、価格帯の検証、詳細検索、登録猶予と締め切り精算、返品・復旧ログを備えた実際の取引システムです。販売手数料5%と商店基本品の価格上限・下限で相場の崩壊を防ぎました。",
          "10": "Lv.120からが本編です。\n\n- アカウント共用の入場トークン（4時間に1個、最大10個）で全レイドの入場を制御します\n- ルーン5+1ソケットが4次主力スキルの範囲・打数・運用を変えます\n- 刻印石で解放してから最大20星まで上げるスターフォース、ユニークオプションを引き直すカオスキューブ\n- モンスターが無限に湧きボスが乱入する無限狩場、週間報酬は毎週月曜00:00 KSTにリセット\n\n想定成長期間は1か月以上です。実際の戦闘式をそのまま呼ぶシミュレーションで成長プロファイル別のクリアタイムを算出し、難易度倍率を調整しました。",
          "13": "ライブサービスで本当に必要なものはゲームの外にあります。運営コンソールはループバック専用にし、SSHトンネル経由でのみ接続します。\n\n- リアルタイムログ：接続、レベルアップ、地域移動、死亡、システムイベントをフィルタで分けて見ます\n- アイテム元帳・復旧：キャラクター別のアイテム移動記録を照会し、失われた分を保管箱に戻します\n- アカウント・IPの遮断と解除、登録制限、AI人数の制御、全体アナウンス\n- 再起動なしでアカウントデータを補正する無停止手順を用意し、接続者を切らずに配布や訂正を処理します",
          "16": "CCTVは運営コンソールで唯一公開している画面です。全マッププレビューから人のいるマップを選ぶとサーバー20ティックの状態をそのまま受け取って観戦でき、特定ユーザーの追跡や、ズームアウトして地形全体を見ることもできます。観戦者数とIPごとの同時観戦を制限し、1 OCPUのサーバーでも負荷が跳ねないようにしました。",
          "18": "技術選定は「インストール失敗とバージョン衝突が起きないこと」を第一基準にしました。\n\n- Node.js 22、ランタイム依存ゼロ、JSONファイル保存（デバウンス＋一時ファイルの原子的置換＋リビジョン検査）\n- 自作WebSocket実装、Canvas 2D描画、画像・音源ファイルなしの手続き的生成\n- 無料VM（1 OCPU・1GB）実測：40人同時接続でモブ同期151ms、攻撃往復p95 7ms、メモリ108MB\n- モバイル844×390のレイアウトと仮想操作に対応し、デスクトップアプリはElectronでパッケージします\n- デプロイはコードのみを上げ、保存データは絶対に上書きしない手順で固定しました",
          "19": "限界も明確です。アカウントを単一のJSONファイルで保存しているため、数百〜数千アカウント規模ではSQLiteやPostgresへの移行が必要です。移動検証がないため、公開サーバーに育てるならクライアント権限を狭めることから始める必要があります。現在の構造は友人単位の規模で反応性と実装の単純さを優先した選択です。"
        }
      }
    },
    "thumb": "img/1787126953927-everia_thumbnail_dynamic_1787126788856.jpg"
  },
  {
    "category": "personal",
    "inDevelopment": true,
    "title": "심층 : 2D 방치형 게임",
    "subtitle": "장비 파밍 콘텐츠가 포함된 모바일 방치형 게임",
    "thumb": "img/1787125002176-02.png",
    "youtubeId": "",
    "tags": [
      "Unity 6",
      "URP 2D",
      "PlayFab",
      "Economy V2",
      "Azure Functions",
      "Mobile UI/UX",
      "Auto Battler",
      "AI-assisted Development"
    ],
    "blocks": [
      {
        "type": "image",
        "src": "img/1787125458602-02.png"
      },
      {
        "type": "text",
        "text": "v0.5.2에서 개별 UID를 가진 일반·희귀 장비, 7부위 장착, 가방·네르 보관함, 정렬·필터·잠금·선택/자동 분해와 서버 확정 소울 보상을 추가했습니다. 진행은 압축된 PlayFab Entity Objects에, 장비 UID·위치·잠금·옵션은 Economy V2 Stack에 분리해 저장합니다."
      },
      {
        "type": "text",
        "text": "v0.5.3은 PlayFab·Azure·Storage를 DEV/DEMO/PRODUCTION으로 분리하고 clean commit의 서버 ZIP과 SHA-256을 DEV에서 검증한 뒤 같은 파일만 DEMO에 승격합니다. 서버 권위 우편·공지와 KST 운영툴을 추가하고, 층에 따라 플레이어 HP가 오르던 문제와 10레벨 보너스를 제거했습니다. 장비 주옵션과 적·무기 피해, 네르 다음 보상 응답성도 1차 조정했습니다."
      }
    ],
    "period": "2026.08 · v0.5.3 Windows/WebGL DEMO 릴리스",
    "role": "게임 기획 · 클라이언트/백엔드 · UI/VFX/오디오 디렉팅 · 1인",
    "playUrl": "game/abyss/",
    "downloadUrl": "https://github.com/pcw0611/portfolio/releases/download/abyss-v0.5.3/Shimcheung-v0.5.3-win64.zip",
    "githubUrl": "https://pcw0611.github.io/abyss-review-book/reviews/0.5.3/",
    "i18n": {
      "en": {
        "title": "Shimcheung v0.5.3 : LiveOps Boundaries, Mail, and Balance",
        "subtitle": "An idle hack-and-slash that promotes one DEV-verified server artifact to DEMO without copying player data",
        "period": "2026.08 · v0.5.3 Windows/WebGL DEMO release",
        "role": "Game design · Client/backend · UI/VFX/audio direction · Solo",
        "blocks": [
          null,
          "v0.5.2 adds common and rare equipment with stable UIDs, seven slots, a bag and Ner loot stash, sorting, filtering, locking, manual/automatic dismantling, and a server-authoritative Soul reward. Progress lives in compressed PlayFab Entity Objects while each item's UID, location, lock state, and rolls live in an Economy V2 Stack.",
          "v0.5.3 separates PlayFab, Azure, and Storage into DEV, DEMO, and PRODUCTION. A server ZIP built from a clean commit is verified in DEV and the exact SHA is promoted to DEMO without copying player data. It adds server-authoritative mail and announcements with a KST operations tool, removes floor-scaled player HP and hidden ten-level bonuses, and performs a first pass on equipment affixes, enemy and weapon damage, and consecutive Ner reward latency.",
          null,
          null
        ]
      },
      "ja": {
        "title": "深層 v0.5.3 : 運用境界・メール・バランス",
        "subtitle": "DEVで検証した同一サーバー成果物をプレイヤーデータを複製せずDEMOへ昇格する放置型ハクスラ",
        "period": "2026.08 · v0.5.3 Windows/WebGL DEMOリリース",
        "role": "ゲーム企画・クライアント/バックエンド・UI/VFX/オーディオディレクション・個人",
        "blocks": [
          null,
          "v0.5.2では固有UIDを持つ一般・レア装備、7部位、バッグとネール保管庫、ソート・フィルター・ロック・手動/自動分解、サーバー確定のソウル報酬を追加しました。進行は圧縮したPlayFab Entity Objects、装備のUID・位置・ロック・オプションはEconomy V2 Stackへ分離して保存します。",
          "v0.5.3ではPlayFab・Azure・StorageをDEV/DEMO/PRODUCTIONへ分離しました。clean commitから作成したサーバーZIPをDEVで検証し、同一SHAだけをプレイヤーデータの複製なしでDEMOへ昇格します。サーバー確定メール・告知とKST運用ツールを追加し、階層で増えていたプレイヤーHPと10レベル隠しボーナスを削除しました。装備主オプション、敵・武器ダメージ、連続ネール報酬の待ち時間も一次調整しています。",
          null,
          null
        ]
      }
    },
    "isStudentWork": false
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
    "period": "2026.07",
    "role": "게임 기획 · 클라이언트/물리 · AI 개발 디렉팅 · 1인",
    "playUrl": "https://udangtang-tower.pcw0611.workers.dev",
    "githubUrl": "https://github.com/pcw0611/udangtang-tower",
    "i18n": {
      "en": {
        "title": "Udangtang Tower",
        "subtitle": "A social 3D block-stacking game designed and validated through AI collaboration",
        "period": "2026.07",
        "role": "Game design · Client/physics · AI development direction · Solo",
        "blocks": {}
      },
      "ja": {
        "title": "ウダンタンタワー",
        "subtitle": "AI協業で設計・検証したソーシャル3Dブロック積みゲーム",
        "period": "2026.07",
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
    "period": "2026.07",
    "role": "",
    "playUrl": "https://neon-arcana-survivors.pcw0611.workers.dev/",
    "githubUrl": "https://github.com/pcw0611/neon-arcana-survivors/blob/main/GAME_GUIDE.md"
  },
  {
    "category": "tech",
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
    "category": "tech",
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
      },
      {
        "type": "pdf",
        "src": "img/shimcheung-04-data-driven.pdf"
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
    "period": "2016.12",
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
    "period": "2017.01",
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
    "period": "2017.04",
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
    "period": "2017.02",
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
    "period": "2018.01",
    "role": "",
    "playUrl": "",
    "githubUrl": "https://github.com/pcw0611/codes/tree/master/projects/bangdream_clone"
  },
  {
    "category": "personal",
    "title": "명일방주 프로토타입",
    "subtitle": "리소스 활용 턴제 전투 프로토타입",
    "thumb": "img/arknights-thumb.png",
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
    "period": "2022.02",
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
  "Auto Battler": "custom4",
  "WebSocket": "unassigned",
  "Canvas 2D": "unassigned",
  "Live Service": "unassigned",
  "Economy V2": "unassigned",
  "Azure Functions": "unassigned"
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
