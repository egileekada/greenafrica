import format from "date-fns/format";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { sessionSelector } from "redux/reducers/session";

const ManagePassengerItem = ({ passenger, paxIndex, Journey, index, setdata, checkin }) => {
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
                  <div className="trip__summary__item relative ">
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
                    <div className=" grid grid-cols-5 items-center gap-x-10 mt-[45px]">

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