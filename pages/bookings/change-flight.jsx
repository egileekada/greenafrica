/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import BaseLayout from "layouts/Base";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  bookingSelector,
  fetchFlightAvailability,
  fetchLowFareAvailability,
  returnLowFareAvailability,
} from "redux/reducers/booking";
import { sessionSelector } from "redux/reducers/session";
import SkeletonLoader from "components/SkeletonLoader";
import IbeTrips from "containers/Booking/IbeTrips";
import BookingIbeHeader from "containers/Booking/IbeHeader";
import ReturnBookingIbeHeader from "containers/Booking/IbeHeader/ReturnIbeHeader";
import { notification } from "antd";

const ManageUpdateItenary = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    goTrip,
    returnTrip,
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
          dispatch(fetchFlightAvailability(tripParams, returnParams));
          dispatch(fetchLowFareAvailability(tripParams));
          dispatch(returnLowFareAvailability(returnParams));
        }
      } else {
        // One Way
        !tripParams && router.back();
        dispatch(fetchFlightAvailability(tripParams));
        dispatch(fetchLowFareAvailability(tripParams));
      }
    } else {
      router.back();
    }
  }, [bookingResponse]);

  const proceedToTripView = () => {
    if (goTrip?.journey || returnTrip?.journey) {
      router.push("/bookings/view");
    } else {
      notification.error({
        message: "Error",
        description: "Please make a change",
      });
    }
  };

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
                                {_schedueIndex === 0 ? (
                                  <BookingIbeHeader />
                                ) : (
                                  <ReturnBookingIbeHeader />
                                )}

                                <IbeTrips
                                  flightSchedule={_schedule}
                                  schedueIndex={_schedueIndex}
                                />
                              </>
                            );
                          }
                        )}
                        {goTrip?.journey || returnTrip?.journey ? (
                          <div className="flex items-center">
                            <button
                              onClick={() => router.back()}
                              className="btn btn-outline mr-2"
                            >
                              Go Back
                            </button>
                            <button
                              onClick={proceedToTripView}
                              className={`btn btn-primary ${
                                goTrip?.journey || returnTrip?.journey
                                  ? ""
                                  : "pointer-events-none cursor-none disabled"
                              } `}
                            >
                              Continue
                            </button>
                          </div>
                        ) : null}
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
