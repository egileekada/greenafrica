/* eslint-disable @next/next/no-img-element */
import ExtraSeat from "assets/svgs/seats/extra.svg";
import XIcon from "assets/svgs/seats/x.svg";


const SelectSeat = () => {
  return (
    <div className="plane-seats h-[140rem] w-[50rem] bg-red-500 overflow-hidden">
      <div className="seats">
        <div className="seats__row">
          <div className="seats__item unavailable">
            <XIcon />
          </div>
          <div className="seats__item unavailable"></div>
          <div className="seats__item seatRow">
            <p>2</p>
          </div>
          <div className="seats__item unavailable"></div>
          <div className="seats__item unavailable"></div>
        </div>
        <div className="seats__row">
          <div className="seats__item"></div>
          <div className="seats__item"></div>
          <div className="seats__item seatRow">
            <p>2</p>
          </div>
          <div className="seats__item"></div>
          <div className="seats__item"></div>
        </div>
        <div className="seats__row">
          <div className="seats__item">
            <p>MJ</p>
          </div>
          <div className="seats__item"></div>
          <div className="seats__item seatRow">
            <p>2</p>
          </div>
          <div className="seats__item"></div>
          <div className="seats__item"></div>
        </div>
      </div>
    </div>
  );
};

export default SelectSeat;
