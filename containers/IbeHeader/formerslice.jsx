/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import ArrowTo from "assets/svgs/arrowto.svg";
import CaretLeft from "assets/svgs/caretleft.svg";
import CaretRight from "assets/svgs/caretright.svg";
import Spinner from "components/Spinner";
import useDeviceSize from "hooks/useWindowSize";
import FlightIcon from "assets/svgs/FlightTwo.svg";
import { useSelector } from "react-redux";
import { sessionSelector } from "redux/reducers/session";
import { format } from "date-fns";


const IbeHeader = () => {
  const [cleanedArray, setCleanArr] = useState([]);
  const [width] = useDeviceSize();

  const {
    lowFareAvailabilityLoading,
    lowFareAvailabilityResponse,
    flightParams,
  } = useSelector(sessionSelector);

  useEffect(() => {
    if (
      lowFareAvailabilityResponse &&
      lowFareAvailabilityResponse?.LowFareTripAvailabilityResponse
    ) {
      const _dateList =
        lowFareAvailabilityResponse?.LowFareTripAvailabilityResponse
          ?.LowFareAvailabilityResponseList[0]?.DateMarketLowFareList;
      const formattedArray = [];

      formattedArray = [..._dateList.slice(0, 7)];

      setCleanArr(formattedArray);
    }
  }, [lowFareAvailabilityResponse]);

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
            <section className="flex items-center w-full mx-4 ">
              {cleanedArray?.length > 0 &&
                cleanedArray.map((_dateItem, i) => {
                  const datesArr =
                    lowFareAvailabilityResponse?.LowFareTripAvailabilityResponse
                      ?.LowFareAvailabilityResponseList[0]
                      ?.DateMarketLowFareList;

                  const totalFee =
                    parseInt(_dateItem?.FareAmount) +
                    parseInt(_dateItem?.TaxesAndFeesAmount);

                  return (
                    <div
                      key={i}
                      className={`ibe__date__item ${
                        i === datesArr.length - 1 ? "b-r-none" : ""
                      }`}
                    >
                      {/* <button className={`${i === 3 ? "active" : ""}`}> */}
                      <button
                        className={`${
                          format(
                            new Date(_dateItem?.DepartureDate),
                            "yyyy-MM-dd"
                          ) ===
                          format(
                            new Date(flightParams?.beginDate),
                            "yyyy-MM-dd"
                          )
                            ? "active"
                            : ""
                        }`}
                      >
                        <h6>
                          {format(
                            new Date(_dateItem?.DepartureDate),
                            "ccc, MMM yy"
                          )}
                        </h6>
                        {totalFee > 0 ? (
                          <p>#{totalFee.toLocaleString()}</p>
                        ) : (
                          <p>No Flights</p>
                        )}
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
