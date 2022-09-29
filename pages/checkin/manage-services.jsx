/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import BaseLayout from "layouts/Base";
import { useDispatch, useSelector } from "react-redux";
import SkeletonLoader from "components/SkeletonLoader";
import {
  GetBookingDetailsWithPNR,
  sessionSelector,
} from "redux/reducers/session";
import {
  FetchSSRAvailability,
  setCheckinSessionSSRs,
  setCheckinSessionReturnSSRs,
  checkinSelector,
  setNewCheckinSSRs,
  setNewCheckinReturnSSRs,
} from "redux/reducers/checkin";
import CheckinPassengerItem from "./components/CheckinPassengerItem";
import { useRouter } from "next/router";
import { extractUniqueDiffrenceById } from "utils/helpers";
import { useSaveNewCheckInSSRsMutation } from "services/bookingApi";
import { notification } from "antd";
import { uniqueId } from "lodash";

const PassengerDetails = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [selectedSSRs, setSSRs] = useState([]);
  const [selectedReturnSSRs, setReturnSSRs] = useState([]);
  const ALLOWED__SSRS = ["X20", "X15", "X10", "VPRD", "WCHR", "HPRD"];

  const {
    signature,
    bookingResponseLoading,
    bookingResponse,
    selectedPassengers,
  } = useSelector(sessionSelector);

  const {
    SSRAvailabilityLoading,
    ResellSSRLoading,
    checkinPNR,

    checkinSessionSSRs,
    checkinSessionReturnSSRs,

    newCheckinSSRs,
    newCheckinReturnSSRs,
  } = useSelector(checkinSelector);

  const [saveNewCheckInSSRs, { isLoading: sellNewCheckinSSRsLoading }] =
    useSaveNewCheckInSSRsMutation();

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
      if (signature && checkinPNR) {
        dispatch(FetchSSRAvailability());
        const payload = {
          pnr: checkinPNR,
        };
        dispatch(GetBookingDetailsWithPNR(payload));
      }
    }
    fetchBookingDetails();
  }, [signature]);

  useEffect(() => {
    async function setExisitingSSRS() {
      if (checkinPNR) {
        if (bookingResponse && bookingResponse?.Booking) {
          const _TRIPS = bookingResponse?.Booking?.Journeys;

          if (_TRIPS?.length > 0) {
            if (_TRIPS?.length === 1) {
              const _SingleJourneySSRs = _TRIPS[0]?.Segments[0]?.PaxSSRs;
              const _BookingSSRs = [];
              _SingleJourneySSRs
                .filter((ssrItem) => ALLOWED__SSRS.includes(ssrItem?.SSRCode))
                .map((_ssr, _ssrIndex) => {
                  let uuid = uniqueId();
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

              setSSRs(_BookingSSRs);
              dispatch(setCheckinSessionSSRs(_BookingSSRs));
              dispatch(setNewCheckinSSRs(_BookingSSRs));
            } else {
              const _GOSSRs = _TRIPS[0]?.Segments[0]?.PaxSSRs;
              const _RETURNSSRs = _TRIPS[1]?.Segments[0]?.PaxSSRs;

              const _BookingSessionSSRs = [];
              _GOSSRs
                .filter((ssrItem) => ALLOWED__SSRS.includes(ssrItem?.SSRCode))
                .map((_ssr, _ssrIndex) => {
                  const unique_id = uniqueId();
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

              const _BookingSessionReturnSSRs = [];
              _RETURNSSRs
                .filter((ssrItem) => ALLOWED__SSRS.includes(ssrItem?.SSRCode))
                .map((_ssr) => {
                  const unique_id = uniqueId();
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

              setSSRs(_BookingSessionSSRs);
              setReturnSSRs(_BookingSessionReturnSSRs);

              dispatch(setCheckinSessionSSRs(_BookingSessionSSRs));
              dispatch(setNewCheckinSSRs(_BookingSessionSSRs));

              dispatch(setCheckinSessionReturnSSRs(_BookingSessionReturnSSRs));
              dispatch(setNewCheckinReturnSSRs(_BookingSessionReturnSSRs));
            }
          }
        }
      }
    }
    setExisitingSSRS();
  }, [bookingResponse]);

  const ProceedToSellSSR = () => {
    if (newCheckinSSRs.length > 0 || newCheckinReturnSSRs.length > 0) {
      const newCheckinSSRsPayload = extractUniqueDiffrenceById(
        newCheckinSSRs,
        checkinSessionSSRs
      );

      const newCheckinReturnSSRsPayload = extractUniqueDiffrenceById(
        newCheckinReturnSSRs,
        checkinSessionReturnSSRs
      );

      const segmentSSRRequests = [];
      let JourneyOneSSRs = [];
      let JourneyTwoSSRs = [];

      newCheckinSSRsPayload.length > 0
        ? newCheckinSSRsPayload.map((_ssr) => {
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

      newCheckinReturnSSRsPayload.length > 0
        ? newCheckinReturnSSRsPayload.map((_ssr) => {
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

      if (bookingResponse) {
        const JOURNEYS = bookingResponse?.Booking?.Journeys;
        JOURNEYS.map((_journey, _index) => {
          let _segment = {
            flightDesignator: {
              carrierCode: _journey?.Segments[0].FlightDesignator?.CarrierCode,
              flightNumber:
                _journey?.Segments[0].FlightDesignator?.FlightNumber,
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

      saveNewCheckInSSRs(segmentSSRRequests)
        .unwrap()
        .then((data) => {
          // console.log("rrrrr success", data);
          router.push("/checkin/seat-selection");
        })
        .catch((error) => {
          notification.error({
            message: "Error",
            description: "Sell Services failed",
          });
        });
    } else {
      router.push("/checkin/seat-selection");
    }
  };

  return (
    <BaseLayout>
      <section className="w-full">
        <section className="ga__section bg-normal">
          <div className="ga__section__main standalone">
            {bookingResponseLoading || SSRAvailabilityLoading ? (
              <SkeletonLoader />
            ) : bookingResponse && bookingResponse?.Booking ? (
              <>
                <h2 className="text-primary-main font-extrabold text-2xl mb-8">
                  Additional Services{" "}
                </h2>

                <section className="flex flex-col rounded-xl pb-1 bg-transparent">
                  {selectedPassengers?.length > 0 ? (
                    selectedPassengers.map((_sesPax) => {
                      return (
                        <CheckinPassengerItem
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
                        {ResellSSRLoading || sellNewCheckinSSRsLoading
                          ? "Saving"
                          : "Continue"}
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
