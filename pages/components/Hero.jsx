/* eslint-disable @next/next/no-img-element */
import useDeviceSize from "hooks/useWindowSize";
import DesktopFilter from "./DesktopFilter";
import MobileFilter from "./MobileFilter";

const HomeHero = () => {
  const [width] = useDeviceSize();

  return (
    <section className="w-full flex flex-col relative mb-[168px]">
      <div className="relative h-4/6">
        <img
          src="https://static.greenafrica.com/media/1001/microsoftteams-image-4.png"
          alt=""
          className="w-full h-96 lg:h-4/6 object-cover"
        />
        <div className="absolute pl-8 lg:pl-24 top-1/4 lg:w-1/4 hidden">
          <h1 className="text-4xl text-primary-main font-medium">
            Welcome to the future
          </h1>
          <p className="text-2xl text-primary-main font-light mt-8">
            You are one flight closer to your dreams and destinations.
          </p>
        </div>
      </div>
      <div className="basis-ful min-h-[300px] w-full  absolute -bottom-[16rem]">
        <div className="w-[90%] mx-auto ">
          {width > 899 ? <DesktopFilter /> : <MobileFilter />}
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
