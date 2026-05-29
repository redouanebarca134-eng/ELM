// دمج أصناف Tailwind بطريقة بسيطة
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

// تنسيق السعر بالأرقام الغربية مع رمز الدينار الجزائري
export function formatPrice(value: number): string {
  return `${value.toLocaleString("en-US")} دج`;
}
