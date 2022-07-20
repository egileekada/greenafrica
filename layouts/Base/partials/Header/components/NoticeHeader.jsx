/* eslint-disable @next/next/no-img-element */
import useDeviceSize from "hooks/useWindowSize";
import CovidIcon from "assets/svgs/bell.svg";

const NoticeHeader = () => {
  const [width] = useDeviceSize();
  return (
    <>
      <header className="w-full mx-auto relative px-8 lg:px-70 py-[18px] bg-primary-light">
        <div className="desktop">
          <div className="flex items-center">
            <figure className="marquee__svg">
              <CovidIcon className="mr-4" />
            </figure>
            {width > 768 ? (
              <p className="font-body text-white text-xs mb-0">
                Due to the recent rise in aviation fuel scarcity in some major
                airports around the country, we would like to inform you of
                potential flight delays in the coming days. We shall keep you
                informed if there are changes to the timing of your flights
                while we endeavour to maintain our flight schedules and keep
                your journey safe and comfortable -gCare
              </p>
            ) : (
              <marquee className="font-body text-white text-xs mb-0">
                Due to the recent rise in aviation fuel scarcity in some major
                airports around the country, we would like to inform you of
                potential flight delays in the coming days. We shall keep you
                informed if there are changes to the timing of your flights
                while we endeavour to maintain our flight schedules and keep
                your journey safe and comfortable -gCare
              </marquee>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default NoticeHeader;
