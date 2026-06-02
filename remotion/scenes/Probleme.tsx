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

// SCÈNE 2 — PROBLÈME / AGITATION (90–180) : mots-clés en cascade.
export const Probleme: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const f = fontFamilies(LANG);

  return (
    <AbsoluteFill>
      <Fond glow={false} />
      <SafeZone>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {TEXT.problemeWords.map((word, i) => {
            const delay = i * 14;
            const inSpring = spring({
              frame: frame - delay,
              fps,
              config: { damping: 18 },
            });
            const x = interpolate(inSpring, [0, 1], [-80, 0]);
            return (
              <h2
                key={i}
                style={{
                  fontFamily: f.heading,
                  fontWeight: 700,
                  fontSize: 70,
                  color: COLORS.text,
                  opacity: inSpring,
                  transform: `translateX(${x}px)`,
                }}
              >
                {word}
              </h2>
            );
          })}

          {/* Ligne de conclusion */}
          <p
            style={{
              fontFamily: f.body,
              fontWeight: 700,
              fontSize: 46,
              marginTop: 30,
              color: COLORS.gold,
              opacity: spring({ frame: frame - 55, fps, config: { damping: 16 } }),
            }}
          >
            {TEXT.problemeLine}
          </p>
        </div>
      </SafeZone>
    </AbsoluteFill>
  );
};
