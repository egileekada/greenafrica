/* eslint-disable @next/next/no-img-element */
import FlightIcon from "assets/svgs/aero.svg";
import ArrowIcon from "assets/svgs/small-arrow.svg";

import BoookingBaggageCard from "components/Cards/bookings/baggage";
import BookingReturnBaggageCard from "components/Cards/bookings/returnBaggage";

import BaggageIcon from "assets/svgs/baggage.svg";
import { Fragment, useState, useEffect } from "react";
import Popup from "components/Popup";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { sessionSelector } from "redux/reducers/session";
import { useGetLocationsQuery } from "services/widgetApi.js";
import { bookingSelector } from "redux/reducers/booking";

const BookingPassengerBaggage = ({
  passenger,
  selectedSSRs,
  setSSRs,
  selectedReturnSSRs,
  setReturnSSRs,
}) => {
  const router = useRouter();
  const { data, isLoading } = useGetLocationsQuery();
  const [showPopUp, setShow] = useState(false);
  const [newSelection, setNewSelection] = useState(false);
  const [returnNewSelection, setReturnNewSelection] = useState(false);
  const [activeSSRS, setActiveSSRs] = useState([]);
  const [activeReturnSSRS, setActiveReturnSSRs] = useState([]);
  const [preSelectedGoSSRS, setPreSelectedGoSSRS] = useState([]);
  const [preSelectedReturnSSRS, setPreSelectedReturnSSRS] = useState([]);

  const { bookingResponse } = useSelector(sessionSelector);
  const {
    tripParams,
    returnParams,
    SSRAvailabilityResponse,
    bookingSessionSSRs,
    bookingSessionReturnSSRs,
  } = useSelector(bookingSelector);
  

  useEffect(() => {
    async function setDefaultSSRS() {
      if (
        SSRAvailabilityResponse &&
        SSRAvailabilityResponse?.SSRAvailabilityForBookingResponse
          ?.SSRSegmentList.length > 0
      ) {
        const _SSRList =
          SSRAvailabilityResponse?.SSRAvailabilityForBookingResponse
            ?.SSRSegmentList;
        if (_SSRList && _SSRList.length > 0) {
          const filteredSSRs = _SSRList.filter((_listItem, _listIndex) => {
            return parseInt(_listIndex) === 0;
          });
          setActiveSSRs([...filteredSSRs]);

          if (_SSRList.length > 1) {
            const _filteredSSRs = _SSRList.filter((_listItem, _listIndex) => {
              return parseInt(_listIndex) === 1;
            });
            setActiveReturnSSRs([..._filteredSSRs]);
          }
        }
      }
    }
    setDefaultSSRS();
  }, [SSRAvailabilityResponse]);

  useEffect(() => {
    if (bookingSessionSSRs && bookingSessionSSRs?.length > 0) {
      setPreSelectedGoSSRS([...bookingSessionSSRs]);
    }
    if (bookingSessionReturnSSRs && bookingSessionReturnSSRs?.length > 0) {
      setPreSelectedReturnSSRS([...bookingSessionReturnSSRs]);
    }
  }, []);

  const proceedToSeatSelection = () => {
    router.push("/trip/payment");
  };

  const ALLOWED__SSRS = ["X20", "X15", "X10"];

  const resolveAbbreviation = (abrreviation) => {
    const [{ name, code }] = data?.data?.items.filter(
      (location) => location.code === abrreviation
    );
    return ` ${code} `;
  };

  return (
    <Fragment>
      <section className="flex flex-col">
        {/* <h2 className="text-left text-[#8F8CA4] font-header font-bold text-xs">
          EXTRA BAGGAGE{" "}
          <span className="italic">
            (Do you require any extra checked in baggage allowance. Its cheaper
            online than at the airport)
          </span>
        </h2> */}

        {bookingResponse?.Booking?.Journeys?.length > 0 && (
          <section
            className={`flex flex-col mt-4 ${
              tripParams
                ? parseInt(tripParams?.LiftStatus) !== 0
                  ? "pointer-events-none opacity-50 cursor-not-allowed"
                  : ""
                : ""
            }`}
          >
            {/* <div className="flex h-16 border-b mb-6">
              {bookingResponse?.Booking?.Journeys?.length > 0 && (
                <button className={`ssr__tab active-ssr`}>
                  <figure>
                    <FlightIcon />
                  </figure>
                  <div className="flex items-center ml-[10px] ">
                    <p className="font-header text-sm mr-[6px] font-bold">
                      {!isLoading &&
                        resolveAbbreviation(
                          bookingResponse?.Booking?.Journeys[0]?.Segments[0]
                            ?.DepartureStation
                        )}
                    </p>
                    <figure className="flex items-center justify-center -mb-1">
                      <ArrowIcon />
                    </figure>
                    <p className="font-header text-sm ml-[6px] font-bold">
                      {!isLoading &&
                        resolveAbbreviation(
                          bookingResponse?.Booking?.Journeys[0].Segments[0]
                            ?.ArrivalStation
                        )}
                    </p>
                  </div>
                </button>
              )}
            </div> */}
            <section className="grid grid-cols-1">
              {activeSSRS.length > 0 && (
                <>
                  {activeSSRS.map((_list) => {
                    return _list?.AvailablePaxSSRList.filter((_SSR) => {
                      return ALLOWED__SSRS.includes(_SSR?.SSRCode);
                    }).map((_SSRITEM, index) => {
                      const _ARRIVAL =
                        bookingResponse?.Booking?.Journeys[0]?.Segments[0]
                          ?.ArrivalStation;
                      const _DEPARTURE =
                        bookingResponse?.Booking?.Journeys[0]?.Segments[0]
                          ?.DepartureStation;

                      const passengerGoSSRs = preSelectedGoSSRS.filter(
                        (_ssr) => {
                          return (
                            parseInt(_ssr?.passengerNumber) ===
                              parseInt(passenger?.PassengerNumber) &&
                            _ssr?.ssrCode === _SSRITEM.SSRCode &&
                            _ssr?.ArrivalStation?.toLowerCase() ===
                              _ARRIVAL?.toLowerCase() &&
                            _ssr?.DepartureStation?.toLowerCase() ===
                              _DEPARTURE?.toLowerCase()
                          );
                        }
                      );

                      return (

                        <div className=" w-full flex flex-col " >
                          {index === 0 && ( 
                            <div className=" w-full px-5 flex justify-between items-center border-b border-[#261F5E1A] py-3 " >
                              <p className=" font-bold text-[#261F5E] " >Departure</p>
                              <div className=" font-bold text-xs text-[#47FF5A] bg-[#26205E] px-2 py-1 rounded-md " >
                              {!isLoading &&
                                resolveAbbreviation(
                                  bookingResponse?.Booking?.Journeys[0]?.Segments[0]
                                    ?.DepartureStation
                                )} - {!isLoading &&
                                resolveAbbreviation(
                                  bookingResponse?.Booking?.Journeys[0].Segments[0]
                                    ?.ArrivalStation
                                )}
                              </div>
                            </div>
                          )}
                          <BoookingBaggageCard
                            passenger={passenger}
                            newSelection={newSelection}
                            setNewSelection={setNewSelection}
                            selectedSSRs={selectedSSRs}
                            setSSRs={setSSRs}
                            SSRItem={_SSRITEM}
                            ArrivalStation={_ARRIVAL}
                            DepartureStation={_DEPARTURE}
                            _limit={passengerGoSSRs?.length}
                            schedueIndex={0}
                          />

                        </div>
                      );
                    });
                  })}
                </>
              )}
            </section>
          </section>
        )}

        {bookingResponse?.Booking?.Journeys?.length > 1 && (
          <section
            className={`flex flex-col mt-4 ${
              returnParams
                ? parseInt(returnParams?.LiftStatus) !== 0
                  ? "pointer-events-none opacity-50 cursor-not-allowed"
                  : ""
                : ""
            }`}
          >
            {/* <div className="flex h-16 border-b mb-6">
              {bookingResponse?.Booking?.Journeys?.length > 1 && (
                <button className={`ssr__tab active-ssr`}>
                  <figure>
                    <FlightIcon />
                  </figure>
                  <div className="flex items-center ml-[10px] ">
                    <p className="font-header text-sm mr-[6px] font-bold">
                      {!isLoading &&
                        resolveAbbreviation(
                          bookingResponse?.Booking?.Journeys[1]?.Segments[0]
                            ?.DepartureStation
                        )}
                    </p>
                    <figure className="flex items-center justify-center -mb-1">
                      <ArrowIcon />
                    </figure>
                    <p className="font-header text-sm ml-[6px] font-bold">
                      {!isLoading &&
                        resolveAbbreviation(
                          bookingResponse?.Booking?.Journeys[1].Segments[0]
                            ?.ArrivalStation
                        )}
                    </p>
                  </div>
                </button>
              )}
            </div> */}

            <section className="grid grid-cols-1">
              {activeReturnSSRS.length > 0 && activeReturnSSRS.length > 0 && (
                <>
                  {activeReturnSSRS.map((_list) => {
                    return _list?.AvailablePaxSSRList.filter((_SSR) => {
                      return ALLOWED__SSRS.includes(_SSR?.SSRCode);
                    }).map((_SSRITEM, index) => {
                      const _ARRIVAL =
                        bookingResponse?.Booking?.Journeys[1]?.Segments[0]
                          ?.ArrivalStation;
                      const _DEPARTURE =
                        bookingResponse?.Booking?.Journeys[1]?.Segments[0]
                          ?.DepartureStation;

                      const passengerReturnSSRs = preSelectedReturnSSRS.filter(
                        (_ssr) => {
                          return (
                            parseInt(_ssr?.passengerNumber) ===
                              parseInt(passenger?.PassengerNumber) &&
                            _ssr?.ssrCode === _SSRITEM.SSRCode &&
                            _ssr?.ArrivalStation?.toLowerCase() ===
                              _ARRIVAL?.toLowerCase() &&
                            _ssr?.DepartureStation?.toLowerCase() ===
                              _DEPARTURE?.toLowerCase()
                          );
                        }
                      );

                      return ( 
                        <div className=" w-full flex flex-col " >
                          {index=== 0 && ( 
                            <div className=" w-full px-5 flex justify-between items-center border-b border-[#261F5E1A] py-3 " >
                              <p className=" font-bold text-[#261F5E] " >Return</p>
                              <div className=" font-bold text-xs text-[#47FF5A] bg-[#26205E] px-2 py-1 rounded-md " >
                              {!isLoading &&
                                resolveAbbreviation(
                                  bookingResponse?.Booking?.Journeys[1]?.Segments[0]
                                    ?.DepartureStation
                                )} - {!isLoading &&
                                resolveAbbreviation(
                                  bookingResponse?.Booking?.Journeys[1].Segments[0]
                                    ?.ArrivalStation
                                )}
                              </div>
                            </div>
                          )}
                          <BookingReturnBaggageCard
                            passenger={passenger}
                            returnNewSelection={returnNewSelection}
                            setReturnNewSelection={setReturnNewSelection}
                            selectedReturnSSRs={selectedReturnSSRs}
                            setReturnSSRs={setReturnSSRs}
                            SSRItem={_SSRITEM}
                            ArrivalStation={_ARRIVAL}
                            DepartureStation={_DEPARTURE}
                            _limit={passengerReturnSSRs?.length}
                            schedueIndex={1}
                          />
                        </div>
                      );
                    });
                  })}
                </>
              )}
            </section>
          </section>
        )}
      </section>
      <Popup
        display={showPopUp}
        closeModal={() => setShow(false)}
        top={true}
        width="w-[507px]"
      >
        <section className="w-full bg-white rounded-xl ">
          <div className="flex flex-col items-center justify-center p-[50px]">
            <h6 className="font-display text-xl mb-5">No baggage selected</h6>
            <figure>
              <BaggageIcon />
            </figure>
            <p className="text-center font-body text-sm mb-6">
              Are you sure you want to leave without including your baggage?
            </p>
            <div className="flex flex-wrap lg:flex-nowrap items-center justify-between w-full">
              <button
                onClick={() => setShow(false)}
                className="btn btn-primary basis-full lg:basis-[48%] lg:mr-2 mb-3 lg:mb-0"
              >
                Select Baggage
              </button>
              <button
                onClick={proceedToSeatSelection}
                className="btn btn-outline basis-full lg:basis-[48%]"
              >
                I don’t need it
              </button>
            </div>
          </div>
        </section>
      </Popup>
    </Fragment>
  );
};

BookingPassengerBaggage.defaultProps = {
  passenger: {},
  selectedSSRs: [],
  selectedReturnSSRs: [],
};

export default BookingPassengerBaggage;
