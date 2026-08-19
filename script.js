const ICONS = {
  play: '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>',
  download:
    '<svg viewBox="0 0 24 24"><path d="M5 20h14v-2H5v2zm14-9h-4V3H9v8H5l7 7 7-7z"/></svg>',
  github:
    '<svg viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>',
  mail: '<svg viewBox="0 0 24 24"><path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/></svg>',
  docs: '<svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 7V3.5L18.5 9H13zM8 13h8v2H8v-2zm0 4h8v2H8v-2z"/></svg>',
};

const I18N = {
  ko: {
    navProjects: "프로젝트",
    navSkills: "기술 스택",
    projectsLabel: "PROJECTS",
    filterAll: "전체",
    play: "플레이",
    downloadPC: "PC 다운로드",
    caseStudy: "구조 사례",
    emptyTab: "이 탭에 표시할 프로젝트가 없습니다",
    skillsTitle: "기술 스택",
    titleSuffix: "포트폴리오",
    selfBuiltNote: "템플릿이 아닌, 프론트엔드까지 직접 구현한 사이트입니다. 문의는 이메일로 부탁드립니다.",
    rightsNotice: "무단 전재 및 재배포를 금합니다.",
    viewBlocks: "블록형으로 보기",
    viewMindmap: "마인드맵으로 보기",
    pdfOpen: "PDF로 보기 / 다운로드",
    studentWorkLabel: "학생 시절 작품",
    studentBadge: "학생 작품",
    inDevBadge: "개발 중",
    backToList: "프로젝트 목록",
    prevProject: "이전 프로젝트",
    nextProject: "다음 프로젝트",
    projectCount: "작업 %n건",
    noThumb: "대표 이미지 없음",
    hasVideo: "영상 있음",
  },
  en: {
    navProjects: "Projects",
    navSkills: "Skills",
    projectsLabel: "PROJECTS",
    filterAll: "All",
    play: "Play",
    downloadPC: "Download PC",
    caseStudy: "Case study",
    emptyTab: "No projects in this tab yet",
    skillsTitle: "Tech stack",
    titleSuffix: "Portfolio",
    selfBuiltNote: "Not a template — I built this site's frontend myself. Feel free to reach out by email.",
    rightsNotice: "Unauthorized reproduction or redistribution is prohibited.",
    viewBlocks: "View as blocks",
    viewMindmap: "View as mindmap",
    pdfOpen: "View / download PDF",
    studentWorkLabel: "Student projects",
    studentBadge: "Student",
    inDevBadge: "In Development",
    backToList: "All projects",
    prevProject: "Previous",
    nextProject: "Next",
    projectCount: "%n works",
    noThumb: "No cover image",
    hasVideo: "Has video",
  },
  ja: {
    navProjects: "プロジェクト",
    navSkills: "スキル",
    projectsLabel: "PROJECTS",
    filterAll: "すべて",
    play: "プレイ",
    downloadPC: "PC版ダウンロード",
    caseStudy: "設計事例",
    emptyTab: "このタブに表示するプロジェクトはありません",
    skillsTitle: "技術スタック",
    titleSuffix: "ポートフォリオ",
    selfBuiltNote: "テンプレートではなく、フロントエンドまで自分で実装したサイトです。ご質問はメールでお願いします。",
    rightsNotice: "無断転載・再配布を禁じます。",
    viewBlocks: "ブロック表示",
    viewMindmap: "マインドマップ表示",
    pdfOpen: "PDFを見る・ダウンロード",
    studentWorkLabel: "学生時代の作品",
    studentBadge: "学生作品",
    inDevBadge: "開発中",
    backToList: "プロジェクト一覧",
    prevProject: "前へ",
    nextProject: "次へ",
    projectCount: "制作 %n件",
    noThumb: "代表画像なし",
    hasVideo: "動画あり",
  },
};

const LANG_NAMES = { ko: "한국어", en: "English", ja: "日本語" };

function detectLang() {
  const saved = localStorage.getItem("pf-lang");
  if (saved && I18N[saved]) return saved;
  const nav = (navigator.language || "en").toLowerCase();
  if (nav.startsWith("ko")) return "ko";
  if (nav.startsWith("ja")) return "ja";
  return "en";
}

let lang = detectLang();

function t(key) {
  return (I18N[lang] && I18N[lang][key]) || I18N.en[key] || key;
}

// 갤러리가 기본 화면입니다. current는 allProjects() 배열의 인덱스이고 -1은 선택 없음입니다.
let current = -1;
let currentCategoryFilter = "all";

// 노출 순서의 정본은 PROJECTS 배열 순서 하나뿐입니다 — 관리 페이지의 ▲▼가 그대로
// 화면 순서가 됩니다. 예전에 쓰던 featuredOrder 고정 순위는 배열 순서를 덮어써서
// ▲▼를 무력화시켰기 때문에 제거했습니다.
function projectsOf(tabId) {
  return PROJECTS.filter(
    (p) => (p.category || "personal") === tabId && (p.title || "").trim()
  );
}

function localizeProject(p) {
  if (lang === "ko" || !p.i18n || !p.i18n[lang]) return p;
  const tr = p.i18n[lang];
  const merged = Object.assign({}, p);
  if (tr.title) merged.title = tr.title;
  if (tr.subtitle) merged.subtitle = tr.subtitle;
  if (tr.period) merged.period = tr.period;
  if (tr.role) merged.role = tr.role;
  if (tr.blocks && p.blocks) {
    merged.blocks = p.blocks.map((b, i) =>
      b.type === "text" && tr.blocks[i] ? { type: "text", text: tr.blocks[i] } : b
    );
  }
  return merged;
}

// 상세의 정본 목록. 갤러리가 카테고리를 한 화면에 모두 보여주므로 탭 필터 없이
// PROJECTS 순서를 그대로 쓰고, 이 배열의 인덱스가 이전/다음 이동의 기준이 됩니다.
function allProjects() {
  return PROJECTS.filter((p) => (p.title || "").trim());
}

function currentProjects() {
  return allProjects().map(localizeProject);
}

