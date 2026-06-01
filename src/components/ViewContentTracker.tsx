"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/pixel";

// يسجّل حدث ViewContent لفيسبوك عند فتح صفحة المنتج
export default function ViewContentTracker({
  slug,
  name,
  price,
}: {
  slug: string;
  name: string;
  price: number;
}) {
  useEffect(() => {
    trackEvent("ViewContent", {
      content_name: name,
      content_ids: [slug],
      content_type: "product",
      value: price,
      currency: "DZD",
    });
  }, [slug, name, price]);

  return null;
}
