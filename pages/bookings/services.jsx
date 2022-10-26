/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import BaseLayout from "layouts/Base";
import { useDispatch, useSelector } from "react-redux";
import SkeletonLoader from "components/SkeletonLoader";
import {
  sessionSelector,
  GetBookingDetailsWithPNR,
} from "redux/reducers/session";
import { bookingSelector } from "redux/reducers/booking";
import {
  FetchSSRAvailability,
  setBookingSessionSSRs,
  setBookingSessionReturnSSRs,
  setNewBookingSSRs,
  setNewBookingReturnSSRs,
  setGoDifference,
  setReturnDifference,
  setNewSSRS,
  setNewReturnSSRS,
} from "redux/reducers/booking";
import BookingPassengerItem from "./components/BookingPassengerItem";
import { useRouter } from "next/router";
import { uniqueId } from "lodash";
import {
  _extractDiffrenceById,
  _extractUniqueDiffrenceById,
} from "utils/helpers";
import { useResellSSRMutation } from "services/bookingApi";
import { notification } from "antd";
import LogoIcon from "assets/svgs/logo.svg";

const PassengerDetails = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [selectedSSRs, setSSRs] = useState([]);
  const [selectedReturnSSRs, setReturnSSRs] = useState([]);
  const [ResellSSR, { isLoading: resellingSSR }] = useResellSSRMutation();

  const ALLOWED__SSRS = ["X20", "X15", "X10", "VPRD", "WCHR", "HPRD"];
  const NEW_SSRS = ["x20", "x15", "x10", "vprd", "wchr", "hprd"];

  const { signature, bookingResponseLoading, bookingResponse, returnParams } =
    useSelector(sessionSelector);

  const {
    SSRAvailabilityLoading,
    manageBookingPnr,

    bookingSessionSSRs,
    bookingSessionReturnSSRs,

    newBookingSSRs,
    newBookingReturnSSRs,

    goDifference,
    returnDifference,

    newSSRs,
    newReturnSSRs,

    tripParams,
  } = useSelector(bookingSelector);

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
    async function fetchBookingDetails() {
      if (signature && manageBookingPnr) {
        dispatch(FetchSSRAvailability());
        const payload = {
          pnr: manageBookingPnr,
        };
        dispatch(GetBookingDetailsWithPNR(payload));
      }
    }
    fetchBookingDetails();
  }, [signature]);

  useEffect(() => {
    async function setExisitingSSRS() {
      if (manageBookingPnr) {
        fiilExistingSSRs();
      }

      function fiilExistingSSRs() {
        if (bookingResponse && bookingResponse?.Booking) {
          const _TRIPS = bookingResponse?.Booking?.Journeys;
          if (_TRIPS?.length > 0) {
            if (goDifference?.length > 0 || returnDifference?.length > 0) {
              // /set nEw sssrs and return ssrs
            } else {
              if (_TRIPS?.length === 1) {
                const _SingleJourneySSRs = _TRIPS[0]?.Segments[0]?.PaxSSRs;
                const _BookingSSRs = [];
                _SingleJourneySSRs
                  .filter((ssrItem) => ALLOWED__SSRS.includes(ssrItem?.SSRCode))
                  .map((_ssr, _ssrIndex) => {
                    let uuid = uniqueId(
                      `${_ssr?.ArrivalStation}${_ssr?.DepartureStation}`
                    );
                    let newObj = {
                      id: `${Date.now()}${_ssrIndex}${uuid}`,
                      passengerNumber: parseInt(_ssr?.PassengerNumber),
                      ssrCode: _ssr?.SSRCode,
                      schedueIndex: 0,
                      ArrivalStation: _ssr?.ArrivalStation,
                      DepartureStation: _ssr?.DepartureStation,
                    };
                    _BookingSSRs.push(newObj);
                  });

                const BookingSessionIds = _BookingSSRs.map((ssr) =>
                  ssr?.ssrCode.toLowerCase()
                );
                const _newArr = NEW_SSRS.filter((ssr) => {
                  return !BookingSessionIds.includes(ssr.toLowerCase());
                });
                dispatch(setNewSSRS(_newArr));

                setSSRs(_BookingSSRs);
                dispatch(setNewBookingSSRs(_BookingSSRs));
                dispatch(setBookingSessionSSRs(_BookingSSRs));
              } else {
                const _GOSSRs = _TRIPS[0]?.Segments[0]?.PaxSSRs;
                const _RETURNSSRs = _TRIPS[1]?.Segments[0]?.PaxSSRs;

                const _BookingSessionSSRs = [];
                _GOSSRs
                  .filter((ssrItem) => ALLOWED__SSRS.includes(ssrItem?.SSRCode))
                  .map((_ssr, _ssrIndex) => {
                    const unique_id = uniqueId(
                      `${_ssr?.ArrivalStation}${_ssr?.DepartureStation}`
                    );
                    let newObj = {
                      id: `${Date.now()}${unique_id}`,
                      passengerNumber: parseInt(_ssr?.PassengerNumber),
                      ssrCode: _ssr?.SSRCode,
                      schedueIndex: 0,
                      ArrivalStation: _ssr?.ArrivalStation,
                      DepartureStation: _ssr?.DepartureStation,
                    };
                    _BookingSessionSSRs.push(newObj);
                  });

                const BookingSessionIds = _BookingSessionSSRs.map((ssr) =>
                  ssr?.ssrCode.toLowerCase()
                );
                const _newArr = NEW_SSRS.filter((ssr) => {
                  return !BookingSessionIds.includes(ssr.toLowerCase());
                });
                dispatch(setNewSSRS(_newArr)); //to do, store in redux state

                const _BookingSessionReturnSSRs = [];
                _RETURNSSRs
                  .filter((ssrItem) => ALLOWED__SSRS.includes(ssrItem?.SSRCode))
                  .map((_ssr) => {
                    const unique_id = uniqueId(
                      `${_ssr?.ArrivalStation}${_ssr?.DepartureStation}`
                    );
                    let newObj = {
                      id: `${Date.now()}${unique_id}`,
                      passengerNumber: parseInt(_ssr?.PassengerNumber),
                      ssrCode: _ssr?.SSRCode,
                      schedueIndex: 0,
                      ArrivalStation: _ssr?.ArrivalStation,
                      DepartureStation: _ssr?.DepartureStation,
                    };
                    _BookingSessionReturnSSRs.push(newObj);
                  });

                const BookingSessionReturnIds = _BookingSessionReturnSSRs.map(
                  (ssr) => ssr?.ssrCode.toLowerCase()
                );
                const newArr = NEW_SSRS.filter((ssr) => {
                  return !BookingSessionReturnIds.includes(ssr.toLowerCase());
                });
                dispatch(setNewReturnSSRS(newArr)); //to do, store in redux state

                setSSRs(_BookingSessionSSRs);
                setReturnSSRs(_BookingSessionReturnSSRs);

                dispatch(setNewBookingSSRs(_BookingSessionSSRs));
                dispatch(setNewBookingReturnSSRs(_BookingSessionReturnSSRs));

                dispatch(setBookingSessionSSRs(_BookingSessionSSRs));
                dispatch(
                  setBookingSessionReturnSSRs(_BookingSessionReturnSSRs)
                );
              }
            }
          }
        }
      }
    }
    setExisitingSSRS();
  }, [bookingResponse]);

  const ProceedToSellSSR = async () => {
    if (newBookingSSRs.length > 0 || newBookingReturnSSRs.length > 0) {
      let Extras = newBookingSSRs.filter(function (ssr) {
        if (
          ssr?.ssrCode === "WCHR" ||
          ssr?.ssrCode === "VPRD" ||
          ssr?.ssrCode === "HPRD"
        )
          return true;
      });

      if (Extras?.length > 0) {
        const _Arrival =
          bookingResponse?.Booking?.Journeys[0]?.Segments[0]?.ArrivalStation;
        const _Departure =
          bookingResponse?.Booking?.Journeys[0]?.Segments[0]?.DepartureStation;
        const existingReturnSSRs = [...newBookingReturnSSRs];
        Extras.map((_item) => {
          const newObj = {
            ..._item,
            schedueIndex: 1,
            ArrivalStation: _Departure,
            DepartureStation: _Arrival,
          };
          existingReturnSSRs.push(newObj);
        });

        let newBookingSSRsPayload = [];
        let newBookingReturnSSRsPayload = [];

        if (bookingSessionSSRs.length > 0) {
          if (tripParams && parseInt(tripParams?.LiftStatus) === 0) {
            newBookingSSRsPayload = _extractUniqueDiffrenceById(
              newBookingSSRs,
              bookingSessionSSRs,
              newSSRs
            );
          }
        } else {
          if (tripParams && parseInt(tripParams?.LiftStatus) === 0) {
            newBookingSSRsPayload = _extractDiffrenceById(
              newBookingSSRs,
              bookingSessionSSRs
            );
          }
        }

        if (bookingResponse?.Booking?.Journeys?.length > 1) {
          if (bookingSessionReturnSSRs.length > 0) {
            if (returnParams && parseInt(returnParams?.LiftStatus) === 0) {
              newBookingReturnSSRsPayload = _extractUniqueDiffrenceById(
                existingReturnSSRs,
                bookingSessionReturnSSRs,
                newReturnSSRs
              );
            }
          } else {
            if (returnParams && parseInt(returnParams?.LiftStatus) === 0) {
              newBookingReturnSSRsPayload = _extractDiffrenceById(
                existingReturnSSRs,
                bookingSessionReturnSSRs
              );
            }
          }
        }

        await sendSellRequest(newBookingSSRsPayload, [
          ...newBookingReturnSSRsPayload,
        ]);
      } else {
        let newBookingSSRsPayload = [];
        let newBookingReturnSSRsPayload = [];

        if (bookingSessionSSRs.length > 0) {
          newBookingSSRsPayload = _extractUniqueDiffrenceById(
            newBookingSSRs,
            bookingSessionSSRs,
            newSSRs
          );
        } else {
          newBookingSSRsPayload = _extractDiffrenceById(
            newBookingSSRs,
            bookingSessionSSRs
          );
        }

        if (bookingSessionReturnSSRs.length > 0) {
          newBookingReturnSSRsPayload = _extractUniqueDiffrenceById(
            newBookingReturnSSRs,
            bookingSessionReturnSSRs,
            newReturnSSRs
          );
        } else {
          newBookingReturnSSRsPayload = _extractDiffrenceById(
            newBookingReturnSSRs,
            bookingSessionReturnSSRs
          );
        }

        await sendSellRequest(
          newBookingSSRsPayload,
          newBookingReturnSSRsPayload
        );
      }
    } else {
      router.back();
    }
  };

  const sendSellRequest = async (payload, returnPayload = []) => {
    dispatch(setGoDifference(payload));
    dispatch(setReturnDifference(returnPayload));

    console.log("go payload", payload);
    console.log("return payload", returnPayload);

    const segmentSSRRequests = [];
    const _bookingResponse = bookingResponse;

    let JourneyOneSSRs = [];
    let JourneyTwoSSRs = [];

    payload.length > 0
      ? payload.map((_ssr) => {
          let newObj = {
            state: 0,
            stateSpecified: true,
            actionStatusCode: "NN",
            departureStation: _ssr?.DepartureStation,
            arrivalStation: _ssr?.ArrivalStation,
            passengerNumber: _ssr?.passengerNumber,
            passengerNumberSpecified: true,
            ssrCode: _ssr?.ssrCode,
            ssrNumberSpecified: true,
            ssrNumber: 0,
            ssrDetail: "",
            feeCode: "",
            note: "",
            ssrValue: 0,
            ssrValueSpecified: true,
            isInServiceBundle: false,
            isInServiceBundleSpecified: true,
          };
          JourneyOneSSRs.push(newObj);
        })
      : null;

    returnPayload.length > 0
      ? returnPayload.map((_ssr) => {
          let newObj = {
            state: 0,
            stateSpecified: true,
            actionStatusCode: "NN",
            departureStation: _ssr?.DepartureStation,
            arrivalStation: _ssr?.ArrivalStation,
            passengerNumber: _ssr?.passengerNumber,
            passengerNumberSpecified: true,
            ssrCode: _ssr?.ssrCode,
            ssrNumberSpecified: true,
            ssrNumber: 0,
            ssrDetail: "",
            feeCode: "",
            note: "",
            ssrValue: 0,
            ssrValueSpecified: true,
            isInServiceBundle: false,
            isInServiceBundleSpecified: true,
          };
          JourneyTwoSSRs.push(newObj);
        })
      : null;

    if (_bookingResponse) {
      const JOURNEYS = _bookingResponse?.Booking?.Journeys;
      JOURNEYS.map((_journey, _index) => {
        let _segment = {
          flightDesignator: {
            carrierCode: _journey?.Segments[0].FlightDesignator?.CarrierCode,
            flightNumber: _journey?.Segments[0].FlightDesignator?.FlightNumber,
            opSuffix: "",
          },
          std: _journey?.Segments[0]?.STD,
          stdSpecified: true,
          departureStation: _journey?.Segments[0]?.DepartureStation,
          arrivalStation: _journey?.Segments[0]?.ArrivalStation,
          paxSSRs: _index === 0 ? [...JourneyOneSSRs] : [...JourneyTwoSSRs],
        };
        segmentSSRRequests.push(_segment);
      });
    }

    ResellSSR(segmentSSRRequests)
      .unwrap()
      .then((data) => {
        router.push(`/bookings/confirm`);
      })
      .catch(() => {
        notification.error({
          message: "Error",
          description: "Sell Services failed",
        });
      });
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
            {bookingResponseLoading || SSRAvailabilityLoading ? (
              <>
                <SkeletonLoader />
                <SkeletonLoader />
                <SkeletonLoader />
              </>
            ) : bookingResponse && bookingResponse?.Booking ? (
              <>
                <h2 className="text-primary-main font-extrabold text-2xl mb-8">
                  Additional Services{" "}
                </h2>

                <section className="flex flex-col rounded-xl pb-1 bg-transparent">
                  {bookingResponse?.Booking?.Passengers.length > 0 ? (
                    bookingResponse?.Booking?.Passengers.map((_sesPax) => {
                      return (
                        <BookingPassengerItem
                          passenger={_sesPax}
                          selectedSSRs={selectedSSRs}
                          setSSRs={setSSRs}
                          setReturnSSRs={setReturnSSRs}
                          selectedReturnSSRs={selectedReturnSSRs}
                        />
                      );
                    })
                  ) : (
                    <p className="errorText mb-8">No Passenger in Session</p>
                  )}

                  {bookingResponse?.Booking?.Passengers.length > 0 && (
                    <div className="flex items-center">
                      <button
                        onClick={() => router.back()}
                        className="btn btn-outline mr-2"
                      >
                        Go Back
                      </button>
                      <button
                        onClick={ProceedToSellSSR}
                        className="btn btn-primary"
                      >
                        {resellingSSR ? "Processing" : "Continue"}
                      </button>
                    </div>
                  )}
                </section>
              </>
            ) : (
              <p className="errorText">No State in Session</p>
            )}
          </div>
        </section>
      </section>
    </BaseLayout>
  );
};

export default PassengerDetails;