function slugify(text) {
  return String(text)
    .toLowerCase()
    .replace(/[^\p{Letter}\p{Number}]+/gu, "-")
    .replace(/^-+|-+$/g, "");
}

// URL 해시는 배열 순서가 아니라 제목에서 뽑습니다. 관리 페이지의 ▲▼로 노출 순서가
// 바뀌어도 이미 공유한 프로젝트 링크가 그대로 살아 있어야 하기 때문입니다.
function projectSlugs() {
  const used = {};
  return allProjects().map((p) => {
    const base = slugify(p.title) || "project";
    if (used[base] == null) {
      used[base] = 1;
      return base;
    }
    used[base] += 1;
    return base + "-" + used[base];
  });
}

function slugOf(index) {
  return projectSlugs()[index] || "";
}

function indexOfSlug(slug) {
  return projectSlugs().indexOf(slug);
}

function tabLabel(tb) {
  if (lang !== "ko" && tb["label_" + lang]) return tb["label_" + lang];
  return tb.label;
}

// 어느 카테고리에도 등록되지 않은 태그가 가는 자리. "etc"는 실제 카테고리
// (Ads & Monetization)로 쓰이고 있으므로 미분류 폴백으로 재사용하면 안 됩니다 —
// 등록을 빠뜨린 태그가 전부 그 카테고리로 섞여 들어갑니다.
const UNGROUPED_KEY = "unassigned";
const UNGROUPED_STYLE = { bg: "#2C2C2A", fg: "#D3D1C7", label: "미분류" };

// 프로젝트 태그로 카테고리(부모) 이름 자체를 쓴 경우, 그 카테고리 색을 그대로 적용합니다.
function categoryKeyForLabel(name) {
  const order = typeof TAG_GROUP_ORDER !== "undefined" ? TAG_GROUP_ORDER : [];
  for (const key of order) {
    const entry = TAG_STYLES[key];
    if (entry && (entry.label === name || entry.label_en === name || entry.label_ja === name)) {
      return key;
    }
  }
  return null;
}

function tagStyle(name) {
  const catKey = categoryKeyForLabel(name);
  if (catKey) return TAG_STYLES[catKey] || UNGROUPED_STYLE;
  return TAG_STYLES[TAG_GROUP[name]] || UNGROUPED_STYLE;
}

// 내부 태그 키(데이터/색상 조회용)는 그대로 두고, 화면에 보여줄 문구만 언어별로 다듬습니다.
const TAG_DISPLAY_OVERRIDES = {
  VibeCoding: { ko: "AI 활용 개발", en: "AI-assisted Development", ja: "AI活用開発" },
};

function tagDisplayName(name) {
  const o = TAG_DISPLAY_OVERRIDES[name];
  return (o && o[lang]) || name;
}

function proficiencyOf(name) {
  if (typeof TAG_PROFICIENCY !== "undefined" && TAG_PROFICIENCY[name] != null) {
    return TAG_PROFICIENCY[name];
  }
  return 50;
}

function projectTagDisplayName(name) {
  const catKey = categoryKeyForLabel(name);
  if (catKey) return categoryLabel(catKey);
  return tagDisplayName(name);
}

function tagPill(name) {
  const style = tagStyle(name);
  const span = document.createElement("span");
  span.className = "tag";
  span.textContent = projectTagDisplayName(name);
  span.style.background = style.bg;
  span.style.color = style.fg;
  return span;
}

function linkBtn(href, label, icon, primary) {
  const a = document.createElement("a");
  a.className = "btn " + (primary ? "btn-primary" : "btn-outline");
  a.href = href;
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  a.innerHTML = ICONS[icon] + "<span></span>";
  a.querySelector("span").textContent = label;
  return a;
}

function renderDetail(p) {
  const badge = document.getElementById("detail-type-badge");
  const tb = TABS.find((t) => t.id === (p.category || "personal"));
  badge.textContent = tb ? tabLabel(tb) : "";
  badge.className = "project-type-badge" + (tb ? " " + tb.id : "");
  badge.style.display = tb ? "" : "none";

  const videoWrap = document.getElementById("video-wrap");
  if (p.youtubeId) {
    videoWrap.style.display = "";
    videoWrap.classList.toggle("short", p.videoAspect === "short");
    const iframe = document.createElement("iframe");
    iframe.src =
      "https://www.youtube-nocookie.com/embed/" +
      encodeURIComponent(p.youtubeId) +
      "?rel=0";
    iframe.title = p.title;
    iframe.loading = "lazy";
    iframe.allow =
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen = true;
    videoWrap.replaceChildren(iframe);
  } else {
    videoWrap.style.display = "none";
    videoWrap.classList.remove("short");
    videoWrap.replaceChildren();
  }

  document.getElementById("detail-title").textContent = p.title;

  const btns = document.getElementById("link-btns");
  btns.replaceChildren();
  if (p.playUrl) btns.appendChild(linkBtn(p.playUrl, t("play"), "play", true));
  if (p.downloadUrl) btns.appendChild(linkBtn(p.downloadUrl, t("downloadPC"), "download", false));
  if (p.docsUrl) btns.appendChild(linkBtn(p.docsUrl, t("caseStudy"), "docs", false));
  if (p.githubUrl) btns.appendChild(linkBtn(p.githubUrl, "GitHub", "github", false));

  const tags = document.getElementById("detail-tags");
  tags.replaceChildren(...(p.tags || []).map(tagPill));
  tags.style.display = (p.tags || []).length ? "" : "none";

  const blocksEl = document.getElementById("detail-blocks");
  blocksEl.replaceChildren();
  const blocks =
    p.blocks && p.blocks.length
      ? p.blocks
      : p.description
        ? [{ type: "text", text: p.description }]
        : [];
  blocks.forEach((b) => {
    if (b.type === "image" && b.src) {
      const figure = document.createElement("figure");
      figure.className = "block-figure" + (b.layout === "portrait" ? " portrait" : "");
      const img = document.createElement("img");
      img.className = "block-img";
      img.alt = b.caption || p.title;
      img.loading = "lazy";
      img.addEventListener("load", () => img.classList.add("loaded"));
      img.addEventListener("error", () => figure.remove());
      img.src = b.src;
      if (img.complete) img.classList.add("loaded");
      figure.appendChild(img);
      if (b.caption) {
        const caption = document.createElement("figcaption");
        caption.className = "block-caption";
        caption.textContent = b.caption;
        figure.appendChild(caption);
      }
      blocksEl.appendChild(figure);
    } else if (b.type === "text" && b.text) {
      const t = document.createElement("p");
      t.className = "desc";
      t.textContent = b.text;
      blocksEl.appendChild(t);
    } else if (b.type === "pdf" && b.src) {
      const wrap = document.createElement("div");
      wrap.className = "pdf-embed";
      const iframe = document.createElement("iframe");
      iframe.src = b.src;
      iframe.loading = "lazy";
      iframe.title = p.title + " PDF";
      const link = document.createElement("a");
      link.className = "pdf-download";
      link.href = b.src;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = t("pdfOpen");
      wrap.append(iframe, link);
      blocksEl.appendChild(wrap);
    }
  });

  const meta = [p.period, p.role].filter(Boolean).join(" · ");
  const metaEl = document.getElementById("detail-meta");
  metaEl.textContent = meta;
  metaEl.style.display = meta ? "" : "none";
}

