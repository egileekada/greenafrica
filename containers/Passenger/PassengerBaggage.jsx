/* eslint-disable @next/next/no-img-element */
import { Checkbox } from "antd";
import FliightIcon from "assets/svgs/aero.svg";
import ArrowIcon from "assets/svgs/small-arrow.svg";
import BaggageCard from "components/Cards/baggage";
import BaggageIcon from "assets/svgs/baggage.svg";
import { Fragment, useState } from "react";
import Popup from "components/Popup";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { sessionSelector } from "redux/reducers/session";

const PassengerBaggage = ({ passenger, selectedSSRs, setSSRs }) => {
  const router = useRouter();
  const [showPopUp, setShow] = useState(false);
  const { SSRAvailabilityResponse, flightParams } =
    useSelector(sessionSelector);

  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
    if (e.target.checked) {
      setShow(true);
    }
  };

  const proceedToSeatSelection = () => {
    // this is suposed to go to seat-Selection,payment is an hotfix
    router.push("/trip/payment");
  };

  const ALLOWED__SSRS = ["X20", "X15", "X10"];
  return (
    <Fragment>
      <section className="flex flex-col ">
        <div className="flex items-center mb-4">
          <figure>
            <FliightIcon className="primary-main" />
          </figure>
          <div className="flex items-center ml-[10px] ">
            <p className="font-header text-primary-main text-sm mr-[6px]">
              {flightParams?.departureStation}
            </p>
            <figure className="flex items-center justify-center -mb-1">
              <ArrowIcon />
            </figure>
            <p className="font-header text-primary-main text-sm ml-[6px]">
              {flightParams?.arrivalStation}
            </p>
          </div>
        </div>

        {/* Checkin Info*/}
        <section className="checkin__info my-3">
          <p>
            You added some new services so your fare has been updated with
            additional fees
          </p>
        </section>
        {/* Checkin Info*/}

        <h2 className="title-text mb-4">BAGGAGE INFORMATION</h2>
        <section className="grid grid-cols-1 sm:grid-cols-2 tab:grid-cols-3 gap-10 mb-7">
          {SSRAvailabilityResponse.SSRAvailabilityForBookingResponse.SSRSegmentList.map(
            (_list) => {
              return _list?.AvailablePaxSSRList.filter((_SSR) => {
                return ALLOWED__SSRS.includes(_SSR?.SSRCode);
              }).map((_SSRITEM) => {
                return (
                  <BaggageCard
                    passenger={passenger}
                    selectedSSRs={selectedSSRs}
                    setSSRs={setSSRs}
                    SSRItem={_SSRITEM}
                  />
                );
              });
            }
          )}
        </section>
        <div className="flex items-center primary-checkbox mb-4">
          <Checkbox onChange={onChange}>
            <label className="check-label">
              <p className="ml-2">I don’t need extra baggage</p>
            </label>
          </Checkbox>
        </div>
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
};

export default PassengerBaggage;
