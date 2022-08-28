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
import addDays from "date-fns/addDays";
import subDays from "date-fns/subDays";

const IbeHeader = () => {
  const [cleanedArray, setCleanArr] = useState([]);
  const [dateList, setDateList] = useState([]);
  const [width] = useDeviceSize();

  const {
    lowFareAvailabilityLoading,
    lowFareAvailabilityResponse,
    flightParams,
  } = useSelector(sessionSelector);

  useEffect(() => {
    const _dates = [
      subDays(new Date(), 3),
      subDays(new Date(), 2),
      subDays(new Date(), 1),
      new Date(),
      addDays(new Date(), 1),
      addDays(new Date(), 2),
      addDays(new Date(), 2),
    ];
    const _dateList = [];
    _dates.map((_date) => {
      const newObj = {
        id: _date,
        date: _date,
        cost: 0,
      };
      _dateList.push(newObj);
    });
    setDateList([..._dateList]);
    if (
      lowFareAvailabilityResponse &&
      lowFareAvailabilityResponse?.LowFareTripAvailabilityResponse
    ) {
      const _dateList =
        lowFareAvailabilityResponse?.LowFareTripAvailabilityResponse
          ?.LowFareAvailabilityResponseList[0]?.DateMarketLowFareList;
      let selectedDateIndex = -1;
      const formattedArray = [];
      const length = 3;

      _dateList.map((_dateItem, _i) => {
        if (
          format(new Date(_dateItem?.DepartureDate), "yyyy-MM-dd") ===
          flightParams?.beginDate
        ) {
          selectedDateIndex = _i;
        }
      });

      formattedArray = [
        ..._dateList.slice(0, selectedDateIndex),
        _dateList[selectedDateIndex],
      ];

      setCleanArr(formattedArray);

      // console.log("jjhjh", selectedDateIndex);
      console.log("formattedArray ", formattedArray);
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
              {dateList?.length > 0 &&
                dateList.map((_dateItem, i) => {
                  return (
                    <div
                      key={i}
                      className={`ibe__date__item ${
                        i === dateList.length - 1 ? "b-r-none" : ""
                      }`}
                    >
                      <button className={`${i === 3 ? "active" : ""}`}>
                        <h6>
                          {format(new Date(_dateItem?.date), "ccc, MMM yy")}
                        </h6>
                        {_dateItem?.cost > 0 ? (
                          <p>#{_dateItem?.cost.toLocaleString()}</p>
                        ) : (
                          <p>No Flight</p>
                        )}
                      </button>
                    </div>
                  );
                })}
              {/* {cleanedArray?.length > 0 &&
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
                      <button className={`${i === 3 ? "active" : ""}`}>
                        <h6>
                          {format(
                            new Date(_dateItem?.DepartureDate),
                            "ccc, MMM yy"
                          )}
                        </h6>
                        <p>#{totalFee.toLocaleString()}</p>
                      </button>
                    </div>
                  );
                })} */}
              {/* {lowFareAvailabilityResponse?.LowFareTripAvailabilityResponse?.LowFareAvailabilityResponseList[0]?.DateMarketLowFareList.slice(
                0,
                7
              ).map((_dateItem, i) => {
                const datesArr =
                  lowFareAvailabilityResponse?.LowFareTripAvailabilityResponse
                    ?.LowFareAvailabilityResponseList[0]?.DateMarketLowFareList;

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
                    <button className={`${i === 3 ? "active" : ""}`}>
                      <h6>
                        {format(
                          new Date(_dateItem?.DepartureDate),
                          "ccc, MMM yy"
                        )}
                      </h6>
                      <p>#{totalFee.toLocaleString()}</p>
                    </button>
                  </div>
                );
              })} */}
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
