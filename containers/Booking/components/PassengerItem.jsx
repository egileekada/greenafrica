import format from "date-fns/format";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { sessionSelector } from "redux/reducers/session";

const ManagePassengerItem = ({download, signature, passenger, paxIndex, Journey, index, setdata, checkin, sendBoardingPass, LoadingPass }) => {
  const { bookingResponse } = useSelector(sessionSelector);
  const [specials, setSpecials] = useState([]);

  useEffect(() => {
    const data = [];
    passenger.PassengerFees.filter((pax) => {
      return (
        pax.FeeCode === "HPRD" ||
        pax.FeeCode === "VPRD" ||
        pax.FeeCode === "WCHR"
      );
    }).map((_item) => {
      if (parseInt(data.indexOf(_item.FeeCode.toLowerCase())) > -1) {
      } else {
        data.push(_item.FeeCode.toLowerCase());
      }
    });
    setSpecials(data);
  }, [passenger]);



  const triggerDownloadBoardingPass = (
    id,
    departureStation,
    arrivalStation
  ) => {
    const data = {
      signature,
      recordLocator: bookingResponse?.Booking?.RecordLocator,
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
        // console.log(data.data.message);
        notification.success({
          message: "Success",
          description: data.data.message,
        });
      })
      .catch((error) => {

        // console.log("An Error Occured");
        notification.error({
          message: "Error",
          description: "An Error Occured",
        });
      });
  };

  const _Infants = passenger?.PassengerInfants;

  const _Seats =
    passenger &&
    passenger?.PassengerFees.filter((pax) => {
      return pax.FeeCode === "SEAT";
    });

  const _Baggages = passenger.PassengerFees.filter((pax) => {
    return (
      pax.FeeCode === "XBAG20" ||
      pax.FeeCode === "XBAG15" ||
      pax.FeeCode === "XBAG10"
    );
  });

  // console.log("_Specials", _Specials);

  return (
    <>
      {_Seats.length > 0
        ? bookingResponse?.Booking?.Journeys.map((_journey) => {
            return _journey?.Segments.map((_segment) => {
              return _segment?.PaxSeats[paxIndex]?.DepartureStation ? (
                <div className="w-full mt-8 ">
                  <div className="trip__summary__item relative !pb-0 !px-0 ">
                    <div className=" w-full bg-[#F3F3F7] h-[48px] flex items-center px-6 text-[#261F5E] font-bold rounded-t-md absolute top-0 inset-x-0 " > 
                      {checkin && (
                        <input
                          disabled={
                            Journey?.Segments[0]?.PaxSegments[paxIndex]
                              .LiftStatus ||
                            Journey?.PackageIndicator == 0
                          }
                          className="w-5 h-5 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 focus:ring-2 mr-3"
                          type="checkbox"
                          id={`passenger-${index}-${paxIndex}`}
                          value={passenger}
                          name={`passenger-${index}-${paxIndex}`}
                          onChange={(e) =>
                            setdata(e, passenger, index)
                          }
                        />
                      )}
                      {passenger?.Names[0]?.Title} {passenger?.Names[0]?.FirstName}
                      &nbsp;
                      {passenger?.Names[0]?.LastName}
                    </div> 
                    <div className="flex flex-row items-center gap-x-20  px-6 pt-3 pb-6 mt-[45px]">

                      {_Infants?.length > 0 && (
                        <div className=" flex items-center " >
                          <div className=" w-[53px] h-[53px] bg-[#9E9BBF2B] flex justify-center items-center " >
                            <svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M8.96232 14.3113C4.29723 14.3113 0.3125 15.0469 0.3125 17.9889C0.3125 20.932 4.27236 21.6935 8.96232 21.6935C13.6274 21.6935 17.6121 20.9591 17.6121 18.0159C17.6121 15.0728 13.6534 14.3113 8.96232 14.3113" fill="#26205E"/>
                              <path opacity="0.4" d="M8.96619 11.5089C12.144 11.5089 14.6902 8.96167 14.6902 5.78491C14.6902 2.60816 12.144 0.0609131 8.96619 0.0609131C5.78943 0.0609131 3.24219 2.60816 3.24219 5.78491C3.24219 8.96167 5.78943 11.5089 8.96619 11.5089" fill="#26205E"/>
                            </svg>
                          </div>
                          {passenger?.PassengerInfants.length
                            ? passenger?.PassengerInfants.map((_paxInfant) => {
                                return _paxInfant.Names.map((_infName) => {
                                  return (
                                  <div className=" ml-2 " >
                                    <p className=" text-[#26205E] font-bold " > 
                                      {_infName?.FirstName}&nbsp;
                                      {_infName?.LastName}
                                    </p>
                                    <p className=" text-[#5F5B82] mt-1 text-sm font-medium " >{format(new Date(_paxInfant?.DOB), "d MMMM, yyyy")}</p>
                                  </div>
                                );
                              });
                            })
                          : null}
                        </div>
                      )} 

                    {passenger?.PassengerTypeInfo?.PaxType.toLowerCase() === "chd" && ( 
                        <div>
                          <p className=" text-[#5F5996] text-sm font-medium " >DOB:</p> 
                          <p className=" text-[#261F5E] mt-1 font-bold ">
                            {passenger?.PassengerTypeInfos[0]?.DOB &&
                              format(
                                new Date(passenger?.PassengerTypeInfos[0]?.DOB),
                                "d MMMM, yyyy"
                              )}
                          </p>
                        </div>
                      )}

                      <div>
                        <p className=" text-[#5F5996] text-sm font-medium " >Status:</p>
                        <p className=" text-[#261F5E] mt-1 font-bold ">
                        {passenger?.PassengerTypeInfo?.PaxType === "ADT" ? "Adult": passenger?.PassengerTypeInfo?.PaxType  === "CHD" ? "Child": "Infant" }</p>
                      </div>

                      {_Seats.length > 0
                        ? bookingResponse?.Booking?.Journeys.map((_journey) => {
                            return _journey?.Segments.map((_segment) => { 
                              return _segment?.PaxSeats[paxIndex]?.DepartureStation ? ( 
                                <div>
                                  <p className=" text-[#5F5996] text-sm font-medium " >Seat No:</p>
                                  <p className=" text-[#261F5E] mt-1 font-bold ">{_segment?.PaxSeats[paxIndex]?.UnitDesignator+" "} ({" "}
                                    {`${_segment?.PaxSeats[paxIndex]?.DepartureStation} -  ${_segment?.PaxSeats[paxIndex]?.ArrivalStation}`}
                                    )
                                  </p>
                                </div> 
                              ) : null;
                            });
                          })
                        : null}

                      {specials && specials.length > 0 && (
                        <div>
                          <p className=" text-[#5F5996] text-sm font-medium " >SPECIAL ASSISTANCE</p>

                          {specials.map((_special) => {
                            return (
                              <p className=" text-[#261F5E] mt-1 font-bold ">
                                  {" "}
                                  {_special.toLowerCase() === "wchr"
                                    ? "Wheelchair"
                                    : _special.toLowerCase() === "hprd"
                                    ? "Hearing Impaired"
                                    : _special.toLowerCase() === "vprd"
                                    ? "Visually Impaired"
                                    : ""}
                              </p>
                            );
                          })}
                        </div>
                      )}

                      <div>
                        <p className=" text-[#5F5996] text-sm font-medium " >BAGGAGES</p> 
                        <p className=" text-[#261F5E] mt-1 font-bold ">{_Baggages?.length}</p>
                      </div>
                      {/* <section className="flex flex-col">
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
                      </section> */}
                    </div>
                    {download && (
                      <div className=" w-full flex justify-start border-[#0000001A] border-t  px-6 py-5 " >
                        <button
                          className="btn btn-primary !text-white md:mr-1 flex items-center basis-full md:basis-auto mb-3 md:mb-0"
                          onClick={() =>
                            triggerDownloadBoardingPass(
                              passenger.PassengerNumber,
                              Journey?.Segments[0]
                                ?.DepartureStation,
                              Journey?.Segments[0]
                                ?.ArrivalStation
                            )
                          }
                          disabled={LoadingPass}
                        >
                          <svg className=" mr-3 " width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 12C18.7348 12 18.4804 12.1054 18.2929 12.2929C18.1054 12.4804 18 12.7348 18 13V17C18 17.2652 17.8946 17.5196 17.7071 17.7071C17.5196 17.8946 17.2652 18 17 18H3C2.73478 18 2.48043 17.8946 2.29289 17.7071C2.10536 17.5196 2 17.2652 2 17V13C2 12.7348 1.89464 12.4804 1.70711 12.2929C1.51957 12.1054 1.26522 12 1 12C0.734784 12 0.48043 12.1054 0.292893 12.2929C0.105357 12.4804 0 12.7348 0 13V17C0 17.7956 0.316071 18.5587 0.87868 19.1213C1.44129 19.6839 2.20435 20 3 20H17C17.7956 20 18.5587 19.6839 19.1213 19.1213C19.6839 18.5587 20 17.7956 20 17V13C20 12.7348 19.8946 12.4804 19.7071 12.2929C19.5196 12.1054 19.2652 12 19 12ZM9.29 13.71C9.3851 13.801 9.49725 13.8724 9.62 13.92C9.7397 13.9729 9.86913 14.0002 10 14.0002C10.1309 14.0002 10.2603 13.9729 10.38 13.92C10.5028 13.8724 10.6149 13.801 10.71 13.71L14.71 9.71C14.8983 9.5217 15.0041 9.2663 15.0041 9C15.0041 8.7337 14.8983 8.4783 14.71 8.29C14.5217 8.1017 14.2663 7.99591 14 7.99591C13.7337 7.99591 13.4783 8.1017 13.29 8.29L11 10.59V1C11 0.734784 10.8946 0.48043 10.7071 0.292893C10.5196 0.105357 10.2652 0 10 0C9.73478 0 9.48043 0.105357 9.29289 0.292893C9.10536 0.48043 9 0.734784 9 1V10.59L6.71 8.29C6.61676 8.19676 6.50607 8.1228 6.38425 8.07234C6.26243 8.02188 6.13186 7.99591 6 7.99591C5.86814 7.99591 5.73757 8.02188 5.61575 8.07234C5.49393 8.1228 5.38324 8.19676 5.29 8.29C5.19676 8.38324 5.1228 8.49393 5.07234 8.61575C5.02188 8.73757 4.99591 8.86814 4.99591 9C4.99591 9.13186 5.02188 9.26243 5.07234 9.38425C5.1228 9.50607 5.19676 9.61676 5.29 9.71L9.29 13.71Z" fill="white"/>
                          </svg>
                          Download Boarding Pass
                        </button>

                          <button
                            className="btn btn-outline ml-3 flex items-center basis-full md:basis-auto"
                            onClick={() =>
                              triggerEmailBoardingPass(
                                passenger.PassengerNumber,
                                Journey?.Segments[0]
                                  ?.DepartureStation,
                                Journey?.Segments[0]
                                  ?.ArrivalStation
                              )
                            }
                            disabled={LoadingPass}
                          >
                            <svg className=" mr-3 fill-current " width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M18 0H2C0.9 0 0.00999999 0.9 0.00999999 2L0 14C0 15.1 0.9 16 2 16H18C19.1 16 20 15.1 20 14V2C20 0.9 19.1 0 18 0ZM17.6 4.25L10.53 8.67C10.21 8.87 9.79 8.87 9.47 8.67L2.4 4.25C2.15 4.09 2 3.82 2 3.53C2 2.86 2.73 2.46 3.3 2.81L10 7L16.7 2.81C17.27 2.46 18 2.86 18 3.53C18 3.82 17.85 4.09 17.6 4.25Z"/>
                            </svg>
                            Email Boarding Pass
                          </button>
                      </div>
                    )}
                  </div>
                </div>
          ) : null;
        });
      })
    : null}
    </>
  );
};

