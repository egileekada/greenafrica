/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useState } from "react";
import BaseLayout from "layouts/Base";
import FlightIcon from "assets/svgs/FlightTwo.svg";
import ArrowTo from "assets/svgs/arrowto.svg";
import { Checkbox } from "antd";
import LogoIcon from "assets/svgs/logo.svg";
import AeroIcon from "assets/svgs/aero.svg";
import DottedLine from "assets/svgs/dotted-line.svg";
import WorkIcon from "assets/svgs/work.svg";
import CreditBar from "containers/IbeSidebar/Creditbar";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  creditSelector,
  setCreditPnrWithoutPayment,
} from "redux/reducers/credit";
import { sessionSelector } from "redux/reducers/session";
import { format, differenceInMinutes } from "date-fns";
import { timeConvert } from "utils/common";
import { notification } from "antd";
import { useBookingCommitWithoutPaymentMutation } from "services/bookingApi";

import {
  useResellNewJourneyMutation,
  useCancelSSRMutation,
  useResellSSRMutation,
} from "services/bookingApi";
import { useGetLocationsQuery } from "services/widgetApi.js";

const TripView = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  const {
    creditGoTrip,
    creditReturnTrip,
    creditTripParams,
    creditReturnParams,
  } = useSelector(creditSelector);
  const { bookingResponse } = useSelector(sessionSelector);
  const { data } = useGetLocationsQuery();

  const [ResellSSR, { isLoading: resellingSSR }] = useResellSSRMutation();
  const [CancelSSR, { isLoading: cancellingSSR }] = useCancelSSRMutation();
  const [ResellNewJourney, { isLoading: resellingJourney }] =
    useResellNewJourneyMutation();

  const [bookingCommitWithoutPayment, { isLoading: commitPaymentLoading }] =
    useBookingCommitWithoutPaymentMutation();

  const onCheckChange = (e) => {
    setChecked(e.target.checked);
  };

  const goBackToHome = () => {
    window.location.assign("https://dev-website.gadevenv.com/");
  };

  const JourneyItem = ({ trip, changeFlight }) => {
    const fare_name =
      trip?.fare?.RuleNumber?.toLowerCase() === "flex"
        ? "gFlex"
        : trip?.fare?.RuleNumber?.toLowerCase() === "savr"
        ? "gSaver"
        : "gClassic";

    const totalServiceCharge = trip?.fare
      ? trip?.fare?.PaxFares[0]?.ServiceCharges?.reduce(
          (accumulator, object) => {
            return accumulator + object.Amount;
          },
          0
        )
      : "0";

    return (
      <section className="flex flex-col mb-8">
        <h2 className="text-primary-main font-extrabold text-base md:text-2xl mb-8">
          {trip?.segment?.schedueIndex === 1 && "Return"} Trip To{" "}
          {trip?.segment && resolveAbbreviation(trip?.segment?.ArrivalStation)}{" "}
          On{" "}
          {trip?.segment?.schedueIndex === 1
            ? format(
                new Date(creditReturnParams?.returnDate),
                "EEEE, LLLL dd yyyy"
              )
            : format(
                new Date(creditTripParams?.beginDate),
                "EEEE, LLLL dd yyyy"
              )}
        </h2>

        {/* TripHeader */}
        <section className="ibe__flight__info__destination">
          <p>
            {" "}
            {trip?.segment &&
              resolveAbbreviation(trip?.segment?.DepartureStation)}
          </p>
          <figure>
            <ArrowTo />
          </figure>
          <p>
            {" "}
            {trip?.segment &&
              resolveAbbreviation(trip?.segment?.ArrivalStation)}
          </p>

          <figure className="flightCircle">
            <FlightIcon />
          </figure>
        </section>
        {/* TripHeader*/}

        {/* TripInfo */}
        <section className="ibe__trip__item tripView">
          <div className="basis-full flex  flex-col min-h-[54px] ">
            <p className="tripType self-center underline">
              {trip?.segment?.FlightDesignator?.CarrierCode}
              &nbsp;
              {trip?.segment?.FlightDesignator?.FlightNumber}
            </p>
            <div className="flex justify-between">
              <div className="flex flex-col">
                <h5 className="tripType">
                  {" "}
                  {trip?.segment &&
                    format(new Date(trip?.segment?.STD), "HH:mm")}
                </h5>
                <p className="tripCity">
                  {" "}
                  {trip?.segment &&
                    resolveAbbreviation(trip?.segment?.DepartureStation)}
                </p>
              </div>
              <div className="tripIconPath">
                <DottedLine className="dotted-svg" />
                <AeroIcon className="aero-svg" />
                <DottedLine className="dotted-svg" />
              </div>
              <div className="flex flex-col items-end">
                <h5 className="tripType right-text font-bold">
                  {" "}
                  {trip?.segment &&
                    format(new Date(trip?.segment?.STA), "HH:mm")}
                </h5>
                <p className="tripCity right-text">
                  {" "}
                  {trip?.segment &&
                    resolveAbbreviation(trip?.segment?.ArrivalStation)}
                </p>
              </div>
            </div>
            <p className="tripTime self-center">
              {" "}
              {trip?.segment &&
                timeConvert(
                  differenceInMinutes(
                    new Date(trip?.segment?.STA),
                    new Date(trip?.segment?.STD)
                  )
                )}
            </p>
          </div>
        </section>
        {/* TripInfo */}
        {/* TripPackage */}
        <section className="ibe__trip__package flex justify-between">
          <div className="flex flex-col">
            <h5>TRAVEL PACKAGE</h5>
            <h6>{fare_name}</h6>
          </div>
          <div className="flex flex-col items-end">
            <h5>FARE PRICE</h5>
            <h6> ₦{totalServiceCharge?.toLocaleString("NGN")}</h6>
          </div>
        </section>
        {/* TripPackage */}

        {/* Flight Number */}
        <div className="ibe__trip__number tripView">
          <div className="flex flex-wrap lg:flex-nowrap items-center justify-between">
            <div className="flex items-center basis-full lg:basis-1/2 mb-6">
              <figure className="w-[41px] h-[41px] rounded-full flex items-center justify-center bg-primary-main mr-4">
                <WorkIcon />
              </figure>
              <h4 className="mb-0">7kg hand luggage: 55 x40 x 24cm</h4>
            </div>
            {/* <button
              onClick={changeFlight}
              className="btn btn-outline basis-full lg:basis-auto flex-shrink-0"
            >
              Change Flight
            </button> */}
          </div>
        </div>
        {/* Flight Number */}
      </section>
    );
  };

  const goChangeFlight = () => {
    router.push("/credit/change-flight");
  };

  const returnChangeFlight = () => {
    router.push("/credit/change-flight");
  };

  const resellJourney = () => {
    const paxPriceTypes = [];
    const _serviceBundleList = [];

    const ADULT_COUNT = bookingResponse?.Booking?.Passengers.filter((_pax) => {
      return _pax?.PassengerTypeInfo?.PaxType.toLowerCase() === "adt";
    }).length;

    const CHILD_COUNT = bookingResponse?.Booking?.Passengers.filter((_pax) => {
      return _pax?.PassengerTypeInfo?.PaxType.toLowerCase() === "chd";
    }).length;

    const totalPaxCount = bookingResponse?.Booking?.Passengers?.length;

    if (ADULT_COUNT > 0) {
      const _newPType = {
        paxType: "ADT",
        paxDiscountCode: "",
        paxCount: ADULT_COUNT,
        paxCountSpecified: true,
      };
      paxPriceTypes.push(_newPType);
    }

    if (CHILD_COUNT > 0) {
      const _newPType = {
        paxType: "CHD",
        paxDiscountCode: "",
        paxCount: CHILD_COUNT,
        paxCountSpecified: true,
      };
      paxPriceTypes.push(_newPType);
    }

    const _journeySellKeys = [];

    // SSR RELATED
    let JourneyOneSegmentSSRRequest = null;
    let JourneyTwoSegmentSSRRequest = null;
    let JourneyOne = null;
    let JourneyTwo = null;
    // SSR RELATED
    if (creditGoTrip) {
      let newObj = {
        JourneySellKey: creditGoTrip?.journey?.JourneySellKey,
        FareSellKey: creditGoTrip?.fare?.FareSellKey,
        standbyPriorityCode: "",
        packageIndicator: "",
      };
      _journeySellKeys.push(newObj);
      _serviceBundleList.push(creditGoTrip?.fare?.RuleNumber);

      const ALLOWED__SSRS = ["X20", "X15", "X10", "VPRD", "WCHR", "HPRD"];

      const JourneyOneSSRsExSeat =
        bookingResponse?.Booking?.Journeys[0].Segments[0].PaxSSRs.filter(
          (ssrItem) => ALLOWED__SSRS.includes(ssrItem?.SSRCode)
        );

      JourneyOneSegmentSSRRequest = {
        flightDesignator: {
          carrierCode: creditGoTrip?.segment?.FlightDesignator?.CarrierCode,
          flightNumber: creditGoTrip?.segment?.FlightDesignator?.FlightNumber,
          opSuffix: "",
        },
        std: creditGoTrip?.segment?.STD,
        stdSpecified: true,
        departureStation: creditGoTrip?.segment?.DepartureStation,
        arrivalStation: creditGoTrip?.segment?.ArrivalStation,
        paxSSRs: [...JourneyOneSSRsExSeat],
      };
      JourneyOne = {
        ...bookingResponse?.Booking?.Journeys[0],
        State: 0,
      };
    }

    if (creditReturnTrip) {
      let newObj = {
        JourneySellKey: creditReturnTrip?.journey?.JourneySellKey,
        FareSellKey: creditReturnTrip?.fare?.FareSellKey,
        standbyPriorityCode: "",
        packageIndicator: "",
      };
      _journeySellKeys.push(newObj);
      _serviceBundleList.push(creditReturnTrip?.fare?.RuleNumber);

      const ALLOWED__SSRS = ["X20", "X15", "X10", "VPRD", "WCHR", "HPRD"];

      const JourneyTwoSSRsExSeat =
        bookingResponse?.Booking?.Journeys[1].Segments[0].PaxSSRs;

      JourneyTwoSegmentSSRRequest = {
        flightDesignator: {
          carrierCode: creditReturnTrip?.segment?.FlightDesignator?.CarrierCode,
          flightNumber:
            creditReturnTrip?.segment?.FlightDesignator?.FlightNumber,
          opSuffix: "",
        },
        std: creditReturnTrip?.segment?.STD,
        stdSpecified: true,
        departureStation: creditReturnTrip?.segment?.DepartureStation,
        arrivalStation: creditReturnTrip?.segment?.ArrivalStation,
        paxSSRs: [
          ...JourneyTwoSSRsExSeat.filter((ssrItem) =>
            ALLOWED__SSRS.includes(ssrItem?.SSRCode)
          ),
        ],
      };

      JourneyTwo = {
        ...bookingResponse?.Booking?.Journeys[1],
        State: 0,
      };
    }

    const requestPayload = {
      sellRequestDto: {
        sellRequest: {
          sellRequestData: {
            sellBy: 0,
            sellBySpecified: true,
            sellJourneyByKeyRequest: {
              sellJourneyByKeyRequestData: {
                actionStatusCode: "NN",
                journeySellKeys: [..._journeySellKeys],
                paxPriceType: [...paxPriceTypes],
                currencyCode: "NGN",
                paxCount: totalPaxCount,
                paxCountSpecified: true,
                loyaltyFilter: 0,
                loyaltyFilterSpecified: true,
                isAllotmentMarketFare: false,
                isAllotmentMarketFareSpecified: true,
                preventOverLap: false,
                preventOverLapSpecified: true,
                replaceAllPassengersOnUpdate: false,
                replaceAllPassengersOnUpdateSpecified: true,
                serviceBundleList: [..._serviceBundleList],
                applyServiceBundle: 1,
                applyServiceBundleSpecified: true,
              },
            },
          },
        },
      },
    };

    ResellNewJourney(requestPayload)
      .unwrap()
      .then((data) => {
        const segmentSSRRequests = [];
        JourneyOneSegmentSSRRequest &&
          segmentSSRRequests.push(JourneyOneSegmentSSRRequest);
        JourneyTwoSegmentSSRRequest &&
          segmentSSRRequests.push(JourneyTwoSegmentSSRRequest);

        ResellSSR(segmentSSRRequests)
          .unwrap()
          .then((data) => {
            const _journeys = [];
            JourneyOne && _journeys.push(JourneyOne);
            JourneyTwo && _journeys.push(JourneyTwo);
            const cancelSSRRequest = {
              cancelRequestData: {
                cancelBy: 0,
                cancelBySpecified: true,
                cancelJourney: {
                  cancelJourneyRequest: {
                    journeys: [..._journeys],
                    waivePenaltyFee: false,
                    waivePenaltyFeeSpecified: true,
                    waiveSpoilageFee: false,
                    waiveSpoilageFeeSpecified: true,
                    preventReprice: false,
                    preventRepriceSpecified: true,
                    forceRefareForItineraryIntegrity: false,
                    forceRefareForItineraryIntegritySpecified: true,
                    recordLocator: bookingResponse?.Booking?.RecordLocator,
                  },
                },
              },
            };
            CancelSSR(cancelSSRRequest)
              .unwrap()
              .then((data) => {
                if (
                  parseInt(
                    data?.BookingUpdateResponseData?.Success?.PNRAmount
                      ?.BalanceDue
                  ) > 0
                ) {
                  router.push(`/credit/payment`);
                } else {
                  console.log("commmitin without payment");
                  bookingCommitWithoutPayment()
                    .unwrap()
                    .then((data) => {
                      dispatch(
                        setCreditPnrWithoutPayment(
                          data?.BookingUpdateResponseData?.Success
                            ?.RecordLocator
                        )
                      );
                      router.push(
                        {
                          pathname: "/credit/home",
                          query: {
                            pnr: data?.BookingUpdateResponseData?.Success
                              ?.RecordLocator,
                          },
                        },
                        "/credit/home"
                      );
                    })
                    .catch((error) => {
                      notification.error({
                        message: "Error",
                        description: "Booking Commit Failed",
                      });
                    });
                }
              })
              .catch(() => {
                notification.error({
                  message: "Error",
                  description: "Cancel Services failed",
                });
              });
          })
          .catch(() => {
            notification.error({
              message: "Error",
              description: "Sell Services failed",
            });
          });
      })
      .catch((err) => {
        const errText =
          err?.response?.data?.BookingUpdateResponseData?.Error?.ErrorText;
        console.log(" errText", errText);
        notification.error({
          message: "Error",
          description: errText ? errText : "Sell Request failed",
        });
      });
  };

  const resolveAbbreviation = (abrreviation) => {
    const [{ name, code }] = data?.data?.items.filter(
      (location) => location.code === abrreviation
    );

    return `${name} (${code})`;
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
      <section className="w-full">
        <section className="ga__section">
          <div className="ga__section__main">
            <section className="flex flex-col mt-16 lg:mt-0">
              <section className="flex flex-col">
                {creditGoTrip?.journey &&
                  creditGoTrip?.fare &&
                  creditGoTrip?.segment && (
                    <JourneyItem
                      trip={creditGoTrip}
                      changeFlight={goChangeFlight}
                    />
                  )}
                {creditReturnTrip?.journey &&
                  creditReturnTrip?.fare &&
                  creditReturnTrip?.segment && (
                    <JourneyItem
                      trip={creditReturnTrip}
                      changeFlight={returnChangeFlight}
                    />
                  )}

                {/* Terms */}
                <div className="flex flex-col my-6">
                  <div className="flex mb-6">
                    <div className="flex items-center checkbox-copy mb-6">
                      <Checkbox onChange={onCheckChange}>
                        <label className="check-label"></label>
                      </Checkbox>
                    </div>

                    <p>
                      I have read and accept the airline’s &nbsp;
                      <Link href="/terms">
                        <a className="text-primary-main hover:text-green underline font-display">
                          Fare Rules and Terms and Conditions.
                        </a>
                      </Link>{" "}
                      I acknowledge that personal information relating to my
                      booking may be accessible to government authorities,
                      selected airlines and the agents to whom the airline
                      grants system access.
                    </p>
                  </div>
                  <button
                    className={`btn btn-primary w-full lg:w-[195px] ${
                      checked ? "" : "opacity-50 pointer-events-none"
                    }`}
                    onClick={resellJourney}
                    disabled={resellingJourney || resellingSSR || cancellingSSR}
                  >
                    {resellingJourney ||
                    resellingSSR ||
                    cancellingSSR ||
                    commitPaymentLoading
                      ? "Saving...."
                      : "Continue"}
                  </button>
                </div>
                {/* Terms */}
              </section>
            </section>
          </div>
          <div className="ga__section__side">
            <CreditBar />
          </div>
        </section>
      </section>
      {/* <nav className="nav bg-primary-main fit-x-bleed  items-center justify-between py-7 flex lg:hidden fixed w-full z-50 bottom-0">
        <button className="flex items-center ">
          <ToTop />
        </button>
        <button className="btn btn-green">Continue</button>
      </nav> */}
    </BaseLayout>
  );
};

export default TripView;
