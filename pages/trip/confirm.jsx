/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import BaseLayout from "layouts/Base";
import IbeSidebar from "containers/IbeSidebar";
import FlightIcon from "assets/svgs/FlightTwo.svg";
import AeroIcon from "assets/svgs/aero.svg";
import DottedLine from "assets/svgs/dotted-line.svg";
import Fare from "containers/IbeSummary/Fare";
import SummaryDetails from "containers/IbeSummary/SummaryDetails";
import { useDispatch, useSelector } from "react-redux";
import { GetBookingDetails, sessionSelector } from "redux/reducers/session";
import Spinner from "components/Spinner";
import { format, differenceInMinutes } from "date-fns";
import { timeConvert } from "utils/common";

const TripConfirm = () => {
  const dispatch = useDispatch();
  const { bookingResponseLoading, bookingResponse } =
    useSelector(sessionSelector);
  const [segmentInfo, setsegmentInfo] = useState(null);

  useEffect(() => {
    async function fetchBookingDetails() {
      dispatch(GetBookingDetails());
    }
    fetchBookingDetails();
  }, []);

  useEffect(() => {
    if (bookingResponse) {
      let _times = {};
      bookingResponse?.Booking?.Journeys.map((_journeys) => {
        _journeys.Segments.map((_segment) => {
          _times = {
            STA: _segment?.STA,
            STD: _segment?.STD,
            ArrivalStation: _segment?.ArrivalStation,
            DepartureStation: _segment?.DepartureStation,
            FlightDesignator: _segment?.FlightDesignator,
            FlightDuration: differenceInMinutes(
              new Date(_segment?.STA),
              new Date(_segment?.STD)
            ),
          };
        });
      });
      setsegmentInfo({
        ..._times,
      });
    }
  }, [bookingResponse]);

  return (
    <BaseLayout>
      <section className="w-full">
        {bookingResponseLoading ? (
          <Spinner />
        ) : (
          <section className="ga__section">
            {bookingResponse ? (
              <>
                <div className="ga__section__main">
                  <div className="mb-8 mt-16 xlg:mt-0">
                    <h2 className="text-black font-bold text-2xl mb-4">
                      Booking Confirmed
                    </h2>
                    <p>
                      Thank you for booking your travel wIth Green Africa. Below
                      is a summary of your{" "}
                      <span className="font-display">One way</span> trip to{" "}
                      <span className="font-display">Abuja</span>. We’ve also
                      sent a copy of your booking confirmation to your email
                      address.{" "}
                    </p>
                  </div>

                  <section className="flex flex-col bg-white pb-20 trip__summary">
                    {/* TripHeader */}
                    <section className="ibe__flight__info__destination">
                      <p>Booking Code: {bookingResponse?.Booking?.BookingID}</p>
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
                          Departing on &nbsp;
                          {format(
                            new Date(
                              bookingResponse?.Booking?.BookingInfo?.BookingDate
                            ),
                            "MMM dd, yyyy"
                          )}
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
                              {segmentInfo &&
                                format(new Date(segmentInfo?.STD), "HH:mm")}
                            </h5>

                            <p className="font-semibold font-body text-xs lg:text-sm text-black text-left">
                              {segmentInfo && segmentInfo?.DepartureStation}
                            </p>
                          </div>
                          <div className="tripIconPath">
                            <DottedLine className="dotted-svg" />
                            <AeroIcon className="aero-svg" />
                            <DottedLine className="dotted-svg" />
                          </div>
                          <div className="flex flex-col  items-end">
                            <h5 className="font-extrabold font-header text-xl lg:text-2xl text-primary-main text-left">
                              {segmentInfo &&
                                format(new Date(segmentInfo?.STA), "HH:mm")}
                            </h5>
                            <p className="tripCity right-text">
                              {segmentInfo && segmentInfo?.ArrivalStation}
                            </p>
                          </div>
                        </div>
                        <p className="tripTime self-center">
                          {segmentInfo &&
                            timeConvert(segmentInfo?.FlightDuration)}
                        </p>
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
              </>
            ) : (
              <div className="py-8 fit-x-bleed">
                <h2 className="errorText text-base">
                  Error occured fetching booking details
                </h2>
              </div>
            )}
          </section>
        )}
      </section>
    </BaseLayout>
  );
};

export default TripConfirm;
