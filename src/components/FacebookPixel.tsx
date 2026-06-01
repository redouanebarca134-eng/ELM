"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { PIXELS } from "@/lib/constants";

// مكوّن بكسل فيسبوك (Meta) — يحمّل البكسل ويسجّل مشاهدة الصفحة
// عند كل تنقّل بين الصفحات.
export default function FacebookPixel() {
  const pathname = usePathname();

  // تسجيل PageView عند تغيّر المسار (تنقّل داخل الموقع)
  useEffect(() => {
    if (!PIXELS.facebook) return;
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "PageView");
    }
  }, [pathname]);

  if (!PIXELS.facebook) return null;

  return (
    <>
      <Script id="fb-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${PIXELS.facebook}');
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          alt=""
          src={`https://www.facebook.com/tr?id=${PIXELS.facebook}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  );
}
