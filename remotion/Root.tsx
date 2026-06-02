import { Composition } from "remotion";
import { ShilajitAd } from "./ShilajitAd";
import { FPS, WIDTH, HEIGHT, DURATION } from "./config";

// Enregistrement de la composition pour Remotion Studio + le rendu.
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ShilajitAd"
        component={ShilajitAd}
        durationInFrames={DURATION}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
    </>
  );
};
