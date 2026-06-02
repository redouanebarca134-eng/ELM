// ════════════════════════════════════════════════════════════════════
//  CONFIG — modifie tout ici (textes, couleurs, durées, assets)
// ════════════════════════════════════════════════════════════════════

export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;
export const DURATION = 600; // 20 s

// Choix de la langue affichée : "fr" ou "ar"
export const LANG: "fr" | "ar" = "fr";

// ─── Couleurs de marque ELM ─────────────────────────────────────────
export const COLORS = {
  bgDeep: "#0B0B0D", // noir minéral profond
  bgCharcoal: "#1A1410", // brun-charbon
  gold: "#C9A24B", // doré / ambre (accent)
  goldSoft: "#E4C77E", // doré clair (lueurs)
  text: "#F5F2EA", // blanc cassé
} as const;

// ─── Assets (dans /public) — remplace-les par tes vrais fichiers ────
export const ASSETS = {
  product: "shilajit-product.png", // photo du pot / résine
  logo: "elm-logo.png", // logo ELM
  music: "music.mp3", // musique de fond (optionnel)
  voiceover: "voiceover.mp3", // voix off (optionnel)
};

// Active/désactive l'audio si les fichiers ne sont pas encore présents
export const AUDIO = {
  music: false, // passe à true quand public/music.mp3 existe
  voiceover: false, // passe à true quand public/voiceover.mp3 existe
  musicVolume: 0.5,
  voiceoverVolume: 1,
};

// ─── Safe zones réseaux sociaux (TikTok / Reels) ────────────────────
export const SAFE = {
  top: Math.round(HEIGHT * 0.12), // 12% du haut masqués par l'UI
  bottom: Math.round(HEIGHT * 0.22), // 22% du bas masqués par l'UI
  side: 80, // marge latérale confortable
};

// ─── Timings de scènes (en frames) ──────────────────────────────────
export const SCENES = {
  hook: { from: 0, duration: 90 },
  probleme: { from: 90, duration: 90 },
  produit: { from: 180, duration: 120 },
  benefice1: { from: 300, duration: 60 },
  benefice2: { from: 360, duration: 60 },
  benefice3: { from: 420, duration: 60 },
  credibilite: { from: 480, duration: 60 },
  cta: { from: 540, duration: 60 },
};

export const TRANSITION_FRAMES = 12; // chevauchement entre scènes

// ─── Textes FR ──────────────────────────────────────────────────────
const TEXT_FR = {
  dir: "ltr" as const,
  hookTitle: "Fatigué… même après une nuit complète ?",
  hookSub: "Ton corps réclame des minéraux.",
  problemeWords: ["Stress.", "Écrans.", "Mauvaise alimentation."],
  problemeLine: "Ton énergie s'épuise, jour après jour.",
  produitTitle: "Découvre le Shilajit pur d'ELM",
  produitSub: "La résine noire des montagnes, riche en acide fulvique.",
  benefices: [
    { icon: "⚡", text: "Énergie naturelle, toute la journée" },
    { icon: "⛰️", text: "80+ minéraux & oligo-éléments" },
    { icon: "🛡️", text: "Force, récupération & vitalité" },
  ],
  credibilite: "Sélectionné, purifié et testé avec soin · Certifié 100% Bio",
  ctaTitle: "Commande maintenant 👇",
  ctaSub: "Livraison partout en Algérie 🇩🇿",
  ctaButton: "اطلب الآن — ELM",
};

// ─── Textes AR (RTL) ────────────────────────────────────────────────
const TEXT_AR = {
  dir: "rtl" as const,
  hookTitle: "تعبان… حتى بعد ليلة كاملة من النوم؟",
  hookSub: "جسمك محتاج المعادن.",
  problemeWords: ["التوتر.", "الشاشات.", "التغذية السيئة."],
  problemeLine: "طاقتك تتناقص يومًا بعد يوم.",
  produitTitle: "اكتشف شيلاجيت ELM الأصلي",
  produitSub: "صمغ الجبال الأسود الغني بالأحماض الفولفية.",
  benefices: [
    { icon: "⚡", text: "طاقة طبيعية طوال اليوم" },
    { icon: "⛰️", text: "أكثر من 80 معدنًا وعنصرًا نادرًا" },
    { icon: "🛡️", text: "قوة وتعافٍ وحيوية" },
  ],
  credibilite: "منتقى ومنقّى ومختبَر بعناية · عضوي 100% Bio",
  ctaTitle: "اطلب الآن 👇",
  ctaSub: "توصيل لكامل الولايات 🇩🇿",
  ctaButton: "اطلب الآن — ELM",
};

export const TEXT = LANG === "ar" ? TEXT_AR : TEXT_FR;
