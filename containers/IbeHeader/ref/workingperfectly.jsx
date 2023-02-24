/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import ArrowTo from "assets/svgs/arrowto.svg";
import CaretLeft from "assets/svgs/caretleft.svg";
import CaretRight from "assets/svgs/caretright.svg";
import Spinner from "components/Spinner";
import useDeviceSize from "hooks/useWindowSize";
import FlightIcon from "assets/svgs/FlightTwo.svg";
import { useSelector, useDispatch } from "react-redux";
import {
  sessionSelector,
  fetchLowFareAvailability,
  setFlightRequest,
  fetchFlightAvailability,
} from "redux/reducers/session";
import { format } from "date-fns";

const IbeHeader = () => {
  const dispatch = useDispatch();
  const [width] = useDeviceSize();

  const [dateList, setDateList] = useState([]); //original Response
  const [fareDateList, setFareDateList] = useState([]); //formatted Response
  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  // const [length, setLength] = useState(width > 1200 ? 7 : 3);
  const [currentFDateList, setCurrFDates] = useState([]);
  const [recurrent, setRecurrent] = useState(false);

  const {
    availabilityResponse,
    lowFareAvailabilityLoading,
    lowFareAvailabilityResponse,
    flightParams,
  } = useSelector(sessionSelector);

  // useEffect(() => {
  //   setLength(width > 1200 ? 7 : 3);
  // }, [width]);

  const _length = width > 1200 ? 7 : 3;

  var indexOfLastPost = currentPage * length;
  var indexOfFirstPost = indexOfLastPost - length;

  useEffect(() => {
    if (
      lowFareAvailabilityResponse &&
      lowFareAvailabilityResponse?.LowFareTripAvailabilityResponse
    ) {
      const _dateList =
        lowFareAvailabilityResponse?.LowFareTripAvailabilityResponse
          ?.LowFareAvailabilityResponseList[0]?.DateMarketLowFareList;

      setDateList([..._dateList]);

      const _fareDateList = [];
      _dateList.map((_dateListItem, _dl) => {
        let newObj = {};
        newObj.id = newObj.date = _dateListItem?.DepartureDate;
        newObj.date = newObj.date = _dateListItem?.DepartureDate;
        newObj.cost =
          parseInt(_dateListItem?.FareAmount) +
          parseInt(_dateListItem?.TaxesAndFeesAmount);
        _fareDateList.push(newObj);
      });
      setFareDateList([..._fareDateList]);

      if (flightParams?.recurrent) {
        const _selectedDate = new Date(flightParams?.beginDate);
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
          const selectedDate = new Date(flightParams?.beginDate);
          let dateIndex = _fareDateList.findIndex((object) => {
            return (
              format(new Date(object.date), "yyyy-MM-dd") ===
              format(new Date(selectedDate), "yyyy-MM-dd")
            );
          });

          // console.log("dateIndex", dateIndex);

          if (dateIndex > -1) {
            const defaultPage = Math.ceil((dateIndex + 1) / _length);
            paginate(defaultPage, _fareDateList);
          } else {
            paginate(1, _fareDateList);
          }
        }
      }
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
        ...flightParams,
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
    const flightRequest = {
      ...flightParams,
      beginDate: format(new Date(_dateItem?.date), "yyyy-MM-dd"),
      endDate: format(new Date(_dateItem?.date), "yyyy-MM-dd"),
      recurrent: true,
    };
    dispatch(setFlightRequest(flightRequest));
    dispatch(fetchFlightAvailability(flightRequest));
  };

  return (
    <section className="ibe__flight__info">
      <section className="ibe__flight__info__destination">
        <p className="mx-4">{flightParams?.departureStation}</p>
        <figure>
          <ArrowTo />
        </figure>
        <p className="mx-4">{flightParams?.arrivalStation}</p>
        {currentPage && <p> currentPage:: {currentPage}</p>}
        {width && <p> width:: {width}</p>}
        {_length && <p> _length:: {_length}</p>}

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
                          <h6 className="text-center">
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

            {/* pointer-events-none cursor-none */}
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

export default IbeHeader;