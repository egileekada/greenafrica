/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import PassengerAccordion from "components/PassengerAccordion";
import DetailsAccordion from "components/DetailsAccordion";
import { Checkbox, Switch } from "antd";
import PassengerBaggage from "containers/Passenger/PassengerBaggage";
import { useSelector, useDispatch } from "react-redux";
import { sessionSelector } from "redux/reducers/session";

const PassengerDetailsItem = ({ passenger, selectedSSRs, setSSRs }) => {
  const [specialNeed, setSpecialNeed] = useState(false);
  const { SSRAvailabilityResponse } = useSelector(sessionSelector);

  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);

    if (e.target.checked) {
      const _ssrObj = {
        passengerNumber: passenger?.id,
        ssrCode: "WCHC",
        count: 1,
      };
      setSSRs((prevState) => [...prevState, _ssrObj]);
    } else {
      let codeToBeRemoved = "WCHC";
      setSSRs((prevState) =>
        prevState.filter((_ssr) => _ssr.ssrCode !== codeToBeRemoved)
      );

      //   setSSRs((prevState) => {
      //     const newState = prevState.map((_ssr) => {
      //       if (_ssr.ssrCode === "X20") {
      //         return { ..._ssr, country: "Denmark" };
      //       }
      //       return obj;
      //     });

      //     return newState;
      //   });
    }
  };

  const specialChanged = (checked) => {
    setSpecialNeed(checked);
  };

  return (
    <section className="flex flex-col bg-white rounded-xl mb-6">
      {SSRAvailabilityResponse ? (
        <PassengerAccordion passenger={passenger}>
          <div className="flex flex-col">
            <p>{JSON.stringify(selectedSSRs)}</p>
            <h2 className="title-text mb-2">INSURANCE</h2>
            <div className="flex items-center primary-checkbox">
              <Checkbox onChange={onChange}>
                <label className="check-label">
                  <p className="ml-2">Travel Insurance (N2,000)</p>
                </label>
              </Checkbox>
            </div>
            <section className="flex flex-col special__needs">
              <div className="flex items-center my-5">
                <Switch
                  value={specialNeed}
                  onChange={specialChanged}
                  className="mr-6"
                />
                <p className="text-[#101010] font-display text-sm">
                  {" "}
                  Need Special Assistance?
                </p>
              </div>

              {specialNeed && (
                <div className="flex flex-col">
                  <h6 className="text-[#8F8CA4] text-xxs font-header mb-4">
                    SPECIAL ASSISTANCE
                  </h6>
                  <div className="flex items-center mb-5">
                    <Checkbox onChange={onChange}>
                      <label className="check-label">
                        <span>Wheelchair</span> - Customer can climb stairs,
                        Walk to & from seat but unable to walk long distances,
                        Requires Assistance To and From The Aircraft.
                      </label>
                    </Checkbox>
                  </div>
                  <div className="flex items-center mb-5">
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
                  </div>
                </div>
              )}
            </section>
            <DetailsAccordion title="Have Additional Baggage?">
              <PassengerBaggage
                passenger={passenger}
                selectedSSRs={selectedSSRs}
                setSSRs={setSSRs}
              />
            </DetailsAccordion>
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
