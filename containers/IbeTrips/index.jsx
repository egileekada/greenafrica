/* eslint-disable @next/next/no-img-element */
import { Fragment, useEffect } from "react";
import IbeTripItem from "./components/IbeTripItem";
import { useSelector } from "react-redux";
import { sessionSelector } from "redux/reducers/session";
import Spinner from "components/Spinner";
import format from "date-fns/format";

const IbeTrips = ({ flightSchedule, schedueIndex }) => {
  const { flightAvailabilityLoading, flightParams } =
    useSelector(sessionSelector);

  return (
    <section className="ibe__flight__trips">
      <h2 className="text-primary-main font-extrabold text-lg mb-8 uppercase">
        {parseInt(schedueIndex) === 0
          ? `DEPARTURE ON ${format(
              new Date(flightParams?.beginDate),
              "EEEE, LLLL dd yyyy"
            )}`
          : `RETURN ON ${format(
              new Date(flightParams?.returnDate),
              "EEEE, LLLL dd yyyy"
            )}`}
      </h2>

      <Fragment>
        {flightAvailabilityLoading ? (
          <Spinner />
        ) : (
          <section
            className="flex flex-col"
            // id={schedueIndex === 0 ? "departureContainer" : "returnContainer"}
          >
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
};

export default IbeTrips;
