/* eslint-disable @next/next/no-img-element */
import { Fragment, useEffect } from "react";
import IbeTripItem from "./components/IbeTripItem";
import { useSelector } from "react-redux";
import { bookingSelector } from "redux/reducers/booking";
import Spinner from "components/Spinner";
import format from "date-fns/format";

const IbeTrips = ({ flightSchedule, schedueIndex, liftStatus }) => {
  const { tripParams, returnParams, manageFlightAvailabilityLoading } =
    useSelector(bookingSelector);

  return (
    <section
      className={`ibe__flight__trips ${
        liftStatus
          ? parseInt(liftStatus) !== 0
            ? "pointer-events-none opacity-50 cursor-not-allowed"
            : ""
          : ""
      }`}
    >
      <h2 className="text-primary-main font-extrabold text-base mb-8 uppercase">
        {parseInt(schedueIndex) === 0
          ? `DEPARTING  `
          : `RETURNING `}
      </h2>

      <Fragment>
        {manageFlightAvailabilityLoading ? (
          <Spinner />
        ) : (
          <section className={`flex flex-col`}>
            {flightSchedule ? (
              flightSchedule.length > 0 ? (
                flightSchedule.map((_schedule) => {
                  return _schedule.Journeys.map((_journey, _journeyIndex) => {
                    return (
                      <IbeTripItem
                        journey={_journey}
                        schedueIndex={schedueIndex}
                      />
                    );
                  });
                })
              ) : (
                <h2 className=" text-red-600 font-normal text-sm mb-8">
                  Error occured fetching flights
                </h2>
              )
            ) : (
              <h2 className=" text-red-600 font-normal text-sm mb-8">
                Error occured fetching flights
              </h2>
            )}
          </section>
        )}
      </Fragment>
    </section>
  );
};

IbeTrips.defaultProps = {
  flightSchedule: {},
  schedueIndex: "",
  liftStatus: null,
};

export default IbeTrips;
