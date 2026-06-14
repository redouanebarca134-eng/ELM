export type Pack = {
  id: string;
  label: string;
  description: string;
  price: number; // السعر الحالي (دج)
  oldPrice?: number; // السعر قبل التخفيض
  badge?: string; // شارة مثل "الأكثر مبيعًا"
};

// محتوى صفحة الهبوط السينمائية لكل منتج
// بلوك عاطفي بصورة + نص (يثير الرغبة في الشراء)
export type FeelingBlock = {
  image: string; // مسار الصورة (lifestyle/توضيحية)
  eyebrow: string; // كلمة فوق العنوان
  title: string; // عنوان عاطفي
  text: string; // نص يلامس المشاعر
  banner?: boolean; // الصورة تحتوي نصّها — تُعرض كاملة بعرض كامل بلا نص جانبي
  note?: string; // ملاحظة صغيرة تظهر تحت الصورة (مثل: صور توضيحية)
};

export type Landing = {
  heroLine: string; // جملة البطل الكبيرة
  heroSub: string; // سطر تحت العنوان
  storyTitle: string; // عنوان قسم القصة
  story: string; // فقرة القصة
  highlights: { icon: string; title: string; text: string }[]; // مزايا سريعة
  problem: string; // المشكلة التي يحلّها
  solution: string; // الحل الذي يقدّمه المنتج
  feelings?: FeelingBlock[]; // بلوكات عاطفية بصورة + نص
  reviewImages?: string[]; // لقطات شاشة لآراء العميلات (إثبات اجتماعي)
};

export type Product = {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  image: string;
  gallery: string[];
  price: number;
  oldPrice?: number;
  rating: number;
  reviewsCount: number;
  stockNote: string;
  packs: Pack[];
  ingredients: string;
  usage: string[];
  warning?: string;
  accent?: "gold" | "rose"; // لون التمييز للصفحة
  category: CategoryId; // فئة المنتج
  landing?: Landing;
};

// فئات المتجر — أضف فئة جديدة هنا عند توسيع الجمعة
export type CategoryId = "energy" | "detox" | "immunity" | "beauty";

export const CATEGORIES: { id: CategoryId; label: string; emoji: string }[] = [
  { id: "energy", label: "الطاقة والحيوية", emoji: "⚡" },
  { id: "detox", label: "التنحيف والتنقية", emoji: "🍃" },
  { id: "beauty", label: "الجمال والعناية", emoji: "🌸" },
  { id: "immunity", label: "المناعة والتوازن", emoji: "🛡️" },
];

