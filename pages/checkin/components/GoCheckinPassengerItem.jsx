/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import { Checkbox } from "antd";
import PassengerAccordion from "../../bookings/components/PassengerAccordion";
import CheckinPassengerBaggage from "./CheckinPassengerBaggage";
import { useSelector, useDispatch } from "react-redux";
import { sessionSelector } from "redux/reducers/session"; 
import { checkinSelector, setNewCheckinSSRs } from "redux/reducers/checkin";
import { useGetLocationsQuery } from "services/widgetApi.js";
import { v4 as uuid } from "uuid";

const GoCheckinPassengerItem = ({
  passenger,
  selectedSSRs,
  setSSRs,
  setReturnSSRs,
  selectedReturnSSRs,
}) => {
  const [wcChecked, setWCChecked] = useState(false);
  const [vpChecked, setVPChecked] = useState(false);
  const [hpChecked, setHPChecked] = useState(false);
  const [wcPreSelected, setWCPreSelected] = useState(false);
  const [vpPreSelected, setVPPreSelected] = useState(false);
  const [hpPreSelected, setHPPreSelected] = useState(false);
  const { bookingResponse } = useSelector(sessionSelector);
  const { data, isLoading } = useGetLocationsQuery();
  const { newCheckinSSRs, checkinSessionSSRs, goDifference } =
    useSelector(checkinSelector);
  const dispatch = useDispatch();

  const _Arrival =
    bookingResponse?.Booking?.Journeys[0]?.Segments[0]?.ArrivalStation;
  const _Departure =
    bookingResponse?.Booking?.Journeys[0]?.Segments[0]
      ?.DepartureStation;

  useEffect(() => {
    async function mapSessionSSRs() {
      if (goDifference && goDifference.length > 0) {
        const WCHRs = goDifference?.filter((_ssr) => {
          return (
            _ssr?.passengerNumber === parseInt(passenger?.PassengerNumber) &&
            _ssr?.ssrCode === "WCHR"
          );
        });
        if (WCHRs.length > 0) {
          setWCChecked(true);
        }

        const VPRDs = goDifference?.filter((_ssr) => {
          return (
            _ssr?.passengerNumber === parseInt(passenger?.PassengerNumber) &&
            _ssr?.ssrCode === "VPRD"
          );
        });
        if (VPRDs.length > 0) {
          setVPChecked(true);
        }

        const HPRDs = goDifference?.filter((_ssr) => {
          return (
            _ssr?.passengerNumber === parseInt(passenger?.PassengerNumber) &&
            _ssr?.ssrCode === "HPRD"
          );
        });
        if (HPRDs.length > 0) {
          setHPChecked(true);
        }
      } else {
        if (checkinSessionSSRs && checkinSessionSSRs?.length > 0) {
          const WCHRs = checkinSessionSSRs?.filter((_ssr) => {
            return (
              _ssr?.passengerNumber === parseInt(passenger?.PassengerNumber) &&
              _ssr?.ssrCode === "WCHR"
            );
          });
          if (WCHRs.length > 0) {
            setWCChecked(true);
            setWCPreSelected(true);
          }

          const VPRDs = checkinSessionSSRs?.filter((_ssr) => {
            return (
              _ssr?.passengerNumber === parseInt(passenger?.PassengerNumber) &&
              _ssr?.ssrCode === "VPRD"
            );
          });
          if (VPRDs.length > 0) {
            setVPChecked(true);
            setVPPreSelected(true);
          }

          const HPRDs = checkinSessionSSRs?.filter((_ssr) => {
            return (
              _ssr?.passengerNumber === parseInt(passenger?.PassengerNumber) &&
              _ssr?.ssrCode === "HPRD"
            );
          });
          if (HPRDs.length > 0) {
            setHPChecked(true);
            setHPPreSelected(true);
          }
        }
      }
    }
    mapSessionSSRs();
  }, []);

  const onWCChange = (e) => {
    if (!wcPreSelected) {
      if (e.target.checked) {
        const unique_id = uuid();
        const _ssrObj = {
          id: `${Date.now()}${unique_id}`,
          passengerNumber: parseInt(passenger?.PassengerNumber),
          ssrCode: "WCHR",
          schedueIndex: 0,
          ArrivalStation: _Arrival,
          DepartureStation: _Departure,
        };

        console.log("ssrObj", _ssrObj);

        const existingSSRs = [...newCheckinSSRs];
        dispatch(setNewCheckinSSRs([...existingSSRs, _ssrObj]));
        setWCChecked(true);
      } else {
        let codeToBeRemoved = "WCHR";
        const existingSSRs = [...newCheckinSSRs];
        const _cleanedSSRs = existingSSRs.filter(
          (_ssr) => _ssr.ssrCode !== codeToBeRemoved
        );
        dispatch(setNewCheckinSSRs([..._cleanedSSRs]));
        setWCChecked(false);
      }
    }
  };

  const onVPChange = (e) => {
    if (!vpPreSelected) {
      if (e.target.checked) {
        const unique_id = uuid();
        const _ssrObj = {
          id: `${Date.now()}${unique_id}`,
          passengerNumber: parseInt(passenger?.PassengerNumber),
          ssrCode: "VPRD",
          schedueIndex: 0,
          ArrivalStation: _Arrival,
          DepartureStation: _Departure,
        };
        const existingSSRs = [...newCheckinSSRs];
        dispatch(setNewCheckinSSRs([...existingSSRs, _ssrObj]));
        setVPChecked(true);
      } else {
        let codeToBeRemoved = "VPRD";
        const existingSSRs = [...newCheckinSSRs];
        const _cleanedSSRs = existingSSRs.filter(
          (_ssr) => _ssr.ssrCode !== codeToBeRemoved
        );
        dispatch(setNewCheckinSSRs([..._cleanedSSRs]));
        setVPChecked(false);
      }
    }
  };

  const onHPChange = (e) => {
    if (!hpPreSelected) {
      if (e.target.checked) {
        const unique_id = uuid();
        const _ssrObj = {
          id: `${Date.now()}${unique_id}`,
          passengerNumber: parseInt(passenger?.PassengerNumber),
          ssrCode: "HPRD",
          schedueIndex: 0,
          ArrivalStation: _Arrival,
          DepartureStation: _Departure,
        };
        const existingSSRs = [...newCheckinSSRs];
        dispatch(setNewCheckinSSRs([...existingSSRs, _ssrObj]));
        setHPChecked(true);
      } else {
        let codeToBeRemoved = "HPRD";
        const existingSSRs = [...newCheckinSSRs];
        const _cleanedSSRs = existingSSRs.filter(
          (_ssr) => _ssr.ssrCode !== codeToBeRemoved
        );
        dispatch(setNewCheckinSSRs([..._cleanedSSRs]));
        setHPChecked(false);
      }
    }
  };


  const resolveAbbreviation = (abrreviation) => {
    const [{ name, code }] = data?.data?.items.filter(
      (location) => location.code === abrreviation
    );
    return `${name} (${code})`;
  };

  console.log(selectedSSRs);

  const _passengerName = `${passenger?.Names[0]?.FirstName}  ${passenger?.Names[0]?.LastName} `;

  const _passengerType =
    passenger?.PassengerTypeInfo?.PaxType === "ADT"
      ? "ADULT"
      : passenger?.PassengerTypeInfo?.PaxType === "CHD"
      ? "CHILD"
      : "INFANT";


  return (
    // <PassengerAccordion passenger={passenger}>


    <div className=" w-full   lg:px-[32px] lg:my-6 mt-3 " >
      <div className=" w-full bg-white rounded-md border border-[#261F5E] lg:border-[#9E9BBF] " >
        <div className=" w-full py-2 rounded-t-md px-7 text-[#261F5E] bg-[#F3F3F7] flex items-center  " > 
        <div className=" w-fit mr-auto " >

          <p>{_passengerType} {passenger?.typeCount}</p>
          <p className=" font-bold !text-lg text-[#261F5E] " >{_passengerName}</p>
        </div>

        {bookingResponse?.Booking?.Journeys?.length > 0 ? (
            bookingResponse?.Booking?.Journeys?.filter((_item, _itemIndex) => {
              return parseInt(_itemIndex) === parseInt(passenger?.journey);
            }).map((_journey, _journeyIndex) => {
              const tabID = `${_journey?.Segments[0]?.DepartureStation.trim().toLowerCase()}${_journey?.Segments[0]?.ArrivalStation.trim().toLowerCase()}`;

              return (
                <div className=" w-fit flex items-center " >
                   <p className=" font-bold text-[#261F5E] mr-2 " >Departing: </p>
                   <div className=" font-bold text-xs flex items-center  text-[#47FF5A] bg-[#26205E] px-2 py-1 rounded-md " >
                       {!isLoading &&
                        resolveAbbreviation(
                          _journey?.Segments[0]?.DepartureStation
                        )} - 
                     
                      {!isLoading &&
                        resolveAbbreviation(
                          _journey?.Segments[0]?.ArrivalStation
                        )} 
                  </div>
                </div>

              );
            })
          ) : (
            <>
               
            </>
          )}
        </div>
      <section className="flex flex-col"> 
      
        <CheckinPassengerBaggage
          passenger={passenger}
          selectedSSRs={selectedSSRs}
          setSSRs={setSSRs}
          selectedReturnSSRs={selectedReturnSSRs}
          setReturnSSRs={setReturnSSRs}
        />
      </section>
      </div>
      </div>
    // </PassengerAccordion>
  );
};

GoCheckinPassengerItem.defaultProps = {
  passenger: {},
  selectedSSRs: [],
  selectedReturnSSRs: [],
};

export default GoCheckinPassengerItem;
