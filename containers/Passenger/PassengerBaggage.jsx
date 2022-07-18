/* eslint-disable @next/next/no-img-element */
import { Checkbox } from "antd";

import FliightIcon from "assets/svgs/aero.svg";
import ArrowIcon from "assets/svgs/small-arrow.svg";
import BaggageCard from "components/Cards/baggage";
import BaggageIcon from "assets/svgs/baggage.svg";
import { Fragment, useState } from "react";
import Popup from "components/Popup";

const PassengerBaggage = () => {
  const [showPopUp, setShow] = useState(true);

  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  return (
    <Fragment>
      <section className="flex flex-col ">
        <div className="flex items-center mb-4">
          <figure>
            <FliightIcon className="primary-main" />
          </figure>
          <div className="flex items-center ml-[10px] ">
            <p className="font-header text-primary-main text-sm mr-[6px]">
              Lagos
            </p>
            <figure className="flex items-center justify-center -mb-1">
              <ArrowIcon />
            </figure>
            <p className="font-header text-primary-main text-sm ml-[6px]">
              Abuja
            </p>
          </div>
        </div>
        <h2 className="title-text mb-4">BAGGAGE INFORMATION</h2>
        <section className="grid grid-cols-3 gap-x-10 mb-7">
          <BaggageCard />
          <BaggageCard />
          <BaggageCard />
        </section>
        <div className="flex items-center primary-checkbox">
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
            <div className="flex items-center justify-between w-full">
              <button className="btn btn-primary basis-[48%]  mr-2">
                Select Baggage
              </button>
              <button className="btn btn-outline basis-[48%]">
                I don’t need it
              </button>
            </div>
          </div>
        </section>
      </Popup>
    </Fragment>
  );
};

export default PassengerBaggage;
