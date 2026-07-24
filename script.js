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
  },
  en: {
    navProjects: "Projects",
    navSkills: "Skills",
    projectsLabel: "PROJECTS",
    play: "Play",
    emptyTab: "No projects in this tab yet",
    skillsTitle: "Tech stack",
    titleSuffix: "Portfolio",
  },
  ja: {
    navProjects: "プロジェクト",
    navSkills: "スキル",
    projectsLabel: "PROJECTS",
    play: "プレイ",
    emptyTab: "このタブに表示するプロジェクトはありません",
    skillsTitle: "技術スタック",
    titleSuffix: "ポートフォリオ",
  },
};

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

function tagStyle(name) {
  if (typeof TAG_CUSTOM !== "undefined" && TAG_CUSTOM[name]) return TAG_CUSTOM[name];
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
  document.getElementById("detail-meta").textContent = meta;
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
  showDetail(() => renderDetail(projectsOf(currentTab)[current]));
}

function updateListLabel() {
  const items = projectsOf(currentTab);
  document.getElementById("list-label").textContent =
    t("projectsLabel") + " · " + items.length;
}

function renderList() {
  const list = document.getElementById("project-list");
  list.replaceChildren();
  const items = projectsOf(currentTab);
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
  const items = projectsOf(currentTab);
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
  TABS.forEach((t) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "tab-btn";
    b.dataset.tab = t.id;
    b.textContent = t.label;
    b.addEventListener("click", () => switchTab(t.id));
    bar.appendChild(b);
  });
  updateTabIndicator();
}

function renderSkillsCloud() {
  const section = document.getElementById("skills");
  const container = document.getElementById("skills-cloud");
  const names = [...new Set(PROJECTS.flatMap((p) => p.tags || []))];

  if (!names.length) {
    section.classList.add("hidden");
    return;
  }
  section.classList.remove("hidden");

  const tags = names
    .map((name) => ({ name, prof: proficiencyOf(name) }))
    .sort((a, b) => b.prof - a.prof);

  container.replaceChildren();
  const w = container.clientWidth;
  const h = container.clientHeight;
  if (!w || !h) return;
  const k = Math.max(0.6, Math.min(1, w / 900));

  const els = tags.map((tag) => {
    const style = tagStyle(tag.name);
    const el = document.createElement("span");
    el.className = "skill-bubble";
    el.textContent = tag.name;
    el.title = tag.name + " · " + tag.prof + "%";
    el.style.background = style.bg;
    el.style.color = style.fg;
    const fontSize = (14 + 20 * (tag.prof / 100)) * k;
    const padX = (14 + 16 * (tag.prof / 100)) * k;
    const padY = (7 + 9 * (tag.prof / 100)) * k;
    el.style.fontSize = fontSize.toFixed(1) + "px";
    el.style.padding = padY.toFixed(1) + "px " + padX.toFixed(1) + "px";
    container.appendChild(el);
    return el;
  });

  const cx = w / 2;
  const cy = h / 2;
  const placed = [];
  const goldenAngle = 137.508 * (Math.PI / 180);

  els.forEach((el, i) => {
    const bw = el.offsetWidth;
    const bh = el.offsetHeight;
    const halfW = bw / 2 + 5;
    const halfH = bh / 2 + 5;
    let angle = i * goldenAngle;
    let r = 0;
    let x = cx;
    let y = cy;
    let attempts = 0;
    while (attempts < 260) {
      x = cx + r * Math.cos(angle);
      y = cy + r * Math.sin(angle) * 0.78;
      const outOfBounds =
        x - halfW < 0 || x + halfW > w || y - halfH < 0 || y + halfH > h;
      const overlaps = placed.some(
        (o) => Math.abs(x - o.x) < halfW + o.halfW && Math.abs(y - o.y) < halfH + o.halfH
      );
      if (!overlaps && !outOfBounds) break;
      r += 5;
      angle += 0.32;
      attempts++;
    }
    placed.push({ x, y, halfW, halfH });
    el.style.left = (x - bw / 2).toFixed(1) + "px";
    el.style.top = (y - bh / 2).toFixed(1) + "px";

    const amp = 7 + (100 - tags[i].prof) / 7;
    el.style.setProperty("--fx", (Math.random() * 2 - 1) * amp + "px");
    el.style.setProperty("--fy", (Math.random() * 2 - 1) * amp + "px");
    el.style.setProperty("--fdur", (5 + Math.random() * 4).toFixed(2) + "s");
    el.style.setProperty("--fdelay", (Math.random() * -8).toFixed(2) + "s");

    setTimeout(() => el.classList.add("in"), 20 + i * 25);
  });
}

