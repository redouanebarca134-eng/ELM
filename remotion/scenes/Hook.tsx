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

// SCÈNE 1 — HOOK (0–90) : goutte de résine dorée qui tombe + question choc.
export const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const f = fontFamilies(LANG);

  // Entrée spring du titre
  const titleIn = spring({ frame, fps, config: { damping: 14 } });
  const titleY = interpolate(titleIn, [0, 1], [60, 0]);

  // Sous-titre décalé
  const subIn = spring({ frame: frame - 20, fps, config: { damping: 16 } });

  // Goutte dorée qui tombe (frames 0–45) puis éclat
  const dropY = interpolate(frame, [0, 45], [-200, 0], {
    extrapolateRight: "clamp",
  });
  const splash = interpolate(frame, [45, 60, 90], [0, 1, 0.6], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      <Fond />

      {/* La goutte de résine dorée */}
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "flex-start" }}>
        <div
          style={{
            marginTop: 360 + dropY,
            width: 46,
            height: 60,
            borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
            background: `radial-gradient(circle at 40% 30%, ${COLORS.goldSoft}, ${COLORS.gold})`,
            boxShadow: `0 0 40px ${COLORS.gold}`,
            transform: `scaleY(${1 - splash * 0.3})`,
          }}
        />
        {/* Éclat à l'impact */}
        <div
          style={{
            marginTop: 8,
            width: 200 * splash,
            height: 200 * splash,
            borderRadius: "50%",
            background: `radial-gradient(circle, rgba(201,162,75,${0.5 * splash}) 0%, transparent 70%)`,
          }}
        />
      </AbsoluteFill>

      <SafeZone>
        <div style={{ marginTop: 220 }}>
          <h1
            style={{
              fontFamily: f.heading,
              fontWeight: 700,
              fontSize: 76,
              lineHeight: 1.15,
              color: COLORS.text,
              transform: `translateY(${titleY}px)`,
              opacity: titleIn,
              textShadow: "0 4px 30px rgba(0,0,0,0.6)",
            }}
          >
            {TEXT.hookTitle}
          </h1>
          <p
            style={{
              fontFamily: f.body,
              fontWeight: 600,
              fontSize: 44,
              marginTop: 28,
              color: COLORS.gold,
              opacity: subIn,
            }}
          >
            {TEXT.hookSub}
          </p>
        </div>
      </SafeZone>
    </AbsoluteFill>
  );
};
