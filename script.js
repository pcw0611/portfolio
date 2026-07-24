const ICONS = {
  play: '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>',
  github:
    '<svg viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>',
  mail: '<svg viewBox="0 0 24 24"><path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/></svg>',
};

const I18N = {
  ko: {
    navProjects: "프로젝트",
    navSkills: "기술 스택",
    projectsLabel: "PROJECTS",
    play: "플레이",
    emptyTab: "이 탭에 표시할 프로젝트가 없습니다",
    skillsTitle: "기술 스택",
    titleSuffix: "포트폴리오",
    selfBuiltNote: "템플릿이 아닌, 프론트엔드까지 직접 구현한 사이트입니다. 문의는 이메일로 부탁드립니다.",
    viewBlocks: "블록형으로 보기",
    viewMindmap: "마인드맵으로 보기",
  },
  en: {
    navProjects: "Projects",
    navSkills: "Skills",
    projectsLabel: "PROJECTS",
    play: "Play",
    emptyTab: "No projects in this tab yet",
    skillsTitle: "Tech stack",
    titleSuffix: "Portfolio",
    selfBuiltNote: "Not a template — I built this site's frontend myself. Feel free to reach out by email.",
    viewBlocks: "View as blocks",
    viewMindmap: "View as mindmap",
  },
  ja: {
    navProjects: "プロジェクト",
    navSkills: "スキル",
    projectsLabel: "PROJECTS",
    play: "プレイ",
    emptyTab: "このタブに表示するプロジェクトはありません",
    skillsTitle: "技術スタック",
    titleSuffix: "ポートフォリオ",
    selfBuiltNote: "テンプレートではなく、フロントエンドまで自分で実装したサイトです。ご質問はメールでお願いします。",
    viewBlocks: "ブロック表示",
    viewMindmap: "マインドマップ表示",
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

let currentTab = TABS[0].id;
let current = -1;

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
  if (tr.role) merged.role = tr.role;
  if (tr.blocks && p.blocks) {
    merged.blocks = p.blocks.map((b, i) =>
      b.type === "text" && tr.blocks[i] ? { type: "text", text: tr.blocks[i] } : b
    );
  }
  return merged;
}

function currentProjects() {
  return projectsOf(currentTab).map(localizeProject);
}

function tabLabel(tb) {
  if (lang !== "ko" && tb["label_" + lang]) return tb["label_" + lang];
  return tb.label;
}

function tagStyle(name) {
  return TAG_STYLES[TAG_GROUP[name]] || TAG_STYLES.etc;
}

function proficiencyOf(name) {
  if (typeof TAG_PROFICIENCY !== "undefined" && TAG_PROFICIENCY[name] != null) {
    return TAG_PROFICIENCY[name];
  }
  return 50;
}

function tagPill(name) {
  const style = tagStyle(name);
  const span = document.createElement("span");
  span.className = "tag";
  span.textContent = name;
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
  const videoWrap = document.getElementById("video-wrap");
  if (p.youtubeId) {
    videoWrap.style.display = "";
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
    videoWrap.replaceChildren();
  }

  document.getElementById("detail-title").textContent = p.title;

  const btns = document.getElementById("link-btns");
  btns.replaceChildren();
  if (p.playUrl) btns.appendChild(linkBtn(p.playUrl, t("play"), "play", true));
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
      const img = document.createElement("img");
      img.className = "block-img";
      img.src = b.src;
      img.alt = p.title;
      img.loading = "lazy";
      blocksEl.appendChild(img);
    } else if (b.type === "text" && b.text) {
      const t = document.createElement("p");
      t.className = "desc";
      t.textContent = b.text;
      blocksEl.appendChild(t);
    }
  });

  const meta = [p.period, p.role].filter(Boolean).join(" · ");
  const metaEl = document.getElementById("detail-meta");
  metaEl.textContent = meta;
  metaEl.style.display = meta ? "" : "none";
}

function renderEmpty() {
  const videoWrap = document.getElementById("video-wrap");
  videoWrap.style.display = "";
  videoWrap.innerHTML =
    '<div class="video-placeholder"><span>' + t("emptyTab") + "</span></div>";
  document.getElementById("detail-title").textContent = "";
  document.getElementById("link-btns").replaceChildren();
  document.getElementById("detail-tags").replaceChildren();
  document.getElementById("detail-blocks").replaceChildren();
  document.getElementById("detail-meta").textContent = "";
}

function updateListHighlight() {
  document.querySelectorAll(".project-item").forEach((el, i) => {
    el.classList.toggle("active", i === current);
  });
}

function showDetail(renderFn) {
  const detail = document.getElementById("detail");
  detail.classList.add("switching");
  setTimeout(() => {
    renderFn();
    detail.classList.remove("switching");
  }, 220);
}

function select(i) {
  if (i === current) return;
  current = i;
  updateListHighlight();
  showDetail(() => renderDetail(currentProjects()[current]));
}

function updateListLabel() {
  const items = projectsOf(currentTab);
  document.getElementById("list-label").textContent =
    t("projectsLabel") + " · " + items.length;
}

