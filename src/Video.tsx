import { Composition } from "remotion";
import { CamiAd } from "./CamiAd";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="CamiWhatsAppAd"
        component={CamiAd}
        durationInFrames={1125} // 37.5 seconds at 30fps
        fps={30}
        width={1080}
        height={1920} // 9:16 vertical for Reels/TikTok/Stories
      />
      <Composition
        id="CamiWhatsAppAd-Landscape"
        component={CamiAd}
        durationInFrames={1125}
        fps={30}
        width={1920}
        height={1080} // 16:9 for YouTube/web
      />
      <Composition
        id="CamiWhatsAppAd-WhatsApp"
        component={CamiAd}
        durationInFrames={1125}
        fps={30}
        width={960}
        height={1080} // ~9:10 optimized for WhatsApp sending (compact, less bottom gap)
      />
    </>
  );
};