function renderEmpty() {
  document.getElementById("detail-type-badge").style.display = "none";
  const videoWrap = document.getElementById("video-wrap");
  videoWrap.style.display = "";
  videoWrap.innerHTML =
    '<div class="video-placeholder"><span>' + t("emptyTab") + "</span></div>";
  document.getElementById("detail-title").textContent = "";
  document.getElementById("link-btns").replaceChildren();
  document.getElementById("detail-tags").replaceChildren();
  document.getElementById("detail-blocks").replaceChildren();
  const metaEl = document.getElementById("detail-meta");
  metaEl.textContent = "";
  metaEl.style.display = "none";
}

function showDetail(renderFn) {
  const detail = document.getElementById("detail");
  detail.classList.add("switching");
  setTimeout(() => {
    renderFn();
    detail.classList.remove("switching");
  }, 200);
}

// ── 갤러리(카드 그리드) ─────────────────────────────────────────────
// 카드 썸네일은 새 데이터를 요구하지 않습니다. 관리 페이지에서 지정한 thumb → 본문의
// 정지 이미지 → 유튜브 썸네일 순으로 고릅니다. GIF는 그리드에서 여러 장이 동시에
// 돌아가 무겁고 산만하므로, 다른 후보가 하나도 없을 때만 마지막으로 씁니다.
// 유튜브 hqdefault는 4:3 안에 16:9가 담긴 그림이라 16:9 상자에 object-fit: cover로
// 넣으면 위아래 검은 띠가 정확히 잘려 나갑니다.
function isAnimated(src) {
  return /\.gif(\?|#|$)/i.test(src || "");
}

function thumbOf(p) {
  if (p.thumb) return { src: p.thumb, video: !!p.youtubeId };

  const images = (p.blocks || []).filter((b) => b.type === "image" && b.src);
  const still = images.find((b) => !isAnimated(b.src));
  if (still) return { src: still.src, video: !!p.youtubeId };

  if (p.youtubeId && /^[\w-]{11}$/.test(p.youtubeId)) {
    return {
      src: "https://i.ytimg.com/vi/" + encodeURIComponent(p.youtubeId) + "/hqdefault.jpg",
      video: true,
    };
  }

  if (images.length) return { src: images[0].src, video: false };
  return null;
}

const CARD_TAG_LIMIT = 2;

function cardThumb(p) {
  const wrap = document.createElement("div");
  wrap.className = "card-thumb";
  const info = thumbOf(p);

  if (info) {
    const bg = document.createElement("div");
    bg.className = "card-thumb-bg";
    bg.style.backgroundImage = "url('" + encodeURI(info.src) + "')";
    wrap.appendChild(bg);

    const img = document.createElement("img");
    img.loading = "lazy";
    img.decoding = "async";
    img.alt = "";
    img.addEventListener("load", () => img.classList.add("loaded"));
    // 이미지가 깨지면 빈 상자 대신 색 타일로 떨어뜨립니다.
    img.addEventListener("error", () => {
      img.remove();
      bg.remove();
      wrap.prepend(cardFallback(p));
    });
    img.src = info.src;
    if (img.complete) img.classList.add("loaded");
    wrap.appendChild(img);
  } else {
    wrap.appendChild(cardFallback(p));
  }

  if (p.isStudentWork) {
    const badge = document.createElement("span");
    badge.className = "card-badge-student";
    badge.textContent = t("studentBadge");
    wrap.appendChild(badge);
  } else if (p.inDevelopment) {
    const badge = document.createElement("span");
    badge.className = "card-badge-dev";
    badge.textContent = t("inDevBadge");
    wrap.appendChild(badge);
  }

  const affordance = document.createElement("span");
  affordance.className = "card-affordance";
  affordance.title = t("viewDetail") || "상세 보기";
  affordance.innerHTML =
    '<svg viewBox="0 0 24 24" width="13" height="13"><path d="M7 17L17 7M17 7H7M17 7V17" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  wrap.appendChild(affordance);

  if (info && info.video) {
    const badge = document.createElement("span");
    badge.className = "card-video";
    badge.title = t("hasVideo");
    badge.innerHTML = ICONS.play;
    wrap.appendChild(badge);
  }
  return wrap;
}

function cardFallback(p) {
  const box = document.createElement("div");
  box.className = "card-fallback";
  const style = tagStyle((p.tags || [])[0] || "");
  box.style.background =
    "linear-gradient(135deg, " + style.bg + " 0%, rgba(0, 0, 0, 0.35) 100%)";
  box.style.color = style.fg;
  const mark = document.createElement("span");
  mark.textContent = (p.title || "?").trim().charAt(0);
  box.appendChild(mark);
  box.title = t("noThumb");
  return box;
}

function cardTags(p) {
  const box = document.createElement("div");
  box.className = "card-tags";
  const tags = p.tags || [];
  tags.slice(0, CARD_TAG_LIMIT).forEach((name) => {
    const pill = document.createElement("span");
    pill.className = "card-tag";
    pill.textContent = projectTagDisplayName(name);
    box.appendChild(pill);
  });
  if (tags.length > CARD_TAG_LIMIT) {
    const more = document.createElement("span");
    more.className = "card-tag card-tag-more";
    more.textContent = "+" + (tags.length - CARD_TAG_LIMIT);
    more.title = tags.slice(CARD_TAG_LIMIT).map(projectTagDisplayName).join(", ");
    box.appendChild(more);
  }
  return box;
}

function formatCardDate(period) {
  if (!period) return "";
  const trimmed = period
    .trim()
    .replace(/\s*–\s*진행\s*중/g, "")
    .replace(/\s*–\s*In progress/gi, "")
    .replace(/\s*–\s*개발\s*중/g, "")
    .replace(/\s*–\s*開発中/g, "");
  const parts = trimmed.split(/\s*·\s*/);
  return (parts[0] || trimmed).trim();
}

function buildCard(index, p, seq) {
  const card = document.createElement("a");
  card.className = "p-card";
  card.href = "#p/" + slugOf(index);
  card.dataset.index = index;
  // 카드가 많아 전부 한 번에 튀어오르면 산만하므로 지연은 앞쪽 몇 장에만 줍니다.
  card.style.animationDelay = Math.min(seq, 8) * 0.045 + "s";

  card.appendChild(cardThumb(p));

  const body = document.createElement("div");
  body.className = "card-body";

  const h3 = document.createElement("h3");
  h3.className = "card-title";
  h3.textContent = p.title;
  body.appendChild(h3);

  const sub = document.createElement("p");
  sub.className = "card-sub";
  sub.textContent = p.subtitle || "";
  body.appendChild(sub);

  body.appendChild(cardTags(p));

  const periodEl = document.createElement("p");
  periodEl.className = "card-period";
  const dateText = formatCardDate(p.period);
  if (dateText) {
    periodEl.innerHTML =
      '<svg class="period-icon" viewBox="0 0 24 24" width="13" height="13"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" fill="none" stroke="currentColor" stroke-width="2"/><line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" stroke-width="2"/><line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" stroke-width="2"/><line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" stroke-width="2"/></svg><span>' +
      dateText +
      "</span>";
  } else {
    periodEl.innerHTML = '<span class="period-empty">&nbsp;</span>';
  }
  body.appendChild(periodEl);

  card.appendChild(body);
  return card;
}

function sectionHeader(label, count, isSub) {
  const head = document.createElement("div");
  head.className = "section-head" + (isSub ? " section-head-sub" : "");
  const h2 = document.createElement("h2");
  h2.textContent = label;
  head.appendChild(h2);
  if (count != null) {
    const n = document.createElement("span");
    n.className = "section-count";
    n.textContent = count;
    head.appendChild(n);
  }
  return head;
}

function renderFilterTabs(items) {
  const filterNav = document.getElementById("gallery-filter");
  if (!filterNav) return;
  filterNav.replaceChildren();

  const counts = { all: items.length };
  TABS.forEach((tb) => {
    counts[tb.id] = items.filter((p) => (p.category || "personal") === tb.id).length;
  });

  const filterOptions = [
    { id: "all", label: t("filterAll"), count: counts.all },
    ...TABS.map((tb) => ({ id: tb.id, label: tabLabel(tb), count: counts[tb.id] || 0 })),
  ];

  filterOptions.forEach((opt) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "filter-btn" + (currentCategoryFilter === opt.id ? " active" : "");
    btn.innerHTML =
      '<span class="filter-label">' +
      opt.label +
      '</span><span class="filter-count">' +
      opt.count +
      "</span>";
    btn.addEventListener("click", () => {
      if (currentCategoryFilter === opt.id) return;
      currentCategoryFilter = opt.id;
      renderGallery();
    });
    filterNav.appendChild(btn);
  });
}

