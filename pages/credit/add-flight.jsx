/* eslint-disable @next/next/no-img-element */
import BaseLayout from "layouts/Base";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  creditSelector,
  // setCreditGoTrip,
  // setCreditReturnTrip,
} from "redux/reducers/credit";
import SkeletonLoader from "components/SkeletonLoader";
import IbeTrips from "containers/Credit/IbeTrips";
import CreditIbeHeader from "containers/Credit/IbeHeader";
import ReturnBookingIbeHeader from "containers/Credit/IbeHeader/ReturnIbeHeader";
import { notification } from "antd";
import CreditFlightWidget from "containers/Widgets/CreditFlightWidget";
import LogoIcon from "assets/svgs/logo.svg";
import { useEffect } from "react";

const ManageUpdateItenary = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    creditGoTrip,
    creditReturnTrip,
    creditFlightAvailabilityLoading,
    creditFlightAvailabilityResponse,
  } = useSelector(creditSelector);

  // useEffect(() => {
  //   dispatch(setCreditGoTrip(null));
  //   dispatch(setCreditReturnTrip(null));
  // }, []);

  const proceedToTripView = () => {
    if (creditGoTrip?.journey || creditReturnTrip?.journey) {
      router.push("/credit/view");
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
              ADD FLIGHT
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
                    <div className="flex items-center py-10">
                      <h2>No Flight Schedule at the moment</h2>
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
