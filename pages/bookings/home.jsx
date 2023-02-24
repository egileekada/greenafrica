/* eslint-disable @next/next/no-img-element */
import { Fragment, useState, useEffect } from "react";
import BaseLayout from "layouts/Base";
import FlightIcon from "assets/svgs/FlightTwo.svg";
import AeroIcon from "assets/svgs/aero.svg";
import DottedLine from "assets/svgs/dotted-line.svg";
import IbeAdbar from "containers/IbeAdbar";
import SkeletonLoader from "components/SkeletonLoader";
import { useDispatch, useSelector } from "react-redux";
import {
  sessionSelector,
  GetBookingDetailsWithPNR,
} from "redux/reducers/session";
import {
  bookingSelector,
  saveTripParams,
  saveReturnParams,
} from "redux/reducers/booking";
import { paymentSelector } from "redux/reducers/payment";
import { useRouter } from "next/router";
import Link from "next/link";
import { format, differenceInMinutes } from "date-fns";
import { timeConvert } from "utils/common";
import { decryptPnr } from "lib/utils";
import ManagePassengerItem from "containers/Booking/components/PassengerItem";
import { setManageBookingPnr } from "redux/reducers/booking";
import { atcb_action } from "add-to-calendar-button";
import "add-to-calendar-button/assets/css/atcb.css";
import {
  useGetLocationsQuery,
  useGetPaymentConfigsQuery,
} from "services/widgetApi.js";
import PageFares from "./components/PageFares";
import LogoIcon from "assets/svgs/logo.svg";
import Spinner from "components/Spinner";
import { useGetAccountByReferenceMutation } from "services/bookingApi";
import { notification } from "antd";


