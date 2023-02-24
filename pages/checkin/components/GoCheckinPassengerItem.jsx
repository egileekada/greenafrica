/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import { Checkbox } from "antd";
import PassengerAccordion from "../../bookings/components/PassengerAccordion";
import CheckinPassengerBaggage from "./CheckinPassengerBaggage";
import { useSelector, useDispatch } from "react-redux";
import { sessionSelector } from "redux/reducers/session";
import { checkinSelector, setNewCheckinSSRs } from "redux/reducers/checkin";
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

  return (
    <PassengerAccordion passenger={passenger}>
      <section className="flex flex-col">
        {/* <div className="flex flex-col mt-">
          <h6 className="text-left text-[#8F8CA4] font-header text-xs font-bold mb-2">
            Go SPECIAL ASSISTANCE
          </h6>

          <div className="flex items-center mb-5 primary-checkbox">
            <Checkbox checked={wcChecked} onChange={onWCChange}>
              <label className="text-[#101010] text-xs font-body">
                <span className="font-bold">Wheelchair</span> - Customer can
                climb stairs, Walk to & from seat but unable to walk long
                distances, Requires Assistance To and From The Aircraft.
              </label>
            </Checkbox>
          </div>
          <div className="flex items-center mb-5 primary-checkbox">
            <Checkbox checked={vpChecked} onChange={onVPChange}>
              <label className="text-[#101010] text-xs font-body">
                <span className="font-bold">Visually Impaired</span> - Customer
                requires full assistance to aircraft and escort inflight
              </label>
            </Checkbox>
          </div>
          <div className="flex items-center mb-5 primary-checkbox">
            <Checkbox checked={hpChecked} onChange={onHPChange}>
              <label className="text-[#101010] text-xs font-body">
                <span className="font-bold"> Hearing Impaired </span> - Customer
                requires full assistance to aircraft and escort inflight
              </label>
            </Checkbox>
          </div>
        </div> */}
        <CheckinPassengerBaggage
          passenger={passenger}
          selectedSSRs={selectedSSRs}
          setSSRs={setSSRs}
          selectedReturnSSRs={selectedReturnSSRs}
          setReturnSSRs={setReturnSSRs}
        />
      </section>
    </PassengerAccordion>
  );
};

GoCheckinPassengerItem.defaultProps = {
  passenger: {},
  selectedSSRs: [],
  selectedReturnSSRs: [],
};

export default GoCheckinPassengerItem;