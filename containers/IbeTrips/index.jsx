/* eslint-disable @next/next/no-img-element */
import { Fragment } from "react";
import IbeTripItem from "./components/IbeTripItem";
import { useSelector } from "react-redux";
import { sessionSelector } from "redux/reducers/session";
import Spinner from "components/Spinner";

const IbeTrips = ({ flightSchedule, _i }) => {
  const { flightAvailabilityLoading } = useSelector(sessionSelector);

  return (
    <section className="ibe__flight__trips">
      <h2 className="text-primary-main font-extrabold text-sm mb-8">
        {parseInt(_i) === 0 ? "DEPARTURE" : "RETURN"}
      </h2>

      <Fragment>
        {flightAvailabilityLoading ? (
          <Spinner />
        ) : (
          <section className="flex flex-col">
            {flightSchedule ? (
              flightSchedule.length > 0 ? (
                flightSchedule.map((_schedule) => {
                  return _schedule.Journeys.map((_journey) => {
                    return <IbeTripItem journey={_journey} />;
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
  _i: "",
};

export default IbeTrips;
