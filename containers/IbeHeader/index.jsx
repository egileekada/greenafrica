/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import ArrowTo from "assets/svgs/arrowto.svg";
import CaretLeft from "assets/svgs/caretleft.svg";
import CaretRight from "assets/svgs/caretright.svg";
import Spinner from "components/Spinner";
import useDeviceSize from "hooks/useWindowSize";
import FlightIcon from "assets/svgs/FlightThree.svg";
import Setting from "assets/svgs/setting.svg";
import Calendar from "assets/svgs/Calendar-Date.svg";
import { useSelector, useDispatch } from "react-redux";
import { generalSelector, showWidget } from "redux/reducers/general"; 
import {
  sessionSelector,
  fetchLowFareAvailability,
  setFlightRequest,
  fetchFlightAvailability,
} from "redux/reducers/session";
import { useGetLocationsQuery } from "services/widgetApi.js";
import { format } from "date-fns";

const IbeHeader = (props) => {
  const { data, isLoading } = useGetLocationsQuery();
  const dispatch = useDispatch();
  const [width] = useDeviceSize();

  const { widgetVisible } = useSelector(generalSelector); 
  const handleUser = () => {
    dispatch(showWidget());
    // window.location.assign("https://dev-website.gadevenv.com/");
  };
  const [dateList, setDateList] = useState([]); //original Response
  const [fareDateList, setFareDateList] = useState([]); //formatted Response
  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [currentFDateList, setCurrFDates] = useState([]);
  const [recurrent, setRecurrent] = useState(false);
  const [currentDate, setCurrentDate] = useState();
  const [loaded, setLoaded] = useState(true);
  const [length, setLength] = useState(width > 1200 ? 7 : 3);
  console.log(new Date(flightParams?.beginDate).toDateString().slice(3));
  const {
    lowFareAvailabilityLoading,
    lowFareAvailabilityResponse,
    flightParams,
  } = useSelector(sessionSelector);

  const _length = window.innerWidth > 1200 ? 7 : 3;

  var indexOfLastPost = currentPage * length;
  var indexOfFirstPost = indexOfLastPost - length;


  useEffect(() => {
    setLength(width > 1200 ? 7 : 3);
  }, [width]);

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

          if (dateIndex > -1) {
            const defaultPage = Math.ceil((dateIndex + 1) / _length);
            paginate(defaultPage, _fareDateList);
          } else {
            paginate(1, _fareDateList);
          }
        }
      }

      setLoaded(false);
    } else {
      // console.log("mot avvvv");
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

  const resolveAbbreviation = (abrreviation) => {
    const [{ name, code }] = data?.data?.items.filter(
      (location) => location.code === abrreviation
    );

    return `${name} (${code})`;
  }; 

  useEffect(()=>{

    let date = new Date(flightParams?.beginDate).toDateString().slice(3)
    setCurrentDate(date) 
  },[])

  return (
    <section className="ibe__flight__info !rounded-md ">
      {!isLoading && (
        <section className=" rounded-none ibe__flight__info__destination">
          <div className=" w-fit " > 
            <div className=" w-[55px] h-[55px] rounded-full bg-[#47FF5A1A] p-2 " >
              <div className=" bg-[#47FF5A] w-full h-full flex justify-center items-center rounded-full " >
                <FlightIcon />
              </div>
            </div>
          </div>
          <p className="mx-4">
            {resolveAbbreviation(flightParams?.departureStation)}
          </p>
          <figure>
            <ArrowTo />
          </figure>
          <p className="mx-4">
            {resolveAbbreviation(flightParams?.arrivalStation)}
          </p> 
          <button onClick={()=> handleUser()} className=" text-sm h-[24px] w-[75px] rounded-[30px] hidden md:block border border-white ml-3 text-white " >Change</button>
          <div className=" ml-auto flex items-center " >
            <div className=" w-[36px] h-[36px] rounded-full bg-[#C9C9C930] hidden md:flex justify-center items-center " >
              <Calendar />
            </div>
            <div className=" mx-[4px] hidden md:block " >
              <p className=" !text-sm !font-black " >{(currentDate+"").toUpperCase()}</p>
              <p className=" !text-sm !font-medium !text-[#A49FDC] " >1 PASSENGER</p>
            </div>
            <Setting />
          </div>
        </section>
      )}

      <section className="ibe__flight__info__dates ">
        {lowFareAvailabilityLoading ? (
          <section className="flex items-center w-full">
            <div className="mx-auto">
              <Spinner />
            </div>
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
            <section className="flex items-center w-full mx-0 md:mx-4 ">
              {currentFDateList?.length > 0 ? (
                currentFDateList.map((_dateItem, i) => {
                  // if(format(new Date(_dateItem?.date), "yyyy-MM-dd") === format(new Date(flightParams?.beginDate))){

                  // }
                  if(i === 0){
                  }
                  return (
                    <div
                      key={i}
                      className={`ibe__date__item ${
                        i === currentFDateList.length - 1 ? "b-r-none" : "  "
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
                              ? "active w-full h-full border-b-[6px] border-[#47FF5A]  "
                              : ""
                          }`}
                          onClick={FetchNewTrips.bind(this, _dateItem)}
                        >
                          <h6 className="text-center !font-medium md:!text-[14px]">
                            {format(new Date(_dateItem?.date), "ccc, MMM dd")}
                          </h6>
                          {_dateItem?.cost > 0 ? (
                            <p className=" !font-black !text-base lg:!text-[22px] " > ₦{_dateItem?.cost.toLocaleString()}</p>
                          ) : (
                            <p className=" !font-bold !text-sm lg:!text-2xl ">No Flight</p>
                          )}
                        </button>
                      )}
                    </div>
                  );
                })
              ) : loaded ? (
                <>
                  <div className="mx-auto">
                    <Spinner />
                  </div>
                </>
              ) : (
                <p className="errorText text-lg"> No date available</p>
              )}
            </section>

            {/* pointer-events-none cursor-none */}
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

export default IbeHeader;