function renderGallery() {
  const root = document.getElementById("gallery-sections");
  root.replaceChildren();

  const items = currentProjects();
  const total = items.length;

  document.getElementById("gallery-name").textContent = profileName();
  document.getElementById("gallery-tagline").textContent = PROFILE.tagline || "";
  document.getElementById("gallery-count").textContent = t("projectCount").replace(
    "%n",
    total
  );

  renderFilterTabs(items);

  if (!total) {
    const empty = document.createElement("p");
    empty.className = "gallery-empty";
    empty.textContent = t("emptyTab");
    root.appendChild(empty);
    return;
  }

  let seq = 0;
  function grid() {
    const g = document.createElement("div");
    g.className = "card-grid";
    return g;
  }

  const visibleTabs =
    currentCategoryFilter === "all"
      ? TABS
      : TABS.filter((tb) => tb.id === currentCategoryFilter);

  visibleTabs.forEach((tb) => {
    const idx = [];
    items.forEach((p, i) => {
      if ((p.category || "personal") === tb.id) idx.push(i);
    });
    if (!idx.length) return;

    const section = document.createElement("section");
    section.className = "gallery-section";
    section.dataset.category = tb.id;
    section.appendChild(sectionHeader(tabLabel(tb), idx.length, false));

    const regular = idx.filter((i) => !items[i].isStudentWork);
    const student = idx.filter((i) => items[i].isStudentWork);

    if (regular.length || student.length) {
      const g = grid();
      regular.forEach((i) => g.appendChild(buildCard(i, items[i], seq++)));
      student.forEach((i) => g.appendChild(buildCard(i, items[i], seq++)));
      section.appendChild(g);
    }
    root.appendChild(section);
  });
}

// ── 상세 이동 ────────────────────────────────────────────────────
function renderPager() {
  const pager = document.getElementById("detail-pager");
  pager.replaceChildren();
  const items = currentProjects();
  if (current < 0 || items.length < 2) return;

  function link(index, dirLabel, dir) {
    const a = document.createElement("a");
    a.className = "pager-link pager-" + dir;
    a.href = "#p/" + slugOf(index);
    const small = document.createElement("span");
    small.className = "pager-dir";
    small.textContent = dirLabel;
    const title = document.createElement("span");
    title.className = "pager-title";
    title.textContent = items[index].title;
    a.append(small, title);
    return a;
  }

  if (current > 0) pager.appendChild(link(current - 1, t("prevProject"), "prev"));
  if (current < items.length - 1)
    pager.appendChild(link(current + 1, t("nextProject"), "next"));
}

