import { AbsoluteFill, Audio, staticFile } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";

import { SCENES, TRANSITION_FRAMES, COLORS, ASSETS, AUDIO } from "./config";
import { Hook } from "./scenes/Hook";
import { Probleme } from "./scenes/Probleme";
import { Produit } from "./scenes/Produit";
import { Benefice } from "./scenes/Benefice";
import { Credibilite } from "./scenes/Credibilite";
import { CTA } from "./scenes/CTA";

// ════════════════════════════════════════════════════════════════════
//  COMPO PRINCIPALE — ShilajitAd
//  Assemble les 6 scènes avec transitions fluides + audio optionnel.
// ════════════════════════════════════════════════════════════════════
export const ShilajitAd: React.FC = () => {
  const t = TRANSITION_FRAMES;
  const timing = linearTiming({ durationInFrames: t });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bgDeep }}>
      <TransitionSeries>
        {/* 1 — HOOK */}
        <TransitionSeries.Sequence durationInFrames={SCENES.hook.duration + t}>
          <Hook />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={timing} />

        {/* 2 — PROBLÈME */}
        <TransitionSeries.Sequence
          durationInFrames={SCENES.probleme.duration + t}
        >
          <Probleme />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-bottom" })}
          timing={timing}
        />

        {/* 3 — PRODUIT */}
        <TransitionSeries.Sequence
          durationInFrames={SCENES.produit.duration + t}
        >
          <Produit />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={timing} />

        {/* 4a — BÉNÉFICE 1 */}
        <TransitionSeries.Sequence
          durationInFrames={SCENES.benefice1.duration + t}
        >
          <Benefice index={0} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={timing}
        />

        {/* 4b — BÉNÉFICE 2 */}
        <TransitionSeries.Sequence
          durationInFrames={SCENES.benefice2.duration + t}
        >
          <Benefice index={1} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={timing}
        />

        {/* 4c — BÉNÉFICE 3 */}
        <TransitionSeries.Sequence
          durationInFrames={SCENES.benefice3.duration + t}
        >
          <Benefice index={2} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={timing} />

        {/* 5 — CRÉDIBILITÉ */}
        <TransitionSeries.Sequence
          durationInFrames={SCENES.credibilite.duration + t}
        >
          <Credibilite />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={timing} />

        {/* 6 — CTA */}
        <TransitionSeries.Sequence durationInFrames={SCENES.cta.duration}>
          <CTA />
        </TransitionSeries.Sequence>
      </TransitionSeries>

      {/* Audio optionnel (activer dans config.AUDIO quand les fichiers existent) */}
      {AUDIO.music && (
        <Audio src={staticFile(ASSETS.music)} volume={AUDIO.musicVolume} />
      )}
      {AUDIO.voiceover && (
        <Audio
          src={staticFile(ASSETS.voiceover)}
          volume={AUDIO.voiceoverVolume}
        />
      )}
    </AbsoluteFill>
  );
};
