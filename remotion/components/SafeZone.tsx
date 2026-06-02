import { AbsoluteFill } from "remotion";
import { SAFE, TEXT } from "../config";

// Conteneur qui maintient tout le contenu dans la zone sûre centrale
// (à l'écart du haut/bas masqués par l'UI TikTok/Reels).
export const SafeZone: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <AbsoluteFill
      dir={TEXT.dir}
      style={{
        paddingTop: SAFE.top,
        paddingBottom: SAFE.bottom,
        paddingLeft: SAFE.side,
        paddingRight: SAFE.side,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      {children}
    </AbsoluteFill>
  );
};