const ManageBookings = (props) => {
  const router = useRouter();
  const [statePNR, setStatePnr] = useState("");
  const [checkedIn, setCheckedIn] = useState(false);
  const dispatch = useDispatch();
  const { bookingResponseLoading, bookingResponse, signature } =
    useSelector(sessionSelector);
  const { verifyManageBookingResponse } = useSelector(paymentSelector);
  const { tripParams, returnParams, managedPnrWithoutPayment } =
    useSelector(bookingSelector);
  const { data, isLoading: locationLoading } = useGetLocationsQuery();
  const { data: paymentConfigs } = useGetPaymentConfigsQuery();
  const [getAccountByReference] = useGetAccountByReferenceMutation();

  const { bookingId } = router.query;

  const ScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const resolveAbbreviation = (abrreviation) => {
    const [{ name, code }] = data?.data?.items.filter(
      (location) => location.code === abrreviation
    );

    return `${name}`;
  };

  useEffect(() => {
    ScrollToTop();
  }, []);

  const parsed = router.asPath.split(/\?/)[1];

  async function fetchBookingDetails(pnr) {
    if (signature) {
      if (pnr) {
        setStatePnr(pnr);
        dispatch(setManageBookingPnr(pnr));
        dispatch(GetBookingDetailsWithPNR({ pnr: pnr }));

        const payload = {
          header: {
            signature: signature,
            messageContractVersion: "",
            enableExceptionStackTrace: true,
            contractVersion: 0,
          },
          getAccountByReferenceRequestDto: {
            getAccountByReferenceReqData: {
              accountReference: pnr,
              currencyCode: "NGN",
              accountHolderType: 0,
              accountHolderTypeSpecified: true,
            },
          },
        };

        getAccountByReference(payload)
          .unwrap()
          .then((data) => {
            const _availableCredit = parseInt(data?.Account?.AvailableCredits);
            if (_availableCredit > 0) {
              router.push(
                {
                  pathname: "/credit/home",
                  query: {
                    pnr: pnr,
                  },
                },
                "/credit/home"
              );
            }
          })
          .catch(() => {
            notification.error({
              message: "Error",
              description: "Getting acount details failed",
            });
          });
      }
    }
  }

  useEffect(() => {
    if (router.isReady) {
      //check if pnr is encrypted
      if (bookingId !== undefined) {
        let parsedBookingId = parsed.split("bookingId=").pop();

        fetchBookingDetails(decryptPnr(parsedBookingId));
      } else if (!props.pnr) {
        router.push("/bookings");
      } else {
        fetchBookingDetails(props.pnr);
      }
    }
  }, [router]);
  const [isCopied, setCopied] = useState("")

  const copyHandler =(item)=> {
    navigator.clipboard.writeText(item) 
    setCopied("Copied!")
    const timer = setTimeout(() => { 
      setCopied("")
    }, 1000);
    // clearTimeout(timer); 
  }

  useEffect(() => {
    if (
      bookingResponse &&
      bookingResponse?.Booking &&
      bookingResponse?.Booking?.Journeys?.length > 0
    ) {
      const _manageIndicator = parseInt(bookingResponse?.ManageIndicator);
      if (_manageIndicator > 0) {
        setCheckedIn(true);
      } else {
        setCheckedIn(false);
      }
    }
  }, [bookingResponse]);

  const formatPaymentStatus = (status) => {
    let res = "";
    switch (parseInt(status)) {
      case 1:
        res = "Pending";
        break;
      case 2:
        res = "Under Paid";
        break;
      case 3:
        res = "Approved";
        break;
      case 4:
        res = "Over Paid";
        break;
      case 5:
        res = "Pending Customer Action";
        break;
      case 6:
        res = "Pending Customer Action";
        break;
      default:
        res = "";
    }
    return res;
  };

  const TripHeader = () => {
    return (
      <section className="bg-[#26205e] pt-10 lg:pt-5 pb-10 text-white justify-between flex lg:items-center relative px-4 ">
        <div className=" flex items-center " >
          <figure className="flightCircle">
            <FlightIcon />
          </figure>
          <div className=" ml-3 " >
            <p className=" font-bold text-2xl  " >Manage Booking</p>
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
    );
  };

  const PassengersSection = () => {
    return (
      <section className="mx-6 my-6 flex flex-col ">
        <h3 className="title-text no-mb font-700 text-sm">
          PASSENGER
          {bookingResponse?.Booking?.Passengers?.length > 0 ? "S" : ""}
        </h3>
        <section className="flex flex-col">
        </section>
      </section>
    );
  };
  // Generate add booking to calendar data
  const myData = [];
  bookingResponse?.Booking?.Journeys.forEach((journey) => {
    const data = {
      name: `Flight to ${
        !locationLoading &&
        resolveAbbreviation(journey.Segments[0].ArrivalStation)
      } (${journey.Segments[0].FlightDesignator?.CarrierCode} ${
        journey.Segments[0].FlightDesignator?.FlightNumber
      })`,
      description: `Green Africa flight ${
        journey.Segments[0].FlightDesignator?.CarrierCode
      } ${journey.Segments[0].FlightDesignator?.FlightNumber} | ${
        !locationLoading &&
        resolveAbbreviation(journey.Segments[0].DepartureStation)
      } (${journey.Segments[0].DepartureStation}) ${format(
        new Date(journey.Segments[0]?.STD),
        "hh:mm bbb"
      )} (local time) - ${
        !locationLoading &&
        resolveAbbreviation(journey.Segments[0].ArrivalStation)
      } (${journey.Segments[0].ArrivalStation}) ${format(
        new Date(journey.Segments[0]?.STA),
        "hh:mm bbb"
      )} (local time)
        
      Booking number: ${bookingResponse?.Booking?.RecordLocator}`,
      startDate: format(new Date(journey.Segments[0]?.STD), "yyyy-MM-dd"),
      startTime: format(new Date(journey.Segments[0]?.STD), "HH:mm"),
      endTime: format(new Date(journey.Segments[0]?.STA), "HH:mm"),
    };
    myData.push(data);
  });

  const PageCTA = () => {
    return (
      <section
        className={` grid grid-cols-2 lg:grid-cols-4 gap-4 lg:mx-4 ${
          checkedIn ? "pointer-events-none opacity-50 cursor-not-allowed" : ""
        }`}
        // className={`flex flex-wrap md:flex-nowrap mx-6`}
      >
        <button
          className="btn btn-primary font-title font-semibold flex justify-center items-center !text-white h-full"
          onClick={() =>
            atcb_action({
              name: "name",
              dates: myData,
              options: [
                "Apple",
                "Google",
                "iCal",
                "Microsoft365",
                "Outlook.com",
                "Yahoo",
              ],
              iCalFileName: "Reminder-Event",
            })
          }
        >
          <svg className=" mr-2 " width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 4H18V3C18 2.4 17.6 2 17 2C16.4 2 16 2.4 16 3V4H8V3C8 2.4 7.6 2 7 2C6.4 2 6 2.4 6 3V4H5C3.3 4 2 5.3 2 7V8H22V7C22 5.3 20.7 4 19 4ZM2 19C2 20.7 3.3 22 5 22H19C20.7 22 22 20.7 22 19V10H2V19ZM17 12C17.6 12 18 12.4 18 13C18 13.6 17.6 14 17 14C16.4 14 16 13.6 16 13C16 12.4 16.4 12 17 12ZM17 16C17.6 16 18 16.4 18 17C18 17.6 17.6 18 17 18C16.4 18 16 17.6 16 17C16 16.4 16.4 16 17 16ZM12 12C12.6 12 13 12.4 13 13C13 13.6 12.6 14 12 14C11.4 14 11 13.6 11 13C11 12.4 11.4 12 12 12ZM12 16C12.6 16 13 16.4 13 17C13 17.6 12.6 18 12 18C11.4 18 11 17.6 11 17C11 16.4 11.4 16 12 16ZM7 12C7.6 12 8 12.4 8 13C8 13.6 7.6 14 7 14C6.4 14 6 13.6 6 13C6 12.4 6.4 12 7 12ZM7 16C7.6 16 8 16.4 8 17C8 17.6 7.6 18 7 18C6.4 18 6 17.6 6 17C6 16.4 6.4 16 7 16Z" fill="white"/>
          </svg>
          Add to Calendar
        </button>
        <button
          className={`basis-full md:basis-auto btn btn-outline font-semibold flex justify-center items-center ${
            checkedIn ||
            parseInt(bookingResponse?.Booking?.BookingSum?.BalanceDue) > 0
              ? "pointer-events-none opacity-50 cursor-not-allowed"
              : ""
          } `}
          onClick={handleItenary}
        >
          <svg className=" mr-2 fill-current "  width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.0859 0C4.58594 0 0.0859375 4.5 0.0859375 10C0.0859375 15.5 4.58594 20 10.0859 20C15.5859 20 20.0859 15.5 20.0859 10C20.0859 4.5 15.5859 0 10.0859 0ZM12.0859 13.7C11.5859 14 10.9859 13.8 10.6859 13.3L9.18594 10.5C9.08594 10.3 9.08594 10.2 9.08594 10V5C9.08594 4.4 9.48594 4 10.0859 4C10.6859 4 11.0859 4.4 11.0859 5V9.7L12.4859 12.3C12.6859 12.8 12.5859 13.4 12.0859 13.7Z"/>
          </svg>
          Change Flight
        </button>
        <button
          onClick={handleServices}
          // className={`basis-full md:basis-auto btn btn-outline `}
          className={`basis-full md:basis-auto btn btn-outline font-semibold flex justify-center items-center ${
            checkedIn ? "pointer-events-none opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <svg className=" mr-2 fill-current "  width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.5187 10.98C17.5587 10.66 17.5887 10.34 17.5887 10C17.5887 9.66 17.5587 9.34 17.5187 9.02L19.6287 7.37C19.8187 7.22 19.8687 6.95 19.7487 6.73L17.7487 3.27C17.6287 3.05 17.3587 2.97 17.1387 3.05L14.6487 4.05C14.1287 3.65 13.5687 3.32 12.9587 3.07L12.5787 0.42C12.5487 0.18 12.3387 0 12.0887 0H8.08871C7.83871 0 7.62871 0.18 7.59871 0.42L7.21871 3.07C6.60871 3.32 6.04871 3.66 5.52871 4.05L3.03871 3.05C2.80871 2.96 2.54871 3.05 2.42871 3.27L0.428707 6.73C0.298707 6.95 0.358707 7.22 0.548707 7.37L2.65871 9.02C2.61871 9.34 2.58871 9.67 2.58871 10C2.58871 10.33 2.61871 10.66 2.65871 10.98L0.548707 12.63C0.358707 12.78 0.308707 13.05 0.428707 13.27L2.42871 16.73C2.54871 16.95 2.81871 17.03 3.03871 16.95L5.52871 15.95C6.04871 16.35 6.60871 16.68 7.21871 16.93L7.59871 19.58C7.62871 19.82 7.83871 20 8.08871 20H12.0887C12.3387 20 12.5487 19.82 12.5787 19.58L12.9587 16.93C13.5687 16.68 14.1287 16.34 14.6487 15.95L17.1387 16.95C17.3687 17.04 17.6287 16.95 17.7487 16.73L19.7487 13.27C19.8687 13.05 19.8187 12.78 19.6287 12.63L17.5187 10.98ZM10.0887 13.5C8.15871 13.5 6.58871 11.93 6.58871 10C6.58871 8.07 8.15871 6.5 10.0887 6.5C12.0187 6.5 13.5887 8.07 13.5887 10C13.5887 11.93 12.0187 13.5 10.0887 13.5Z"/>
          </svg>
          Manage Services
        </button>
        <Link href="/bookings/seat-selection">
          <a
            className={`basis-full md:basis-auto btn btn-outline font-semibold flex justify-center items-center text-center ${
              checkedIn
                ? "pointer-events-none opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            <svg className=" mr-2 fill-current " width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.1807 18.96C13.1807 19.632 12.6527 20.16 11.9807 20.16H9.43669V22.032H9.91669C10.7327 22.032 11.3567 22.656 11.3567 23.472H5.59669C5.59669 22.656 6.22069 22.032 7.03669 22.032H7.51669V20.16H5.64469C5.11669 20.16 4.68469 19.824 4.49269 19.344C1.80469 11.52 1.80469 11.808 1.80469 11.52C1.80469 10.992 2.09269 10.56 2.62069 10.368C3.24469 10.128 3.91669 10.512 4.15669 11.088C6.70069 18.432 6.46069 17.712 6.46069 17.76H11.9807C12.6047 17.76 13.1807 18.336 13.1807 18.96Z" />
              <path d="M7.80226 7.63201C7.41826 6.62401 6.31426 6.14401 5.30626 6.52801C4.29826 6.91201 3.81826 8.01601 4.20226 9.02401L6.93826 15.84C7.56226 17.376 9.19426 17.04 9.33826 17.04L13.9463 17.088L17.6903 22.848C18.1223 23.52 19.0823 23.712 19.7543 23.232C20.3783 22.752 20.5223 21.888 20.0903 21.216L15.9143 14.88C15.6743 14.496 15.1943 14.208 14.7143 14.208L10.3463 14.16L7.80226 7.63201Z" />
              <path d="M4.34869 6.096C5.7537 6.096 6.89269 4.95701 6.89269 3.552C6.89269 2.14698 5.7537 1.008 4.34869 1.008C2.94367 1.008 1.80469 2.14698 1.80469 3.552C1.80469 4.95701 2.94367 6.096 4.34869 6.096Z" />
              <path d="M17.9283 0.47998C15.3843 0.47998 13.3203 2.54398 13.3203 5.08798V8.73598C13.3203 11.28 15.3843 13.344 17.9283 13.344C20.4723 13.344 22.5363 11.28 22.5363 8.73598V5.08798C22.5843 2.59198 20.4723 0.47998 17.9283 0.47998ZM21.6243 8.78398C21.6243 10.8 19.9923 12.432 17.9763 12.432C15.9603 12.432 14.3283 10.8 14.3283 8.78398V5.13598C14.2803 3.11998 15.9123 1.43998 17.9283 1.43998C19.9443 1.43998 21.5763 3.07198 21.5763 5.08798V8.78398H21.6243Z" />
              <path d="M20.6662 8.78402V5.13602C20.6662 3.64802 19.4182 2.40002 17.9302 2.40002C16.4422 2.40002 15.2422 3.60002 15.2422 5.08802V8.73602C15.2422 10.224 16.4422 11.424 17.9302 11.424C19.4182 11.424 20.6662 10.272 20.6662 8.78402Z" />
            </svg>
            Seat Management
          </a>
        </Link>
      </section>
    );
  };

  const PaymentContact = () => {
    return (
      <section className=" mx-6 mt-6 flex flex-col justify-between">
        <div className=" w-full mt-8 ">
          <div className="trip__summary__item relative "> 
            <div className=" w-full bg-[#F3F3F7] h-[48px] flex items-center px-6 text-[#261F5E] font-bold rounded-t-md absolute top-0 inset-x-0 " >
              Contact Details
            </div> 
            <div className="flex flex-col mt-[45px]">
              <section className="flex flex-col ">
                {bookingResponse?.Booking?.BookingContacts?.map((_contact) => {
                  return (
                    <>
                      <div className=" grid grid-cols-3 gap-6 " >
                        <div className=" flex items-center " >
                          <div className=" w-[53px] h-[53px] bg-[#9E9BBF2B] flex justify-center items-center " >
                            <svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M8.96232 14.3113C4.29723 14.3113 0.3125 15.0469 0.3125 17.9889C0.3125 20.932 4.27236 21.6935 8.96232 21.6935C13.6274 21.6935 17.6121 20.9591 17.6121 18.0159C17.6121 15.0728 13.6534 14.3113 8.96232 14.3113" fill="#26205E"/>
                              <path opacity="0.4" d="M8.96619 11.5089C12.144 11.5089 14.6902 8.96167 14.6902 5.78491C14.6902 2.60816 12.144 0.0609131 8.96619 0.0609131C5.78943 0.0609131 3.24219 2.60816 3.24219 5.78491C3.24219 8.96167 5.78943 11.5089 8.96619 11.5089" fill="#26205E"/>
                            </svg>
                          </div>
                          <div className=" ml-2 " >
                            <p className=" text-[#5F5B82] text-sm font-medium " >Full Name</p>
                            <p className=" text-[#26205E] font-bold mt-1 " >{`${_contact?.Names[0]?.FirstName} ${_contact?.Names[0]?.LastName}`}</p>
                          </div>
                        </div>
                        <div className=" flex items-center " >
                          <div className=" w-[53px] h-[53px] bg-[#9E9BBF2B] flex justify-center items-center " >
                            <svg width="21" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M18.9531 0H2.95312C1.84812 0 0.963125 0.895 0.963125 2L0.953125 14C0.953125 15.105 1.84812 16 2.95312 16H18.9531C20.0581 16 20.9531 15.105 20.9531 14V2C20.9531 0.895 20.0581 0 18.9531 0ZM18.9531 4L10.9531 9L2.95312 4V2L10.9531 7L18.9531 2V4Z" fill="#26205E"/>
                            </svg>
                          </div>
                          <div className=" ml-2 " >
                            <p className=" text-[#5F5B82] text-sm font-medium " >Email Address</p>
                            <p className=" text-[#26205E] font-bold mt-1 " >{_contact?.EmailAddress}</p>
                          </div>
                        </div>
                        <div className=" flex items-center " >
                          <div className=" w-[53px] h-[53px] bg-[#9E9BBF2B] flex justify-center items-center " >
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M11.3788 11.4748C9.47919 13.3732 7.27839 15.19 6.40839 14.32C5.16399 13.0756 4.39599 11.9908 1.65039 14.1976C-1.09401 16.4032 1.01439 17.8744 2.22039 19.0792C3.61239 20.4712 8.80119 19.1536 13.93 14.026C19.0576 8.89719 20.3716 3.70839 18.9784 2.31639C17.7724 1.10919 16.3084 -0.99801 14.1028 1.74639C11.896 4.49079 12.9796 5.25879 14.2264 6.50439C15.0928 7.37439 13.2772 9.57519 11.3788 11.4748Z" fill="#26205E"/>
                            </svg>
                          </div>
                          <div className=" ml-2 " >
                            <p className=" text-[#5F5B82] text-sm font-medium " >Phone Number</p>
                            <p className=" text-[#26205E] font-bold mt-1 " >{_contact?.HomePhone}</p>
                          </div>
                        </div>
                      </div> 
                    </>
                  );
                })}
              </section>
            </div>
          </div>
        </div>
        {bookingResponse?.Booking?.Passengers.map((_pax, _paxIndex) => {
          return (
            <ManagePassengerItem passenger={_pax} paxIndex={_paxIndex} />
          );
        })}
        <div className="w-full mt-8 ">
          <div className="trip__summary__item relative ">
            <div className=" w-full bg-[#F3F3F7] h-[48px] flex items-center px-6 text-[#261F5E] font-bold rounded-t-md absolute top-0 inset-x-0 " >
              PAYMENT DETAILS
            </div>
            {/* <h2 className="trip-title mb-2 font-semibold text-primary-main">
              PAYMENT DETAILS
            </h2> */}
            <div className="flex flex-col mt-[45px]">
              <section className="flex flex-col">
                {bookingResponse?.Booking?.Payments?.map((_payment) => {
                  return (
                    <>
                    <div className=" grid lg:grid-cols-4 grid-cols-2 gap-4 " >
                      <div>
                        <p className=" text-[#5F5996] text-sm font-medium " >Type:</p>
                        <p className=" text-[#261F5E] mt-1 font-bold ">
                            {paymentConfigs &&
                              resolvePaymnet(_payment?.PaymentMethodCode)}</p>
                      </div>
                      <div>
                        <p className=" text-[#5F5996] text-sm font-medium " >Date:</p>
                        <p className=" text-[#261F5E] mt-1 font-bold "> 
                          {format(
                                new Date(_payment?.ApprovalDate),
                                "d MMMM yyyy"
                              )}</p>
                      </div>
                      <div>
                        <p className=" text-[#5F5996] text-sm font-medium " >Status:</p>
                        <p className=" text-[#261F5E] mt-1 font-bold ">
                          {formatPaymentStatus(_payment?.Status)}</p>
                      </div>
                      <div>
                        <p className=" text-[#5F5996] text-sm font-medium " >Total Fare:</p>
                        <p className=" text-[#261F5E] mt-1 font-bold ">
                          ₦{_payment?.PaymentAmount?.toLocaleString("NGN")}</p>
                      </div>
                    </div>
                      {/* <div className="trip__summary__details">
                        <div className="f-1">
                          <h5>Type:</h5>
                        </div>
                        <div className="f-1">
                          <h6>
                            {paymentConfigs &&
                              resolvePaymnet(_payment?.PaymentMethodCode)}
                          </h6>
                        </div>
                      </div> */}
                      {/* <div className="trip__summary__details">
                        <div className="f-1">
                          <h5>Date:</h5>
                        </div>
                        <div className="f-1">
                          <h6>
                            {format(
                              new Date(_payment?.ApprovalDate),
                              "d MMMM yyyy"
                            )}
                          </h6>
                        </div>
                      </div> */}
                      {/* 28 October 2022 */}
                      {/* <div className="trip__summary__details">
                        <div className="f-1">
                          <h5>Status:</h5>
                        </div>
                        <div className="f-1">
                          <h6>{formatPaymentStatus(_payment?.Status)}</h6>
                        </div>
                      </div> */}
                      {/* <div className="trip__summary__details">
                        <div className="f-1">
                          <h5>Total Fare:</h5>
                        </div>
                        <div className="f-1">
                          <h6>
                            ₦{_payment?.PaymentAmount?.toLocaleString("NGN")}
                          </h6>
                        </div>
                      </div> */}
                    </>
                  );
                })}
              </section>
            </div>
          </div>
        </div>

      </section>
    );
  };

  const TabContent = () => {
    return (
      <>
        {bookingResponse?.Booking?.Journeys?.length > 0 ? (
          <>
            {bookingResponse?.Booking?.Journeys.map((_journey, _index) => (
              <SingleJourneyItem journey={_journey} journeyIndex={_index} />
            ))}
            {/* <PageCTA /> */}
            {/* <PassengersSection /> */}

            <PaymentContact />
            <PageFares />
          </>
        ) : (
          <p className="errorText p-4">No Journeys</p>
        )}
      </>
    );
  };

  const handleItenary = () => {
    let _JourneyOneTax = 0;
    let _JourneyOneFare = 0;

    const _JourneyOneServiceCharges =
      bookingResponse?.Booking?.Journeys[0].Segments[0].Fares[0].PaxFares[0]
        .ServiceCharges;

    _JourneyOneServiceCharges.map((_serviceCharge) => {
      _serviceCharge.ChargeCode === ""
        ? (_JourneyOneFare = _serviceCharge?.Amount)
        : (_JourneyOneTax = _JourneyOneTax + parseInt(_serviceCharge?.Amount));
    });

    const _STD = format(
      new Date(bookingResponse?.Booking?.Journeys[0].Segments[0].STD),
      "yyyy-MM-dd"
    );
    const tripPayload = {
      departureStation:
        bookingResponse?.Booking?.Journeys[0].Segments[0].DepartureStation,
      arrivalStation:
        bookingResponse?.Booking?.Journeys[0].Segments[0].ArrivalStation,
      beginDate: _STD,
      endDate: _STD,
      returnDate: null,
      goStd: _STD,
      returnSTD: null,
      isRoundTrip: bookingResponse?.Booking?.Journeys.length > 1 ? true : false,
      totalPaxCount: bookingResponse?.Booking?.Passengers.length,
      taxAmount: _JourneyOneTax,
      minimumFarePrice: _JourneyOneFare,
      serviceBundleItem:
        bookingResponse?.Booking?.Journeys[0].Segments[0].Fares[0].RuleNumber,
      scheduleIndex: 0,
      currentDate: new Date(),
      LiftStatus: bookingResponse?.Booking?.Journeys[0]?.State,
    };

    // const goStd = bookingResponse?.Booking?.Journeys[0].Segments[0].STD;

    if (bookingResponse?.Booking?.Journeys.length > 1) {
      let _JourneyTwoTax = 0;
      let _JourneyTwoFare = 0;

      const _JourneyTwoServiceCharges =
        bookingResponse?.Booking?.Journeys[1].Segments[0].Fares[0].PaxFares[0]
          .ServiceCharges;

      _JourneyTwoServiceCharges.map((_serviceCharge) => {
        _serviceCharge.ChargeCode === ""
          ? (_JourneyTwoFare = _serviceCharge?.Amount)
          : (_JourneyTwoTax =
              _JourneyTwoTax + parseInt(_serviceCharge?.Amount));
      });

      const _beginSTD = format(
        new Date(bookingResponse?.Booking?.Journeys[0].Segments[0].STD),
        "yyyy-MM-dd"
      );

      const _returnSTD = format(
        new Date(bookingResponse?.Booking?.Journeys[1].Segments[0].STD),
        "yyyy-MM-dd"
      );

      const returnPayload = {
        departureStation:
          bookingResponse?.Booking?.Journeys[1].Segments[0].DepartureStation,
        arrivalStation:
          bookingResponse?.Booking?.Journeys[1].Segments[0].ArrivalStation,
        beginDate: _beginSTD,
        endDate: _beginSTD,
        returnDate: _returnSTD,
        goStd: _beginSTD,
        returnSTD: _returnSTD,
        isRoundTrip: true,
        totalPaxCount: bookingResponse?.Booking?.Passengers.length,
        taxAmount: _JourneyTwoTax,
        minimumFarePrice: _JourneyTwoFare,
        serviceBundleItem:
          bookingResponse?.Booking?.Journeys[1].Segments[0].Fares[0].RuleNumber,
        scheduleIndex: 1,
        currentDate: new Date(),
        LiftStatus: bookingResponse?.Booking?.Journeys[1]?.State,
      };

      dispatch(saveTripParams(tripPayload));
      dispatch(saveReturnParams(returnPayload));
      router.push("/bookings/change-flight");
    } else {
      dispatch(saveTripParams(tripPayload));
      router.push("/bookings/change-flight");
    }
  };

  const handleServices = () => {
    if (bookingResponse && bookingResponse?.Booking?.Journeys) {
      const tripPayload = {
        ...tripParams,
        LiftStatus: bookingResponse?.Booking?.Journeys[0]?.State,
      };

      if (bookingResponse?.Booking?.Journeys.length > 1) {
        const returnPayload = {
          ...returnParams,
          LiftStatus: bookingResponse?.Booking?.Journeys[1]?.State,
        };
        dispatch(saveTripParams(tripPayload));
        dispatch(saveReturnParams(returnPayload));
        router.push("/bookings/services");
      } else {
        dispatch(saveTripParams(tripPayload));
        router.push("/bookings/services");
      }
    }
  };

  const resolvePaymnet = (abrreviation) => {
    const chosen = paymentConfigs?.data?.items.filter(
      (location) => location.code === abrreviation
    );

    return chosen?.length > 0 ? chosen[0]?.name : ``;
  };

  const SingleJourneyItem = ({ journey, journeyIndex }) => {
    return journey?.Segments.map((_segment, index) => {  
      return (
        <>
        <section className={journeyIndex === 0 ? " p-4 border mt-12 !flex !flex-col rounded-t-md border-[#261F5E1A] border-b-0 bordered mx-6  px-6":" p-4 border !flex !flex-col rounded-b-md border-[#261F5E1A] bordered mx-6  px-8"}>

          <div className="">
            <p className=" text-base font-bold text-[#261F5E] ">
              {journeyIndex === 0 ? "Departing" : "Returning"} on &nbsp;
              <span className=" font-medium " >{format(new Date(_segment?.STD), "EEEE, LLLL dd yyyy")}</span>
            </p>
          </div>
          {_segment?.Fares.map((_fare) => {
            return (
              <p className="bg-primary-main text-green py-1 px-2 !font-semibold rounded-[4px] w-fit mt-4 -mb-5 ">
                {_fare?.RuleNumber.toLowerCase() === "savr" && "gSaver"}
                {_fare?.RuleNumber.toLowerCase() === "flex" && "gFlex"}
                {_fare?.RuleNumber.toLowerCase() === "clsc" && "gClassic"}
              </p>
            );
          })}

          {locationLoading ? (
            <div className="p-4">
              <Spinner />
            </div>
          ) : data?.data?.items ? (
            <div className="basis-full mt-6 lg:basis-[60%] w-full flex flex-col min-h-[54px] px-6 mb-10">
              <p className="tripType self-center">
                {" "}
                {_segment?.FlightDesignator?.CarrierCode}{" "}
                {_segment?.FlightDesignator?.FlightNumber}
              </p>
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <h5 className=" text-[#26205E] text-2xl font-bold ">
                    {" "}
                    {format(new Date(_segment?.STD), "HH:mm")}
                  </h5>
                  <p className="tripCity font-medium">
                    {" "}
                    {_segment?.DepartureStation &&
                      resolveAbbreviation(_segment?.DepartureStation)}
                  </p>
                </div>
                <div className="flex items-center">
                  <DottedLine className="dotted-svg" />
                  <AeroIcon className="aero-svg" />
                  <DottedLine className="dotted-svg" />
                </div>
                <div className="flex flex-col  items-end">
                  <p className="text-[#26205E] text-2xl font-bold  right-text">
                    {" "}
                    {format(new Date(_segment?.STA), "HH:mm")}
                  </p>
                  <p className="tripCity right-text font-medium">
                    {" "}
                    {_segment?.ArrivalStation &&
                      resolveAbbreviation(_segment?.ArrivalStation)}
                  </p>
                </div>
              </div>
              <p className="tripTime self-center">
                {" "}
                {timeConvert(
                  differenceInMinutes(
                    new Date(_segment?.STA),
                    new Date(_segment?.STD)
                  )
                )}
              </p>
            </div>
          ) : null}
            {bookingResponse?.Booking?.Journeys.length-1 === journeyIndex && (
              <div className=" w-full py-2 " >
                <PageCTA />
              </div>
            )}
          </section>
        </>
      );
    });
  };

  const goBackToHome = () => {
    window.location.assign("https://dev-website.gadevenv.com/");
  };

  const handlePayment = () => {
    router.push("/bookings/payment");
  };

  return (
    <Fragment>
      <BaseLayout>
        <nav className="top__bar logo-holder">
          <button onClick={goBackToHome}>
            <figure className="cursor-pointer">
              <LogoIcon />
            </figure>
          </button>
        </nav>

        {bookingResponse &&
          bookingResponse?.Booking &&
          parseInt(bookingResponse?.Booking?.BookingSum?.BalanceDue) > 0 &&
          parseInt(bookingResponse?.Booking?.BookingInfo?.BookingStatus) >=
            0 && (
            <nav className="manage-booking-bar">
              <p className="font-display text-base text-primary-main">
                Your booking is on hold. Please review the booking details and
                complete the payment
              </p>
              <button className="btn btn-primary" onClick={handlePayment}>
                Pay ₦
                {parseInt(
                  bookingResponse?.Booking?.BookingSum?.BalanceDue
                ).toLocaleString("NGN")}
              </button>
            </nav>
          )}

        <section className="w-full relative checkin ">
          {bookingResponseLoading ? (
            <div className="px-12 py-12">
              <SkeletonLoader />
              <SkeletonLoader />
              <SkeletonLoader />
            </div>
          ) : (
            <section className="ga__section relative z-20 ">
            <div className=" w-full absolute inset-x-0 h-[200px] top-0 z-20 bg-[#26205E] "  />
              {(verifyManageBookingResponse &&
                verifyManageBookingResponse?.pnr.toLowerCase() ===
                  statePNR.toLowerCase()) ||
              (managedPnrWithoutPayment &&
                managedPnrWithoutPayment?.toLowerCase() ===
                  statePNR.toLowerCase()) ? (
                <div className="flex text-center items-center justify-center bg-green absolute w-full p-3">
                  <p>Your booking has been confirmed</p>
                </div>
              ) : null}
              <div className="ga__section__main  relative z-20 ">
                {/* <div className="mb-8 mt-16 xlg:mt-3">
                  {bookingResponse?.Booking ? (
                    <>
                      <h2 className="text-black font-bold text-2xl mb-2">
                        Booking
                      </h2>
                    </>
                  ) : null}
                </div> */}

                {bookingResponse?.Booking ? (
                  <section className="flex flex-col bg-white pb-24">
                    <TripHeader />
                    <TabContent />
                  </section>
                ) : (
                  <p className="errorText text-lg">Error occured flight</p>
                )}
              </div>

              <div className="ga__section__side relative z-20  mr-8 ">
                <IbeAdbar />
              </div>
            </section>
          )}
        </section>
      </BaseLayout>
    </Fragment>
  );
};

export default ManageBookings;

export async function getServerSideProps(context) {
  return {
    props: {
      pnr: context.query.pnr ? context.query.pnr : "",
    },
  };
}
