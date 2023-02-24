/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import PassengerAccordion from "components/PassengerAccordion";
import { Checkbox } from "antd";
import PassengerBaggage from "containers/Passenger/PassengerBaggage";
import { useSelector } from "react-redux";
import BagOne from "../../public/images/bagone.svg"
import BagSmall from "../../public/images/bagsmall.svg"
import BagTwo from "../../public/images/bagtwo.svg"
import BagThree from "../../public/images/bagthree.svg"
import { sessionSelector } from "redux/reducers/session";
import { useGetSpecialAssistancesQuery } from "services/widgetApi.js";

const PassengerDetailsItem = ({
  passenger,
  selectedSSRs,
  setSSRs,
  setReturnSSRs,
  selectedReturnSSRs,
  index
}) => {
  const { data: specialAssistances, isLoading } =
    useGetSpecialAssistancesQuery();
  const { sessionStateResponse, SSRAvailabilityResponse, sessionSSRs } =
    useSelector(sessionSelector);
  const [wcChecked, setWCChecked] = useState(false);
  const [vpChecked, setVPChecked] = useState(false);
  const [hpChecked, setHPChecked] = useState(false);
  const [insChecked, setInsChecked] = useState(true);
  const [INSCHARGE, setIINSCHARGE] = useState(0);
  const [activeSSRS, setActiveSSRs] = useState([]);
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    async function mapSessionSSRs() {
      if (sessionSSRs && sessionSSRs.length > 0) {
        const WCHRs = sessionSSRs.filter((_ssr) => {
          return (
            _ssr?.passengerNumber === parseInt(passenger?.id) &&
            _ssr?.ssrCode === "WCHR"
          );
        });
        if (WCHRs.length > 0) {
          setWCChecked(true);
        }

        const VPRDs = sessionSSRs.filter((_ssr) => {
          return (
            _ssr?.passengerNumber === parseInt(passenger?.id) &&
            _ssr?.ssrCode === "VPRD"
          );
        });
        if (VPRDs.length > 0) {
          setVPChecked(true);
        }

        const HPRDs = sessionSSRs.filter((_ssr) => {
          return (
            _ssr?.passengerNumber === parseInt(passenger?.id) &&
            _ssr?.ssrCode === "HPRD"
          );
        });
        if (HPRDs.length > 0) {
          setHPChecked(true);
        }

        const INSs = sessionSSRs.filter((_ssr) => {
          return (
            _ssr?.passengerNumber === parseInt(passenger?.id) &&
            _ssr?.ssrCode === "INS"
          );
        });
        if (INSs.length > 0) {
          setInsChecked(true);
        }
      }
    }
    mapSessionSSRs();
  }, []);

  useEffect(() => {
    if (
      SSRAvailabilityResponse &&
      SSRAvailabilityResponse?.SSRAvailabilityForBookingResponse?.SSRSegmentList
        .length > 0
    ) {
      const _SSRList =
        SSRAvailabilityResponse?.SSRAvailabilityForBookingResponse
          ?.SSRSegmentList;
      if (_SSRList && _SSRList.length > 0) {
        const Available = _SSRList[0].AvailablePaxSSRList;
        let INSIndex = Available.findIndex((object) => {
          return object.SSRCode.toLowerCase() === "ins";
        });

        if (INSIndex > -1) {
          const INSPAX = Available[INSIndex];
          const INSServiceCharge =
            INSPAX.PaxSSRPriceList[0].PaxFee.ServiceCharges.reduce(
              (accumulator, object) => {
                return accumulator + object.Amount;
              },
              0
            );
          const trips = parseInt(
            sessionStateResponse?.BookingData?.Journeys.length
          );
          setIINSCHARGE(
            trips > 1 ? trips * INSServiceCharge : INSServiceCharge
          );
        }
      }
    }
  }, [SSRAvailabilityResponse]);

  const onWCChange = (e) => {
    if (e.target.checked) {
      const _ssrObj = {
        passengerNumber: passenger?.id,
        ssrCode: "WCHR",
        schedueIndex: 0,
      };
      setSSRs((prevState) => [...prevState, _ssrObj]);
      setWCChecked(true);
    } else {
      let codeToBeRemoved = "WCHR";
      setSSRs((prevState) =>
        prevState.filter((_ssr) => _ssr.ssrCode !== codeToBeRemoved)
      );
      setWCChecked(false);
    }
  };

  const onVPChange = (e) => {
    if (e.target.checked) {
      const _ssrObj = {
        passengerNumber: passenger?.id,
        ssrCode: "VPRD",
        schedueIndex: 0,
      };
      setSSRs((prevState) => [...prevState, _ssrObj]);
      setVPChecked(true);
    } else {
      let codeToBeRemoved = "VPRD";
      setSSRs((prevState) =>
        prevState.filter((_ssr) => _ssr.ssrCode !== codeToBeRemoved)
      );
      setVPChecked(false);
    }
  };

  const onHPChange = (e) => {
    if (e.target.checked) {
      const _ssrObj = {
        passengerNumber: passenger?.id,
        ssrCode: "HPRD",
        schedueIndex: 0,
      };
      setSSRs((prevState) => [...prevState, _ssrObj]);
      setHPChecked(true);
    } else {
      let codeToBeRemoved = "HPRD";
      setSSRs((prevState) =>
        prevState.filter((_ssr) => _ssr.ssrCode !== codeToBeRemoved)
      );
      setHPChecked(false);
    }
  };

  const onInsuranceChange = (e) => {
    if (e.target.checked) {
      const _ssrObj = {
        passengerNumber: passenger?.id,
        ssrCode: "INS",
        schedueIndex: 0,
      };
      setSSRs((prevState) => [...prevState, _ssrObj]);
      setInsChecked(true);
    } else {
      let codeToBeRemoved = "INS";
      setSSRs((prevState) =>
        prevState.filter((_ssr) => _ssr.ssrCode !== codeToBeRemoved)
      );
      setInsChecked(false);
    }
  }; 

  // fix baggage price

  console.log(sessionStateResponse);

  return (
    <section className="flex flex-col">
      {SSRAvailabilityResponse ? (
          <div className=" w-full   lg:px-[32px] lg:my-6 mt-3 " >
            <div className=" w-full bg-white rounded-md border border-[#261F5E] lg:border-[#9E9BBF] " >
              <div className=" w-full h-[48px] rounded-t-md px-7 bg-[#F3F3F7] flex items-center " > 
                <p className=" font-bold text-[#261F5E] " >{`${passenger?.firstName}  ${passenger?.lastName} `}</p>
              </div>
              <div className=" rounded-b-md  w-full flex lg:flex-row flex-col-reverse " >
                <div className=" w-full py-6 lg:px-8 px-4 border-r border-[#261F5E1A] " >
                  <p className=" font-bold text-[#261F5E] " >Special Assistance</p>
                  <div className=" flex items-center my-4 " > 
                    <Checkbox checked={hpChecked} onChange={onHPChange}>
                      <label className=" -mt-2 ">
                        <p className="ml-2 text-[#26205E] font-medium text-[14px] "> 
                          <span className=" font-bold " >Hearing Impaired</span>  - Customer requires full assistance to aircraft and escort inflight
                        </p>
                      </label>
                    </Checkbox>
                  </div>
                  <div className=" flex items-center my-4 " > 
                    <Checkbox checked={wcChecked} onChange={onWCChange}>
                      <label className=" -mt-2 ">
                        <p className="ml-2 text-[#26205E] font-medium text-[14px] "> 
                          <span className=" font-bold " >Wheelchair</span> - Customer can climb stairs, Walk to & from seat but unable to walk long distances, Requires  Assistance To and From The Aircraft.
                        </p>
                      </label>
                    </Checkbox>
                  </div>
                  <div className=" flex items-center my-4 " > 
                    <Checkbox checked={vpChecked} onChange={onVPChange}>
                      <label className=" -mt-2 ">
                        <p className="ml-2 text-[#26205E] font-medium text-[14px] "> 
                          <span className=" font-bold " >Visually Impaired</span> - Customer requires full assistance to aircraft and escort inflight
                        </p>
                      </label>
                    </Checkbox>
                  </div>
                  <p className=" font-bold text-[#261F5E] mt-4 " >Insurance</p>
                  <div className=" my-4 " > 
                    <Checkbox checked={insChecked}  onChange={onInsuranceChange}>
                    <label className="check-label">
                      <p className="ml-2 text-[#26205E]">
                        Travel Insurance ( ₦{INSCHARGE.toLocaleString()})
                      </p>
                    </label>
                  </Checkbox>
                  </div>
                </div>
                <div className=" w-full " >
                  <PassengerBaggage
                    passenger={passenger}
                    selectedSSRs={selectedSSRs}
                    setSSRs={setSSRs}
                    selectedReturnSSRs={selectedReturnSSRs}
                    setReturnSSRs={setReturnSSRs}
                  />
                </div>
              </div>
            </div>
          </div>
      ) : (
        <p>No SSR</p>
      )}
    </section>
  );
};

