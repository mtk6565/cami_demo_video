import { Composition } from "remotion";
import { PetverseAd } from "./PetverseAd";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="PetverseWhatsAppAd"
        component={PetverseAd}
        durationInFrames={900} // 30 seconds at 30fps
        fps={30}
        width={1080}
        height={1920} // 9:16 vertical for Reels/TikTok/Stories
      />
      <Composition
        id="PetverseWhatsAppAd-Landscape"
        component={PetverseAd}
        durationInFrames={900}
        fps={30}
        width={1920}
        height={1080} // 16:9 for YouTube/web
      />
    </>
  );
};
