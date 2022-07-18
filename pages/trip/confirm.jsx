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
        <section className="flex">
          <div className="basis-[75%] flex flex-col greylike py-10 pl-28 pr-12">
            <div className="mb-8">
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
                <figure className="absolute -left-6">
                  <FlightIcon />
                </figure>
              </section>
              {/* TripHeader*/}
              {/* Flight Summary */}
              <div className="flex items-center justify-between px-12 py-8">
                <div className="flex flex-col">
                  <h2 className="trip-title mb-3">FLIGHT SUMMARY</h2>
                  <p className="text-primary-main text-sm font-body font-normal">
                    Departing on June 22, 2022
                  </p>
                </div>
                <button className="btn btn-outline">Download Ticket</button>
              </div>
              {/* Flight Summary */}
              {/* Trip Itenary */}
              <section className="ibe__trip__item summaryView bordered mx-12 mb-9">
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
              {/* Trip Itenary */}
              {/* Passenger & Fare */}
              <section className="flex justify-between px-12 mb-4">
                <div className="basis-[48%]">
                  <SummaryDetails />
                </div>
                <div className="basis-[48%]">
                  <Fare />
                </div>
              </section>
              {/* Passenger & Fare */}
              {/* CTA */}
              <div className="flex items-center px-12">
                <button className="btn btn-primary mr-2">Manage Booking</button>
                <button className="btn btn-outline mr-2">Check In</button>
              </div>
              {/* CTA */}
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

export default TripConfirm;
