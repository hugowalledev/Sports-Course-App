/* ═══════════════════════════════════════════════════
   Sports Timer — builder.js
   Program creation & editing UI.
   ═══════════════════════════════════════════════════ */

// ── Constants ─────────────────────────────────────────
const EMOJI_OPTIONS = ["🔴","🟢","🟠","🔵","🟣","⚡","🏋️","💪","🔥","🎯","🏃","🤸","🧗","🚴","⛹️","🥊","🏊","🧘"];
const COLOR_OPTIONS = ["#ef4444","#22c55e","#f97316","#3b82f6","#a855f7","#eab308","#06b6d4","#ec4899","#f43f5e","#64748b"];

// ── Storage ───────────────────────────────────────────
function loadCustomPrograms() {
  try { return JSON.parse(localStorage.getItem("spt-programs") || "[]"); }
  catch { return []; }
}
function saveCustomPrograms(arr) {
  localStorage.setItem("spt-programs", JSON.stringify(arr));
}

// ── Builder state ─────────────────────────────────────
const B = {
  program: null,
  expandedBlocks: new Set(),
};

// ── Factories ─────────────────────────────────────────
function createProgram() {
  return {
    id: "custom_" + Date.now(),
    day: "",
    name: "",
    emoji: "⚡",
    color: "#3b82f6",
    custom: true,
    blocks: [],
  };
}

function createBlock(type) {
  if (type === "hiit") {
    return { name: "HIIT", info: "", type: "hiit", rounds: 10, effort_seconds: 30, rest_seconds: 30, exercises: [] };
  }
  return { name: "Nouveau bloc", info: "", rounds: 3, rest_seconds: 60, exercises: [] };
}

function createExercise(blockType) {
  if (blockType === "hiit") return { name: "" };
  return { name: "", type: "reps", reps: "10", seconds: 30, note: "" };
}

// ── Open / exit ───────────────────────────────────────
function openBuilder(existing) {
  B.program = existing ? JSON.parse(JSON.stringify(existing)) : createProgram();
  B.expandedBlocks = new Set(B.program.blocks.length === 0 ? [] : [0]);

  // Populate static meta inputs
  document.getElementById("prog-name").value     = B.program.day  || "";
  document.getElementById("prog-subtitle").value = B.program.name || "";
  document.getElementById("builder-title").textContent = B.program.day || "Nouveau programme";
  document.getElementById("builder-error").style.display = "none";

  renderBuilderMeta();
  renderBlocksList();
  showView("builder");
}

function exitBuilder() {
  showView("home");
  renderCustomList();
}

// ── Save ──────────────────────────────────────────────
function saveProgram() {
  const p = B.program;
  p.day  = document.getElementById("prog-name").value.trim();
  p.name = document.getElementById("prog-subtitle").value.trim();

  if (!p.day) { showBuilderError("Donne un nom au programme."); return; }

  // Build info strings
  p.blocks.forEach(b => { b.info = buildBlockInfo(b); });

  const programs = loadCustomPrograms();
  const idx = programs.findIndex(x => x.id === p.id);
  if (idx >= 0) programs[idx] = p;
  else programs.push(p);
  saveCustomPrograms(programs);
  exitBuilder();
}

function buildBlockInfo(b) {
  if (b.type === "hiit")
    return `${b.rounds} tours — ${b.effort_seconds}s effort / ${b.rest_seconds}s repos`;
  return `${b.rounds} tour${b.rounds > 1 ? "s" : ""} — repos ${b.rest_seconds}s`;
}

function showBuilderError(msg) {
  const el = document.getElementById("builder-error");
  el.textContent = msg;
  el.style.display = "block";
  setTimeout(() => { el.style.display = "none"; }, 3000);
}

// ── Meta (emoji + color) ──────────────────────────────
function renderBuilderMeta() {
  const p = B.program;
  document.documentElement.style.setProperty("--day-color", p.color);

  document.getElementById("emoji-grid").innerHTML = EMOJI_OPTIONS.map(e =>
    `<button class="emoji-opt${p.emoji === e ? " selected" : ""}" onclick="pickEmoji('${e}')">${e}</button>`
  ).join("");

  document.getElementById("color-swatches").innerHTML = COLOR_OPTIONS.map(c =>
    `<button class="color-swatch${p.color === c ? " selected" : ""}"
      style="background:${c}" onclick="pickColor('${c}')"></button>`
  ).join("");
}

function pickEmoji(e) { B.program.emoji = e; renderBuilderMeta(); }
function pickColor(c) { B.program.color = c; renderBuilderMeta(); }

