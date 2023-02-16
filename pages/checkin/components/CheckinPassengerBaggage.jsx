/* eslint-disable @next/next/no-img-element */
import FlightIcon from "assets/svgs/aero.svg";
import ArrowIcon from "assets/svgs/small-arrow.svg";

import CheckinBaggageCard from "components/Cards/checkin/baggage";
import CheckinReturnBaggageCard from "components/Cards/checkin/returnBaggage";

import BaggageIcon from "public/images/bagthree.svg" 
import { Fragment, useState, useEffect } from "react";
import Popup from "components/Popup";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { sessionSelector } from "redux/reducers/session";
import { useGetLocationsQuery } from "services/widgetApi.js";
import { checkinSelector } from "redux/reducers/checkin";

const CheckinPassengerBaggage = ({
  passenger,
  selectedSSRs,
  selectedReturnSSRs,
  setSSRs,
  setReturnSSRs,
}) => {
  const router = useRouter();
  const { data, isLoading } = useGetLocationsQuery();
  const [showPopUp, setShow] = useState(false);
  const [newSelection, setNewSelection] = useState(false);
  const [returnNewSelection, setReturnNewSelection] = useState(false);
  const [activeTab, setActiveTab] = useState("");
  const [schedueIndex, setSchedueIndex] = useState(0);
  const [activeSSRS, setActiveSSRs] = useState([]);

  const [preSelectedGoSSRS, setPreSelectedGoSSRS] = useState([]);
  const [preSelectedReturnSSRS, setPreSelectedReturnSSRS] = useState([]);

  const { bookingResponse } = useSelector(sessionSelector);
  const {
    SSRAvailabilityResponse,
    checkinSessionSSRs,
    checkinSessionReturnSSRs,
    newCheckinSSRs,
    newCheckinReturnSSRs,
  } = useSelector(checkinSelector);

  useEffect(() => {
    async function setDefaultTab() {
      if (bookingResponse?.Booking?.Journeys?.length > 0) {
        const selectedTrip = bookingResponse?.Booking?.Journeys?.filter(
          (_item, _itemIndex) => {
            return parseInt(_itemIndex) === parseInt(passenger?.journey);
          }
        );

        let _activeTab = `${selectedTrip[0]?.Segments[0]?.DepartureStation.trim().toLowerCase()}${selectedTrip[0]?.Segments[0].ArrivalStation.trim().toLowerCase()}`;

        setActiveTab(_activeTab);
        setSchedueIndex(parseInt(passenger?.journey));
      }
    }
    setDefaultTab();
  }, [bookingResponse]);

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
        if (_SSRList && _SSRList.length > 0 && activeTab?.length > 0) {
          const filteredSSRs = _SSRList.filter((_listItem) => {
            let _listItemID = `${_listItem?.LegKey?.DepartureStation.trim().toLowerCase()}${_listItem?.LegKey?.ArrivalStation.trim().toLowerCase()}`;
            return _listItemID === activeTab;
          });

          setActiveSSRs([...filteredSSRs]);
        }
      }
    }
    setDefaultSSRS();
  }, [SSRAvailabilityResponse, activeTab]);

  useEffect(() => {
    if (checkinSessionSSRs && checkinSessionSSRs?.length > 0) {
      setPreSelectedGoSSRS([...checkinSessionSSRs]);
    }
    if (checkinSessionReturnSSRs && checkinSessionReturnSSRs?.length > 0) {
      setPreSelectedReturnSSRS([...checkinSessionReturnSSRs]);
    }
  }, []);

  const ALLOWED__SSRS = ["X20", "X15", "X10"];

  const resolveAbbreviation = (abrreviation) => {
    const [{ name, code }] = data?.data?.items.filter(
      (location) => location.code === abrreviation
    );
    return `${name} (${code})`;
  };

  return (
    <Fragment>
      <section className="flex flex-col">
        <h2 className="text-left text-[#8F8CA4] font-header font-bold text-xs">
        EXTRA BAGGAGE <span className="italic">(Do you require any extra checked in baggage allowance. Its cheaper online than at the airport)</span>
        </h2>

        <div className="flex h-16 border-b mb-6">
          {bookingResponse?.Booking?.Journeys?.length > 0 ? (
            bookingResponse?.Booking?.Journeys?.filter((_item, _itemIndex) => {
              return parseInt(_itemIndex) === parseInt(passenger?.journey);
            }).map((_journey, _journeyIndex) => {
              const tabID = `${_journey?.Segments[0]?.DepartureStation.trim().toLowerCase()}${_journey?.Segments[0]?.ArrivalStation.trim().toLowerCase()}`;

              return (
                <button
                  className={`ssr__tab ${
                    tabID === activeTab ? "active-ssr" : ""
                  } `}
                  onClick={() => {
                    setActiveTab(tabID);
                    setSchedueIndex(_journeyIndex);
                  }}
                >
                  <figure>
                    <FlightIcon />
                  </figure>
                  <div className="flex items-center ml-[10px] ">
                    <p className="font-header text-sm mr-[6px] font-bold">
                      {!isLoading &&
                        resolveAbbreviation(
                          _journey?.Segments[0]?.DepartureStation
                        )}
                    </p>
                    <figure className="flex items-center justify-center -mb-1">
                      <ArrowIcon />
                    </figure>
                    <p className="font-header text-sm ml-[6px] font-bold">
                      {!isLoading &&
                        resolveAbbreviation(
                          _journey?.Segments[0]?.ArrivalStation
                        )}
                    </p>
                  </div>
                </button>
              );
            })
          ) : (
            <>
              <p className="text-xs mt-2 text-">No Journey </p>
            </>
          )}
        </div>

        {/* <div className="flex flex-col">
          <p>selectedSSRs length:: {selectedSSRs.length}</p>
          <p>selectedSSRs :: {JSON.stringify(selectedSSRs)}</p>
          <p>/////////////////////</p>
          <p>newCheckinSSRs :: {JSON.stringify(newCheckinSSRs)}</p>
          <p>newCheckinSSRs length:: {newCheckinSSRs.length}</p>
          <p>/////////////////////</p>
          <p>selectedSSRs length:: {selectedSSRs.length}</p>
          <p>selectedSSRs :: {JSON.stringify(selectedSSRs)}</p>
          <p>/////////////////////</p>
          <p> newCheckinReturnSSRs :: {JSON.stringify(newCheckinReturnSSRs)}</p>
          <p> newCheckinReturnSSRs length:: {newCheckinReturnSSRs.length}</p>
        </div> */}

        <section className="grid grid-cols-1 sm:grid-cols-2 tab:grid-cols-3 gap-10 mb-7">
          {schedueIndex === 0
            ? activeSSRS.length > 0 && (
                <>
                  {activeSSRS.map((_list) => {
                    return _list?.AvailablePaxSSRList.filter((_SSR) => {
                      return ALLOWED__SSRS.includes(_SSR?.SSRCode);
                    }).map((_SSRITEM) => {
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
                        <CheckinBaggageCard
                          passenger={passenger}
                          newSelection={newSelection}
                          setNewSelection={setNewSelection}
                          selectedSSRs={selectedSSRs}
                          SSRItem={_SSRITEM}
                          schedueIndex={schedueIndex}
                          ArrivalStation={_ARRIVAL}
                          DepartureStation={_DEPARTURE}
                          activeTab={activeTab}
                          _limit={passengerGoSSRs?.length}
                        />
                      );
                    });
                  })}
                </>
              )
            : activeSSRS.length > 0 && (
                <>
                  {activeSSRS.map((_list) => {
                    return _list?.AvailablePaxSSRList.filter((_SSR) => {
                      return ALLOWED__SSRS.includes(_SSR?.SSRCode);
                    }).map((_SSRITEM) => {
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
                        <CheckinReturnBaggageCard
                          passenger={passenger}
                          returnNewSelection={returnNewSelection}
                          setReturnNewSelection={setReturnNewSelection}
                          SSRItem={_SSRITEM}
                          selectedReturnSSRs={selectedReturnSSRs}
                          schedueIndex={schedueIndex}
                          ArrivalStation={_ARRIVAL}
                          DepartureStation={_DEPARTURE}
                          activeTab={activeTab}
                          _limit={passengerReturnSSRs?.length}
                        />
                      );
                    });
                  })}
                </>
              )}
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
              <button className="btn btn-outline basis-full lg:basis-[48%]">
                I don’t need it
              </button>
            </div>
          </div>
        </section>
      </Popup>
    </Fragment>
  );
};

CheckinPassengerBaggage.defaultProps = {
  passenger: {},
  selectedSSRs: [],
  selectedReturnSSRs: [],
};

export default CheckinPassengerBaggage;
