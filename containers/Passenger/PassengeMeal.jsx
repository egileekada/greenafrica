/* eslint-disable @next/next/no-img-element */
import { Checkbox } from "antd";

import FliightIcon from "assets/svgs/aero.svg";
import ArrowIcon from "assets/svgs/small-arrow.svg";
import MealCard from "components/Cards/meal";

const PassengerMeal = () => {
  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  return (
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

      {/* Checkin Info*/}
      <section className="checkin__info my-3">
        <p>
          You added some new services so your fare has been updated with
          additional fees
        </p>
      </section>
      {/* Checkin Info*/}

      <h2 className="title-text mb-4">MEAL INFORMATION</h2>
      <section className="grid grid-cols-1 sm:grid-cols-2 tab:grid-cols-3 gap-10 mb-7">
        <MealCard />
        <MealCard />
        <MealCard />
      </section>
      <div className="flex items-center primary-checkbox">
        <Checkbox onChange={onChange}>
          <label className="check-label">
            <p className="ml-2">I am not requesting any meal</p>
          </label>
        </Checkbox>
      </div>
    </section>
  );
};

export default PassengerMeal;
