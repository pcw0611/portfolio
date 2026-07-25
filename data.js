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
    "title": "판타지 2048",
    "subtitle": "개발중",
    "youtubeId": "",
    "tags": [
      "AI-assisted Development"
    ],
    "blocks": [
      {
        "type": "image",
        "src": "img/1784904393203-image_2.png"
      }
    ],
    "period": "진행 중",
    "role": "",
    "playUrl": "https://cosmic-lebkuchen-d6bf8d.netlify.app",
    "githubUrl": ""
  },
  {
    "category": "personal",
    "title": "네온 아르카나 : 사이버 리프트",
    "subtitle": "개발중",
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
        "text": "게임 플레이 화면\n\n어려운 탄막류와 뱀파라이크에 감명 받아 만든 게임입니다\n난이도는 어려운 것이 맞습니다! 도전해 보세요!"
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
    "githubUrl": ""
  },
  {
    "category": "personal",
    "title": "길건너 친구들",
    "subtitle": "카피 작품",
    "youtubeId": "wvwBp1RAkI0",
    "tags": [
      "Unity"
    ],
    "blocks": [
      {
        "type": "text",
        "text": "- Crossy Road의 핵심 시스템(그리드 이동 · procedural 스트리트 생성 · 장애물)을 코드 레벨에서 분석해 재현한 카피 작품\n- 캐릭터는 앞/뒤/좌/우 한 칸씩 그리드 단위로 이동하며, 레이캐스트로 다음 타일의 종류(일반 · 장애물 · 물)를 먼저 감지한 뒤 이동 가능 여부를 판단\n- 이동 중에는 이동 거리 비율을 그대로 점프 궤적의 진행도로 사용해 포물선 점프(Sin 곡선)와 방향 회전(Slerp)을 자연스럽게 표현"
      },
      {
        "type": "text",
        "text": "- 도로 · 철도 · 강 · 잔디 구간은 직전 구간의 종류에 따라 다음에 올 수 없는 종류를 제외하는 규칙표를 두어, 통행이 불가능한 조합(예: 물 구간 뒤에 바로 차도 끝 구간)이 생기지 않도록 구성\n- 구간 종류별로 한 번 더 이어붙일 확률을 따로 둬서 폭이 다른 강 · 도로가 자연스럽게 생성되도록 처리"
      },
      {
        "type": "text",
        "text": "- 차량 · 기차 · 급류에 떠내려가는 통나무까지 장애물 3종을 각각 다른 생성 로직으로 구현 (기차는 경고등이 먼저 켜진 뒤 일정 시간 후 등장, 통나무는 크기별 확률 분포로 스폰)\n- 차에 치이면 부딪힌 부위(측면/앞뒤)에 따라 다른 사망 연출이, 물에서 타이밍을 놓치면 빠지는 연출이 나오도록 구현\n- 점수는 전진한 거리로 계산되고 최고 기록은 로컬에 저장, 사망 시 일정 시간 후 자동으로 재시작"
      }
    ],
    "period": "",
    "role": "",
    "playUrl": "",
    "githubUrl": "https://github.com/pcw0611/codes/tree/master/projects/crossy_road_clone"
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
        "type": "text",
        "text": "- BanG Dream!의 채보(노트) 시스템을 코드 레벨에서 분석해 1.5일 만에 재현한 리듬 게임 프로토타입\n- 텍스트 채보 파일(비트 · 노트 타입 · 레인 번호)을 직접 파싱해 재생하는 구조로, 실제 게임과 동일한 노트 타입 체계(일반 · 플릭 · 롱노트 · 슬라이드 A/B · BPM 변경)를 그대로 지원"
      },
      {
        "type": "text",
        "text": "- 노트가 정확히 목표 비트에 판정선까지 도달하도록, 이동 시간(goalTime)만큼 앞서서 스폰하고 레인 길이에 맞춰 속도를 역산하는 방식으로 타이밍을 구현\n- 곡 중간의 BPM 변경도 노트 스트림 안에 특수 타입으로 끼워 넣어, 별도의 이벤트 채널 없이 동일한 파이프라인에서 처리"
      },
      {
        "type": "text",
        "text": "- 롱노트 · 슬라이드 노트는 시작/중간/끝 노트로 나눠 파싱한 뒤, 같은 종류의 노트끼리 순서대로 매칭해 서로 연결\n- 연결된 두 노트 사이는 매 프레임 갱신되는 빔으로 이어지고, 슬라이드가 다른 레인으로 넘어갈 때는 판정선 자체가 다음 레인 위치로 자연스럽게 보간되며 이동"
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
  "GPT": "perf",
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
  "Unity": "etc",
  "AI-assisted Development": "etc"
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
  "custom3"
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
  }
};

// 태그별 숙련도 (0~100). 기술 스택 시각화에서 크기·중심 배치에 사용됩니다.
const TAG_PROFICIENCY = {
  "Unity": 68,
  "C#": 90,
  "JavaScript": 20,
  "VibeCoding": 75,
  "Claude": 55,
  "GPT": 65,
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
  "Slack": 35
};
