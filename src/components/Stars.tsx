import { Star } from "lucide-react";

export default function Stars({
  rating = 5,
  size = 16,
}: {
  rating?: number;
  size?: number;
}) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`التقييم ${rating} من 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          style={{ width: size, height: size }}
          className={
            i < Math.round(rating)
              ? "fill-gold text-gold"
              : "fill-sand text-sand"
          }
        />
      ))}
    </div>
  );
}
