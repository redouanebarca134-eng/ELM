// فاصل على شكل موجة بين الأقسام — انتقال ناعم بين الخلفيات.
// color = لون الموجة (لون القسم التالي)، flip لقلبها.
export default function WaveDivider({
  color = "#FAF6EC",
  flip = false,
  className = "",
}: {
  color?: string;
  flip?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`pointer-events-none -mb-px leading-[0] ${className}`}
      style={{ transform: flip ? "rotate(180deg)" : undefined }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="h-[60px] w-full sm:h-[80px]"
      >
        <path
          fill={color}
          d="M0,32 C240,80 480,0 720,24 C960,48 1200,80 1440,40 L1440,80 L0,80 Z"
        />
      </svg>
    </div>
  );
}
