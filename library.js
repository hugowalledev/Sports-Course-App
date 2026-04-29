let _svgFront = "", _svgBack = "";

async function loadSVGs() {
  try {
    _svgFront = await fetch("muscle-front.svg").then(r => r.text());
    _svgBack  = await fetch("muscle-back.svg").then(r => r.text());
  } catch (_) {}
}

/* ═══════════════════════════════════════════════════════
   Exercise Library
   location: "home" = bodyweight only
             "gym"  = requires gym equipment
             "bar"  = pull-up/dip bar (shows in both home & gym)
   ═══════════════════════════════════════════════════════ */

const EXERCISE_LIBRARY = [

  // ══════════════════════════════════════
  // PUSH — HOME
  // ══════════════════════════════════════
  {
    id: "push-up",
    name: "Push-up",
    category: "Push",
    location: "home",
    muscles: { primary: ["Pectoraux", "Triceps"], secondary: ["Épaules", "Core"] },
    difficulty: "beginner",
    defaultType: "reps", defaultReps: 10,
    cue: "Mains à largeur d'épaules, corps gainé en ligne droite. Descends la poitrine jusqu'au sol, coudes à 45°, puis pousse explosif.",
    gif: "exercises/push-up.gif",
  },
  {
    id: "diamond-push-up",
    name: "Diamond Push-up",
    category: "Push",
    location: "home",
    muscles: { primary: ["Triceps", "Pectoraux internes"], secondary: ["Épaules"] },
    difficulty: "intermediate",
    defaultType: "reps", defaultReps: 8,
    cue: "Index et pouces se touchent pour former un diamant sous le sternum. Corps droit, descends lentement, pousse en serrant les triceps.",
    gif: "exercises/diamond-push-up.gif"
  },
  {
    id: "wide-push-up",
    name: "Wide Push-up",
    category: "Push",
    location: "home",
    muscles: { primary: ["Pectoraux"], secondary: ["Épaules", "Triceps"] },
    difficulty: "beginner",
    defaultType: "reps", defaultReps: 10,
    cue: "Mains plus larges que les épaules, coudes pointés vers l'extérieur. Descends lentement pour étirer le pectoral.",
    gif: "exercises/wide-push-up.gif"
  },
  {
    id: "pike-push-up",
    name: "Pike Push-up",
    category: "Push",
    location: "home",
    muscles: { primary: ["Épaules", "Triceps"], secondary: ["Pectoraux supérieurs"] },
    difficulty: "intermediate",
    defaultType: "reps", defaultReps: 8,
    cue: "Hanches hautes en V inversé. Fléchis les coudes pour descendre la tête vers le sol. Simule un développé épaules.",
    gif: "exercises/pike-push-up.gif",
  },
  {
    id: "decline-push-up",
    name: "Decline Push-up",
    category: "Push",
    location: "home",
    muscles: { primary: ["Pectoraux supérieurs", "Épaules"], secondary: ["Triceps"] },
    difficulty: "intermediate",
    defaultType: "reps", defaultReps: 10,
    cue: "Pieds surélevés sur une chaise. Corps droit, descends lentement. Plus les pieds sont hauts, plus le haut du pecto travaille.",
    gif: "exercises/decline-push-up.gif"
  },
  {
    id: "pseudo-planche-push-up",
    name: "Pseudo Planche Push-up",
    category: "Push",
    location: "home",
    muscles: { primary: ["Pectoraux bas", "Avant-bras", "Core"], secondary: ["Épaules", "Triceps"] },
    difficulty: "advanced",
    defaultType: "reps", defaultReps: 6,
    cue: "Mains pointées vers les pieds. Pousse les épaules en avant des poignets avant de descendre. Corps incliné vers l'avant.",
  },
  {
    id: "archer-push-up",
    name: "Archer Push-up",
    category: "Push",
    location: "home",
    muscles: { primary: ["Pectoraux", "Triceps"], secondary: ["Épaules", "Stabilisateurs"] },
    difficulty: "advanced",
    defaultType: "reps", defaultReps: 5,
    cue: "Mains très écartées. Descends d'un côté en tendant l'autre bras. Alterne. Progression vers le push-up à une main.",
    gif: "exercises/archer-push-up.gif",
  },
  {
    id: "chair-dip",
    name: "Dips sur chaise",
    category: "Push",
    location: "home",
    muscles: { primary: ["Triceps"], secondary: ["Pectoraux bas", "Épaules"] },
    difficulty: "beginner",
    defaultType: "reps", defaultReps: 12,
    cue: "Mains sur le bord d'une chaise, dos proche. Descends jusqu'à 90° aux coudes puis pousse. Garde le dos droit et les épaules basses.",
    gif: "exercises/chair-dip.gif",
  },

  // ══════════════════════════════════════
  // PULL — BAR (home + gym)
  // ══════════════════════════════════════
  {
    id: "pull-up",
    name: "Pull-up",
    category: "Pull",
    location: "bar",
    muscles: { primary: ["Grand dorsal", "Biceps"], secondary: ["Rhomboïdes", "Trapèzes", "Avant-bras"] },
    difficulty: "intermediate",
    defaultType: "reps", defaultReps: 6,
    cue: "Prise pronation, mains légèrement plus larges que les épaules. Dépresse les omoplates, tire les coudes vers les hanches. Menton au-dessus de la barre.",
    gif: "exercises/pull-up.gif",
  },
  {
    id: "chin-up",
    name: "Chin-up",
    category: "Pull",
    location: "bar",
    muscles: { primary: ["Biceps", "Grand dorsal"], secondary: ["Rhomboïdes", "Pectoraux"] },
    difficulty: "intermediate",
    defaultType: "reps", defaultReps: 6,
    cue: "Prise supination (paumes vers toi). Tire en gardant les coudes près du corps. Contracte biceps et pectoraux en haut.",
    gif: "exercises/chin-up.gif"
  },
  {
    id: "neutral-pull-up",
    name: "Pull-up prise neutre",
    category: "Pull",
    location: "bar",
    muscles: { primary: ["Grand dorsal", "Biceps"], secondary: ["Rhomboïdes", "Brachial"] },
    difficulty: "intermediate",
    defaultType: "reps", defaultReps: 7,
    cue: "Paumes se font face. Prise la plus naturelle pour les épaules. Idéal pour débuter ou préserver les articulations.",
    gif: "exercises/neutral-pull-up.gif",
  },
  {
    id: "wide-pull-up",
    name: "Pull-up large",
    category: "Pull",
    location: "bar",
    muscles: { primary: ["Grand dorsal"], secondary: ["Biceps", "Trapèzes inférieurs"] },
    difficulty: "intermediate",
    defaultType: "reps", defaultReps: 5,
    cue: "Prise très large, pronation. Tire les coudes vers le bas et l'extérieur. Insiste sur l'écartement du dos.",
    gif: "exercises/wide-pull-up.gif"
  },
  {
    id: "commando-pull-up",
    name: "Commando Pull-up",
    category: "Pull",
    location: "bar",
    muscles: { primary: ["Grand dorsal", "Biceps"], secondary: ["Rhomboïdes", "Core"] },
    difficulty: "advanced",
    defaultType: "reps", defaultReps: 5,
    cue: "Prise mixte, mains serrées. Monte en amenant l'épaule gauche puis droite de chaque côté de la barre en alternance.",
  },
  {
    id: "muscle-up",
    name: "Muscle-up",
    category: "Pull",
    location: "bar",
    muscles: { primary: ["Grand dorsal", "Pectoraux", "Triceps"], secondary: ["Biceps", "Core"] },
    difficulty: "advanced",
    defaultType: "reps", defaultReps: 3,
    cue: "Prise pronation. Tire explosif en inclinant le buste, passe les poignets au-dessus de la barre, puis pousse pour finir en dips.",
    gif: "exercises/muscle-up.gif",
  },
  {
    id: "hanging-knee-raise",
    name: "Hanging Knee Raise",
    category: "Core",
    location: "bar",
    muscles: { primary: ["Abdominaux", "Fléchisseurs de hanche"], secondary: ["Avant-bras"] },
    difficulty: "beginner",
    defaultType: "reps", defaultReps: 10,
    cue: "Suspendu, ramène les genoux vers la poitrine en roulant les hanches. Tiens 1s en haut. Pas de balancement.",
    gif: "exercises/hanging-knee-raise.gif",
  },
  {
    id: "hanging-leg-raise",
    name: "Hanging Leg Raise",
    category: "Core",
    location: "bar",
    muscles: { primary: ["Abdominaux bas", "Fléchisseurs de hanche"], secondary: ["Avant-bras", "Core"] },
    difficulty: "intermediate",
    defaultType: "reps", defaultReps: 8,
    cue: "Suspendu, jambes tendues. Monte les pieds à la hauteur des hanches ou plus. Contrôle la descente, pas de balancement.",
    gif: "exercises/hanging-leg-raise.gif",
  },
  {
    id: "toes-to-bar",
    name: "Toes to Bar",
    category: "Core",
    location: "bar",
    muscles: { primary: ["Abdominaux", "Fléchisseurs de hanche"], secondary: ["Grand dorsal", "Avant-bras"] },
    difficulty: "advanced",
    defaultType: "reps", defaultReps: 6,
    cue: "Suspendu, jambes tendues, orteils touchent la barre. Bascule le bassin, contracte le core au maximum en haut.",
  },
  {
    id: "l-sit-bar",
    name: "L-Sit (barre)",
    category: "Core",
    location: "bar",
    muscles: { primary: ["Abdominaux", "Fléchisseurs de hanche", "Triceps"], secondary: ["Avant-bras", "Core"] },
    difficulty: "advanced",
    defaultType: "duration", defaultSeconds: 15,
    cue: "Suspendu ou en appui, jambes tendues à l'horizontale. Pousse la barre vers le bas. Tiens le plus longtemps possible.",
    gif: "exercises/l-sit-bar.gif",
  },

  // ══════════════════════════════════════
  // PULL — HOME (sans barre)
  // ══════════════════════════════════════
  {
    id: "inverted-row",
    name: "Australian Pull-up",
    category: "Pull",
    location: "home",
    muscles: { primary: ["Rhomboïdes", "Grand dorsal"], secondary: ["Biceps", "Trapèzes"] },
    difficulty: "beginner",
    defaultType: "reps", defaultReps: 10,
    cue: "Sous une table, corps droit. Tire la poitrine vers la surface en gardant les coudes proches. Idéal pour débuter le tirage horizontal.",
    gif: "exercises/inverted-row.gif",
  },

  // ══════════════════════════════════════
  // LEGS — HOME
  // ══════════════════════════════════════
  {
    id: "squat",
    name: "Squat",
    category: "Legs",
    location: "home",
    muscles: { primary: ["Quadriceps", "Fessiers"], secondary: ["Ischio-jambiers", "Core"] },
    difficulty: "beginner",
    defaultType: "reps", defaultReps: 15,
    cue: "Pieds à largeur d'épaules, orteils légèrement ouverts. Descends hanches en arrière jusqu'à cuisses parallèles. Genoux alignés avec les orteils.",
    gif: "exercises/squat.gif",
  },
  {
    id: "jump-squat",
    name: "Jump Squat",
    category: "Legs",
    location: "home",
    muscles: { primary: ["Quadriceps", "Fessiers"], secondary: ["Mollets", "Core"] },
    difficulty: "intermediate",
    defaultType: "reps", defaultReps: 10,
    cue: "Descends en squat profond, explose vers le haut. Réceptionne en souplesse, genoux fléchis. Enchaîne sans pause.",
    gif: "exercises/jump-squat.gif"
  },
  {
    id: "bulgarian-split-squat",
    name: "Bulgarian Split Squat",
    category: "Legs",
    location: "home",
    muscles: { primary: ["Quadriceps", "Fessiers"], secondary: ["Ischio-jambiers", "Core"] },
    difficulty: "intermediate",
    defaultType: "reps", defaultReps: 8,
    cue: "Pied arrière sur une chaise. Descends la hanche vers le sol, genou avant au-dessus de la cheville. Pousse via le talon avant.",
    gif: "exercises/bulgarian-split-squat.gif"
  },
  {
    id: "pistol-squat",
    name: "Pistol Squat",
    category: "Legs",
    location: "home",
    muscles: { primary: ["Quadriceps", "Fessiers"], secondary: ["Ischio-jambiers", "Core", "Équilibre"] },
    difficulty: "advanced",
    defaultType: "reps", defaultReps: 4,
    cue: "Sur une jambe, l'autre tendue devant. Descends à fond en contrôlant, genou dans l'axe. Bras devant pour l'équilibre.",
    gif: "exercises/pistol-squat.gif",
  },
  {
    id: "lunge",
    name: "Fente avant",
    category: "Legs",
    location: "home",
    muscles: { primary: ["Quadriceps", "Fessiers"], secondary: ["Ischio-jambiers", "Core"] },
    difficulty: "beginner",
    defaultType: "reps", defaultReps: 10,
    cue: "Grand pas en avant, genou arrière frôle le sol. Genou avant ne dépasse pas le pied. Remonte en poussant via le talon.",
    gif: "exercises/lunge.gif",
  },
  {
    id: "reverse-lunge",
    name: "Fente arrière",
    category: "Legs",
    location: "home",
    muscles: { primary: ["Fessiers", "Quadriceps"], secondary: ["Ischio-jambiers", "Core"] },
    difficulty: "beginner",
    defaultType: "reps", defaultReps: 10,
    cue: "Recule un pied, genou arrière vers le sol. Plus sûr pour les genoux que la fente avant. Buste droit, hanche bien basse.",
  },
  {
    id: "glute-bridge",
    name: "Pont fessier",
    category: "Legs",
    location: "home",
    muscles: { primary: ["Fessiers"], secondary: ["Ischio-jambiers", "Lombaires"] },
    difficulty: "beginner",
    defaultType: "reps", defaultReps: 15,
    cue: "Allongé sur le dos, pieds à plat. Pousse les hanches vers le haut en contractant les fessiers. Tiens 2s en haut.",
    gif: "exercises/glute-bridge.gif",
  },
  {
    id: "single-leg-glute-bridge",
    name: "Pont fessier unilatéral",
    category: "Legs",
    location: "home",
    muscles: { primary: ["Fessiers"], secondary: ["Ischio-jambiers", "Core"] },
    difficulty: "intermediate",
    defaultType: "reps", defaultReps: 10,
    cue: "Même position qu'un pont fessier mais une jambe tendue. Garde le bassin de niveau. Version plus intense.",
  },
  {
    id: "wall-sit",
    name: "Wall Sit",
    category: "Legs",
    location: "home",
    muscles: { primary: ["Quadriceps"], secondary: ["Fessiers", "Core"] },
    difficulty: "beginner",
    defaultType: "duration", defaultSeconds: 45,
    cue: "Dos contre le mur, cuisses parallèles au sol, genoux à 90°. Tiens la position. Brûle les quadriceps sur la durée.",
    gif: "exercises/wall-sit.gif"
  },
  {
    id: "calf-raise",
    name: "Élévation de mollets",
    category: "Legs",
    location: "home",
    muscles: { primary: ["Mollets (gastrocnémien)"], secondary: ["Soléaire"] },
    difficulty: "beginner",
    defaultType: "reps", defaultReps: 20,
    cue: "Monte sur la pointe des pieds le plus haut possible, tiens 1s, redescends lentement. Sur une marche pour plus d'amplitude.",
    gif: "exercises/calf-raise.gif",
  },
  {
    id: "box-jump",
    name: "Box Jump",
    category: "Legs",
    location: "home",
    muscles: { primary: ["Quadriceps", "Fessiers", "Explosivité"], secondary: ["Mollets", "Core"] },
    difficulty: "intermediate",
    defaultType: "reps", defaultReps: 8,
    cue: "Face à une surface stable. Squat rapide puis explose vers le haut. Réceptionne en souplesse avec genoux fléchis.",
    gif: "exercises/box-jump.gif",
  },

  // ══════════════════════════════════════
  // CORE — HOME
  // ══════════════════════════════════════
  {
    id: "plank",
    name: "Planche",
    category: "Core",
    location: "home",
    muscles: { primary: ["Abdominaux", "Core"], secondary: ["Épaules", "Fessiers"] },
    difficulty: "beginner",
    defaultType: "duration", defaultSeconds: 45,
    cue: "Sur les avant-bras ou les mains. Corps droit de la tête aux talons. Contracte abdos et fessiers. Pas de hanches hautes ni basses.",
    gif: "exercises/plank.gif",
  },
  {
    id: "side-plank",
    name: "Planche latérale",
    category: "Core",
    location: "home",
    muscles: { primary: ["Obliques", "Core"], secondary: ["Abducteurs", "Épaules"] },
    difficulty: "intermediate",
    defaultType: "duration", defaultSeconds: 30,
    cue: "Appui sur un avant-bras, corps latéral droit. Hanches hautes, pas affaissées. Alterne les côtés.",
    gif: "exercises/side-plank.gif",
  },
  {
    id: "hollow-body",
    name: "Hollow Body Hold",
    category: "Core",
    location: "home",
    muscles: { primary: ["Abdominaux", "Core profond"], secondary: ["Fléchisseurs de hanche"] },
    difficulty: "intermediate",
    defaultType: "duration", defaultSeconds: 30,
    cue: "Allongé, bras tendus au-dessus, jambes tendues levées. Lombaires plaquées au sol. Corps en forme de banane creuse.",
  },
  {
    id: "dead-bug",
    name: "Dead Bug",
    category: "Core",
    location: "home",
    muscles: { primary: ["Core profond", "Transverse"], secondary: ["Lombaires"] },
    difficulty: "beginner",
    defaultType: "reps", defaultReps: 10,
    cue: "Allongé, bras en l'air, genoux à 90°. Descends bras droit + jambe gauche en expirant. Lombaires plaquées au sol. Alterne.",
    gif: "exercises/dead-bug.gif",
  },
  {
    id: "mountain-climber",
    name: "Mountain Climber",
    category: "Core",
    location: "home",
    muscles: { primary: ["Core", "Abdominaux"], secondary: ["Épaules", "Cardio"] },
    difficulty: "intermediate",
    defaultType: "duration", defaultSeconds: 30,
    cue: "Position de pompe. Ramène les genoux vers la poitrine en alternant rapidement. Hanches stables, dos plat.",
    gif: "exercises/mountain-climber.gif",
  },
  {
    id: "v-up",
    name: "V-Up",
    category: "Core",
    location: "home",
    muscles: { primary: ["Abdominaux", "Fléchisseurs de hanche"], secondary: ["Core"] },
    difficulty: "intermediate",
    defaultType: "reps", defaultReps: 12,
    cue: "Allongé, bras et jambes tendus. Lève simultanément le buste et les jambes pour former un V. Touche les orteils en haut.",
    gif: "exercises/v-up.gif"
  },
  {
    id: "bicycle-crunch",
    name: "Bicycle Crunch",
    category: "Core",
    location: "home",
    muscles: { primary: ["Obliques", "Abdominaux"], secondary: ["Fléchisseurs de hanche"] },
    difficulty: "beginner",
    defaultType: "reps", defaultReps: 20,
    cue: "Mains derrière la tête. Coude droit vers genou gauche en tendant la jambe droite. Rotation complète du buste, pas juste des coudes.",
    gif: "exercises/bicycle-crunch.gif",
  },
  {
    id: "dragon-flag",
    name: "Dragon Flag",
    category: "Core",
    location: "home",
    muscles: { primary: ["Abdominaux", "Core complet"], secondary: ["Lombaires", "Fessiers"] },
    difficulty: "advanced",
    defaultType: "reps", defaultReps: 5,
    cue: "Allongé, mains tenant un support derrière la tête. Lève le corps en bloc, seules les épaules restent au sol. Descends lentement.",
  },
  {
    id: "superman",
    name: "Superman",
    category: "Core",
    location: "home",
    muscles: { primary: ["Lombaires", "Érecteurs du rachis"], secondary: ["Fessiers", "Trapèzes"] },
    difficulty: "beginner",
    defaultType: "reps", defaultReps: 12,
    cue: "À plat ventre, bras devant. Lève simultanément bras et jambes. Contracte lombaires et fessiers en haut. Tiens 2s.",
    gif: "exercises/superman.gif",
  },

  // ══════════════════════════════════════
  // CARDIO — HOME
  // ══════════════════════════════════════
  {
    id: "burpee",
    name: "Burpee",
    category: "Cardio",
    location: "home",
    muscles: { primary: ["Full body", "Cardio"], secondary: ["Pectoraux", "Quadriceps", "Core"] },
    difficulty: "intermediate",
    defaultType: "reps", defaultReps: 10,
    cue: "Debout → squat → pompe → squat → saut avec bras en l'air. Enchaîne sans pause. Rythme continu.",
    gif: "exercises/burpee.gif",
  },
  {
    id: "high-knees",
    name: "High Knees",
    category: "Cardio",
    location: "home",
    muscles: { primary: ["Cardio", "Fléchisseurs de hanche"], secondary: ["Core", "Mollets"] },
    difficulty: "beginner",
    defaultType: "duration", defaultSeconds: 30,
    cue: "Course sur place en montant les genoux à hauteur de hanche. Bras en opposition. Rythme élevé.",
    gif: "exercises/high-knees.gif",
  },
  {
    id: "jumping-jacks",
    name: "Jumping Jacks",
    category: "Cardio",
    location: "home",
    muscles: { primary: ["Cardio"], secondary: ["Abducteurs", "Épaules"] },
    difficulty: "beginner",
    defaultType: "duration", defaultSeconds: 30,
    cue: "Saute en écartant jambes et bras simultanément, reviens. Rythme régulier. Idéal pour l'échauffement.",
    gif: "exercises/jumping-jacks/gif",
  },

  // ══════════════════════════════════════
  // PUSH — GYM
  // ══════════════════════════════════════
  {
    id: "bench-press",
    name: "Développé couché (barre)",
    category: "Push",
    location: "gym",
    muscles: { primary: ["Pectoraux", "Triceps"], secondary: ["Épaules antérieures"] },
    difficulty: "intermediate",
    defaultType: "reps", defaultReps: 8,
    cue: "Prise légèrement plus large que les épaules. Descends la barre jusqu'à effleurer la poitrine. Pousse explosif. Dos légèrement arqué, pieds au sol.",
    gif: "exercises/bench-press.gif",
  },
  {
    id: "incline-dumbbell-press",
    name: "Développé incliné (haltères)",
    category: "Push",
    location: "dumbbells",
    muscles: { primary: ["Pectoraux supérieurs", "Épaules"], secondary: ["Triceps"] },
    difficulty: "intermediate",
    defaultType: "reps", defaultReps: 10,
    cue: "Banc incliné à 30-45°. Haltères aux épaules, pousse en arc vers le haut. Descends lentement pour étirer le haut du pecto.",
    gif: "exercises/incline-dumbbell-press.gif"
  },
  {
    id: "overhead-press",
    name: "Développé militaire",
    category: "Push",
    location: "gym",
    muscles: { primary: ["Épaules (deltoïdes)"], secondary: ["Triceps", "Trapèzes", "Core"] },
    difficulty: "intermediate",
    defaultType: "reps", defaultReps: 8,
    cue: "Barre au niveau du cou, prise légèrement plus large que les épaules. Pousse vers le haut. Core serré, ne creuse pas le bas du dos.",
    gif: "exercises/overhead-press.gif",
  },
  {
    id: "lateral-raise",
    name: "Élévations latérales",
    category: "Push",
    location: "dumbbells",
    muscles: { primary: ["Deltoïdes latéraux"], secondary: ["Trapèzes"] },
    difficulty: "beginner",
    defaultType: "reps", defaultReps: 12,
    cue: "Haltères légers, légère flexion du coude. Monte les bras jusqu'à l'horizontale, pas plus. Descends lentement. Évite d'hausser les épaules.",
    gif: "exercises/lateral-raise.gif",
  },
  {
    id: "cable-fly",
    name: "Écarté poulie",
    category: "Push",
    location: "gym",
    muscles: { primary: ["Pectoraux"], secondary: ["Épaules antérieures"] },
    difficulty: "beginner",
    defaultType: "reps", defaultReps: 12,
    cue: "Poulies hautes, un pas en avant. Bras légèrement fléchis, ramène les mains vers le centre. Contracte les pectoraux fort. Ouvre lentement.",
    gif: "exercises/cable-fly.gif"
  },
  {
    id: "tricep-pushdown",
    name: "Pushdown triceps (câble)",
    category: "Push",
    location: "gym",
    muscles: { primary: ["Triceps"], secondary: [] },
    difficulty: "beginner",
    defaultType: "reps", defaultReps: 12,
    cue: "Poignée à hauteur de poitrine, coudes collés aux côtes. Pousse vers le bas jusqu'à extension complète. Remonte lentement.",
    gif: "exercises/tricep-pushdown.gif",
  },
  {
    id: "skull-crusher",
    name: "Skull Crusher",
    category: "Push",
    location: "gym",
    muscles: { primary: ["Triceps (longue portion)"], secondary: [] },
    difficulty: "intermediate",
    defaultType: "reps", defaultReps: 10,
    cue: "Allongé, barre tenue bras tendus. Fléchis uniquement les coudes pour descendre la barre vers le front. Coudes fixes, pousse vers le haut.",
    gif: "exercises/skull-crusher.gif",
  },
  {
    id: "chest-dip",
    name: "Dips pectoraux",
    category: "Push",
    location: "gym",
    muscles: { primary: ["Pectoraux bas", "Triceps"], secondary: ["Épaules"] },
    difficulty: "intermediate",
    defaultType: "reps", defaultReps: 10,
    cue: "Buste incliné vers l'avant, coudes légèrement écartés. Descends jusqu'à étirer le pectoral. Peut être lestée.",
    gif: "exercises/chest-dip.gif",
  },

  // ══════════════════════════════════════
  // PULL — GYM
  // ══════════════════════════════════════
  {
    id: "barbell-row",
    name: "Rowing barre",
    category: "Pull",
    location: "gym",
    muscles: { primary: ["Grand dorsal", "Rhomboïdes"], secondary: ["Biceps", "Trapèzes"] },
    difficulty: "intermediate",
    defaultType: "reps", defaultReps: 8,
    cue: "Buste penché à 45°, barre sous les côtes. Tire les coudes vers le haut-arrière. Dos plat, omoplates serrées en haut.",
    gif: "exercises/barbell-row.gif"
  },
  {
    id: "lat-pulldown",
    name: "Tirage vertical (poulie)",
    category: "Pull",
    location: "gym",
    muscles: { primary: ["Grand dorsal"], secondary: ["Biceps", "Rhomboïdes"] },
    difficulty: "beginner",
    defaultType: "reps", defaultReps: 10,
    cue: "Prise large, buste légèrement incliné. Tire la barre vers le haut de la poitrine en poussant les coudes vers le bas. Ne penche pas trop le buste.",
    gif: "exercises/lat-pulldown.gif",
  },
  {
    id: "cable-row",
    name: "Rowing câble assis",
    category: "Pull",
    location: "gym",
    muscles: { primary: ["Rhomboïdes", "Grand dorsal"], secondary: ["Biceps", "Trapèzes"] },
    difficulty: "beginner",
    defaultType: "reps", defaultReps: 12,
    cue: "Assis, dos droit. Tire le câble vers le nombril, serre les omoplates. Étends les bras lentement. Ne balance pas le buste.",
    gif: "exercises/cable-row.gif"
  },
  {
    id: "face-pull",
    name: "Face Pull",
    category: "Pull",
    location: "gym",
    muscles: { primary: ["Deltoïdes postérieurs", "Rhomboïdes"], secondary: ["Trapèzes", "Rotateurs"] },
    difficulty: "beginner",
    defaultType: "reps", defaultReps: 15,
    cue: "Poulie haute, corde. Tire vers le visage en écartant les mains. Coudes hauts, épaules en rotation externe. Essentiel pour la santé des épaules.",
    gif: "exercises/face-pull.gif"
  },
  {
    id: "deadlift",
    name: "Soulevé de terre",
    category: "Pull",
    location: "gym",
    muscles: { primary: ["Ischio-jambiers", "Fessiers", "Lombaires"], secondary: ["Trapèzes", "Core", "Quadriceps"] },
    difficulty: "intermediate",
    defaultType: "reps", defaultReps: 5,
    cue: "Pieds sous la barre, dos plat, hanches en arrière. Pousse le sol vers le bas, barre glisse contre les jambes. Ne casse pas le dos.",
    gif: "exercises/deadlift.gif",
  },
  {
    id: "barbell-curl",
    name: "Curl barre",
    category: "Pull",
    location: "gym",
    muscles: { primary: ["Biceps"], secondary: ["Brachial", "Avant-bras"] },
    difficulty: "beginner",
    defaultType: "reps", defaultReps: 10,
    cue: "Prise supination, coudes collés aux côtes. Fléchis jusqu'en haut, supine au maximum. Descends lentement. Ne balance pas.",
    gif: "exercises/barbell-curl.gif",
  },
  {
    id: "hammer-curl",
    name: "Hammer Curl",
    category: "Pull",
    location: "dumbbells",
    muscles: { primary: ["Brachial", "Biceps"], secondary: ["Avant-bras"] },
    difficulty: "beginner",
    defaultType: "reps", defaultReps: 10,
    cue: "Prise neutre (pouces vers le haut). Monte l'haltère vers l'épaule, coudes fixes. Développe l'épaisseur du bras.",
    gif: "exercises/hammer-curl.gif",
  },
  {
    id: "dumbbell-row",
    name: "Rowing haltère unilatéral",
    category: "Pull",
    location: "dumbbells",
    muscles: { primary: ["Grand dorsal"], secondary: ["Rhomboïdes", "Biceps"] },
    difficulty: "beginner",
    defaultType: "reps", defaultReps: 10,
    cue: "Main et genou sur un banc, dos plat. Tire l'haltère vers la hanche, coude frôle le buste. Étire le dos en bas.",
    gif: "exercises/dumbbell-row.gif"
  },

  // ══════════════════════════════════════
  // LEGS — GYM
  // ══════════════════════════════════════
  {
    id: "barbell-squat",
    name: "Squat barre",
    category: "Legs",
    location: "gym",
    muscles: { primary: ["Quadriceps", "Fessiers"], secondary: ["Ischio-jambiers", "Core", "Lombaires"] },
    difficulty: "intermediate",
    defaultType: "reps", defaultReps: 6,
    cue: "Barre sur les trapèzes, pieds à largeur d'épaules. Descends hanches en arrière, genoux suivent les orteils. Cuisses parallèles minimum.",
    gif: "exercises/barbell-squat.gif",
  },
  {
    id: "leg-press",
    name: "Presse à cuisses",
    category: "Legs",
    location: "gym",
    muscles: { primary: ["Quadriceps", "Fessiers"], secondary: ["Ischio-jambiers"] },
    difficulty: "beginner",
    defaultType: "reps", defaultReps: 12,
    cue: "Pieds à largeur d'épaules sur la plateforme. Descends à 90° de flexion. Pieds hauts = fessiers, pieds bas = quadriceps.",
    gif: "exercises/leg-press.gif",
  },
  {
    id: "leg-extension",
    name: "Leg Extension",
    category: "Legs",
    location: "gym",
    muscles: { primary: ["Quadriceps"], secondary: [] },
    difficulty: "beginner",
    defaultType: "reps", defaultReps: 12,
    cue: "Assis, dos contre le dossier. Étends les jambes jusqu'au verrouillage, tiens 1s. Descends lentement. Isolation des quadriceps.",
    gif: "exercises/leg-extension.gif",
  },
  {
    id: "leg-curl",
    name: "Leg Curl allongé",
    category: "Legs",
    location: "gym",
    muscles: { primary: ["Ischio-jambiers"], secondary: ["Mollets"] },
    difficulty: "beginner",
    defaultType: "reps", defaultReps: 12,
    cue: "Allongé, cheville sous le rouleau. Fléchis au maximum, tiens 1s. Descends lentement. Isolation des ischio-jambiers.",
    gif: "exercises/leg-curl.gif",
  },
  {
    id: "romanian-deadlift",
    name: "Romanian Deadlift",
    category: "Legs",
    location: "gym",
    muscles: { primary: ["Ischio-jambiers", "Fessiers"], secondary: ["Lombaires", "Core"] },
    difficulty: "intermediate",
    defaultType: "reps", defaultReps: 8,
    cue: "Dos plat, hanches en arrière, jambes quasi tendues. Descends jusqu'à sentir l'étirement des ischio. Remonte en poussant les hanches.",
    gif: "exercises/romanian-deadlift.gif",
  },
  {
    id: "hip-thrust-bar",
    name: "Hip Thrust (barre)",
    category: "Legs",
    location: "gym",
    muscles: { primary: ["Fessiers"], secondary: ["Ischio-jambiers", "Core"] },
    difficulty: "intermediate",
    defaultType: "reps", defaultReps: 10,
    cue: "Dos contre un banc, barre sur les hanches. Pousse les hanches vers le haut, contracte les fessiers fort. Menton rentré. Descends lentement.",
    gif: "exercises/hip-thrust-bar.gif",
  },
  {
    id: "hack-squat",
    name: "Hack Squat (machine)",
    category: "Legs",
    location: "gym",
    muscles: { primary: ["Quadriceps"], secondary: ["Fessiers", "Ischio-jambiers"] },
    difficulty: "intermediate",
    defaultType: "reps", defaultReps: 10,
    cue: "Épaules sous les appuis, pieds bas sur la plateforme. Descends profond, genoux dans l'axe des orteils. Plus sûr pour le dos que le squat libre.",
    gif: "exercises/hack-squat.gif",
  },
  {
    id: "machine-calf-raise",
    name: "Mollets à la machine",
    category: "Legs",
    location: "gym",
    muscles: { primary: ["Gastrocnémien", "Soléaire"], secondary: [] },
    difficulty: "beginner",
    defaultType: "reps", defaultReps: 15,
    cue: "Monte sur la pointe des pieds au maximum, tiens 2s, descends lentement en dessous de l'horizontale pour étirer.",
    gif: "exercises/machine-calf-raise.gif",
  },

  // ══════════════════════════════════════
  // CORE — GYM
  // ══════════════════════════════════════
  {
    id: "cable-crunch",
    name: "Crunch câble",
    category: "Core",
    location: "gym",
    muscles: { primary: ["Abdominaux (droits)"], secondary: ["Core"] },
    difficulty: "beginner",
    defaultType: "reps", defaultReps: 15,
    cue: "À genoux, corde tenue aux côtés de la tête. Enroule le buste vers le bas en contractant les abdos. Mouvement des vertèbres, pas des hanches.",
    gif: "exercises/cable-crunch.gif"
  },
  {
    id: "ab-wheel",
    name: "Ab Wheel Rollout",
    category: "Core",
    location: "gym",
    muscles: { primary: ["Abdominaux", "Core profond"], secondary: ["Épaules", "Lombaires"] },
    difficulty: "advanced",
    defaultType: "reps", defaultReps: 8,
    cue: "À genoux ou debout. Roule vers l'avant en gardant les lombaires neutres. Reviens en contractant les abdos, pas en cassant les hanches.",
    gif: "exercises/ab-wheel.gif"
  },
  {
    id: "russian-twist",
    name: "Russian Twist (lest)",
    category: "Core",
    location: "gym",
    muscles: { primary: ["Obliques"], secondary: ["Abdominaux", "Core"] },
    difficulty: "intermediate",
    defaultType: "reps", defaultReps: 16,
    cue: "Assis, buste à 45°, pieds décollés. Tourne le buste gauche-droite en tenant un poids. La rotation vient des épaules, pas des bras.",
    gif: "exercises/russian-twist.gif",
  },
    // ══════════════════════════════════════
  // PUSH — DUMBBELLS
  // ══════════════════════════════════════
  {
    id: "db-chest-press",
    name: "Développé couché haltères",
    category: "Push",
    location: "dumbbells",
    muscles: { primary: ["Pectoraux", "Triceps"], secondary: ["Épaules antérieures"] },
    difficulty: "beginner",
    defaultType: "reps", defaultReps: 10,
    cue: "Allongé, haltères de chaque côté de la poitrine. Pousse vers le haut en arc, haltères se rapprochent légèrement en haut. Plus d'amplitude qu'à la barre.",
    gif: "exercises/db-chest-press.gif",
  },
  {
    id: "db-shoulder-press",
    name: "Développé épaules haltères",
    category: "Push",
    location: "dumbbells",
    muscles: { primary: ["Épaules (deltoïdes)"], secondary: ["Triceps", "Trapèzes"] },
    difficulty: "beginner",
    defaultType: "reps", defaultReps: 10,
    cue: "Haltères à hauteur d'épaules, coudes à 90°. Pousse vers le haut sans verrouiller. Descends lentement jusqu'au niveau des oreilles.",
    gif: "exercises/db-shoulder-press.gif"
  },
  {
    id: "arnold-press",
    name: "Arnold Press",
    category: "Push",
    location: "dumbbells",
    muscles: { primary: ["Épaules (3 chefs)"], secondary: ["Triceps"] },
    difficulty: "intermediate",
    defaultType: "reps", defaultReps: 10,
    cue: "Départ paumes vers toi, haltères devant le visage. Pousse vers le haut en tournant les poignets vers l'extérieur. Travaille les 3 chefs du deltoïde.",
    gif: "exercises/arnold-press.gif",
  },
  {
    id: "db-front-raise",
    name: "Élévation frontale haltères",
    category: "Push",
    location: "dumbbells",
    muscles: { primary: ["Deltoïdes antérieurs"], secondary: ["Trapèzes"] },
    difficulty: "beginner",
    defaultType: "reps", defaultReps: 12,
    cue: "Haltères devant les cuisses, monte les bras tendus jusqu'à l'horizontale. Descends lentement. Alterne ou simultané.",
    gif: "exercises/db-front-raise.gif",
  },
  {
    id: "db-tricep-kickback",
    name: "Tricep Kickback",
    category: "Push",
    location: "dumbbells",
    muscles: { primary: ["Triceps"], secondary: [] },
    difficulty: "beginner",
    defaultType: "reps", defaultReps: 12,
    cue: "Buste penché à 45°, coude collé au flanc. Étends l'avant-bras vers l'arrière jusqu'au verrouillage. Tiens 1s. Contrôle la descente.",
    gif: "exercises/db-tricep-kickback.gif",
  },
  {
    id: "db-chest-fly",
    name: "Écarté haltères (plat)",
    category: "Push",
    location: "dumbbells",
    muscles: { primary: ["Pectoraux"], secondary: ["Épaules antérieures"] },
    difficulty: "beginner",
    defaultType: "reps", defaultReps: 12,
    cue: "Allongé, bras tendus au-dessus. Ouvre en arc en gardant une légère flexion des coudes. Étire bien les pectoraux en bas, contracte en haut.",
    gif: "exercises/db-chest-fly.gif",
  },

  // ══════════════════════════════════════
  // PULL — DUMBBELLS
  // ══════════════════════════════════════
  {
    id: "db-bicep-curl",
    name: "Curl haltères",
    category: "Pull",
    location: "dumbbells",
    muscles: { primary: ["Biceps"], secondary: ["Brachial", "Avant-bras"] },
    difficulty: "beginner",
    defaultType: "reps", defaultReps: 10,
    cue: "Coudes collés aux côtes, prise supination. Fléchis jusqu'en haut, tourne le poignet en fin de mouvement. Alterne ou simultané.",
    gif: "exercises/db-bicep-curl.gif"
  },
  {
    id: "renegade-row",
    name: "Renegade Row",
    category: "Pull",
    location: "dumbbells",
    muscles: { primary: ["Grand dorsal", "Rhomboïdes"], secondary: ["Core", "Épaules", "Triceps"] },
    difficulty: "advanced",
    defaultType: "reps", defaultReps: 8,
    cue: "Position de pompe sur les haltères. Tire un haltère vers la hanche sans rotation du buste. Core ultra gainé pour stabiliser. Alterne les côtés.",
    gif: "exercises/renegade-row.gif",
  },
  {
    id: "db-bent-over-row",
    name: "Rowing haltères buste penché",
    category: "Pull",
    location: "dumbbells",
    muscles: { primary: ["Grand dorsal", "Rhomboïdes"], secondary: ["Biceps", "Trapèzes"] },
    difficulty: "intermediate",
    defaultType: "reps", defaultReps: 10,
    cue: "Buste penché à 45°, dos plat. Tire les deux haltères vers les hanches simultanément. Serre les omoplates en haut.",
    gif: "exercises/db-bent-over-row.gif",
  },

  // ══════════════════════════════════════
  // LEGS — DUMBBELLS
  // ══════════════════════════════════════
  {
    id: "goblet-squat",
    name: "Goblet Squat",
    category: "Legs",
    location: "dumbbells",
    muscles: { primary: ["Quadriceps", "Fessiers"], secondary: ["Core", "Ischio-jambiers"] },
    difficulty: "beginner",
    defaultType: "reps", defaultReps: 12,
    cue: "Haltère tenu verticalement contre la poitrine. Squat profond, coudes entre les genoux en bas. Maintient naturellement le buste droit.",
    gif: "exercises/goblet-squat.gif",
  },
  {
    id: "db-romanian-deadlift",
    name: "Romanian Deadlift haltères",
    category: "Legs",
    location: "dumbbells",
    muscles: { primary: ["Ischio-jambiers", "Fessiers"], secondary: ["Lombaires", "Core"] },
    difficulty: "intermediate",
    defaultType: "reps", defaultReps: 10,
    cue: "Haltères devant les cuisses, dos plat. Penche le buste en reculant les hanches. Descends jusqu'à sentir l'étirement, remonte en poussant les hanches.",
    gif: "exercises/db-romanian-deadlift.gif",
  },
  {
    id: "db-lunge",
    name: "Fentes avec haltères",
    category: "Legs",
    location: "dumbbells",
    muscles: { primary: ["Quadriceps", "Fessiers"], secondary: ["Ischio-jambiers", "Core"] },
    difficulty: "intermediate",
    defaultType: "reps", defaultReps: 10,
    cue: "Haltères de chaque côté, même technique que la fente bodyweight. Ajoute de la charge progressivement. Buste droit, genou arrière frôle le sol.",
    gif: "exercises/db-lunge.gif",
  },
  {
    id: "db-hip-thrust",
    name: "Hip Thrust haltère",
    category: "Legs",
    location: "dumbbells",
    muscles: { primary: ["Fessiers"], secondary: ["Ischio-jambiers", "Core"] },
    difficulty: "intermediate",
    defaultType: "reps", defaultReps: 12,
    cue: "Dos contre un canapé/banc, haltère posé sur les hanches. Pousse les hanches vers le haut, contracte les fessiers au maximum. Version accessible du hip thrust barre.",
    gif: "exercises/db-hip-thrust.gif",
  },
  {
    id: "farmer-carry",
    name: "Farmer's Carry",
    category: "Legs",
    location: "dumbbells",
    muscles: { primary: ["Trapèzes", "Core", "Avant-bras"], secondary: ["Fessiers", "Mollets"] },
    difficulty: "beginner",
    defaultType: "duration", defaultSeconds: 30,
    cue: "Haltères lourds de chaque côté, buste droit, épaules rentrées. Marche sur une distance définie. Excellent pour le gainage global et les trapèzes.",
    gif: "exercises/farmer-carry.gif"
  },
];

