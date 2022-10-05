/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import ArrowTo from "assets/svgs/arrowto.svg";
import CaretLeft from "assets/svgs/caretleft.svg";
import CaretRight from "assets/svgs/caretright.svg";
import Spinner from "components/Spinner";
import FlightIcon from "assets/svgs/FlightTwo.svg";
import { useSelector, useDispatch } from "react-redux";

import {
  bookingSelector,
  fetchLowFareAvailability,
  fetchFlightAvailability,
  setTripParams,
  setGoTrip,
} from "redux/reducers/booking";

import { format } from "date-fns";
import isAfter from "date-fns/isAfter";
import { notification } from "antd";

const BookingIbeHeader = () => {
  const dispatch = useDispatch();

  const [dateList, setDateList] = useState([]);
  const [fareDateList, setFareDateList] = useState([]);
  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [currentFDateList, setCurrFDates] = useState([]);
  const [recurrent, setRecurrent] = useState(false);
  const [loaded, setLoaded] = useState(true);

  const {
    tripParams,
    returnParams,
    lowFareAvailabilityLoading,
    lowFareAvailabilityResponse,
  } = useSelector(bookingSelector);

  const _length = window.innerWidth > 1200 ? 7 : 3;

  var indexOfLastPost = currentPage * length;
  var indexOfFirstPost = indexOfLastPost - length;

  useEffect(() => {
    if (
      lowFareAvailabilityResponse &&
      lowFareAvailabilityResponse?.GetAvailabilityResponse
    ) {
      const _dateList =
        lowFareAvailabilityResponse?.GetAvailabilityResponse?.Schedule;

      setDateList([..._dateList]);

      const _fareDateList = [];
      _dateList.map((_dateListItem, _dl) => {
        const totalServiceCharge =
          _dateListItem?.Journeys[0]?.Segments[0]?.Fares[0]?.PaxFares[0].ServiceCharges.reduce(
            (accumulator, object) => {
              return accumulator + object.Amount;
            },
            0
          );

        let newObj = {};
        newObj.id = `${_dateListItem?.Journeys[0]?.Segments[0]?.Fares[0]?.FareSellKey}${_dl}`;
        newObj.date = _dateListItem?.DepartureDate;
        newObj.cost = totalServiceCharge;
        _fareDateList.push(newObj);
      });
      setFareDateList([..._fareDateList]);

      if (tripParams?.recurrent) {
        const _selectedDate = new Date(tripParams?.beginDate);
        let _dateIndex = _fareDateList.findIndex((object) => {
          return (
            format(new Date(object.date), "yyyy-MM-dd") ===
            format(new Date(_selectedDate), "yyyy-MM-dd")
          );
        });

        if (_dateIndex > -1) {
          let initLength = window.innerWidth > 1200 ? 7 : 3;
          let _pageNumber = Math.ceil((_dateIndex + 1) / initLength);
          let _indexOfLastPost = _pageNumber * initLength;
          let _indexOfFirstPost = _indexOfLastPost - initLength;
          setCurrFDates(
            _fareDateList.slice(_indexOfFirstPost, _indexOfLastPost)
          );
          setCurrentPage(_pageNumber);
        }
      } else {
        if (recurrent) {
          paginate(1, _fareDateList);
        } else {
          const selectedDate = new Date(tripParams?.beginDate);
          let dateIndex = _fareDateList.findIndex((object) => {
            return (
              format(new Date(object.date), "yyyy-MM-dd") ===
              format(new Date(selectedDate), "yyyy-MM-dd")
            );
          });

          if (dateIndex > -1) {
            const defaultPage = Math.ceil((dateIndex + 1) / _length);
            paginate(defaultPage, _fareDateList);
          } else {
            paginate(1, _fareDateList);
          }
        }
      }

      setLoaded(false);
    }
  }, [lowFareAvailabilityResponse]);

  const paginate = (pageNumber, _fares) => {
    indexOfLastPost = pageNumber * _length;
    indexOfFirstPost = indexOfLastPost - _length;
    setCurrFDates(_fares.slice(indexOfFirstPost, indexOfLastPost));
    setCurrentPage(pageNumber);
  };

  const onNext = () => {
    const nextPage = currentPage + 1;
    indexOfLastPost = nextPage * _length;
    indexOfFirstPost = indexOfLastPost - _length;
    const newFareList = fareDateList.slice(indexOfFirstPost, indexOfLastPost);

    if (newFareList.length > 0) {
      setCurrFDates(fareDateList.slice(indexOfFirstPost, indexOfLastPost));
      setCurrentPage(nextPage);
    } else {
      const lastDate = new Date(fareDateList[fareDateList.length - 1]?.date);

      const newFlightRequest = {
        ...tripParams,
        currentDate: lastDate,
      };
      setRecurrent(true);
      dispatch(fetchLowFareAvailability(newFlightRequest));
    }
  };

  const onPrev = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      indexOfLastPost = prevPage * _length;
      indexOfFirstPost = indexOfLastPost - _length;
      const newFareList = fareDateList.slice(indexOfFirstPost, indexOfLastPost);

      if (newFareList.length > 0) {
        setCurrFDates(fareDateList.slice(indexOfFirstPost, indexOfLastPost));
        setCurrentPage(prevPage);
      }
    }
  };

  const FetchNewTrips = (_dateItem) => {
    const _newDate = new Date(_dateItem?.date);
    const _check = isAfter(_newDate, new Date(returnParams?.returnSTD));

    if (_check) {
      notification.error({
        message: "Error",
        description:
          "You can't change date to a date later than original trip return date",
      });
    } else {
      const flightRequest = {
        ...tripParams,
        beginDate: format(_newDate, "yyyy-MM-dd"),
        endDate: format(_newDate, "yyyy-MM-dd"),
        recurrent: true,
      };
      dispatch(setGoTrip(null));
      dispatch(setTripParams(flightRequest));
      dispatch(fetchFlightAvailability(flightRequest, returnParams));
    }
  };

  return (
    <section className="ibe__flight__info">
      <section className="ibe__flight__info__destination">
        <p className="mx-4">{tripParams?.departureStation}</p>
        <figure>
          <ArrowTo />
        </figure>
        <p className="mx-4">{tripParams?.arrivalStation}</p>
        {/* {currentPage && <p> currentPage:: {currentPage}</p>}
        {width && <p> width:: {width}</p>}
        {_length && <p> _length:: {_length}</p>} */}

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
              className={`pl-4 sm:pl-0 hover:bg-gray-400 flex h-16 lg:h-4 w-8 lg:w-4 items-center justify-center`}
              onClick={onPrev}
            >
              <CaretLeft />
            </button>
            <section className="flex items-center w-full mx-4 ">
              {currentFDateList?.length > 0 ? (
                currentFDateList.map((_dateItem, i) => {
                  return (
                    <div
                      key={i}
                      className={`ibe__date__item ${
                        i === currentFDateList.length - 1 ? "b-r-none" : ""
                      }`}
                    >
                      {tripParams && (
                        <button
                          className={`${
                            format(new Date(_dateItem?.date), "yyyy-MM-dd") ===
                            format(
                              new Date(tripParams?.beginDate),
                              "yyyy-MM-dd"
                            )
                              ? "active"
                              : ""
                          }`}
                          onClick={FetchNewTrips.bind(this, _dateItem)}
                        >
                          <h6 className="text-center">
                            {format(new Date(_dateItem?.date), "ccc, MMM dd")}
                          </h6>
                          <p> ₦{_dateItem?.cost.toLocaleString()}</p>
                        </button>
                      )}
                    </div>
                  );
                })
              ) : loaded ? (
                <Spinner />
              ) : (
                <p className="errorText text-lg"> No date available</p>
              )}
            </section>

            <button
              className={`pr-4 sm:pr-0 hover:bg-gray-400 flex  h-16 lg:h-4 w-8 lg:w-4 items-center justify-center`}
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

export default BookingIbeHeader;
