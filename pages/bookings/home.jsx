/* eslint-disable @next/next/no-img-element */
import { Fragment, useState, useEffect } from "react";
import BaseLayout from "layouts/Base";
import FlightIcon from "assets/svgs/FlightTwo.svg";
import AeroIcon from "assets/svgs/aero.svg";
import DottedLine from "assets/svgs/dotted-line.svg";
import IbeAdbar from "containers/IbeAdbar";
import SkeletonLoader from "components/SkeletonLoader";
import { useDispatch, useSelector } from "react-redux";
import {
  sessionSelector,
  GetBookingDetailsWithPNR,
} from "redux/reducers/session";
import { saveTripParams, saveReturnParams } from "redux/reducers/booking";
import { paymentSelector } from "redux/reducers/payment";
import { useRouter } from "next/router";
import Link from "next/link";
import { format, differenceInMinutes } from "date-fns";
import { timeConvert } from "utils/common";
import ManagePassengerItem from "containers/Booking/components/PassengerItem";
import { setManageBookingPnr } from "redux/reducers/booking";
import { useGetLocationsQuery } from "services/widgetApi.js";
import PageFares from "./components/PageFares";
import LogoIcon from "assets/svgs/logo.svg";
import Spinner from "components/Spinner";

const ManageBookings = (props) => {
  const router = useRouter();
  const [statePNR, setStatePnr] = useState("");
  const [checkedIn, setCheckedIn] = useState(false);
  const dispatch = useDispatch();
  const { bookingResponseLoading, bookingResponse, signature } =
    useSelector(sessionSelector);
  const { verifyManageBookingResponse } = useSelector(paymentSelector);
  const { data, isLoading: locationLoading } = useGetLocationsQuery();

  const ScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    ScrollToTop();
  }, []);

  useEffect(() => {
    async function fetchBookingDetails() {
      if (signature) {
        if (router?.query?.pnr) {
          setStatePnr(props.pnr);
          dispatch(setManageBookingPnr(props.pnr));
          dispatch(GetBookingDetailsWithPNR({ pnr: props.pnr }));
        }
      }
    }
    fetchBookingDetails();
  }, [router]);

  useEffect(() => {
    if (
      bookingResponse &&
      bookingResponse?.Booking &&
      bookingResponse?.Booking?.Journeys?.length > 0
    ) {
      bookingResponse?.Booking?.Journeys.map((_journey) => {
        _journey.Segments[0].PaxSegments.map((_paxSegment) => {
          parseInt(_paxSegment?.LiftStatus) === 1 && setCheckedIn(true);
        });
      });
    }
  }, [bookingResponse]);

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

  const PassengersSection = () => {
    return (
      <section className="mx-6 my-6 flex flex-col ">
        <h3 className="title-text no-mb font-700 text-sm">
          PASSENGER
          {bookingResponse?.Booking?.Passengers?.length > 0 ? "S" : ""}
        </h3>
        <section className="flex flex-col">
          {bookingResponse?.Booking?.Passengers.map((_pax, _paxIndex) => {
            return (
              <ManagePassengerItem passenger={_pax} paxIndex={_paxIndex} />
            );
          })}
        </section>
      </section>
    );
  };

  const PageCTA = () => {
    return (
      <section
        className={`flex flex-wrap md:flex-nowrap mx-6 ${
          checkedIn ? "pointer-events-none opacity-50 cursor-not-allowed" : ""
        }`}
        // className={`flex flex-wrap md:flex-nowrap mx-6`}
      >
        <button
          className={`basis-full md:basis-auto btn btn-outline mb-3 md:mb-0 md:mr-3 ${
            checkedIn ||
            parseInt(bookingResponse?.Booking?.BookingSum?.BalanceDue) > 0
              ? "pointer-events-none opacity-50 cursor-not-allowed"
              : ""
          } `}
          onClick={handleItenary}
        >
          Change Flight
        </button>
        <button
          onClick={handleServices}
          // className={`basis-full md:basis-auto btn btn-outline mb-3 md:mb-0 md:mr-3 `}
          className={`basis-full md:basis-auto btn btn-outline mb-3 md:mb-0 md:mr-3 ${
            checkedIn ? "pointer-events-none opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Manage Services
        </button>
        <Link href="/bookings/seat-selection">
          <a
            className={`basis-full md:basis-auto btn btn-outline mb-3 md:mb-0 md:mr-3 text-center ${
              checkedIn
                ? "pointer-events-none opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            Seat Management
          </a>
        </Link>
      </section>
    );
  };

  const TabContent = () => {
    return (
      <>
        {bookingResponse?.Booking?.Journeys?.length > 0 ? (
          <>
            {bookingResponse?.Booking?.Journeys.map((_journey, _index) => (
              <SingleJourneyItem journey={_journey} journeyIndex={_index} />
            ))}
            <PageCTA />
            <PassengersSection />
            <PageFares />
          </>
        ) : (
          <p className="errorText">No Journeys</p>
        )}
      </>
    );
  };

  const handleItenary = () => {
    let _JourneyOneTax = 0;
    let _JourneyOneFare = 0;

    const _JourneyOneServiceCharges =
      bookingResponse?.Booking?.Journeys[0].Segments[0].Fares[0].PaxFares[0]
        .ServiceCharges;

    _JourneyOneServiceCharges.map((_serviceCharge) => {
      _serviceCharge.ChargeCode === ""
        ? (_JourneyOneFare = _serviceCharge?.Amount)
        : (_JourneyOneTax = _JourneyOneTax + parseInt(_serviceCharge?.Amount));
    });

    const _STD = format(
      new Date(bookingResponse?.Booking?.Journeys[0].Segments[0].STD),
      "yyyy-MM-dd"
    );
    const tripPayload = {
      departureStation:
        bookingResponse?.Booking?.Journeys[0].Segments[0].DepartureStation,
      arrivalStation:
        bookingResponse?.Booking?.Journeys[0].Segments[0].ArrivalStation,
      beginDate: _STD,
      endDate: _STD,
      returnDate: null,
      goStd: _STD,
      returnSTD: null,
      isRoundTrip: bookingResponse?.Booking?.Journeys.length > 1 ? true : false,
      totalPaxCount: bookingResponse?.Booking?.Passengers.length,
      taxAmount: _JourneyOneTax,
      minimumFarePrice: _JourneyOneFare,
      serviceBundleItem:
        bookingResponse?.Booking?.Journeys[0].Segments[0].Fares[0].RuleNumber,
      scheduleIndex: 0,
      currentDate: new Date(),
    };

    // const goStd = bookingResponse?.Booking?.Journeys[0].Segments[0].STD;

    if (bookingResponse?.Booking?.Journeys.length > 1) {
      let _JourneyTwoTax = 0;
      let _JourneyTwoFare = 0;

      const _JourneyTwoServiceCharges =
        bookingResponse?.Booking?.Journeys[1].Segments[0].Fares[0].PaxFares[0]
          .ServiceCharges;

      _JourneyTwoServiceCharges.map((_serviceCharge) => {
        _serviceCharge.ChargeCode === ""
          ? (_JourneyTwoFare = _serviceCharge?.Amount)
          : (_JourneyTwoTax =
              _JourneyTwoTax + parseInt(_serviceCharge?.Amount));
      });

      const _beginSTD = format(
        new Date(bookingResponse?.Booking?.Journeys[0].Segments[0].STD),
        "yyyy-MM-dd"
      );

      const _returnSTD = format(
        new Date(bookingResponse?.Booking?.Journeys[1].Segments[0].STD),
        "yyyy-MM-dd"
      );

      const returnPayload = {
        departureStation:
          bookingResponse?.Booking?.Journeys[1].Segments[0].DepartureStation,
        arrivalStation:
          bookingResponse?.Booking?.Journeys[1].Segments[0].ArrivalStation,
        beginDate: _beginSTD,
        endDate: _beginSTD,
        returnDate: _returnSTD,
        goStd: _beginSTD,
        returnSTD: _returnSTD,
        isRoundTrip: true,
        totalPaxCount: bookingResponse?.Booking?.Passengers.length,
        taxAmount: _JourneyTwoTax,
        minimumFarePrice: _JourneyTwoFare,
        serviceBundleItem:
          bookingResponse?.Booking?.Journeys[1].Segments[0].Fares[0].RuleNumber,
        scheduleIndex: 1,
        currentDate: new Date(),
      };

      dispatch(saveTripParams(tripPayload));
      dispatch(saveReturnParams(returnPayload));
      // console.log("tripParams", tripPayload);
      // console.log("returnPayloa", returnPayload);
      router.push("/bookings/change-flight");
    } else {
      // console.log("tripParams", tripPayload);
      dispatch(saveTripParams(tripPayload));
      router.push("/bookings/change-flight");
    }
  };

  const handleServices = () => {
    router.push("/bookings/services");
  };

  const resolveAbbreviation = (abrreviation) => {
    const [{ name, code }] = data?.data?.items.filter(
      (location) => location.code === abrreviation
    );

    return `${name} (${code})`;
  };

  const SingleJourneyItem = ({ journey, journeyIndex }) => {
    return journey?.Segments.map((_segment) => {
      return (
        <>
          <div className="mx-6">
            <h3 className="title-text">
              {journeyIndex === 0 ? "Departing" : "Returning"} on &nbsp;
              {format(new Date(_segment?.STD), "EEEE, LLLL dd yyyy")}
            </h3>
          </div>
          <section className="ibe__trip__item checkinView bordered mx-6 my-3">
            {_segment?.Fares.map((_fare) => {
              return (
                <p className="bg-primary-main text-green py-1 px-2  rounded-[4px] absolute left-6 top-3">
                  {_fare?.RuleNumber.toLowerCase() === "savr" && "gSaver"}
                  {_fare?.RuleNumber.toLowerCase() === "flex" && "gFlex"}
                  {_fare?.RuleNumber.toLowerCase() === "clsc" && "gClassic"}
                </p>
              );
            })}

            {locationLoading ? (
              <div className="p-4">
                <Spinner />
              </div>
            ) : data?.data?.items ? (
              <div className="basis-full lg:basis-[60%] w-full flex flex-col min-h-[54px] px-6 mb-10">
                <p className="tripType self-center">
                  {" "}
                  {_segment?.FlightDesignator?.CarrierCode}{" "}
                  {_segment?.FlightDesignator?.FlightNumber}
                </p>
                <div className="flex justify-between">
                  <div className="flex flex-col">
                    <h5 className="tripType">
                      {" "}
                      {format(new Date(_segment?.STD), "HH:mm")}
                    </h5>
                    <p className="tripCity">
                      {" "}
                      {_segment?.DepartureStation &&
                        resolveAbbreviation(_segment?.DepartureStation)}
                    </p>
                  </div>
                  <div className="tripIconPath">
                    <DottedLine className="dotted-svg" />
                    <AeroIcon className="aero-svg" />
                    <DottedLine className="dotted-svg" />
                  </div>
                  <div className="flex flex-col  items-end">
                    <h5 className="tripType right-text">
                      {" "}
                      {format(new Date(_segment?.STA), "HH:mm")}
                    </h5>
                    <p className="tripCity right-text">
                      {" "}
                      {_segment?.ArrivalStation &&
                        resolveAbbreviation(_segment?.ArrivalStation)}
                    </p>
                  </div>
                </div>
                <p className="tripTime self-center">
                  {" "}
                  {timeConvert(
                    differenceInMinutes(
                      new Date(_segment?.STA),
                      new Date(_segment?.STD)
                    )
                  )}
                </p>
              </div>
            ) : null}
          </section>
        </>
      );
    });
  };

  const goBackToHome = () => {
    window.location.assign("https://dev-website.gadevenv.com/");
  };

  const handlePayment = () => {
    router.push("/bookings/confirm");
  };

  if (!props.pnr) {
    router.push("/bookings");
  }

  return (
    <Fragment>
      <BaseLayout>
        <nav className="top__bar logo-holder">
          <button onClick={goBackToHome}>
            <figure className="cursor-pointer">
              <LogoIcon />
            </figure>
          </button>
        </nav>

        {bookingResponse &&
          bookingResponse?.Booking &&
          parseInt(bookingResponse?.Booking?.BookingSum?.BalanceDue) > 0 &&
          parseInt(bookingResponse?.Booking?.BookingInfo?.BookingStatus) ===
            1 && (
            <nav className="manage-booking-bar">
              <p className="font-display text-base text-primary-main">
                Your booking is on hold. Please review the booking details and
                complete the payment
              </p>
              <button className="btn btn-primary" onClick={handlePayment}>
                Pay ₦
                {parseInt(
                  bookingResponse?.Booking?.BookingSum?.BalanceDue
                ).toLocaleString("NGN")}
              </button>
            </nav>
          )}

        <section className="w-full checkin">
          {bookingResponseLoading ? (
            <div className="px-12 py-12">
              <SkeletonLoader />
              <SkeletonLoader />
              <SkeletonLoader />
            </div>
          ) : (
            <section className="ga__section relative">
              {verifyManageBookingResponse &&
              verifyManageBookingResponse?.pnr.toLowerCase() ===
                statePNR.toLowerCase() ? (
                <div className="flex text-center items-center justify-center bg-green absolute w-full p-3">
                  <p>
                    You added some new services so your fare has been updated
                    with additional fees
                  </p>
                </div>
              ) : null}
              <div className="ga__section__main">
                <div className="mb-8 mt-16 xlg:mt-3">
                  {bookingResponse?.Booking ? (
                    <>
                      <h2 className="text-black font-bold text-2xl mb-2">
                        Booking
                      </h2>
                    </>
                  ) : null}
                </div>

                {bookingResponse?.Booking ? (
                  <section className="flex flex-col bg-white pb-24">
                    <TripHeader />
                    <TabContent />
                  </section>
                ) : (
                  <p className="errorText text-lg">Error occured flight</p>
                )}
              </div>

              <div className="ga__section__side">
                <IbeAdbar />
              </div>
            </section>
          )}
        </section>
      </BaseLayout>
    </Fragment>
  );
};

export default ManageBookings;

export async function getServerSideProps(context) {
  return {
    props: {
      pnr: context.query.pnr ? context.query.pnr : "",
    },
  };
}