function renderList() {
  const list = document.getElementById("project-list");
  list.replaceChildren();
  const items = currentProjects();
  updateListLabel();
  items.forEach((p, i) => {
    const li = document.createElement("li");
    li.className = "project-item";
    li.style.animationDelay = 0.05 + i * 0.05 + "s";
    const h3 = document.createElement("h3");
    h3.textContent = p.title;
    const sub = document.createElement("p");
    sub.textContent = p.subtitle;
    li.append(h3, sub);
    li.addEventListener("click", () => select(i));
    list.appendChild(li);
  });
  updateListHighlight();
}

function updateTabIndicator() {
  const bar = document.getElementById("tab-bar");
  const active = bar.querySelector('.tab-btn[data-tab="' + currentTab + '"]');
  if (!active) return;
  bar.querySelectorAll(".tab-btn").forEach((b) => {
    b.classList.toggle("active", b === active);
  });
  const ind = document.getElementById("tab-indicator");
  ind.style.width = active.offsetWidth + "px";
  ind.style.transform = "translateX(" + active.offsetLeft + "px)";
}

function switchTab(id) {
  if (id === currentTab) return;
  currentTab = id;
  updateTabIndicator();
  renderList();
  const items = currentProjects();
  if (items.length) {
    current = 0;
    updateListHighlight();
    showDetail(() => renderDetail(items[0]));
  } else {
    current = -1;
    showDetail(renderEmpty);
  }
}

function buildTabs() {
  const bar = document.getElementById("tab-bar");
  TABS.forEach((tb) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "tab-btn";
    b.dataset.tab = tb.id;
    b.textContent = tabLabel(tb);
    b.addEventListener("click", () => switchTab(tb.id));
    bar.appendChild(b);
  });
  updateTabIndicator();
}

function collectSkillTags() {
  const names = typeof TAG_GROUP !== "undefined" ? Object.keys(TAG_GROUP) : [];
  return names
    .map((name) => ({ name, prof: proficiencyOf(name) }))
    .sort((a, b) => b.prof - a.prof);
}

function skillGroupKey(name) {
  return (typeof TAG_GROUP !== "undefined" && TAG_GROUP[name]) || "etc";
}

function skillGroupStyle(key) {
  const entry = typeof TAG_STYLES !== "undefined" && TAG_STYLES[key];
  return entry || { bg: "#2C2C2A", fg: "#D3D1C7" };
}

const CATEGORY_LABEL_FALLBACK = {
  engine: "게임 엔진",
  network: "웹",
  graphics: "빌드 · 배포",
  ai: "인프라 · 협업",
  perf: "AI 도구",
  etc: "기타",
};

function categoryLabel(key) {
  const entry = typeof TAG_STYLES !== "undefined" && TAG_STYLES[key];
  if (entry) {
    if (lang !== "ko" && entry["label_" + lang]) return entry["label_" + lang];
    if (entry.label) return entry.label;
  }
  return CATEGORY_LABEL_FALLBACK[key] || key;
}

function categoryOrderIndex(key) {
  const order = typeof TAG_GROUP_ORDER !== "undefined" ? TAG_GROUP_ORDER : [];
  const i = order.indexOf(key);
  return i === -1 ? order.length : i;
}

function buildSkillCategories(tags) {
  const map = new Map();
  tags.forEach((t) => {
    const key = skillGroupKey(t.name);
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(t);
  });
  const cats = [...map.entries()].map(([key, members]) => ({
    key,
    members: members.slice().sort((a, b) => b.prof - a.prof),
  }));
  cats.sort((a, b) => categoryOrderIndex(a.key) - categoryOrderIndex(b.key));
  return cats;
}

