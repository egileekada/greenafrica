/* eslint-disable @next/next/no-img-element */
import { Fragment, useState, useEffect } from "react";
import BaseLayout from "layouts/Base";
import IbeHeader from "containers/IbeHeader";
import ReturnIbeHeader from "containers/IbeHeader/ReturnIbeHeader";
import IbeTrips from "containers/IbeTrips";
import IbeSidebar from "containers/IbeSidebar";
import Popup from "components/Popup";
import FlightWidget from "containers/Widgets/Flight";
import PromoErrorWidget from "containers/Widgets/PromoError";
import { useSelector, useDispatch } from "react-redux";
import {
  sessionSelector,
  startSession,
  setFlightRequest,
  fetchLowFareAvailability,
  returnLowFareAvailability,
  fetchFlightAvailability,
} from "redux/reducers/session";
import { resetStore } from "redux/store";
import { showWidget, hideWidget } from "redux/reducers/general";
import Spinner from "components/Spinner";
// import BackIcon from "assets/svgs/seats/arrowleft.svg";
// import ToTop from "assets/svgs/toTop.svg";
import LogoIcon from "assets/svgs/logo.svg";
import { notification } from "antd";
import { useRouter } from "next/router";

const Home = () => {
  const [showPopUp, setShow] = useState(false);
  const [roundTripEnabled, setRoundTripEnabled] = useState(false);
  const dispatch = useDispatch();
  const {
    signature,
    sessionLoading,
    availabilityResponse,
    flightAvailabilityLoading,
    selectedSessionJourney,
    selectedSessionFare,
  } = useSelector(sessionSelector);
  const router = useRouter();

  useEffect(() => {
    resetStore();
    async function checkParams() {
      const ibeQuery = new URLSearchParams(window.location.search);
      const flightOrigin = ibeQuery.get("origin");
      if (flightOrigin) {
        dispatch(hideWidget());
        dispatch(startSession());
      } else {
        dispatch(showWidget());
      }
    }
    checkParams();
  }, []);

  useEffect(() => {
    async function checkSigInit() {
      const ibeQuery = new URLSearchParams(window.location.search);
      const flightOrigin = ibeQuery.get("origin");
      const flightDestination = ibeQuery.get("destination");

      if (signature && flightOrigin && flightDestination) {
        const isRoundTrip = parseInt(ibeQuery.get("round"));
        const flightRequest = {
          departureStation: ibeQuery.get("origin"),
          arrivalStation: ibeQuery.get("destination"),
          beginDate: ibeQuery.get("departure"),
          endDate: ibeQuery.get("departure"),
          returnDate: isRoundTrip === 1 ? ibeQuery.get("return") : null,
          promoCode: ibeQuery.get("promocode") ? ibeQuery.get("promocode") : "",
          ADT: parseInt(ibeQuery.get("adt")),
          CHD: parseInt(ibeQuery.get("chd")),
          INF: parseInt(ibeQuery.get("inf")),
          currentDate: new Date(),
          recurrent: false,
          isRoundTrip,
          signature,
        };
        dispatch(setFlightRequest(flightRequest));
        dispatch(fetchLowFareAvailability(flightRequest));
        dispatch(fetchFlightAvailability(flightRequest));
        if (isRoundTrip === 1) {
          dispatch(returnLowFareAvailability(flightRequest));
        }
      }
    }
    checkSigInit();
  }, [signature]);

  useEffect(() => {
    async function checkRoundEnabled() {
      if (
        selectedSessionJourney &&
        selectedSessionJourney.length === 2 &&
        selectedSessionFare &&
        selectedSessionFare.length === 2
      ) {
        setRoundTripEnabled(true);
      } else {
        setRoundTripEnabled(false);
      }
    }
    checkRoundEnabled();
  }, [selectedSessionJourney, selectedSessionFare]);

  const ScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    ScrollToTop();
  }, []);

  const goBackToHome = async () => {
    const query = `/?origin=${flightParams?.departureStation}&destination=${flightParams?.arrivalStation}&departure=${flightParams?.beginDate}&adt=${flightParams?.ADT}&chd=${flightParams?.CHD}&inf=${flightParams?.INF}`;
    router.push(query);
  };

  const checkRoundTripPayload = () => {
    if (selectedSessionJourney && selectedSessionFare) {
      let departureJorneyIndex = selectedSessionJourney
        .map(function (_item) {
          return parseInt(_item.schedueIndex);
        })
        .indexOf(parseInt(0));

      let returnJorneyIndex = selectedSessionJourney
        .map(function (_item) {
          return parseInt(_item.schedueIndex);
        })
        .indexOf(parseInt(1));

      let departureFareIndex = selectedSessionFare
        .map(function (_item) {
          return parseInt(_item.schedueIndex);
        })
        .indexOf(parseInt(0));

      let returnFareIndex = selectedSessionFare
        .map(function (_item) {
          return parseInt(_item.schedueIndex);
        })
        .indexOf(parseInt(1));

      if (
        departureFareIndex > -1 &&
        returnFareIndex > -1 &&
        departureJorneyIndex > -1 &&
        returnJorneyIndex > -1
      ) {
        router.push("/trip/view");
      } else {
        notification.error({
          message: "Error",
          description: "Please select relevant trip",
        });
      }
    } else {
      notification.error({
        message: "Error",
        description: "Please select all relevant journeys and fares",
      });
    }
  };

  return (
    <Fragment>
      <BaseLayout>
        <nav className="top__bar logo-holder">
          {/* <button>
            <figure>
              <BackIcon />
            </figure>
            <span>SELECT FLIGHT</span>
          </button> */}
          <button onClick={goBackToHome}>
            <figure className="cursor-pointer">
              <LogoIcon />
            </figure>
          </button>
        </nav>
        {sessionLoading ? (
          <section className="spinner__container">
            <Spinner />
          </section>
        ) : (
          <Fragment>
            <section className="ga__section fit-y">
              <div className="ga__section__main">
                <h2 className="text-primary-main font-extrabold text-base md:text-2xl mb-8">
                  SELECT FLIGHT
                </h2>

                <section className="flex flex-col scrollable">
                  <div className="flex flex-col mb-10">
                    {flightAvailabilityLoading ? (
                      <Spinner />
                    ) : availabilityResponse ? (
                      <>
                        {/* <IbeHeader /> */}

                        {availabilityResponse?.GetTripAvailabilityResponse
                          .Schedules.length > 0 ? (
                          <>
                            {availabilityResponse.GetTripAvailabilityResponse.Schedules.map(
                              (_schedule, _schedueIndex) => {
                                return (
                                  <>
                                    {_schedueIndex === 0 ? (
                                      <IbeHeader />
                                    ) : (
                                      <ReturnIbeHeader />
                                    )}
                                    <IbeTrips
                                      flightSchedule={_schedule}
                                      schedueIndex={_schedueIndex}
                                    />
                                  </>
                                );
                              }
                            )}
                            {availabilityResponse.GetTripAvailabilityResponse
                              .Schedules.length > 1 && (
                              <div className="flex items-center justify-end">
                                <button
                                  className={`btn btn-primary ${
                                    roundTripEnabled ? "" : "disabled"
                                  }`}
                                  onClick={checkRoundTripPayload}
                                >
                                  Continue
                                </button>
                              </div>
                            )}
                          </>
                        ) : (
                          <h2 className=" text-red-600 font-normal text-sm mb-8">
                            No Flight Schedules
                          </h2>
                        )}
                      </>
                    ) : (
                      <h2 className="text-red-600 font-normal text-sm mb-8">
                        Error fetching flight availability
                      </h2>
                    )}
                  </div>
                </section>
              </div>
              <div className="ga__section__side">
                <IbeSidebar />
              </div>
            </section>
          </Fragment>
        )}
        {/* <nav className="bottom__bar">
          <button className="toTop" onClick={ScrollToTop}>
            <ToTop />
          </button>
          <button className="btn btn-green">Continue</button>
        </nav> */}
      </BaseLayout>
      <Popup
        display={showPopUp}
        closeModal={() => setShow(false)}
        top={true}
        width="w-[600px]"
      >
        <section className="w-full bg-white rounded-xl ">
          <div className="flex flex-col items-center justify-center p-[50px]">
            <h6 className="font-display text-xl mb-5">Are you still there?</h6>

            <p className="text-center font-body text-sm mb-6">
              Your booking session is about to expire due to inactivity. Do you
              need more time?
            </p>
            <div className="flex flex-wrap lg:flex-nowrap items-center justify-between w-full">
              <button className="btn btn-primary basis-full lg:basis-[48%] lg:mr-2">
                Yes, I need more time
              </button>
              <button className="btn btn-outline basis-full lg:basis-[48%]">
                I don’t need it
              </button>
            </div>
          </div>
        </section>
      </Popup>
      <PromoErrorWidget />
      <FlightWidget />
    </Fragment>
  );
};

export default Home;
