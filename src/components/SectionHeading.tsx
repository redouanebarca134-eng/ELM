import Reveal from "./Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  light = false,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  light?: boolean;
  align?: "center" | "start";
}) {
  return (
    <Reveal
      className={
        align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"
      }
    >
      {eyebrow && (
        <span className="mb-2 inline-block font-heading text-sm font-bold uppercase tracking-wide text-gold">
          {eyebrow}
        </span>
      )}
      <h2
        className={`font-heading text-3xl font-extrabold leading-tight sm:text-4xl ${
          light ? "text-cream" : "text-forest"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-base leading-relaxed sm:text-lg ${
            light ? "text-cream/80" : "text-ink/70"
          }`}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