function setDetail(index, animate) {
  const items = currentProjects();
  if (!items[index]) return false;
  const changed = index !== current;
  current = index;
  if (changed && animate) {
    showDetail(() => {
      renderDetail(items[current]);
      renderPager();
    });
  } else {
    renderDetail(items[current]);
    renderPager();
    document.getElementById("detail").classList.remove("switching");
  }
  return true;
}

// 실제로 존재하는 카테고리인지 — TAG_GROUP_ORDER에 없는 키(오타·삭제된 카테고리)는
// 카테고리로 인정하지 않습니다.
function isRealGroup(key) {
  const order = typeof TAG_GROUP_ORDER !== "undefined" ? TAG_GROUP_ORDER : [];
  return !!key && key !== UNGROUPED_KEY && order.indexOf(key) !== -1;
}

// 마인드맵에는 카테고리가 확실히 정해진 태그만 올립니다. 미분류 태그를 아무 카테고리에나
// 끼워 넣으면 그 카테고리의 의미가 무너지므로, 분류될 때까지 그냥 빼둡니다.
function collectSkillTags() {
  const names = typeof TAG_GROUP !== "undefined" ? Object.keys(TAG_GROUP) : [];
  return names
    .filter((name) => isRealGroup(TAG_GROUP[name]))
    .map((name) => ({ name, prof: proficiencyOf(name) }))
    .sort((a, b) => b.prof - a.prof);
}

function skillGroupKey(name) {
  const key = typeof TAG_GROUP !== "undefined" && TAG_GROUP[name];
  return isRealGroup(key) ? key : UNGROUPED_KEY;
}

function skillGroupStyle(key) {
  const entry = typeof TAG_STYLES !== "undefined" && TAG_STYLES[key];
  return entry || UNGROUPED_STYLE;
}

const CATEGORY_LABEL_FALLBACK = {
  engine: "게임 엔진",
  network: "웹",
  graphics: "빌드 · 배포",
  ai: "인프라 · 협업",
  perf: "AI 도구",
  etc: "기타",
  unassigned: "미분류",
};

function categoryLabel(key) {
  const entry = typeof TAG_STYLES !== "undefined" && TAG_STYLES[key];
  if (entry) {
    if (lang !== "ko" && entry["label_" + lang]) return entry["label_" + lang];
    if (entry.label) return entry.label;
  }
  return CATEGORY_LABEL_FALLBACK[key] || key;
}

const PARENT_FONT_MIN = 20;
const PARENT_FONT_MAX = 60;

// 카테고리의 "존재감" = 보유한 태그들의 숙련도 총합. 평균이 아니라 합산이므로
// 태그가 많고 탄탄한 카테고리일수록(예: Unity) 자연히 커집니다 — 카테고리별로 따로
// 계산하지 않고 전체 마인드맵 안에서 상대적으로 정해지는 "유기적인" 크기입니다.
function categoryPower(members) {
  return members.reduce((s, m) => s + m.prof, 0);
}

function buildSkillCategories(tags) {
  const map = new Map();
  tags.forEach((t) => {
    const key = skillGroupKey(t.name);
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(t);
  });
  const cats = [...map.entries()].map(([key, members]) => {
    const sorted = members.slice().sort((a, b) => b.prof - a.prof);
    return { key, members: sorted, power: categoryPower(sorted) };
  });
  const maxPower = Math.max(...cats.map((c) => c.power)) || 1;
  cats.forEach((cat) => {
    const maxChildFont = 11 + 30 * (cat.members[0].prof / 100);
    const globalFont = PARENT_FONT_MIN + (PARENT_FONT_MAX - PARENT_FONT_MIN) * (cat.power / maxPower);
    cat.pFontSize = Math.max(globalFont, maxChildFont + 8);
  });
  // 순서는 수동이 아니라 자동 — 부모 노드가 큰(존재감이 강한) 카테고리일수록
  // 먼저 배치되어 시선이 가장 먼저 닿는 자리(마인드맵 중심 · 블록뷰 맨 위)를 차지합니다.
  cats.sort((a, b) => b.pFontSize - a.pFontSize || a.key.localeCompare(b.key));
  return cats;
}

const CLOUD_VW = 1360;
const SKILL_GAP = 10;

