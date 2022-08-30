/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import ArrowTo from "assets/svgs/arrowto.svg";
import CaretLeft from "assets/svgs/caretleft.svg";
import CaretRight from "assets/svgs/caretright.svg";
import Spinner from "components/Spinner";
import useDeviceSize from "hooks/useWindowSize";
import FlightIcon from "assets/svgs/FlightTwo.svg";
import { useSelector, useDispatch } from "react-redux";
import { sessionSelector, setFlightRequest } from "redux/reducers/session";
import { format } from "date-fns";
import addDays from "date-fns/addDays";
import subDays from "date-fns/subDays";

const IbeHeader = () => {
  const dispatch = useDispatch();
  const [dateList, setDateList] = useState([]);
  const [fareDateList, setFareDateList] = useState([]);
  const [nextIndex, setNextIndex] = useState(null);
  const [prev, setPrev] = useState(null);
  const [width] = useDeviceSize();
  const [length, setLength] = useState(width > 1200 ? 7 : 3);

  const {
    lowFareAvailabilityLoading,
    lowFareAvailabilityResponse,
    flightParams,
  } = useSelector(sessionSelector);

  useEffect(() => {
    const selectedDate = new Date(flightParams?.beginDate);
    const _dates =
      width > 1200
        ? [
            subDays(selectedDate, 3),
            subDays(selectedDate, 2),
            subDays(selectedDate, 1),
            selectedDate,
            addDays(selectedDate, 1),
            addDays(selectedDate, 2),
            addDays(selectedDate, 2),
          ]
        : [subDays(selectedDate, 1), selectedDate, addDays(selectedDate, 1)];
    const _dateList = [];
    _dates.map((_date) => {
      const newObj = {
        id: _date,
        date: _date,
        cost: 0,
      };
      _dateList.push(newObj);
    });
    if (
      lowFareAvailabilityResponse &&
      lowFareAvailabilityResponse?.LowFareTripAvailabilityResponse
    ) {
      const _fareDateList =
        lowFareAvailabilityResponse?.LowFareTripAvailabilityResponse
          ?.LowFareAvailabilityResponseList[0]?.DateMarketLowFareList;
      setFareDateList([..._fareDateList]);

      _dateList.map((_dateListItem, _dl) => {
        _fareDateList.map((_fareDateItem, _fd) => {
          if (
            format(new Date(_dateListItem?.date), "yyyy-MM-dd") ===
            format(new Date(_fareDateItem?.DepartureDate), "yyyy-MM-dd")
          ) {
            _dateList[_dl].cost =
              _fareDateItem?.FareAmount + _fareDateItem?.TaxesAndFeesAmount;
            setNextIndex(_fd);
          }
        });
      });
      setDateList([..._dateList]);
    }
  }, [lowFareAvailabilityResponse]);

  const arr = width > 1200 ? new Array(7).fill(0) : new Array(3).fill(0);

  const onNext = () => {
    setPrev([...dateList]);
    const nextDates = [...fareDateList.slice(nextIndex + 1)];
    const nextFares = [];
    if (nextDates.length > 0) {
      nextDates.slice(0, 7).map((_fareDateItem, _fd) => {
        const newObj = {};
        newObj.id = _fareDateItem?.DepartureDate;
        newObj.date = _fareDateItem?.DepartureDate;
        newObj.cost =
          _fareDateItem?.FareAmount + _fareDateItem?.TaxesAndFeesAmount;
        nextFares.push(newObj);
      });
      setNextIndex(nextIndex + 7);
      setDateList([...nextFares]);
    }
  };

  const onPrev = () => {
    setDateList(prev);
    // setPrev(nextIndex - 7);
    // const prevDates = [...fareDateList.slice(0,nextIndex - 7)];
    // console.log("prevDates", prevDates);
  };

  const FetchNewTrips = (_dateItem) => {
    const flightRequest = {
      ...flightParams,
      beginDate: format(new Date(_dateItem?.date), "yyyy-MM-dd"),
      endDate: format(new Date(_dateItem?.date), "yyyy-MM-dd"),
    };
    dispatch(setFlightRequest(flightRequest));
  };

  return (
    <section className="ibe__flight__info">
      <section className="ibe__flight__info__destination">
        <p className="mx-4">{flightParams?.departureStation}</p>
        <figure>
          <ArrowTo />
        </figure>
        <p className="mx-4">{flightParams?.arrivalStation}</p>
        {/* {nextIndex && <p> nextIndex:: {nextIndex}</p>} */}

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
            <button
              className={`pl-4 sm:pl-0 hover:bg-gray-400 flex h-4 w-4 items-center justify-center ${
                prev ? "" : "pointer-events-none cursor-none"
              }`}
              onClick={onPrev}
            >
              <CaretLeft />
            </button>
            <section className="flex items-center w-full mx-4 ">
              {dateList?.length > 0 ? (
                dateList.map((_dateItem, i) => {
                  return (
                    <div
                      key={i}
                      className={`ibe__date__item ${
                        i === dateList.length - 1 ? "b-r-none" : ""
                      }`}
                    >
                      {flightParams && (
                        <button
                          className={`${
                            format(new Date(_dateItem?.date), "yyyy-MM-dd") ===
                            format(
                              new Date(flightParams?.beginDate),
                              "yyyy-MM-dd"
                            )
                              ? "active"
                              : ""
                          }`}
                          onClick={FetchNewTrips.bind(this, _dateItem)}
                        >
                          <h6>
                            {format(new Date(_dateItem?.date), "ccc, MMM dd")}
                          </h6>
                          {_dateItem?.cost > 0 ? (
                            <p> ₦{_dateItem?.cost.toLocaleString()}</p>
                          ) : (
                            <p>No Flight</p>
                          )}
                        </button>
                      )}
                    </div>
                  );
                })
              ) : (
                <p className="errorText text-lg">No date available</p>
              )}
            </section>
            <button
              className={`pr-4 sm:pr-0 hover:bg-gray-400 flex h-4 w-4 items-center justify-center ${
                nextIndex ? "" : "pointer-events-none cursor-none"
              }`}
              onClick={onNext}
            >
              <CaretRight />
            </button>
          </section>
        )}
      </section>
    </section>
  );
};

export default IbeHeader;
