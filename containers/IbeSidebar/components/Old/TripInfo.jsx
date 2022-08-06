/* eslint-disable @next/next/no-img-element */
// import OneIcon from "assets/svgs/one.svg";
import CheckIcon from "assets/svgs/done.svg";
import FlightIcon from "assets/svgs/plane-oultine.svg";
import CostIcon from "assets/svgs/cost.svg";
import DiscountIcon from "assets/svgs/discount.svg";
import CaretLeft from "assets/svgs/sidebar/caretleft.svg";

const TripInfo = () => {
  return (
    <section className="ibe__sidebar__item mb-10">
      <h1 className="mb-4">PLAN YOUR TRIP</h1>

      <div className="ibe__sidebar__content">
        <div className="flex items-center">
          <figure className="mr-2">
            {/* <OneIcon /> */}
            <CheckIcon />
          </figure>
          <div className="flex flex-col">
            <h4>Flight Details</h4>
          </div>
          <button className="accordion-trigger">
            <CaretLeft />
          </button>
        </div>
      </div>

      <div className="ibe__sidebar__box">
        <div className="flex mb-6">
          <div className="flex flex-col w-[53px] mr-4">
            <div className="bg-primary-main h-6 rounded-t-[3px] flex justify-center items-center">
              <h6 className=" text-center text-[10px] leading-[13px] font-semibold text-white">
                JUN
              </h6>
            </div>
            <div className="bg-purple-light h-6 rounded-b-[3px] flex justify-center items-center">
              <h6 className="text-center text-sm font-semibold text-[#1F1955] text-body">
                22
              </h6>
            </div>
          </div>
          <div className="flex flex-col">
            <h5 className="text-sm font-extrabold text-primary-main font-display mb-2">
              Lagos - Abuja
            </h5>
            <h6 className="text-[12px] font-normal text-[#9692B8] font-title">
              18:00 - 19:35
            </h6>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="ibe__sidebar__row bordered">
            <div className="flex items-center">
              <figure className="mr-2">
                <FlightIcon />
              </figure>
              <h6>Flight :</h6>
            </div>
            <div>
              <h6>Q9 301</h6>
            </div>
          </div>
          <div className="ibe__sidebar__row bordered">
            <div className="flex items-center">
              <figure className="mr-2">
                <CostIcon />
              </figure>
              <h6>Flight :</h6>
            </div>
            <div>
              <h6>Q9 301</h6>
            </div>
          </div>
          <div className="ibe__sidebar__row bordered">
            <div className="flex items-center">
              <figure className="mr-2">
                <DiscountIcon />
              </figure>
              <h6>Discount: :</h6>
            </div>
            <div>
              <h6> ₦3,501</h6>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TripInfo;
