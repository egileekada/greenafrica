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
import ManagePassengerItem from "containers/Booking/components/PassengerItem";
import IbeAdbar from "containers/IbeAdbar";
import { notification } from "antd";

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

  function initSession(pnr) {
    console.log("pnr in initSession =>", pnr);
    if (pnr) {
      console.log("pnr in check block =>", pnr);
      dispatch(setCheckinPNR(pnr));
      dispatch(GetBookingDetailsWithPNR({ pnr: pnr }));
      dispatch(resetSelectedPassengers());
    }
  }

  useEffect(() => {
    if (router.isReady) {
      //check if pnr is encrypted
      console.log("bookingId =>", bookingId);
      if (bookingId !== undefined) {
        console.log("decryption in useEffect =>", decryptPnr(bookingId));
        initSession(decryptPnr(bookingId));
      } else if (!props.pnr) {
        router.push("/checkin");
      } else {
        initSession(props.pnr);
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


  const TripHeader = () => {
    return (
      <section className="bg-[#26205e] pt-10 lg:pt-5 pb-10 text-white justify-between flex lg:items-center relative px-4 ">
        <div className=" flex items-center " >
          <figure className="flightCircle">
            <FlightIcon />
          </figure>
          <div className=" ml-3 " >
            <p className=" font-bold text-2xl  " >Check In</p>
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
            {/* {bookingResponse?.Booking?.Journeys.length-1 === journeyIndex && (
              <div className=" w-full py-2 " >
                <PageCTA />
              </div>
            )} */}
          </section>
        </>
      );
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
          <section className="ga__section relative bg-[#f4f4f4]">
            <div className=" w-full absolute inset-x-0 h-[200px] top-0 z-10 bg-[#26205E] "  />
            <div className="ga__section__main relative z-20 ">
              {/* <div className="mb-8 mt-16 xlg:mt-0">
                <h2 className="text-black font-bold text-2xl mb-2">Check In</h2>
                <p>
                  Kindly confirm that the information below is correct before
                  checking in
                </p>
              </div> */}

              <section className="flex flex-col bg-white pb-24">
                <TripHeader />
                {/* TripHeader */}
                {/* <section className="ibe__flight__info__destination">
                  <p className="text-normal">
                    Booking Code: {bookingResponse?.Booking?.RecordLocator}
                  </p>
                  <figure className="flightCircle">
                    <FlightIcon />
                  </figure>
                </section> */}
                <div>

                {/* {bookingResponse?.Booking?.Passengers.map((_pax, _paxIndex) => {
                  return (
                    <ManagePassengerItem passenger={_pax} paxIndex={_paxIndex} />
                  );
                })} */}
                </div>
              </section>
            </div>
            <div className="ga__section__side relative z-20 mr-8 ">
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




// {bookingResponse?.Booking?.Journeys?.length > 0 ? (
//   <>
//     {bookingResponse?.Booking?.Journeys.map((_journey, _index) => (
//       <SingleJourneyItem journey={_journey} journeyIndex={_index} />
//     ))}
//     </>
// ) : (
//   <p className="errorText">No Journeys</p>
// )}

// {bookingResponse?.Booking?.Journeys.map((Journey, index) => (
//   <div key={index}>
//     <div className="mx-6">
//       <h3 className="title-text">
//         DEPARTURE:{" "}
//         {bookingResponse &&
//           format(
//             new Date(
//               bookingResponse ? Journey?.Segments[0].STD : ""
//             ),
//             "MMMM dd, yyyy"
//           )}
//       </h3>
//     </div>
//     <section
//       className="ibe__trip__item checkinView bordered mx-6 my-3"
//       key={index}
//     >
//       <p className="bg-primary-main text-green py-1 px-4 rounded-[4px] absolute left-6 top-5">
//         {!productsLoading &&
//           fare_name(Journey?.Segments[0].Fares[0].ProductClass)}
//       </p>
//       <div className="basis-full lg:basis-[60%] w-full flex flex-col min-h-[54px] px-6 mb-10 mt-5">
//         <p className="tripType self-center">
//           {Journey?.Segments[0]?.FlightDesignator.CarrierCode}
//           {Journey?.Segments[0]?.FlightDesignator.FlightNumber}
//         </p>
//         <div className="flex justify-between">
//           <div className="flex flex-col">
//             <h5 className="tripType">
//               {bookingResponse &&
//                 format(
//                   new Date(Journey.Segments[0].STD),
//                   "HH:mm"
//                 )}
//             </h5>
//             <p className="tripCity">
//               {!locationLoading &&
//                 resolveAbbreviation(
//                   Journey?.Segments[0]?.DepartureStation
//                 )}
//             </p>
//           </div>
//           <div className="tripIconPath">
//             <DottedLine className="dotted-svg" />
//             <AeroIcon className="aero-svg" />
//             <DottedLine className="dotted-svg" />
//           </div>
//           <div className="flex flex-col  items-end">
//             <h5 className="tripType right-text">
//               {bookingResponse &&
//                 format(
//                   new Date(Journey.Segments[0].STA),
//                   "HH:mm"
//                 )}
//             </h5>
//             <p className="tripCity right-text">
//               {!locationLoading &&
//                 resolveAbbreviation(
//                   Journey?.Segments[0]?.ArrivalStation
//                 )}
//             </p>
//           </div>
//         </div>
//         <p className="tripTime self-center">
//           {bookingResponse &&
//             timeConvert(
//               differenceInMinutes(
//                 new Date(Journey?.Segments[0]?.STA),
//                 new Date(Journey?.Segments[0]?.STD)
//               )
//             )}
//         </p>
//       </div>
//     </section>

//     <section className="mx-6">
//       <h3 className="title-text no-mb">PASSENGERS</h3>
//     </section>

//     {bookingResponse?.Booking?.Passengers.map(
//       (passenger, pIndex) => (
//         <section
//           className="ibe__trip__passengers checkinView mx-6 mb-3"
//           key={pIndex}
//         >
//           <div className="md:flex bordered p-4">
//             <div className="flex items-center w-full">
//               <label
//                 htmlFor={`passenger-${index}-${pIndex}`}
//                 className={`${
//                   (Journey?.Segments[0]?.PaxSegments[pIndex]
//                     ?.LiftStatus === 1 ||
//                     Journey?.PackageIndicator == 0) &&
//                   "text-gray-300"
//                 } ml-2 text-lg font-semibold capitalize w-full flex items-center`}
//               >
//                 <input
//                   disabled={
//                     Journey?.Segments[0]?.PaxSegments[pIndex]
//                       .LiftStatus ||
//                     Journey?.PackageIndicator == 0
//                   }
//                   className="w-5 h-5 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 focus:ring-2 mr-3"
//                   type="checkbox"
//                   id={`passenger-${index}-${pIndex}`}
//                   value={passenger}
//                   name={`passenger-${index}-${pIndex}`}
//                   onChange={(e) =>
//                     addPassengers(e, passenger, index)
//                   }
//                 />
//                 {passenger.Names[0].FirstName}{" "}
//                 {passenger.Names[0].LastName}{" "}
//               </label>
//             </div>
//           </div>

//           <div className="trip-details">
//             <div className="trip-details-item">
//               <h6>SEAT NUMBER</h6>
//               {Journey.Segments[0].PaxSeats.length > 0 ? (
//                 <h5 className="flex items-center text-center">
//                   <span>
//                     {
//                       Journey.Segments[0].PaxSeats.filter(
//                         (seat) =>
//                           seat.PassengerNumber ==
//                           passenger.PassengerNumber
//                       )[0]?.UnitDesignator
//                     }
//                   </span>
//                 </h5>
//               ) : (
//                 <h5 className="flex items-center">
//                   <span>None</span>
//                 </h5>
//               )}
//             </div>
//             {Journey.Segments[0].PaxSSRs.length > 0 && (
//               <>
//                 {PassengerBags(
//                   Journey.Segments[0].PaxSSRs,
//                   passenger.PassengerNumber
//                 )}
//               </>
//             )}
//             {Journey.Segments[0].PaxSSRs.length > 0 && (
//               <>
//                 {SpecialAssistance(
//                   Journey.Segments[0].PaxSSRs,
//                   passenger.PassengerNumber
//                 )}
//               </>
//             )}

//             {Journey?.Segments[0]?.PaxSegments[pIndex]
//               ?.LiftStatus === 1 && (
//               <>
//                 <div className="flex flex-wrap md:flex-nowrap items-center justify-between ml-auto">
//                   <button
//                     className="btn btn-primary md:mr-1 basis-full md:basis-auto mb-3 md:mb-0"
//                     onClick={() =>
//                       triggerDownloadBoardingPass(
//                         passenger.PassengerNumber,
//                         Journey?.Segments[0]?.DepartureStation,
//                         Journey?.Segments[0]?.ArrivalStation
//                       )
//                     }
//                     disabled={isLoading}
//                   >
//                     Download Boarding Pass
//                   </button>
//                   <button
//                     className="btn btn-outline  basis-full md:basis-auto"
//                     onClick={() =>
//                       triggerEmailBoardingPass(
//                         passenger.PassengerNumber,
//                         Journey?.Segments[0]?.DepartureStation,
//                         Journey?.Segments[0]?.ArrivalStation
//                       )
//                     }
//                     disabled={isLoading}
//                   >
//                     Email Boarding Pass
//                   </button>
//                 </div>
//               </>
//             )}
//           </div>
//         </section>
//       )
//     )}
//   </div>
// ))}
// {/* Checkin Info*/}
// <div className="flex mx-6 mt-5">
//   <button
//     className="btn btn-primary"
//     disabled={passengers.length < 1}
//     onClick={tryCheckIn}
//   >
//     Check In
//   </button>
// </div>