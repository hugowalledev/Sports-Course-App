/* ═══════════════════════════════════════════════════
   Sports Timer — app.js
   Single-file state machine for session management.
   ═══════════════════════════════════════════════════ */

// ── Audio (Web Audio API, no files needed) ──────────
const AudioCtx = window.AudioContext || window.webkitAudioContext;
let _audioCtx = null;
function getAudio() {
  if (!_audioCtx) _audioCtx = new AudioCtx();
  return _audioCtx;
}
function beep(freq = 880, dur = 0.08, vol = 0.3, type = "sine", delay = 0) {
  try {
    const ctx = getAudio();
    const osc  = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(vol, ctx.currentTime + delay);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + dur);
    osc.start(ctx.currentTime + delay);
    osc.stop(ctx.currentTime + delay + dur + 0.05);
  } catch (_) {}
}
function beepStart()    { beep(660, 0.12, 0.35); }
function beepDone()     { beep(880, 0.1, 0.3); beep(1100, 0.15, 0.35, "sine", 0.12); }
function beepCountdown(){ beep(440, 0.07, 0.2); }
function beepRest()     { beep(330, 0.18, 0.25, "triangle"); }

// ── Wake lock ────────────────────────────────────────
let _wakeLock = null;
async function acquireWakeLock() {
  if ("wakeLock" in navigator) {
    try { _wakeLock = await navigator.wakeLock.request("screen"); } catch (_) {}
  }
}
function releaseWakeLock() {
  if (_wakeLock) { _wakeLock.release().catch(() => {}); _wakeLock = null; }
}

// ── Step builder ─────────────────────────────────────
/**
 * Flattens a day's blocks into an ordered array of steps.
 * Step kinds:
 *   "block-start" — show block preview, tap to begin
 *   "exercise"    — do exercise (duration or reps)
 *   "rest"        — timed rest
 */
function buildSteps(day) {
  const steps = [];

  day.blocks.forEach((block, bIdx) => {
    // Block preview step
    steps.push({ kind: "block-start", block, blockIdx: bIdx, totalBlocks: day.blocks.length });

    if (block.type === "hiit") {
      // HIIT: cycles through exercise list, alternating effort + rest
      for (let r = 0; r < block.rounds; r++) {
        const ex = block.exercises[r % block.exercises.length];
        steps.push({
          kind: "exercise",
          block,
          name: ex.name,
          type: "duration",
          seconds: block.effort_seconds,
          phase: "hiit",
          round: r + 1,
          totalRounds: block.rounds,
        });
        // Rest after every round except the last
        if (r < block.rounds - 1) {
          steps.push({
            kind: "rest",
            block,
            seconds: block.rest_seconds,
            label: "REPOS HIIT",
            round: r + 1,
            totalRounds: block.rounds,
          });
        }
      }
    } else {
      for (let r = 0; r < block.rounds; r++) {
        for (const ex of block.exercises) {
          const repeatCount = ex.repeat || 1;
          for (let rep = 0; rep < repeatCount; rep++) {
            steps.push({
              kind: "exercise",
              block,
              name: ex.name,
              type: ex.type,
              seconds: ex.seconds,
              reps: ex.reps,
              note: ex.note,
              phase: "exercise",
              round: r + 1,
              totalRounds: block.rounds,
              repeatIdx: rep,
              repeatTotal: repeatCount,
            });
          }
        }
        // Rest after each round except the last
        if (r < block.rounds - 1 && block.rest_seconds > 0) {
          steps.push({
            kind: "rest",
            block,
            seconds: block.rest_seconds,
            label: "REPOS",
            round: r + 1,
            totalRounds: block.rounds,
          });
        }
      }
    }
  });

  return steps;
}

// ── Session state ────────────────────────────────────
const state = {
  day: null,
  steps: [],
  stepIdx: 0,
  timer: null,          // interval id
  timeLeft: 0,
  totalTime: 0,
  paused: false,
  startedAt: null,
};

// ── DOM refs ─────────────────────────────────────────
const views = {
  home:    document.getElementById("view-home"),
  session: document.getElementById("view-session"),
  done:    document.getElementById("view-done"),
  builder: document.getElementById("view-builder"),
  library: document.getElementById("view-library"),
};

function showView(name) {
  Object.values(views).forEach(v => v.classList.remove("active"));
  views[name].classList.add("active");
}

