import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";
import { Fond } from "../components/Fond";
import { SafeZone } from "../components/SafeZone";
import { COLORS, TEXT, LANG } from "../config";
import { fontFamilies } from "../fonts";

// SCÈNES 4a/4b/4c — BÉNÉFICES (300–480) : carte icône + texte en stagger.
export const Benefice: React.FC<{ index: number }> = ({ index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const f = fontFamilies(LANG);
  const benefice = TEXT.benefices[index];

  // Carte qui entre en spring
  const cardIn = spring({ frame, fps, config: { damping: 15 } });
  const cardScale = interpolate(cardIn, [0, 1], [0.8, 1]);

  // Icône qui « pop »
  const iconIn = spring({ frame: frame - 8, fps, config: { damping: 10 } });

  return (
    <AbsoluteFill>
      <Fond />
      <SafeZone>
        <div
          style={{
            transform: `scale(${cardScale})`,
            opacity: cardIn,
            background: "rgba(255,255,255,0.05)",
            border: `2px solid ${COLORS.gold}`,
            borderRadius: 32,
            padding: "60px 50px",
            width: "100%",
            maxWidth: 760,
            boxShadow: `0 0 50px rgba(201,162,75,0.25)`,
            backdropFilter: "blur(4px)",
          }}
        >
          {/* Indicateur de progression (1/3, 2/3, 3/3) */}
          <div
            style={{
              fontFamily: f.body,
              fontSize: 30,
              color: COLORS.gold,
              marginBottom: 24,
              letterSpacing: 4,
            }}
          >
            {index + 1} / 3
          </div>

          <div
            style={{
              fontSize: 130,
              transform: `scale(${iconIn})`,
              lineHeight: 1,
            }}
          >
            {benefice.icon}
          </div>

          <h2
            style={{
              fontFamily: f.heading,
              fontWeight: 700,
              fontSize: 60,
              lineHeight: 1.2,
              color: COLORS.text,
              marginTop: 36,
            }}
          >
            {benefice.text}
          </h2>
        </div>
      </SafeZone>
    </AbsoluteFill>
  );
};
