// أسئلة اختبار "أي منتج ELM يناسبك؟"
// كل إجابة تمنح نقاطًا لمنتج معيّن، والنتيجة = المنتج الأعلى نقاطًا.

export type QuizAnswer = {
  label: string;
  // النقاط لكل منتج (slug)
  scores: Record<string, number>;
};

export type QuizQuestion = {
  id: string;
  question: string;
  answers: QuizAnswer[];
};

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "goal",
    question: "ما هو هدفك الأساسي؟",
    answers: [
      { label: "طاقة وحيوية أكثر", scores: { shilajit: 2 } },
      { label: "خفّة وراحة هضمية", scores: { "slim-tea": 2 } },
      { label: "تقوية المناعة والتوازن", scores: { shilajit: 1, "slim-tea": 1 } },
    ],
  },
  {
    id: "feeling",
    question: "بماذا تشعر أكثر هذه الأيام؟",
    answers: [
      { label: "تعب ونقص في التركيز", scores: { shilajit: 2 } },
      { label: "ثقل وانتفاخ بعد الأكل", scores: { "slim-tea": 2 } },
      { label: "أريد فقط عادة صحية يومية", scores: { shilajit: 1, "slim-tea": 1 } },
    ],
  },
  {
    id: "routine",
    question: "أي طقس يناسب يومك؟",
    answers: [
      { label: "جرعة صغيرة صباحًا بسرعة", scores: { shilajit: 2 } },
      { label: "كوب شاي دافئ ألطف به نفسي", scores: { "slim-tea": 2 } },
      { label: "لا أمانع أيًّا منهما", scores: { shilajit: 1, "slim-tea": 1 } },
    ],
  },
];
