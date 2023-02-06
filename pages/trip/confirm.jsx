/* eslint-disable @next/next/no-img-element */
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import BaseLayout from "layouts/Base";
import FlightIcon from "assets/svgs/FlightTwo.svg";
import AeroTwoIcon from "assets/svgs/aerotwo.svg";
import DottedLine from "assets/svgs/dotted-line.svg";
import Fare from "containers/IbeSummary/Fare";
import SummaryDetails from "containers/IbeSummary/SummaryDetails";
import { useDispatch, useSelector } from "react-redux";
import {
  GetBookingDetails,
  setSelectedSessionFare,
  setSelectedSessionJourney,
  sessionSelector,
} from "redux/reducers/session";
import { format, differenceInMinutes } from "date-fns";
import { timeConvert } from "utils/common";
import IbeAdbar from "containers/IbeAdbar";
import { encryptPnr } from "lib/utils";
import ReactToPrint from "react-to-print";
import { useRouter } from "next/router";
import LogoIcon from "assets/svgs/logo.svg";
import {
  useGetLocationsQuery,
  useGetProductsQuery,
} from "services/widgetApi.js";
import SkeletonLoader from "components/SkeletonLoader";

const TripConfirm = () => {
  const router = useRouter();
  const { data, isLoading: locationLoading } = useGetLocationsQuery();
  const { data: products, isLoading: productsLoading } = useGetProductsQuery();
  let componentRef = useRef();
  const dispatch = useDispatch();
  // const [segmentInfo, setSegmentInfo] = useState(null);
  const [isRoundTrip, setIsRoundTrip] = useState(false);

  const { bookingResponseLoading, bookingResponse, signature } =
    useSelector(sessionSelector);

  const ScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    ScrollToTop();
  }, []);

  // Don't re work - it currently breaks code
  useEffect(() => {
    async function fetchBookingDetails() {
      dispatch(GetBookingDetails());
    }
    fetchBookingDetails();
  }, []);

  useEffect(() => {
    if (bookingResponse) {
      bookingResponse?.Booking?.Journeys.length > 1 && setIsRoundTrip(true);
    }
  }, [bookingResponse]);

  useEffect(() => {
    async function resetSelectedJourneys() {
      dispatch(setSelectedSessionFare(null));
      dispatch(setSelectedSessionJourney(null));
    }
    resetSelectedJourneys();
  }, []);
  const [isCopied, setCopied] = useState("")

  const copyHandler =(item)=> {
    navigator.clipboard.writeText(item) 
    setCopied("Copied!")
    const timer = setTimeout(() => { 
      setCopied("")
    }, 1000);
    // clearTimeout(timer); 
  }

  const goBackToHome = () => {
    window.location.assign("https://dev-website.gadevenv.com/");
  };

  const resolveAbbreviation = (abrreviation) => {
    const [{ name, code }] = data?.data?.items.filter(
      (location) => location.code === abrreviation
    );

    return `${name} (${code})`;
  };

  const fare_name = (value) => {
    const [{ name }] = products?.data?.items.filter(
      (product) => product.code === value
    );
    return `${name}`;
  };

  const WelcomeNote = () => {
    return (
      <div className="mb-8 mt-16 xlg:mt-0">
        <h2 className="text-black font-bold text-2xl mb-4">
          Booking Confirmed
        </h2>
        <p>
          Thank you for booking your travel wIth Green Africa. Below is a
          summary of your trip, We’ve also sent a copy of your booking
          confirmation to your email address.{" "}
        </p>
      </div>
    );
  };

  const TripHeader = () => {
    return ( 
      <section className="bg-[#26205e] pt-10 lg:pt-5 pb-10 text-white justify-between flex lg:items-center relative px-4 ">
        <div className=" flex items-center " >
          <figure className="flightCircle">
            <FlightIcon />
          </figure>
          <div className=" ml-3 " >
            <p className=" font-bold text-2xl  " >Booking Confirmed</p>
            <p className=" font-medium lg:block hidden text-[14px] " >Kindly confirm  that the information below is correct before checking in</p> 

            <div className=" lg:hidden  " >
              <p className=" font-bold " >Booking Code: {bookingResponse?.Booking?.RecordLocator}</p> 
              <button onClick={()=> copyHandler(bookingResponse?.Booking?.RecordLocator)} className=" flex items-center mt-1 " >
                <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.9922 8.29285H21.0208V22.1786H10.9922V8.29285Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M10.9958 19.0929H6.36719V5.20715H16.3958V7.90715" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <p className=" text-[14px] ml-2 " >{isCopied? isCopied: "Copy Code"}</p>
              </button>
            </div>
          </div>
        </div>
        <svg className=" lg:hidden mt-5 " width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path opacity="0.4" d="M5.29688 4.446C5.29688 1.995 7.35667 0 9.88831 0H14.9206C17.4461 0 19.5007 1.99 19.5007 4.436V15.552C19.5007 18.004 17.4419 20 14.9103 20H9.87798C7.35254 20 5.29688 18.009 5.29688 15.562V14.622V4.446Z" fill="white"/>
          <path d="M14.0374 9.45382L11.0695 6.54482C10.7627 6.24482 10.2691 6.24482 9.96338 6.54682C9.65867 6.84882 9.65968 7.33582 9.96541 7.63582L11.5905 9.22882H1.2821C0.85042 9.22882 0.5 9.57382 0.5 9.99982C0.5 10.4248 0.85042 10.7688 1.2821 10.7688H11.5905L9.96541 12.3628C9.65968 12.6628 9.65867 13.1498 9.96338 13.4518C10.1168 13.6028 10.3168 13.6788 10.518 13.6788C10.717 13.6788 10.9171 13.6028 11.0695 13.4538L14.0374 10.5448C14.1847 10.3998 14.268 10.2038 14.268 9.99982C14.268 9.79482 14.1847 9.59882 14.0374 9.45382Z" fill="white"/>
        </svg>
        <div className=" hidden lg:flex flex-col items-end " >
          <p className=" font-bold " >Booking Code: {bookingResponse?.Booking?.RecordLocator}</p> 
          <button onClick={()=> copyHandler(bookingResponse?.Booking?.RecordLocator)} className=" flex items-center mt-1 " >
            <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.9922 8.29285H21.0208V22.1786H10.9922V8.29285Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M10.9958 19.0929H6.36719V5.20715H16.3958V7.90715" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <p className=" text-[14px] ml-2 " >{isCopied? isCopied: "Copy Code"}</p>
          </button>
        </div>
      </section>
      // <section className="ibe__flight__info__destination">
      //   <p>Booking Code: {bookingResponse?.Booking?.RecordLocator}</p>
      //   <figure className="flightCircle">
      //     <FlightIcon />
      //   </figure>
      // </section>
    );
  };

  const TicketCTA = () => {
    return (
      <div className="flex flex-wrap md:flex-nowrap justify-between px-6 lg:px-12 py-6 lg:py-8">
        <div className="basis-full md:basis-auto mb-4 md:mb-0 flex flex-col">
          <h2 className="trip-title mb-3">FLIGHT SUMMARY</h2>
        </div>

        {/* <button
          className="basis-full md:basis-auto btn btn-outline"
          onClick={() => print()}
        >
          Download Ticket
        </button> */}
      </div>
    );
  };

  const Journeys = () => {
    return (
      <>
        {bookingResponse?.Booking?.Journeys.map((_journey, _journeyIndex) => {
          return (
            <section className="basis-full md:basis-[48%] relative">
              <p className="bg-primary-main text-green text-xs font-semibold py-1 px-4 rounded-[4px] absolute left-6 top-[50px]">
                {!productsLoading &&
                  fare_name(_journey?.Segments[0].Fares[0].ProductClass)}
              </p>
              {_journey?.Segments.map((_segment) => {
                return (
                  <p className="text-primary-main font-body font-medium mb-4">
                    {_journeyIndex === 0 ? "Departing" : "Returning"} on &nbsp;
                    <span className=" font-bold " >{format(new Date(_segment?.STD), "MMM dd, yyyy")}</span>
                  </p>
                );
              })}

              <section className="ibe__trip__item summaryView !flex-col bordered mb-9 !px-0 !pb-0 ">
                <div className="basis-full flex flex-col  min-h-[54px] mb-6 !px-3 md:!px-6 !lg-px-10">
                  {_journey?.Segments.map((_segment) => {
                    return (
                      <p className="tripType self-center">
                        {_segment.FlightDesignator.CarrierCode}{" "}
                        {_segment.FlightDesignator.FlightNumber}
                      </p>
                    );
                  })}
                  <div className="flex justify-between mt-4 items-center">
                    <div className="flex flex-col">
                      {_journey?.Segments.map((_segment) => {
                        return (
                          <h5 className="font-extrabold font-header text-xl lg:text-2xl text-primary-main text-left">
                            {format(new Date(_segment?.STD), "HH:mm")}
                          </h5>
                        );
                      })}

                      {_journey?.Segments.map((_segment) => {
                        return (
                          <p className="tripCity right-left">
                            {!locationLoading &&
                              resolveAbbreviation(_segment?.DepartureStation)}
                          </p>
                        );
                      })}
                    </div>
                    <div className="">
                      <svg
                        className="w-full mx-auto"
                        height="22"
                        viewBox="0 0 245 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <line
                          x1="-0.000309132"
                          y1="10.5618"
                          x2="99.9997"
                          y2="10.4999"
                          stroke="#9E9BBF"
                          stroke-opacity="0.3"
                          stroke-dasharray="2 2"
                        />
                        <line
                          x1="145"
                          y1="10.5"
                          x2="245"
                          y2="10.5"
                          stroke="#9E9BBF"
                          stroke-opacity="0.3"
                          stroke-dasharray="2 2"
                        />
                        <path
                          d="M130.149 11.731L130.15 11.709C130.206 10.6126 128.862 10.2909 128.862 10.2909L126.507 9.59643L125.521 6.94898C126.026 6.8646 126.402 6.55187 126.43 6.14002C126.466 5.60657 125.904 5.10922 125.175 5.02914C125.047 5.01513 124.923 5.01511 124.805 5.02697L124.048 2.99418L122.728 2.68608L123.875 9.37227L119.69 9.51318L118.883 7.2923L118.291 7.22667L117.865 13.5617L118.457 13.626L119.549 11.6137L123.654 12.6651L121.632 19.0033L122.973 18.9874L123.99 17.1495C124.105 17.187 124.227 17.214 124.355 17.228C125.084 17.3081 125.704 16.9406 125.74 16.4072C125.768 15.9953 125.439 15.6051 124.952 15.4117L126.277 13.0181L128.69 12.8473C128.69 12.8473 130.057 12.8234 130.149 11.731Z"
                          fill="#9E9BBF"
                        />
                      </svg>
                    </div>
                    <div className="flex flex-col  items-end">
                      {_journey?.Segments.map((_segment) => {
                        return (
                          <h5 className="font-extrabold font-header text-xl lg:text-2xl text-primary-main text-left">
                            {format(new Date(_segment?.STA), "HH:mm")}
                          </h5>
                        );
                      })}

                      {_journey?.Segments.map((_segment) => {
                        return (
                          <p className="tripCity right-text">
                            {!locationLoading &&
                              resolveAbbreviation(_segment?.ArrivalStation)}
                          </p>
                        );
                      })}
                    </div>
                  </div>

                  {_journey?.Segments.map((_segment) => {
                    return (
                      <p className="tripTime self-center">
                        {timeConvert(
                          differenceInMinutes(
                            new Date(_segment?.STA),
                            new Date(_segment?.STD)
                          )
                        )}
                      </p>
                    );
                  })}
                </div>
                {bookingResponse?.Booking?.Journeys.length -1 === _journeyIndex &&
                  <div className=" w-full bg-[#F3F3F7] py-2 rounded-b-md " > 
                    <section className="flex flex-wrap md:flex-nowrap items-center px-6">
                        <Link
                          href={`/bookings/home?bookingId=${encryptPnr(
                            bookingResponse?.Booking?.RecordLocator
                          )}`}
                        >
                          <a className="basis-full md:basis-auto h-[55px] justify-center font-bold tab:basis-auto flex items-center btn btn-primary mr-0 md:mr-2 mb-4 md:mb-0 text-center"> 
                            <svg className=" mr-2 fill-current " width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M17.5187 10.98C17.5587 10.66 17.5887 10.34 17.5887 10C17.5887 9.66 17.5587 9.34 17.5187 9.02L19.6287 7.37C19.8187 7.22 19.8687 6.95 19.7487 6.73L17.7487 3.27C17.6287 3.05 17.3587 2.97 17.1387 3.05L14.6487 4.05C14.1287 3.65 13.5687 3.32 12.9587 3.07L12.5787 0.42C12.5487 0.18 12.3387 0 12.0887 0H8.08871C7.83871 0 7.62871 0.18 7.59871 0.42L7.21871 3.07C6.60871 3.32 6.04871 3.66 5.52871 4.05L3.03871 3.05C2.80871 2.96 2.54871 3.05 2.42871 3.27L0.428707 6.73C0.298707 6.95 0.358707 7.22 0.548707 7.37L2.65871 9.02C2.61871 9.34 2.58871 9.67 2.58871 10C2.58871 10.33 2.61871 10.66 2.65871 10.98L0.548707 12.63C0.358707 12.78 0.308707 13.05 0.428707 13.27L2.42871 16.73C2.54871 16.95 2.81871 17.03 3.03871 16.95L5.52871 15.95C6.04871 16.35 6.60871 16.68 7.21871 16.93L7.59871 19.58C7.62871 19.82 7.83871 20 8.08871 20H12.0887C12.3387 20 12.5487 19.82 12.5787 19.58L12.9587 16.93C13.5687 16.68 14.1287 16.34 14.6487 15.95L17.1387 16.95C17.3687 17.04 17.6287 16.95 17.7487 16.73L19.7487 13.27C19.8687 13.05 19.8187 12.78 19.6287 12.63L17.5187 10.98ZM10.0887 13.5C8.15871 13.5 6.58871 11.93 6.58871 10C6.58871 8.07 8.15871 6.5 10.0887 6.5C12.0187 6.5 13.5887 8.07 13.5887 10C13.5887 11.93 12.0187 13.5 10.0887 13.5Z" />
                            </svg>
                            Manage Booking
                          </a>
                        </Link>
                        <Link
                          href={`/checkin/home?bookingId=${encryptPnr(
                            bookingResponse?.Booking?.RecordLocator
                          )}`}
                        >
                          <a className="`basis-full md:basis-auto  h-[55px] btn btn-outline font-semibold flex justify-center items-center mb-3 md:mb-0 md:mr-3 text-center ">
                            <svg className=" mr-2 fill-current " width="22" height="24" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M10.4941 10.0364L7.806 7.69309C7.58864 7.5678 7.21936 7.5678 7.00172 7.69309C6.78455 7.81839 6.54891 8.05038 6.54891 8.30148V9.559L0.28125 10.6678L6.54891 11.7765V12.9878C6.54891 13.2389 6.78455 13.4709 7.00172 13.5962C7.21936 13.722 7.56427 13.722 7.78153 13.5962L10.482 11.2533C10.6995 11.128 10.8393 10.8955 10.8393 10.6449C10.8393 10.3937 10.7116 10.1617 10.4941 10.0364Z"/>
                              <path d="M6.7813 6.50853L8.4823 7.18095V1.8845H17.635L13.5835 4.08026C13.5835 4.08026 13.0267 4.32776 12.903 4.51325C12.7793 4.69897 12.7793 4.9152 12.7793 5.7814V18.152H8.48225V14.1545L6.78125 14.827V19.0181C6.78125 19.0181 6.84317 19.8219 7.86373 19.8219H12.7793V22.8838C12.7793 22.8838 12.8413 24.1825 13.9545 23.7495L21.0369 19.8219C21.0369 19.8219 21.6861 19.6365 21.6861 18.7395V1.08045C21.6861 1.08045 21.6861 0.183733 20.5729 0.183733H8.08034C8.08034 0.183733 6.7813 -0.0638139 6.7813 1.11153V6.50853Z"/>
                            </svg>
                            Check In
                          </a>
                        </Link>
                        <button
                          className="basis-full md:basis-auto h-[55px] tab:basis-auto btn btn-outline mr-2 flex justify-center items-center  md:mr-2 mt-4 md:mt-0"
                          onClick={goBackToHome}
                        >
                          <svg className=" mr-2 fill-current " width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.31561 18.7821V15.7152C7.31559 14.9381 7.94755 14.3067 8.73031 14.3018H11.6045C12.3907 14.3018 13.0281 14.9346 13.0281 15.7152V18.7732C13.0281 19.4473 13.5759 19.9951 14.2548 20H16.2157C17.1315 20.0023 18.0106 19.6428 18.659 19.0007C19.3075 18.3586 19.6719 17.4868 19.6719 16.5775V7.86585C19.6719 7.13139 19.3439 6.43471 18.7765 5.9635L12.1149 0.674268C10.9504 -0.250877 9.28725 -0.220992 8.15727 0.745384L1.63889 5.9635C1.04462 6.42082 0.689427 7.11956 0.671875 7.86585V16.5686C0.671875 18.4637 2.21926 20 4.12805 20H6.04417C6.37105 20.0023 6.68536 19.8751 6.91735 19.6464C7.14933 19.4178 7.2798 19.1067 7.27979 18.7821H7.31561Z"/>
                          </svg>
                          Back to Home
                        </button>
                      </section>
                  </div>
                }
              </section>
            </section>
          );
        })}
      </>
    );
  };

  const PassengeAndFare = ({ isRoundTrip }) => {
    return (
      <section className="flex flex-col px-6 lg:px-12 mb-4">
        <div className="basis-full  mb-12 md:mb-0">
          <SummaryDetails isRoundTrip={isRoundTrip} />
        </div>
        <div className="basis-full ">
          <Fare isRoundTrip={isRoundTrip} />
        </div>
      </section>
    );
  };

  return (
    <BaseLayout>
      <nav className="top__bar logo-holder">
        <button onClick={goBackToHome}>
          <figure className="cursor-pointer">
            <LogoIcon />
          </figure>
        </button>
      </nav>
      <section className="w-full">
        {bookingResponseLoading ? (
          <section className="py-32 lg:py-12 px-12">
            <SkeletonLoader />
            <SkeletonLoader />
            <SkeletonLoader />
            <SkeletonLoader />
          </section>
        ) : (
          <section className="w-full relative ga__section bg-[#f4f4f4]">
            <div className=" w-full absolute inset-x-0 h-[200px] top-0 z-10 bg-[#26205E] "  />
            {bookingResponse ? (
              <>
                <div className="ga__section__main">
                  {/* <WelcomeNote /> */}

                  <section
                    className="flex flex-col z-20 bg-white pb-20 trip__summary"
                    ref={(el) => (componentRef = el)}
                  >
                    <TripHeader />
                    <TicketCTA />
                    <div className="flex flex-col px-6 lg:px-12 ">
                      <Journeys />
                    </div>
                    <PassengeAndFare isRoundTrip={isRoundTrip} />

                    {/* CTA */}
                    {/* <section className="flex flex-wrap md:flex-nowrap items-center px-6 lg:px-12">
                      <Link
                        href={`/bookings/home?bookingId=${encryptPnr(
                          bookingResponse?.Booking?.RecordLocator
                        )}`}
                      >
                        <a className="basis-full md:basis-auto h-[55px] justify-center font-bold tab:basis-auto flex items-center btn btn-primary mr-0 md:mr-2 mb-4 md:mb-0 text-center"> 
                          <svg className=" mr-2 fill-current " width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.5187 10.98C17.5587 10.66 17.5887 10.34 17.5887 10C17.5887 9.66 17.5587 9.34 17.5187 9.02L19.6287 7.37C19.8187 7.22 19.8687 6.95 19.7487 6.73L17.7487 3.27C17.6287 3.05 17.3587 2.97 17.1387 3.05L14.6487 4.05C14.1287 3.65 13.5687 3.32 12.9587 3.07L12.5787 0.42C12.5487 0.18 12.3387 0 12.0887 0H8.08871C7.83871 0 7.62871 0.18 7.59871 0.42L7.21871 3.07C6.60871 3.32 6.04871 3.66 5.52871 4.05L3.03871 3.05C2.80871 2.96 2.54871 3.05 2.42871 3.27L0.428707 6.73C0.298707 6.95 0.358707 7.22 0.548707 7.37L2.65871 9.02C2.61871 9.34 2.58871 9.67 2.58871 10C2.58871 10.33 2.61871 10.66 2.65871 10.98L0.548707 12.63C0.358707 12.78 0.308707 13.05 0.428707 13.27L2.42871 16.73C2.54871 16.95 2.81871 17.03 3.03871 16.95L5.52871 15.95C6.04871 16.35 6.60871 16.68 7.21871 16.93L7.59871 19.58C7.62871 19.82 7.83871 20 8.08871 20H12.0887C12.3387 20 12.5487 19.82 12.5787 19.58L12.9587 16.93C13.5687 16.68 14.1287 16.34 14.6487 15.95L17.1387 16.95C17.3687 17.04 17.6287 16.95 17.7487 16.73L19.7487 13.27C19.8687 13.05 19.8187 12.78 19.6287 12.63L17.5187 10.98ZM10.0887 13.5C8.15871 13.5 6.58871 11.93 6.58871 10C6.58871 8.07 8.15871 6.5 10.0887 6.5C12.0187 6.5 13.5887 8.07 13.5887 10C13.5887 11.93 12.0187 13.5 10.0887 13.5Z" />
                          </svg>
                          Manage Booking
                        </a>
                      </Link>
                      <Link
                        href={`/checkin/home?bookingId=${encryptPnr(
                          bookingResponse?.Booking?.RecordLocator
                        )}`}
                      >
                        <a className="`basis-full md:basis-auto  h-[55px] btn btn-outline font-semibold flex justify-center items-center mb-3 md:mb-0 md:mr-3 text-center ">
                          <svg className=" mr-2 fill-current " width="22" height="24" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.4941 10.0364L7.806 7.69309C7.58864 7.5678 7.21936 7.5678 7.00172 7.69309C6.78455 7.81839 6.54891 8.05038 6.54891 8.30148V9.559L0.28125 10.6678L6.54891 11.7765V12.9878C6.54891 13.2389 6.78455 13.4709 7.00172 13.5962C7.21936 13.722 7.56427 13.722 7.78153 13.5962L10.482 11.2533C10.6995 11.128 10.8393 10.8955 10.8393 10.6449C10.8393 10.3937 10.7116 10.1617 10.4941 10.0364Z"/>
                            <path d="M6.7813 6.50853L8.4823 7.18095V1.8845H17.635L13.5835 4.08026C13.5835 4.08026 13.0267 4.32776 12.903 4.51325C12.7793 4.69897 12.7793 4.9152 12.7793 5.7814V18.152H8.48225V14.1545L6.78125 14.827V19.0181C6.78125 19.0181 6.84317 19.8219 7.86373 19.8219H12.7793V22.8838C12.7793 22.8838 12.8413 24.1825 13.9545 23.7495L21.0369 19.8219C21.0369 19.8219 21.6861 19.6365 21.6861 18.7395V1.08045C21.6861 1.08045 21.6861 0.183733 20.5729 0.183733H8.08034C8.08034 0.183733 6.7813 -0.0638139 6.7813 1.11153V6.50853Z"/>
                          </svg>
                          Check In
                        </a>
                      </Link>
                      <button
                        className="basis-full md:basis-auto h-[55px] tab:basis-auto btn btn-outline mr-2 flex justify-center items-center  md:mr-2 mt-4 md:mt-0"
                        onClick={goBackToHome}
                      >
                        <svg className=" mr-2 fill-current " width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7.31561 18.7821V15.7152C7.31559 14.9381 7.94755 14.3067 8.73031 14.3018H11.6045C12.3907 14.3018 13.0281 14.9346 13.0281 15.7152V18.7732C13.0281 19.4473 13.5759 19.9951 14.2548 20H16.2157C17.1315 20.0023 18.0106 19.6428 18.659 19.0007C19.3075 18.3586 19.6719 17.4868 19.6719 16.5775V7.86585C19.6719 7.13139 19.3439 6.43471 18.7765 5.9635L12.1149 0.674268C10.9504 -0.250877 9.28725 -0.220992 8.15727 0.745384L1.63889 5.9635C1.04462 6.42082 0.689427 7.11956 0.671875 7.86585V16.5686C0.671875 18.4637 2.21926 20 4.12805 20H6.04417C6.37105 20.0023 6.68536 19.8751 6.91735 19.6464C7.14933 19.4178 7.2798 19.1067 7.27979 18.7821H7.31561Z"/>
                        </svg>
                        Back to Home
                      </button>
                    </section> */}
                    {/* CTA */}
                  </section>
                </div>
                <div className="ga__section__side mr-8 z-30">
                  <IbeAdbar />
                </div>
              </>
            ) : (
              <div className="py-8 fit-x-bleed">
                <h2 className="errorText text-base">
                  Error occured fetching booking details
                </h2>
              </div>
            )}
          </section>
        )}
      </section>
    </BaseLayout>
  );
};

export default TripConfirm;
