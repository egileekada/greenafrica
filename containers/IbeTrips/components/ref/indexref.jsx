/* eslint-disable @next/next/no-img-element */
import { Fragment } from "react";
import IbeTripItem from "../IbeTripItem";
import { useSelector } from "react-redux";
import { sessionSelector } from "redux/reducers/session";
import Spinner from "components/Spinner";

const IbeTrips = () => {
  const { flightAvailabilityLoading, availabilityResponse } =
    useSelector(sessionSelector);

  return (
    <section className="ibe__flight__trips">
      <h2 className="text-primary-main font-extrabold text-sm mb-8">
        DEPARTURE
      </h2>

      <Fragment>
        {flightAvailabilityLoading ? (
          <Spinner />
        ) : (
          <section className="flex flex-col">
            {availabilityResponse ? (
              availabilityResponse.GetTripAvailabilityResponse.Schedules
                .length > 0 ? (
                availabilityResponse.GetTripAvailabilityResponse.Schedules.map(
                  (_schedule) => {
                    return <IbeTripItem flightSchedule={_schedule} />;
                  }
                )
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

export default IbeTrips;
