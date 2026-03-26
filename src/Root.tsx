import { Composition } from "remotion";
import { PetverseAd } from "./PetverseAd";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="PetverseWhatsAppAd"
        component={PetverseAd}
        durationInFrames={900}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="PetverseWhatsAppAd-Landscape"
        component={PetverseAd}
        durationInFrames={900}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
