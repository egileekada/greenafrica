/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import BaseLayout from "layouts/Base";
import FlightIcon from "assets/svgs/FlightTwo.svg";
import AeroIcon from "assets/svgs/aero.svg";
import DottedLine from "assets/svgs/dotted-line.svg";
import ProfileIcon from "assets/svgs/profile.svg";
import IbeAdbar from "containers/IbeAdbar";
import FliightIcon from "assets/svgs/aero.svg";
import ArrowIcon from "assets/svgs/small-arrow.svg";
import PassengerAccordion from "components/PassengerAccordion";

const ManageBookings = () => {
  const [selectedTab, setTab] = useState(1);

  const TabItem = () => {
    return (
      <>
        {/* Trip Itenary */}
        <div className="mx-6">
          <h3 className="title-text">DEPARTURE: JUNE 22, 2022</h3>
        </div>

        <section className="ibe__trip__item checkinView bordered mx-6 my-3">
          <p className="bg-primary-main text-green py-1 px-2  rounded-[4px] absolute left-6 top-3">
            gSaver
          </p>
          <div className="basis-full lg:basis-[60%] w-full flex flex-col min-h-[54px] px-6 mb-10">
            <p className="tripType self-center">Direct Flight</p>
            <div className="flex justify-between">
              <div className="flex flex-col">
                <h5 className="tripType">18:00</h5>
                <p className="tripCity">Lagos (LOS)</p>
              </div>
              <div className="tripIconPath">
                <DottedLine className="dotted-svg" />
                <AeroIcon className="aero-svg" />
                <DottedLine className="dotted-svg" />
              </div>
              <div className="flex flex-col  items-end">
                <h5 className="tripType right-text">19:00</h5>
                <p className="tripCity right-text">Abuja (ABJ)</p>
              </div>
            </div>
            <p className="tripTime self-center">1h 35mins</p>
          </div>

          <div className="trip-details">
            <div className="trip-details-item">
              <h6>FLIGHT NUMBER</h6>
              <h5>Q9 301</h5>
            </div>
          </div>
        </section>
        {/* Trip Itenary */}

        {/* Checkin Info*/}
        <section className="checkin__info mx-6 my-3">
          <p>
            You added some new services so your fare has been updated with
            additional fees
          </p>
        </section>
        {/* Checkin Info*/}

        {/* Passengers */}
        <section className="mx-6 my-6 flex flex-col ">
          <h3 className="title-text font-700 text-sm">PASSENGER</h3>
          <section className="flex flex-col mt-6 bg-green">
            <div className="flex flex-col ibe__trip__item checkinView pt-0 rounded-none">
              <div className="flex items-center w-full px-6 py-4 rounded-lg border mb-2">
                <h3>Michael Johnson</h3>
              </div>
              <div className="trip-details">
                <div className="trip-details-item">
                  <h6>SEAT NUMBER</h6>
                  <h5 className="flex items-center">
                    <span>2A</span>
                    <button className="btn btn-outline">Edit</button>
                  </h5>
                </div>
                <div className="trip-details-item">
                  <h6>BAGGAGES</h6>
                  <h5 className="flex items-center">
                    <span>0</span>
                    <button className="btn btn-outline">View Selection</button>
                    <button className="btn btn-outline ml-4">Add</button>
                  </h5>
                </div>
                <div className="trip-details-item">
                  <h6>MEALS</h6>
                  <h5 className="flex items-center">
                    <span>0</span>
                    <button className="btn btn-outline">View Selection</button>
                    <button className="btn btn-outline ml-4">Add</button>
                  </h5>
                </div>
              </div>
            </div>
          </section>
        </section>
        {/* Passengers */}

        {/* CTA */}
        <div className="flex flex-wrap md:flex-nowrap mx-6">
          <button className="basis-full md:basis-auto btn btn-outline mb-3 md:mb-0 md:mr-3">
            Update Itinerary
          </button>
          <button className="basis-full md:basis-auto btn btn-outline mb-3 md:mb-0 md:mr-3">
            Manage Services
          </button>
          <button className="basis-full md:basis-auto btn btn-outline mb-3 md:mb-0 md:mr-3">
            Seat Management
          </button>
        </div>
        {/* CTA */}
        {/* Summary */}
        <div className="flex flex-col mx-6 mt-10">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center">
              <h6 className="font-display font-bold text-xs text-primary-main">
                Round Trip ABV - LOS
              </h6>
            </div>
            <div>
              <h6 className="font-header font-bold text-base text-primary-main">
                {" "}
                ₦26,501
              </h6>
            </div>
          </div>
          <div className="checkin__row">
            <div className="flex items-center">
              <h6>2 x 10 kg baggage:</h6>
            </div>
            <div>
              <h6> ₦26,501</h6>
            </div>
          </div>
          <div className="checkin__row subrow">
            <div className="flex items-center">
              <h6>1x Seat Selected</h6>
            </div>
            <div>
              <h6> ₦26,501</h6>
            </div>
          </div>
          <div className="checkin__row subrow">
            <div className="flex items-center">
              <h6>1x Seat Selected</h6>
            </div>
            <div>
              <h6> ₦26,501</h6>
            </div>
          </div>
          <div className="checkin__row mb-10">
            <div className="flex items-center">
              <h6>1x Seat Selected</h6>
            </div>
            <div>
              <h6> ₦26,501</h6>
            </div>
          </div>
          <div className="checkin__row totalRow">
            <div className="flex items-center">
              <h5>Amount Due</h5>
            </div>
            <div>
              <h6> ₦26,501</h6>
            </div>
          </div>
        </div>
        {/* Summary */}
      </>
    );
  };

  return (
    <BaseLayout>
      <section className="w-full checkin">
        <section className="ga__section">
          <div className="ga__section__main">
            <div className="mb-8 mt-16 xlg:mt-0">
              <h2 className="text-black font-bold text-2xl mb-2">Booking</h2>
              <p>
                Kindly confirm that the information below is correct before
                checking in
              </p>
            </div>

            <section className="flex flex-col bg-white pb-24">
              {/* TripHeader */}
              <section className="ibe__flight__info__destination">
                <p>Booking Code: 9J78BG</p>
                <figure className="flightCircle">
                  <FlightIcon />
                </figure>
              </section>
              {/* TripHeader*/}

              {/* Tab Indicator */}
              <div className="mx-6 my-12 flex tabs__container border-b h-12">
                <button
                  className={` ${selectedTab === 1 ? "active-tab" : ""}`}
                  onClick={() => setTab(1)}
                >
                  <figure>
                    <FliightIcon className="primary-main" />
                  </figure>
                  <div className="flex items-center ml-[10px] ">
                    <p className="mr-[6px]">LOS</p>
                    <figure className="flex items-center justify-center -mb-1">
                      <ArrowIcon />
                    </figure>
                    <p className=" ml-[6px]">ABV</p>
                  </div>
                </button>
                <button
                  className={` ${selectedTab === 2 ? "active-tab" : ""}`}
                  onClick={() => setTab(2)}
                >
                  <figure>
                    <FliightIcon className="primary-main" />
                  </figure>
                  <div className="flex items-center ml-[10px] ">
                    <p className="mr-[6px]">LOS</p>
                    <figure className="flex items-center justify-center -mb-1">
                      <ArrowIcon className="fill-[text-[#9E9BBF]" />
                    </figure>
                    <p className="ml-[6px]">ABV</p>
                  </div>
                </button>
              </div>
              {/* Tab  Indicator */}

              {selectedTab === 1 ? <TabItem /> : null}
            </section>
          </div>
          <div className="ga__section__side">
            <IbeAdbar />
          </div>
        </section>
      </section>
    </BaseLayout>
  );
};

export default ManageBookings;