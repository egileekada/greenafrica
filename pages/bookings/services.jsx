/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import BaseLayout from "layouts/Base";

import { useDispatch, useSelector } from "react-redux";
import SkeletonLoader from "components/SkeletonLoader";
import { FetchStateFromServer, sessionSelector } from "redux/reducers/session";
import { bookingSelector } from "redux/reducers/booking";
import {
  FetchSSRAvailability,
  ReSellSSROption,
  setBookingSessionSSRs,
  setBookingSessionReturnSSRs,
  CancelSSRs,
} from "redux/reducers/booking";
import BookingPassengerItem from "./components/BookingPassengerItem";
import { useRouter } from "next/router";

const PassengerDetails = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [selectedSSRs, setSSRs] = useState([]);
  const [selectedReturnSSRs, setReturnSSRs] = useState([]);
  const ALLOWED__SSRS = ["X20", "X15", "X10", "VPRD", "WCHR", "HPRD"];

  const { sessionStateLoading, sessionStateResponse, signature } =
    useSelector(sessionSelector);

  const { SSRAvailabilityLoading, ResellSSRLoading } =
    useSelector(bookingSelector);

  useEffect(() => {
    async function fetchBookingDetails() {
      if (signature) {
        dispatch(FetchSSRAvailability());
        dispatch(FetchStateFromServer());
      }
    }
    fetchBookingDetails();
  }, [signature]);

  useEffect(() => {
    async function setExisitingSSRS() {
      if (sessionStateResponse) {
        const _TRIPS = sessionStateResponse?.BookingData?.Journeys;

        if (_TRIPS?.length > 0) {
          if (_TRIPS?.length === 1) {
            const _SingleJourneySSRs = _TRIPS[0]?.Segments[0]?.PaxSSRs;
            const _BookingSSRs = [];
            _SingleJourneySSRs
              .filter((ssrItem) => ALLOWED__SSRS.includes(ssrItem?.SSRCode))
              .map((_ssr) => {
                let newObj = {
                  passengerNumber: parseInt(_ssr?.PassengerNumber),
                  ssrCode: _ssr?.SSRCode,
                  schedueIndex: 0,
                  ArrivalStation: _ssr?.ArrivalStation,
                  DepartureStation: _ssr?.DepartureStation,
                };
                _BookingSSRs.push(newObj);
              });
            if (_SingleJourneySSRs.length > 0) {
              dispatch(CancelSSRs());
            }
            setSSRs(_BookingSSRs);
            dispatch(setBookingSessionSSRs(_BookingSSRs));
          } else {
            const _GOSSRs = _TRIPS[0]?.Segments[0]?.PaxSSRs;
            const _RETURNSSRs = _TRIPS[1]?.Segments[0]?.PaxSSRs;

            const _BookingSessionSSRs = [];
            _GOSSRs
              .filter((ssrItem) => ALLOWED__SSRS.includes(ssrItem?.SSRCode))
              .map((_ssr) => {
                let newObj = {
                  passengerNumber: parseInt(_ssr?.PassengerNumber),
                  ssrCode: _ssr?.SSRCode,
                  schedueIndex: 0,
                  ArrivalStation: _ssr?.ArrivalStation,
                  DepartureStation: _ssr?.DepartureStation,
                };
                _BookingSessionSSRs.push(newObj);
              });

            const _BookingSessionReturnSSRs = [];
            _RETURNSSRs
              .filter((ssrItem) => ALLOWED__SSRS.includes(ssrItem?.SSRCode))
              .map((_ssr) => {
                let newObj = {
                  passengerNumber: parseInt(_ssr?.PassengerNumber),
                  ssrCode: _ssr?.SSRCode,
                  schedueIndex: 0,
                  ArrivalStation: _ssr?.ArrivalStation,
                  DepartureStation: _ssr?.DepartureStation,
                };
                _BookingSessionReturnSSRs.push(newObj);
              });

            if (_GOSSRs.length > 0 || _RETURNSSRs.length > 0) {
              dispatch(CancelSSRs());
            }

            setSSRs(_BookingSessionSSRs);
            setReturnSSRs(_BookingSessionReturnSSRs);
            dispatch(setBookingSessionSSRs(_BookingSessionSSRs));
            dispatch(setBookingSessionReturnSSRs(_BookingSessionReturnSSRs));
          }
        }
      }
    }
    setExisitingSSRS();
  }, [sessionStateResponse]);

  const ProceedToSellSSR = () => {
    if (selectedSSRs.length > 0 || selectedReturnSSRs.length > 0) {
      let Extras = selectedSSRs.filter(function (ssr) {
        if (
          ssr?.ssrCode === "WCHR" ||
          ssr?.ssrCode === "VPRD" ||
          ssr?.ssrCode === "HPRD"
        )
          return true;
      });

      if (Extras?.length > 0) {
        const _Arrival =
          sessionStateResponse?.BookingData?.Journeys[0]?.Segments[0]
            ?.ArrivalStation;
        const _Departure =
          sessionStateResponse?.BookingData?.Journeys[0]?.Segments[0]
            ?.DepartureStation;
        const existingReturnSSRs = [...selectedReturnSSRs];
        Extras.map((_item) => {
          const newObj = {
            ..._item,
            schedueIndex: 1,
            ArrivalStation: _Departure,
            DepartureStation: _Arrival,
          };
          existingReturnSSRs.push(newObj);
        });
        setReturnSSRs([...existingReturnSSRs]);
        dispatch(ReSellSSROption(selectedSSRs, [...existingReturnSSRs]));
      } else {
        dispatch(ReSellSSROption(selectedSSRs, selectedReturnSSRs));
      }
    } else {
      router.back();
    }
  };

  return (
    <BaseLayout>
      <section className="w-full">
        <section className="ga__section bg-normal">
          <div className="ga__section__main standalone">
            {sessionStateLoading || SSRAvailabilityLoading ? (
              <SkeletonLoader />
            ) : sessionStateResponse && sessionStateResponse?.BookingData ? (
              <>
                <h2 className="text-primary-main font-extrabold text-2xl mb-8">
                  Additional Services{" "}
                </h2>

                <section className="flex flex-col rounded-xl pb-1 bg-transparent">
                  {sessionStateResponse?.BookingData?.Passengers.length > 0 ? (
                    sessionStateResponse?.BookingData?.Passengers.map(
                      (_sesPax) => {
                        return (
                          <BookingPassengerItem
                            passenger={_sesPax}
                            selectedSSRs={selectedSSRs}
                            setSSRs={setSSRs}
                            setReturnSSRs={setReturnSSRs}
                            selectedReturnSSRs={selectedReturnSSRs}
                          />
                        );
                      }
                    )
                  ) : (
                    <p className="errorText mb-8">No Passenger in Session</p>
                  )}

                  {sessionStateResponse?.BookingData?.Passengers.length > 0 && (
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
                        {ResellSSRLoading ? "Saving" : "Continue"}
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
