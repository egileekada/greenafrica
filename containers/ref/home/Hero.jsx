import HeroSlider from "./Slider";
import DesktopFilter from "./DesktopFilter";
import MobileFilter from "./MobileFilter";
import useDeviceSize from "hooks/useWindowSize";

const Hero = () => {
  const [width] = useDeviceSize();

  return (
    <section className="w-full flex flex-col relative ">
      <div className="basis-full bg-grey-ed h-[380px] overflow-hidden">
        <HeroSlider />
      </div>
      <div className="basis-full bg-grey-ed min-h-[300px] relative">
        {width > 899 ? <DesktopFilter /> : <MobileFilter />}
      </div>
    </section>
  );
};

export default Hero;
