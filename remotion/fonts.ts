import { loadFont as loadPlayfair } from "@remotion/google-fonts/PlayfairDisplay";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { loadFont as loadAmiri } from "@remotion/google-fonts/Amiri";

// Serif premium pour les titres (FR)
export const playfair = loadPlayfair("normal", {
  weights: ["600", "700", "900"],
});

// Sans lisible pour le corps (FR)
export const inter = loadInter("normal", { weights: ["400", "600", "700"] });

// Serif arabe élégant (variante AR / RTL)
export const amiri = loadAmiri("normal", { weights: ["400", "700"] });

// Familles prêtes à l'emploi (titres / corps) selon la langue
export function fontFamilies(lang: "fr" | "ar") {
  if (lang === "ar") {
    return {
      heading: amiri.fontFamily,
      body: amiri.fontFamily,
    };
  }
  return {
    heading: playfair.fontFamily,
    body: inter.fontFamily,
  };
}