// ── Blocks list ───────────────────────────────────────
function renderBlocksList() {
  const container = document.getElementById("blocks-list");
  container.innerHTML = B.program.blocks.map((b, i) => renderBlockCard(b, i)).join("");

  const count = document.getElementById("blocks-count");
  if (count) count.textContent = B.program.blocks.length
    ? `(${B.program.blocks.length})` : "";

  initBlocksSortable();
  B.program.blocks.forEach((_, i) => {
    if (B.expandedBlocks.has(i)) {
      const body = document.getElementById(`block-body-${i}`);
      if (body) { body.style.display = "block"; initExercisesSortable(i); }
    }
  });
}

function renderBlockCard(b, i) {
  const isHiit   = b.type === "hiit";
  const expanded = B.expandedBlocks.has(i);

  const metaRow = isHiit ? `
    <div class="block-meta-row">
      <label class="meta-label">Tours
        <input class="meta-input" type="number" value="${b.rounds}" min="1"
          onchange="B.program.blocks[${i}].rounds = +this.value">
      </label>
      <label class="meta-label">Effort
        <input class="meta-input" type="number" value="${b.effort_seconds}" min="1"
          onchange="B.program.blocks[${i}].effort_seconds = +this.value">s
      </label>
      <label class="meta-label">Repos
        <input class="meta-input" type="number" value="${b.rest_seconds}" min="0"
          onchange="B.program.blocks[${i}].rest_seconds = +this.value">s
      </label>
    </div>` : `
    <div class="block-meta-row">
      <label class="meta-label">Tours
        <input class="meta-input" type="number" value="${b.rounds}" min="1"
          onchange="B.program.blocks[${i}].rounds = +this.value">
      </label>
      <label class="meta-label">Repos
        <input class="meta-input" type="number" value="${b.rest_seconds}" min="0"
          onchange="B.program.blocks[${i}].rest_seconds = +this.value">s
      </label>
    </div>`;

  const exRows = isHiit
    ? b.exercises.map((e, j) => renderHiitExRow(i, j, e)).join("")
    : b.exercises.map((e, j) => renderExRow(i, j, e)).join("");

  return `
    <div class="block-card" data-bidx="${i}">
      <div class="block-card-head">
        <span class="drag-handle" title="Déplacer">⠿</span>
        <span class="block-type-badge ${isHiit ? "hiit" : "std"}">${isHiit ? "HIIT" : "STD"}</span>
        <input class="block-name-input" value="${esc(b.name)}" placeholder="Nom du bloc"
          onchange="B.program.blocks[${i}].name = this.value">
        <button class="btn-expand-block" onclick="toggleBlockExpand(${i})">${expanded ? "▲" : "▼"}</button>
        <button class="btn-del-block" onclick="deleteBlock(${i})">🗑</button>
      </div>
      ${metaRow}
      <div class="block-body" id="block-body-${i}" style="display:${expanded ? "block" : "none"}">
        <div class="exercises-list" id="exercises-list-${i}">${exRows}</div>
        <button class="btn-add-ex" onclick="addExercise(${i})">+ Exercice</button>
      </div>
    </div>`;
}

// ── Exercise rows ─────────────────────────────────────
function renderExRow(bi, ei, e) {
  const isDur = e.type === "duration";
  const valInput = isDur
    ? `<input class="ex-val-input" type="number" value="${e.seconds || 30}" min="1"
        onchange="B.program.blocks[${bi}].exercises[${ei}].seconds = +this.value"><span class="ex-val-unit">s</span>`
    : `<input class="ex-val-input" value="${esc(e.reps || "10")}" placeholder="10"
        onchange="B.program.blocks[${bi}].exercises[${ei}].reps = this.value">`;

  return `
    <div class="exercise-row" data-eidx="${ei}">
      <span class="drag-handle small" title="Déplacer">⠿</span>
      <input class="ex-name-input" value="${esc(e.name)}" placeholder="Exercice"
        onchange="B.program.blocks[${bi}].exercises[${ei}].name = this.value">
      <select class="ex-type-select"
        onchange="B.program.blocks[${bi}].exercises[${ei}].type = this.value; renderExercisesList(${bi})">
        <option value="reps"${!isDur ? " selected" : ""}>🔁 Reps</option>
        <option value="duration"${isDur ? " selected" : ""}>⏱ Durée</option>
      </select>
      ${valInput}
      <input class="ex-note-input" value="${esc(e.note || "")}" placeholder="Note (optionnel)"
        onchange="B.program.blocks[${bi}].exercises[${ei}].note = this.value">
      <button class="btn-del-ex" onclick="deleteExercise(${bi}, ${ei})">✕</button>
    </div>`;
}