// المنتج البطل: الشيلاجيت النقي
export const SHILAJIT: Product = {
  slug: "shilajit",
  name: "الشيلاجيت النقي ELM",
  shortName: "الشيلاجيت النقي",
  tagline:
    "راتنج طبيعي 100% غني بحمض الفولفيك والمعادن — للطاقة والأداء والتوازن",
  description:
    "الشيلاجيت النقي من ELM راتنج طبيعي مختار بعناية لنقائه وجودته. غني بحمض الفولفيك والمعادن، يرافق الأشخاص النشيطين الباحثين عن الطاقة والأداء والتوازن في حياتهم اليومية.",
  image: "/images/shilajit.png",
  gallery: ["/images/shilajit.png"],
  price: 4900,
  oldPrice: 5800,
  rating: 4.9,
  reviewsCount: 214,
  stockNote: "متوفّر — يُشحن خلال 48 ساعة",
  ingredients:
    "شيلاجيت نقي 100% (راتنج جبلي مُنقّى) — غني بحمض الفولفيك وأكثر من 80 معدنًا وعنصرًا نادرًا. بدون أي إضافات صناعية. العبوة: 100 غرام.",
  usage: [
    "خذ كمية بحجم حبة الأرز",
    "أذِبها في كوب ماء دافئ أو حليب",
    "تناولها مرة واحدة يوميًا، صباحًا",
  ],
  warning:
    "منتج طبيعي. إذا كنتِ حاملًا أو مرضعة أو تتناول أدوية، استشر الطبيب قبل الاستعمال.",
  packs: [
    {
      id: "single",
      label: "قطعة واحدة",
      description: "علبة 100 غرام",
      price: 4900,
      oldPrice: 5800,
    },
    {
      id: "double",
      label: "قطعتان",
      description: "وفّر أكثر — علبتان",
      price: 8000,
      oldPrice: 11600,
      badge: "الأكثر مبيعًا",
    },
  ],
  accent: "gold",
  category: "energy",
  landing: {
    heroLine: "قوّة الجبال في يديك",
    heroSub:
      "صمغ جبلي أسود نادر، غني بحمض الفولفيك وأكثر من 80 معدنًا — للطاقة والحيوية والتوازن.",
    storyTitle: "من قلب الصخور إلى عافيتك",
    story:
      "يتشكّل الشيلاجيت عبر مئات السنين في صخور الجبال العالية. نختاره من مصدر موثوق، ننقّيه بعناية ونتأكّد من جودته قبل أن يصل إليك — أصلي، نقي، وقابل للتتبّع.",
    highlights: [
      { icon: "⚡", title: "طاقة طبيعية", text: "دعم للحيوية طوال اليوم" },
      { icon: "⛰️", title: "+80 معدنًا", text: "غني بحمض الفولفيك والعناصر النادرة" },
      { icon: "🛡️", title: "مناعة وتعافٍ", text: "دعم لقوّة الجسم وتوازنه" },
      { icon: "🌿", title: "عضوي 100% Bio", text: "مُختبَر ومعتمد" },
    ],
    problem:
      "التعب المستمر، ضعف التركيز، ونقص الطاقة — والأسوأ: سوق مليء بالشيلاجيت المغشوش والمقلّد.",
    solution:
      "شيلاجيت ELM أصلي ونقي، مُختبَر ومعتمد عضويًا. القوة الحقيقية للطبيعة، بلا غش ولا وعود فارغة.",
    feelings: [
      {
        image: "/images/shilajit-energy.png",
        eyebrow: "استعد طاقتك",
        title: "تخيّل يومك بطاقة لا تنطفئ",
        text: "تنهض في الصباح بحيوية، تركيز صافٍ في العمل، وقدرة على التحمّل لا تخذلك. هذا ما يبحث عنه آلاف عملائنا — وهذا ما يقدّمه الشيلاجيت النقي.",
      },
      {
        image: "/images/shilajit-nature.png",
        eyebrow: "من قلب الجبال",
        title: "قوة الطبيعة في أنقى صورها",
        text: "راتنج نادر يتشكّل في صخور الجبال عبر مئات السنين، غني بأكثر من 80 معدنًا وحمض الفولفيك. ما تضعه في جسمك يستحق أن يكون الأنقى.",
      },
      {
        image: "/images/shilajit-scene.png",
        eyebrow: "ثقة بلا قلق",
        title: "لن تشتري المغشوش بعد اليوم",
        text: "تعبتَ من المنتجات المقلّدة التي لا تعطي نتيجة؟ شيلاجيت ELM عضوي معتمد ومُختبَر — تمسكه بيدك، تتفقّده، ثم تدفع. راحة بال كاملة.",
      },
    ],
  },
};