// ── Tabs ──────────────────────────────────────────────
let _activeTab = "presets";

function showTab(name) {
  _activeTab = name;
  ["presets", "custom"].forEach(t => {
    document.getElementById(`tab-${t}`).style.display     = t === name ? "block" : "none";
    document.getElementById(`tab-btn-${t}`).classList.toggle("active", t === name);
  });
}

// ── Home view ─────────────────────────────────────────
function renderHome() {
  renderPresetsList();
  renderCustomList();
  showView("home");
  showTab(_activeTab);
}

function renderPresetsList() {
  const list = document.getElementById("day-list");
  list.innerHTML = "";
  WORKOUT_PLAN.forEach(day => {
    const btn = document.createElement("button");
    btn.className = "day-card fade-up";
    btn.style.setProperty("--day-color", day.color);
    btn.innerHTML = `
      <span class="day-card__emoji">${day.emoji}</span>
      <span class="day-card__body">
        <span class="day-card__day">${day.day}</span>
        <span class="day-card__name">${day.name}</span>
        <span class="day-card__tags">
          ${day.blocks.map(b => `<span class="day-card__tag">${b.name}</span>`).join("")}
        </span>
      </span>
      <span class="day-card__arrow accent-color">›</span>
    `;
    btn.addEventListener("click", () => startSession(day));
    list.appendChild(btn);
  });
}

// ── Custom programs list ──────────────────────────────
const _progMap = new Map();

function renderCustomList() {
  const programs = loadCustomPrograms();
  _progMap.clear();
  programs.forEach(p => _progMap.set(p.id, p));

  const list = document.getElementById("custom-list");
  if (programs.length === 0) {
    list.innerHTML = `<p class="empty-msg">Aucun programme. Crée-en un !</p>`;
    return;
  }
  list.innerHTML = "";
  programs.forEach(prog => {
    const card = document.createElement("div");
    card.className = "day-card custom-card fade-up";
    card.style.setProperty("--day-color", prog.color);
    card.innerHTML = `
      <span class="day-card__emoji">${prog.emoji}</span>
      <span class="day-card__body">
        <span class="day-card__day">${prog.day || "—"}</span>
        <span class="day-card__name">${prog.name || ""}</span>
        <span class="day-card__tags">
          ${(prog.blocks || []).map(b => `<span class="day-card__tag">${b.name}</span>`).join("")}
        </span>
      </span>
      <div class="custom-card-actions">
        <button class="cca-btn edit"  title="Modifier" data-id="${prog.id}">✏️</button>
        <button class="cca-btn del"   title="Supprimer" data-id="${prog.id}">🗑</button>
        <button class="cca-btn start" title="Démarrer" data-id="${prog.id}">▶</button>
      </div>
    `;
    card.querySelector(".cca-btn.edit").addEventListener("click",  e => { e.stopPropagation(); openBuilder(_progMap.get(prog.id)); });
    card.querySelector(".cca-btn.del").addEventListener("click",   e => { e.stopPropagation(); deleteCustomProgram(prog.id); });
    card.querySelector(".cca-btn.start").addEventListener("click", e => { e.stopPropagation(); startSession(_progMap.get(prog.id)); });
    list.appendChild(card);
  });
}

function deleteCustomProgram(id) {
  const updated = loadCustomPrograms().filter(p => p.id !== id);
  saveCustomPrograms(updated);
  renderCustomList();
}

// ── Session: start ────────────────────────────────────
function startSession(day) {
  acquireWakeLock();
  state.day     = day;
  state.steps   = buildSteps(day);
  state.stepIdx = 0;
  state.paused  = false;
  state.startedAt = Date.now();

  document.documentElement.style.setProperty("--day-color", day.color);
  document.getElementById("session-day-title").textContent = `${day.emoji} ${day.day}`;

  showView("session");
  renderStep();
}

// ── Session: render current step ──────────────────────
function renderStep() {
  clearTimer();
  const step = state.steps[state.stepIdx];
  if (!step) { endSession(); return; }

  updateProgressBar();

  if (step.kind === "block-start") renderBlockStart(step);
  else if (step.kind === "rest")   renderRest(step);
  else                             renderExercise(step);
}

