/* eslint-disable @next/next/no-img-element */
import FourIcon from "assets/svgs/four.svg";

const PaymentInfo = () => {
  return (
    <section className="ibe__sidebar__item mb-10">
      <div className="ibe__sidebar__content">
        <div className="flex items-center">
          <figure className="mr-2">
            <FourIcon />
          </figure>
          <div className="flex flex-col">
            <h4>Payment</h4>
          </div>
        </div>
      </div>
      <div className="ibe__sidebar__box">
        <div className="ibe__sidebar__empty h-[187px]">
          <p>Select a flight to see pricing</p>
        </div>
      </div>
      <div className="ibe__sidebar__box payment mt-6">
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center">
              <h6 className="font-display text-xs text-primary-main">
                Departure ABV - LOS
              </h6>
            </div>
            <div className="font-header text-xs text-primary-main">
              <h6> ₦26,501</h6>
            </div>
          </div>
          <div className="ibe__sidebar__row">
            <div className="flex items-center">
              <h6>2 x 10 kg baggage:</h6>
            </div>
            <div>
              <h6> ₦26,501</h6>
            </div>
          </div>
          <div className="ibe__sidebar__row subrow">
            <div className="flex items-center">
              <h6>1x Seat Selected</h6>
            </div>
            <div>
              <h6> ₦26,501</h6>
            </div>
          </div>
          <div className="ibe__sidebar__row subrow">
            <div className="flex items-center">
              <h6>1x Seat Selected</h6>
            </div>
            <div>
              <h6> ₦26,501</h6>
            </div>
          </div>
          <div className="ibe__sidebar__row mb-10">
            <div className="flex items-center">
              <h6>1x Seat Selected</h6>
            </div>
            <div>
              <h6> ₦26,501</h6>
            </div>
          </div>
          <div className="ibe__sidebar__row totalRow">
            <div className="flex items-center">
              <h5>TOTAL</h5>
            </div>
            <div>
              <h6> ₦26,501</h6>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentInfo;