function renderSkillsMindmap(container, tags, styleOf) {
  container.replaceChildren();
  container.style.height = "";
  if (!tags.length) return;
  const w = container.clientWidth;
  if (!w) return;

  const canvas = document.createElement("div");
  canvas.className = "cloud-canvas";
  canvas.style.width = CLOUD_VW + "px";
  container.appendChild(canvas);

  const svgNs = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNs, "svg");
  svg.setAttribute("class", "cloud-lines");
  canvas.appendChild(svg);

  const cats = buildSkillCategories(tags);

  // Phase 1 — create DOM (parent + child bubbles) so real sizes can be measured.
  cats.forEach((cat) => {
    const pStyle = skillGroupStyle(cat.key);
    const pFontSize = cat.pFontSize;
    const pPadX = pFontSize * 0.55 + 5;
    const pPadY = pFontSize * 0.3 + 2;
    const pEl = document.createElement("span");
    pEl.className = "skill-parent";
    pEl.textContent = categoryLabel(cat.key);
    pEl.style.background = pStyle.bg;
    pEl.style.color = pStyle.fg;
    pEl.style.fontSize = pFontSize.toFixed(1) + "px";
    pEl.style.padding = pPadY.toFixed(1) + "px " + pPadX.toFixed(1) + "px";
    pEl.title = categoryLabel(cat.key) + " · " + cat.members.length + "개";
    canvas.appendChild(pEl);
    cat.parentEl = pEl;

    cat.children = cat.members.map((tag) => {
      const style = styleOf(tag.name);
      const el = document.createElement("span");
      el.className = "skill-bubble";
      el.textContent = tagDisplayName(tag.name);
      el.title = tagDisplayName(tag.name) + " · " + tag.prof + "%";
      el.style.background = style.bg;
      el.style.color = style.fg;
      const fontSize = 11 + 30 * (tag.prof / 100);
      const padX = 7 + 14 * (tag.prof / 100);
      const padY = 4 + 8 * (tag.prof / 100);
      el.style.fontSize = fontSize.toFixed(1) + "px";
      el.style.padding = padY.toFixed(1) + "px " + padX.toFixed(1) + "px";
      canvas.appendChild(el);
      return { name: tag.name, prof: tag.prof, el };
    });
  });

  // Phase 2 — measure.
  cats.forEach((cat) => {
    cat.pHalfW = cat.parentEl.offsetWidth / 2;
    cat.pHalfH = cat.parentEl.offsetHeight / 2;
    cat.pDiag = Math.hypot(cat.pHalfW, cat.pHalfH);
    cat.children.forEach((c) => {
      c.halfW = c.el.offsetWidth / 2;
      c.halfH = c.el.offsetHeight / 2;
      c.diag = Math.hypot(c.halfW, c.halfH) + SKILL_GAP / 2;
    });
  });

  // Phase 3 — arc layout for each category's children (biggest-to-smallest sweep,
  // not a full circle) so the size gradient reads cleanly instead of wrapping the
  // smallest tag back around next to the biggest one.
  const ARC_SPAN = (320 * Math.PI) / 180; // 320°, leaving a 40° gap
  cats.forEach((cat) => {
    const n = cat.children.length;
    if (n === 1) {
      const c = cat.children[0];
      const R = cat.pDiag + SKILL_GAP + c.diag;
      c.dx = R;
      c.dy = 0;
      cat.ringR = R;
    } else {
      const totalArcLen = cat.children.reduce((s, c) => s + 2 * c.diag + SKILL_GAP, 0);
      const maxChildDiag = Math.max(...cat.children.map((c) => c.diag));
      const rMin = cat.pDiag + SKILL_GAP + maxChildDiag;
      const R = Math.max(totalArcLen / ARC_SPAN, rMin);
      let angle = -Math.PI / 2 - ARC_SPAN / 2;
      cat.children.forEach((c) => {
        const arc = ((2 * c.diag + SKILL_GAP) / totalArcLen) * ARC_SPAN;
        const mid = angle + arc / 2;
        c.dx = R * Math.cos(mid);
        c.dy = R * Math.sin(mid);
        angle += arc;
      });
      cat.ringR = R;
    }
    const maxChildDiag = Math.max(...cat.children.map((c) => c.diag));
    cat.outerR = Math.max(cat.ringR + maxChildDiag, cat.pDiag);
  });

  // Phase 4 — place category hubs. Categories vary a lot in size (a hub with many
  // children has a much bigger footprint than one with few), so a fixed-angle spiral
  // wastes space: whichever hub's ray happens to graze a big neighbor gets pushed far
  // out even when a nearby angle would clear it easily. Instead, for each hub we scan
  // every angle at each radius ring (starting the sweep at its golden-angle seed for a
  // pleasant, non-repeating distribution) and take the first ring where any angle is
  // free — i.e. true tightest-fit packing rather than one ray per hub.
  const goldenAngle = 137.508 * (Math.PI / 180);
  const cx = CLOUD_VW / 2;
  const cy0 = 10000;
  const RADIAL_STEP = 6;
  const ANGLE_STEP = 0.18;
  const placedCats = [];
  cats.forEach((cat, ci) => {
    let gx = cx;
    let gy = cy0;
    if (ci > 0) {
      const baseAngle = ci * goldenAngle;
      outer: for (let r = 0; r <= 4000; r += RADIAL_STEP) {
        for (let a = 0; a < Math.PI * 2; a += ANGLE_STEP) {
          const angle = baseAngle + a;
          const tx = cx + r * Math.cos(angle);
          const ty = cy0 + r * Math.sin(angle) * 0.85;
          const overlaps = placedCats.some(
            (o) => Math.hypot(tx - o.x, ty - o.y) < cat.outerR + o.r + SKILL_GAP
          );
          const outOfX = tx - cat.outerR < 0 || tx + cat.outerR > CLOUD_VW;
          if (!overlaps && !outOfX) {
            gx = tx;
            gy = ty;
            break outer;
          }
        }
      }
    }
    placedCats.push({ x: gx, y: gy, r: cat.outerR });
    cat.x = gx;
    cat.y = gy;
    cat.children.forEach((c) => {
      c.x = gx + c.dx;
      c.y = gy + c.dy;
    });
  });

  // Phase 5 — bounding box, then shift everything to sit snugly inside the canvas.
  const margin = 28;
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  cats.forEach((cat) => {
    minX = Math.min(minX, cat.x - cat.pHalfW);
    maxX = Math.max(maxX, cat.x + cat.pHalfW);
    minY = Math.min(minY, cat.y - cat.pHalfH);
    maxY = Math.max(maxY, cat.y + cat.pHalfH);
    cat.children.forEach((c) => {
      minX = Math.min(minX, c.x - c.halfW);
      maxX = Math.max(maxX, c.x + c.halfW);
      minY = Math.min(minY, c.y - c.halfH);
      maxY = Math.max(maxY, c.y + c.halfH);
    });
  });
  const offsetX = margin - minX;
  const offsetY = margin - minY;
  const H = Math.ceil(maxY - minY + margin * 2);

  svg.setAttribute("width", CLOUD_VW);
  svg.setAttribute("height", H);
  svg.setAttribute("viewBox", "0 0 " + CLOUD_VW + " " + H);

  // Phase 6 — apply positions, draw connecting lines, set up float + fade-in.
  let seq = 0;
  cats.forEach((cat) => {
    const px = cat.x + offsetX;
    const py = cat.y + offsetY;
    cat.parentEl.style.left = (px - cat.pHalfW).toFixed(1) + "px";
    cat.parentEl.style.top = (py - cat.pHalfH).toFixed(1) + "px";
    setTimeout(() => cat.parentEl.classList.add("in"), 20 + seq++ * 20);

    cat.children.forEach((c) => {
      const ccx = c.x + offsetX;
      const ccy = c.y + offsetY;
      const bw = c.el.offsetWidth;
      const bh = c.el.offsetHeight;
      c.el.style.left = (ccx - bw / 2).toFixed(1) + "px";
      c.el.style.top = (ccy - bh / 2).toFixed(1) + "px";

      const line = document.createElementNS(svgNs, "line");
      line.setAttribute("x1", px.toFixed(1));
      line.setAttribute("y1", py.toFixed(1));
      line.setAttribute("x2", ccx.toFixed(1));
      line.setAttribute("y2", ccy.toFixed(1));
      line.setAttribute("class", "cloud-line");
      svg.appendChild(line);

      const amp = 2 + (100 - c.prof) / 24;
      c.el.style.setProperty("--fx", (Math.random() * 2 - 1) * amp + "px");
      c.el.style.setProperty("--fy", (Math.random() * 2 - 1) * amp + "px");
      c.el.style.setProperty("--fdur", (5 + Math.random() * 4).toFixed(2) + "s");
      c.el.style.setProperty("--fdelay", (Math.random() * -8).toFixed(2) + "s");

      setTimeout(() => c.el.classList.add("in"), 20 + seq++ * 20);
    });
  });

  canvas.style.height = H + "px";
  const scale = w / CLOUD_VW;
  canvas.style.transform = "scale(" + scale + ")";
  container.style.height = Math.round(H * scale) + "px";
}