PassengerDetailsItem.defaultProps = {
  passenger: {},
  selectedSSRs: [],
  selectedReturnSSRs: [],
};

export default PassengerDetailsItem; 

        // <PassengerAccordion passenger={passenger}>
        //   <div className="flex flex-col">
        //     <h2 className="text-left text-[#8F8CA4] font-header font-bold mb-2 hidden">
        //       INSURANCE
        //     </h2>
        //     <div className="flex items-center primary-checkbox mb-4 ">
        //       <Checkbox checked={insChecked} onChange={onInsuranceChange}>
        //         <label className="check-label">
        //           <p className="ml-2">
        //             Travel Insurance ( ₦{INSCHARGE.toLocaleString()})
        //           </p>
        //         </label>
        //       </Checkbox>
        //     </div>
            {/* <section className="flex flex-col special__needs mb-4">
              <div className="flex flex-col mt-">
                <h6 className="text-left text-[#8F8CA4] font-header text-xs font-bold mb-4">
                  SPECIAL ASSISTANCE{" "}
                  <span className="italic">
                    (Please let us know if you will require any special
                    assistance at the airport)
                  </span>
                </h6> */}

                {/* //TODO I don't understand the logic here yet */}
                {/* {!isLoading &&
                  specialAssistances.data.items.map(
                    (specialAssistance, index) => (
                      <div
                        className="flex items-center mb-5 primary-checkbox"
                        key={index}
                      >
                        <Checkbox checked={wcChecked} onChange={onWCChange}>
                          <label className="text-[#101010] text-xs font-body">
                            <span className="font-bold">
                              {specialAssistance.name}
                            </span>{" "}
                            -{specialAssistance.description}
                          </label>
                        </Checkbox>
                      </div>
                    )
                  )} */}
                {/* <div className="flex items-center mb-5 primary-checkbox">
                  <Checkbox checked={wcChecked} onChange={onWCChange}>
                    <label className="text-[#101010] text-xs font-body">
                      <span className="font-bold">Wheelchair</span> - Customer
                      can climb stairs, Walk to & from seat but unable to walk
                      long distances, Requires Assistance To and From The
                      Aircraft.
                    </label>
                  </Checkbox>
                </div>
                <div className="flex items-center mb-5 primary-checkbox">
                  <Checkbox checked={vpChecked} onChange={onVPChange}>
                    <label className="text-[#101010] text-xs font-body">
                      <span className="font-bold">Visually Impaired</span> -
                      Customer requires full assistance to aircraft and escort
                      inflight
                    </label>
                  </Checkbox>
                </div>
                <div className="flex items-center mb-5 primary-checkbox">
                  <Checkbox checked={hpChecked} onChange={onHPChange}>
                    <label className="text-[#101010] text-xs font-body">
                      <span className="font-bold"> Hearing Impaired </span> -
                      Customer requires full assistance to aircraft and escort
                      inflight
                    </label>
                  </Checkbox>
                </div>
              </div>
            </section> */}
            {/* <PassengerBaggage
              passenger={passenger}
              selectedSSRs={selectedSSRs}
              setSSRs={setSSRs}
              selectedReturnSSRs={selectedReturnSSRs}
              setReturnSSRs={setReturnSSRs}
            />
          </div>
        </PassengerAccordion> */}