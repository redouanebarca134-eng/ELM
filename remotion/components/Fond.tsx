import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { COLORS } from "../config";
import { ParticulesDorees } from "./ParticulesDorees";

// Fond commun : dégradé minéral + lueur radiale dorée pulsante + particules.
export const Fond: React.FC<{ glow?: boolean }> = ({ glow = true }) => {
  const frame = useCurrentFrame();
  const pulse = interpolate(Math.sin(frame * 0.04), [-1, 1], [0.25, 0.5]);

  return (
    <AbsoluteFill>
      {/* Dégradé de base */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(160deg, ${COLORS.bgDeep} 0%, ${COLORS.bgCharcoal} 100%)`,
        }}
      />
      {/* Lueur radiale dorée */}
      {glow && (
        <AbsoluteFill
          style={{
            background: `radial-gradient(circle at 50% 42%, rgba(201,162,75,${pulse}) 0%, transparent 55%)`,
          }}
        />
      )}
      <ParticulesDorees />
    </AbsoluteFill>
  );
};
