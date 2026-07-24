// ============================================================
// 사이트 데이터. admin.html 관리 페이지에서 저장하면 이 파일이
// 자동으로 다시 생성됩니다. 직접 수정해도 됩니다.
// ============================================================

const ADMIN_PASSWORD = "1234"; // 관리 페이지 비밀번호

const PROFILE = {
  "name": "박찬욱",
  "tagline": "Game Client Programmer",
  "githubUrl": "https://github.com/pcw0611",
  "email": "pcw0611@gmail.com"
};

const TABS = [
  {
    "id": "commercial",
    "label": "상용화 게임"
  },
  {
    "id": "personal",
    "label": "개인 프로젝트"
  }
];

const PROJECTS = [
  {
    "category": "commercial",
    "title": "이사만루",
    "subtitle": "모바일 온라인 야구 게임 · 개발 및 라이브 서비스",
    "youtubeId": "BhuakHSvScs",
    "tags": [
      "Unity",
      "UGUI",
      "C#"
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
    ]
  },
  {
    "category": "commercial",
    "title": "쥬니버 스쿨",
    "subtitle": "네이버 IP의 유아용 게임",
    "youtubeId": "Z4ck71ljhqE",
    "tags": [
      "Unity",
      "C#",
      "Spine",
      "Github"
    ],
    "blocks": [
      {
        "type": "image",
        "src": "img/1784894104659-images-1.jpg"
      },
      {
        "type": "text",
        "text": "- 네이버 계열사의 프리랜서를 통해 하청 받아 진행\n- 대기업 프로세스로 30명 이상의 내부, 외부 팀원과 협업\n- 평균 3일~1주 단위로 1개의 강의를 개발함"
      }
    ],
    "period": "2021.12 – 2023.02",
    "role": "클라이언트 · 1인",
    "playUrl": "",
    "githubUrl": ""
  },
  {
    "category": "commercial",
    "title": "JumpingPeng",
    "subtitle": "암호화폐 KAIA를 연동한 P2E 웹 게임 (탈중앙화 앱)",
    "youtubeId": "ucpYRTGWh7Y",
    "tags": [
      "Unity",
      "WebGL",
      "JavaScript",
      "React"
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
    "githubUrl": ""
  },
  {
    "category": "commercial",
    "title": "Bubble Galaxia",
    "subtitle": "퍼즐 액션 로그라이크 게임",
    "youtubeId": "1Y1CjXFrXMg",
    "tags": [
      "Unity",
      "C#"
    ],
    "blocks": [
      {
        "type": "text",
        "text": "- 기획/아트/프로그래밍 각 1명 씩 소규모 개발\n- 퍼즐 버블 베이스에 액션 턴제 로그라이크를 첨가한 게임\n- 초기 프레임워크 구성 및 프로그래밍 전체 리딩\n- Microsoft PlayFab을 통해 DB/Server 구성"
      }
    ],
    "period": "2026.04 – 2025.10",
    "role": "클라이언트 · 서버 · 빌드 · 마켓 출시 · 1인",
    "playUrl": "https://play.google.com/store/apps/details?id=com.idanote.bubblegalaxia&hl=ko",
    "githubUrl": ""
  }
];

// 태그 색상 계열. 새 태그를 쓰면 여기에 계열만 등록하면 됩니다 (미등록 태그는 회색).
const TAG_GROUP = {
  "Unity": "engine",
  "C#": "engine",
  "C++": "engine",
  "Unreal": "engine",
  "Mirror": "network",
  "Dedicated Server": "network",
  "Netcode": "network",
  "Photon": "network",
  "URP": "graphics",
  "HDRP": "graphics",
  "Shader": "graphics",
  "HLSL": "graphics",
  "VFX": "graphics",
  "FSM": "ai",
  "Behavior Tree": "ai",
  "NavMesh": "ai",
  "Object Pooling": "perf",
  "Addressables": "perf",
  "Job System": "perf",
  "Burst": "perf",
  "Profiling": "perf",
  "UGUI": "engine",
  "Spine": "graphics",
  "JavaScript": "etc",
  "WebGL": "etc",
  "React": "etc",
  "SVN": "etc",
  "CDN": "etc",
  "Github": "etc"
};

const TAG_STYLES = {
  "engine": {
    "bg": "#26215C",
    "fg": "#CECBF6"
  },
  "network": {
    "bg": "#04342C",
    "fg": "#9FE1CB"
  },
  "graphics": {
    "bg": "#4A1B0C",
    "fg": "#F5C4B3"
  },
  "ai": {
    "bg": "#4B1528",
    "fg": "#F4C0D1"
  },
  "perf": {
    "bg": "#412402",
    "fg": "#FAC775"
  },
  "etc": {
    "bg": "#2C2C2A",
    "fg": "#D3D1C7"
  }
};

const TAG_CUSTOM = {};

// 태그별 숙련도 (0~100). 기술 스택 시각화에서 크기·중심 배치에 사용됩니다.
const TAG_PROFICIENCY = {};
