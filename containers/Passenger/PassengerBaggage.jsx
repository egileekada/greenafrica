/* eslint-disable @next/next/no-img-element */
import { Checkbox } from "antd";
import FliightIcon from "assets/svgs/aero.svg";
import ArrowIcon from "assets/svgs/small-arrow.svg";
import BaggageCard from "components/Cards/baggage";
import ReturnBaggageCard from "components/Cards/returnBaggage";
import BaggageIcon from "assets/svgs/baggage.svg";
import { Fragment, useState, useEffect } from "react";
import Popup from "components/Popup";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { sessionSelector } from "redux/reducers/session";
import { useGetLocationsQuery } from "services/widgetApi.js";

const PassengerBaggage = ({
  passenger,
  selectedSSRs,
  setSSRs,
  selectedReturnSSRs,
  setReturnSSRs,
}) => {
  const router = useRouter();
  const { data, isLoading } = useGetLocationsQuery();
  const [showPopUp, setShow] = useState(false);
  const [activeTab, setActiveTab] = useState("");
  const [schedueIndex, setSchedueIndex] = useState(0);
  const [activeSSRS, setActiveSSRs] = useState([]);
  const { SSRAvailabilityResponse, flightParams, selectedSessionJourney } =
    useSelector(sessionSelector);

  useEffect(() => {
    async function setDefaultTab() {
      if (selectedSessionJourney && selectedSessionJourney.length > 0) {
        let _activeTab = `${selectedSessionJourney[0]?.departureStation
          .trim()
          .toLowerCase()}${selectedSessionJourney[0]?.arrivalStation
          .trim()
          .toLowerCase()}`;
        setActiveTab(_activeTab);
        setSchedueIndex(selectedSessionJourney[0]?.schedueIndex);
      }
    }
    setDefaultTab();
  }, [selectedSessionJourney]);

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

  // const onChange = (e) => {
  //   if (e.target.checked) {
  //     setShow(true);
  //   }
  // };

  const proceedToSeatSelection = () => {
    // this is suposed to go to seat-Selection,payment is an hotfix
    router.push("/trip/payment");
  };

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
        <h2 className="text-left text-[#8F8CA4] font-header font-bold text-xs mb-4">
           EXTRA BAGGAGE <span className="italic">(Do you require any extra checked in baggage allowance. Its cheaper online than at the airport)</span>
        </h2>

        <div className="flex h-16 border-b mb-6">
          {selectedSessionJourney?.length > 0 &&
            selectedSessionJourney.map((_journey) => {
              const tabID = `${_journey?.departureStation
                .trim()
                .toLowerCase()}${_journey?.arrivalStation
                .trim()
                .toLowerCase()}`;
              return (
                <button
                  className={`ssr__tab ${
                    tabID === activeTab ? "active-ssr" : ""
                  } `}
                  onClick={() => {
                    setActiveTab(tabID);
                    setSchedueIndex(_journey?.schedueIndex);
                  }}
                >
                  <figure>
                    <FliightIcon />
                  </figure>
                  <div className="flex items-center ml-[10px] ">
                    <p className="font-header text-sm mr-[6px] font-bold">
                      {!isLoading &&
                        resolveAbbreviation(_journey.departureStation)}
                    </p>
                    <figure className="flex items-center justify-center -mb-1">
                      <ArrowIcon />
                    </figure>
                    <p className="font-header text-sm ml-[6px] font-bold">
                      {!isLoading &&
                        resolveAbbreviation(_journey.arrivalStation)}
                    </p>
                  </div>
                </button>
              );
            })}
        </div>

        {/* Checkin Info*/}
        {/* <section className="checkin__info my-3">
          <p>
            You added some new services so your fare has been updated with
            additional fees
          </p>
        </section> */}
        {/* Checkin Info*/}

        <section className="grid grid-cols-1 sm:grid-cols-2 tab:grid-cols-3 gap-10 mb-7">
          {schedueIndex === 0
            ? activeSSRS.length > 0 &&
              activeSSRS.map((_list) => {
                return _list?.AvailablePaxSSRList.filter((_SSR) => {
                  return ALLOWED__SSRS.includes(_SSR?.SSRCode);
                }).map((_SSRITEM) => {
                  return (
                    <BaggageCard
                      passenger={passenger}
                      selectedSSRs={selectedSSRs}
                      setSSRs={setSSRs}
                      SSRItem={_SSRITEM}
                      selectedReturnSSRs={selectedReturnSSRs}
                      setReturnSSRs={setReturnSSRs}
                      schedueIndex={schedueIndex}
                    />
                  );
                });
              })
            : activeSSRS.length > 0 &&
              activeSSRS.map((_list) => {
                return _list?.AvailablePaxSSRList.filter((_SSR) => {
                  return ALLOWED__SSRS.includes(_SSR?.SSRCode);
                }).map((_SSRITEM) => {
                  return (
                    <ReturnBaggageCard
                      passenger={passenger}
                      selectedSSRs={selectedSSRs}
                      setSSRs={setSSRs}
                      SSRItem={_SSRITEM}
                      selectedReturnSSRs={selectedReturnSSRs}
                      setReturnSSRs={setReturnSSRs}
                      schedueIndex={schedueIndex}
                    />
                  );
                });
              })}
        </section>
        {/* <div className="flex items-center primary-checkbox mb-4">
          <Checkbox onChange={onChange}>
            <label className="check-label">
              <p className="ml-2">I don’t need extra baggage</p>
            </label>
          </Checkbox>
        </div> */}
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

PassengerBaggage.defaultProps = {
  passenger: {},
  selectedSSRs: [],
  selectedReturnSSRs: [],
};

export default PassengerBaggage;