export default ManagePassengerItem;



{/* <div className="flex flex-col ibe__trip__item checkinView pt-0 rounded-none">
<div className="flex items-center justify-between w-full px-6 py-4 rounded-lg border mb-2">
  <div className="flex items-center primary-checkbox">
    <p className="check-label">
      <h3 className="font-header font-bold text-sm ">
        {passenger?.Names[0]?.Title} {passenger?.Names[0]?.FirstName}
        &nbsp;
        {passenger?.Names[0]?.LastName} ({" "}
        {passenger?.PassengerTypeInfo?.PaxType})
      </h3>
    </p>
  </div>
</div>
<div className="trip-details">
  {_Seats.length > 0
    ? bookingResponse?.Booking?.Journeys.map((_journey) => {
        return _journey?.Segments.map((_segment) => {
          return _segment?.PaxSeats[paxIndex]?.DepartureStation ? (
            <div className="trip-details-item">
              <h6>
                SEAT NUMBER{" "}
                <span className="text-xs">
                  {" "}
                  ({" "}
                  {`${_segment?.PaxSeats[paxIndex]?.DepartureStation} -  ${_segment?.PaxSeats[paxIndex]?.ArrivalStation}`}
                  )
                </span>
              </h6>
              <h5 className="flex items-center">
                <span>
                  {_segment?.PaxSeats[paxIndex]?.UnitDesignator}
                </span>
              </h5>
            </div>
          ) : null;
        });
      })
    : null}

  <div className="trip-details-item">
    <h6>BAGGAGES</h6>
    <h5 className="flex items-center">
      <span>{_Baggages?.length}</span>
    </h5>
  </div>

  {passenger?.PassengerTypeInfo?.PaxType.toLowerCase() === "chd" && (
    <div className="trip-details-item">
      <h6>DOB</h6>
      <h5 className="flex items-center">
        <span>
          {passenger?.PassengerTypeInfos[0]?.DOB &&
            format(
              new Date(passenger?.PassengerTypeInfos[0]?.DOB),
              "d MMMM, yyyy"
            )}
        </span>
      </h5>
    </div>
  )}

  {_Infants?.length > 0 && (
    <div className="trip-details-item">
      <h6>INFANTS</h6>
      <h5 className="flex items-center">
        {" "}
        {passenger?.PassengerInfants.length
          ? passenger?.PassengerInfants.map((_paxInfant) => {
              return _paxInfant.Names.map((_infName) => {
                return (
                  <span>
                    {_infName?.FirstName}&nbsp;
                    {_infName?.LastName} ({" "}
                    {format(new Date(_paxInfant?.DOB), "d MMMM, yyyy")})
                  </span>
                );
              });
            })
          : null}
      </h5>
    </div>
  )}

  {specials && specials.length > 0 && (
    <div className="trip-details-item">
      <h6>SPECIAL ASSISTANCE</h6>

      {specials.map((_special) => {
        return (
          <h5 className="flex items-center">
            <span>
              {" "}
              {_special.toLowerCase() === "wchr"
                ? "Wheelchair"
                : _special.toLowerCase() === "hprd"
                ? "Hearing Impaired"
                : _special.toLowerCase() === "vprd"
                ? "Visually Impaired"
                : ""}
            </span>
          </h5>
        );
      })}
    </div>
  )}
</div>
</div> */}