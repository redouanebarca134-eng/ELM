// أدوات تتبّع أحداث الإعلانات (فيسبوك بكسل)

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fbq?: (...args: any[]) => void;
  }
}

type PixelEvent =
  | "ViewContent"
  | "AddToCart"
  | "InitiateCheckout"
  | "Purchase"
  | "Lead"
  | "Contact";

// إرسال حدث قياسي إلى فيسبوك بكسل (يعمل فقط في المتصفّح)
export function trackEvent(
  event: PixelEvent,
  data?: Record<string, unknown>,
): void {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", event, data);
  }
}
