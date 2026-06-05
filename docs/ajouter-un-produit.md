# Comment ajouter un nouveau produit à la gamme ELM

Tout se passe dans **un seul fichier** : `src/lib/products.ts`.

## 1. Choisir/ajouter une catégorie (optionnel)

Les catégories de la boutique sont en haut du fichier :

```ts
export type CategoryId = "energy" | "detox" | "immunity";

export const CATEGORIES = [
  { id: "energy",   label: "الطاقة والحيوية",  emoji: "⚡" },
  { id: "detox",    label: "التنحيف والتنقية", emoji: "🍃" },
  { id: "immunity", label: "المناعة والتوازن", emoji: "🛡️" },
];
```

Pour une **nouvelle catégorie**, ajoute son `id` au type `CategoryId`
puis une ligne dans `CATEGORIES`.

## 2. Créer le produit

Copie un produit existant (ex. `SLIM_TEA`) et adapte les champs :

```ts
export const ASHWAGANDHA: Product = {
  slug: "ashwagandha",          // URL : /product/ashwagandha
  name: "أشواغاندا ELM",
  shortName: "أشواغاندا",
  tagline: "...",
  description: "...",
  image: "/images/ashwagandha.png",       // mets la photo dans public/images
  gallery: ["/images/ashwagandha.png"],
  price: 3200,
  oldPrice: 4000,                          // optionnel (prix barré)
  rating: 4.8,
  reviewsCount: 0,
  stockNote: "متوفّر — يُشحن خلال 48 ساعة",
  ingredients: "...",
  usage: ["...", "...", "..."],
  warning: "...",                          // optionnel
  accent: "gold",                          // "gold" ou "rose"
  category: "immunity",                    // une des CategoryId
  packs: [
    { id: "single", label: "قطعة واحدة", description: "...", price: 3200, oldPrice: 4000 },
    { id: "double", label: "قطعتان",     description: "...", price: 5800, badge: "الأكثر مبيعًا" },
  ],
  landing: {                               // optionnel : page produit cinématique
    heroLine: "...",
    heroSub: "...",
    storyTitle: "...",
    story: "...",
    highlights: [
      { icon: "⚡", title: "...", text: "..." },
      // ...
    ],
    problem: "...",
    solution: "...",
  },
};
```

## 3. L'enregistrer dans la liste

Ajoute-le au tableau `PRODUCTS` :

```ts
export const PRODUCTS: Product[] = [SHILAJIT, SLIM_TEA, ASHWAGANDHA];
```

## 4. Ajouter la photo

Téléverse `ashwagandha.png` dans **`public/images/`** (via GitHub :
dossier `public/images` → Add file → Upload files).

C'est tout. Le produit apparaît automatiquement :
- dans la **boutique** (avec le filtre par catégorie),
- sur sa **page produit** `/product/ashwagandha`,
- dans les **suggestions du panier** et les **produits liés**.
