/* eslint-disable @next/next/no-img-element */
import { useEffect } from "react";
import Link from "next/link";
import BaseLayout from "layouts/Base";
import FlightIcon from "assets/svgs/FlightTwo.svg";
import AeroIcon from "assets/svgs/aero.svg";
import GreenCheck from "assets/svgs/green.svg";
import DottedLine from "assets/svgs/dotted-line.svg";
import ProfileIcon from "assets/svgs/profile.svg";
import IbeAdbar from "containers/IbeAdbar";
import SkeletonLoader from "components/SkeletonLoader";
import { format, formatDistanceStrict } from "date-fns";
import {
  useGetLocationsQuery,
  useGetProductsQuery,
} from "services/widgetApi.js";
import { useGetBookingMutation } from "services/bookingApi";

import { useSelector, useDispatch } from "react-redux";
import { sessionSelector, GetBookingDetails } from "redux/reducers/session";
import { paymentSelector } from "redux/reducers/payment";

const CheckInDetails = () => {
  const dispatch = useDispatch();
  const { data, isLoading: locationLoading } = useGetLocationsQuery();
  const { data: products, isLoading: productsLoading } = useGetProductsQuery();
  const [initGetBooking, { isLoading, error, isError }] =
    useGetBookingMutation();

  const { bookingResponse, bookingState } = useSelector(sessionSelector);

  const { verifyPaymentResponse } = useSelector(paymentSelector);

  const ScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const resolveAbbreviation = (abrreviation) => {
    const [{ name, code }] = data?.data?.items.filter(
      (location) => location.code === abrreviation
    );

    return `${name} (${code})`;
  };

  const fare_name = (value) => {
    const [{ name }] = products?.data?.items.filter(
      (product) => product.code === value
    );
    return `${name}`;
  };

  useEffect(() => {
    ScrollToTop();
  }, []);

  //Don't re work - it currently breaks code
  useEffect(() => {
    async function fetchBookingDetails() {
      initGetBooking(
        verifyPaymentResponse?.data?.pnr || bookingState.RecordLocator
      )
        .unwrap()
        .then((data) => {})
        .catch((error) => console.log(error));
    }
    fetchBookingDetails();
  }, []);

  console.log(verifyPaymentResponse?.data?.pnr);

  return (
    <BaseLayout>
      {isLoading ? (
        <section className="spinner__container">
          <SkeletonLoader />
          <SkeletonLoader />
          <SkeletonLoader />
        </section>
      ) : (
        <>
          {isError ? (
            <section className="">
              <div className="ga__section__main">
                <div className="mb-8 pt-16 h-[300px] text-center">
                  <h2 className="text-black text-3xl mb-2">
                    An error Occured!
                  </h2>

                  <div className="flex">
                    <Link href="/">
                      <a className="btn btn-outline md:basis-auto mt-5 mx-auto">
                        Go to Home
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          ) : (
            <>
              <section className="flex items-center justify-center bg-green px-3 py-3 pt-24 lg:pt-3">
                <p className="text-center">
                  Boarding pass has been emailed to{" "}
                  {bookingResponse?.Booking?.BookingContacts[0].EmailAddress}
                </p>
              </section>
              <section className="w-full checkin">
                <section className="ga__section">
                  <div className="ga__section__main">
                    <div className="mb-8 mt-16 xlg:mt-0">
                      <h2 className="text-black font-bold text-2xl mb-2">
                        Check In
                      </h2>
                      <p>
                        Kindly confirm that the information below is correct
                        before checking in
                      </p>
                    </div>

                    <section className="flex flex-col bg-white pb-24">
                      {/* TripHeader */}
                      <section className="ibe__flight__info__destination">
                        <p>
                          Booking Code:{" "}
                          {bookingResponse?.Booking?.RecordLocator}
                        </p>
                        {/* <figure className="absolute -left-6"> */}
                        <figure className="flightCircle">
                          <FlightIcon />
                        </figure>
                      </section>
                      {/* TripHeader*/}
                      {/* Trip Itenary */}

                      {bookingResponse?.Booking?.Journeys.map(
                        (Journey, index) => (
                          <>
                            <div className="mx-6 mt-12 flex flex-col">
                              <h3 className="title-text">PASSENGER DETAILS</h3>

                              {bookingResponse?.Booking?.Passengers.map(
                                (passenger, pIndex) => (
                                  <div className="flex mb-6 mt-4">
                                    <div className="flex flex-col w-[53px] mr-4">
                                      <div className="bg-purple-light h-[50px] rounded-t-[3px] flex justify-center items-center">
                                        <ProfileIcon />
                                      </div>
                                    </div>
                                    <div className="flex flex-col">
                                      <h5 className="font-extrabold text-primary-main font-display mb-2">
                                        {passenger.Names[0].FirstName}{" "}
                                        {passenger.Names[0].LastName}
                                      </h5>
                                      <h6 className="text-[12px] text-[#9692B8] font-title">
                                        {Journey.Segments[0].PaxSeats.length >
                                          0 && (
                                          <h5 className="flex items-center text-center">
                                            <span>
                                              {
                                                Journey.Segments[0].PaxSeats[
                                                  pIndex
                                                ]?.UnitDesignator
                                              }
                                            </span>
                                          </h5>
                                        )}
                                      </h6>
                                    </div>
                                  </div>
                                )
                              )}
                            </div>

                            <div className="mx-6">
                              <h3 className="title-text">
                                DEPARTURE:{" "}
                                {bookingResponse &&
                                  format(
                                    new Date(
                                      bookingResponse
                                        ? Journey?.Segments[0].STD
                                        : ""
                                    ),
                                    "MMMM dd, yyyy"
                                  )}
                              </h3>
                            </div>
                            <section
                              className="ibe__trip__item checkinView bordered mx-6 my-3"
                              key={index}
                            >
                              <p className="bg-primary-main text-green py-1 px-4 rounded-[4px] absolute left-6 top-5">
                                {!productsLoading &&
                                  fare_name(
                                    Journey?.Segments[0].Fares[0].ProductClass
                                  )}
                              </p>
                              <div className="basis-full lg:basis-[60%] w-full flex flex-col min-h-[54px] px-6 mb-10 mt-5">
                                <p className="tripType self-center">
                                  {
                                    bookingResponse?.Booking?.Journeys[0]
                                      ?.Segments[0]?.FlightDesignator
                                      .CarrierCode
                                  }
                                  {
                                    bookingResponse?.Booking?.Journeys[0]
                                      ?.Segments[0]?.FlightDesignator
                                      .FlightNumber
                                  }
                                </p>
                                <div className="flex justify-between">
                                  <div className="flex flex-col">
                                    <h5 className="tripType">
                                      {bookingResponse &&
                                        format(
                                          new Date(Journey.Segments[0].STD),
                                          "HH:mm"
                                        )}
                                    </h5>
                                    <p className="tripCity">
                                      {!locationLoading &&
                                        resolveAbbreviation(
                                          Journey?.Segments[0]?.ArrivalStation
                                        )}
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
                                          new Date(Journey.Segments[0].STA),
                                          "HH:mm"
                                        )}
                                    </h5>
                                    <p className="tripCity right-text">
                                      {!locationLoading &&
                                        resolveAbbreviation(
                                          Journey?.Segments[0]?.DepartureStation
                                        )}
                                    </p>
                                  </div>
                                </div>
                                <p className="tripTime self-center">
                                  {bookingResponse &&
                                    formatDistanceStrict(
                                      new Date(Journey?.Segments[0]?.STD),
                                      new Date(Journey?.Segments[0]?.STA)
                                    )}
                                </p>
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
                                  </h5>
                                </div>
                                <div className="trip-details-item">
                                  <h6>BAGGAGES</h6>
                                  <h5 className="flex items-center">
                                    <span>0</span>
                                  </h5>
                                </div>
                                <div className="trip-details-item">
                                  <h6>MEALS</h6>
                                  <h5 className="flex items-center">
                                    <span>0</span>
                                  </h5>
                                </div>
                                <div className="flex flex-wrap md:flex-nowrap items-center justify-between ml-auto">
                                  <button className="btn btn-primary md:mr-1 basis-full md:basis-auto mb-3 md:mb-0">
                                    Download Boarding Pass
                                  </button>
                                  <button className="btn btn-outline  basis-full md:basis-auto">
                                    Email Boarding Pass
                                  </button>
                                </div>
                              </div>
                            </section>
                          </>
                        )
                      )}

                      <section className="flex items-center mx-6 my-3">
                        <figure className="mr-1">
                          <GreenCheck />
                        </figure>
                        <p>You have been checked in successfully</p>
                      </section>
                      {/* Checkin Info*/}
                    </section>
                  </div>
                  <div className="ga__section__side">
                    <IbeAdbar />
                  </div>
                </section>
              </section>
            </>
          )}
        </>
      )}
    </BaseLayout>
  );
};

export default CheckInDetails;
