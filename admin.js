(function () {
  const state = {
    password: typeof ADMIN_PASSWORD !== "undefined" ? ADMIN_PASSWORD : "1234",
    profile: JSON.parse(JSON.stringify(PROFILE)),
    projects: JSON.parse(JSON.stringify(PROJECTS)),
  };
  let adminTab = (
    TABS.find((t) => PROJECTS.some((p) => (p.category || "personal") === t.id)) || TABS[0]
  ).id;
  let dirty = false;
  let toastTimer;

  const $ = (id) => document.getElementById(id);

  function markDirty() {
    dirty = true;
    $("save-btn").classList.add("dirty");
  }

  function toast(msg, isError) {
    const t = $("toast");
    t.textContent = msg;
    t.classList.toggle("error", !!isError);
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("show"), 3000);
  }

  function catOf(p) {
    return p.category || "personal";
  }

  function idxOf(tabId) {
    const out = [];
    state.projects.forEach((p, i) => {
      if (catOf(p) === tabId) out.push(i);
    });
    return out;
  }

  function parseYoutubeId(v) {
    v = v.trim();
    const m = v.match(
      /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/|live\/)|youtu\.be\/)([\w-]{11})/
    );
    if (m) return m[1];
    return v;
  }

  function makeInput(label, value, onInput, opts = {}) {
    const wrap = document.createElement("label");
    wrap.className = "field" + (opts.half ? " half" : "");
    const span = document.createElement("span");
    span.textContent = label;
    const input = document.createElement(opts.textarea ? "textarea" : "input");
    input.value = value || "";
    if (opts.placeholder) input.placeholder = opts.placeholder;
    input.addEventListener("input", () => {
      onInput(input.value);
      markDirty();
    });
    wrap.append(span, input);
    return { wrap, input };
  }

  function iconBtn(label, disabled, onClick) {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "icon-btn";
    b.textContent = label;
    b.disabled = disabled;
    b.addEventListener("click", onClick);
    return b;
  }

  function tagEditor(p) {
    const wrap = document.createElement("div");
    wrap.className = "field";
    const span = document.createElement("span");
    span.textContent = "기술 스택 태그 (입력 후 Enter 로 추가)";
    const box = document.createElement("div");
    box.className = "tag-box";
    const input = document.createElement("input");
    input.placeholder = "예: Unity";

    function renderChips() {
      box.querySelectorAll(".chip").forEach((c) => c.remove());
      (p.tags || []).forEach((t, i) => {
        const chip = document.createElement("span");
        chip.className = "chip";
        const st = TAG_STYLES[TAG_GROUP[t]] || TAG_STYLES.etc;
        chip.style.background = st.bg;
        chip.style.color = st.fg;
        chip.textContent = t;
        const x = document.createElement("button");
        x.type = "button";
        x.textContent = "×";
        x.setAttribute("aria-label", t + " 태그 삭제");
        x.addEventListener("click", () => {
          p.tags.splice(i, 1);
          renderChips();
          markDirty();
        });
        chip.appendChild(x);
        box.insertBefore(chip, input);
      });
    }

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const v = input.value.trim();
        if (v && !(p.tags || []).includes(v)) {
          if (!p.tags) p.tags = [];
          p.tags.push(v);
          renderChips();
          markDirty();
        }
        input.value = "";
      } else if (e.key === "Backspace" && !input.value && (p.tags || []).length) {
        p.tags.pop();
        renderChips();
        markDirty();
      }
    });

    box.appendChild(input);
    renderChips();
    wrap.append(span, box);
    return wrap;
  }

  function moveProject(real, dir) {
    const cat = catOf(state.projects[real]);
    const indices = idxOf(cat);
    const pos = indices.indexOf(real);
    const target = indices[pos + dir];
    if (target === undefined) return;
    const [item] = state.projects.splice(real, 1);
    state.projects.splice(target > real ? target - 1 + 1 : target, 0, item);
    markDirty();
    renderProjects();
  }

  function projectCard(real, pos, count) {
    const p = state.projects[real];
    const card = document.createElement("section");
    card.className = "card project-card";

    const head = document.createElement("div");
    head.className = "card-head";
    const title = document.createElement("h2");
    title.textContent = p.title || "(제목 없음)";
    const controls = document.createElement("div");
    controls.className = "card-controls";

    const sel = document.createElement("select");
    TABS.forEach((t) => {
      const o = document.createElement("option");
      o.value = t.id;
      o.textContent = t.label;
      if (catOf(p) === t.id) o.selected = true;
      sel.appendChild(o);
    });
    sel.addEventListener("change", () => {
      p.category = sel.value;
      markDirty();
      renderTabs();
      renderProjects();
    });

    const up = iconBtn("▲", pos === 0, () => moveProject(real, -1));
    const down = iconBtn("▼", pos === count - 1, () => moveProject(real, +1));
    const del = iconBtn("삭제", false, () => {
      if (confirm('"' + (p.title || "제목 없음") + '" 프로젝트를 삭제할까요?')) {
        state.projects.splice(real, 1);
        markDirty();
        renderTabs();
        renderProjects();
      }
    });
    del.classList.add("danger");
    controls.append(sel, up, down, del);
    head.append(title, controls);
    card.appendChild(head);

    const grid = document.createElement("div");
    grid.className = "field-grid";

    const t1 = makeInput("제목", p.title, (v) => {
      p.title = v;
      title.textContent = v || "(제목 없음)";
    }, { half: true });
    const t2 = makeInput("부제 (한 줄 요약)", p.subtitle, (v) => (p.subtitle = v), {
      half: true,
    });
    grid.append(t1.wrap, t2.wrap);

    const ytRow = document.createElement("div");
    ytRow.className = "yt-row field";
    const yt = makeInput(
      "유튜브 영상 (주소를 그대로 붙여넣어도 됩니다)",
      p.youtubeId,
      (v) => (p.youtubeId = v.trim()),
      { placeholder: "예: https://youtube.com/watch?v=XXXXXXXXXXX" }
    );
    const thumb = document.createElement("img");
    thumb.className = "yt-thumb";
    thumb.alt = "영상 미리보기";
    function refreshThumb() {
      if (p.youtubeId && /^[\w-]{11}$/.test(p.youtubeId)) {
        thumb.src = "https://i.ytimg.com/vi/" + p.youtubeId + "/mqdefault.jpg";
        thumb.style.display = "block";
      } else {
        thumb.style.display = "none";
      }
    }
    thumb.addEventListener("error", () => (thumb.style.display = "none"));
    yt.input.addEventListener("change", () => {
      const id = parseYoutubeId(yt.input.value);
      p.youtubeId = id;
      yt.input.value = id;
      refreshThumb();
    });
    refreshThumb();
    ytRow.append(yt.wrap, thumb);
    grid.appendChild(ytRow);

    grid.appendChild(tagEditor(p));

    const desc = makeInput("설명", p.description, (v) => (p.description = v), {
      textarea: true,
    });
    grid.appendChild(desc.wrap);

    const period = makeInput("기간", p.period, (v) => (p.period = v), {
      half: true,
      placeholder: "예: 2025.01 – 2025.06",
    });
    const role = makeInput("역할", p.role, (v) => (p.role = v), {
      half: true,
      placeholder: "예: 클라이언트 프로그래머",
    });
    grid.append(period.wrap, role.wrap);

    const play = makeInput(
      "플레이 링크 (없으면 비워두세요 — 버튼이 표시되지 않습니다)",
      p.playUrl,
      (v) => (p.playUrl = v.trim()),
      { half: true, placeholder: "https://..." }
    );
    const git = makeInput(
      "GitHub 링크 (없으면 비워두세요)",
      p.githubUrl,
      (v) => (p.githubUrl = v.trim()),
      { half: true, placeholder: "https://github.com/..." }
    );
    grid.append(play.wrap, git.wrap);

    card.appendChild(grid);
    return card;
  }

  function renderTabs() {
    const bar = $("admin-tabs");
    bar.replaceChildren();
    TABS.forEach((t) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "admin-tab" + (t.id === adminTab ? " active" : "");
      b.textContent = t.label + " (" + idxOf(t.id).length + ")";
      b.addEventListener("click", () => {
        adminTab = t.id;
        renderTabs();
        renderProjects();
      });
      bar.appendChild(b);
    });
  }

  function renderProjects() {
    const cont = $("project-cards");
    cont.replaceChildren();
    const indices = idxOf(adminTab);
    if (!indices.length) {
      const p = document.createElement("p");
      p.className = "empty-note";
      p.textContent = "이 탭에 프로젝트가 없습니다. 아래 버튼으로 추가하세요.";
      cont.appendChild(p);
      return;
    }
    indices.forEach((real, pos) => {
      cont.appendChild(projectCard(real, pos, indices.length));
    });
  }

  function bindProfile() {
    const map = {
      "pf-name": "name",
      "pf-tagline": "tagline",
      "pf-github": "githubUrl",
      "pf-email": "email",
    };
    Object.entries(map).forEach(([id, key]) => {
      $(id).value = state.profile[key] || "";
      $(id).addEventListener("input", () => {
        state.profile[key] = $(id).value;
        markDirty();
      });
    });
    $("pf-password").value = state.password;
    $("pf-password").addEventListener("input", () => {
      state.password = $("pf-password").value;
      markDirty();
    });
  }

  function buildDataJs() {
    const j = (v) => JSON.stringify(v, null, 2);
    return (
      "// ============================================================\n" +
      "// 사이트 데이터. admin.html 관리 페이지에서 저장하면 이 파일이\n" +
      "// 자동으로 다시 생성됩니다. 직접 수정해도 됩니다.\n" +
      "// ============================================================\n\n" +
      "const ADMIN_PASSWORD = " + j(state.password) + "; // 관리 페이지 비밀번호\n\n" +
      "const PROFILE = " + j(state.profile) + ";\n\n" +
      "const TABS = " + j(TABS) + ";\n\n" +
      "const PROJECTS = " + j(state.projects) + ";\n\n" +
      "// 태그 색상 계열. 새 태그를 쓰면 여기에 계열만 등록하면 됩니다 (미등록 태그는 회색).\n" +
      "const TAG_GROUP = " + j(TAG_GROUP) + ";\n\n" +
      "const TAG_STYLES = " + j(TAG_STYLES) + ";\n"
    );
  }

  function ghRepoInfo() {
    const host = location.hostname;
    if (host.endsWith(".github.io")) {
      const owner = host.split(".")[0];
      const seg = location.pathname.split("/").filter(Boolean);
      if (seg.length && !seg[0].endsWith(".html")) return { owner, repo: seg[0] };
      return { owner, repo: host };
    }
    return { owner: "pcw0611", repo: "portfolio" };
  }

  const GH_TOKEN_KEY = "pf-gh-token";

  function getGhToken() {
    return localStorage.getItem(GH_TOKEN_KEY) || "";
  }

  function refreshGhBtn() {
    $("gh-btn").textContent = getGhToken() ? "GitHub 연동됨" : "GitHub 연동";
  }

  function askGhToken() {
    const t = prompt(
      "GitHub fine-grained 토큰을 붙여넣으세요.\n" +
        "만들기: github.com → Settings → Developer settings → Fine-grained tokens\n" +
        "Repository access: portfolio 저장소만 / Permissions: Contents → Read and write\n" +
        "(토큰은 이 브라우저에만 저장됩니다. 비워두고 확인하면 연동 해제)"
    );
    if (t === null) return getGhToken();
    if (t.trim()) localStorage.setItem(GH_TOKEN_KEY, t.trim());
    else localStorage.removeItem(GH_TOKEN_KEY);
    refreshGhBtn();
    return getGhToken();
  }

  async function saveToGitHub(content, token) {
    const info = ghRepoInfo();
    const api =
      "https://api.github.com/repos/" + info.owner + "/" + info.repo + "/contents/data.js";
    const h = { Authorization: "Bearer " + token, Accept: "application/vnd.github+json" };
    const cur = await fetch(api, { headers: h });
    if (cur.status === 401 || cur.status === 403) throw { auth: true };
    let sha;
    if (cur.ok) sha = (await cur.json()).sha;
    const bytes = new TextEncoder().encode(content);
    let bin = "";
    bytes.forEach((b) => (bin += String.fromCharCode(b)));
    const res = await fetch(api, {
      method: "PUT",
      headers: h,
      body: JSON.stringify({
        message: "Update portfolio content (admin)",
        content: btoa(bin),
        sha: sha,
      }),
    });
    if (res.status === 401 || res.status === 403) throw { auth: true };
    if (!res.ok) throw new Error("github save failed: " + res.status);
  }

  function downloadDataJs(content) {
    const blob = new Blob([content], { type: "text/javascript" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "data.js";
    a.click();
  }

  async function save() {
    const content = buildDataJs();
    const isLocal =
      location.hostname === "localhost" || location.hostname === "127.0.0.1";

    if (isLocal) {
      try {
        const res = await fetch("/api/save", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content }),
        });
        if (!res.ok) throw new Error("save failed");
        dirty = false;
        $("save-btn").classList.remove("dirty");
        toast("저장되었습니다");
        return;
      } catch {}
    }

    let token = getGhToken();
    if (!token) token = askGhToken();
    if (token) {
      try {
        await saveToGitHub(content, token);
        dirty = false;
        $("save-btn").classList.remove("dirty");
        toast("GitHub에 저장되었습니다 — 1~2분 뒤 사이트에 반영됩니다");
        return;
      } catch (e) {
        if (e && e.auth) {
          localStorage.removeItem(GH_TOKEN_KEY);
          refreshGhBtn();
          toast("토큰이 유효하지 않거나 권한이 없습니다. GitHub 연동을 다시 해주세요.", true);
          return;
        }
        toast("GitHub 저장에 실패해 data.js 파일로 내려받습니다.", true);
      }
    } else {
      toast("GitHub 연동이 없어 data.js 파일로 내려받습니다. 받은 파일로 교체해주세요.", true);
    }
    downloadDataJs(content);
  }

  function openAdmin() {
    $("gate").classList.add("hidden");
    $("admin").classList.remove("hidden");
    bindProfile();
    renderTabs();
    renderProjects();
  }

  function initGate() {
    if (sessionStorage.getItem("pf-admin-ok") === "1") {
      openAdmin();
      return;
    }
    $("gate-form").addEventListener("submit", (e) => {
      e.preventDefault();
      if ($("gate-pw").value === state.password) {
        sessionStorage.setItem("pf-admin-ok", "1");
        openAdmin();
      } else {
        $("gate-err").textContent = "비밀번호가 올바르지 않습니다";
        const card = document.querySelector(".gate-card");
        card.classList.remove("shake");
        void card.offsetWidth;
        card.classList.add("shake");
      }
    });
  }

  $("save-btn").addEventListener("click", save);
  $("gh-btn").addEventListener("click", askGhToken);
  refreshGhBtn();

  $("add-project").addEventListener("click", () => {
    state.projects.push({
      category: adminTab,
      title: "",
      subtitle: "",
      youtubeId: "",
      tags: [],
      description: "",
      period: "",
      role: "",
      playUrl: "",
      githubUrl: "",
    });
    markDirty();
    renderTabs();
    renderProjects();
    const cards = document.querySelectorAll(".project-card");
    if (cards.length)
      cards[cards.length - 1].scrollIntoView({ behavior: "smooth", block: "center" });
  });

  window.addEventListener("beforeunload", (e) => {
    if (dirty) {
      e.preventDefault();
      e.returnValue = "";
    }
  });

  initGate();
})();