function renderHiitExRow(bi, ei, e) {
  return `
    <div class="exercise-row hiit-row" data-eidx="${ei}">
      <span class="drag-handle small" title="Déplacer">⠿</span>
      <input class="ex-name-input wide" value="${esc(e.name)}" placeholder="Exercice HIIT"
        onchange="B.program.blocks[${bi}].exercises[${ei}].name = this.value">
      <button class="btn-del-ex" onclick="deleteExercise(${bi}, ${ei})">✕</button>
    </div>`;
}

function renderExercisesList(bi) {
  const b    = B.program.blocks[bi];
  const list = document.getElementById(`exercises-list-${bi}`);
  if (!list) return;
  list.innerHTML = b.exercises.map((e, j) =>
    b.type === "hiit" ? renderHiitExRow(bi, j, e) : renderExRow(bi, j, e)
  ).join("");
  initExercisesSortable(bi);
}

// ── Structural mutations ──────────────────────────────
function toggleBlockExpand(i) {
  const body = document.getElementById(`block-body-${i}`);
  const btn  = document.querySelector(`.block-card[data-bidx="${i}"] .btn-expand-block`);
  if (B.expandedBlocks.has(i)) {
    B.expandedBlocks.delete(i);
    if (body) body.style.display = "none";
    if (btn)  btn.textContent    = "▼";
  } else {
    B.expandedBlocks.add(i);
    if (body) { body.style.display = "block"; initExercisesSortable(i); }
    if (btn)  btn.textContent = "▲";
  }
}

function addBlock(type) {
  B.program.blocks.push(createBlock(type));
  const newIdx = B.program.blocks.length - 1;
  B.expandedBlocks.add(newIdx);
  renderBlocksList();
  setTimeout(() => {
    const cards = document.querySelectorAll(".block-card");
    if (cards.length) cards[cards.length - 1].scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, 60);
}

function deleteBlock(i) {
  B.program.blocks.splice(i, 1);
  // Remap expanded indices
  const next = new Set();
  B.expandedBlocks.forEach(idx => {
    if (idx < i) next.add(idx);
    else if (idx > i) next.add(idx - 1);
  });
  B.expandedBlocks = next;
  renderBlocksList();
}

function addExercise(bi) {
  B.program.blocks[bi].exercises.push(createExercise(B.program.blocks[bi].type));
  renderExercisesList(bi);
  setTimeout(() => {
    const list = document.getElementById(`exercises-list-${bi}`);
    if (list) list.lastElementChild?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, 60);
}

function deleteExercise(bi, ei) {
  B.program.blocks[bi].exercises.splice(ei, 1);
  renderExercisesList(bi);
}

// ── Sortable (drag to reorder) ────────────────────────
function initBlocksSortable() {
  const el = document.getElementById("blocks-list");
  if (!el || !window.Sortable) return;
  Sortable.create(el, {
    handle: ".block-card-head .drag-handle",
    animation: 150,
    ghostClass: "sortable-ghost",
    onEnd(evt) {
      const { oldIndex, newIndex } = evt;
      if (oldIndex === newIndex) return;
      const [moved] = B.program.blocks.splice(oldIndex, 1);
      B.program.blocks.splice(newIndex, 0, moved);
      // Remap expanded set
      const next = new Set();
      B.expandedBlocks.forEach(idx => {
        if      (idx === oldIndex)                 next.add(newIndex);
        else if (idx > oldIndex && idx <= newIndex) next.add(idx - 1);
        else if (idx < oldIndex && idx >= newIndex) next.add(idx + 1);
        else                                        next.add(idx);
      });
      B.expandedBlocks = next;
      renderBlocksList();
    },
  });
}

function initExercisesSortable(bi) {
  const el = document.getElementById(`exercises-list-${bi}`);
  if (!el || !window.Sortable) return;
  Sortable.create(el, {
    handle: ".drag-handle.small",
    animation: 150,
    ghostClass: "sortable-ghost",
    onEnd(evt) {
      const { oldIndex, newIndex } = evt;
      if (oldIndex === newIndex) return;
      const [moved] = B.program.blocks[bi].exercises.splice(oldIndex, 1);
      B.program.blocks[bi].exercises.splice(newIndex, 0, moved);
      renderExercisesList(bi);
    },
  });
}

// ── Helpers ───────────────────────────────────────────
function esc(str) {
  return String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}