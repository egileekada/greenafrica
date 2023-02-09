/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import { format, differenceInMinutes } from "date-fns";
import { useRouter } from "next/router";
import { timeConvert } from "utils/common";
import BaseLayout from "layouts/Base";
import FlightIcon from "assets/svgs/FlightTwo.svg";
import AeroIcon from "assets/svgs/aero.svg";
import DottedLine from "assets/svgs/dotted-line.svg";
import SkeletonLoader from "components/SkeletonLoader";
import IbeAdbar from "containers/IbeAdbar";
import { notification } from "antd";

import {
  useGetLocationsQuery,
  useGetProductsQuery,
  useSendBoardingPassMutation,
} from "services/widgetApi.js";

import { useSelector, useDispatch } from "react-redux";
import {
  sessionSelector,
  saveCheckInSelection,
  saveCheckInPassengerSelection,
  resetSelectedPassengers,
  GetBookingDetailsWithPNR,
} from "redux/reducers/session";

import { setCheckinPNR } from "redux/reducers/checkin";

import { decryptPnr } from "lib/utils";

const CheckInDetails = (props) => {
  const router = useRouter();
  const { bookingId } = router.query;
  const { data, isLoading: locationLoading } = useGetLocationsQuery();
  const { data: products, isLoading: productsLoading } = useGetProductsQuery();
  const [passengers, setPassengers] = useState([]);
  const [sendBoardingPass, { isLoading }] = useSendBoardingPassMutation();

  const dispatch = useDispatch();
  const { signature, sessionLoading, bookingResponseLoading, bookingResponse } =
    useSelector(sessionSelector);

  const parsed = router.asPath.split(/\?/)[1];
  let parsedBookingId = parsed.split("bookingId=").pop();

  function initSession(pnr) {
    if (pnr) {
      dispatch(setCheckinPNR(pnr));
      dispatch(GetBookingDetailsWithPNR({ pnr: pnr }));
      dispatch(resetSelectedPassengers());
    }
  }

  useEffect(() => {
    if (router.isReady) {
      //check if pnr is encrypted
      if (bookingId !== undefined) {
        initSession(decryptPnr(parsedBookingId));
      } else if (!props.pnr) {
        router.push("/checkin");
      } else {
        initSession(props.pnr);
      }
    }
  }, [router]);

  const PassengerBags = (_passenger, PassengerNumber) => {
    const _Baggages = _passenger.filter((pax) => {
      if (pax.PassengerNumber == PassengerNumber)
        return (
          pax.FeeCode === "XBAG20" ||
          pax.FeeCode === "XBAG15" ||
          pax.FeeCode === "XBAG10"
        );
    });

    return (
      <div className="trip-details-item">
        <h6>BAGGAGE{_Baggages.length > 1 ? "S" : ""}: </h6>
        <h5 className="flex items-center">
          <span>
            {_Baggages.length > 0 ? `${_Baggages.length}` : "No Baggage"}
          </span>
        </h5>
      </div>
    );
  };

  const SpecialAssistance = (_passenger, PassengerNumber) => {
    const _Baggages = _passenger.filter((pax) => {
      if (pax.PassengerNumber == PassengerNumber)
        return (
          pax.FeeCode === "HPRD" ||
          pax.FeeCode === "VPRD" ||
          pax.FeeCode === "WCHR"
        );
    });

    return (
      <div className="trip-details-item">
        {_Baggages.length > 1 && (
          <>
            <h6 className="uppercase">Special Assistance </h6>
            {_Baggages.map((item, index) => (
              <h5 className="flex items-center" key={index}>
                <span>
                  {item.FeeCode === "WCHR"
                    ? "Wheelchair"
                    : item.FeeCode === "HPRD"
                    ? "Hearing Impaired"
                    : item.FeeCode === "VPRD"
                    ? "Visually Impaired"
                    : ""}
                </span>
              </h5>
            ))}
          </>
        )}
      </div>
    );
  };

  const resolveAbbreviation = (abrreviation) => {
    const [{ name, code }] = data?.data?.items.filter(
      (location) => location.code === abrreviation
    );

    return `${name} (${code})`;
  };

  const fare_name = (value) => {
    const [{ name }] = products?.data?.items.filter(
      (product) => product.code === value
    );
    return `${name}`;
  };

  const addPassengers = (event, passenger, journey) => {
    const isChecked = event.target.checked;

    const data = { ...passenger, journey };

    if (isChecked) {
      setPassengers([...passengers, data]);
    } else {
      setPassengers(
        passengers.filter((currentPassenger) => {
          return (
            currentPassenger.PassengerNumber !== passenger.PassengerNumber ||
            currentPassenger.journey !== journey
          );
        })
      );
    }
  };

  const tryCheckIn = () => {
    dispatch(saveCheckInPassengerSelection(passengers));

    const newData = bookingResponse?.Booking?.Journeys.flatMap(
      (Journey, index) => {
        if (passengers.some((el) => el.journey === index)) {
          return {
            recordLocator: bookingResponse?.Booking?.RecordLocator,
            inventoryLegKey: {
              carrierCode: Journey.Segments[0].FlightDesignator.CarrierCode,
              flightNumber: Journey.Segments[0].FlightDesignator.FlightNumber,
              departureDate: Journey.Segments[0].STD,
              departureDateSpecified: true,
              departureStation: Journey.Segments[0].DepartureStation,
              arrivalStation: Journey.Segments[0].ArrivalStation,
            },
            liftStatus: 1,
            liftStatusSpecified: true,
            bySegment: false,
            bySegmentSpecified: true,
            checkSameDayReturn: false,
            checkSameDayReturnSpecified: true,
            skipSecurityChecks: false,
            skipSecurityChecksSpecified: true,
            seatRequired: false,
            seatRequiredSpecified: true,
            retrieveBoardingZone: false,
            retrieveBoardingZoneSpecified: true,
            allowPartialCheckIn: false,
            allowPartialCheckInSpecified: true,
            otherAirlineCheckin: false,
            otherAirlineCheckinSpecified: true,
            checkInDestination: Journey.Segments[0].ArrivalStation,
            returnDownlineSegments: true,
            returnDownlineSegmentsSpecified: true,
            inventoryLegKeyDepartureDateTime: Journey.Segments[0].STD,
            inventoryLegKeyDepartureDateTimeSpecified: true,
            processDownlineIATCI: true,
            processDownlineIATCISpecified: true,
            checkInPaxRequestList: [
              ...passengers
                .filter((data) => {
                  return data.journey === index;
                })
                .map((passenger) => {
                  return {
                    name: {
                      title: passenger.Names[0].Title,
                      firstName: passenger.Names[0].FirstName,
                      lastName: passenger.Names[0].LastName,
                    },
                    verifiedID: false,
                    verifiedIDSpecified: true,
                    passengerID: passenger.PassengerNumber,
                    passengerIDSpecified: true,
                    processAPPS: false,
                    processAPPSSpecified: true,
                    appsTransitType: 0,
                    appsTransitTypeSpecified: true,
                  };
                }),
            ],
          };
        } else {
          return [];
        }
      }
    );

    dispatch(saveCheckInSelection(newData));

    router.push(
      {
        pathname: "/checkin/consent",
        query: {
          signature,
        },
      },
      "/checkin/consent"
    );
  };

  const handleServices = () => {
    router.push("/checkin/manage-services");
  };

  const triggerEmailBoardingPass = (id, departureStation, arrivalStation) => {
    const data = {
      signature,
      recordLocator: props.pnr,
      requestType: "email",
      boardingPassRequests: [
        {
          passengerIdArray: [id],
          departureStation,
          arrivalStation,
        },
      ],
    };
    sendBoardingPass(data)
      .unwrap()
      .then((data) => {
        notification.success({
          message: "Success",
          description: data.data.message,
        });
      })
      .catch((error) => {
        notification.error({
          message: "Error",
          description: "An Error Occured",
        });
      });
  };

  const triggerDownloadBoardingPass = (
    id,
    departureStation,
    arrivalStation
  ) => {
    const data = {
      signature,
      recordLocator: props.pnr,
      requestType: "download",
      boardingPassRequests: [
        {
          passengerIdArray: [id],
          departureStation,
          arrivalStation,
        },
      ],
    };
    sendBoardingPass(data)
      .unwrap()
      .then((data) => {
        const link = document.createElement("a");
        link.href = data.data.urls[0];
        link.setAttribute("target", "_blank");
        link.setAttribute("download", "boarding pass");
        document.body.appendChild(link);
        link.click();
        link.remove();
        notification.success({
          message: "Success",
          description: data.data.message,
        });
      })
      .catch((error) => {
        notification.error({
          message: "Error",
          description: "An Error Occured",
        });
      });
  };

  return (
    <BaseLayout>
      <section className="w-full checkin">
        {sessionLoading || bookingResponseLoading ? (
          <section className="spinner__container">
            <SkeletonLoader />
            <SkeletonLoader />
          </section>
        ) : (
          <section className="ga__section">
            <div className="ga__section__main">
              <div className="mb-8 mt-16 xlg:mt-0">
                <h2 className="text-black font-bold text-2xl mb-2">Check In</h2>
                <p>
                  Kindly confirm that the information below is correct before
                  checking in
                </p>
              </div>

              <section className="flex flex-col bg-white pb-24">
                {/* TripHeader */}
                <section className="ibe__flight__info__destination">
                  <p className="text-normal">
                    Booking Code: {bookingResponse?.Booking?.RecordLocator}
                  </p>
                  <figure className="flightCircle">
                    <FlightIcon />
                  </figure>
                </section>

                {bookingResponse?.Booking?.Journeys.map((Journey, index) => (
                  <div key={index}>
                    <div className="mx-6">
                      <h3 className="title-text">
                        DEPARTURE:{" "}
                        {bookingResponse &&
                          format(
                            new Date(
                              bookingResponse ? Journey?.Segments[0].STD : ""
                            ),
                            "MMMM dd, yyyy"
                          )}
                      </h3>
                    </div>
                    <section
                      className="ibe__trip__item checkinView bordered mx-6 my-3"
                      key={index}
                    >
                      <p className="bg-primary-main text-green py-1 px-4 rounded-[4px] absolute left-6 top-5">
                        {!productsLoading &&
                          fare_name(Journey?.Segments[0].Fares[0].ProductClass)}
                      </p>
                      <div className="basis-full lg:basis-[60%] w-full flex flex-col min-h-[54px] px-6 mb-10 mt-5">
                        <p className="tripType self-center">
                          {Journey?.Segments[0]?.FlightDesignator.CarrierCode}
                          {Journey?.Segments[0]?.FlightDesignator.FlightNumber}
                        </p>
                        <div className="flex justify-between">
                          <div className="flex flex-col">
                            <h5 className="tripType">
                              {bookingResponse &&
                                format(
                                  new Date(Journey.Segments[0].STD),
                                  "HH:mm"
                                )}
                            </h5>
                            <p className="tripCity">
                              {!locationLoading &&
                                resolveAbbreviation(
                                  Journey?.Segments[0]?.DepartureStation
                                )}
                            </p>
                          </div>
                          <div className="tripIconPath">
                            <DottedLine className="dotted-svg" />
                            <AeroIcon className="aero-svg" />
                            <DottedLine className="dotted-svg" />
                          </div>
                          <div className="flex flex-col  items-end">
                            <h5 className="tripType right-text">
                              {bookingResponse &&
                                format(
                                  new Date(Journey.Segments[0].STA),
                                  "HH:mm"
                                )}
                            </h5>
                            <p className="tripCity right-text">
                              {!locationLoading &&
                                resolveAbbreviation(
                                  Journey?.Segments[0]?.ArrivalStation
                                )}
                            </p>
                          </div>
                        </div>
                        <p className="tripTime self-center">
                          {bookingResponse &&
                            timeConvert(
                              differenceInMinutes(
                                new Date(Journey?.Segments[0]?.STA),
                                new Date(Journey?.Segments[0]?.STD)
                              )
                            )}
                        </p>
                      </div>
                    </section>

                    <section className="mx-6">
                      <h3 className="title-text no-mb">PASSENGERS</h3>
                    </section>

                    {bookingResponse?.Booking?.Passengers.map(
                      (passenger, pIndex) => (
                        <section
                          className="ibe__trip__passengers checkinView mx-6 mb-3"
                          key={pIndex}
                        >
                          <div className="md:flex bordered p-4">
                            <div className="flex items-center w-full">
                              <label
                                htmlFor={`passenger-${index}-${pIndex}`}
                                className={`${
                                  (Journey?.Segments[0]?.PaxSegments[pIndex]
                                    ?.LiftStatus === 1 ||
                                    Journey?.PackageIndicator == 0) &&
                                  "text-gray-300"
                                } ml-2 text-lg font-semibold capitalize w-full flex items-center`}
                              >
                                <input
                                  disabled={
                                    Journey?.Segments[0]?.PaxSegments[pIndex]
                                      .LiftStatus ||
                                    Journey?.PackageIndicator == 0
                                  }
                                  className="w-5 h-5 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 focus:ring-2 mr-3"
                                  type="checkbox"
                                  id={`passenger-${index}-${pIndex}`}
                                  value={passenger}
                                  name={`passenger-${index}-${pIndex}`}
                                  onChange={(e) =>
                                    addPassengers(e, passenger, index)
                                  }
                                />
                                {passenger.Names[0].FirstName}{" "}
                                {passenger.Names[0].LastName}{" "}
                              </label>
                            </div>
                          </div>

                          <div className="trip-details">
                            <div className="trip-details-item">
                              <h6>SEAT NUMBER</h6>
                              {Journey.Segments[0].PaxSeats.length > 0 ? (
                                <h5 className="flex items-center text-center">
                                  <span>
                                    {
                                      Journey.Segments[0].PaxSeats.filter(
                                        (seat) =>
                                          seat.PassengerNumber ==
                                          passenger.PassengerNumber
                                      )[0]?.UnitDesignator
                                    }
                                  </span>
                                </h5>
                              ) : (
                                <h5 className="flex items-center">
                                  <span>None</span>
                                </h5>
                              )}
                            </div>
                            {Journey.Segments[0].PaxSSRs.length > 0 && (
                              <>
                                {PassengerBags(
                                  Journey.Segments[0].PaxSSRs,
                                  passenger.PassengerNumber
                                )}
                              </>
                            )}
                            {Journey.Segments[0].PaxSSRs.length > 0 && (
                              <>
                                {SpecialAssistance(
                                  Journey.Segments[0].PaxSSRs,
                                  passenger.PassengerNumber
                                )}
                              </>
                            )}

                            {Journey?.Segments[0]?.PaxSegments[pIndex]
                              ?.LiftStatus === 1 && (
                              <>
                                <div className="flex flex-wrap md:flex-nowrap items-center justify-between ml-auto">
                                  <button
                                    className="btn btn-primary md:mr-1 basis-full md:basis-auto mb-3 md:mb-0"
                                    onClick={() =>
                                      triggerDownloadBoardingPass(
                                        passenger.PassengerNumber,
                                        Journey?.Segments[0]?.DepartureStation,
                                        Journey?.Segments[0]?.ArrivalStation
                                      )
                                    }
                                    disabled={isLoading}
                                  >
                                    Download Boarding Pass
                                  </button>
                                  <button
                                    className="btn btn-outline  basis-full md:basis-auto"
                                    onClick={() =>
                                      triggerEmailBoardingPass(
                                        passenger.PassengerNumber,
                                        Journey?.Segments[0]?.DepartureStation,
                                        Journey?.Segments[0]?.ArrivalStation
                                      )
                                    }
                                    disabled={isLoading}
                                  >
                                    Email Boarding Pass
                                  </button>
                                </div>
                              </>
                            )}
                          </div>
                        </section>
                      )
                    )}
                  </div>
                ))}
                {/* Checkin Info*/}
                <div className="flex mx-6 mt-5">
                  <button
                    className="btn btn-primary"
                    disabled={passengers.length < 1}
                    onClick={tryCheckIn}
                  >
                    Check In
                  </button>
                </div>
              </section>
            </div>
            <div className="ga__section__side">
              <IbeAdbar />
            </div>
          </section>
        )}
      </section>
    </BaseLayout>
  );
};

export default CheckInDetails;

export async function getServerSideProps(context) {
  return {
    props: {
      pnr: context.query.pnr ? context.query.pnr : "",
    },
  };
}
