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

  const proficiency = typeof TAG_PROFICIENCY !== "undefined" ? TAG_PROFICIENCY : {};
  const openCards = new WeakSet();

  function profOf(name) {
    return proficiency[name] != null ? proficiency[name] : 50;
  }

  function updateTagDatalist() {
    const dl = $("tag-suggestions");
    if (!dl) return;
    dl.replaceChildren();
    const seen = new Set();
    const addOption = (name) => {
      if (!name || seen.has(name)) return;
      seen.add(name);
      const o = document.createElement("option");
      o.value = name;
      dl.appendChild(o);
    };
    Object.keys(TAG_GROUP).forEach(addOption);
    // 자식 태그뿐 아니라 카테고리(부모) 이름도 프로젝트 콘텐츠 태그로 바로 쓸 수 있도록 제안합니다.
    (typeof TAG_GROUP_ORDER !== "undefined" ? TAG_GROUP_ORDER : []).forEach((key) => {
      addOption(previewCategoryLabel(key));
    });
  }

  function tagStyleOf(name) {
    const catKey = categoryKeyForLabel(name);
    if (catKey) return TAG_STYLES[catKey] || TAG_STYLES.etc;
    return TAG_STYLES[TAG_GROUP[name]] || TAG_STYLES.etc;
  }

  function registerAllTags() {
    state.projects.forEach((p) =>
      (p.tags || []).forEach((t) => {
        if (!(t in TAG_GROUP)) TAG_GROUP[t] = "etc";
      })
    );
  }

  // 실제 사이트(script.js)와 완전히 동일한 마인드맵 배치 로직 — 가상 캔버스(1360px)에서
  // 배치한 뒤 컨테이너 폭에 맞게 스케일하므로 미리보기와 실제 화면이 일치합니다.
  const CLOUD_VW = 1360;
  const SKILL_GAP = 10;
  const PARENT_FONT_MIN = 20;
  const PARENT_FONT_MAX = 60;

  const CATEGORY_LABEL_FALLBACK = {
    engine: "게임 엔진",
    network: "웹",
    graphics: "빌드 · 배포",
    ai: "인프라 · 협업",
    perf: "AI 도구",
    etc: "기타",
  };

  // 카테고리의 "존재감" = 보유한 태그들의 숙련도 총합(평균이 아니라 합산이라 태그가
  // 많고 탄탄한 카테고리일수록 자연히 커집니다) — 실제 사이트(script.js)와 동일한 기준.
  function categoryPowerFromMembers(members) {
    return members.reduce((s, m) => s + m.prof, 0);
  }

  function categoryPower(key) {
    const members = Object.keys(TAG_GROUP)
      .filter((n) => (TAG_GROUP[n] || "etc") === key)
      .map((n) => ({ prof: profOf(n) }));
    return categoryPowerFromMembers(members);
  }

  function sortCategoriesByProminence(keys) {
    return keys
      .slice()
      .sort((a, b) => categoryPower(b) - categoryPower(a) || a.localeCompare(b));
  }

  function previewCategoryLabel(key) {
    const entry = TAG_STYLES[key];
    return (entry && entry.label) || CATEGORY_LABEL_FALLBACK[key] || key;
  }

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

  function previewGroupStyle(key) {
    return TAG_STYLES[key] || { bg: "#2C2C2A", fg: "#D3D1C7" };
  }

  function renderSkillsPreview() {
    const container = $("skills-preview");
    if (!container) return;
    container.replaceChildren();
    container.style.height = "";
    const names = Object.keys(TAG_GROUP);
    if (!names.length) {
      const p = document.createElement("p");
      p.className = "empty-note";
      p.textContent = "등록된 태그가 없습니다.";
      container.appendChild(p);
      return;
    }
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

    const tags = names
      .map((name) => ({ name, prof: profOf(name) }))
      .sort((a, b) => b.prof - a.prof);

    const groupMap = new Map();
    tags.forEach((t) => {
      const key = TAG_GROUP[t.name] || "etc";
      if (!groupMap.has(key)) groupMap.set(key, []);
      groupMap.get(key).push(t);
    });
    const cats = [...groupMap.entries()].map(([key, members]) => {
      const sorted = members.slice().sort((a, b) => b.prof - a.prof);
      return { key, members: sorted, power: categoryPowerFromMembers(sorted) };
    });
    const maxPower = Math.max(...cats.map((c) => c.power)) || 1;
    cats.forEach((cat) => {
      const maxChildFont = 11 + 30 * (cat.members[0].prof / 100);
      const globalFont =
        PARENT_FONT_MIN + (PARENT_FONT_MAX - PARENT_FONT_MIN) * (cat.power / maxPower);
      cat.pFontSize = Math.max(globalFont, maxChildFont + 8);
    });
    // 순서는 수동이 아니라 자동 — 부모 노드가 큰(존재감이 강한) 카테고리일수록 먼저 배치되어
    // 시선이 가장 먼저 닿는 자리(마인드맵 중심)를 차지합니다. 실제 사이트와 동일한 정렬 기준.
    cats.sort((a, b) => b.pFontSize - a.pFontSize || a.key.localeCompare(b.key));

    cats.forEach((cat) => {
      const pStyle = previewGroupStyle(cat.key);
      const pFontSize = cat.pFontSize;
      const pPadX = pFontSize * 0.55 + 5;
      const pPadY = pFontSize * 0.3 + 2;
      const pEl = document.createElement("span");
      pEl.className = "skill-parent";
      pEl.textContent = previewCategoryLabel(cat.key);
      pEl.style.background = pStyle.bg;
      pEl.style.color = pStyle.fg;
      pEl.style.fontSize = pFontSize.toFixed(1) + "px";
      pEl.style.padding = pPadY.toFixed(1) + "px " + pPadX.toFixed(1) + "px";
      pEl.title = previewCategoryLabel(cat.key) + " · " + cat.members.length + "개";
      canvas.appendChild(pEl);
      cat.parentEl = pEl;

      cat.children = cat.members.map((tag) => {
        const style = tagStyleOf(tag.name);
        const el = document.createElement("span");
        el.className = "skill-bubble";
        el.textContent = tag.name;
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

    cats.forEach((cat) => {
      const px = cat.x + offsetX;
      const py = cat.y + offsetY;
      cat.parentEl.style.left = (px - cat.pHalfW).toFixed(1) + "px";
      cat.parentEl.style.top = (py - cat.pHalfH).toFixed(1) + "px";

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
      });
    });

    canvas.style.height = H + "px";
    const scale = w / CLOUD_VW;
    canvas.style.transform = "scale(" + scale + ")";
    container.style.height = Math.round(H * scale) + "px";
  }

  function buildCategorySelect(value, onChange, ariaLabel) {
    const sel = document.createElement("select");
    sel.className = "category-select";
    const order = sortCategoriesByProminence(
      typeof TAG_GROUP_ORDER !== "undefined" ? TAG_GROUP_ORDER : []
    );
    order.forEach((g) => {
      const o = document.createElement("option");
      o.value = g;
      o.textContent = previewCategoryLabel(g);
      if (g === value) o.selected = true;
      sel.appendChild(o);
    });
    if (ariaLabel) sel.setAttribute("aria-label", ariaLabel);
    sel.addEventListener("change", () => onChange(sel.value));
    return sel;
  }

  function hexToHslParts(hex) {
    hex = hex.replace("#", "");
    if (hex.length === 3) hex = hex.split("").map((c) => c + c).join("");
    const r = parseInt(hex.slice(0, 2), 16) / 255;
    const g = parseInt(hex.slice(2, 4), 16) / 255;
    const b = parseInt(hex.slice(4, 6), 16) / 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const l = (max + min) / 2;
    let h = 0;
    let s = 0;
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
      else if (max === g) h = (b - r) / d + 2;
      else h = (r - g) / d + 4;
      h *= 60;
    }
    return { h: Math.round(h), s: Math.round(s * 100) };
  }

  function styleFromHex(hex) {
    const { h, s } = hexToHslParts(hex);
    const sat = Math.max(s, 35);
    return { bg: "hsl(" + h + ", " + sat + "%, 16%)", fg: "hsl(" + h + ", " + sat + "%, 78%)" };
  }

  function newCategoryKey() {
    let i = 1;
    while (TAG_STYLES["custom" + i]) i++;
    return "custom" + i;
  }

  function addCategory(name, hex) {
    name = name.trim();
    if (!name) {
      toast("카테고리 이름을 입력하세요", true);
      return;
    }
    const key = newCategoryKey();
    const style = styleFromHex(hex);
    TAG_STYLES[key] = { bg: style.bg, fg: style.fg, label: name, label_en: "", label_ja: "" };
    if (typeof TAG_GROUP_ORDER !== "undefined") TAG_GROUP_ORDER.push(key);
    markDirty();
    renderTagPresets();
    toast('"' + name + '" 카테고리를 추가했습니다');
  }

  function deleteCategory(key) {
    if (key === "etc") {
      toast("이 카테고리는 기본값으로 사용되어 삭제할 수 없습니다.", true);
      return;
    }
    const label = previewCategoryLabel(key);
    const memberCount = Object.keys(TAG_GROUP).filter((n) => TAG_GROUP[n] === key).length;
    const msg = memberCount
      ? '"' +
        label +
        '" 카테고리를 삭제하면 태그 ' +
        memberCount +
        '개가 "' +
        previewCategoryLabel("etc") +
        '" 카테고리로 이동합니다. 계속할까요?'
      : '"' + label + '" 카테고리를 삭제할까요?';
    if (!confirm(msg)) return;
    Object.keys(TAG_GROUP).forEach((n) => {
      if (TAG_GROUP[n] === key) TAG_GROUP[n] = "etc";
    });
    delete TAG_STYLES[key];
    if (typeof TAG_GROUP_ORDER !== "undefined") {
      const idx = TAG_GROUP_ORDER.indexOf(key);
      if (idx !== -1) TAG_GROUP_ORDER.splice(idx, 1);
    }
    markDirty();
    renderTagPresets();
    renderProjects();
    toast('"' + label + '" 카테고리를 삭제했습니다');
  }

  function renameTag(oldName, newName) {
    newName = newName.trim();
    if (!newName || newName === oldName) return false;
    if (newName in TAG_GROUP) {
      toast('이미 "' + newName + '" 태그가 있습니다.', true);
      return false;
    }
    if (categoryKeyForLabel(newName)) {
      toast('"' + newName + '"은(는) 이미 카테고리 이름으로 쓰이고 있습니다.', true);
      return false;
    }
    TAG_GROUP[newName] = TAG_GROUP[oldName];
    delete TAG_GROUP[oldName];
    if (oldName in proficiency) {
      proficiency[newName] = proficiency[oldName];
      delete proficiency[oldName];
    }
    state.projects.forEach((p) => {
      if (p.tags) p.tags = p.tags.map((t) => (t === oldName ? newName : t));
    });
    markDirty();
    return true;
  }

  function buildTagRow(name) {
    const row = document.createElement("div");
    row.className = "tag-row";
    const chip = document.createElement("input");
    chip.className = "chip chip-input";
    chip.value = name;
    chip.size = Math.max(4, name.length);
    chip.setAttribute("aria-label", name + " 이름 수정");
    const st = tagStyleOf(name);
    chip.style.background = st.bg;
    chip.style.color = st.fg;
    chip.addEventListener("input", () => {
      chip.size = Math.max(4, chip.value.length);
    });
    chip.addEventListener("keydown", (e) => {
      if (e.key === "Enter") chip.blur();
    });
    chip.addEventListener("change", () => {
      if (renameTag(name, chip.value)) {
        renderTagPresets();
        renderProjects();
      } else {
        chip.value = name;
        chip.size = Math.max(4, name.length);
      }
    });

    const profWrap = document.createElement("div");
    profWrap.className = "prof-wrap";
    const profRange = document.createElement("input");
    profRange.type = "range";
    profRange.min = "0";
    profRange.max = "100";
    profRange.step = "1";
    profRange.value = String(profOf(name));
    profRange.setAttribute("aria-label", name + " 숙련도");
    const profOut = document.createElement("span");
    profOut.className = "prof-out";
    profOut.textContent = profOf(name) + "%";
    profRange.addEventListener("input", () => {
      proficiency[name] = parseInt(profRange.value, 10);
      profOut.textContent = proficiency[name] + "%";
      markDirty();
      renderSkillsPreview();
    });
    profWrap.append(profRange, profOut);

    const catSelect = buildCategorySelect(
      TAG_GROUP[name],
      (g) => {
        TAG_GROUP[name] = g;
        markDirty();
        renderTagPresets();
        renderProjects();
      },
      name + " 카테고리"
    );

    const del = document.createElement("button");
    del.type = "button";
    del.className = "icon-btn danger tag-del";
    del.textContent = "×";
    del.setAttribute("aria-label", name + " 프리셋 삭제");
    del.addEventListener("click", () => {
      delete TAG_GROUP[name];
      markDirty();
      renderTagPresets();
      renderProjects();
    });
    row.append(chip, profWrap, catSelect, del);
    return row;
  }

  function populateNewTagCategorySelect() {
    const sel = $("new-preset-category");
    if (!sel) return;
    const prev = sel.value;
    sel.replaceChildren();
    const order = sortCategoriesByProminence(
      typeof TAG_GROUP_ORDER !== "undefined" ? TAG_GROUP_ORDER : []
    );
    order.forEach((g) => {
      const o = document.createElement("option");
      o.value = g;
      o.textContent = previewCategoryLabel(g);
      sel.appendChild(o);
    });
    if (order.includes(prev)) sel.value = prev;
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
      populateNewTagCategorySelect();
      renderSkillsPreview();
      return;
    }

    const byGroup = new Map();
    names.forEach((name) => {
      const g = TAG_GROUP[name] || "etc";
      if (!byGroup.has(g)) byGroup.set(g, []);
      byGroup.get(g).push(name);
    });
    const order = sortCategoriesByProminence(
      typeof TAG_GROUP_ORDER !== "undefined" ? TAG_GROUP_ORDER : []
    );
    order.forEach((g) => {
      const members = (byGroup.get(g) || []).slice().sort((a, b) => profOf(b) - profOf(a));
      const section = document.createElement("div");
      section.className = "tag-section";

      const header = document.createElement("div");
      header.className = "tag-section-head";
      const label = document.createElement("input");
      label.className = "tag-section-label chip-input";
      const currentLabel = previewCategoryLabel(g);
      label.value = currentLabel;
      label.size = Math.max(4, currentLabel.length);
      label.style.background = TAG_STYLES[g].bg;
      label.style.color = TAG_STYLES[g].fg;
      label.setAttribute("aria-label", currentLabel + " 카테고리 이름 수정");
      label.addEventListener("input", () => {
        label.size = Math.max(4, label.value.length);
      });
      label.addEventListener("keydown", (e) => {
        if (e.key === "Enter") label.blur();
      });
      label.addEventListener("change", () => {
        const v = label.value.trim();
        if (!v) {
          const fallback = previewCategoryLabel(g);
          label.value = fallback;
          label.size = Math.max(4, fallback.length);
          return;
        }
        TAG_STYLES[g].label = v;
        markDirty();
        renderTagPresets();
        renderProjects();
      });
      const count = document.createElement("span");
      count.className = "tag-section-count";
      count.textContent = "(" + members.length + ")";
      header.append(label, count);
      if (g !== "etc") {
        const delCat = iconBtn("×", false, () => deleteCategory(g));
        delCat.classList.add("tag-del");
        delCat.setAttribute("aria-label", currentLabel + " 카테고리 삭제");
        delCat.title = "카테고리 삭제";
        header.appendChild(delCat);
      }
      section.appendChild(header);

      if (members.length) {
        members.forEach((name) => section.appendChild(buildTagRow(name)));
      } else {
        const empty = document.createElement("p");
        empty.className = "empty-note";
        empty.textContent = "이 카테고리에는 아직 태그가 없습니다.";
        section.appendChild(empty);
      }
      cont.appendChild(section);
    });

    updateTagDatalist();
    populateNewTagCategorySelect();
    renderSkillsPreview();
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

    let newTagCategory = "etc";
    const newCatRow = document.createElement("div");
    newCatRow.className = "tag-new-category-row";
    const newCatLabel = document.createElement("span");
    newCatLabel.className = "tag-new-category-label";
    newCatLabel.textContent = "새 태그의 카테고리(부모 노드)";
    const newCatSelect = buildCategorySelect(
      newTagCategory,
      (v) => {
        newTagCategory = v;
      },
      "새 태그의 카테고리"
    );
    newCatRow.append(newCatLabel, newCatSelect);

    function addTag(v) {
      v = v.trim();
      if (!v || (p.tags || []).includes(v)) return;
      if (!p.tags) p.tags = [];
      p.tags.push(v);
      // 카테고리(부모) 이름 자체를 태그로 쓴 경우엔 새 자식 태그로 등록하지 않습니다 —
      // 스타일은 해당 카테고리 색을 그대로 따라가고, 기술 스택 마인드맵에는 나타나지 않습니다.
      if (!(v in TAG_GROUP) && !categoryKeyForLabel(v)) {
        TAG_GROUP[v] = newTagCategory;
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
    wrap.append(span, box, newCatRow);
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
    { code: "ko", label: "한국어" },
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

    function readonlyField(label, value) {
      const { wrap: fieldWrap, input } = makeInput(label, value, () => {}, {
        textarea: value && value.length > 60,
      });
      input.disabled = true;
      return fieldWrap;
    }

    function renderPanel() {
      panel.replaceChildren();
      const grid = document.createElement("div");
      grid.className = "field-grid";

      if (activeLang === "ko") {
        const note = document.createElement("p");
        note.className = "hint";
        note.textContent = "원본입니다. 수정하려면 위쪽의 기본 입력란을 편집하세요.";
        grid.appendChild(readonlyField("제목", p.title));
        grid.appendChild(readonlyField("부제", p.subtitle));
        grid.appendChild(readonlyField("역할", p.role));
        (p.blocks || []).forEach((b, i) => {
          if (b.type !== "text") return;
          grid.appendChild(readonlyField("콘텐츠 텍스트 #" + (i + 1), b.text));
        });
        panel.appendChild(note);
        panel.appendChild(grid);
        return;
      }

      const tr = (p.i18n && p.i18n[activeLang]) || {};
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
      "// 기술 스택 카테고리(부모 노드) 목록. 화면에 나오는 순서는 숙련도 기준으로 자동 정렬됩니다.\n" +
      "const TAG_GROUP_ORDER = " +
      j(typeof TAG_GROUP_ORDER !== "undefined" ? TAG_GROUP_ORDER : []) +
      ";\n\n" +
      "const TAG_STYLES = " + j(TAG_STYLES) + ";\n\n" +
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

  function addPresetTag(name, category) {
    name = name.trim();
    if (!name || name in TAG_GROUP) return;
    if (categoryKeyForLabel(name)) {
      toast('"' + name + '"은(는) 이미 카테고리 이름으로 쓰이고 있습니다.', true);
      return;
    }
    TAG_GROUP[name] = category || "etc";
    markDirty();
    renderTagPresets();
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

    const newTagInput = $("new-preset-tag");
    const newTagCategory = $("new-preset-category");
    newTagInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        addPresetTag(newTagInput.value, newTagCategory.value);
        newTagInput.value = "";
      }
    });

    const newCategoryName = $("new-category-name");
    const newCategoryColor = $("new-category-color");
    const addCategoryBtn = $("add-category-btn");
    function submitNewCategory() {
      addCategory(newCategoryName.value, newCategoryColor.value);
      newCategoryName.value = "";
    }
    newCategoryName.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        submitNewCategory();
      }
    });
    addCategoryBtn.addEventListener("click", submitNewCategory);
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
    btn.addEventListener("click", () => {
      const fold = btn.closest(".fold");
      fold.classList.toggle("open");
      if (fold.classList.contains("open") && fold.querySelector("#skills-preview")) {
        renderSkillsPreview();
      }
    })
  );

  window.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
      e.preventDefault();
      if (!$("admin").classList.contains("hidden")) save();
    }
  });

  window.addEventListener("resize", () => {
    const cont = $("skills-preview");
    if (cont && cont.closest(".fold.open")) renderSkillsPreview();
  });

  initGate();
})();
