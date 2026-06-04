// أدوات تتبّع أحداث الإعلانات (فيسبوك + تيك توك)

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fbq?: (...args: any[]) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ttq?: { track: (...args: any[]) => void };
  }
}

type PixelEvent =
  | "ViewContent"
  | "AddToCart"
  | "InitiateCheckout"
  | "Purchase"
  | "Lead"
  | "Contact";

// أسماء أحداث تيك توك المقابلة
const TIKTOK_MAP: Record<PixelEvent, string> = {
  ViewContent: "ViewContent",
  AddToCart: "AddToCart",
  InitiateCheckout: "InitiateCheckout",
  Purchase: "CompletePayment",
  Lead: "SubmitForm",
  Contact: "Contact",
};

// إرسال حدث قياسي إلى فيسبوك وتيك توك (يعمل فقط في المتصفّح)
export function trackEvent(
  event: PixelEvent,
  data?: Record<string, unknown>,
): void {
  if (typeof window === "undefined") return;

  if (typeof window.fbq === "function") {
    window.fbq("track", event, data);
  }
  if (window.ttq && typeof window.ttq.track === "function") {
    window.ttq.track(TIKTOK_MAP[event], data);
  }
}
