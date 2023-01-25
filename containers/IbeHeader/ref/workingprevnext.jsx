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
  const [width] = useDeviceSize();

  const [dateList, setDateList] = useState([]); //original Response
  const [fareDateList, setFareDateList] = useState([]); //formatted Response
  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [length, setLength] = useState(width > 1200 ? 7 : 3);
  const [currentFDateList, setCurrFDates] = useState([]);
  const [pageNumbers, setPageNumbers] = useState([]);

  const {
    lowFareAvailabilityLoading,
    lowFareAvailabilityResponse,
    flightParams,
  } = useSelector(sessionSelector);

  useEffect(() => {
    setLength(width > 1200 ? 7 : 3);
  }, [width]);

  // Get current posts
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

      const _pageNumbers = [];
      for (let i = 1; i <= Math.ceil(_dateList.length / length); i++) {
        _pageNumbers.push(i);
      }
      setPageNumbers([..._pageNumbers]);

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

      const selectedDate = new Date(flightParams?.beginDate);
      let dateIndex = _fareDateList.findIndex((object) => {
        return (
          format(new Date(object.date), "yyyy-MM-dd") ===
          format(new Date(selectedDate), "yyyy-MM-dd")
        );
      });
      // console.log("dateIndex", dateIndex);

      if (dateIndex > -1) {
        const defaultPage = Math.ceil((dateIndex + 1) / length);
        // console.log("defaultPage", defaultPage);

        paginate(defaultPage);
      } else {
        paginate(1);
      }
    }
  }, [lowFareAvailabilityResponse]);

  const paginate = (pageNumber) => {
    indexOfLastPost = pageNumber * length;
    indexOfFirstPost = indexOfLastPost - length;
    setCurrFDates(fareDateList.slice(indexOfFirstPost, indexOfLastPost));
    setCurrentPage(pageNumber);
  };

  const onNext = () => {
    const nextPage = currentPage + 1;
    indexOfLastPost = nextPage * length;
    indexOfFirstPost = indexOfLastPost - length;
    const newFareList = fareDateList.slice(indexOfFirstPost, indexOfLastPost);

    if (newFareList.length > 0) {
      setCurrFDates(fareDateList.slice(indexOfFirstPost, indexOfLastPost));
      setCurrentPage(nextPage);
    }
  };

  const onPrev = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      indexOfLastPost = prevPage * length;
      indexOfFirstPost = indexOfLastPost - length;
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
        {/* {currentPage && <p> currentPage:: {currentPage}</p>} */}

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
