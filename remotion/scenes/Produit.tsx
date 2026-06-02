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

// SCÈNE 3 — RÉVÉLATION PRODUIT (180–300) : entrée spring + Ken Burns.
export const Produit: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const f = fontFamilies(LANG);

  // Entrée du produit depuis le bas
  const inSpring = spring({ frame, fps, config: { damping: 16 } });
  const prodY = interpolate(inSpring, [0, 1], [400, 0]);

  // Ken Burns : zoom lent continu
  const zoom = interpolate(frame, [0, durationInFrames], [1, 1.12]);

  // Textes décalés
  const titleIn = spring({ frame: frame - 30, fps, config: { damping: 16 } });
  const subIn = spring({ frame: frame - 48, fps, config: { damping: 18 } });

  return (
    <AbsoluteFill>
      <Fond />

      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <div
          style={{
            transform: `translateY(${prodY}px) scale(${zoom})`,
            opacity: inSpring,
            filter: `drop-shadow(0 0 60px rgba(201,162,75,0.55))`,
          }}
        >
          {/* PLACEHOLDER si l'image n'existe pas → remplace public/shilajit-product.png */}
          <Img
            src={staticFile(ASSETS.product)}
            style={{ width: 520, height: "auto", borderRadius: 24 }}
            // REMPLACER : dépose ta vraie photo produit dans public/shilajit-product.png
          />
        </div>
      </AbsoluteFill>

      <SafeZone>
        <div style={{ marginTop: "auto" }}>
          <h2
            style={{
              fontFamily: f.heading,
              fontWeight: 900,
              fontSize: 68,
              color: COLORS.text,
              opacity: titleIn,
              textShadow: "0 4px 30px rgba(0,0,0,0.7)",
            }}
          >
            {TEXT.produitTitle}
          </h2>
          <p
            style={{
              fontFamily: f.body,
              fontWeight: 600,
              fontSize: 40,
              marginTop: 22,
              color: COLORS.goldSoft,
              opacity: subIn,
            }}
          >
            {TEXT.produitSub}
          </p>
        </div>
      </SafeZone>
    </AbsoluteFill>
  );
};
