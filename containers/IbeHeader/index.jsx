/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import ArrowTo from "assets/svgs/arrowto.svg";
import FlightIcon from "assets/svgs/flightcircle.svg";
import CaretLeft from "assets/svgs/caretleft.svg";
import CaretRight from "assets/svgs/caretright.svg";
import Spinner from "components/Spinner";
import useDeviceSize from "hooks/useWindowSize";

const IbeHeader = () => {
  const [width] = useDeviceSize();
  const [loading] = useState(false);
  const arr = width > 1200 ? new Array(7).fill(0) : new Array(3).fill(0);

  return (
    <section className="ibe__flight__info">
      <section className="ibe__flight__info__destination">
        <p className="mx-4">Lagos (LOS)</p>
        <figure>
          <ArrowTo />
        </figure>
        <p p className="mx-4">
          Abuja (ABV)
        </p>

        <figure className="flightCircle">
          <FlightIcon />
        </figure>
      </section>
      <section className="ibe__flight__info__dates">
        {loading ? (
          <section className="flex items-center w-full">
            <Spinner />
          </section>
        ) : (
          <section className="flex items-center w-full">
            <button className="pl-4 sm:pl-0">
              <CaretLeft />
            </button>
            <section className="flex items-center w-full mx-4">
              {arr.map((x, i) => {
                return (
                  <div
                    className={`ibe__date__item ${
                      i === arr.length - 1 ? "b-r-none" : ""
                    }`}
                  >
                    <button>
                      <h6>Sun, Jun 19</h6>
                      <p>No Flights</p>
                    </button>
                  </div>
                );
              })}
            </section>
            <button className="pr-4 sm:pr-0">
              <CaretRight />
            </button>
          </section>
        )}
      </section>
    </section>
  );
};

export default IbeHeader;
