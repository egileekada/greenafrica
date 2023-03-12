/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import ArrowTo from "assets/svgs/arrowto.svg";
import CaretLeft from "assets/svgs/caretleft.svg";
import CaretRight from "assets/svgs/caretright.svg";
import Spinner from "components/Spinner";
import FlightIcon from "assets/svgs/FlightTwo.svg";
import Calendar from "assets/svgs/Calendar-Date.svg";
import { useSelector, useDispatch } from "react-redux";
import {
  bookingSelector,
  returnLowFareAvailability,
  fetchFlightAvailability,
  setReturnParams,
  setReturnTrip,
} from "redux/reducers/booking";
import { format } from "date-fns";
import isBefore from "date-fns/isBefore";
import { notification } from "antd";
import { useGetLocationsQuery } from "services/widgetApi.js";

const ReturnBookingIbeHeader = () => {
  const dispatch = useDispatch();
  const { data, isLoading: locationLoading } = useGetLocationsQuery();
  const [dateList, setDateList] = useState([]);
  const [fareDateList, setFareDateList] = useState([]);
  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [currentFDateList, setCurrFDates] = useState([]);
  const [recurrent, setRecurrent] = useState(false);
  const [currentDate, setCurrentDate] = useState();

  const {
    tripParams,
    returnParams,
    returnFareAvailabilityLoading,
    returnFareAvailabilityResponse,
  } = useSelector(bookingSelector);

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

      if (returnParams?.recurrent) {
        const _selectedDate = new Date(returnParams?.returnDate);
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
          const selectedDate = new Date(returnParams?.returnDate);
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
        ...returnParams,
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
    const _newDate = new Date(_dateItem?.date);
    const _check = isBefore(_newDate, new Date(tripParams?.goStd));

    // console.log("_newDate", _newDate);
    // console.log("go departure date", new Date(tripParams?.goStd));

    if (_check) {
      notification.error({
        message: "Error",
        description:
          "You can't change date to a date that is before the original trip departure's date",
      });
    } else {
      // console.log("not isBefore");
      const flightRequest = {
        ...returnParams,
        returnDate: format(_newDate, "yyyy-MM-dd"),
        recurrent: true,
        isRoundTrip: 1,
      };

      dispatch(setReturnTrip(null));
      dispatch(setReturnParams(flightRequest));
      dispatch(fetchFlightAvailability(tripParams, flightRequest));
    }
  };

  const resolveAbbreviation = (abrreviation) => {
    if (data) {
      const [{ name, code }] = data?.data?.items.filter(
        (location) => location.code === abrreviation
      );

      return `${name} (${code})`;
    } else {
      return "";
    }
  };


  useEffect(()=>{ 
    let date = new Date(returnParams?.returnDate).toDateString().slice(3)
    setCurrentDate(date) 
  },[])

  return (
    <section
      className={`ibe__flight__info mt-20 ${
        returnParams
          ? parseInt(returnParams?.LiftStatus) !== 0
            ? "pointer-events-none opacity-50 cursor-not-allowed"
            : ""
          : ""
      } `}
      id="returnContainer"
    >
      <section className="ibe__flight__info__destination">

        <div className=" w-fit " > 
          <div className=" w-[55px] h-[55px] rounded-full bg-[#47FF5A1A] p-2 " >
            <div className=" bg-[#47FF5A] w-full h-full rotate-180 flex justify-center items-center rounded-full " >
              <FlightIcon />
            </div>
          </div>
        </div>
        <p className="mx-4">
          {returnParams?.departureStation &&
            resolveAbbreviation(returnParams?.departureStation)}
        </p>
        <figure>
          <ArrowTo />
        </figure>
        <p className="mx-4">
          {returnParams?.arrivalStation &&
            resolveAbbreviation(returnParams?.arrivalStation)}
        </p> 
        <div className=" ml-auto flex items-center " >
            <div className=" w-[36px] h-[36px] rounded-full bg-[#C9C9C930] hidden md:flex justify-center items-center " >
              <Calendar />
            </div>
            <div className=" mx-[4px] hidden md:block " >
              <p className=" !text-sm !font-black " >{(currentDate+"").toUpperCase()}</p>
              <p className=" !text-sm !font-medium !text-[#A49FDC] " >1 PASSENGER</p>
            </div>
            {/* <Setting /> */}
          </div>
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
                className={`pl-4 sm:pl-0 lg:border rounded-full flex outline-none border-[#261F5E]  h-16 lg:h-8 w-8 lg:w-8 items-center justify-center`}
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
                      {returnParams && (
                        <button
                          className={`${
                            format(new Date(_dateItem?.date), "yyyy-MM-dd") ===
                            format(
                              new Date(returnParams?.returnDate),
                              "yyyy-MM-dd"
                            )
                              ? "active w-full h-full border-b-[6px] border-[#47FF5A]  "
                              : ""
                          }`}
                          onClick={FetchNewTrips.bind(this, _dateItem)}
                        >
                          <h6 className="text-center !font-medium md:!text-[14px]">
                            {format(new Date(_dateItem?.date), "ccc, MMM dd")}
                          </h6>
                          <p className="!font-black !text-base lg:!text-[22px] " >
                            {" "}
                            ₦
                            {parseInt(_dateItem?.cost) > -1
                              ? _dateItem?.cost.toLocaleString()
                              : 0}
                          </p>
                        </button>
                      )}
                    </div>
                  );
                })
              ) : (
                <p className="errorText text-lg">No date available</p>
              )}
            </section>

            <div className=" w-fit " > 
                <button
                  className={`pr-4 sm:pr-0 hover:bg-gray-400 lg:border flex outline-none rounded-full border-[#261F5E] h-16 lg:h-8 w-8 lg:w-8 items-center justify-center`}
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

export default ReturnBookingIbeHeader;
