/* eslint-disable @next/next/no-img-element */
import { Fragment, useState, useEffect, useRef } from "react";
import { format } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/router";
import BaseLayout from "layouts/Base";
import FlightIcon from "assets/svgs/FlightTwo.svg";
import ProfileIcon from "assets/svgs/profile.svg";
import IbeSidebar from "containers/IbeSidebar";
import Spinner from "components/Spinner";
import Popup from "components/Popup";
import Seatslegend from "containers/Seats/SeatPopUp";
import PlaneSeats from "containers/Seats/PlaneSeats";

import InfoIcon from "assets/svgs/seats/info.svg";

import { useSelector, useDispatch } from "react-redux";
import {
  sessionSelector,
  startSession,
  retrieveSeatAvailability,
} from "redux/reducers/session";

const SeatSelection = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [showPopUp, setShow] = useState(false);
  const [ticketIndex, setTicketIndex] = useState(0);
  const [showEmergency, setEmergency] = useState(false);
  const [pasengerState, setPassengerState] = useState(null);
  const [passengerNumber, setpassengerNumber] = useState(null);
  const [assignment, setAssignment] = useState([]);
  const [seatSelected, setSeatSelected] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState([]);

  const {
    signature,
    seatResponseLoading,
    seatAvailability,
    isLoading,
    bookingCommitResponse,
    sessionPassengers,
    bookingState,
  } = useSelector(sessionSelector);

  const handleChange = (e, isWithInfant) => {
    setPassengerState(isWithInfant);
    setpassengerNumber(e.target.value);
  };

  useEffect(() => {
    async function redirectToSSR() {
      if (bookingCommitResponse) {
        router.push("/trip/payment");
      }
    }
    redirectToSSR();
  }, [bookingCommitResponse]);

  useEffect(() => {
    async function getAvailability() {
      if (signature) {
        await dispatch(retrieveSeatAvailability({ ticketIndex }));
      }
    }
    getAvailability();
  }, []);

  const childRef = useRef(null);

  const handleClick = () => {
    childRef.current.assignSeat();
  };

  return (
    <Fragment>
      <BaseLayout>
        <section className="w-full checkin">
          <section className="ga__section bg-normal">
            <div className="ga__section__main standalone">
              <div className="mb-8">
                <h2 className="text-black font-bold text-2xl mb-2">
                  Seat Selection
                </h2>
              </div>

              <section className="flex flex-col bg-white pb-24">
                {/* TripHeader */}
                <section className="ibe__flight__info__destination">
                  <p>Seat Selection</p>
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
                        <h2 className="text-black font-semibold font-header text-xl mb-3">
                          Select your seat(s)
                        </h2>
                        <p className="text-black">
                          Choose a preferred seat for your travel
                        </p>
                      </div>
                      <h3 className="title-text">PASSENGER DETAILS</h3>
                      {bookingState?.Passengers.map((passenger, index) => (
                        <>
                          <div className="flex items-center mb-4" key={index}>
                            <input
                              id={`passenger-${index}`}
                              type="radio"
                              value={passenger.PassengerNumber}
                              name="passenger-state"
                              onChange={(e) =>
                                handleChange(
                                  e,
                                  passenger.PassengerInfants.length
                                )
                              }
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mb-2"
                            />
                            <label
                              htmlFor={`passenger-${index}`}
                              className="ml-2"
                            >
                              <div className="flex mb-6 mt-4">
                                <div className="flex flex-col w-[53px] mr-4">
                                  <div className="bg-purple-light h-[50px] rounded-t-[3px] flex justify-center items-center">
                                    <ProfileIcon />
                                  </div>
                                </div>
                                <div className="flex flex-col">
                                  <h5 className="text-base font-extrabold text-primary-main font-display mb-2">
                                    {passenger.Names[0].FirstName}{" "}
                                    {passenger.Names[0].LastName}
                                  </h5>
                                  <h6 className="text-base text-[#261F5E] font-title">
                                    {selectedSeat[index]?.seatDesignator
                                      .length > 0
                                      ? `Seat Number: ${selectedSeat[index].seatDesignator}`
                                      : "No Seat Selected"}
                                  </h6>
                                </div>
                              </div>
                            </label>
                          </div>
                          {/* <div className="flex mb-6 mt-4">
                              <div className="flex flex-col w-[53px] mr-4">
                                <div className="bg-purple-light h-[50px] rounded-t-[3px] flex justify-center items-center">
                                  <ProfileIcon />
                                </div>
                              </div>
                              <div className="flex flex-col">
                                <h5 className="text-base font-extrabold text-primary-main font-display mb-2">
                                  {passenger.Names[0].FirstName}{" "}
                                  {passenger.Names[0].LastName}
                                </h5>
                                <h6 className="text-base text-[#261F5E] font-title">
                                  DOB:
                                  {bookingResponse &&
                                    format(
                                      new Date(
                                        passenger
                                          ? passenger.PassengerTypeInfo.DOB
                                          : ""
                                      ),
                                      "MMMM dd, yyyy"
                                    )}
                                </h6>
                              </div>
                            </div> */}
                        </>
                      ))}
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
                      <div className="hidden lg:flex pr-3 my-4">
                        <Link
                          href="/trip/payment"
                          className="btn btn-outline mr-4"
                        >
                          <a className="btn btn-outline mr-4 text-center">
                            Skip
                          </a>
                        </Link>
                        {seatSelected && (
                          <button
                            className="btn btn-primary"
                            onClick={handleClick}
                            disabled={isLoading}
                          >
                            {isLoading ? "Assigning..." : "Continue"}
                          </button>
                        )}
                      </div>
                    </div>
                    {/* Seat Info */}
                  </div>
                  <div className="basis-full xlg:basis-[70%] pt-4 h-[650px]  scrollable overflow-y-scroll mt-12 xlg:mt-0">
                    {seatResponseLoading && seatAvailability === null ? (
                      <section className="py-10 pl-12 text-center">
                        <Spinner />
                      </section>
                    ) : (
                      <PlaneSeats
                        pasengerState={pasengerState}
                        passengerNumber={passengerNumber}
                        pasengerCount={bookingState?.Passengers.length}
                        key={ticketIndex + 1}
                        data={
                          seatAvailability?.EquipmentInfos[0].Compartments[0]
                            .Seats
                        }
                        ref={childRef}
                        setSeatSelected={setSeatSelected}
                        setSelectedSeat={setSelectedSeat}
                        selectedSeat={selectedSeat}
                      />
                    )}
                  </div>
                </div>

                {/* <div className="hidden lg:flex mx-6">
                  <button className="btn btn-outline mr-4">Go Back</button>
                  <button className="btn btn-primary">Check In</button>
                </div> */}
              </section>
            </div>
            <div className="ga__section__side">
              <IbeSidebar />
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
