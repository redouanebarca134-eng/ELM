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
  warning?: string;
};

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
};

// كل المنتجات في المتجر
export const PRODUCTS: Product[] = [SHILAJIT, SLIM_TEA];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}
