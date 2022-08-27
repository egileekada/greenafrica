/* eslint-disable @next/next/no-img-element */
import ArrowTo from "assets/svgs/arrowto.svg";
import CaretLeft from "assets/svgs/caretleft.svg";
import CaretRight from "assets/svgs/caretright.svg";
import Spinner from "components/Spinner";
import useDeviceSize from "hooks/useWindowSize";
import FlightIcon from "assets/svgs/FlightTwo.svg";
import { useSelector } from "react-redux";
import { sessionSelector } from "redux/reducers/session";

const IbeHeader = () => {
  const [width] = useDeviceSize();
  const { lowFareAvailabilityLoading, lowFareAvailabilityResponse } =
    useSelector(sessionSelector);

  const { flightParams } = useSelector(sessionSelector);
  const arr = width > 1200 ? new Array(7).fill(0) : new Array(3).fill(0);
  

  return (
    <section className="ibe__flight__info">
      <section className="ibe__flight__info__destination">
        <p className="mx-4">{flightParams?.departureStation}</p>
        <figure>
          <ArrowTo />
        </figure>
        <p p className="mx-4">
          {flightParams?.arrivalStation}
        </p>

        <figure className="flightCircle">
          <FlightIcon />
        </figure>
      </section>
      <section className="ibe__flight__info__dates">
        {lowFareAvailabilityLoading ? (
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
                    key={i}
                    className={`ibe__date__item ${
                      i === arr.length - 1 ? "b-r-none" : ""
                    }`}
                  >
                    <button className={`${i === 3 ? "active" : ""}`}>
                      <h6>Sun, Jun 19</h6>
                      <p>{i === 3 ? "N16,501" : "No Flights"}</p>
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
