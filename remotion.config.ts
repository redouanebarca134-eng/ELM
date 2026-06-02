// Configuration de rendu Remotion (séparée de Next.js).
import { Config } from "@remotion/cli/config";
import { enableTailwind } from "@remotion/tailwind";

Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);

Config.overrideWebpackConfig((currentConfig) => {
  return enableTailwind(currentConfig);
});
