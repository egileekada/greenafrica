import useDeviceSize from "hooks/useWindowSize";
import Image from "next/image";
import Destinations from "../components/Destinations";
import DesktopFilter from "../components/DesktopFilter";
import MobileFilter from "../components/MobileFilter";
import BaseLayout from "layouts/Base";

// import Abuja from "/images/abuja.jpg";

const Destination = () => {
  const [width] = useDeviceSize();
  return (
    <BaseLayout>
      <section className="w-full px-3.5 pb-24 lg:fit-x-bleed">
        <img
          src="/images/abuja.jpg"
          alt=""
          loading="lazy"
          className="w-full object-cover"
        />

        <div className="basis-ful max-h-[300px] w-full  absolut -bottom-[16rem] mt-10">
          <div className="mx-auto">
            {width > 899 ? <DesktopFilter /> : <MobileFilter />}
          </div>
        </div>

        <section className="container mx-auto my-10">
          <p className="text-sm mb-8">
            A tropical wet climate south-south Nigerian city that is well known
            for its contribution to the Nigerian’s global market strength and
            overall GDP through its crude oil rich lands.
          </p>

          <p className="text-sm mb-8">
            The city houses many multinational firms as part of its industrial
            complex. With two main oil refineries, Port-Harcourt produces over
            200,000 barrels of crude oil per day and that cements the city’s
            claim to be one of the wealthiest regions in Nigeria.
          </p>

          <p className="text-sm mb-8">
            Apart from the industrial nature of Port-Harcourt, nightlife, music
            and entertainment are a big part of the city’s lifestyle.
          </p>

          <p className="text-sm mb-8">
            The people of this city love to celebrate life and they have the
            wealth to celebrate it quite well. Being a Delta, the city is
            surrounded by bodies of water which gives them access to lots of
            good food (especially seafood).
          </p>

          <p className="text-sm mb-8">
            Port Harcourt International Airport is located at Omagwa, a suburb
            of the city. It has two terminals that serves both international and
            domestic flights. You get to fly out of Nigeria to international
            destinations or fly to other Nigerian cities through its domestic
            terminal.
          </p>

          <p className="text-sm mb-8">
            Grab a meal of Bole and fish as you explore the relaxed oil city of
            Port-Harcourt (or you can simply call it PH).
          </p>
        </section>

        <Destinations />
      </section>
    </BaseLayout>
  );
};

export default Destination;
