/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import BaseLayout from "layouts/Base";
import IbeSidebar from "containers/IbeSidebar";
import FlightIcon from "assets/svgs/flightcircle.svg";

import AeroIcon from "assets/svgs/aero.svg";
import DottedLine from "assets/svgs/dotted-line.svg";

import Fare from "containers/IbeSummary/Fare";
import SummaryDetails from "containers/IbeSummary/SummaryDetails";

const TripConfirm = () => {
  return (
    <BaseLayout>
      <section className="w-full">
        <section className="ga__section">
          <div className="ga__section__main">
            <div className="mb-8 mt-16 xlg:mt-0">
              <h2 className="text-black font-extrabold text-2xl mb-4">
                Booking Confirmed
              </h2>
              <p>
                Thank you for booking your travel wIth Green Africa. Below is a
                summary of your <span className="font-display">One way</span>{" "}
                trip to <span className="font-display">Abuja</span>. We’ve also
                sent a copy of your booking confirmation to your email address.{" "}
              </p>
            </div>

            <section className="flex flex-col bg-white pb-20 trip__summary">
              {/* TripHeader */}
              <section className="ibe__flight__info__destination">
                <p>Booking Code: 9J78BG</p>
                <figure className="flightCircle">
                  <FlightIcon />
                </figure>
              </section>
              {/* TripHeader*/}
              {/* Flight Summary */}
              <div className="flex flex-wrap md:flex-nowrap items-center justify-between px-6 lg:px-12 py-6 lg:py-8">
                <div className="basis-full md:basis-auto mb-4 md:mb-0 flex flex-col">
                  <h2 className="trip-title mb-3">FLIGHT SUMMARY</h2>
                  <p className="text-primary-main text-sm font-body font-normal">
                    Departing on June 22, 2022
                  </p>
                </div>
                <button className="basis-full md:basis-auto btn btn-outline">
                  Download Ticket
                </button>
              </div>
              {/* Flight Summary */}

              {/* Trip Itenary */}
              <section className="ibe__trip__item summaryView bordered mx-6 lg:mx-12 mb-9">
                <div className="basis-full flex  flex-col min-h-[54px] ">
                  <p className="tripType self-center">Direct Flight</p>
                  <div className="flex justify-between">
                    <div className="flex flex-col">
                      <h5 className="font-extrabold font-header text-xl lg:text-2xl text-primary-main text-left">
                        18:00
                      </h5>
                      <p className="font-semibold font-body text-xs lg:text-sm text-black text-left">
                        Lagos (LOS)
                      </p>
                    </div>
                    <div className="tripIconPath">
                      <DottedLine className="dotted-svg" />
                      <AeroIcon className="aero-svg" />
                      <DottedLine className="dotted-svg" />
                    </div>
                    <div className="flex flex-col  items-end">
                      <h5 className="font-extrabold font-header text-xl lg:text-2xl text-primary-main text-left">
                        19:00
                      </h5>
                      <p className="tripCity right-text">Abuja (ABJ)</p>
                    </div>
                  </div>
                  <p className="tripTime self-center">1h 35mins</p>
                </div>
              </section>
              {/* Trip Itenary */}

              {/* Passenger & Fare */}
              <section className="flex flex-wrap md:flex-nowrap justify-between px-6 lg:px-12 mb-4">
                <div className="basis-full md:basis-[48%] mb-12 md:mb-0">
                  <SummaryDetails />
                </div>
                <div className="basis-full md:basis-[48%]">
                  <Fare />
                </div>
              </section>
              {/* Passenger & Fare */}

              {/* CTA */}
              <section className="flex  flex-wrap md:flex-nowrap items-center px-6 lg:px-12">
                <button className="basis-full md:basis-[30%] tab:basis-[20%] btn btn-primary mr-0 md:mr-2 mb-4 md:mb-0">
                  Manage Booking
                </button>
                <button className="basis-full md:basis-[30%] tab:basis-[20%] btn btn-outline mr-2 md:mr-2">
                  Check In
                </button>
              </section>
              {/* CTA */}
            </section>
          </div>
          <div className="ga__section__side">
            <IbeSidebar />
          </div>
        </section>
      </section>
    </BaseLayout>
  );
};

export default TripConfirm;