const MUSCLE_SVG_MAP = {
  // ── Front ──────────────────────────────
  "Pectoraux":               { view: "front", ids: ["upper-pectoralis", "mid-lower-pectoralis"] },
  "Pectoraux supérieurs":    { view: "front", ids: ["upper-pectoralis"] },
  "Pectoraux internes":      { view: "front", ids: ["mid-lower-pectoralis"] },
  "Pectoraux bas":           { view: "front", ids: ["mid-lower-pectoralis"] },
  "Biceps":                  { view: "front", ids: ["long-head-bicep", "short-head-bicep"] },
  "Brachial":                { view: "front", ids: ["short-head-bicep"] },
  "Épaules":                 { view: "front", ids: ["anterior-deltoid", "lateral-deltoid"] },
  "Épaules (deltoïdes)":     { view: "front", ids: ["anterior-deltoid", "lateral-deltoid"] },
  "Deltoïdes antérieurs":    { view: "front", ids: ["anterior-deltoid"] },
  "Deltoïdes latéraux":      { view: "front", ids: ["lateral-deltoid"] },
  "Abdominaux":              { view: "front", ids: ["upper-abdominals", "lower-abdominals"] },
  "Abdominaux (droits)":     { view: "front", ids: ["upper-abdominals", "lower-abdominals"] },
  "Abdominaux bas":          { view: "front", ids: ["lower-abdominals"] },
  "Core":                    { view: "front", ids: ["upper-abdominals", "lower-abdominals", "obliques"] },
  "Core profond":            { view: "front", ids: ["upper-abdominals", "lower-abdominals"] },
  "Transverse":              { view: "front", ids: ["lower-abdominals"] },
  "Obliques":                { view: "front", ids: ["obliques"] },
  "Quadriceps":              { view: "front", ids: ["outer-quadricep", "rectus-femoris", "inner-quadricep"] },
  "Mollets (gastrocnémien)": { view: "front", ids: ["gastrocnemius"] },
  "Soléaire":                { view: "front", ids: ["soleus"] },
  "Mollets":                 { view: "front", ids: ["gastrocnemius", "soleus"] },
  "Gastrocnémien":           { view: "front", ids: ["gastrocnemius"] },
  "Fléchisseurs de hanche":  { view: "front", ids: ["groin"] },
  "Avant-bras":              { view: "front", ids: ["wrist-flexors"] },

  // ── Back ───────────────────────────────
  "Grand dorsal":            { view: "back", ids: ["lats"] },
  "Trapèzes":                { view: "back", ids: ["upper-trapezius", "traps-middle", "lower-trapezius"] },
  "Trapèzes inférieurs":     { view: "back", ids: ["lower-trapezius"] },
  "Rhomboïdes":              { view: "back", ids: ["traps-middle"] },
  "Triceps":                 { view: "back", ids: ["medial-head-triceps", "long-head-triceps", "lateral-head-triceps"] },
  "Triceps (longue portion)":{ view: "back", ids: ["long-head-triceps"] },
  "Épaules (3 chefs)":       { view: "back", ids: ["posterior-deltoid", "lateral-deltoid"] },
  "Deltoïdes postérieurs":   { view: "back", ids: ["posterior-deltoid"] },
  "Fessiers":                { view: "back", ids: ["gluteus-maximus", "gluteus-medius"] },
  "Ischio-jambiers":         { view: "back", ids: ["medial-hamstrings", "lateral-hamstrings"] },
  "Lombaires":               { view: "back", ids: ["lowerback"] },
  "Érecteurs du rachis":     { view: "back", ids: ["lowerback"] },
};


