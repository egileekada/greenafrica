/* eslint-disable @next/next/no-img-element */
import BaseLayout from "layouts/Base";
import FlightIcon from "assets/svgs/flightcircle.svg";
import AeroIcon from "assets/svgs/aero.svg";
import DottedLine from "assets/svgs/dotted-line.svg";
import CancelIcon from "assets/svgs/cancel.svg";
import ProfileIcon from "assets/svgs/profile.svg";
import IbeAdbar from "containers/IbeAdbar";
import { Fragment, useState } from "react";
import Popup from "components/Popup";
import BaggageIcon from "assets/svgs/baggage.svg";

const CheckInDetails = () => {
  const [showBaggage, setBaggage] = useState(false);
  const [showMeal, setMeal] = useState(true);

  return (
    <Fragment>
      <BaseLayout>
        <section className="w-full checkin">
          <section className="ga__section">
            <div className="ga__section__main">
              <div className="mb-8 mt-16 xlg:mt-0">
                <h2 className="text-black font-extrabold text-2xl mb-2">
                  Check In
                </h2>
                <p>
                  Kindly confirm that the information below is correct before
                  checking in
                </p>
              </div>

              <section className="flex flex-col bg-white pb-24">
                {/* TripHeader */}
                <section className="ibe__flight__info__destination">
                  <p>Booking Code: 9J78BG</p>
                  {/* <figure className="absolute -left-6"> */}
                  <figure className="flightCircle">
                    <FlightIcon />
                  </figure>
                </section>
                {/* TripHeader*/}
                {/* Trip Itenary */}
                <div className="mx-6 mt-12 flex flex-col">
                  <h3 className="title-text">PASSENGER DETAILS</h3>
                  <div className="flex mb-6 mt-4">
                    <div className="flex flex-col w-[53px] mr-4">
                      <div className="bg-purple-light h-[50px] rounded-t-[3px] flex justify-center items-center">
                        <ProfileIcon />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <h5 className="text-sm font-extrabold text-primary-main font-display mb-2">
                        Michael Johnson
                      </h5>
                      <h6 className="text-[12px] text-[#9692B8] font-title">
                        DOB: June 22, 1998
                      </h6>
                    </div>
                  </div>
                </div>

                <div className="mx-6">
                  <h3 className="title-text">DEPARTURE: JUNE 22, 2022</h3>
                </div>

                <section className="ibe__trip__item checkinView bordered mx-6 my-3">
                  <p className="bg-primary-main text-green py-1 px-2  rounded-[4px] absolute left-6 top-3 lg:top-[18px]">
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
                    <div className="trip-details-item">
                      <h6>SEAT NUMBER</h6>
                      <h5 className="flex items-center">
                        <span>2A</span>
                        <button className="btn btn-outline">
                          View Selection
                        </button>
                        <button className="btn btn-outline ml-4">Add</button>
                      </h5>
                    </div>
                    <div className="trip-details-item">
                      <h6>BAGGAGES</h6>
                      <h5 className="flex items-center">
                        <span>0</span>
                        <button
                          className="btn btn-outline"
                          onClick={() => setBaggage(true)}
                        >
                          View Selection
                        </button>
                        <button className="btn btn-outline ml-4">Add</button>
                      </h5>
                    </div>
                    <div className="trip-details-item">
                      <h6>MEALS</h6>
                      <h5 className="flex items-center">
                        <span>0</span>
                        <button
                          className="btn btn-outline"
                          onClick={() => setMeal(true)}
                        >
                          View Selection
                        </button>
                        <button className="btn btn-outline ml-4">Add</button>
                      </h5>
                    </div>
                  </div>
                </section>
                {/* Trip Itenary */}
                {/* Checkin Info*/}
                <section className="checkin__info mx-6 my-3">
                  <p>
                    You added some new services so your fare has been updated
                    with additional fees
                  </p>
                </section>
                {/* Checkin Info*/}

                {/* Edit Checkin Details*/}
                <div className="flex mx-6 mb-5">
                  <div className="basis-1/2 flex flex-col">
                    <div className="trip__summary__row subrow">
                      <div className="flex items-center">
                        <h6>1x Seat Selected</h6>
                      </div>
                      <div className="flex items-center">
                        <h6> ₦26,501</h6>
                        <button>
                          <figure className="ml-3">
                            <CancelIcon />
                          </figure>
                        </button>
                      </div>
                    </div>
                    <div className="trip__summary__row subrow">
                      <div className="flex items-center">
                        <h6>1x Seat Selected</h6>
                      </div>
                      <div className="flex items-center">
                        <h6> ₦26,501</h6>
                        <button>
                          <figure className="ml-3">
                            <CancelIcon />
                          </figure>
                        </button>
                      </div>
                    </div>
                    <div className="trip__summary__row totalRow">
                      <div className="flex items-center">
                        <h5>TOTAL</h5>
                      </div>
                      <div>
                        <h6> ₦26,501</h6>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Edit Checkin Details*/}

                <div className="flex mx-6">
                  <button className="btn btn-primary">Pay & Check In</button>
                </div>
              </section>
            </div>
            <div className="ga__section__side">
              <IbeAdbar />
            </div>
          </section>
        </section>
      </BaseLayout>
      <Popup
        display={showBaggage}
        closeModal={() => setBaggage(false)}
        top={true}
        width="w-[600px]"
      >
        <section className="w-full bg-white rounded-xl ">
          {!true ? (
            <div className="flex flex-col items-center justify-center p-[50px]">
              <h6 className="font-display text-xl mb-3">
                There’s nothing here
              </h6>
              <p className="text-center font-body text-sm mb-6">
                You have not made any selections yet
              </p>
              <div className="flex  items-center justify-center w-full">
                <button className="btn btn-primary basis-full lg:basis-[48%] lg:mr-2">
                  Yes, I need more time
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col p-6 md:p-[50px]">
              <h6 className="font-display text-xl mb-3">Manage Meal</h6>
              <p className="font-body text-sm mb-6">
                Here’s your current selection for your meals
              </p>
              <div className="flex flex-col">
                {/* Row */}

                <div className="flex items-center justify-between border-b py-3">
                  <div className="flex items-center mr-6">
                    <figure className="mr-2 hidden md:block">
                      <BaggageIcon />
                    </figure>
                    <div className="flex flex-col">
                      <h6 className="font-display text-sm mb-[5px] text-primary-main">
                        Chicken & Chips x 2
                      </h6>
                      <p className="font-body text-sm ">
                        Here’s your current selection for your meals
                      </p>
                    </div>
                  </div>
                  <h6 className="font-display text-base  text-primary-main">
                    ₦26,501
                  </h6>
                </div>

                <div className="flex items-center justify-between mt-2 py-3">
                  <button className="btn btn-primary">Add Baggage</button>
                  <div className="flex flex-col items-end">
                    <p className="font-body text-[11px] font-bold">TOTAL</p>
                    <h6 className="font-display text-base  text-primary-main">
                      ₦26,501
                    </h6>
                  </div>
                </div>

                {/* Row */}
              </div>
            </div>
          )}
        </section>
      </Popup>
      <Popup
        display={showMeal}
        closeModal={() => setMeal(false)}
        top={true}
        width="w-[600px]"
      >
        <section className="w-full bg-white rounded-xl ">
          {!true ? (
            <div className="flex flex-col items-center justify-center p-[50px]">
              <h6 className="font-display text-xl mb-3">
                There’s nothing here
              </h6>
              <p className="text-center font-body text-sm mb-6">
                You have not made any selections yet
              </p>
              <div className="flex  items-center justify-center w-full">
                <button className="btn btn-primary basis-full lg:basis-[48%] lg:mr-2">
                  Yes, I need more time
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col p-6 md:p-[50px]">
              <h6 className="font-display text-xl mb-3">Manage Meal</h6>
              <p className="font-body text-sm mb-6">
                Here’s your current selection for your meals
              </p>
              <div className="flex flex-col">
                {/* Row */}

                <div className="flex items-center justify-between border-b py-3">
                  <div className="flex items-center mr-6">
                    <div className="flex flex-col">
                      <h6 className="font-display text-sm mb-[5px] text-primary-main">
                        Chicken & Chips x 2
                      </h6>
                      <p className="font-body text-sm ">
                        Here’s your current selection for your meals
                      </p>
                    </div>
                  </div>
                  <h6 className="font-display text-base  text-primary-main">
                    ₦26,501
                  </h6>
                </div>

                <div className="flex items-center justify-between border-b py-3">
                  <div className="flex items-center mr-6">
                    <div className="flex flex-col">
                      <h6 className="font-display text-sm mb-[5px] text-primary-main">
                        Chicken & Chips x 2
                      </h6>
                      <p className="font-body text-sm ">
                        Here’s your current selection for your meals
                      </p>
                    </div>
                  </div>
                  <h6 className="font-display text-base  text-primary-main">
                    ₦26,501
                  </h6>
                </div>

                <div className="flex items-center justify-between mt-2 py-3">
                  <button className="btn btn-primary">Add Baggage</button>
                  <div className="flex flex-col items-end">
                    <p className="font-body text-[11px] font-bold">TOTAL</p>
                    <h6 className="font-display text-base  text-primary-main">
                      ₦26,501
                    </h6>
                  </div>
                </div>

                {/* Row */}
              </div>
            </div>
          )}
        </section>
      </Popup>
    </Fragment>
  );
};

export default CheckInDetails;