// ── Block start ───────────────────────────────────────
function renderBlockStart(step) {
  const b = step.block;
  const isHiit = b.type === "hiit";

  const exList = isHiit
    ? b.exercises.map(e => `<li><span>${e.name}</span><span class="bsc-ex-detail">x${b.rounds} tours</span></li>`).join("")
    : b.exercises.map(e => {
        const detail = e.type === "duration" ? `${e.seconds}s` : (e.reps || "");
        const rep    = e.repeat > 1 ? ` × ${e.repeat}` : "";
        return `<li><span>${e.name}</span><span class="bsc-ex-detail">${detail}${rep}</span></li>`;
      }).join("");

  setMain(`
    <div class="block-info fade-up">
      <div class="block-info__name accent-color">${b.name}</div>
      <div class="block-info__sub">${b.info || ""}</div>
    </div>
    <div class="block-start-card fade-up">
      <ul class="bsc-exlist">${exList}</ul>
    </div>
  `);

  setControls(`
    <button class="btn-main primary" onclick="advanceStep()">Commencer ›</button>
  `);
}

// ── Rest step ─────────────────────────────────────────
function renderRest(step) {
  const s = step.seconds;

  setMain(`
    <div class="phase-badge phase-rest fade-up">${step.label || "REPOS"}</div>
    ${timerCircleHTML(s)}
    <div class="next-up fade-up" id="next-up-box"></div>
  `);

  renderNextUp();
  setControls(`
    <button class="btn-skip" onclick="advanceStep()">Passer</button>
    <button class="btn-main success" id="btn-pause" onclick="togglePause()">⏸ Pause</button>
  `);

  beepRest();
  startCountdown(s, () => { beepDone(); advanceStep(); });
}

// ── Exercise step ──────────────────────────────────────
function renderExercise(step) {
  const isHiit = step.phase === "hiit";

  if (step.type === "duration") {
    const s = step.seconds;
    const badgeClass = isHiit ? "phase-hiit" : "phase-exercise";
    const badgeLabel = isHiit ? "EFFORT 🔥" : "EXERCICE";

    setMain(`
      <div class="phase-badge ${badgeClass} fade-up">${badgeLabel}</div>
      <div class="exercise-name fade-up">${step.name}</div>
      ${step.note ? `<div class="exercise-note fade-up">${step.note}</div>` : ""}
      ${timerCircleHTML(s)}
      <div class="round-badge fade-up accent-color">Tour ${step.round} / ${step.totalRounds}</div>
      <div class="next-up fade-up" id="next-up-box"></div>
    `);

    renderNextUp();
    setControls(`
      <button class="btn-skip" onclick="advanceStep()">Passer</button>
      <button class="btn-main primary" id="btn-pause" onclick="togglePause()">⏸ Pause</button>
    `);

    beepStart();
    startCountdown(s, () => { beepDone(); advanceStep(); });

  } else {
    // Reps — user confirms
    const repLabel = step.repeatTotal > 1
      ? `Série ${step.repeatIdx + 1} / ${step.repeatTotal}`
      : `Tour ${step.round} / ${step.totalRounds}`;

    setMain(`
      <div class="phase-badge phase-exercise fade-up">EXERCICE</div>
      <div class="exercise-name fade-up">${step.name}</div>
      ${step.note ? `<div class="exercise-note fade-up">${step.note}</div>` : ""}
      <div class="reps-display accent-color fade-up pulse">${step.reps}</div>
      <div class="reps-label fade-up">répétitions</div>
      <div class="round-badge fade-up">${repLabel}</div>
      <div class="next-up fade-up" id="next-up-box"></div>
    `);

    renderNextUp();
    setControls(`
      <button class="btn-main success" onclick="advanceStep()">✓ Fait</button>
    `);

    beepStart();
  }
}

// ── Next-up preview ───────────────────────────────────
function renderNextUp() {
  const box = document.getElementById("next-up-box");
  if (!box) return;
  const next = state.steps[state.stepIdx + 1];
  if (!next) { box.style.display = "none"; return; }

  let name, detail;
  if (next.kind === "block-start") {
    name   = `Prochain bloc : ${next.block.name}`;
    detail = next.block.info || "";
  } else if (next.kind === "rest") {
    name   = `Repos ${next.seconds}s`;
    detail = next.label || "";
  } else {
    name   = next.name;
    detail = next.type === "duration" ? `${next.seconds}s` : `× ${next.reps}`;
    if (next.note) detail += ` · ${next.note}`;
  }

  box.innerHTML = `
    <div class="next-up__label">Ensuite</div>
    <div class="next-up__name">${name}</div>
    ${detail ? `<div class="next-up__detail">${detail}</div>` : ""}
  `;
}