/* ═══════════════════════════════════════════════════════
   Library UI
   ═══════════════════════════════════════════════════════ */

const libState = { location: "home", category: "all" };

function openLibrary() {
  showView("library");
  renderLibList();
}

function setLibLocation(loc) {
  libState.location = loc;
  document.getElementById("lib-loc-home").classList.toggle("active", loc === "home");
  document.getElementById("lib-loc-gym").classList.toggle("active",  loc === "gym");
  renderLibList();
}

function setLibCategory(cat) {
  libState.category = cat;
  document.querySelectorAll(".lib-cat-pill").forEach(p =>
    p.classList.toggle("active", p.dataset.cat === cat)
  );
  renderLibList();
}

function renderLibList() {
  const search    = (document.getElementById("lib-search")?.value || "").toLowerCase();
  const locMatch  = libState.location === "home"
    ? ["home", "bar", "dumbbells"]
    : ["gym",  "bar", "dumbbells"];
  const diffLabel = { beginner: "Débutant", intermediate: "Intermédiaire", advanced: "Avancé" };

  const filtered = EXERCISE_LIBRARY.filter(ex => {
    if (!locMatch.includes(ex.location)) return false;
    if (libState.category !== "all" && ex.category !== libState.category) return false;
    if (search && !ex.name.toLowerCase().includes(search)) return false;
    return true;
  });

  const list = document.getElementById("lib-list");
  if (!list) return;

  list.innerHTML = filtered.length === 0
    ? `<p class="empty-msg">Aucun exercice trouvé.</p>`
    : filtered.map(ex => `
        <button class="lib-card" onclick="openLibSheet('${ex.id}')">
          <div class="lib-card__info">
            <div class="lib-card__name">${ex.name}</div>
            <div class="lib-card__muscles">${ex.muscles.primary.join(", ")}</div>
          </div>
          <div class="lib-card__badges">
            <span class="diff-badge ${ex.difficulty}">${diffLabel[ex.difficulty]}</span>
            <span class="lib-card__cat">${ex.category}</span>
          </div>
        </button>`
      ).join("");
}

