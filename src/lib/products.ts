export type Pack = {
  id: string;
  label: string;
  description: string;
  price: number; // السعر الحالي (دج)
  oldPrice?: number; // السعر قبل التخفيض
  badge?: string; // شارة مثل "الأكثر مبيعًا"
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
};

// المنتج البطل: شيلاجيت ELM
export const SHILAJIT: Product = {
  slug: "shilajit",
  name: "شيلاجيت ELM الأصلي",
  shortName: "شيلاجيت ELM",
  tagline: "مكمّل طبيعي 100% غني بأكثر من 80 معدنًا وحمض الفولفيك",
  description:
    "مادة راتنجية طبيعية نادرة تتشكّل في صخور الجبال عبر مئات السنين. تحتوي على حمض الفولفيك وأكثر من 80 معدنًا وعنصرًا نادرًا. في ELM، نقدّمه لك نقيًا، مُنقّى ومُختبَرًا في مختبرنا.",
  // الصور المولّدة محليًا (ضعها في public/images/)
  image: "/images/product.png",
  gallery: ["/images/product.png", "/images/resin.png", "/images/hero.png"],
  price: 2900,
  oldPrice: 3900,
  rating: 4.9,
  reviewsCount: 327,
  stockNote: "متوفّر — يُشحن خلال 48 ساعة",
  ingredients:
    "شيلاجيت نقي 100% (راتنج جبلي مُنقّى)، غني بحمض الفولفيك وأكثر من 80 معدنًا وعنصرًا نادرًا. بدون أي إضافات صناعية أو مواد حافظة.",
  usage: [
    "خذ كمية بحجم حبة الأرز",
    "أذِبها في كوب ماء دافئ أو حليب",
    "تناولها مرة واحدة يوميًا، صباحًا",
  ],
  packs: [
    {
      id: "single",
      label: "قطعة واحدة",
      description: "تكفي لمدة شهر تقريبًا",
      price: 2900,
      oldPrice: 3900,
    },
    {
      id: "month",
      label: "باقة شهر",
      description: "قطعتان — قيمة أفضل",
      price: 5200,
      oldPrice: 7800,
      badge: "الأكثر مبيعًا",
    },
    {
      id: "quarter",
      label: "باقة 3 أشهر",
      description: "أربع قطع — أكبر توفير",
      price: 9900,
      oldPrice: 15600,
      badge: "توفير أكبر",
    },
  ],
};

// منتجات إضافية للمتجر
export const PRODUCTS: Product[] = [
  SHILAJIT,
  {
    slug: "honey-shilajit",
    name: "عسل ELM بالشيلاجيت",
    shortName: "عسل بالشيلاجيت",
    tagline: "عسل جبلي طبيعي ممزوج براتنج الشيلاجيت النقي",
    description:
      "مزيج فريد من العسل الجبلي الطبيعي وراتنج الشيلاجيت النقي. طاقة وحيوية بطعم لذيذ، سهل الاستعمال يوميًا.",
    image:
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=900&q=80",
    ],
    price: 3400,
    oldPrice: 4200,
    rating: 4.8,
    reviewsCount: 112,
    stockNote: "متوفّر — يُشحن خلال 48 ساعة",
    ingredients: "عسل جبلي طبيعي 100%، راتنج شيلاجيت نقي. بدون سكر مضاف.",
    usage: [
      "خذ ملعقة صغيرة",
      "تناولها مباشرة أو أذِبها في مشروب دافئ",
      "مرة واحدة يوميًا، صباحًا",
    ],
    packs: [
      {
        id: "single",
        label: "علبة واحدة",
        description: "250 غرام",
        price: 3400,
        oldPrice: 4200,
      },
      {
        id: "double",
        label: "علبتان",
        description: "قيمة أفضل",
        price: 6200,
        oldPrice: 8400,
        badge: "الأكثر مبيعًا",
      },
    ],
  },
  {
    slug: "fulvic-drops",
    name: "قطرات الفولفيك ELM",
    shortName: "قطرات الفولفيك",
    tagline: "حمض الفولفيك السائل لامتصاص أسرع",
    description:
      "قطرات مركّزة من حمض الفولفيك المستخلص من الشيلاجيت، لدعم الطاقة والامتصاص الأمثل للمعادن.",
    image:
      "https://images.unsplash.com/photo-1611078489935-0cb964de46d6?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1611078489935-0cb964de46d6?auto=format&fit=crop&w=900&q=80",
    ],
    price: 2600,
    oldPrice: 3200,
    rating: 4.7,
    reviewsCount: 64,
    stockNote: "متوفّر — يُشحن خلال 48 ساعة",
    ingredients: "مستخلص حمض الفولفيك من الشيلاجيت، ماء نقي. بدون إضافات.",
    usage: [
      "أضِف 10 قطرات إلى كوب ماء",
      "اشربها على معدة فارغة",
      "مرة واحدة يوميًا",
    ],
    packs: [
      {
        id: "single",
        label: "زجاجة واحدة",
        description: "30 مل",
        price: 2600,
        oldPrice: 3200,
      },
    ],
  },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}
