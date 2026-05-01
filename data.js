/**
 * Weekly calisthenics workout plan.
 *
 * Exercise types:
 *   "reps"     — show rep count, user taps Done
 *   "duration" — countdown timer (seconds)
 *   "hiit"     — handled at block level (effort/rest intervals)
 *
 * Block optional fields:
 *   type: "hiit"         — activates HIIT mode
 *   effort_seconds       — HIIT effort duration
 *   repeat               — repeat this exercise N times before moving on
 */
const WORKOUT_PLAN = [
  {
    id: "lundi",
    day: "Lundi",
    name: "UPPER FORCE",
    emoji: "🔴",
    color: "#ef4444",
    blocks: [
      {
        name: "Échauffement",
        info: "5 min",
        rounds: 1,
        rest_seconds: 0,
        exercises: [
          { name: "Dead hang",          type: "duration", seconds: 30, repeat: 2 },
          { name: "Scapular pull-ups",  type: "reps",     reps: "10" },
          { name: "Pompes lentes",      type: "reps",     reps: "10" },
          { name: "Cercles épaules",    type: "reps",     reps: "10/côté" },
        ],
      },
      {
        name: "Bloc A — Tractions",
        info: "5 séries — repos 2 min",
        rounds: 5,
        rest_seconds: 120,
        exercises: [
          { name: "Tractions pronation", type: "reps", reps: "6–8", note: "Tempo 2-0-2" },
        ],
      },
      {
        name: "Bloc B — Push force",
        info: "4 tours — repos 90s",
        rounds: 4,
        rest_seconds: 90,
        exercises: [
          { name: "Pompes déclinées",  type: "reps", reps: "10–12", note: "2s descente, 1s pause bas" },
          { name: "Pike push-ups",     type: "reps", reps: "10–12" },
          { name: "Pompes serrées",    type: "reps", reps: "12–15" },
        ],
      },
      {
        name: "Bloc C — Posture dos",
        info: "3 tours — repos 45s",
        rounds: 3,
        rest_seconds: 45,
        exercises: [
          { name: "Scapular pull-ups", type: "reps",     reps: "12" },
          { name: "Superman",          type: "reps",     reps: "15" },
          { name: "Y raises au sol",   type: "reps",     reps: "12" },
        ],
      },
      {
        name: "Core",
        info: "3 tours — repos 20s",
        rounds: 3,
        rest_seconds: 20,
        exercises: [
          { name: "Hollow hold",    type: "duration", seconds: 38 },
          { name: "Dead bug lent",  type: "reps",     reps: "12" },
          { name: "Reverse crunch", type: "reps",     reps: "15" },
          { name: "Gainage",        type: "duration", seconds: 45 },
        ],
      },
    ],
  },

  {
    id: "mardi",
    day: "Mardi",
    name: "JAMBES + EXPLOSIVITÉ",
    emoji: "🟢",
    color: "#22c55e",
    blocks: [
      {
        name: "Échauffement",
        info: "5 min",
        rounds: 1,
        rest_seconds: 0,
        exercises: [
          { name: "Squats légers",     type: "reps", reps: "15" },
          { name: "Fentes alternées",  type: "reps", reps: "10" },
          { name: "Hip circles",       type: "reps", reps: "10" },
        ],
      },
      {
        name: "Bloc A — Force",
        info: "4 tours — repos 90s",
        rounds: 4,
        rest_seconds: 90,
        exercises: [
          { name: "Squats tempo",               type: "reps", reps: "18–20", note: "3s descente" },
          { name: "Fentes marchées",            type: "reps", reps: "12/jambe" },
          { name: "Pont fessier unilatéral",    type: "reps", reps: "12/jambe" },
          { name: "Mollets",                    type: "reps", reps: "30" },
        ],
      },
      {
        name: "Bloc B — Explosivité",
        info: "3 tours — repos 60s",
        rounds: 3,
        rest_seconds: 60,
        exercises: [
          { name: "Jump squats",            type: "reps",     reps: "12" },
          { name: "Fentes sautées",         type: "reps",     reps: "10/jambe" },
          { name: "Squat hold isométrique", type: "duration", seconds: 50 },
        ],
      },
      {
        name: "Core",
        info: "3 tours — repos 20s",
        rounds: 3,
        rest_seconds: 20,
        exercises: [
          { name: "Hollow hold",    type: "duration", seconds: 38 },
          { name: "Dead bug lent",  type: "reps",     reps: "12" },
          { name: "Reverse crunch", type: "reps",     reps: "15" },
          { name: "Gainage",        type: "duration", seconds: 45 },
        ],
      },
    ],
  },

  {
    id: "mercredi",
    day: "Mercredi",
    name: "UPPER VOLUME",
    emoji: "🟠",
    color: "#f97316",
    blocks: [
      {
        name: "Échauffement",
        info: "5 min",
        rounds: 1,
        rest_seconds: 0,
        exercises: [
          { name: "Dead hang",         type: "duration", seconds: 30, repeat: 2 },
          { name: "Scapular pull-ups", type: "reps",     reps: "10" },
          { name: "Pompes lentes",     type: "reps",     reps: "10" },
          { name: "Cercles épaules",   type: "reps",     reps: "10/côté" },
        ],
      },
      {
        name: "Bloc A — Chin-ups volume",
        info: "5 séries — repos 90s",
        rounds: 5,
        rest_seconds: 90,
        exercises: [
          { name: "Chin-ups (supination)",  type: "reps",     reps: "8–10" },
          { name: "Pompes explosives",      type: "reps",     reps: "12" },
          { name: "Planche bras tendus",    type: "duration", seconds: 40 },
        ],
      },
      {
        name: "Bloc B — Push pump",
        info: "4 tours — repos 60s",
        rounds: 4,
        rest_seconds: 60,
        exercises: [
          { name: "Pompes larges",   type: "reps", reps: "15" },
          { name: "Pompes diamant",  type: "reps", reps: "12" },
          { name: "Pike push-ups",   type: "reps", reps: "12" },
          { name: "Pompes archer",   type: "reps", reps: "6/côté" },
        ],
      },
      {
        name: "Bloc C — Abdos suspendus",
        info: "3 tours — repos 45s",
        rounds: 3,
        rest_seconds: 45,
        exercises: [
          { name: "Knee raises", type: "reps",     reps: "15" },
          { name: "L-sit",       type: "duration", seconds: 18 },
          { name: "Dead hang",   type: "duration", seconds: 30 },
        ],
      },
      {
        name: "Core",
        info: "3 tours — repos 20s",
        rounds: 3,
        rest_seconds: 20,
        exercises: [
          { name: "Hollow hold",    type: "duration", seconds: 38 },
          { name: "Dead bug lent",  type: "reps",     reps: "12" },
          { name: "Reverse crunch", type: "reps",     reps: "15" },
          { name: "Gainage",        type: "duration", seconds: 45 },
        ],
      },
    ],
  },

  {
    id: "jeudi",
    day: "Jeudi",
    name: "HIIT + CORE RENFORCÉ",
    emoji: "🔵",
    color: "#3b82f6",
    blocks: [
      {
        name: "HIIT",
        info: "25 min — 30s effort / 35s repos — 13 tours",
        type: "hiit",
        rounds: 13,
        effort_seconds: 30,
        rest_seconds: 35,
        exercises: [
          { name: "Burpees" },
          { name: "Mountain climbers" },
          { name: "Jump squats" },
          { name: "Sprint sur place" },
        ],
      },
      {
        name: "Core renforcé",
        info: "4 tours — repos 20s",
        rounds: 4,
        rest_seconds: 20,
        exercises: [
          { name: "Hollow hold",      type: "duration", seconds: 40 },
          { name: "Dead bug",         type: "reps",     reps: "12" },
          { name: "Gainage latéral",  type: "duration", seconds: 45, note: "Chaque côté" },
          { name: "Reverse crunch",   type: "reps",     reps: "15" },
          { name: "V-up",             type: "reps",     reps: "10" },
        ],
      },
    ],
  },

  {
    id: "vendredi",
    day: "Vendredi",
    name: "UPPER CONTRÔLE",
    emoji: "🟣",
    color: "#a855f7",
    blocks: [
      {
        name: "Échauffement",
        info: "5 min",
        rounds: 1,
        rest_seconds: 0,
        exercises: [
          { name: "Dead hang",         type: "duration", seconds: 30, repeat: 2 },
          { name: "Scapular pull-ups", type: "reps",     reps: "10" },
          { name: "Pompes lentes",     type: "reps",     reps: "10" },
          { name: "Cercles épaules",   type: "reps",     reps: "10/côté" },
        ],
      },
      {
        name: "Bloc A — Contrôle strict",
        info: "5 tours — 45s effort / 15s transition",
        rounds: 5,
        rest_seconds: 60,
        exercises: [
          { name: "Pompes strictes",    type: "duration", seconds: 45, note: "Tempo parfait", rest: 15 },
          { name: "Dead hang",          type: "duration", seconds: 45, rest: 15 },
          { name: "Y raises au sol",    type: "duration", seconds: 45, rest: 15 },
          { name: "Planche bras tendus",type: "duration", seconds: 45, rest: 15 },
        ],
      },
      {
        name: "Bloc B — Calisthénie",
        info: "3 tours — repos 90s",
        rounds: 3,
        rest_seconds: 90,
        exercises: [
          { name: "Tractions lentes (négatifs)", type: "reps",     reps: "5",  note: "4s descente" },
          { name: "L-sit",                       type: "duration", seconds: 18 },
          { name: "Scapular pull-ups",           type: "reps",     reps: "12" },
          { name: "Hollow hold",                 type: "duration", seconds: 40 },
        ],
      },
      {
        name: "Core",
        info: "3 tours — repos 20s",
        rounds: 3,
        rest_seconds: 20,
        exercises: [
          { name: "Hollow hold",    type: "duration", seconds: 38 },
          { name: "Dead bug lent",  type: "reps",     reps: "12" },
          { name: "Reverse crunch", type: "reps",     reps: "15" },
          { name: "Gainage",        type: "duration", seconds: 45 },
        ],
      },
    ],
  },
];