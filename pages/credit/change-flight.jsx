/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import BaseLayout from "layouts/Base";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  creditSelector,
  fetchFlightAvailability,
  fetchLowFareAvailability,
  returnLowFareAvailability,
} from "redux/reducers/credit";
import { sessionSelector } from "redux/reducers/session";
import SkeletonLoader from "components/SkeletonLoader";
import IbeTrips from "containers/Credit/IbeTrips";
import CreditIbeHeader from "containers/Credit/IbeHeader";
import ReturnBookingIbeHeader from "containers/Credit/IbeHeader/ReturnIbeHeader";
import { notification } from "antd";
import CreditFlightWidget from "containers/Widgets/CreditFlightWidget";
import LogoIcon from "assets/svgs/logo.svg";

const ManageUpdateItenary = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    creditAction,
    creditGoTrip,
    creditReturnTrip,
    creditTripParams,
    creditReturnParams,
    creditFlightAvailabilityLoading,
    creditFlightAvailabilityResponse,
  } = useSelector(creditSelector);

  const { bookingResponse } = useSelector(sessionSelector);

  useEffect(() => {
    if (bookingResponse) {
      if (bookingResponse?.Booking?.Journeys.length > 1) {
        // Round Trip
        if (!creditTripParams || !creditReturnParams) {
          router.back();
        } else {
          dispatch(
            fetchFlightAvailability(creditTripParams, creditReturnParams)
          );
          dispatch(fetchLowFareAvailability(creditTripParams));
          dispatch(returnLowFareAvailability(creditReturnParams));
        }
      } else {
        // One Way
        !creditTripParams && router.back();
        dispatch(fetchFlightAvailability(creditTripParams));
        dispatch(fetchLowFareAvailability(creditTripParams));
      }
    } else {
      router.back();
    }
  }, [bookingResponse]);

  const proceedToTripView = () => {
    if (creditGoTrip?.journey || creditReturnTrip?.journey) {
      creditAction === "modify"
        ? router.push("/credit/view-trip")
        : router.push("/credit/view");
    } else {
      notification.error({
        message: "Error",
        description: "Please make a change",
      });
    }
  };

  const goBackToHome = () => {
    window.location.assign("https://dev-website.gadevenv.com/");
  };

  return (
    <BaseLayout>
      <nav className="top__bar logo-holder">
        <button onClick={goBackToHome}>
          <figure className="cursor-pointer">
            <LogoIcon />
          </figure>
        </button>
      </nav>
      <section className="w-full pt-20 lg:pt-0">
        <section className="ga__section bg-normal">
          <div className="ga__section__main standalone">
            <h2 className="text-primary-main font-extrabold text-2xl mb-4 text-center">
              UPDATE ITINERARY
            </h2>

            <div className="flex flex-col mb-8">
              <CreditFlightWidget />
            </div>

            <section className="flex flex-col  rounded-xl pb-12">
              {creditFlightAvailabilityLoading ? (
                <div className="px-12 py-12">
                  <SkeletonLoader />
                  <SkeletonLoader />
                  <SkeletonLoader />
                </div>
              ) : (
                <>
                  {creditFlightAvailabilityResponse ? (
                    creditFlightAvailabilityResponse?.Schedules.length > 0 ? (
                      <>
                        {creditFlightAvailabilityResponse?.Schedules.map(
                          (_schedule, _schedueIndex) => {
                            return (
                              <>
                                {_schedueIndex === 0 ? (
                                  <CreditIbeHeader />
                                ) : (
                                  <>
                                    <ReturnBookingIbeHeader />
                                  </>
                                )}

                                <IbeTrips
                                  flightSchedule={_schedule}
                                  schedueIndex={_schedueIndex}
                                />
                              </>
                            );
                          }
                        )}
                        {creditGoTrip?.journey || creditReturnTrip?.journey ? (
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
                                creditGoTrip?.journey ||
                                creditReturnTrip?.journey
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
