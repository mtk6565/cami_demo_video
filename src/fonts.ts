import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

export const FONT_BODY = "'DM Sans', sans-serif";
export const FONT_HEADLINE = "'SeasonMix', sans-serif";

// DM Sans — variable font covers all weights (100–900)
loadFont({
  family: "DM Sans",
  url: staticFile("fonts/font_body/DMSans-VariableFont_opsz,wght.ttf"),
  weight: "100 900",
  style: "normal",
});

loadFont({
  family: "DM Sans",
  url: staticFile("fonts/font_body/DMSans-Italic-VariableFont_opsz,wght.ttf"),
  weight: "100 900",
  style: "italic",
});

// SeasonMix — discrete weight files (woff2)
loadFont({
  family: "SeasonMix",
  url: staticFile("fonts/font_headline/SeasonMix-TRIAL-Regular.woff2"),
  weight: "400",
});

loadFont({
  family: "SeasonMix",
  url: staticFile("fonts/font_headline/SeasonMix-TRIAL-Medium.woff2"),
  weight: "500",
});

loadFont({
  family: "SeasonMix",
  url: staticFile("fonts/font_headline/SeasonMix-TRIAL-SemiBold.woff2"),
  weight: "600",
});

loadFont({
  family: "SeasonMix",
  url: staticFile("fonts/font_headline/SeasonMix-TRIAL-Bold.woff2"),
  weight: "700",
});

loadFont({
  family: "SeasonMix",
  url: staticFile("fonts/font_headline/SeasonMix-TRIAL-Heavy.woff2"),
  weight: "800",
});
