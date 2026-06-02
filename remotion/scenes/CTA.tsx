import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  staticFile,
  Img,
} from "remotion";
import { Fond } from "../components/Fond";
import { SafeZone } from "../components/SafeZone";
import { COLORS, TEXT, LANG, ASSETS } from "../config";
import { fontFamilies } from "../fonts";

// SCÈNE 6 — CTA (540–600) : logo reveal + bouton doré qui pulse.
export const CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const f = fontFamilies(LANG);

  const logoIn = spring({ frame, fps, config: { damping: 13 } });
  const titleIn = spring({ frame: frame - 16, fps, config: { damping: 16 } });
  const subIn = spring({ frame: frame - 26, fps, config: { damping: 18 } });

  // Pulsation du bouton
  const pulse = interpolate(Math.sin(frame * 0.18), [-1, 1], [0.97, 1.04]);

  return (
    <AbsoluteFill>
      <Fond />
      <SafeZone>
        {/* Logo ELM (PLACEHOLDER texte si elm-logo.png absent) */}
        <div style={{ transform: `scale(${logoIn})`, opacity: logoIn }}>
          <Img
            src={staticFile(ASSETS.logo)}
            style={{ width: 220, height: "auto" }}
            // REMPLACER : dépose ton logo dans public/elm-logo.png
          />
        </div>

        <h2
          style={{
            fontFamily: f.heading,
            fontWeight: 900,
            fontSize: 72,
            color: COLORS.text,
            marginTop: 40,
            opacity: titleIn,
          }}
        >
          {TEXT.ctaTitle}
        </h2>

        <p
          style={{
            fontFamily: f.body,
            fontWeight: 600,
            fontSize: 42,
            color: COLORS.goldSoft,
            marginTop: 18,
            opacity: subIn,
          }}
        >
          {TEXT.ctaSub}
        </p>

        {/* Bouton doré pulsant */}
        <div
          style={{
            marginTop: 48,
            transform: `scale(${pulse})`,
            background: `linear-gradient(135deg, ${COLORS.goldSoft}, ${COLORS.gold})`,
            color: COLORS.bgDeep,
            fontFamily: f.body,
            fontWeight: 700,
            fontSize: 46,
            padding: "28px 64px",
            borderRadius: 999,
            boxShadow: `0 0 50px rgba(201,162,75,0.6)`,
            opacity: subIn,
          }}
        >
          {TEXT.ctaButton}
        </div>
      </SafeZone>
    </AbsoluteFill>
  );
};