// ── Timer ─────────────────────────────────────────────
function timerCircleHTML(seconds) {
  const r  = 70;
  const c  = 2 * Math.PI * r;
  return `
    <div class="timer-circle-wrap fade-up" id="timer-wrap" data-total="${seconds}" data-circ="${c}">
      <svg width="180" height="180" viewBox="0 0 180 180">
        <circle class="timer-track" cx="90" cy="90" r="${r}" stroke-width="10"/>
        <circle class="timer-fill accent-stroke" cx="90" cy="90" r="${r}" stroke-width="10"
          stroke-dasharray="${c}" stroke-dashoffset="0" id="timer-arc"/>
      </svg>
      <span class="timer-center" id="timer-text">${seconds}</span>
    </div>
  `;
}

function startCountdown(seconds, onDone) {
  state.timeLeft  = seconds;
  state.totalTime = seconds;
  state.paused    = false;
  updateTimerArc(seconds, seconds);

  state.timer = setInterval(() => {
    if (state.paused) return;
    state.timeLeft--;
    updateTimerArc(state.timeLeft, state.totalTime);
    const el = document.getElementById("timer-text");
    if (el) el.textContent = Math.max(0, state.timeLeft);
    if (state.timeLeft <= 3 && state.timeLeft > 0) beepCountdown();
    if (state.timeLeft <= 0) { clearTimer(); onDone(); }
  }, 1000);
}

function updateTimerArc(left, total) {
  const arc  = document.getElementById("timer-arc");
  const wrap = document.getElementById("timer-wrap");
  if (!arc || !wrap) return;
  const c      = parseFloat(wrap.dataset.circ);
  const offset = c * (1 - left / total);
  arc.style.strokeDashoffset = offset;
}

function clearTimer() {
  if (state.timer) { clearInterval(state.timer); state.timer = null; }
}

function togglePause() {
  state.paused = !state.paused;
  const btn = document.getElementById("btn-pause");
  if (btn) btn.textContent = state.paused ? "▶ Reprendre" : "⏸ Pause";
}

// ── Progress bar ──────────────────────────────────────
function updateProgressBar() {
  const pct = state.steps.length > 0
    ? Math.round((state.stepIdx / state.steps.length) * 100)
    : 0;

  const exSteps = state.steps.filter(s => s.kind === "exercise");
  const exDone  = state.steps.slice(0, state.stepIdx).filter(s => s.kind === "exercise").length;

  document.getElementById("progress-fill").style.width  = pct + "%";
  document.getElementById("progress-left").textContent  = `Étape ${state.stepIdx + 1} / ${state.steps.length}`;
  document.getElementById("progress-right").textContent = `${exDone} / ${exSteps.length} exos`;
}

// ── Advance to next step ──────────────────────────────
function advanceStep() {
  clearTimer();
  state.stepIdx++;
  if (state.stepIdx >= state.steps.length) { endSession(); return; }
  renderStep();
}

// ── End session ───────────────────────────────────────
function endSession() {
  clearTimer();
  releaseWakeLock();

  const elapsed = Math.round((Date.now() - state.startedAt) / 60000);
  const exCount = state.steps.filter(s => s.kind === "exercise").length;

  document.getElementById("done-day-name").textContent = `${state.day.emoji} ${state.day.day} — ${state.day.name}`;
  document.getElementById("done-duration").textContent  = `${elapsed} min`;
  document.getElementById("done-exercises").textContent = exCount;
  document.getElementById("done-blocks").textContent    = state.day.blocks.length;

  beepDone();
  beep(1320, 0.18, 0.3, "sine", 0.2);

  showView("done");
}

// ── Helpers ───────────────────────────────────────────
function setMain(html) {
  document.getElementById("session-main").innerHTML = html;
}
function setControls(html) {
  document.getElementById("session-controls").innerHTML = html;
}

// ── Exit session ──────────────────────────────────────
function exitSession() {
  clearTimer();
  releaseWakeLock();
  renderHome();
}

// ── Init ──────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  // Unlock audio on first user interaction
  document.addEventListener("click", () => { try { getAudio(); } catch (_) {} }, { once: true });
  renderHome();
});