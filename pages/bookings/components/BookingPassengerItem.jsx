/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import { Checkbox } from "antd";
import PassengerAccordion from "./PassengerAccordion";
import BookingPassengerBaggage from "./PassengerBaggage";
import { useSelector, useDispatch } from "react-redux";
import { bookingSelector, setNewBookingSSRs } from "redux/reducers/booking";
import { sessionSelector } from "redux/reducers/session";
import { v4 as uuid } from "uuid";

const BookingPassengerItem = ({
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
  const { newBookingSSRs, bookingSessionSSRs, goDifference } =
    useSelector(bookingSelector);
  const dispatch = useDispatch();

  const _Arrival =
    bookingResponse?.Booking?.Journeys[0]?.Segments[0]?.ArrivalStation;
  const _Departure =
    bookingResponse?.Booking?.Journeys[0]?.Segments[0]?.DepartureStation;

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
        if (bookingSessionSSRs && bookingSessionSSRs?.length > 0) {
          const WCHRs = bookingSessionSSRs?.filter((_ssr) => {
            return (
              _ssr?.passengerNumber === parseInt(passenger?.PassengerNumber) &&
              _ssr?.ssrCode === "WCHR"
            );
          });
          if (WCHRs.length > 0) {
            setWCChecked(true);
            setWCPreSelected(true);
          }

          const VPRDs = bookingSessionSSRs?.filter((_ssr) => {
            return (
              _ssr?.passengerNumber === parseInt(passenger?.PassengerNumber) &&
              _ssr?.ssrCode === "VPRD"
            );
          });
          if (VPRDs.length > 0) {
            setVPChecked(true);
            setVPPreSelected(true);
          }

          const HPRDs = bookingSessionSSRs?.filter((_ssr) => {
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

        const existingSSRs = [...newBookingSSRs];
        dispatch(setNewBookingSSRs([...existingSSRs, _ssrObj]));
        setWCChecked(true);
      } else {
        let codeToBeRemoved = "WCHR";
        const existingSSRs = [...newBookingSSRs];
        const _cleanedSSRs = existingSSRs.filter(
          (_ssr) => _ssr.ssrCode !== codeToBeRemoved
        );
        dispatch(setNewBookingSSRs([..._cleanedSSRs]));
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
        const existingSSRs = [...newBookingSSRs];
        dispatch(setNewBookingSSRs([...existingSSRs, _ssrObj]));
        setVPChecked(true);
      } else {
        let codeToBeRemoved = "VPRD";
        const existingSSRs = [...newBookingSSRs];
        const _cleanedSSRs = existingSSRs.filter(
          (_ssr) => _ssr.ssrCode !== codeToBeRemoved
        );
        dispatch(setNewBookingSSRs([..._cleanedSSRs]));
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
        const existingSSRs = [...newBookingSSRs];
        dispatch(setNewBookingSSRs([...existingSSRs, _ssrObj]));
        setHPChecked(true);
      } else {
        let codeToBeRemoved = "HPRD";
        const existingSSRs = [...newBookingSSRs];
        const _cleanedSSRs = existingSSRs.filter(
          (_ssr) => _ssr.ssrCode !== codeToBeRemoved
        );
        dispatch(setNewBookingSSRs([..._cleanedSSRs]));
        setHPChecked(false);
      }
    }
  };


  const _passengerName = `${passenger?.Names[0]?.FirstName}  ${passenger?.Names[0]?.LastName} `;

  const _passengerType =
    passenger?.PassengerTypeInfo?.PaxType === "ADT"
      ? "ADULT"
      : passenger?.PassengerTypeInfo?.PaxType === "CHD"
      ? "CHILD"
      : "INFANT";


  return (

    <div className=" w-full   lg:px-[32px] lg:my-6 mt-3 " >
    <div className=" w-full bg-white rounded-md border border-[#261F5E] lg:border-[#9E9BBF] " >
      <div className=" w-full py-2 rounded-t-md px-7 text-[#261F5E] bg-[#F3F3F7] flex flex-col  " > 
        <p>{_passengerType} {passenger?.typeCount}</p>
        <p className=" font-bold !text-lg text-[#261F5E] " >{_passengerName}</p>
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
          {/* <p className=" font-bold text-[#261F5E] mt-4 " >Insurance</p>
          <div className=" my-4 " > 
            <Checkbox checked={insChecked}  onChange={onInsuranceChange}>
            <label className="check-label">
              <p className="ml-2 text-[#26205E]">
                Travel Insurance ( ₦{INSCHARGE.toLocaleString()})
              </p>
            </label>
          </Checkbox>
          </div> */}
        </div>
        <div className=" w-full " >
          <BookingPassengerBaggage
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
    // <PassengerAccordion passenger={passenger}>
    //   <section className="flex flex-col">
    //     <div className="flex flex-col mt-">
    //       <h6 className="text-left text-[#8F8CA4] font-header text-xs font-bold mb-4">
    //         SPECIAL ASSISTANCE{" "}
    //         <span className="italic">
    //           (Please let us know if you will require any special assistance at
    //           the airport)
    //         </span>
    //       </h6>

    //       <div className="flex items-center mb-5 primary-checkbox">
    //         <Checkbox checked={wcChecked} onChange={onWCChange}>
    //           <label className="text-[#101010] text-xs font-body">
    //             <span className="font-bold">Wheelchair</span> - Customer can
    //             climb stairs, Walk to & from seat but unable to walk long
    //             distances, Requires Assistance To and From The Aircraft.
    //           </label>
    //         </Checkbox>
    //       </div>
    //       <div className="flex items-center mb-5 primary-checkbox">
    //         <Checkbox checked={vpChecked} onChange={onVPChange}>
    //           <label className="text-[#101010] text-xs font-body">
    //             <span className="font-bold">Visually Impaired</span> - Customer
    //             requires full assistance to aircraft and escort inflight
    //           </label>
    //         </Checkbox>
    //       </div>
    //       <div className="flex items-center mb-5 primary-checkbox">
    //         <Checkbox checked={hpChecked} onChange={onHPChange}>
    //           <label className="text-[#101010] text-xs font-body">
    //             <span className="font-bold"> Hearing Impaired </span> - Customer
    //             requires full assistance to aircraft and escort inflight
    //           </label>
    //         </Checkbox>
    //       </div>
    //     </div>
    //     <BookingPassengerBaggage
    //       passenger={passenger}
    //       selectedSSRs={selectedSSRs}
    //       setSSRs={setSSRs}
    //       selectedReturnSSRs={selectedReturnSSRs}
    //       setReturnSSRs={setReturnSSRs}
    //     />
    //   </section>
    // </PassengerAccordion>
  );
};

BookingPassengerItem.defaultProps = {
  passenger: {},
  selectedSSRs: [],
  selectedReturnSSRs: [],
};

export default BookingPassengerItem;
