/* eslint-disable @next/next/no-img-element */
import { Fragment, useState, useEffect } from "react";
import BaseLayout from "layouts/Base";
import FlightIcon from "assets/svgs/FlightTwo.svg";
import AeroIcon from "assets/svgs/aero.svg";
import DottedLine from "assets/svgs/dotted-line.svg";
import IbeAdbar from "containers/IbeAdbar";
import SkeletonLoader from "components/SkeletonLoader";
import { useDispatch, useSelector } from "react-redux";
import { sessionSelector, FetchStateFromServer } from "redux/reducers/session";
import { useRouter } from "next/router";
import { format, differenceInMinutes } from "date-fns";
import { timeConvert } from "utils/common";
import ManagePassengerItem from "containers/Booking/components/PassengerItem";
import ConfrimPageFares from "../bookings/components/ConfrimPageFares";

const ConfirmCheckinServices = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { sessionStateLoading, sessionStateResponse, signature } =
    useSelector(sessionSelector);

  useEffect(() => {
    async function fetchBookingDetails() {
      if (signature) {
        dispatch(FetchStateFromServer());
      }
    }
    fetchBookingDetails();
  }, [signature, router]);

  const TripHeader = () => {
    return (
      <section className="ibe__flight__info__destination">
        <p>Booking Code: {sessionStateResponse?.BookingData?.RecordLocator}</p>
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
          {sessionStateResponse?.BookingData?.Passengers?.length > 0 ? "S" : ""}
        </h3>
        <section className="flex flex-col">
          {sessionStateResponse?.BookingData?.Passengers.map(
            (_pax, _paxIndex) => {
              return (
                <ManagePassengerItem passenger={_pax} paxIndex={_paxIndex} />
              );
            }
          )}
        </section>
      </section>
    );
  };

  const PageInfo = () => {
    return (
      <section className="checkin__info mx-6 my-3">
        <p>
          You added some new services so your fare has been updated with
          additional fees
        </p>
      </section>
    );
  };

  const TabContent = () => {
    return (
      <>
        {sessionStateResponse?.BookingData?.Journeys?.length > 0 ? (
          <>
            {sessionStateResponse?.BookingData?.Journeys.map(
              (_journey, _index) => (
                <SingleJourneyItem journey={_journey} journeyIndex={_index} />
              )
            )}
            <PageInfo />
            <PassengersSection />
            <ConfrimPageFares />
          </>
        ) : (
          <p className="errorText m-6">No Journeys</p>
        )}
      </>
    );
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
        </>
      );
    });
  };

  return (
    <Fragment>
      {sessionStateResponse &&
      sessionStateResponse?.BookingData &&
      parseInt(sessionStateResponse?.BookingData?.BookingSum?.BalanceDue) >
        0 ? (
        <nav className="manage-booking-bar">
          <p className="font-display text-base text-primary-main">
            You made a few changes to your booking and additional charges have
            been added
          </p>
          <button
            className="btn btn-primary"
            onClick={() => router.push("/checkin/pay")}
          >
            Pay ₦
            {parseInt(
              sessionStateResponse?.BookingData?.BookingSum?.BalanceDue
            ).toLocaleString("NGN")}
          </button>
        </nav>
      ) : null}
      <BaseLayout>
        <section className="w-full checkin">
          {sessionStateLoading ? (
            <div className="px-12 py-12">
              <SkeletonLoader />
            </div>
          ) : (
            <section className="ga__section relative">
              <div className="ga__section__main">
                <div className="mb-8 mt-16 xlg:mt-3">
                  {sessionStateResponse?.BookingData ? (
                    <>
                      <h2 className="text-black font-bold text-2xl mb-2">
                        Manage Services
                      </h2>
                      <p>
                        Kindly confirm that the information below is correct
                        before proceeding{" "}
                        {/* {parseInt(
                          sessionStateResponse?.BookingData?.BookingSum
                            ?.BalanceDue
                        )} */}
                      </p>
                    </>
                  ) : null}
                </div>

                {sessionStateResponse?.BookingData ? (
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

export default ConfirmCheckinServices;
