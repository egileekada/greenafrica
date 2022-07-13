/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import BaseLayout from "layouts/Base";
import IbeSidebar from "containers/IbeSidebar";
import FlightIcon from "assets/svgs/flightcircle.svg";
import ArrowTo from "assets/svgs/arrowto.svg";

import AeroIcon from "assets/svgs/aero.svg";
import DottedLine from "assets/svgs/dotted-line.svg";
import WorkIcon from "assets/svgs/work.svg";

const TripView = () => {
  return (
    <BaseLayout>
      {/* <section className="w-full px-3.5 py-24 lg:fit-x-bleed"> */}
      <section className="w-full">
        <section className="flex">
          <div className="basis-[75%] flex flex-col greylike py-10 pl-28 pr-12">
            <h2 className="text-primary-main font-extrabold text-2xl mb-8">
              YOUR TRIP TO ABUJA
            </h2>

            <section className="flex flex-col">
              {/* TripHeader */}
              <section className="ibe__flight__info__destination">
                <p>Lagos (LOS)</p>
                <figure>
                  <ArrowTo />
                </figure>
                <p>Abuja (ABV)</p>

                <figure className="absolute -left-6">
                  <FlightIcon />
                </figure>
              </section>
              {/* TripHeader*/}

              {/* TripInfo */}
              <section className="ibe__trip__item tripView">
                <div className="basis-full flex  flex-col min-h-[54px] ">
                  <p className="tripType self-center">Direct Flight</p>
                  <div className="flex justify-between">
                    <div className="flex flex-col">
                      <h5 className="font-extrabold font-header  text-2xl text-primary-main">
                        18:00
                      </h5>
                      <p className="font-semibold font-body text-sm text-black">
                        Lagos (LOS)
                      </p>
                    </div>
                    <div className="flex items-center basis-[70%] justify-between">
                      <DottedLine />
                      <AeroIcon />
                      <DottedLine />
                    </div>
                    <div className="flex flex-col  items-end">
                      <h5 className="font-extrabold font-header text-2xl text-primary-main">
                        19:35
                      </h5>
                      <p className="font-semibold font-body text-sm text-black">
                        Akure (AKR)
                      </p>
                    </div>
                  </div>
                  <p className="tripTime self-center">1h 35mins</p>
                </div>
              </section>
              {/* TripInfo */}
              {/* TripPackage */}
              <section className="ibe__trip__package flex justify-between">
                <div className="flex flex-col">
                  <h5>TRAVEL PACKAGE</h5>
                  <h6>gClassic</h6>
                  <button className="text-primary-main underline text-sm font-body mt-4">
                    Upgrade To gFlex
                  </button>
                </div>
                <div className="flex flex-col items-end">
                  <h5>FARE PRICE</h5>
                  <h6>₦26,501</h6>
                </div>
              </section>
              {/* TripPackage */}
              {/* Flight Number */}
              <div className="ibe__trip__number tripView">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <figure className="w-[41px] h-[41px] rounded-full flex items-center justify-center bg-primary-main mr-4">
                      <WorkIcon />
                    </figure>
                    <h4 className="mb-0">7kg hand luggage: 55 x40 x 24cm</h4>
                  </div>
                  <button className="btn btn-outline">Change Flight</button>
                </div>
              </div>
              {/* Flight Number */}

              {/* Terms */}
              <div className="flex flex-col my-6">
                <div className="flex mb-6">
                  <p>
                    I have read and accept the airline’s &nbsp;
                    <Link href="/terms">
                      <a className="text-primary-main hover:text-green underline font-display">Fare Rules and Terms and Conditions.</a>
                    </Link>{" "}
                    I acknowledge that personal information relating to my
                    booking may be accessible to government authorities,
                    selected airlines and the agents to whom the airline grants
                    system access.
                  </p>
                </div>
                <button className="btn btn-primary w-[195px]">Continue</button>
              </div>
              {/* Terms */}
            </section>
          </div>
          <div className="basis-[25%] bg-white px-6 py-8">
            <IbeSidebar />
          </div>
        </section>
      </section>
    </BaseLayout>
  );
};

export default TripView;
