# صور الموقع (public/images)

ضع ملفات الصور الثلاثة هنا بهذه الأسماء بالضبط حتى تظهر في الموقع:

| الملف | الاستخدام | المقاس المقترح |
| --- | --- | --- |
| `hero.png` | خلفية قسم البطل + الصورة الثالثة في معرض المنتج | 16:9 (مثال 1376×768) |
| `product.png` | صورة المنتج الرئيسية (بطاقات، سلة، عرض، معرض) | 1:1 (مثال 1024×1024) |
| `resin.png` | قسم «ما هو الشيلاجيت» + الصورة الثانية في المعرض | 4:3 (مثال 1200×896) |

> الصور الثلاثة وُلِّدت بالذكاء الاصطناعي (nano_banana_pro). نزّلها من واجهة المحادثة وضعها هنا.

## الوصف النصي المستخدم في التوليد (للاستعادة لاحقًا)

**hero.png**
> Cinematic dark mineral landscape, dramatic rocky mountain cliffs at dusk, rich black shilajit resin glistening on dark stone in the foreground, warm golden rim light, deep forest-green and gold tones, premium wellness apothecary aesthetic, moody atmospheric fog, ultra detailed, no text

**product.png**
> Premium product photography of a small elegant matte black glass jar of shilajit resin with a minimal luxury label reading 'ELM', placed on smooth natural stone, soft cream background, warm apothecary lighting, gold accents, shallow depth of field, clean minimal high-end wellness branding

**resin.png**
> Extreme macro close-up of glossy black shilajit resin stretching and dripping, rich tar-like texture, golden warm light catching the surface, dark mineral stone, premium natural supplement, deep forest green and gold tones, ultra detailed, no text

## ملاحظة تقنية

المنتجات الأخرى (عسل بالشيلاجيت، قطرات الفولفيك) وصورة المختبر في صفحة «عن ELM»
لا تزال تستخدم صور Unsplash مؤقتة. استبدلها عند توفّر صور حقيقية في
`src/lib/products.ts` و `src/app/about/page.tsx`.
