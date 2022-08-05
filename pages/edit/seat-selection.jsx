/* eslint-disable @next/next/no-img-element */
import BaseLayout from "layouts/Base";
import FlightIcon from "assets/svgs/flightcircle.svg";
import ProfileIcon from "assets/svgs/profile.svg";
import IbeSidebar from "containers/IbeSidebar";
import { Fragment, useState } from "react";
import Popup from "components/Popup";
import Seatslegend from "containers/Seats/SeatPopUp";
import PlaneSeats from "containers/Seats/PlaneSeats";

import InfoIcon from "assets/svgs/seats/info.svg";

const SeatSelection = () => {
  const [showPopUp, setShow] = useState(false);
  const [showEmergency, setEmergency] = useState(false);

  return (
    <Fragment>
      <BaseLayout>
        <section className="w-full checkin">
          <section className="ga__section bg-normal">
            <div className="ga__section__main standalone">
              <div className="mb-8">
                <h2 className="text-black font-extrabold text-2xl mb-2">
                  Change Seat Selection
                </h2>
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
                <div className="flex flex-wrap xlg:flex-nowrap">
                  <div className="basis-full xlg:basis-[30%]">
                    {/* Seat Info */}
                    <div className="mx-6 mt-12 flex flex-col">
                      <div className="flex flex-col mb-6">
                        <h2 className="text-black font-header text-xl">
                          Select your seat(s)
                        </h2>
                        <p className="text-sm text-black">
                          Choose a preferred seat for your travel
                        </p>
                      </div>
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
                      <button className="flex xxl:hidden mb-3">
                        <figure>
                          <InfoIcon className="mr-2" />
                        </figure>
                        <span className="ml-2 text-xs text-black font-title text-left">
                          See what the color codes for our seats mean&nbsp;
                          <span
                            className="underline text-primary-main"
                            onClick={() => setShow(true)}
                          >
                            here
                          </span>
                        </span>
                      </button>
                    </div>
                    {/* Seat Info */}
                  </div>
                  <div className="basis-full xlg:basis-[70%] pt-4">
                    <PlaneSeats />
                  </div>
                </div>

                <div className="hidden lg:flex mx-6">
                  <button className="btn btn-outline mr-4">Go Back</button>
                  <button className="btn btn-primary">Check In</button>
                </div>
              </section>
            </div>
          </section>
        </section>
      </BaseLayout>
      <Popup display={showPopUp} closeModal={() => setShow(false)} top={true}>
        <Seatslegend />
      </Popup>
      <Popup
        display={showEmergency}
        closeModal={() => setEmergency(false)}
        top={true}
        width="w-[507px]"
      >
        <section className="w-full bg-white rounded-xl ">
          <div className="flex flex-col items-center justify-center p-[50px]">
            <h6 className="font-display text-xl mb-5">Emergency Seats</h6>

            <p className="text-center font-body text-sm mb-6">
              Sorry, this seat can only be reserved for passengers that are at
              least 18 years old with no visual or hearing impairment; must have
              sufficient mobility, strength and dexterity in both arms, hands
              and legs to assist in an evacuation.
            </p>
            <div className="flex items-center justify-between w-full">
              <button className="btn btn-primary basis-[48%]  mr-2">
                Accept
              </button>
              <button className="btn btn-outline basis-[48%]">Cancel</button>
            </div>
          </div>
        </section>
      </Popup>
    </Fragment>
  );
};

export default SeatSelection;
