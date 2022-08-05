import { Fragment } from "react";
import Counter from "components/Counter";

const CheckInCard = ({ info }) => {
  return (
    <Fragment>
      <section className="checkin__card">
        <figure>
          <svg
            width="85"
            height="85"
            viewBox="0 0 85 85"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="42.5" cy="42.5" r="42.5" fill="#F2F2F2" />
          </svg>
        </figure>
        <div className="flex flex-col">
          <h6 className="text-xs text-black font-title">Dangerous Goods</h6>
          <p className="font-body text-black text-xs">
            Please note that the following items are prohibited. Read More
          </p>
        </div>
      </section>
    </Fragment>
  );
};

export default CheckInCard;
