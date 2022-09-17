/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import { Checkbox } from "antd";
import PassengerAccordion from "./PassengerAccordion";
import BookingPassengerBaggage from "./PassengerBaggage";
import { useSelector } from "react-redux";
import { bookingSelector } from "redux/reducers/booking";
import { sessionSelector } from "redux/reducers/session";

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
  const { sessionStateResponse } = useSelector(sessionSelector);
  const { bookingSessionSSRs } = useSelector(bookingSelector);

  const _Arrival =
    sessionStateResponse?.BookingData?.Journeys[0]?.Segments[0]?.ArrivalStation;
  const _Departure =
    sessionStateResponse?.BookingData?.Journeys[0]?.Segments[0]
      ?.DepartureStation;

  useEffect(() => {
    async function mapSessionSSRs() {
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
    mapSessionSSRs();
  }, []);

  const onWCChange = (e) => {
    if (!wcPreSelected) {
      if (e.target.checked) {
        const _ssrObj = {
          passengerNumber: parseInt(passenger?.PassengerNumber),
          ssrCode: "WCHR",
          schedueIndex: 0,
          ArrivalStation: _Arrival,
          DepartureStation: _Departure,
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
    }
  };

  const onVPChange = (e) => {
    if (!vpPreSelected) {
      if (e.target.checked) {
        const _ssrObj = {
          passengerNumber: parseInt(passenger?.PassengerNumber),
          ssrCode: "VPRD",
          schedueIndex: 0,
          ArrivalStation: _Arrival,
          DepartureStation: _Departure,
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
    }
  };

  const onHPChange = (e) => {
    if (!hpPreSelected) {
      if (e.target.checked) {
        const _ssrObj = {
          passengerNumber: parseInt(passenger?.PassengerNumber),
          ssrCode: "HPRD",
          schedueIndex: 0,
          ArrivalStation: _Arrival,
          DepartureStation: _Departure,
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
    }
  };

  return (
    <PassengerAccordion passenger={passenger}>
      <section className="flex flex-col">
        <div className="flex flex-col mt-">
          <h6 className="text-left text-[#8F8CA4] font-header text-xs font-bold mb-2">
            SPECIAL ASSISTANCE
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
        </div>
        <BookingPassengerBaggage
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

BookingPassengerItem.defaultProps = {
  passenger: {},
  selectedSSRs: [],
  selectedReturnSSRs: [],
};

export default BookingPassengerItem;
