/* eslint-disable @next/next/no-img-element */
import { Fragment, useState, useEffect } from "react";
import BaseLayout from "layouts/Base";
import IbeHeader from "containers/IbeHeader";
import IbeTrips from "containers/IbeTrips";
import IbeSidebar from "containers/IbeSidebar";
import Popup from "components/Popup";
import FlightWidget from "containers/Widgets/Flight";
import { useSelector, useDispatch } from "react-redux";
import {
  sessionSelector,
  startSession,
  setFlightRequest,
  fetchLowFareAvailability,
} from "redux/reducers/session";
import { showWidget } from "redux/reducers/general";
import Spinner from "components/Spinner";
import BackIcon from "assets/svgs/seats/arrowleft.svg";
import ToTop from "assets/svgs/toTop.svg";

// ?origin=ABV&destination=LOS&departure=2022-08-18&adt=1&chd=0&inf=0&promocode=3hy74h

const Home = () => {
  const [showPopUp, setShow] = useState(false);
  const dispatch = useDispatch();
  const { signature, sessionLoading } = useSelector(sessionSelector);

  useEffect(() => {
    async function checkParams() {
      const ibeQuery = new URLSearchParams(window.location.search);
      const flightOrigin = ibeQuery.get("origin");
      if (flightOrigin) {
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

      if (signature) {
        const flightRequest = {
          departureStation: ibeQuery.get("origin"),
          arrivalStation: ibeQuery.get("destination"),
          beginDate: ibeQuery.get("departure"),
          endDate: ibeQuery.get("departure"),
          promocode: ibeQuery.get("promocode"),
          ADT: parseInt(ibeQuery.get("adt")),
          CHD: parseInt(ibeQuery.get("chd")),
          INF: parseInt(ibeQuery.get("inf")),
          signature,
        };
        dispatch(setFlightRequest(flightRequest));
        dispatch(fetchLowFareAvailability(flightRequest));
      }
    }
    checkSigInit();
  }, [signature]);

  const ScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Fragment>
      <BaseLayout>
        <nav className="top__bar">
          <button>
            <figure>
              <BackIcon />
            </figure>
            <span>SELECT FLIGHT</span>
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
                <IbeHeader />
                <IbeTrips />
              </div>
              <div className="ga__section__side">
                <IbeSidebar />
              </div>
            </section>
          </Fragment>
        )}
        <nav className="bottom__bar">
          <button className="toTop" onClick={ScrollToTop}>
            <ToTop />
          </button>
          <button className="btn btn-green">Continue</button>
        </nav>
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
      <FlightWidget />
    </Fragment>
  );
};

export default Home;

// ?origin=ABV
//&destination=LOS
// & departure=2022 - 08 - 18
// & adt=1
// & chd=0
// & inf=0