function highlightMuscles(primaryList, secondaryList = []) {
  const wrap = document.querySelector(".muscle-diagram-wrap");
  if (!wrap) return;

  wrap.querySelectorAll(".mz").forEach(el => el.classList.remove("primary", "secondary"));

  const highlight = (name, cls) => {
    const mapping = MUSCLE_SVG_MAP[name];
    if (!mapping) return;
    const scope = wrap.querySelector(mapping.view === "front" ? ".svg-front" : ".svg-back");
    if (!scope) return;
    mapping.ids.forEach(id => {
      const el = scope.querySelector(`#${id}`);
      if (el) el.classList.add(cls);
    });
  };

  secondaryList.forEach(m => highlight(m, "secondary"));
  primaryList.forEach(m => highlight(m, "primary"));
}

function openLibSheet(id) {
  const ex = EXERCISE_LIBRARY.find(e => e.id === id);
  if (!ex) return;
  const diffLabel = { beginner: "Débutant", intermediate: "Intermédiaire", advanced: "Avancé" };
  const locLabel  = { home: "🏠 Maison", gym: "🏋️ Salle", bar: "🔩 Barre de traction", dumbbells: "🏋️ Haltères" };
  const defaultVal = ex.defaultType === "reps" ? `${ex.defaultReps} reps` : `${ex.defaultSeconds}s`;

  document.getElementById("lib-sheet-content").innerHTML = `
    <div class="lib-sheet-name">${ex.name}</div>
    <div class="lib-sheet-badges">
      <span class="diff-badge ${ex.difficulty}">${diffLabel[ex.difficulty]}</span>
      <span class="muscle-tag">${locLabel[ex.location]}</span>
      <span class="muscle-tag secondary">Défaut : ${defaultVal}</span>
    </div>
    ${ex.gif ? `<img class="ex-gif" src="${ex.gif}" alt="${ex.name}">` : ""}
    <div class="muscle-diagram-wrap">
      <div class="svg-front">${_svgFront}</div>
      <div class="svg-back">${_svgBack}</div>
    </div>
    <div class="lib-sheet-section">
      <div class="lib-sheet-label">Muscles principaux</div>
      <div class="lib-sheet-muscles">
        ${ex.muscles.primary.map(m => `<span class="muscle-tag">${m}</span>`).join("")}
      </div>
    </div>
    ${ex.muscles.secondary.length ? `
    <div class="lib-sheet-section">
      <div class="lib-sheet-label">Muscles secondaires</div>
      <div class="lib-sheet-muscles">
        ${ex.muscles.secondary.map(m => `<span class="muscle-tag secondary">${m}</span>`).join("")}
      </div>
    </div>` : ""}
    <div class="lib-sheet-section">
      <div class="lib-sheet-label">Technique</div>
      <div class="lib-sheet-cue">${ex.cue}</div>
    </div>
  `;
  highlightMuscles(ex.muscles.primary, ex.muscles.secondary);
  document.getElementById("lib-backdrop").classList.add("open");
  document.getElementById("lib-sheet").classList.add("open");
}

function closeLibSheet() {
  document.getElementById("lib-backdrop").classList.remove("open");
  document.getElementById("lib-sheet").classList.remove("open");
}

loadSVGs();