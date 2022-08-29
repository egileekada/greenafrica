/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import { format, formatDistanceStrict } from "date-fns";
import { useRouter } from "next/router";
import Link from "next/link";
import BaseLayout from "layouts/Base";
import FlightIcon from "assets/svgs/FlightTwo.svg";
import AeroIcon from "assets/svgs/aero.svg";
import DottedLine from "assets/svgs/dotted-line.svg";
import ProfileIcon from "assets/svgs/profile.svg";
import Spinner from "components/Spinner";
import CheckInCard from "components/Cards/checkin";
import IbeAdbar from "containers/IbeAdbar";

import { useSelector, useDispatch } from "react-redux";
import {
  sessionSelector,
  startSession,
  retrieveBooking,
} from "redux/reducers/session";

const CheckInDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const { signature, sessionLoading, bookingResponseLoading, bookingResponse } =
    useSelector(sessionSelector);

  useEffect(() => {
    if (router.isReady) {
      async function initSession() {
        if (id) {
          dispatch(startSession());
        } else {
          console.log("Something went wrong");
        }
      }
      initSession();
    }
  }, [router.isReady]);

  useEffect(() => {
    async function getBooking() {
      if (signature) {
        dispatch(retrieveBooking({ id }));
      }
    }
    getBooking();
  }, [signature]);

  const PassengerBags = (_passenger) => {
    const _Baggages = _passenger.PassengerFees.filter((pax) => {
      return (
        pax.FeeCode === "XBAG20" ||
        pax.FeeCode === "XBAG15" ||
        pax.FeeCode === "XBAG10"
      );
    });
    return (
      <div className="trip-details-item">
        <h6>BAGGAGE{_Baggages.length > 1 ? "S" : ""}: </h6>
        <h5 className="flex items-center">
          <span>
            {_Baggages.length > 0 ? `${_Baggages.length}` : "No Baggage"}
          </span>
          {_Baggages.length > 0 ? (
            <Link href={`/checkin/baggage/?`}>
              <button className="btn btn-outline ml-4">Edit</button>
            </Link>
          ) : (
            <Link href={`/checkin/baggage/?`}>
              <button className="btn btn-outline ml-4">Add</button>
            </Link>
          )}
        </h5>
      </div>
    );
  };

  console.log(bookingResponse.Booking.BookingSum.BalanceDue > 0);
  console.log(bookingResponse.Booking.BookingSum.BalanceDue);

  return (
    <BaseLayout>
      <section className="w-full checkin">
        {sessionLoading || bookingResponseLoading ? (
          <section className="spinner__container">
            <Spinner />
          </section>
        ) : (
          <section className="ga__section">
            <div className="ga__section__main">
              <div className="mb-8 mt-16 xlg:mt-0">
                <h2 className="text-black font-bold text-2xl mb-2">Check In</h2>
                <p>
                  Kindly confirm that the information below is correct before
                  checking in
                </p>
              </div>

              <section className="flex flex-col bg-white pb-24">
                {/* TripHeader */}
                <section className="ibe__flight__info__destination">
                  <p className="text-normal">
                    Booking Code: {bookingResponse?.Booking.RecordLocator}
                  </p>
                  {/* <figure className="absolute -left-6"> */}
                  <figure className="flightCircle">
                    <FlightIcon />
                  </figure>
                </section>
                {/* TripHeader*/}
                {/* Trip Itenary */}
                {/* <div className="mx-6 mt-12 flex flex-col">
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
                </div> */}

                <div className="mx-6">
                  <h3 className="title-text">
                    DEPARTURE:{" "}
                    {bookingResponse &&
                      format(
                        new Date(
                          bookingResponse
                            ? bookingResponse?.Booking?.Journeys[0].Segments[0]
                                .STD
                            : ""
                        ),
                        "MMMM dd, yyyy"
                      )}
                  </h3>
                </div>

                <section className="ibe__trip__item checkinView bordered mx-6 my-3">
                  <p className="bg-primary-main text-green py-1 px-2  rounded-[4px] absolute left-6 top-3 ">
                    gSaver
                  </p>
                  <div className="basis-full lg:basis-[60%] w-full flex flex-col min-h-[54px] px-6 mb-10">
                    <p className="tripType self-center">Direct Flight</p>
                    <div className="flex justify-between">
                      <div className="flex flex-col">
                        <h5 className="tripType">
                          {bookingResponse &&
                            format(
                              new Date(
                                bookingResponse?.Booking?.Journeys[0].Segments[0].STD
                              ),
                              "HH:mm"
                            )}
                        </h5>
                        <p className="tripCity">
                          Lagos (
                          {
                            bookingResponse?.Booking?.Journeys[0]?.Segments[0]
                              ?.ArrivalStation
                          }
                          )
                        </p>
                      </div>
                      <div className="tripIconPath">
                        <DottedLine className="dotted-svg" />
                        <AeroIcon className="aero-svg" />
                        <DottedLine className="dotted-svg" />
                      </div>
                      <div className="flex flex-col  items-end">
                        <h5 className="tripType right-text">
                          {bookingResponse &&
                            format(
                              new Date(
                                bookingResponse?.Booking?.Journeys[0].Segments[0].STA
                              ),
                              "HH:mm"
                            )}
                        </h5>
                        <p className="tripCity right-text">
                          Abuja (
                          {
                            bookingResponse?.Booking?.Journeys[0]?.Segments[0]
                              ?.DepartureStation
                          }
                          )
                        </p>
                      </div>
                    </div>
                    <p className="tripTime self-center">
                      {bookingResponse &&
                        formatDistanceStrict(
                          new Date(
                            bookingResponse?.Booking?.Journeys[0]?.Segments[0]?.STD
                          ),
                          new Date(
                            bookingResponse?.Booking?.Journeys[0]?.Segments[0]?.STA
                          )
                        )}
                    </p>
                  </div>

                  <div className="trip-details">
                    <div className="trip-details-item">
                      <h6>FLIGHT NUMBER</h6>
                      <h5>
                        {
                          bookingResponse?.Booking?.Journeys[0]?.Segments[0]
                            ?.FlightDesignator.CarrierCode
                        }{" "}
                        {
                          bookingResponse?.Booking?.Journeys[0]?.Segments[0]
                            ?.FlightDesignator.FlightNumber
                        }
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

                <section className="mx-6">
                  <h3 className="title-text">PASSENGERS</h3>
                </section>

                {bookingResponse?.Booking.Passengers.map((passenger, index) => (
                  <section
                    className="ibe__trip__passengers checkinView mx-6 mb-3"
                    key={index}
                  >
                    <div className="md:flex bordered p-4">
                      <label className="md:w-2/3 block font-bold">
                        <input className="mr-2 leading-tight" type="checkbox" />
                        <span className="text-sm">
                          {passenger.Names[0].FirstName}{" "}
                          {passenger.Names[0].LastName}
                        </span>
                      </label>
                    </div>

                    <div className="trip-details">
                      <div className="trip-details-item">
                        <h6>SEAT NUMBER</h6>
                        {bookingResponse?.Booking?.Journeys[0].Segments[0]
                          .PaxSeats.length > 0 ? (
                          <h5 className="flex items-center">
                            <span>
                              {
                                bookingResponse?.Booking?.Journeys[0]
                                  .Segments[0].PaxSeats[index].UnitDesignator
                              }
                            </span>
                            <Link href={`/checkin/seat-selection/?`}>
                              <button className="btn btn-outline ml-4">
                                Edit
                              </button>
                            </Link>
                          </h5>
                        ) : (
                          <h5 className="flex items-center">
                            <span>{""}</span>
                            <Link href={`/checkin/seat-selection/?`}>
                              <button className="btn btn-outline ml-4">
                                Add
                              </button>
                            </Link>
                          </h5>
                        )}
                      </div>
                      {PassengerBags(passenger)}
                    </div>
                  </section>
                ))}

                {/* Checkin Info*/}
                <div className="flex mx-6 mt-5">
                  {bookingResponse.Booking.BookingSum.BalanceDue > 0 ? (
                    <Link href="/checkin/pay">
                      <a className="btn btn-primary">Pay & Check In </a>
                    </Link>
                  ) : (
                    <button className="btn btn-primary">Check In</button>
                  )}
                </div>
              </section>
            </div>
            <div className="ga__section__side">
              <IbeAdbar />
            </div>
          </section>
        )}
      </section>
    </BaseLayout>
  );
};

export default CheckInDetails;