function renderSkillsCloud() {
  const container = document.getElementById("skills-cloud");
  renderSkillsMindmap(container, collectSkillTags(), tagStyle);
}

function renderSkillsBlocks() {
  const container = document.getElementById("skills-blocks");
  container.replaceChildren();
  const tags = collectSkillTags();
  if (!tags.length) return;
  const cats = buildSkillCategories(tags);
  cats.forEach((cat) => {
    const pStyle = skillGroupStyle(cat.key);
    const row = document.createElement("div");
    row.className = "skill-block-row";

    const label = document.createElement("span");
    label.className = "skill-block-label";
    label.textContent = categoryLabel(cat.key);
    label.style.background = pStyle.bg;
    label.style.color = pStyle.fg;

    const tagsWrap = document.createElement("div");
    tagsWrap.className = "skill-block-tags";
    cat.members.forEach((tag) => {
      const style = tagStyle(tag.name);
      const chip = document.createElement("span");
      chip.className = "skill-block-tag";
      chip.style.background = style.bg;
      chip.style.color = style.fg;
      chip.title = tagDisplayName(tag.name) + " · " + tag.prof + "%";
      chip.textContent = tagDisplayName(tag.name);
      tagsWrap.appendChild(chip);
    });

    row.append(label, tagsWrap);
    container.appendChild(row);
  });
}

// 마인드맵 보기에 배치 버그가 있어 잠시 블록형으로 고정합니다. 고친 뒤 이 값을 null로
// 되돌리고 index.html의 토글에서 hidden만 떼면 원래대로 돌아옵니다.
const SKILLS_VIEW_LOCK = "blocks";

let skillsViewMode = SKILLS_VIEW_LOCK || "blocks";

function applySkillsViewMode() {
  if (SKILLS_VIEW_LOCK) skillsViewMode = SKILLS_VIEW_LOCK;
  const cloudEl = document.getElementById("skills-cloud");
  const blocksEl = document.getElementById("skills-blocks");
  const checkbox = document.getElementById("skills-view-checkbox");
  const label = document.getElementById("skills-view-label");
  if (checkbox) checkbox.checked = skillsViewMode === "blocks";
  if (label) label.textContent = skillsViewMode === "blocks" ? t("viewMindmap") : t("viewBlocks");
  if (skillsViewMode === "blocks") {
    cloudEl.style.display = "none";
    blocksEl.style.display = "flex";
    renderSkillsBlocks();
  } else {
    blocksEl.style.display = "none";
    cloudEl.style.display = "";
    renderSkillsCloud();
  }
}

let cloudResizeTimer;
function scheduleSkillsCloudRelayout() {
  if (currentView !== "skills" || skillsViewMode !== "mindmap") return;
  clearTimeout(cloudResizeTimer);
  cloudResizeTimer = setTimeout(renderSkillsCloud, 200);
}

// 화면은 갤러리 · 상세 · 기술 스택 셋이고, 정본은 URL 해시입니다. 클릭이든 뒤로가기든
// 해시를 바꾸면 route()가 한 곳에서 화면을 맞춥니다.
const VIEW_EL = {
  gallery: "gallery",
  detail: "detail-view",
  skills: "skills",
};

let currentView = "gallery";
let galleryScroll = 0;

function viewEl(view) {
  return document.getElementById(VIEW_EL[view]);
}

function syncNavActive() {
  document
    .querySelector('.nav-link[data-nav="top"]')
    .classList.toggle("active", currentView !== "skills");
  document
    .querySelector('.nav-link[data-nav="skills"]')
    .classList.toggle("active", currentView === "skills");
}

function switchView(view) {
  if (view === currentView) return;
  const hideEl = viewEl(currentView);
  const showEl = viewEl(view);
  if (currentView === "gallery") galleryScroll = window.scrollY;
  currentView = view;
  syncNavActive();

  hideEl.classList.add("view-switching");
  setTimeout(() => {
    hideEl.style.display = "none";
    hideEl.classList.remove("view-switching");
    showEl.style.display = "flex";
    if (view === "skills") applySkillsViewMode();
    showEl.classList.add("view-switching");
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        showEl.classList.remove("view-switching");
        // 갤러리로 돌아올 때는 보던 자리로, 상세로 들어갈 때는 맨 위로 보냅니다.
        if (view === "gallery") window.scrollTo(0, galleryScroll);
        else window.scrollTo(0, 0);
      })
    );
  }, 220);
}

