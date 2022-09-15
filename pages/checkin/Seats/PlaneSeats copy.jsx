/* eslint-disable @next/next/no-img-element */
import CabinBg from "assets/svgs/seats/cabin.svg";
import Tail from "assets/svgs/seats/base.svg";
import FullPlane from "assets/svgs/seats/plane.svg";
import { Fragment } from "react";

{
  /* <img className="h-full" src="/images/cabin.png" alt="food" /> */
}

const PlaneSeats = () => {
  return (
    <Fragment>
      <div className="plane h-auto w-auto overflow-hidden bg-red">
        <section className="cabin min-h-[1200px] relative bg-red-500">
          <figure className="h-[800px] overflow-hidden absolute  left-[50%] z-10 -translate-x-[50%]">
            {/* <CabinBg className="h-full" /> */}
            <img
              className="h-full w-[300px]"
              src="/images/cabin.png"
              alt="food"
            />
          </figure>
          <figure className="overflow-hidden absolute top-[800px] left-[50%] z-10 -translate-x-[50%]">
            {/* <Tail /> */}
            <img
              className="h-full w-[500px]"
              src="/images/base.png"
              alt="food"
            />
          </figure>

          {/* <figure className="h-[400px] overflow-hidden absolute  left-[50%] z-10 -translate-x-[50%]">
          <FullPlane className="h-full w-full" />
        </figure> */}
        </section>
      </div>
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
    </Fragment>
  );
};

export default PlaneSeats;
