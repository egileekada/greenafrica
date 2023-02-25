/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import { format, differenceInMinutes } from "date-fns";
import { useRouter } from "next/router";
import { timeConvert } from "utils/common";
import BaseLayout from "layouts/Base";
import FlightIcon from "assets/svgs/FlightTwo.svg";
import AeroIcon from "assets/svgs/aero.svg";
import DottedLine from "assets/svgs/dotted-line.svg";
import SkeletonLoader from "components/SkeletonLoader";
import IbeAdbar from "containers/IbeAdbar";
import { notification } from "antd";
import ManagePassengerItem from "containers/Booking/components/PassengerItem";

import {
  useGetLocationsQuery,
  useGetProductsQuery,
  useSendBoardingPassMutation,
} from "services/widgetApi.js";

import { useSelector, useDispatch } from "react-redux";
import {
  sessionSelector,
  saveCheckInSelection,
  saveCheckInPassengerSelection,
  resetSelectedPassengers,
  GetBookingDetailsWithPNR,
} from "redux/reducers/session";

import { setCheckinPNR } from "redux/reducers/checkin";

import { decryptPnr } from "lib/utils";

const CheckInDetails = (props) => {
  const router = useRouter();
  const { bookingId } = router.query;
  const { data, isLoading: locationLoading } = useGetLocationsQuery();
  const { data: products, isLoading: productsLoading } = useGetProductsQuery();
  const [passengers, setPassengers] = useState([]);
  const [sendBoardingPass, { isLoading }] = useSendBoardingPassMutation();

  const dispatch = useDispatch();
  const { signature, sessionLoading, bookingResponseLoading, bookingResponse } =
    useSelector(sessionSelector);

  const parsed = router.asPath.split(/\?/)[1];

  function initSession(pnr) {
    if (pnr) {
      dispatch(setCheckinPNR(pnr));
      dispatch(GetBookingDetailsWithPNR({ pnr: pnr }));
      dispatch(resetSelectedPassengers());
    }
  }

  useEffect(() => {
    if (router.isReady) {
      //check if pnr is encrypted
      if (bookingId !== undefined) {
        let parsedBookingId = parsed.split("bookingId=").pop();
        initSession(decryptPnr(parsedBookingId));
      } else if (!props.pnr) {
        router.push("/checkin");
      } else {
        initSession(props.pnr);
      }
    }
  }, [router]);

  const PassengerBags = (_passenger, PassengerNumber) => {
    const _Baggages = _passenger.filter((pax) => {
      if (pax.PassengerNumber == PassengerNumber)
        return (
          pax.FeeCode === "XBAG20" ||
          pax.FeeCode === "XBAG15" ||
          pax.FeeCode === "XBAG10"
        );
    });

    return (
      <div className="trip-details-item">
        <h6>BAGGAGE{_Baggages.length > 1 ? "S" : ""}: </h6>
        <h5 className="flex items-center">
          <span>
            {_Baggages.length > 0 ? `${_Baggages.length}` : "No Baggage"}
          </span>
        </h5>
      </div>
    );
  };

  const SpecialAssistance = (_passenger, PassengerNumber) => {
    const _Baggages = _passenger.filter((pax) => {
      if (pax.PassengerNumber == PassengerNumber)
        return (
          pax.FeeCode === "HPRD" ||
          pax.FeeCode === "VPRD" ||
          pax.FeeCode === "WCHR"
        );
    });

    return (
      <div className="trip-details-item">
        {_Baggages.length > 1 && (
          <>
            <h6 className="uppercase">Special Assistance </h6>
            {_Baggages.map((item, index) => (
              <h5 className="flex items-center" key={index}>
                <span>
                  {item.FeeCode === "WCHR"
                    ? "Wheelchair"
                    : item.FeeCode === "HPRD"
                    ? "Hearing Impaired"
                    : item.FeeCode === "VPRD"
                    ? "Visually Impaired"
                    : ""}
                </span>
              </h5>
            ))}
          </>
        )}
      </div>
    );
  };

  const resolveAbbreviation = (abrreviation) => {
    const [{ name, code }] = data?.data?.items.filter(
      (location) => location.code === abrreviation
    );

    return `${name} (${code})`;
  };

  const [isCopied, setCopied] = useState("")

  const copyHandler =(item)=> {
    navigator.clipboard.writeText(item) 
    setCopied("Copied!")
    const timer = setTimeout(() => { 
      setCopied("")
    }, 1000);
    // clearTimeout(timer); 
  }
  const fare_name = (value) => {
    const [{ name }] = products?.data?.items.filter(
      (product) => product.code === value
    );
    return `${name}`;
  };

  const addPassengers = (event, passenger, journey) => {
    const isChecked = event.target.checked;

    const data = { ...passenger, journey };

    if (isChecked) {
      setPassengers([...passengers, data]);
    } else {
      setPassengers(
        passengers.filter((currentPassenger) => {
          return (
            currentPassenger.PassengerNumber !== passenger.PassengerNumber ||
            currentPassenger.journey !== journey
          );
        })
      );
    }
  };

  const tryCheckIn = () => {
    dispatch(saveCheckInPassengerSelection(passengers));

    const newData = bookingResponse?.Booking?.Journeys.flatMap(
      (Journey, index) => {
        if (passengers.some((el) => el.journey === index)) {
          return {
            recordLocator: bookingResponse?.Booking?.RecordLocator,
            inventoryLegKey: {
              carrierCode: Journey.Segments[0].FlightDesignator.CarrierCode,
              flightNumber: Journey.Segments[0].FlightDesignator.FlightNumber,
              departureDate: Journey.Segments[0].STD,
              departureDateSpecified: true,
              departureStation: Journey.Segments[0].DepartureStation,
              arrivalStation: Journey.Segments[0].ArrivalStation,
            },
            liftStatus: 1,
            liftStatusSpecified: true,
            bySegment: false,
            bySegmentSpecified: true,
            checkSameDayReturn: false,
            checkSameDayReturnSpecified: true,
            skipSecurityChecks: false,
            skipSecurityChecksSpecified: true,
            seatRequired: false,
            seatRequiredSpecified: true,
            retrieveBoardingZone: false,
            retrieveBoardingZoneSpecified: true,
            allowPartialCheckIn: false,
            allowPartialCheckInSpecified: true,
            otherAirlineCheckin: false,
            otherAirlineCheckinSpecified: true,
            checkInDestination: Journey.Segments[0].ArrivalStation,
            returnDownlineSegments: true,
            returnDownlineSegmentsSpecified: true,
            inventoryLegKeyDepartureDateTime: Journey.Segments[0].STD,
            inventoryLegKeyDepartureDateTimeSpecified: true,
            processDownlineIATCI: true,
            processDownlineIATCISpecified: true,
            checkInPaxRequestList: [
              ...passengers
                .filter((data) => {
                  return data.journey === index;
                })
                .map((passenger) => {
                  return {
                    name: {
                      title: passenger.Names[0].Title,
                      firstName: passenger.Names[0].FirstName,
                      lastName: passenger.Names[0].LastName,
                    },
                    verifiedID: false,
                    verifiedIDSpecified: true,
                    passengerID: passenger.PassengerNumber,
                    passengerIDSpecified: true,
                    processAPPS: false,
                    processAPPSSpecified: true,
                    appsTransitType: 0,
                    appsTransitTypeSpecified: true,
                  };
                }),
            ],
          };
        } else {
          return [];
        }
      }
    );

    dispatch(saveCheckInSelection(newData));

    router.push(
      {
        pathname: "/checkin/consent",
        query: {
          signature,
        },
      },
      "/checkin/consent"
    );
  };

  const handleServices = () => {
    router.push("/checkin/manage-services");
  };

  const triggerEmailBoardingPass = (id, departureStation, arrivalStation) => {
    const data = {
      signature,
      recordLocator: props.pnr,
      requestType: "email",
      boardingPassRequests: [
        {
          passengerIdArray: [id],
          departureStation,
          arrivalStation,
        },
      ],
    };
    sendBoardingPass(data)
      .unwrap()
      .then((data) => {
        notification.success({
          message: "Success",
          description: data.data.message,
        });
      })
      .catch((error) => {
        notification.error({
          message: "Error",
          description: "An Error Occured",
        });
      });
  };

  const triggerDownloadBoardingPass = (
    id,
    departureStation,
    arrivalStation
  ) => {
    const data = {
      signature,
      recordLocator: props.pnr,
      requestType: "download",
      boardingPassRequests: [
        {
          passengerIdArray: [id],
          departureStation,
          arrivalStation,
        },
      ],
    };
    sendBoardingPass(data)
      .unwrap()
      .then((data) => {
        const link = document.createElement("a");
        link.href = data.data.urls[0];
        link.setAttribute("target", "_blank");
        link.setAttribute("download", "boarding pass");
        document.body.appendChild(link);
        link.click();
        link.remove();
        notification.success({
          message: "Success",
          description: data.data.message,
        });
      })
      .catch((error) => {
        notification.error({
          message: "Error",
          description: "An Error Occured",
        });
      });
  };

  return (
    <BaseLayout>
      <section className="w-full checkin">
        {sessionLoading || bookingResponseLoading ? (
          <section className="spinner__container">
            <SkeletonLoader />
            <SkeletonLoader />
          </section>
        ) : (
          <section className="ga__section">
            <div className="ga__section__main relative ">
            <div className=" w-full absolute inset-x-0 h-[200px] top-0 z-10 bg-[#26205E] "  />
              {/* <div className="mb-8 mt-16 xlg:mt-0">
                <h2 className="text-black font-bold text-2xl mb-2">Check In</h2>
                <p>
                  Kindly confirm that the information below is correct before
                  checking in
                </p>
              </div> */} 
              <section className="bg-[#26205e] pt-10 lg:pt-5 relative z-20 pb-10 !text-white justify-between flex lg:items-center px-4 ">
                <div className=" flex items-center " >
                  <figure className="flightCircle">
                    <FlightIcon />
                  </figure>
                  <div className=" ml-3 " >
                    <p className=" font-bold text-2xl text-white " >Check In</p>
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

              <section className="flex relative z-20  flex-col bg-white pb-24">
                {/* TripHeader */}
                {/* <section className="ibe__flight__info__destination">
                  <p className="text-normal">
                    Booking Code: {bookingResponse?.Booking?.RecordLocator}
                  </p>
                  <figure className="flightCircle">
                    <FlightIcon />
                  </figure>
                </section> */}

                {bookingResponse?.Booking?.Journeys.map((Journey, index) => (
                  <div key={index}>
                    <div className="mx-6 mt-8">
                      <p className="title-text text-base !text-[#261F5E] !font-medium ">
                        {index === 0 ? 
                        "DEPARTURE"+" ": "RETURNING"+" "}
                        <span className=" !font-bold " > 
                          {bookingResponse &&
                            format(
                              new Date(
                                bookingResponse ? Journey?.Segments[0].STD : ""
                              ),
                              "MMMM dd, yyyy"
                          )}
                        </span>
                      </p>
                    </div>
                    <section
                      className="ibe__trip__item checkinView bordered mx-6 my-3"
                      key={index}
                    >
                      <p className="bg-primary-main font-bold text-green py-1 px-4 rounded-[4px] absolute left-6 top-5">
                        {!productsLoading &&
                          fare_name(Journey?.Segments[0].Fares[0].ProductClass)}
                      </p>
                      <div className="basis-full lg:basis-[60%] w-full flex flex-col min-h-[54px] px-6 mb-10 mt-5">
                        <p className="tripType self-center">
                          {Journey?.Segments[0]?.FlightDesignator.CarrierCode}
                          {Journey?.Segments[0]?.FlightDesignator.FlightNumber}
                        </p>
                        <div className="flex justify-between">
                          <div className="flex flex-col">
                            <p className="font-extrabold !text-3xl text-primary-main">
                              {bookingResponse &&
                                format(
                                  new Date(Journey.Segments[0].STD),
                                  "HH:mm"
                                )}
                            </p>
                            <p className="font-semibold text-black !text-base">
                              {!locationLoading &&
                                resolveAbbreviation(
                                  Journey?.Segments[0]?.DepartureStation
                                )}
                            </p>
                          </div>
                          <div className="tripIconPath">
                            <DottedLine className="dotted-svg" />
                            <AeroIcon className="aero-svg" />
                            <DottedLine className="dotted-svg" />
                          </div>
                          <div className="flex flex-col  items-end">
                            <p className="font-extrabold !text-3xl text-primary-main right-text">
                              {bookingResponse &&
                                format(
                                  new Date(Journey.Segments[0].STA),
                                  "HH:mm"
                                )}
                            </p>
                            <p className="font-semibold text-black !text-base right-text">
                              {!locationLoading &&
                                resolveAbbreviation(
                                  Journey?.Segments[0]?.ArrivalStation
                                )}
                            </p>
                          </div>
                        </div>
                        <p className="tripTime self-center">
                          {bookingResponse &&
                            timeConvert(
                              differenceInMinutes(
                                new Date(Journey?.Segments[0]?.STA),
                                new Date(Journey?.Segments[0]?.STD)
                              )
                            )}
                        </p>
                      </div>
                    </section>

                    {/* <section className="mx-6">
                      <h3 className="title-text no-mb">PASSENGERS</h3>
                    </section> */}
                    <div className=" w-full  px-6 " > 
                      {bookingResponse?.Booking?.Passengers.map(
                        (passenger, pIndex) => {
                          // console.log(passenger);
                          return(  
                            <ManagePassengerItem passenger={passenger} index={index} Journey={Journey} paxIndex={pIndex} checkin={true} setdata={addPassengers} /> 
                          )
                        }
                      )}
                    </div>
                  </div>
                ))}
                {/* Checkin Info*/}
                <div className="flex mx-6 mt-5">
                  <button
                    className="btn btn-primary !text-white flex justify-center items-center px-6 "
                    disabled={passengers.length < 1}
                    onClick={tryCheckIn}
                  >
                    <svg className=" mr-3 " width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12.4473 10.0369L9.75912 7.69358C9.54177 7.56829 9.17248 7.56829 8.95484 7.69358C8.73767 7.81888 8.50203 8.05086 8.50203 8.30197V9.55949L2.23438 10.6683L8.50203 11.777V12.9883C8.50203 13.2394 8.73767 13.4714 8.95484 13.5966C9.17248 13.7225 9.51739 13.7225 9.73466 13.5966L12.4351 11.2538C12.6526 11.1285 12.7925 10.896 12.7925 10.6453C12.7925 10.3941 12.6648 10.1622 12.4473 10.0369Z" fill="white"/>
                      <path d="M8.73442 6.50865L10.4354 7.18107V1.88462H19.5881L15.5366 4.08039C15.5366 4.08039 14.9799 4.32789 14.8562 4.51337C14.7324 4.69909 14.7324 4.91532 14.7324 5.78153V18.1521H10.4354V14.1547L8.73438 14.8271V19.0182C8.73438 19.0182 8.7963 19.822 9.81686 19.822H14.7324V22.8839C14.7324 22.8839 14.7944 24.1826 15.9077 23.7497L22.99 19.822C22.99 19.822 23.6392 19.6366 23.6392 18.7396V1.08057C23.6392 1.08057 23.6392 0.183855 22.526 0.183855H10.0335C10.0335 0.183855 8.73442 -0.0636919 8.73442 1.11165V6.50865Z" fill="white"/>
                    </svg>
                    Check In
                  </button>
                </div>
              </section>
            </div>
            <div className="ga__section__side">
              <IbeAdbar />
            </div>
          </section>
        )}
      </section>
    </BaseLayout>
  );
};

export default CheckInDetails;

export async function getServerSideProps(context) {
  return {
    props: {
      pnr: context.query.pnr ? context.query.pnr : "",
    },
  };
}
