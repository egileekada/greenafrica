/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import PassengerAccordion from "components/PassengerAccordion";
import { Checkbox } from "antd";
import PassengerBaggage from "containers/Passenger/PassengerBaggage";
import { useSelector } from "react-redux";
import { sessionSelector } from "redux/reducers/session";

const PassengerDetailsItem = ({
  passenger,
  selectedSSRs,
  setSSRs,
  setReturnSSRs,
  selectedReturnSSRs,
}) => {
  const { SSRAvailabilityResponse, sessionSSRs } = useSelector(sessionSelector);
  const [wcChecked, setWCChecked] = useState(false);
  const [vpChecked, setVPChecked] = useState(false);
  const [hpChecked, setHPChecked] = useState(false);

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
      }
    }
    mapSessionSSRs();
  }, []);

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

  const onInsuranceChange = (e) => {};

  return (
    <section className="flex flex-col bg-white rounded-xl mb-6">
      {SSRAvailabilityResponse ? (
        <PassengerAccordion passenger={passenger}>
          <div className="flex flex-col">
            <p>GoSSRs:: {JSON.stringify(selectedSSRs)}</p>
            <p>RetrunSSRs:: {JSON.stringify(selectedReturnSSRs)}</p>
            <h2 className="text-left text-[#8F8CA4] font-header font-bold mb-2 hidden">
              INSURANCE
            </h2>
            <div className="flex items-center primary-checkbox mb-4 hidden">
              <Checkbox onChange={onInsuranceChange}>
                <label className="check-label">
                  <p className="ml-2">Travel Insurance (N2,000)</p>
                </label>
              </Checkbox>
            </div>
            <section className="flex flex-col special__needs mb-4">
              <div className="flex flex-col mt-">
                <h6 className="text-left text-[#8F8CA4] font-header font-bold mb-2">
                  SPECIAL ASSISTANCE
                </h6>
                <div className="flex items-center mb-5 primary-checkbox">
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
            </section>
            <PassengerBaggage
              passenger={passenger}
              selectedSSRs={selectedSSRs}
              setSSRs={setSSRs}
              selectedReturnSSRs={selectedReturnSSRs}
              setReturnSSRs={setReturnSSRs}
            />
          </div>
        </PassengerAccordion>
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
