/* eslint-disable @next/next/no-img-element */
import useDeviceSize from "hooks/useWindowSize";
import HeroSlider from "../../containers/ref/home/Slider";
import DesktopFilter from "./DesktopFilter";
import MobileFilter from "./MobileFilter";

const HomeHero = () => {
  const [width] = useDeviceSize();

  return (
    <section className="w-full flex flex-col relative">
      <div className="relative h-4/6">
        <HeroSlider />
      </div>
      <div className="basis-ful w-full  relative -top-[4rem]">
        <div className="w-[90%] mx-auto">
          <DesktopFilter />
          {/* {width > 899 ? <DesktopFilter /> : <MobileFilter />} */}
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