function route() {
  const hash = decodeURIComponent((location.hash || "").replace(/^#/, ""));
  if (hash === "skills") {
    switchView("skills");
    return;
  }
  const m = /^p\/(.+)$/.exec(hash);
  if (m) {
    const index = indexOfSlug(m[1]);
    if (index >= 0) {
      setDetail(index, currentView === "detail");
      switchView("detail");
      return;
    }
    // 이름이 바뀌었거나 없는 프로젝트면 조용히 목록으로 돌립니다.
    history.replaceState(null, "", location.pathname + location.search);
  }
  switchView("gallery");
}

function initNav() {
  const navProjects = document.querySelector('.nav-link[data-nav="top"]');
  const navSkills = document.querySelector('.nav-link[data-nav="skills"]');

  navProjects.addEventListener("click", () => {
    if (location.hash) location.hash = "";
    else route();
  });
  if (!collectSkillTags().length) {
    navSkills.style.display = "none";
  } else {
    navSkills.addEventListener("click", () => {
      location.hash = "#skills";
    });
  }

  document.getElementById("back-btn").addEventListener("click", () => {
    location.hash = "";
  });

  // 상세에서 ← → 로 프로젝트를 넘깁니다. 입력 중일 때는 가로챌 이유가 없습니다.
  document.addEventListener("keydown", (e) => {
    if (currentView !== "detail" || e.metaKey || e.ctrlKey || e.altKey) return;
    const tag = (e.target.tagName || "").toLowerCase();
    if (tag === "input" || tag === "textarea" || e.target.isContentEditable) return;
    const items = currentProjects();
    if (e.key === "ArrowLeft" && current > 0) location.hash = "#p/" + slugOf(current - 1);
    else if (e.key === "ArrowRight" && current < items.length - 1)
      location.hash = "#p/" + slugOf(current + 1);
  });

  window.addEventListener("hashchange", route);

  const skillsViewCheckbox = document.getElementById("skills-view-checkbox");
  skillsViewCheckbox.addEventListener("change", () => {
    if (SKILLS_VIEW_LOCK) return;
    skillsViewMode = skillsViewCheckbox.checked ? "blocks" : "mindmap";
    applySkillsViewMode();
  });

  const dropdown = document.getElementById("lang-dropdown");
  const btn = document.getElementById("lang-btn");
  const menu = document.getElementById("lang-menu");

  function closeMenu() {
    dropdown.classList.remove("open");
    btn.setAttribute("aria-expanded", "false");
  }
  function openMenu() {
    dropdown.classList.add("open");
    btn.setAttribute("aria-expanded", "true");
  }

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (dropdown.classList.contains("open")) closeMenu();
    else openMenu();
  });

  menu.querySelectorAll("li").forEach((li) => {
    li.addEventListener("click", () => {
      lang = li.dataset.lang;
      localStorage.setItem("pf-lang", lang);
      closeMenu();
      applyLanguage();
    });
  });

  document.addEventListener("click", (e) => {
    if (!dropdown.contains(e.target)) closeMenu();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  updateLangDropdown();
}

function updateLangDropdown() {
  const label = document.getElementById("lang-btn-label");
  if (label) label.textContent = LANG_NAMES[lang] || lang;
  document.querySelectorAll("#lang-menu li").forEach((li) => {
    li.classList.toggle("selected", li.dataset.lang === lang);
  });
}

function profileName() {
  if (lang !== "ko" && PROFILE["name_" + lang]) return PROFILE["name_" + lang];
  return PROFILE.name;
}

function renderFooter() {
  const footer = document.getElementById("site-footer");
  footer.replaceChildren();

  const copy = document.createElement("div");
  // "All rights reserved."는 언어와 무관하게 쓰이는 관용 표기라 세 언어 모두 그대로 둡니다.
  copy.append("© " + new Date().getFullYear() + " " + profileName() + ". All rights reserved.");
  if (PROFILE.githubUrl) {
    const a = document.createElement("a");
    a.className = "footer-link";
    a.href = PROFILE.githubUrl;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.textContent = "GitHub";
    copy.append(" · ", a);
  }
  if (PROFILE.email) {
    const a = document.createElement("a");
    a.className = "footer-link";
    a.href = "mailto:" + PROFILE.email;
    a.textContent = PROFILE.email;
    copy.append(" · ", a);
  }
  footer.appendChild(copy);

  const note = document.createElement("p");
  note.className = "footer-note";
  // 일본어는 마침표(。) 뒤에 공백을 두지 않습니다.
  note.append(t("selfBuiltNote") + (lang === "ja" ? "" : " "));
  const rights = document.createElement("span");
  rights.className = "footer-rights";
  rights.textContent = t("rightsNotice");
  note.appendChild(rights);
  footer.appendChild(note);
}

function applyLanguage() {
  document.documentElement.lang = lang;
  document.title = profileName() + " — " + t("titleSuffix");
  document.querySelector('.nav-link[data-nav="top"]').textContent = t("navProjects");
  document.querySelector('.nav-link[data-nav="skills"]').textContent = t("navSkills");
  document.getElementById("skills-title").textContent = t("skillsTitle");
  document.getElementById("back-btn-label").textContent = t("backToList");
  renderGallery();
  if (current >= 0) {
    renderDetail(currentProjects()[current]);
    renderPager();
  } else {
    renderEmpty();
  }
  renderFooter();
  updateLangDropdown();
  if (currentView === "skills") applySkillsViewMode();
}

function init() {
  renderGallery();
  initNav();
  applyLanguage();
  renderFooter();

  // 첫 진입 화면은 해시가 정합니다. switchView는 같은 화면이면 아무 일도 하지 않으므로
  // 갤러리로 들어올 때는 전환 애니메이션 없이 그대로 뜹니다.
  const hash = decodeURIComponent((location.hash || "").replace(/^#/, ""));
  const m = /^p\/(.+)$/.exec(hash);
  if (hash === "skills") {
    currentView = "skills";
    document.getElementById("gallery").style.display = "none";
    viewEl("skills").style.display = "flex";
    applySkillsViewMode();
  } else if (m && indexOfSlug(m[1]) >= 0) {
    currentView = "detail";
    document.getElementById("gallery").style.display = "none";
    viewEl("detail").style.display = "flex";
    setDetail(indexOfSlug(m[1]), false);
  }
  syncNavActive();

  window.addEventListener("resize", scheduleSkillsCloudRelayout);
}

init();
