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
    "category": "personal",
    "title": "프로젝트 OO (모바일 RPG)",
    "subtitle": "라이브 서비스 · OO스튜디오",
    "youtubeId": "",
    "tags": [
      "Unity",
      "C#",
      "Addressables",
      "Profiling"
    ],
    "period": "2024.01 – 2025.12",
    "role": "클라이언트 프로그래머",
    "playUrl": "",
    "githubUrl": "",
    "blocks": [
      {
        "type": "text",
        "text": "출시 후 라이브 서비스 중인 모바일 RPG에서 전투 시스템과 클라이언트 최적화를 담당했습니다. 실제 담당 파트와 성과로 바꿔 적어주세요."
      }
    ]
  },
  {
    "category": "personal",
    "title": "Isekai Survivor",
    "subtitle": "멀티플레이 서바이벌",
    "youtubeId": "",
    "tags": [
      "Unity",
      "C#",
      "Mirror",
      "Dedicated Server"
    ],
    "period": "2026.03 – 진행 중",
    "role": "1인 개발 · 클라이언트/서버",
    "playUrl": "",
    "githubUrl": "",
    "blocks": [
      {
        "type": "text",
        "text": "Mirror 기반 데디케이티드 서버 구조로 구현한 멀티플레이 서바이벌 게임입니다. 서버 권한 이동 동기화와 서버/클라이언트 빌드 파이프라인 자동화를 직접 설계했습니다."
      }
    ]
  },
  {
    "category": "personal",
    "title": "몬스터 AI 시스템",
    "subtitle": "Behavior Tree 기반",
    "youtubeId": "",
    "tags": [
      "Unity",
      "C#",
      "Behavior Tree",
      "FSM"
    ],
    "period": "2025.11 – 2026.01",
    "role": "1인 개발 · AI 설계",
    "playUrl": "",
    "githubUrl": "",
    "blocks": [
      {
        "type": "text",
        "text": "상태 전이 비용을 줄인 하이브리드 FSM + Behavior Tree 구조입니다. 200마리 동시 갱신에도 프레임을 유지하도록 틱 분산 처리를 적용했습니다."
      }
    ]
  },
  {
    "category": "personal",
    "title": "URP 셰이더 데모",
    "subtitle": "스타일라이즈드 렌더링",
    "youtubeId": "",
    "tags": [
      "Unity",
      "URP",
      "Shader"
    ],
    "period": "2025.08 – 2025.10",
    "role": "1인 개발 · 그래픽스",
    "playUrl": "",
    "githubUrl": "",
    "blocks": [
      {
        "type": "text",
        "text": "셀 셰이딩과 아웃라인 패스를 커스텀 렌더 피처로 구현했습니다. 라이팅 모델을 직접 작성하며 URP 파이프라인 구조를 학습했습니다."
      }
    ]
  },
  {
    "category": "personal",
    "title": "탄막 슈팅 프로토타입",
    "subtitle": "대량 오브젝트 최적화",
    "youtubeId": "",
    "tags": [
      "Unity",
      "C#",
      "Object Pooling",
      "Addressables"
    ],
    "period": "2025.05 – 2025.07",
    "role": "1인 개발 · 최적화",
    "playUrl": "",
    "githubUrl": "",
    "blocks": [
      {
        "type": "text",
        "text": "오브젝트 풀링과 잡 시스템으로 화면당 3,000발 이상의 탄막을 안정적으로 처리합니다. GC 스파이크 제로를 목표로 메모리 프로파일링을 반복했습니다."
      }
    ]
  },
  {
    "category": "commercial",
    "title": "이사만루",
    "subtitle": "",
    "youtubeId": "BhuakHSvScs",
    "tags": [
      "Unity",
      "UGUI",
      "C#"
    ],
    "period": "2020.02 – 2021.02",
    "role": "Game Client Programmer",
    "playUrl": "https://play.google.com/store/apps/details?id=com.gonggames.kbo3.aos.google.kr&hl=ko",
    "githubUrl": "",
    "blocks": [
      {
        "type": "text",
        "text": "다중 접속 야구게임 이사만루에서 메인 화면,  대전, 이적 시장 등의 \n아웃 컨텐츠 클라이언트를 개발 하였습니다"
      }
    ]
  },
  {
    "category": "commercial",
    "title": "쥬니버 스쿨",
    "subtitle": "",
    "youtubeId": "Z4ck71ljhqE",
    "tags": [
      "Unity",
      "C#",
      "Spine"
    ],
    "blocks": [
      {
        "type": "image",
        "src": "img/1784894104659-images-1.jpg"
      },
      {
        "type": "text",
        "text": "유아용 앱인 쥬니버 스쿨의 강의 컨텐츠를 개발하였습니다.\n"
      }
    ],
    "period": "",
    "role": "",
    "playUrl": "",
    "githubUrl": ""
  },
  {
    "category": "commercial",
    "title": "",
    "subtitle": "",
    "youtubeId": "",
    "tags": [],
    "blocks": [],
    "period": "",
    "role": "",
    "playUrl": "",
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
  "Spine": "graphics"
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
