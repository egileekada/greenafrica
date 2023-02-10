/* eslint-disable @next/next/no-img-element */
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import BaseLayout from "layouts/Base";
import FlightIcon from "assets/svgs/FlightTwo.svg";
import AeroTwoIcon from "assets/svgs/aerotwo.svg";
import DottedLine from "assets/svgs/dotted-line.svg";
import Fare from "containers/IbeSummary/Fare";
import SummaryDetails from "containers/IbeSummary/SummaryDetails";
import { useDispatch, useSelector } from "react-redux";
import {
  GetBookingDetails,
  setSelectedSessionFare,
  setSelectedSessionJourney,
  sessionSelector,
} from "redux/reducers/session";
import { format, differenceInMinutes } from "date-fns";
import { timeConvert } from "utils/common";
import IbeAdbar from "containers/IbeAdbar";
import { encryptPnr } from "lib/utils";
import { atcb_action } from "add-to-calendar-button";
import "add-to-calendar-button/assets/css/atcb.css";
import { useRouter } from "next/router";
import LogoIcon from "assets/svgs/logo.svg";
import {
  useGetLocationsQuery,
  useGetProductsQuery,
} from "services/widgetApi.js";
import SkeletonLoader from "components/SkeletonLoader";

const TripConfirm = () => {
  const router = useRouter();
  const { data, isLoading: locationLoading } = useGetLocationsQuery();
  const { data: products, isLoading: productsLoading } = useGetProductsQuery();
  let componentRef = useRef();
  const dispatch = useDispatch();
  // const [segmentInfo, setSegmentInfo] = useState(null);
  const [isRoundTrip, setIsRoundTrip] = useState(false);

  const { bookingResponseLoading, bookingResponse, signature } =
    useSelector(sessionSelector);

  const ScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    ScrollToTop();
  }, []);

  // Don't re work - it currently breaks code
  useEffect(() => {
    async function fetchBookingDetails() {
      dispatch(GetBookingDetails());
    }
    fetchBookingDetails();
  }, []);

  useEffect(() => {
    if (bookingResponse) {
      bookingResponse?.Booking?.Journeys.length > 1 && setIsRoundTrip(true);
    }
  }, [bookingResponse]);

  useEffect(() => {
    async function resetSelectedJourneys() {
      dispatch(setSelectedSessionFare(null));
      dispatch(setSelectedSessionJourney(null));
    }
    resetSelectedJourneys();
  }, []);

  const goBackToHome = () => {
    window.location.assign("https://dev-website.gadevenv.com/");
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

  const WelcomeNote = () => {
    return (
      <div className="mb-8 mt-16 xlg:mt-0">
        <h2 className="text-black font-bold text-2xl mb-4">
          Booking Confirmed
        </h2>
        <p>
          Thank you for booking your travel wIth Green Africa. Below is a
          summary of your trip, We’ve also sent a copy of your booking
          confirmation to your email address.{" "}
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
            <section className="basis-full md:basis-[48%] relative">
              <p className="bg-primary-main text-green text-xs py-1 px-4 rounded-[4px] absolute left-6 top-11">
                {!productsLoading &&
                  fare_name(_journey?.Segments[0].Fares[0].ProductClass)}
              </p>
              {_journey?.Segments.map((_segment) => {
                return (
                  <p className="text-primary-main text-sm font-body font-normal mb-4">
                    {_journeyIndex === 0 ? "Departing" : "Returning"} on &nbsp;
                    {format(new Date(_segment?.STD), "MMM dd, yyyy")}
                  </p>
                );
              })}

              <section className="ibe__trip__item summaryView bordered mb-9 !px-3 md:!px-6 !lg-px-10">
                <div className="basis-full flex  flex-col min-h-[54px]">
                  {_journey?.Segments.map((_segment) => {
                    return (
                      <p className="tripType self-center">
                        {_segment.FlightDesignator.CarrierCode}{" "}
                        {_segment.FlightDesignator.FlightNumber}
                      </p>
                    );
                  })}
                  <div className="flex justify-between items-center">
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
                          <p className="tripCity right-left">
                            {!locationLoading &&
                              resolveAbbreviation(_segment?.DepartureStation)}
                          </p>
                        );
                      })}
                    </div>
                    <div className="">
                      <svg
                        className="w-full mx-auto"
                        height="22"
                        viewBox="0 0 245 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <line
                          x1="-0.000309132"
                          y1="10.5618"
                          x2="99.9997"
                          y2="10.4999"
                          stroke="#9E9BBF"
                          stroke-opacity="0.3"
                          stroke-dasharray="2 2"
                        />
                        <line
                          x1="145"
                          y1="10.5"
                          x2="245"
                          y2="10.5"
                          stroke="#9E9BBF"
                          stroke-opacity="0.3"
                          stroke-dasharray="2 2"
                        />
                        <path
                          d="M130.149 11.731L130.15 11.709C130.206 10.6126 128.862 10.2909 128.862 10.2909L126.507 9.59643L125.521 6.94898C126.026 6.8646 126.402 6.55187 126.43 6.14002C126.466 5.60657 125.904 5.10922 125.175 5.02914C125.047 5.01513 124.923 5.01511 124.805 5.02697L124.048 2.99418L122.728 2.68608L123.875 9.37227L119.69 9.51318L118.883 7.2923L118.291 7.22667L117.865 13.5617L118.457 13.626L119.549 11.6137L123.654 12.6651L121.632 19.0033L122.973 18.9874L123.99 17.1495C124.105 17.187 124.227 17.214 124.355 17.228C125.084 17.3081 125.704 16.9406 125.74 16.4072C125.768 15.9953 125.439 15.6051 124.952 15.4117L126.277 13.0181L128.69 12.8473C128.69 12.8473 130.057 12.8234 130.149 11.731Z"
                          fill="#9E9BBF"
                        />
                      </svg>
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
                            {!locationLoading &&
                              resolveAbbreviation(_segment?.ArrivalStation)}
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

  // Generate add booking to calendar data
  const myData = [];

  bookingResponse?.Booking?.Journeys.forEach((journey) => {
    const data = {
      name: `Flight to ${
        !locationLoading &&
        resolveAbbreviation(journey.Segments[0].ArrivalStation)
      } (${journey.Segments[0].FlightDesignator?.CarrierCode} ${
        journey.Segments[0].FlightDesignator?.FlightNumber
      })`,
      description: `Green Africa flight ${
        journey.Segments[0].FlightDesignator?.CarrierCode
      } ${journey.Segments[0].FlightDesignator?.FlightNumber} | ${
        !locationLoading &&
        resolveAbbreviation(journey.Segments[0].DepartureStation)
      } (${journey.Segments[0].DepartureStation}) ${format(
        new Date(journey.Segments[0]?.STD),
        "hh:mm bbb"
      )} (local time) - ${
        !locationLoading &&
        resolveAbbreviation(journey.Segments[0].ArrivalStation)
      } (${journey.Segments[0].ArrivalStation}) ${format(
        new Date(journey.Segments[0]?.STA),
        "hh:mm bbb"
      )} (local time)
        
      Booking number: ${bookingResponse?.Booking?.RecordLocator}`,
      startDate: format(new Date(journey.Segments[0]?.STD), "yyyy-MM-dd"),
      startTime: format(new Date(journey.Segments[0]?.STD), "HH:mm"),
      endTime: format(new Date(journey.Segments[0]?.STA), "HH:mm"),
    };
    myData.push(data);
  });

  return (
    <BaseLayout>
      <nav className="top__bar logo-holder">
        <button onClick={goBackToHome}>
          <figure className="cursor-pointer">
            <LogoIcon />
          </figure>
        </button>
      </nav>
      <section className="w-full">
        {bookingResponseLoading ? (
          <section className="py-32 lg:py-12 px-12">
            <SkeletonLoader />
            <SkeletonLoader />
            <SkeletonLoader />
            <SkeletonLoader />
          </section>
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
                    <div className="flex flex-wrap md:flex-nowrap justify-between px-6 lg:px-12 mb-4">
                      <Journeys />
                    </div>
                    <PassengeAndFare isRoundTrip={isRoundTrip} />

                    {/* CTA */}
                    <section className="flex  flex-wrap md:flex-nowrap items-center px-6 lg:px-12">
                      <button
                        className="btn btn-primary font-title block h-full mb-3 md:mb-0 md:mr-3"
                        onClick={() =>
                          atcb_action({
                            name: "name",
                            dates: myData,
                            options: [
                              "Apple",
                              "Google",
                              "iCal",
                              "Microsoft365",
                              "Outlook.com",
                              "Yahoo",
                            ],
                            iCalFileName: "Reminder-Event",
                          })
                        }
                      >
                        Add to Calendar
                      </button>
                      <Link
                        href={`/bookings/home?bookingId=${encryptPnr(
                          bookingResponse?.Booking?.RecordLocator
                        )}`}
                      >
                        <a className="basis-full md:basis-[30%] tab:basis-[20%] btn btn-primary mr-0 md:mr-2 mb-4 md:mb-0 text-center">
                          Manage Booking
                        </a>
                      </Link>
                      <Link
                        href={`/checkin/home?bookingId=${encryptPnr(
                          bookingResponse?.Booking?.RecordLocator
                        )}`}
                      >
                        <a className="basis-full md:basis-[30%] tab:basis-[20%] btn btn-outline mr-2 md:mr-2 text-center flex justify-center">
                          Check In
                        </a>
                      </Link>
                      <button
                        className="basis-full md:basis-[30%] tab:basis-[20%] btn btn-outline mr-2 md:mr-2 mt-4 md:mt-0"
                        onClick={goBackToHome}
                      >
                        Back to Home
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
