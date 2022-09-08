/* eslint-disable @next/next/no-img-element */
import { Fragment, useState, useEffect } from "react";
import BaseLayout from "layouts/Base";
import FlightIcon from "assets/svgs/FlightTwo.svg";
import AeroIcon from "assets/svgs/aero.svg";
import DottedLine from "assets/svgs/dotted-line.svg";
import IbeAdbar from "containers/IbeAdbar";
import FliightIcon from "assets/svgs/aero.svg";
import ArrowIcon from "assets/svgs/small-arrow.svg";
import Spinner from "components/Spinner";
import { useDispatch, useSelector } from "react-redux";
import {
  sessionSelector,
  GetBookingDetailsWithPNR,
} from "redux/reducers/session";
import { useRouter } from "next/router";
import { format, differenceInMinutes } from "date-fns";
import { timeConvert } from "utils/common";
import ManagePassengerItem from "containers/Booking/components/PassengerItem";
// import ManagePassengerFares from "containers/Booking/components/Fares";

const ManageBookings = () => {
  const router = useRouter();
  const [selectedTab, setTab] = useState(0);
  const [selectedPaxs, setSelectedPaxs] = useState([]);
  const dispatch = useDispatch();
  const { bookingResponseLoading, bookingResponse } =
    useSelector(sessionSelector);
  const { pnr, signature } = router.query;
  const [isRoundTrip, setIsRoundTrip] = useState(false);

  useEffect(() => {
    async function fetchBookingDetails() {
      if (pnr) {
        const payload = {
          pnr,
        };
        dispatch(GetBookingDetailsWithPNR(payload));
      }
    }
    fetchBookingDetails();
  }, [router]);

  useEffect(() => {
    if (bookingResponse) {
      bookingResponse?.Booking?.Journeys.length > 1 && setIsRoundTrip(true);
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

  const TabIndicator = () => {
    return (
      bookingResponse && (
        <>
          {isRoundTrip ? (
            <div className="mx-6 my-6 flex tabs__container border-b h-12">
              {bookingResponse?.Booking?.Journeys.map(
                (_journey, _journeyIndex) => {
                  return (
                    <button
                      className={` ${
                        selectedTab === _journeyIndex ? "active-tab" : ""
                      }`}
                      onClick={() => setTab(_journeyIndex)}
                    >
                      <figure>
                        <FliightIcon className="primary-main" />
                      </figure>
                      {_journey?.Segments.map((_segment) => {
                        return (
                          <div className="flex items-center ml-[10px] ">
                            <p className="mr-[6px]">
                              {_segment?.DepartureStation}
                            </p>
                            <figure className="flex items-center justify-center -mb-1">
                              <ArrowIcon />
                            </figure>
                            <p className=" ml-[6px]">
                              {_segment?.ArrivalStation}
                            </p>
                          </div>
                        );
                      })}
                    </button>
                  );
                }
              )}
            </div>
          ) : (
            <div className="mx-6 my-6 flex tabs__container border-b h-12">
              {bookingResponse?.Booking?.Journeys.map(
                (_journey, _journeyIndex) => {
                  return _journey?.Segments.map((_segment) => {
                    return (
                      <button className="active-tab" onClick={() => setTab(1)}>
                        <figure>
                          <FliightIcon className="primary-main" />
                        </figure>
                        <div className="flex items-center ml-[10px] ">
                          <p className="mr-[6px]">
                            {_segment?.DepartureStation}
                          </p>
                          <figure className="flex items-center justify-center -mb-1">
                            <ArrowIcon />
                          </figure>
                          <p className=" ml-[6px]">
                            {_segment?.ArrivalStation}
                          </p>
                        </div>
                      </button>
                    );
                  });
                }
              )}
            </div>
          )}
        </>
      )
    );
  };

  const TabContent = () => {
    return (
      <>
        {selectedTab === 0 && (
          <DepartJourney journey={bookingResponse?.Booking?.Journeys[0]} />
        )}
        {selectedTab === 1 && (
          <ReturnJourney journey={bookingResponse?.Booking?.Journeys[1]} />
        )}
      </>
    );
  };

  const handleItenary = () => {
    const _deptStation =
      bookingResponse?.Booking?.Journeys[0].Segments[0].DepartureStation;
    const _arrStation =
      bookingResponse?.Booking?.Journeys[0].Segments[0].ArrivalStation;
    const _beginDate = format(
      new Date(bookingResponse?.Booking?.Journeys[0].Segments[0].STA),
      "yyyy-MM-dd"
    );
    const _endDate = format(
      new Date(bookingResponse?.Booking?.Journeys[0].Segments[0].STD),
      "yyyy-MM-dd"
    );
    const _minimumFarePrice =
      bookingResponse?.Booking?.Journeys[0].Segments[0].Fares[0].PaxFares;

    const payload = {
      departureStation: _deptStation,
      arrivalStation: _arrStation,
      beginDate: _beginDate,
      endDate: _endDate,
      returnDate: _endDate,
      signature,
      isRoundTrip,
      totalPaxCount: bookingResponse?.Booking?.Passengers.length,
      minimumFarePrice: _minimumFarePrice,
    };

    console.log(payload);
  };

  const DepartJourney = ({ journey }) => {
    return journey?.Segments.map((_segment) => {
      return (
        <>
          <div className="mx-6">
            <h3 className="title-text">
              Departing&nbsp; &nbsp;{" "}
              {format(new Date(_segment?.STD), "MMM dd, yyyy")}
            </h3>
          </div>
          <section className="ibe__trip__item checkinView bordered mx-6 my-3">
            {_segment?.Fares.map((_fare) => {
              return (
                <p className="bg-primary-main text-green py-1 px-2  rounded-[4px] absolute left-6 top-3">
                  {_fare?.RuleNumber.toLowerCase() === "savr" && "gSaver"}
                  {_fare?.RuleNumber.toLowerCase() === "flexi" && "gFlex"}
                  {_fare?.RuleNumber.toLowerCase() === "clsc" && "gClassic"}
                </p>
              );
            })}

            <div className="basis-full lg:basis-[60%] w-full flex flex-col min-h-[54px] px-6 mb-10">
              <p className="tripType self-center">Direct Flight</p>
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <h5 className="tripType">
                    {" "}
                    {format(new Date(_segment?.STD), "HH:mm")}
                  </h5>
                  <p className="tripCity"> {_segment?.DepartureStation}</p>
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
                    {_segment?.ArrivalStation}
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

            <div className="trip-details">
              <div className="trip-details-item">
                <h6>FLIGHT NUMBER</h6>
                <h5>
                  {_segment?.FlightDesignator?.CarrierCode}{" "}
                  {_segment?.FlightDesignator?.FlightNumber}
                </h5>
              </div>
            </div>
          </section>
          <section className="checkin__info mx-6 my-3">
            <p>
              You added some new services so your fare has been updated with
              additional fees
            </p>
          </section>
          <section className="mx-6 my-6 flex flex-col ">
            <h3 className="title-text font-700 text-sm">PASSENGER</h3>
            {/* <p>{JSON.stringify(selectedPaxs)}</p> */}
            <section className="flex flex-col mt-3">
              {bookingResponse?.Booking?.Passengers.map((_pax, _paxIndex) => {
                return (
                  <ManagePassengerItem
                    selectedPaxs={selectedPaxs}
                    setSelectedPaxs={setSelectedPaxs}
                    passenger={_pax}
                    paxIndex={_paxIndex}
                  />
                );
              })}
            </section>
          </section>
          <section className="flex flex-wrap md:flex-nowrap mx-6">
            <button
              className={`basis-full md:basis-auto btn btn-outline mb-3 md:mb-0 md:mr-3 ${
                selectedPaxs?.length < 1 && "pointer-events-none opacity-50"
              }`}
              onClick={handleItenary}
            >
              Update Itinerary
            </button>
            <button
              className={`basis-full md:basis-auto btn btn-outline mb-3 md:mb-0 md:mr-3 ${
                selectedPaxs?.length < 1 && "pointer-events-none opacity-50"
              } `}
            >
              Manage Services
            </button>
            <button
              className={`basis-full md:basis-auto btn btn-outline mb-3 md:mb-0 md:mr-3 ${
                selectedPaxs?.length < 1 && "pointer-events-none opacity-50"
              } `}
            >
              Seat Management
            </button>
          </section>
        </>
      );
    });
  };

  const ReturnJourney = ({ journey }) => {
    return journey?.Segments.map((_segment) => {
      return (
        <>
          <div className="mx-6">
            <h3 className="title-text">
              Departing&nbsp; &nbsp;{" "}
              {format(new Date(_segment?.STD), "MMM dd, yyyy")}
            </h3>
          </div>
          <section className="ibe__trip__item checkinView bordered mx-6 my-3">
            <p className="bg-primary-main text-green py-1 px-2  rounded-[4px] absolute left-6 top-3">
              gSaver
            </p>
            <div className="basis-full lg:basis-[60%] w-full flex flex-col min-h-[54px] px-6 mb-10">
              <p className="tripType self-center">Direct Flight</p>
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <h5 className="tripType">
                    {" "}
                    {format(new Date(_segment?.STD), "HH:mm")}
                  </h5>
                  <p className="tripCity"> {_segment?.DepartureStation}</p>
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
                    {_segment?.ArrivalStation}
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

            <div className="trip-details">
              <div className="trip-details-item">
                <h6>FLIGHT NUMBER</h6>
                <h5>
                  {_segment?.FlightDesignator?.CarrierCode}{" "}
                  {_segment?.FlightDesignator?.FlightNumber}
                </h5>
              </div>
            </div>
          </section>
          <section className="checkin__info mx-6 my-3">
            <p>
              You added some new services so your fare has been updated with
              additional fees
            </p>
          </section>
          <section className="mx-6 my-6 flex flex-col ">
            <h3 className="title-text font-700 text-sm">PASSENGER</h3>
            <section className="flex flex-col mt-6">
              {bookingResponse?.Booking?.Passengers.map((_pax, _paxIndex) => {
                return (
                  <ManagePassengerItem passenger={_pax} paxIndex={_paxIndex} />
                );
              })}
            </section>
          </section>
          <section className="flex flex-wrap md:flex-nowrap mx-6">
            <button className="basis-full md:basis-auto btn btn-outline mb-3 md:mb-0 md:mr-3">
              Update Itinerary
            </button>
            <button className="basis-full md:basis-auto btn btn-outline mb-3 md:mb-0 md:mr-3">
              Manage Services
            </button>
            <button className="basis-full md:basis-auto btn btn-outline mb-3 md:mb-0 md:mr-3">
              Seat Management
            </button>
          </section>
          {/* <ManagePassengerFares /> */}
        </>
      );
    });
  };

  return (
    <Fragment>
      {/* <nav className="manage-booking-bar">
        <p className="font-display text-base text-primary-main">
          You made a few changes to your booking and additional charges have
          been added
        </p>
        <button className="btn btn-primary">Pay ₦26,501</button>
      </nav> */}
      <BaseLayout>
        <section className="w-full checkin">
          {bookingResponseLoading ? (
            <div className="px-12 py-12">
              <Spinner />
            </div>
          ) : (
            <section className="ga__section">
              <div className="ga__section__main">
                <div className="mb-8 mt-16 xlg:mt-0">
                  <h2 className="text-black font-bold text-2xl mb-2">
                    Booking
                  </h2>
                  <p>
                    Kindly confirm that the information below is correct before
                    checking in
                  </p>
                </div>

                {bookingResponse ? (
                  <section className="flex flex-col bg-white pb-24">
                    <TripHeader />
                    <TabIndicator />
                    <TabContent />
                  </section>
                ) : null}
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
