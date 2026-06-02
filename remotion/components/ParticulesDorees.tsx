import { useCurrentFrame, AbsoluteFill, random } from "remotion";
import { COLORS, WIDTH, HEIGHT } from "../config";

// Poussière dorée flottante en arrière-plan.
// Déterministe (random à seed fixe) → pas de scintillement au rendu.
export const ParticulesDorees: React.FC<{ count?: number }> = ({
  count = 40,
}) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill>
      {new Array(count).fill(0).map((_, i) => {
        // Valeurs stables dérivées de l'index (seed)
        const baseX = random(`x-${i}`) * WIDTH;
        const baseY = random(`y-${i}`) * HEIGHT;
        const size = 2 + random(`s-${i}`) * 5;
        const speed = 0.2 + random(`v-${i}`) * 0.6;
        const drift = random(`d-${i}`) * 40 - 20;
        const phase = random(`p-${i}`) * Math.PI * 2;

        // Mouvement ascendant lent + dérive horizontale sinusoïdale
        const y = (baseY - frame * speed * 2) % HEIGHT;
        const wrappedY = y < 0 ? y + HEIGHT : y;
        const x = baseX + Math.sin(frame * 0.02 + phase) * drift;

        // Pulsation d'opacité douce
        const opacity = 0.15 + 0.35 * (0.5 + 0.5 * Math.sin(frame * 0.05 + phase));

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: wrappedY,
              width: size,
              height: size,
              borderRadius: "50%",
              background: COLORS.goldSoft,
              boxShadow: `0 0 ${size * 2}px ${COLORS.gold}`,
              opacity,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