// المنتج الثاني: Slim Tea — شاي الأعشاب الطبيعي
export const SLIM_TEA: Product = {
  slug: "slim-tea",
  name: "شاي التنحيف الطبيعي Slim Tea",
  shortName: "Slim Tea",
  tagline: "شاي أعشاب طبيعي لدعم فقدان الوزن والمساعدة على حرق الدهون",
  description:
    "Slim Tea مشروب من أعشاب مختارة بعناية، مصمّم لدعم عملية الأيض وتحسين الراحة الهضمية، يندمج بسهولة ضمن نمط حياة صحي ومتوازن.",
  image: "/images/slim-tea.png",
  gallery: ["/images/slim-tea.png"],
  price: 1790,
  oldPrice: 3500,
  rating: 4.8,
  reviewsCount: 168,
  stockNote: "الكمية محدودة — يُشحن خلال 48 ساعة",
  ingredients:
    "شاي أخضر، ريحان، عرق السوس، مورينغا، مرامية، بردقوش، ورد جوري، بابونج. أعشاب طبيعية 100%. العبوة: 100 غرام.",
  usage: [
    "ضع ملعقة صغيرة في كوب ماء ساخن",
    "اتركها تنقع من 3 إلى 5 دقائق",
    "تناولها مرة إلى مرتين يوميًا قبل أو بعد الوجبات",
  ],
  warning:
    "لا يُستخدم كبديل عن نظام غذائي صحي ومتوازن. في حال وجود مرض مزمن أو تناول أدوية، استشر الطبيب قبل الاستعمال.",
  packs: [
    {
      id: "start",
      label: "عرض البداية",
      description: "علبة واحدة + طريقة استعمال واضحة + متابعة عبر واتساب",
      price: 1790,
      oldPrice: 3500,
    },
    {
      id: "change",
      label: "عرض التغيير",
      description:
        "علبتان + برنامج Detox لمدة 7 أيام + متابعة ونصائح عبر واتساب + دليل صغير للأكل وتنظيم الوجبات",
      price: 3490,
      badge: "الأكثر طلباً",
    },
    {
      id: "result",
      label: "عرض النتيجة القوية",
      description:
        "3 علب + متابعة VIP عبر واتساب + متابعة يومية مع مختصين + 7 أسرار منزلية + برنامج احترافي (PDF) + توصيل مجاني للمكتب",
      price: 4990,
      badge: "التحدي الكامل",
    },
  ],
  accent: "rose",
  category: "detox",
  landing: {
    heroLine: "رجّعي تلبسي اللي تحبّي — بثقة وخفّة من جديد 🌿",
    heroSub:
      "مزيج من أعشاب مختارة بعناية لدعم الأيض والراحة الهضمية ضمن نمط حياة متوازن.",
    storyTitle: "رشفة من الطبيعة",
    story:
      "Slim Tea مزيج متناغم من الشاي الأخضر والريحان والمورينغا وأعشاب عطرية مختارة. طقس يومي لطيف يرافقك نحو عادات أفضل، براحة وطعم لذيذ.",
    highlights: [
      { icon: "🍃", title: "أعشاب طبيعية", text: "خلطة نقية بدون إضافات" },
      { icon: "💧", title: "راحة هضمية", text: "يدعم الهضم والإحساس بالخفّة" },
      { icon: "🔥", title: "دعم الأيض", text: "ضمن نظام غذائي متوازن" },
      { icon: "🤝", title: "متابعة عبر واتساب", text: "نرافقك خطوة بخطوة" },
    ],
    problem:
      "الانتفاخ، ثقل الهضم، وصعوبة الالتزام بعادات صحية وسط ضغط اليوم.",
    solution:
      "طقس Slim Tea اليومي اللطيف يساعدك على الاستمرار — مع متابعة ونصائح حقيقية، لا وعود سحرية.",
    feelings: [
      {
        image: "/images/slim-tea-hero-scene.jpg",
        eyebrow: "سرّكِ الطبيعي",
        title: "سرّ رشاقتكِ الطبيعية",
        text: "ELM Slim Tea — طقس يومي لطيف من أعشاب طبيعية، يرافقكِ نحو الرشاقة والخفّة بثقة.",
        banner: true,
      },
      {
        image: "/images/slim-tea-obesity.jpg",
        eyebrow: "لماذا الآن؟",
        title: "الوزن الزائد ليس مجرد مظهر",
        text: "السمنة خطر صحي صامت يهدد القلب، المفاصل، والهضم. كل يوم تأجيل يزيد المعاناة — والبداية اليوم أسهل من الغد.",
        banner: true,
      },
      {
        image: "/images/slim-tea-ingredients.jpg",
        eyebrow: "تركيبة مدروسة",
        title: "أعشاب طبيعية 100% بفعالية حقيقية",
        text: "خلطة متوازنة تحرق الدهون، تحسّن الهضم، تقلّل الشهية وتهدّئ الجسم — بدون أي مواد كيميائية.",
        banner: true,
      },
      {
        image: "/images/slim-tea-before-after.jpg",
        eyebrow: "نتائج حقيقية",
        title: "تحوّل تشعرين به وتراه المرآة",
        text: "آلاف النساء استعدن رشاقتهنّ وثقتهنّ مع Slim Tea. القوام الذي تحلمين به أقرب مما تظنّين.",
        banner: true,
        note: "صور توضيحية — النتائج تختلف من شخص لآخر حسب الالتزام ونمط الحياة.",
      },
      {
        image: "/images/slim-tea-transformation.jpg",
        eyebrow: "خطوة بخطوة",
        title: "من اليوم الأول إلى 4 أسابيع",
        text: "نتيجة تدريجية وطبيعية تدوم. استعيدي ثقتكِ بنفسكِ بشكل طبيعي مع Slim Tea.",
        banner: true,
        note: "صور توضيحية — النتائج تختلف من شخص لآخر حسب الالتزام ونمط الحياة.",
      },
    ],
    reviewImages: [
      "/images/reviews/review-01.jpg",
      "/images/reviews/review-02.jpg",
      "/images/reviews/review-03.jpg",
      "/images/reviews/review-04.jpg",
      "/images/reviews/review-05.jpg",
      "/images/reviews/review-06.jpg",
      "/images/reviews/review-07.jpg",
      "/images/reviews/review-08.jpg",
      "/images/reviews/review-09.jpg",
    ],
  },
};

