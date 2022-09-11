/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import BaseLayout from "layouts/Base";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  bookingSelector,
  fetchLowFareAvailability,
  returnLowFareAvailability,
  fetchFlightAvailability,
} from "redux/reducers/booking";
import { sessionSelector } from "redux/reducers/session";
import SkeletonLoader from "components/SkeletonLoader";
import IbeTrips from "containers/Booking/IbeTrips";
// import Ibe

const ManageUpdateItenary = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    tripParams,
    returnParams,
    manageFlightAvailabilityLoading,
    manageFlightAvailabilityResponse,
  } = useSelector(bookingSelector);
  const { bookingResponse } = useSelector(sessionSelector);
  const [isRoundTrip, setIsRoundTrip] = useState(false);

  useEffect(() => {
    if (bookingResponse) {
      if (bookingResponse?.Booking?.Journeys.length > 1) {
        // Round Trip
        if (!tripParams || !returnParams) {
          router.back();
        } else {
          bookingResponse?.Booking?.Journeys.length > 1 && setIsRoundTrip(true);
          /** Get trip params and return params and use it for low fare and fetch Flight isRoud true */
          dispatch(fetchFlightAvailability(tripParams, returnParams));
        }
      } else {
        // One Way
        !tripParams && router.back();
        dispatch(fetchFlightAvailability(tripParams, flightParams));
        /** Get trip params and use it for low fare and fetch Flight isRound false */
      }
    } else {
      router.back();
    }
  }, [bookingResponse]);

  return (
    <BaseLayout>
      <section className="w-full">
        <section className="ga__section bg-normal">
          <div className="ga__section__main standalone">
            <h2 className="text-primary-main font-extrabold text-2xl mb-8 text-center">
              UPDATE ITENARY
            </h2>

            <section className="flex flex-col  rounded-xl pb-12">
              {manageFlightAvailabilityLoading ? (
                <div className="px-12 py-12">
                  <SkeletonLoader />
                </div>
              ) : (
                <>
                  {manageFlightAvailabilityResponse ? (
                    manageFlightAvailabilityResponse?.Schedules.length > 0 ? (
                      <>
                        {manageFlightAvailabilityResponse?.Schedules.map(
                          (_schedule, _schedueIndex) => {
                            return (
                              <>
                                {/* {_schedueIndex === 0 ? (
                                  <IbeHeader />
                                ) : (
                                  <ReturnIbeHeader />
                                )} */}
                                <IbeTrips
                                  flightSchedule={_schedule}
                                  schedueIndex={_schedueIndex}
                                />
                              </>
                            );
                          }
                        )}
                        {manageFlightAvailabilityResponse?.Schedules.length >
                          1 && (
                          <div className="flex items-center">
                            <button className="btn btn-outline mr-2">
                              Go Back
                            </button>
                            <button className="btn btn-primary">
                              Continue
                            </button>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="flex items-center p-10">
                        <h2>No Flight Schedule For the Selcted Date</h2>
                      </div>
                    )
                  ) : (
                    <div className="flex items-center p-10">
                      <h2>Fetch flights failed</h2>
                    </div>
                  )}
                </>
              )}
            </section>
          </div>
        </section>
      </section>
    </BaseLayout>
  );
};

export default ManageUpdateItenary;
