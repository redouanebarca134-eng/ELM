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

// SCÈNE 5 — CRÉDIBILITÉ (480–540) : sceau doré animé + phrase de confiance.
export const Credibilite: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const f = fontFamilies(LANG);

  const sealIn = spring({ frame, fps, config: { damping: 12 } });
  const rotate = interpolate(sealIn, [0, 1], [-30, 0]);
  const textIn = spring({ frame: frame - 18, fps, config: { damping: 16 } });

  return (
    <AbsoluteFill>
      <Fond />
      <SafeZone>
        {/* Sceau / badge doré */}
        <div
          style={{
            width: 220,
            height: 220,
            borderRadius: "50%",
            border: `4px solid ${COLORS.gold}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `scale(${sealIn}) rotate(${rotate}deg)`,
            background: `radial-gradient(circle, rgba(201,162,75,0.2), transparent 70%)`,
            boxShadow: `0 0 60px rgba(201,162,75,0.4)`,
          }}
        >
          <span style={{ fontSize: 110 }}>✅</span>
        </div>

        <p
          style={{
            fontFamily: f.body,
            fontWeight: 700,
            fontSize: 48,
            lineHeight: 1.3,
            color: COLORS.text,
            marginTop: 50,
            opacity: textIn,
          }}
        >
          {TEXT.credibilite}
        </p>
      </SafeZone>
    </AbsoluteFill>
  );
};
