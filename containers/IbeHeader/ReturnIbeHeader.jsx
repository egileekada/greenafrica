/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import ArrowTo from "assets/svgs/arrowto.svg";
import CaretLeft from "assets/svgs/caretleft.svg";
import CaretRight from "assets/svgs/caretright.svg";
import Spinner from "components/Spinner";
import useDeviceSize from "hooks/useWindowSize";
import FlightIcon from "assets/svgs/FlightThree.svg";
import { useSelector, useDispatch } from "react-redux";
import {
  sessionSelector,
  returnLowFareAvailability,
  setFlightRequest,
  fetchFlightAvailability,
} from "redux/reducers/session";
import { format } from "date-fns";

import { useGetLocationsQuery } from "services/widgetApi.js";

const ReturnIbeHeader = () => {
  const { data, isLoading } = useGetLocationsQuery();
  const dispatch = useDispatch();
  const [width] = useDeviceSize();

  const [dateList, setDateList] = useState([]); //original Response
  const [fareDateList, setFareDateList] = useState([]); //formatted Response
  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [currentFDateList, setCurrFDates] = useState([]);
  const [recurrent, setRecurrent] = useState(false);

  const {
    returnFareAvailabilityLoading,
    returnFareAvailabilityResponse,
    flightParams,
  } = useSelector(sessionSelector);

  const _length = window.innerWidth > 1200 ? 7 : 3;

  var indexOfLastPost = currentPage * length;
  var indexOfFirstPost = indexOfLastPost - length;

  useEffect(() => {
    if (
      returnFareAvailabilityResponse &&
      returnFareAvailabilityResponse?.GetAvailabilityResponse
    ) {
      const _dateList =
        returnFareAvailabilityResponse?.GetAvailabilityResponse?.Schedule;
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
      // console.log("list", _fareDateList);

      if (flightParams?.recurrent) {
        const _selectedDate = new Date(flightParams?.returnDate);
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
          const selectedDate = new Date(flightParams?.returnDate);
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
    }
  }, [returnFareAvailabilityResponse]);

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
      dispatch(returnLowFareAvailability(newFlightRequest));
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
      returnDate: format(new Date(_dateItem?.date), "yyyy-MM-dd"),
      recurrent: true,
      isRoundTrip: 1,
    };
    dispatch(setFlightRequest(flightRequest));
    dispatch(fetchFlightAvailability(flightRequest));
  };

  const resolveAbbreviation = (abrreviation) => {
    const [{ name, code }] = data?.data?.items.filter(
      (location) => location.code === abrreviation
    );

    return `${name} (${code})`;
  };

  return (
    <section className="ibe__flight__info mt-20" id="returnContainer">
      <section className="ibe__flight__info__destination">
        <div className=" w-fit " > 
          <div className=" w-[55px] h-[55px] rounded-full bg-[#47FF5A1A] p-2 " >
            <div className=" bg-[#47FF5A] rotate-180 w-full h-full flex justify-center items-center rounded-full " >
              <FlightIcon />
            </div>
          </div>
        </div>
        <p className="mx-4">
          {!isLoading && resolveAbbreviation(flightParams?.arrivalStation)}
        </p>
        <figure>
          <ArrowTo />
        </figure>
        <p className="mx-4">
          {!isLoading && resolveAbbreviation(flightParams?.departureStation)}
        </p>

        {/* {currentPage && <p> currentPage:: {currentPage}</p>} */}

        {/* <figure className="flightCircle">
          <FlightIcon />
        </figure> */}
      </section>
      <section className="ibe__flight__info__dates">
        {returnFareAvailabilityLoading ? (
          <section className="flex items-center w-full">
            <Spinner />
          </section>
        ) : (
          <section className="flex items-center w-full">
            <div className=" lg:w-fit " > 
              <button
                className={`pl-4 sm:pl-0 lg:border flex rounded-full outline-none border-[#261F5E]  h-16 lg:h-8 w-8 lg:w-8 items-center justify-center`}
                onClick={onPrev}
              >
                <CaretLeft />
              </button>
            </div>
            <section className="flex items-center w-full mx-0 md:mx-4">
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
                              new Date(flightParams?.returnDate),
                              "yyyy-MM-dd"
                            )
                              ? "active w-full h-full border-b-[6px] border-[#47FF5A] "
                              : ""
                          }`}
                          onClick={FetchNewTrips.bind(this, _dateItem)}
                        >
                          <h6 className="text-center !font-medium md:!text-[14px]">
                            {format(new Date(_dateItem?.date), "ccc, MMM dd")}
                          </h6>
                          {_dateItem?.cost > 0 ? (
                            <p className="  !font-black !text-base lg:!text-[22px] " > ₦{_dateItem?.cost.toLocaleString()}</p>
                          ) : (
                            <p className=" !font-bold !text-sm !lg:text-2xl ">No Flight</p>
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

            <div className=" lg:w-fit " > 
              <button
                className={`pr-4 lg:pl-0 pl-1 sm:pr-0 hover:bg-gray-400 outline-none lg:border rounded-full border-[#261F5E] flex h-16 lg:h-8 w-8 lg:w-8 items-center justify-center`}
                onClick={onNext}
              >
                <CaretRight />
              </button>
            </div>
          </section>
        )}
      </section>
    </section>
  );
};

export default ReturnIbeHeader;
