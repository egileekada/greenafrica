/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import Popup from "components/Popup";
import BaggageIcon from "../../public/images/bagthree.svg"
// import BaggageIcon from "assets/svgs/baggage.svg";
import BaseLayout from "layouts/Base";
import IbeSidebar from "containers/IbeSidebar";
import PassengerDetailsItem from "containers/PassengerDetails/PassengerDetailsItem";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import {
  sessionSelector,
  SellSSROption,
  setSSRResponse,
  setSessionSSRs,
  CancelSSRs,
  FetchSSRAvailabilityForBooking,
  retrieveBookingFromState,
} from "redux/reducers/session";
import SkeletonLoader from "components/SkeletonLoader";
import LogoIcon from "assets/svgs/logo.svg";

// TO DO
// Create sessionReturnSSRs

const PassengerDetails = () => {
  const router = useRouter();
  const [showPopUp, setShow] = useState(false);
  const [showReturnPopUp, setShowReturn] = useState(false);
  const [selectedSSRs, setSSRs] = useState([]);
  const [selectedReturnSSRs, setReturnSSRs] = useState([]);
  const dispatch = useDispatch();

  const {
    sessionStateResponse,
    sessionPassengers,
    SSRAvailabilityLoading,
    SSRAvailabilityResponse,
    sellSSRResponse,
    sellSSRLoading,
    sessionSSRs,
    sessionReturnSSRs,
    signature,
  } = useSelector(sessionSelector);

  const ScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    ScrollToTop();
  }, []);

  useEffect(() => {
    async function checkSSRAvailability() {
      if (!SSRAvailabilityResponse) {
        dispatch(FetchSSRAvailabilityForBooking());
      }
    }
    checkSSRAvailability();
  }, []);

  // useEffect(() => {
  //   async function redirectToSeatSelection() {
  //     if (sellSSRResponse) {
  //       router.push("/trip/seat-selection");
  //     }
  //   }
  //   redirectToSeatSelection();
  // }, [sellSSRResponse]);

  useEffect(() => {
    async function checkSessionSSRs() {
      if (sessionSSRs && sessionSSRs.length > 0) {
        setSSRs(sessionSSRs);
      }
      if (sessionReturnSSRs && sessionReturnSSRs.length > 0) {
        setReturnSSRs(sessionReturnSSRs);
      }
      dispatch(CancelSSRs());
    }
    checkSessionSSRs();
  }, []);

  const proceedToSeatSelectionWithSSR = async () => {
    // New
    const trips = parseInt(sessionStateResponse?.BookingData?.Journeys.length);
    if (trips === 1) {
      // console.log("Single trip", selectedSSRs, selectedReturnSSRs);
      dispatch(SellSSROption(selectedSSRs, selectedReturnSSRs));
      router.push("/trip/seat-selection");
    }
  };

  const proceedToSeatSelectionWithoutSSR = async () => {
    router.push("/trip/seat-selection");
  };

  const checkSSRContent = () => {
    // New
    let Extras = selectedSSRs.filter(function (ssr) {
      if (
        ssr?.ssrCode === "WCHR" ||
        ssr?.ssrCode === "VPRD" ||
        ssr?.ssrCode === "HPRD" ||
        ssr?.ssrCode === "INS"
      )
        return true;
    });
    const existingReturnSSRs = [...selectedReturnSSRs];
    if (Extras?.length > 0) {
      Extras.map((_item) => {
        const newObj = {
          ..._item,
          schedueIndex: 1,
        };
        existingReturnSSRs.push(newObj);
      });
      setReturnSSRs([...existingReturnSSRs]);
    }

    const trips = parseInt(sessionStateResponse?.BookingData?.Journeys.length);

    if (trips > 1) {
      if (selectedSSRs.length > 0 && existingReturnSSRs.length > 0) {
        // console.log("round trip", selectedSSRs, existingReturnSSRs);
        dispatch(SellSSROption(selectedSSRs, existingReturnSSRs));
        router.push("/trip/seat-selection");
      } else {
        selectedSSRs.length < 1 && setShow(true);
        existingReturnSSRs.length < 1 && setShowReturn(true);
      }
    } else {
      selectedSSRs.length > 0 ? proceedToSeatSelectionWithSSR() : setShow(true);
    }
  };

  useEffect(() => {
    async function retrieveBooking() {
      if (signature) {
        dispatch(retrieveBookingFromState());
      }
    }
    retrieveBooking();
  }, []);

  const GO_BACK = async () => {
    window.location.assign("https://dev-website.gadevenv.com/");
  };

  return (
    <BaseLayout>
      <nav className="top__bar logo-holder">
        <button onClick={GO_BACK}>
          <figure className="cursor-pointer">
            <LogoIcon />
          </figure>
        </button>
      </nav>
      <section className="w-full">
        <section className="ga__section">
          <div className="ga__section__main">
            <h2 className="text-black font-extrabold text-2xl mb-8">
              Additional Services{" "}
            </h2>

            {SSRAvailabilityLoading ? (
              <section className="flex flex-col">
                <SkeletonLoader />
                <SkeletonLoader />
                <SkeletonLoader />
              </section>
            ) : SSRAvailabilityResponse ? (
              <>
                <section className="flex flex-col">
                  {sessionPassengers ? (
                    sessionPassengers.length > 0 ? (
                      sessionPassengers.map((_passenger) => {
                        return (
                          <PassengerDetailsItem
                            passenger={_passenger}
                            selectedSSRs={selectedSSRs}
                            setSSRs={setSSRs}
                            setReturnSSRs={setReturnSSRs}
                            selectedReturnSSRs={selectedReturnSSRs}
                          />
                        );
                      })
                    ) : (
                      <p className="errorText">No Passengers List</p>
                    )
                  ) : (
                    <p className="errorText">No Passengers</p>
                  )}
                </section>

                {sessionPassengers && sessionPassengers.length > 0 && (
                  <section className="flex items-center lg:px-0 px-6 flex-wrap md:flex-nowrap">
                    <button
                      className="btn btn-outline font-bold mr-0 md:mr-4 mb-3 md:mb-0 basis-full md:basis-auto mobile-order"
                      onClick={() => router.back()}
                    >
                      Go Back
                    </button>
                    <button
                      onClick={checkSSRContent}
                      className="btn btn-primary font-bold basis-full md:basis-auto"
                    >
                      {sellSSRLoading ? "Saving..." : "Continue"}
                    </button>
                  </section>
                )}
              </>
            ) : (
              <p className="errorText text-2xl">No SSR Available</p>
            )}
          </div>
          <div className="ga__section__side">
            <IbeSidebar />
          </div>
        </section>
      </section>
      <Popup
        display={showPopUp}
        closeModal={() => setShow(false)}
        top={true}
        width="w-[507px]"
      >
        <section className="w-full bg-white rounded-xl ">
          <div className="flex flex-col items-center justify-center p-[50px]">
            <h6 className="font-display text-xl mb-5">
              No extra service selected for the first trip
            </h6>
            <figure>
              <BaggageIcon />
            </figure>
            <p className="text-center font-body text-sm mb-6">
              Are you sure you want to leave without selectiing additional
              service for the first trip?
            </p>
            <div className="flex flex-wrap lg:flex-nowrap items-center justify-between w-full">
              <button
                onClick={() => setShow(false)}
                className="btn btn-primary font-bold basis-full lg:basis-[48%] lg:mr-2 mb-3 lg:mb-0"
              >
                Select Service
              </button>
              <button
                onClick={proceedToSeatSelectionWithoutSSR}
                className="btn btn-outline font-bold basis-full lg:basis-[48%]"
              >
                I don’t need it
              </button>
            </div>
          </div>
        </section>
      </Popup>
      <Popup
        display={showReturnPopUp}
        closeModal={() => setShowReturn(false)}
        top={true}
        width="w-[507px]"
      >
        <section className="w-full bg-white rounded-xl ">
          <div className="flex flex-col items-center justify-center p-[50px]">
            <h6 className="font-display text-xl mb-5">
              No extra service selected for the return trip
            </h6>
            <figure>
              <BaggageIcon />
            </figure>
            <p className="text-center font-body text-sm mb-6">
              Are you sure you want to leave without selectiing additional
              service for the return trip?
            </p>
            <div className="flex flex-wrap lg:flex-nowrap items-center justify-between w-full">
              <button
                onClick={() => setShowReturn(false)}
                className="btn btn-primary basis-full lg:basis-[48%] lg:mr-2 mb-3 lg:mb-0"
              >
                Select Service
              </button>
              <button
                onClick={proceedToSeatSelectionWithoutSSR}
                className="btn btn-outline basis-full lg:basis-[48%]"
              >
                I don’t need it
              </button>
            </div>
          </div>
        </section>
      </Popup>
    </BaseLayout>
  );
};

export default PassengerDetails;