// المنتج الثالث: Golden Shape — تركيبة طبيعية لدعم الوزن
export const GOLDEN_SHAPE: Product = {
  slug: "golden-shape",
  name: "Golden Shape — تركيبة طبيعية",
  shortName: "Golden Shape",
  tagline: "تركيبة أنثوية طبيعية تساعد على دعم الشهية وزيادة الوزن الطبيعي",
  description:
    "Golden Shape مزيج من مكوّنات طبيعية مختارة بعناية، مصمّم لدعم الشهية ومرافقة من يبحثون عن زيادة وزن طبيعية ضمن نمط حياة متوازن. «الانسجام يبدأ من الداخل».",
  image: "/images/golden-shape.png",
  gallery: ["/images/golden-shape.png"],
  price: 2500,
  oldPrice: 3500,
  rating: 4.8,
  reviewsCount: 0,
  stockNote: "متوفّر — يُشحن خلال 48 ساعة",
  ingredients: "مكوّنات نباتية طبيعية 100%. العبوة: 150 غرام.",
  usage: [
    "خذ ملعقة صغيرة من المسحوق",
    "أذِبها في كوب حليب دافئ أو عصير",
    "تناولها مرة إلى مرتين يوميًا بعد الوجبات",
  ],
  warning:
    "مكمّل غذائي ضمن نمط حياة متوازن. إذا كنتِ حاملًا أو مرضعة أو تتناول أدوية، استشر الطبيب قبل الاستعمال.",
  packs: [
    {
      id: "single",
      label: "علبة واحدة",
      description: "150 غرام + متابعة عبر واتساب",
      price: 2500,
      oldPrice: 3500,
    },
    {
      id: "double",
      label: "علبتان",
      description: "قيمة أفضل + متابعة ونصائح",
      price: 4600,
      oldPrice: 7000,
      badge: "الأكثر طلباً",
    },
    {
      id: "triple",
      label: "3 علب",
      description: "النتيجة الكاملة + توصيل مجاني للمكتب",
      price: 6500,
      oldPrice: 10500,
      badge: "أكبر توفير",
    },
  ],
  accent: "rose",
  category: "beauty",
  landing: {
    heroLine: "حيّري عديانك 🌹",
    heroSub:
      "تركيبة أنثوية نباتية 100% تدعم الشهية وامتلاء القوام بأنوثة وثقة — بلا هرمونات، ومع متابعة حقيقية عبر واتساب.",
    storyTitle: "عناية لطيفة بجمالكِ الطبيعي",
    story:
      "Golden Shape مزيج متناغم من مكوّنات نباتية مختارة بعناية. طقس يومي لطيف يرافقكِ نحو توازن أنثوي وثقة أكبر بنفسكِ — بلا وعود سحرية، بل عادة طبيعية ضمن نمط حياة صحي.",
    highlights: [
      { icon: "🌸", title: "تركيبة أنثوية", text: "مصمّمة لاحتياجاتكِ" },
      { icon: "🍯", title: "دعم الشهية", text: "يساعد على الإقبال على الطعام" },
      { icon: "🌿", title: "نباتي 100%", text: "بلا هرمونات ولا إضافات" },
      { icon: "🤝", title: "متابعة عبر واتساب", text: "نرافقكِ خطوة بخطوة" },
    ],
    problem:
      "ضعف الشهية ونحافة تُفقدكِ ثقتكِ، وقوام تتمنّينه أكثر أنوثة وامتلاءً — وسط سوق مليء بمنتجات مشكوك فيها وهرمونات خطيرة.",
    solution:
      "Golden Shape تركيبة نباتية 100% تدعم شهيتكِ وامتلاء قوامكِ بطريقة طبيعية وآمنة — بلا هرمونات ولا وعود فارغة، مع مرافقة حقيقية خطوة بخطوة.",
    feelings: [
      {
        image: "/images/golden-shape-hero.jpg",
        eyebrow: "مستعدة للتغيير؟",
        title: "قوامكِ الذي حلمتِ به يبدأ اليوم",
        text: "تركيبة من مكوّنات نباتية مختارة بعناية تدعم الشهية وامتلاء القوام — لتكوني الأجمل بثقة وأنوثة.",
        banner: true,
      },
      {
        image: "/images/golden-shape-dream.jpg",
        eyebrow: "حلمكِ يقترب",
        title: "المنحنيات الجذابة التي طالما حلمتِ بها",
        text: "قوام أنثوي ممتلئ ومتناسق يمنحكِ الثقة في كل إطلالة. Golden Shape ترافقكِ نحو الشكل الذي يريحكِ.",
        banner: true,
      },
      {
        image: "/images/golden-shape-benefits.jpg",
        eyebrow: "تحوّل أنثوي",
        title: "اكتسبي منحنياتكِ الحقيقية بشكل طبيعي",
        text: "منحنيات محدّدة، صدر ممتلئ، وأنوثة وثقة مطلقة — بمكوّنات نباتية 100% وبشكل طبيعي بلا هرمونات.",
        banner: true,
      },
      {
        image: "/images/golden-shape-result.jpg",
        eyebrow: "أنوثة ملفتة",
        title: "أنوثة واضحة وملفتة — بثقة جديدة",
        text: "امتلاء طبيعي يبرز أنوثتكِ ويعيد لكِ ثقتكِ بنفسكِ، بمكوّنات نباتية 100% وبلا هرمونات.",
        banner: true,
        note: "صور توضيحية — النتائج تختلف من شخص لآخر حسب الالتزام ونمط الحياة والتغذية.",
      },
      {
        image: "/images/golden-shape-social.jpg",
        eyebrow: "الكل يلاحظ",
        title: "اليوم كل الأنظار عليكِ",
        text: "النتيجة التي تُلاحَظ وتُحسد عليها. سرّكِ الطبيعي للأنوثة والثقة هو Golden Shape.",
        banner: true,
        note: "صور توضيحية — النتائج تختلف من شخص لآخر حسب الالتزام ونمط الحياة والتغذية.",
      },
      {
        image: "/images/golden-shape-confidence.jpg",
        eyebrow: "ثقة بلا حدود",
        title: "اكتشفي امتلاء قوامكِ المثالي",
        text: "حين تشعرين بالراحة مع جسمكِ، تشعّ ثقتكِ. ابدئي رحلتكِ نحو القوام الذي يريحكِ اليوم.",
        banner: true,
      },
    ],
  },
};

// كل المنتجات في المتجر
export const PRODUCTS: Product[] = [SHILAJIT, SLIM_TEA, GOLDEN_SHAPE];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

// الفئات التي تحتوي فعليًا على منتجات (لإخفاء الفارغة)
export function activeCategories() {
  return CATEGORIES.filter((c) => PRODUCTS.some((p) => p.category === c.id));
}