let cloudResizeTimer;
function scheduleSkillsCloudRelayout() {
  clearTimeout(cloudResizeTimer);
  cloudResizeTimer = setTimeout(renderSkillsCloud, 200);
}

function initNav() {
  const navProjects = document.querySelector('.nav-link[data-nav="top"]');
  const navSkills = document.querySelector('.nav-link[data-nav="skills"]');
  const layout = document.querySelector(".layout");
  const skills = document.getElementById("skills");

  navProjects.addEventListener("click", () =>
    layout.scrollIntoView({ behavior: "smooth", block: "start" })
  );
  navSkills.addEventListener("click", () =>
    skills.scrollIntoView({ behavior: "smooth", block: "start" })
  );

  const sections = [
    { el: layout, btn: navProjects },
    { el: skills, btn: navSkills },
  ];
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          sections.forEach((s) => s.btn.classList.toggle("active", s.el === entry.target));
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach((s) => io.observe(s.el));

  const sel = document.getElementById("lang-select");
  sel.value = lang;
  sel.addEventListener("change", () => {
    lang = sel.value;
    localStorage.setItem("pf-lang", lang);
    applyLanguage();
  });
}

function applyLanguage() {
  document.documentElement.lang = lang;
  document.title = PROFILE.name + " — " + t("titleSuffix");
  document.querySelector('.nav-link[data-nav="top"]').textContent = t("navProjects");
  document.querySelector('.nav-link[data-nav="skills"]').textContent = t("navSkills");
  document.getElementById("skills-title").textContent = t("skillsTitle");
  updateListLabel();
  if (current >= 0) renderDetail(projectsOf(currentTab)[current]);
  else renderEmpty();
  const sel = document.getElementById("lang-select");
  if (sel) sel.value = lang;
}

function init() {
  const firstFilled = TABS.find((tb) => projectsOf(tb.id).length);
  if (firstFilled) currentTab = firstFilled.id;

  buildTabs();
  renderList();

  const items = projectsOf(currentTab);
  if (items.length) {
    current = 0;
    updateListHighlight();
    renderDetail(items[0]);
  } else {
    renderEmpty();
  }

  const footer = document.getElementById("site-footer");
  footer.textContent = "© " + new Date().getFullYear() + " " + PROFILE.name;
  if (PROFILE.githubUrl) {
    const a = document.createElement("a");
    a.className = "footer-link";
    a.href = PROFILE.githubUrl;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.textContent = "GitHub";
    footer.append(" · ", a);
  }
  if (PROFILE.email) {
    const a = document.createElement("a");
    a.className = "footer-link";
    a.href = "mailto:" + PROFILE.email;
    a.textContent = PROFILE.email;
    footer.append(" · ", a);
  }

  requestAnimationFrame(() =>
    requestAnimationFrame(() =>
      document.getElementById("detail").classList.remove("switching")
    )
  );

  initNav();
  renderSkillsCloud();
  applyLanguage();

  window.addEventListener("resize", updateTabIndicator);
  window.addEventListener("resize", scheduleSkillsCloudRelayout);
  if (document.fonts && document.fonts.ready)
    document.fonts.ready.then(updateTabIndicator);
}

init();
