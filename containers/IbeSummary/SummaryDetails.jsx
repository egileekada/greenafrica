/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { sessionSelector } from "redux/reducers/session";
import ProfileIcon from "assets/svgs/profile.svg";
import { capitalizeFirstLetter } from "lib/utils";
import ManagePassengerItem from "containers/Booking/components/PassengerItem";
import {
  useGetProductsQuery,
  useGetPaymentConfigsQuery,
} from "services/widgetApi.js";
import format from "date-fns/format";

const SummaryDetails = ({ isRoundTrip }) => {
  const { data: products, isLoading } = useGetProductsQuery();
  const { data: paymentConfigs, isLoading: paymentConfigLoading } =
    useGetPaymentConfigsQuery();

  const { bookingResponse } = useSelector(sessionSelector);
  const [passengerInfo, setPassengerInfo] = useState(null);

  useEffect(() => {
    if (bookingResponse) {
      let _info = {};
      bookingResponse?.Booking?.Passengers.map((_passenger) => {
        _passenger?.Names.map((_name) => {
          _info = {
            ..._name,
          };
        });
      });
      setPassengerInfo({
        ..._info,
      });
    }
  }, [bookingResponse]);

  const fare_name = (value) => {
    const [{ name }] = products?.data?.items.filter(
      (product) => product.code === value
    );
    return `${name}`;
  };

  const resolvePaymnet = (abrreviation) => {
    const chosen = paymentConfigs?.data?.items.filter(
      (location) => location.code === abrreviation
    );

    return chosen?.length > 0 ? chosen[0]?.name : ``;
  };

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

  const PassengerContact = () => {
    return (
      
      <>
        {bookingResponse?.Booking?.BookingContacts?.map((_contact) => {
          return ( 
            <div className=" w-full ">
              <div className="trip__summary__item relative "> 
                <div className=" w-full bg-[#F3F3F7] h-[48px] flex items-center px-6 text-[#261F5E] font-bold rounded-t-md absolute top-0 inset-x-0 " >
                  Contact Details
                </div>
                {/* <h2 className="trip-title mb-2 font-semibold text-primary-main">
                  CONTACT DETAILS
                </h2> */}
                <div className="flex flex-col mt-[45px]">
                  <section className="flex flex-col ">
                    {bookingResponse?.Booking?.BookingContacts?.map((_contact) => {
                      return (
                        <>
                          <div className=" grid lg:grid-cols-3 grid-cols-1 gap-4 " >
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
          );
        })}
      </>
    );
  };

  const PassengerInfos = () => { 
    return (
      
      <>
        {bookingResponse?.Booking?.BookingContacts?.map((_passenger, paxIndex) => {
          const _Infants = _passenger?.PassengerFees?.filter((pax) => {
            return pax.FeeCode === "INFT";
          });

          const _Baggages = _passenger?.PassengerFees?.filter((pax) => {
            return (
              pax.FeeCode === "XBAG20" ||
              pax.FeeCode === "XBAG15" ||
              pax.FeeCode === "XBAG10"
            );
          });
          console.log(_passenger);
          const _Seats = _passenger?.PassengerFees?.filter((pax) => {
            return pax.FeeCode === "SEAT";
          }); 

          return ( 
            <> 
              {bookingResponse?.Booking?.Passengers.map((_pax, _paxIndex) => {
                return (
                  <ManagePassengerItem passenger={_pax} paxIndex={_paxIndex} />
                );
              })}
            </>
            // <div className=" w-full mt-6 ">
            //   <div className="trip__summary__item relative "> 
            //     <div className=" w-full bg-[#F3F3F7] h-[48px] flex items-center px-6 text-[#261F5E] font-bold rounded-t-md absolute top-0 inset-x-0 " >
            //       Passenger: {_passenger?.Names[paxIndex]?.FirstName} {_passenger?.Names[paxIndex]?.LastName}
            //     </div> 
            //     <div className="flex flex-col mt-[45px]">
            //       <section className="flex lg:flex-row w-full flex-col gap-4 ">
            //         {bookingResponse?.Booking?.BookingContacts?.map((_contact) => { 
            //           return (
            //             <>
            //               <div className=" flex items-center " >

            //                 {_passenger?.PassengerInfants?.length
            //                  ? _passenger?.PassengerInfants.map((_paxInfant) => {
            //                      return _paxInfant.Names.map((_infName) => {
            //                        return (
            //                         <div className=" flex items-center " >
            //                           <div className=" w-[53px] h-[53px] bg-[#9E9BBF2B] flex justify-center items-center " >
            //                             <svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            //                               <path d="M8.96232 14.3113C4.29723 14.3113 0.3125 15.0469 0.3125 17.9889C0.3125 20.932 4.27236 21.6935 8.96232 21.6935C13.6274 21.6935 17.6121 20.9591 17.6121 18.0159C17.6121 15.0728 13.6534 14.3113 8.96232 14.3113" fill="#26205E"/>
            //                               <path opacity="0.4" d="M8.96619 11.5089C12.144 11.5089 14.6902 8.96167 14.6902 5.78491C14.6902 2.60816 12.144 0.0609131 8.96619 0.0609131C5.78943 0.0609131 3.24219 2.60816 3.24219 5.78491C3.24219 8.96167 5.78943 11.5089 8.96619 11.5089" fill="#26205E"/>
            //                             </svg>
            //                           </div>
            //                           <div className=" ml-2 " >
            //                             <p className=" text-[#5F5B82] text-sm font-medium " >Infant</p>
            //                             <p className=" text-[#26205E] font-bold mt-1 " >{`${_infName?.FirstName} ${_infName?.LastName}`}</p>
            //                           </div>
            //                         </div>
            //                        );
            //                      });
            //                    })
            //                  : null}

            //                 <div className=" " > 
            //                     <p className=" text-[#5F5B82] text-sm font-medium " >Type</p>
            //                     <p className=" text-[#26205E] font-bold mt-1 " >{_passenger?.PassengerTypeInfo?.PaxType === "ADT"
            //                       ? "ADULT"
            //                       : _passenger?.PassengerTypeInfo?.PaxType === "CHD"
            //                       ? "CHILD"
            //                       : "INFANT"}</p> 
            //                 </div>

            //               {_Seats?.length > 0
            //                 ? bookingResponse?.Booking?.Journeys?.map((_journey) => {
            //                     return _journey?.Segments?.map((_segment) => {
            //                       return ( 
            //                         <div className=" " > 
            //                             <p className=" text-[#5F5B82] text-sm font-medium " >Seat No</p>
            //                             <p className=" text-[#26205E] font-bold mt-1 " > 
            //                               {_segment?.PaxSeats[paxIndex]?.DepartureStation ? (
            //                                 <h6>
            //                                   Seat{_Seats.length > 1 ? "s" : ""}
            //                                   &nbsp;&nbsp;&nbsp; ({" "}
            //                                   {`${_segment?.PaxSeats[paxIndex]?.DepartureStation} -  ${_segment?.PaxSeats[paxIndex]?.ArrivalStation}`}
            //                                   ):
            //                                 </h6>
            //                               ) : null}
            //                             </p> 
            //                             <p className=" text-[#26205E] font-bold mt-1 " >{_segment?.PaxSeats[paxIndex]?.UnitDesignator}</p> 
            //                         </div> 
            //                       );
            //                     });
            //                   })
            //                 : null} 
            //               </div> 
            //             </>
            //           );
            //         })} 
            //         <div className=" " > 
            //           <p className=" text-[#5F5B82] text-sm font-medium " >
            //             Baggage{_Baggages?.length > 1 ? "s" : ""} 
            //           </p>
            //           <p className=" text-[#26205E] font-bold mt-1 " >

            //             {_Baggages?.length > 1
            //               ? `${_Baggages?.length} Bag${_Baggages?.length > 1 && "s"}`
            //               : _Baggages?.length === 1
            //               ? `${_Baggages?.length} Bag`
            //               : "No Baggage"}
            //           </p> 
            //         </div>
            //       </section>
            //     </div>
            //   </div>
            // </div> 
          );
        })}
      </>
    );
    // return (
    //   <>
    //     {bookingResponse?.Booking?.Passengers?.map((_passenger, paxIndex) => {
    //       const _Infants = _passenger.PassengerFees.filter((pax) => {
    //         return pax.FeeCode === "INFT";
    //       });

    //       const _Baggages = _passenger.PassengerFees.filter((pax) => {
    //         return (
    //           pax.FeeCode === "XBAG20" ||
    //           pax.FeeCode === "XBAG15" ||
    //           pax.FeeCode === "XBAG10"
    //         );
    //       });

    //       {
    //         /* const _Seats = _passenger.PassengerFees.filter((pax) => {
    //         return pax.FeeCode === "SEAT";
    //       }); */
    //       }

    //       const _Seats = _passenger.PassengerFees.filter((pax) => {
    //         return pax.FeeCode === "SEAT";
    //       });

    //       return (
    //         <section className="flex flex-col border-t border-t-details__border py-3 mb-3">
    //           <h2 className="font-bold text-primary-main font-display text-[10px]  mb-4">
    //             PASSENGER {paxIndex + 1}:
    //           </h2>

    //           <div className="flex mb-3">
    //             <div className="flex flex-col w-[53px] mr-4">
    //               <div className="bg-purple-light h-[50px] rounded-t-[3px] flex justify-center items-center">
    //                 <ProfileIcon />
    //               </div>
    //             </div>
    //             <div className="flex flex-col">
    //               {_passenger.Names.map((_name) => {
    //                 return (
    //                   <h5 className="text-sm font-extrabold text-primary-main font-display mb-[6px]">
    //                     {capitalizeFirstLetter(_name?.Title)}
    //                     &nbsp;
    //                     {capitalizeFirstLetter(_name?.FirstName)}
    //                     &nbsp;
    //                     {capitalizeFirstLetter(_name?.LastName)}
    //                   </h5>
    //                 );
    //               })}
    //               <h6 className="text-[12px] font-normal text-[#5F5B82] font-title">
    //                 {capitalizeFirstLetter(_passenger?.EmailAddress)}
    //               </h6>
    //               <h6 className="text-[10px] font-normal text-[#5F5B82] font-title">
    //                 {_passenger?.PassengerTypeInfo?.PaxType === "ADT"
    //                   ? "ADULT"
    //                   : _passenger?.PassengerTypeInfo?.PaxType === "CHD"
    //                   ? "CHILD"
    //                   : "INFANT"}
    //               </h6>

    //               {_passenger?.PassengerTypeInfo?.PaxType === "CHD" && (
    //                 <h6 className="text-[10px] font-normal text-[#5F5B82] font-title">
    //                   DOB
    //                 </h6>
    //               )}

    //               {/* {_passenger?.PassengerInfants.length
    //                 ? _passenger?.PassengerInfants.map((_paxInfant) => {
    //                     return _paxInfant.Names.map((_infName) => {
    //                       return (
    //                         <h6 className="text-[10px] font-normal text-[#5F5B82] font-title">
    //                           {_infName?.FirstName}&nbsp;
    //                           {_infName?.LastName}
    //                         </h6>
    //                       );
    //                     });
    //                   })
    //                 : null} */}
    //             </div>
    //           </div>
    //           {_Infants.length > 0 ? (
    //             <div className="trip__summary__details">
    //               <div className="f-1">
    //                 <h5>Infant{_Infants.length > 1 ? "s" : ""}:</h5>
    //               </div>
    //               <div className="f-1">
    //                 {/* <h6>{_Infants.length}</h6> */}
    //                 {_passenger?.PassengerInfants.length
    //                   ? _passenger?.PassengerInfants.map((_paxInfant) => {
    //                       return _paxInfant.Names.map((_infName) => {
    //                         return (
    //                           <h6>
    //                             {_infName?.FirstName}&nbsp;
    //                             {_infName?.LastName} ({" "}
    //                             {format(
    //                               new Date(_paxInfant?.DOB),
    //                               "d MMMM, yyyy"
    //                             )}
    //                             )
    //                           </h6>
    //                         );
    //                       });
    //                     })
    //                   : null}
    //               </div>
    //             </div>
    //           ) : null}
    //           <div className="trip__summary__details">
    //             <div className="f-1">
    //               <h6>Baggage{_Baggages.length > 1 ? "s" : ""}:</h6>
    //             </div>
    //             <div className="f-1">
    //               <h6>
    //                 {_Baggages.length > 1
    //                   ? `${_Baggages.length} Bag${_Baggages.length > 1 && "s"}`
    //                   : _Baggages.length === 1
    //                   ? `${_Baggages.length} Bag`
    //                   : "No Baggage"}
    //               </h6>
    //             </div>
    //           </div>

    //           {_passenger?.PassengerTypeInfo?.PaxType === "CHD" && (
    //             <div className="trip__summary__details">
    //               <div className="f-1">
    //                 <h6>Dob:</h6>
    //               </div>
    //               <div className="f-1">
    //                 <h6>
    //                   {_passenger?.PassengerTypeInfos[0]?.DOB &&
    //                     format(
    //                       new Date(_passenger?.PassengerTypeInfos[0]?.DOB),
    //                       "d MMMM, yyyy"
    //                     )}
    //                 </h6>
    //               </div>
    //             </div>
    //           )}

    //           {_Seats.length > 0
    //             ? bookingResponse?.Booking?.Journeys.map((_journey) => {
    //                 return _journey?.Segments.map((_segment) => {
    //                   return (
    //                     <div className="trip__summary__details">
    //                       <div className="f-1">
    //                         {_segment?.PaxSeats[paxIndex]?.DepartureStation ? (
    //                           <h6>
    //                             Seat{_Seats.length > 1 ? "s" : ""}
    //                             &nbsp;&nbsp;&nbsp; ({" "}
    //                             {`${_segment?.PaxSeats[paxIndex]?.DepartureStation} -  ${_segment?.PaxSeats[paxIndex]?.ArrivalStation}`}
    //                             ):
    //                           </h6>
    //                         ) : null}
    //                       </div>
    //                       <div className="f-1">
    //                         <h6>
    //                           {_segment?.PaxSeats[paxIndex]?.UnitDesignator}
    //                         </h6>
    //                       </div>
    //                     </div>
    //                   );
    //                 });
    //               })
    //             : null}
    //         </section>
    //       );
    //       {
    //         /* ); */
    //       }
    //     })}
    //   </>
    // );
  };

  const PaymentDetails = () => {
    return (
      <>
        {bookingResponse?.Booking?.Payments?.map((_payment) => {
          return (
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
                        </>
                      );
                    })}
                  </section>
                </div>
              </div>
            </div>
            // <section className="flex flex-col border-t border-t-details__border py-3 mb-3">
            //   <h2 className="trip-title mb-2 font-semibold text-primary-main">
            //     PAYMENT DETAILS
            //   </h2>
            //   <div className="flex flex-col">
            //     <section className="flex flex-col">
            //       {bookingResponse?.Booking?.Payments?.map((_payment) => {
            //         return (
            //           <>
            //             <div className="trip__summary__details">
            //               <div className="f-1">
            //                 <h5>Type:</h5>
            //               </div>
            //               <div className="f-1">
            //                 <h6>
            //                   {paymentConfigs &&
            //                     resolvePaymnet(_payment?.PaymentMethodCode)}
            //                 </h6>
            //               </div>
            //             </div>
            //             <div className="trip__summary__details">
            //               <div className="f-1">
            //                 <h5>Date:</h5>
            //               </div>
            //               <div className="f-1">
            //                 <h6>
            //                   {format(
            //                     new Date(_payment?.ApprovalDate),
            //                     "d MMMM yyyy"
            //                   )}
            //                 </h6>
            //               </div>
            //             </div>
            //             {/* 28 October 2022 */}
            //             <div className="trip__summary__details">
            //               <div className="f-1">
            //                 <h5>Status:</h5>
            //               </div>
            //               <div className="f-1">
            //                 <h6>{formatPaymentStatus(_payment?.Status)}</h6>
            //               </div>
            //             </div>
            //             <div className="trip__summary__details">
            //               <div className="f-1">
            //                 <h5>Total Fare:</h5>
            //               </div>
            //               <div className="f-1">
            //                 <h6>
            //                   ₦{_payment?.PaymentAmount?.toLocaleString("NGN")}
            //                 </h6>
            //               </div>
            //             </div>
            //           </>
            //         );
            //       })}
            //     </section>
            //   </div>
            // </section>
          );
        })}
      </>
    );
  };

  const Payment = () => {
    return (
      <section className="mx-6 mt-6 flex justify-between">
        <div className="basis-full">
          <div className="trip__summary__item">
            <h2 className="trip-title mb-2 font-semibold text-primary-main">
              PAYMENT DETAILS
            </h2>
            <div className="flex flex-col">
              <section className="flex flex-col">
                {bookingResponse?.Booking?.Payments?.map((_payment) => {
                  return (
                    <>
                      <div className="trip__summary__details">
                        <div className="f-1">
                          <h5>Type:</h5>
                        </div>
                        <div className="f-1">
                          <h6>
                            {paymentConfigs &&
                              resolvePaymnet(_payment?.PaymentMethodCode)}
                          </h6>
                        </div>
                      </div>
                      <div className="trip__summary__details">
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
                      </div>
                      {/* 28 October 2022 */}
                      <div className="trip__summary__details">
                        <div className="f-1">
                          <h5>Status:</h5>
                        </div>
                        <div className="f-1">
                          <h6>{formatPaymentStatus(_payment?.Status)}</h6>
                        </div>
                      </div>
                      <div className="trip__summary__details">
                        <div className="f-1">
                          <h5>Total Fare:</h5>
                        </div>
                        <div className="f-1">
                          <h6>
                            ₦{_payment?.PaymentAmount?.toLocaleString("NGN")}
                          </h6>
                        </div>
                      </div>
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

  return (
    <div className=""> 
      <div className="flex flex-col">
        <PassengerContact />

        <section className="flex flex-col mt-3">
          <PassengerInfos />
        </section>

        <section className="flex mb-12 flex-col ">
          <PaymentDetails />
        </section>

        {/*  <div className="trip__summary__details">
          <div className="f-1">
            <h5>Seat Number:</h5>
          </div>
          <div className="f-1">
            <h6>2A</h6>
          </div>
        </div> */}
      </div>
    </div>
  );
};

SummaryDetails.defaultProps = {
  isRoundTrip: false,
};

export default SummaryDetails;
