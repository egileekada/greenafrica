/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import PassengerAccordion from "components/PassengerAccordion";
import { Checkbox } from "antd";
import PassengerBaggage from "containers/Passenger/PassengerBaggage";
import { useSelector, useDispatch } from "react-redux";
import { sessionSelector } from "redux/reducers/session";

const PassengerDetailsItem = ({ passenger, selectedSSRs, setSSRs }) => {
  const { SSRAvailabilityResponse, sessionSSRs } = useSelector(sessionSelector);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    async function mapSessionSSRs() {
      if (sessionSSRs && sessionSSRs.length > 0) {
        const WCHCs = sessionSSRs.filter((_ssr) => {
          return (
            _ssr?.passengerNumber === parseInt(passenger?.id) &&
            _ssr?.ssrCode === "WCHC"
          );
        });
        if (WCHCs.length > 0) {
          setChecked(true);
        }
      }
    }
    mapSessionSSRs();
  }, []);

  const onChange = (e) => {
    if (e.target.checked) {
      const _ssrObj = {
        passengerNumber: passenger?.id,
        ssrCode: "WCHC",
      };
      setSSRs((prevState) => [...prevState, _ssrObj]);
      setChecked(true);
    } else {
      let codeToBeRemoved = "WCHC";
      setSSRs((prevState) =>
        prevState.filter((_ssr) => _ssr.ssrCode !== codeToBeRemoved)
      );
      setChecked(false);
    }
  };

  const onInsuranceChange = (e) => {};

  return (
    <section className="flex flex-col bg-white rounded-xl mb-6">
      {SSRAvailabilityResponse ? (
        <PassengerAccordion passenger={passenger}>
          <div className="flex flex-col">
            {/* <p>{JSON.stringify(selectedSSRs)}</p> */}
            <h2 className="text-left text-[#8F8CA4] font-header font-bold text-xs mb-2">
              INSURANCE
            </h2>
            <div className="flex items-center primary-checkbox">
              <Checkbox onChange={onInsuranceChange}>
                <label className="check-label">
                  <p className="ml-2">Travel Insurance (N2,000)</p>
                </label>
              </Checkbox>
            </div>
            <section className="flex flex-col special__needs mb-4">
              <div className="flex flex-col mt-6">
                <h6 className="text-left text-[#8F8CA4] font-header font-bold text-xs mb-2">
                  SPECIAL ASSISTANCE
                </h6>
                <div className="flex items-center mb-5 primary-checkbox">
                  <Checkbox checked={checked} onChange={onChange}>
                    <label className="check-label">
                      <span className="font-bold">Wheelchair</span> - Customer
                      can climb stairs, Walk to & from seat but unable to walk
                      long distances, Requires Assistance To and From The
                      Aircraft.
                    </label>
                  </Checkbox>
                </div>
                {/* <div className="flex items-center mb-5">
                    <Checkbox onChange={onChange}>
                      <label className="check-label">
                        <span>Visually Impaired</span> - Customer requires full
                        assistance to aircraft and escort inflight
                      </label>
                    </Checkbox>
                  </div>
                  <div className="flex items-center mb-5">
                    <Checkbox onChange={onChange}>
                      <label className="check-label">
                        <span> Hearing Impaired </span> - Customer requires full
                        assistance to aircraft and escort inflight
                      </label>
                    </Checkbox>
                  </div> */}
              </div>
            </section>
            <PassengerBaggage
              passenger={passenger}
              selectedSSRs={selectedSSRs}
              setSSRs={setSSRs}
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
};

export default PassengerDetailsItem;
