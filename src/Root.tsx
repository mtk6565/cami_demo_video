import { Composition } from "remotion";
import { CamiAd } from "./CamiAd";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="CamiWhatsAppAd"
        component={CamiAd}
        durationInFrames={1380}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="CamiWhatsAppAd-Landscape"
        component={CamiAd}
        durationInFrames={1380}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
