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

  const customTags = typeof TAG_CUSTOM !== "undefined" ? TAG_CUSTOM : {};
  const proficiency = typeof TAG_PROFICIENCY !== "undefined" ? TAG_PROFICIENCY : {};
  const openCards = new WeakSet();

  function profOf(name) {
    return proficiency[name] != null ? proficiency[name] : 50;
  }

  function updateTagDatalist() {
    const dl = $("tag-suggestions");
    if (!dl) return;
    dl.replaceChildren();
    Object.keys(TAG_GROUP).forEach((name) => {
      const o = document.createElement("option");
      o.value = name;
      dl.appendChild(o);
    });
  }

  function tagStyleOf(name) {
    if (customTags[name]) return customTags[name];
    return TAG_STYLES[TAG_GROUP[name]] || TAG_STYLES.etc;
  }

  function hexToHsl(hex) {
    const n = parseInt(hex.slice(1), 16);
    const r = ((n >> 16) & 255) / 255;
    const g = ((n >> 8) & 255) / 255;
    const b = (n & 255) / 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;
    const d = max - min;
    if (d) {
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
      else if (max === g) h = (b - r) / d + 2;
      else h = (r - g) / d + 4;
      h *= 60;
    }
    return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) };
  }

  function customStyleFrom(hex) {
    const hsl = hexToHsl(hex);
    const s = hsl.s < 10 ? hsl.s : Math.max(30, Math.min(70, hsl.s));
    return {
      bg: "hsl(" + hsl.h + ", " + s + "%, 16%)",
      fg: "hsl(" + hsl.h + ", " + s + "%, 78%)",
    };
  }

  const GROUP_ORDER = ["engine", "network", "graphics", "ai", "perf", "etc"];
  const GROUP_LABELS = {
    engine: "보라",
    network: "청록",
    graphics: "코랄",
    ai: "핑크",
    perf: "앰버",
    etc: "회색",
  };

  function registerAllTags() {
    state.projects.forEach((p) =>
      (p.tags || []).forEach((t) => {
        if (!(t in TAG_GROUP)) TAG_GROUP[t] = "etc";
      })
    );
  }

  function renderTagPresets() {
    const cont = $("tag-presets");
    cont.replaceChildren();
    const names = Object.keys(TAG_GROUP);
    if (!names.length) {
      const p = document.createElement("p");
      p.className = "empty-note";
      p.textContent = "등록된 태그가 없습니다. 프로젝트에 태그를 추가하면 자동으로 등록됩니다.";
      cont.appendChild(p);
      return;
    }
    names.forEach((name) => {
      const row = document.createElement("div");
      row.className = "tag-row";
      const chip = document.createElement("span");
      chip.className = "chip";
      const st = tagStyleOf(name);
      chip.style.background = st.bg;
      chip.style.color = st.fg;
      chip.textContent = name;

      const profWrap = document.createElement("div");
      profWrap.className = "prof-wrap";
      const profRange = document.createElement("input");
      profRange.type = "range";
      profRange.min = "0";
      profRange.max = "100";
      profRange.step = "5";
      profRange.value = String(profOf(name));
      profRange.setAttribute("aria-label", name + " 숙련도");
      const profOut = document.createElement("span");
      profOut.className = "prof-out";
      profOut.textContent = profOf(name) + "%";
      profRange.addEventListener("input", () => {
        proficiency[name] = parseInt(profRange.value, 10);
        profOut.textContent = proficiency[name] + "%";
        markDirty();
      });
      profWrap.append(profRange, profOut);

      const dots = document.createElement("span");
      dots.className = "color-dots";
      GROUP_ORDER.forEach((g) => {
        const d = document.createElement("button");
        d.type = "button";
        d.className =
          "color-dot" + (!customTags[name] && TAG_GROUP[name] === g ? " selected" : "");
        d.style.background = TAG_STYLES[g].fg;
        d.title = GROUP_LABELS[g];
        d.setAttribute("aria-label", name + " 색상: " + GROUP_LABELS[g]);
        d.addEventListener("click", () => {
          delete customTags[name];
          TAG_GROUP[name] = g;
          markDirty();
          renderTagPresets();
          renderProjects();
        });
        dots.appendChild(d);
      });
      const customDot = document.createElement("label");
      customDot.className =
        "color-dot custom-dot" + (customTags[name] ? " selected" : "");
      customDot.title = "커스텀 색 (클릭해서 직접 선택)";
      if (customTags[name]) customDot.style.background = customTags[name].fg;
      const ci = document.createElement("input");
      ci.type = "color";
      ci.value = (customTags[name] && customTags[name].base) || "#7f77dd";
      ci.setAttribute("aria-label", name + " 커스텀 색상 선택");
      ci.addEventListener("change", () => {
        const st = customStyleFrom(ci.value);
        st.base = ci.value;
        customTags[name] = st;
        markDirty();
        renderTagPresets();
        renderProjects();
      });
      customDot.appendChild(ci);
      dots.appendChild(customDot);
      const del = document.createElement("button");
      del.type = "button";
      del.className = "icon-btn danger tag-del";
      del.textContent = "×";
      del.setAttribute("aria-label", name + " 프리셋 삭제");
      del.addEventListener("click", () => {
        delete TAG_GROUP[name];
        delete customTags[name];
        markDirty();
        renderTagPresets();
        renderProjects();
      });
      row.append(chip, profWrap, dots, del);
      cont.appendChild(row);
    });
    updateTagDatalist();
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
    input.setAttribute("list", "tag-suggestions");

    function addTag(v) {
      v = v.trim();
      if (!v || (p.tags || []).includes(v)) return;
      if (!p.tags) p.tags = [];
      p.tags.push(v);
      if (!(v in TAG_GROUP)) {
        TAG_GROUP[v] = "etc";
        renderTagPresets();
      }
      renderChips();
      markDirty();
    }

    function renderChips() {
      box.querySelectorAll(".chip").forEach((c) => c.remove());
      (p.tags || []).forEach((t, i) => {
        const chip = document.createElement("span");
        chip.className = "chip";
        const st = tagStyleOf(t);
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
        addTag(input.value);
        input.value = "";
      } else if (e.key === "Backspace" && !input.value && (p.tags || []).length) {
        p.tags.pop();
        renderChips();
        markDirty();
      }
    });
    input.addEventListener("change", () => {
      if (input.value.trim() in TAG_GROUP) {
        addTag(input.value);
        input.value = "";
      }
    });

    box.appendChild(input);
    renderChips();
    wrap.append(span, box);
    return wrap;
  }

  function abToB64(buf) {
    const u8 = new Uint8Array(buf);
    let bin = "";
    const chunk = 0x8000;
    for (let i = 0; i < u8.length; i += chunk) {
      bin += String.fromCharCode.apply(null, u8.subarray(i, i + chunk));
    }
    return btoa(bin);
  }

  function sanitizeFileName(name) {
    const dot = name.lastIndexOf(".");
    const ext = dot >= 0 ? name.slice(dot).toLowerCase().replace(/[^a-z0-9.]/g, "") : "";
    let base = (dot >= 0 ? name.slice(0, dot) : name)
      .toLowerCase()
      .replace(/[^a-z0-9-_]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
    if (!base) base = "img";
    return base.slice(0, 40) + ext;
  }

  async function uploadImage(file) {
    const b64 = abToB64(await file.arrayBuffer());
    const name = Date.now() + "-" + sanitizeFileName(file.name);
    const isLocal =
      location.hostname === "localhost" || location.hostname === "127.0.0.1";

    if (isLocal) {
      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: name, data: b64 }),
        });
        if (res.ok) return (await res.json()).path;
      } catch {}
    }

    let token = getGhToken();
    if (!token) token = askGhToken();
    if (!token) throw new Error("no-upload-path");
    const info = ghRepoInfo();
    const api =
      "https://api.github.com/repos/" + info.owner + "/" + info.repo + "/contents/img/" + name;
    const res = await fetch(api, {
      method: "PUT",
      headers: { Authorization: "Bearer " + token, Accept: "application/vnd.github+json" },
      body: JSON.stringify({ message: "Upload image (admin)", content: b64 }),
    });
    if (res.status === 401 || res.status === 403) {
      localStorage.removeItem(GH_TOKEN_KEY);
      refreshGhBtn();
      throw new Error("no-upload-path");
    }
    if (!res.ok) throw new Error("upload failed: " + res.status);
    return "img/" + name;
  }

  function blocksEditor(p) {
    if (!p.blocks) {
      p.blocks = p.description ? [{ type: "text", text: p.description }] : [];
      delete p.description;
    }
    const wrap = document.createElement("div");
    wrap.className = "field";
    const span = document.createElement("span");
    span.textContent = "콘텐츠 (글 · 이미지를 원하는 순서로)";
    const list = document.createElement("div");
    list.className = "block-list";

    function render() {
      list.replaceChildren();
      if (!p.blocks.length) {
        const e = document.createElement("p");
        e.className = "empty-note";
        e.textContent = "아래 버튼으로 글이나 이미지를 추가하세요.";
        list.appendChild(e);
      }
      p.blocks.forEach((b, i) => {
        const row = document.createElement("div");
        row.className = "block-row";
        const body = document.createElement("div");
        body.className = "block-body";
        if (b.type === "image") {
          const img = document.createElement("img");
          img.className = "block-thumb";
          img.src = b.src;
          img.alt = "";
          img.addEventListener("error", () => (img.style.display = "none"));
          const cap = document.createElement("span");
          cap.className = "block-cap";
          cap.textContent = b.src;
          body.append(img, cap);
        } else {
          const ta = document.createElement("textarea");
          ta.value = b.text || "";
          ta.placeholder = "설명을 입력하세요";
          ta.addEventListener("input", () => {
            b.text = ta.value;
            markDirty();
          });
          body.appendChild(ta);
        }
        const ctr = document.createElement("div");
        ctr.className = "block-controls";
        const up = iconBtn("▲", i === 0, () => {
          [p.blocks[i - 1], p.blocks[i]] = [p.blocks[i], p.blocks[i - 1]];
          markDirty();
          render();
        });
        const down = iconBtn("▼", i === p.blocks.length - 1, () => {
          [p.blocks[i + 1], p.blocks[i]] = [p.blocks[i], p.blocks[i + 1]];
          markDirty();
          render();
        });
        const del = iconBtn("삭제", false, () => {
          p.blocks.splice(i, 1);
          markDirty();
          render();
        });
        del.classList.add("danger");
        ctr.append(up, down, del);
        row.append(body, ctr);
        list.appendChild(row);
      });
    }

    const btns = document.createElement("div");
    btns.className = "block-add";
    const addText = iconBtn("+ 글", false, () => {
      p.blocks.push({ type: "text", text: "" });
      markDirty();
      render();
    });
    const addImg = iconBtn("+ 이미지 (GIF 가능)", false, () => {
      const fi = document.createElement("input");
      fi.type = "file";
      fi.accept = "image/*";
      fi.addEventListener("change", async () => {
        const f = fi.files[0];
        if (!f) return;
        if (f.size > 15 * 1024 * 1024) {
          toast("이미지가 너무 큽니다 (15MB 이하)", true);
          return;
        }
        toast("이미지 업로드 중…");
        try {
          const path = await uploadImage(f);
          p.blocks.push({ type: "image", src: path });
          markDirty();
          render();
          toast("이미지가 추가되었습니다. 저장을 눌러야 사이트에 반영됩니다");
        } catch (e) {
          toast(
            e && e.message === "no-upload-path"
              ? "이미지 업로드에는 로컬 서버 실행 또는 GitHub 연동이 필요합니다"
              : "이미지 업로드에 실패했습니다",
            true
          );
        }
      });
      fi.click();
    });
    btns.append(addText, addImg);

    render();
    wrap.append(span, list, btns);
    return wrap;
  }

  const I18N_LANGS = [
    { code: "en", label: "English" },
    { code: "ja", label: "日本語" },
  ];

  function i18nEditor(p) {
    const wrap = document.createElement("div");
    wrap.className = "field";
    const span = document.createElement("span");
    span.textContent = "다국어 번역 (선택 — 비워두면 한국어 내용이 그대로 표시됩니다)";
    const tabBar = document.createElement("div");
    tabBar.className = "i18n-tab-bar";
    const panel = document.createElement("div");
    let activeLang = "en";

    function setField(key, v) {
      if (!p.i18n) p.i18n = {};
      if (!p.i18n[activeLang]) p.i18n[activeLang] = {};
      p.i18n[activeLang][key] = v;
    }

    function setBlockField(i, v) {
      if (!p.i18n) p.i18n = {};
      if (!p.i18n[activeLang]) p.i18n[activeLang] = {};
      if (!p.i18n[activeLang].blocks) p.i18n[activeLang].blocks = {};
      p.i18n[activeLang].blocks[i] = v;
    }

    function renderPanel() {
      panel.replaceChildren();
      const tr = (p.i18n && p.i18n[activeLang]) || {};
      const grid = document.createElement("div");
      grid.className = "field-grid";
      grid.appendChild(
        makeInput("제목", tr.title, (v) => setField("title", v), {
          half: true,
          placeholder: p.title,
        }).wrap
      );
      grid.appendChild(
        makeInput("부제", tr.subtitle, (v) => setField("subtitle", v), {
          half: true,
          placeholder: p.subtitle,
        }).wrap
      );
      grid.appendChild(
        makeInput("역할", tr.role, (v) => setField("role", v), {
          half: true,
          placeholder: p.role,
        }).wrap
      );
      (p.blocks || []).forEach((b, i) => {
        if (b.type !== "text") return;
        grid.appendChild(
          makeInput(
            "콘텐츠 텍스트 #" + (i + 1),
            tr.blocks && tr.blocks[i],
            (v) => setBlockField(i, v),
            { textarea: true, placeholder: b.text }
          ).wrap
        );
      });
      panel.appendChild(grid);
    }

    function renderTabBar() {
      tabBar.replaceChildren();
      I18N_LANGS.forEach((l) => {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "i18n-tab" + (l.code === activeLang ? " active" : "");
        b.textContent = l.label;
        b.addEventListener("click", () => {
          activeLang = l.code;
          renderTabBar();
          renderPanel();
        });
        tabBar.appendChild(b);
      });
    }

    renderTabBar();
    renderPanel();
    wrap.append(span, tabBar, panel);
    return wrap;
  }

  function parsePeriod(str) {
    const found = (str || "").match(/\d{4}[.\-\/]\d{1,2}/g) || [];
    const toVal = (s) => {
      const m = s.match(/(\d{4})[.\-\/](\d{1,2})/);
      return m[1] + "-" + m[2].padStart(2, "0");
    };
    return {
      start: found[0] ? toVal(found[0]) : "",
      end: found[1] ? toVal(found[1]) : "",
      ongoing: /진행/.test(str || ""),
    };
  }

  function periodEditor(p) {
    const wrap = document.createElement("div");
    wrap.className = "field half";
    const span = document.createElement("span");
    span.textContent = "기간";
    const row = document.createElement("div");
    row.className = "period-row";
    const start = document.createElement("input");
    start.type = "month";
    const dash = document.createElement("span");
    dash.className = "period-dash";
    dash.textContent = "–";
    const end = document.createElement("input");
    end.type = "month";
    const ongoingLabel = document.createElement("label");
    ongoingLabel.className = "period-ongoing";
    const ongoing = document.createElement("input");
    ongoing.type = "checkbox";
    ongoingLabel.append(ongoing, document.createTextNode("진행 중"));

    const init = parsePeriod(p.period);
    start.value = init.start;
    end.value = init.ongoing ? "" : init.end;
    ongoing.checked = init.ongoing;
    end.disabled = ongoing.checked;

    const fmt = (v) => (v ? v.replace("-", ".") : "");
    function compose() {
      end.disabled = ongoing.checked;
      const s = fmt(start.value);
      const e = ongoing.checked ? "진행 중" : fmt(end.value);
      p.period = s && e ? s + " – " + e : s || e || "";
      markDirty();
    }
    start.addEventListener("change", compose);
    end.addEventListener("change", compose);
    ongoing.addEventListener("change", compose);

    row.append(start, dash, end, ongoingLabel);
    wrap.append(span, row);
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
    card.className = "card project-card fold" + (openCards.has(p) ? " open" : "");

    const head = document.createElement("div");
    head.className = "card-head";
    const title = document.createElement("h2");
    title.textContent = p.title || "(제목 없음)";
    const titleBtn = document.createElement("button");
    titleBtn.type = "button";
    titleBtn.className = "fold-head";
    const arrow = document.createElement("span");
    arrow.className = "fold-arrow";
    arrow.textContent = "▾";
    const foldSub = document.createElement("span");
    foldSub.className = "fold-sub";
    foldSub.textContent = p.subtitle || "";
    titleBtn.append(title, foldSub, arrow);
    titleBtn.addEventListener("click", () => {
      if (openCards.has(p)) openCards.delete(p);
      else openCards.add(p);
      card.classList.toggle("open");
    });
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
    head.append(titleBtn, controls);
    card.appendChild(head);

    const grid = document.createElement("div");
    grid.className = "field-grid";

    const t1 = makeInput("제목", p.title, (v) => {
      p.title = v;
      title.textContent = v || "(제목 없음)";
    }, { half: true });
    const t2 = makeInput(
      "부제 (한 줄 요약)",
      p.subtitle,
      (v) => {
        p.subtitle = v;
        foldSub.textContent = v;
      },
      { half: true }
    );
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
    grid.appendChild(blocksEditor(p));

    const role = makeInput("역할", p.role, (v) => (p.role = v), {
      half: true,
      placeholder: "예: 클라이언트 프로그래머",
    });
    grid.append(periodEditor(p), role.wrap);

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
    grid.appendChild(i18nEditor(p));

    const body = document.createElement("div");
    body.className = "fold-body";
    body.appendChild(grid);
    card.appendChild(body);
    return card;
  }

  function renderTabsEditor() {
    const wrap = $("tabs-editor-wrap");
    if (!wrap) return;
    wrap.replaceChildren();

    const card = document.createElement("section");
    card.className = "card fold";
    const head = document.createElement("button");
    head.type = "button";
    head.className = "fold-head";
    const h2 = document.createElement("h2");
    h2.textContent = "탭 이름";
    const arrow = document.createElement("span");
    arrow.className = "fold-arrow";
    arrow.textContent = "▾";
    head.append(h2, arrow);
    head.addEventListener("click", () => card.classList.toggle("open"));

    const body = document.createElement("div");
    body.className = "fold-body";
    const hint = document.createElement("p");
    hint.className = "hint";
    hint.textContent = "English / 日本語를 비워두면 한국어 이름이 그대로 표시됩니다.";
    body.appendChild(hint);

    TABS.forEach((tb) => {
      const row = document.createElement("div");
      row.className = "field-grid";
      row.style.marginBottom = "14px";
      const ko = makeInput("한국어", tb.label, (v) => {
        tb.label = v;
        renderTabs();
      }, { half: true });
      const en = makeInput("English", tb.label_en, (v) => (tb.label_en = v), {
        half: true,
        placeholder: tb.label,
      });
      const ja = makeInput("日本語", tb.label_ja, (v) => (tb.label_ja = v), {
        half: true,
        placeholder: tb.label,
      });
      row.append(ko.wrap, en.wrap, ja.wrap);
      body.appendChild(row);
    });

    card.append(head, body);
    wrap.appendChild(card);
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
      "pf-name-en": "name_en",
      "pf-name-ja": "name_ja",
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
      "const TAG_STYLES = " + j(TAG_STYLES) + ";\n\n" +
      "const TAG_CUSTOM = " + j(customTags) + ";\n\n" +
      "// 태그별 숙련도 (0~100). 기술 스택 시각화에서 크기·중심 배치에 사용됩니다.\n" +
      "const TAG_PROFICIENCY = " + j(proficiency) + ";\n"
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

  function untitledNote() {
    const n = state.projects.filter((p) => !(p.title || "").trim()).length;
    return n ? " · 제목 없는 프로젝트 " + n + "개는 사이트에 표시되지 않습니다" : "";
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
        toast("저장되었습니다" + untitledNote());
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
        toast("GitHub에 저장되었습니다 — 1~2분 뒤 사이트에 반영됩니다" + untitledNote());
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
    registerAllTags();
    renderTagPresets();
    renderTabsEditor();
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
    const np = {
      category: adminTab,
      title: "",
      subtitle: "",
      youtubeId: "",
      tags: [],
      blocks: [],
      period: "",
      role: "",
      playUrl: "",
      githubUrl: "",
    };
    state.projects.push(np);
    openCards.add(np);
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

  document.querySelectorAll("[data-fold]").forEach((btn) =>
    btn.addEventListener("click", () =>
      btn.closest(".fold").classList.toggle("open")
    )
  );

  window.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
      e.preventDefault();
      if (!$("admin").classList.contains("hidden")) save();
    }
  });

  initGate();
})();
