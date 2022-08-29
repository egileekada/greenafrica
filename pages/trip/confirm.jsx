/* eslint-disable @next/next/no-img-element */
import { useEffect, useState, useRef } from "react";
import BaseLayout from "layouts/Base";
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
import IbeAdbar from "containers/IbeAdbar";
import ReactToPrint from "react-to-print";
import { useRouter } from "next/router";

const TripConfirm = () => {
  const router = useRouter();
  let componentRef = useRef();
  const dispatch = useDispatch();
  const [segmentInfo, setSegmentInfo] = useState(null);
  const [isRoundTrip, setIsRoundTrip] = useState(false);

  const { bookingResponseLoading, bookingResponse, signature } =
    useSelector(sessionSelector);

  // useEffect(() => {
  //   async function fetchBookingDetails() {
  //     dispatch(GetBookingDetails());
  //   }
  //   fetchBookingDetails();
  // }, []);

  useEffect(() => {
    if (bookingResponse) {
      bookingResponse?.Booking?.Journeys.length > 1 && setIsRoundTrip(true);
    }
  }, [bookingResponse]);

  const WelcomeNote = () => {
    return (
      <div className="mb-8 mt-16 xlg:mt-0">
        <h2 className="text-black font-bold text-2xl mb-4">
          Booking Confirmed
        </h2>
        <p>
          Thank you for booking your travel wIth Green Africa. Below is a
          summary of your{" "}
          <span className="font-display">
            {" "}
            {isRoundTrip ? "Round" : "One Way"}
          </span>{" "}
          trip from{" "}
          <span className="font-display font-bold">
            {segmentInfo?.DepartureStation}
          </span>
          &nbsp;to&nbsp;
          <span className="font-display font-bold">
            {segmentInfo?.ArrivalStation}
          </span>
          . We’ve also sent a copy of your booking confirmation to your email
          address.{" "}
        </p>
      </div>
    );
  };

  const TripHeader = () => {
    return (
      <section className="ibe__flight__info__destination">
        <p>Booking Code: {bookingResponse?.Booking?.RecordLocator}</p>
        <figure className="flightCircle">
          <FlightIcon />
        </figure>
      </section>
    );
  };

  const TicketCTA = () => {
    return (
      <div className="flex flex-wrap md:flex-nowrap justify-between px-6 lg:px-12 py-6 lg:py-8">
        <div className="basis-full md:basis-auto mb-4 md:mb-0 flex flex-col">
          <h2 className="trip-title mb-3">FLIGHT SUMMARY</h2>
        </div>

        <ReactToPrint
          trigger={() => (
            <button
              className="basis-full md:basis-auto btn btn-outline"
              onClick={() => print()}
            >
              Download Ticket
            </button>
          )}
          content={() => componentRef}
        />
        {/* <button
          className="basis-full md:basis-auto btn btn-outline"
          onClick={() => print()}
        >
          Download Ticket
        </button> */}
      </div>
    );
  };

  const Journeys = () => {
    return (
      <>
        {bookingResponse?.Booking?.Journeys.map((_journey, _journeyIndex) => {
          return (
            <section className="flex flex-col">
              {_journey?.Segments.map((_segment) => {
                return (
                  <p className="text-primary-main text-sm font-body font-normal px-6 lg:px-12 mb-4">
                    {_journeyIndex === 0 ? "Departing" : "Returning"} on &nbsp;
                    {format(new Date(_segment?.STD), "MMM dd, yyyy")}
                  </p>
                );
              })}

              <section className="ibe__trip__item summaryView bordered mx-6 lg:mx-12 mb-9">
                <div className="basis-full flex  flex-col min-h-[54px] ">
                  <p className="tripType self-center">Direct Flight</p>
                  <div className="flex justify-between">
                    <div className="flex flex-col">
                      {_journey?.Segments.map((_segment) => {
                        return (
                          <h5 className="font-extrabold font-header text-xl lg:text-2xl text-primary-main text-left">
                            {format(new Date(_segment?.STD), "HH:mm")}
                          </h5>
                        );
                      })}

                      {_journey?.Segments.map((_segment) => {
                        return (
                          <p className="font-semibold font-body text-xs lg:text-sm text-black text-left">
                            {_segment?.DepartureStation}
                          </p>
                        );
                      })}
                    </div>
                    <div className="tripIconPath">
                      <DottedLine className="dotted-svg" />
                      <AeroIcon className="aero-svg" />
                      <DottedLine className="dotted-svg" />
                    </div>
                    <div className="flex flex-col  items-end">
                      {_journey?.Segments.map((_segment) => {
                        return (
                          <h5 className="font-extrabold font-header text-xl lg:text-2xl text-primary-main text-left">
                            {format(new Date(_segment?.STA), "HH:mm")}
                          </h5>
                        );
                      })}

                      {_journey?.Segments.map((_segment) => {
                        return (
                          <p className="tripCity right-text">
                            {_segment?.ArrivalStation}
                          </p>
                        );
                      })}
                    </div>
                  </div>

                  {_journey?.Segments.map((_segment) => {
                    return (
                      <p className="tripTime self-center">
                        {timeConvert(
                          differenceInMinutes(
                            new Date(_segment?.STA),
                            new Date(_segment?.STD)
                          )
                        )}
                      </p>
                    );
                  })}
                </div>
              </section>
            </section>
          );
        })}
      </>
    );
  };

  const PassengeAndFare = ({ isRoundTrip }) => {
    return (
      <section className="flex flex-wrap md:flex-nowrap justify-between px-6 lg:px-12 mb-4">
        <div className="basis-full md:basis-[48%] mb-12 md:mb-0">
          <SummaryDetails isRoundTrip={isRoundTrip} />
        </div>
        <div className="basis-full md:basis-[48%]">
          <Fare isRoundTrip={isRoundTrip} />
        </div>
      </section>
    );
  };

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
                  <WelcomeNote />

                  <section
                    className="flex flex-col bg-white pb-20 trip__summary"
                    ref={(el) => (componentRef = el)}
                  >
                    <TripHeader />
                    <TicketCTA />
                    <Journeys />
                    <PassengeAndFare isRoundTrip={isRoundTrip} />

                    {/* CTA */}
                    <section className="flex  flex-wrap md:flex-nowrap items-center px-6 lg:px-12">
                      <button
                        className="basis-full md:basis-[30%] tab:basis-[20%] btn btn-primary mr-0 md:mr-2 mb-4 md:mb-0"
                        onClick={() =>
                          router.push(
                            `/bookings?pnr=${bookingResponse?.Booking?.RecordLocator}&signature=${signature}`
                          )
                        }
                      >
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
                  <IbeAdbar />
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
