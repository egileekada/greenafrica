/* eslint-disable @next/next/no-img-element */

const Fare = () => {
  return (
    <div className="trip__summary__item">
      <h2 className="trip-title mb-3">FARE BREAKDOWN</h2>
      <div className="flex flex-col ">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center">
            <h6 className="font-header font-bold text-sm text-primary-main">
              Round Trip ABV - LOS
            </h6>
          </div>
          <div className="font-header text-xs text-primary-main">
            <h6 className="text-primary-main text-base font-display">
              {" "}
              ₦26,501
            </h6>
          </div>
        </div>
        <div className="trip__summary__row">
          <div className="flex items-center">
            <h6>2 x 10 kg baggage:</h6>
          </div>
          <div>
            <h6> ₦26,501</h6>
          </div>
        </div>
        <div className="trip__summary__row subrow">
          <div className="flex items-center">
            <h6>1x Seat Selected</h6>
          </div>
          <div>
            <h6> ₦26,501</h6>
          </div>
        </div>
        <div className="trip__summary__row subrow">
          <div className="flex items-center">
            <h6>1x Seat Selected</h6>
          </div>
          <div>
            <h6> ₦26,501</h6>
          </div>
        </div>
        <div className="trip__summary__row mb-5">
          <div className="flex items-center">
            <h6>1x Seat Selected</h6>
          </div>
          <div>
            <h6> ₦26,501</h6>
          </div>
        </div>
        <div className="trip__summary__row totalRow">
          <div className="flex items-center">
            <h5>TOTAL</h5>
          </div>
          <div>
            <h6> ₦26,501</h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fare;