const CLOUD_VW = 1360;
const SKILL_GAP = 16;

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
    const avgProf = cat.members.reduce((s, m) => s + m.prof, 0) / cat.members.length;
    const maxChildFont = Math.max(...cat.members.map((m) => 11 + 30 * (m.prof / 100)));
    const avgFont = 18 + 34 * (avgProf / 100);
    const pFontSize = Math.max(avgFont, maxChildFont + 8);
    const pPadX = pFontSize * 0.75 + 6;
    const pPadY = pFontSize * 0.4 + 3;
    const pEl = document.createElement("span");
    pEl.className = "skill-parent";
    pEl.textContent = categoryLabel(cat.key);
    pEl.style.background = pStyle.bg;
    pEl.style.color = pStyle.fg;
    pEl.style.fontSize = pFontSize.toFixed(1) + "px";
    pEl.style.padding = pPadY.toFixed(1) + "px " + pPadX.toFixed(1) + "px";
    pEl.title = categoryLabel(cat.key) + " · " + Math.round(avgProf) + "%";
    canvas.appendChild(pEl);
    cat.parentEl = pEl;

    cat.children = cat.members.map((tag) => {
      const style = styleOf(tag.name);
      const el = document.createElement("span");
      el.className = "skill-bubble";
      el.textContent = tag.name;
      el.title = tag.name + " · " + tag.prof + "%";
      el.style.background = style.bg;
      el.style.color = style.fg;
      const fontSize = 11 + 30 * (tag.prof / 100);
      const padX = 9 + 22 * (tag.prof / 100);
      const padY = 5 + 12 * (tag.prof / 100);
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
  const ARC_SPAN = (Math.PI * 2 * 5) / 6; // 300°, leaving a 60° gap
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

  // Phase 4 — place category hubs (golden-angle spiral, width bounded, height free).
  const goldenAngle = 137.508 * (Math.PI / 180);
  const cx = CLOUD_VW / 2;
  const cy0 = 10000;
  const placedCats = [];
  cats.forEach((cat, ci) => {
    let gx = cx;
    let gy = cy0;
    if (ci > 0) {
      let angle = ci * goldenAngle;
      let r = 0;
      for (let a = 0; a < 700; a++) {
        gx = cx + r * Math.cos(angle);
        gy = cy0 + r * Math.sin(angle) * 0.85;
        const overlaps = placedCats.some(
          (o) => Math.hypot(gx - o.x, gy - o.y) < cat.outerR + o.r + SKILL_GAP
        );
        const outOfX = gx - cat.outerR < 0 || gx + cat.outerR > CLOUD_VW;
        if (!overlaps && !outOfX) break;
        r += 8;
        angle += 0.32;
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

      const amp = 3 + (100 - c.prof) / 15;
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
      chip.title = tag.name + " · " + tag.prof + "%";
      chip.textContent = tag.name;
      tagsWrap.appendChild(chip);
    });

    row.append(label, tagsWrap);
    container.appendChild(row);
  });
}

let skillsViewMode = localStorage.getItem("pf-skills-view") === "blocks" ? "blocks" : "mindmap";

function applySkillsViewMode() {
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

let currentView = "projects";

function switchView(view) {
  if (view === currentView) return;
  const layout = document.querySelector(".layout");
  const skills = document.getElementById("skills");
  const showEl = view === "skills" ? skills : layout;
  const hideEl = view === "skills" ? layout : skills;
  currentView = view;

  document
    .querySelector('.nav-link[data-nav="top"]')
    .classList.toggle("active", view === "projects");
  document
    .querySelector('.nav-link[data-nav="skills"]')
    .classList.toggle("active", view === "skills");

  hideEl.classList.add("view-switching");
  setTimeout(() => {
    hideEl.style.display = "none";
    showEl.style.display = "flex";
    if (view === "skills") applySkillsViewMode();
    showEl.classList.add("view-switching");
    requestAnimationFrame(() =>
      requestAnimationFrame(() => showEl.classList.remove("view-switching"))
    );
  }, 260);
}

function initNav() {
  const navProjects = document.querySelector('.nav-link[data-nav="top"]');
  const navSkills = document.querySelector('.nav-link[data-nav="skills"]');

  navProjects.addEventListener("click", () => switchView("projects"));
  if (!collectSkillTags().length) {
    navSkills.style.display = "none";
  } else {
    navSkills.addEventListener("click", () => switchView("skills"));
  }

  const skillsViewCheckbox = document.getElementById("skills-view-checkbox");
  skillsViewCheckbox.addEventListener("change", () => {
    skillsViewMode = skillsViewCheckbox.checked ? "blocks" : "mindmap";
    localStorage.setItem("pf-skills-view", skillsViewMode);
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
  copy.append("© " + new Date().getFullYear() + " " + profileName());
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
  note.append(t("selfBuiltNote"));
  footer.appendChild(note);
}

function applyLanguage() {
  document.documentElement.lang = lang;
  document.title = profileName() + " — " + t("titleSuffix");
  document.querySelector('.nav-link[data-nav="top"]').textContent = t("navProjects");
  document.querySelector('.nav-link[data-nav="skills"]').textContent = t("navSkills");
  document.getElementById("skills-title").textContent = t("skillsTitle");
  TABS.forEach((tb) => {
    const btn = document.querySelector('.tab-btn[data-tab="' + tb.id + '"]');
    if (btn) btn.textContent = tabLabel(tb);
  });
  updateTabIndicator();
  updateListLabel();
  renderList();
  if (current >= 0) renderDetail(currentProjects()[current]);
  else renderEmpty();
  renderFooter();
  updateLangDropdown();
  if (currentView === "skills") applySkillsViewMode();
}

function init() {
  const firstFilled = TABS.find((tb) => projectsOf(tb.id).length);
  if (firstFilled) currentTab = firstFilled.id;

  buildTabs();
  renderList();

  const items = currentProjects();
  if (items.length) {
    current = 0;
    updateListHighlight();
    renderDetail(items[0]);
  } else {
    renderEmpty();
  }

  renderFooter();

  requestAnimationFrame(() =>
    requestAnimationFrame(() =>
      document.getElementById("detail").classList.remove("switching")
    )
  );

  initNav();
  applyLanguage();

  window.addEventListener("resize", updateTabIndicator);
  window.addEventListener("resize", scheduleSkillsCloudRelayout);
  if (document.fonts && document.fonts.ready)
    document.fonts.ready.then(updateTabIndicator);
}

init();
