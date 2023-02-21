/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { sessionSelector } from "redux/reducers/session";
import ProfileIcon from "assets/svgs/profile.svg";
import { capitalizeFirstLetter } from "lib/utils";
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
            <div className="flex mb-6">
              <div className="flex flex-col w-[53px] mr-4">
                <div className="bg-purple-light h-[50px] rounded-t-[3px] flex justify-center items-center">
                  <ProfileIcon />
                </div>
              </div>
              <div className="flex flex-col">
                {_contact.Names.map((_name) => {
                  return (
                    <h5 className="text-sm font-extrabold text-primary-main font-display mb-[6px]">
                      {capitalizeFirstLetter(_name?.Title)}
                      &nbsp;
                      {capitalizeFirstLetter(_name?.FirstName)}
                      &nbsp;
                      {capitalizeFirstLetter(_name?.LastName)}
                    </h5>
                  );
                })}

                <h6 className="text-[12px] font-normal text-[#5F5B82] font-title">
                  {capitalizeFirstLetter(_contact?.EmailAddress)}
                </h6>
                <h6 className="text-[12px] font-normal text-[#5F5B82] font-title">
                  {capitalizeFirstLetter(_contact?.HomePhone)}
                </h6>
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
        {bookingResponse?.Booking?.Passengers?.map((_passenger, paxIndex) => {
          const _Infants = _passenger.PassengerFees.filter((pax) => {
            return pax.FeeCode === "INFT";
          });

          const _Baggages = _passenger.PassengerFees.filter((pax) => {
            return (
              pax.FeeCode === "XBAG20" ||
              pax.FeeCode === "XBAG15" ||
              pax.FeeCode === "XBAG10"
            );
          });

          {
            /* const _Seats = _passenger.PassengerFees.filter((pax) => {
            return pax.FeeCode === "SEAT";
          }); */
          }

          const _Seats = _passenger.PassengerFees.filter((pax) => {
            return pax.FeeCode === "SEAT";
          });

          return (
            <section className="flex flex-col border-t border-t-details__border py-3 mb-3">
              <h2 className="font-bold text-primary-main font-display text-[10px]  mb-4">
                PASSENGER {paxIndex + 1}:
              </h2>

              <div className="flex mb-3">
                <div className="flex flex-col w-[53px] mr-4">
                  <div className="bg-purple-light h-[50px] rounded-t-[3px] flex justify-center items-center">
                    <ProfileIcon />
                  </div>
                </div>
                <div className="flex flex-col">
                  {_passenger.Names.map((_name) => {
                    return (
                      <h5 className="text-sm font-extrabold text-primary-main font-display mb-[6px]">
                        {capitalizeFirstLetter(_name?.Title)}
                        &nbsp;
                        {capitalizeFirstLetter(_name?.FirstName)}
                        &nbsp;
                        {capitalizeFirstLetter(_name?.LastName)}
                      </h5>
                    );
                  })}
                  <h6 className="text-[12px] font-normal text-[#5F5B82] font-title">
                    {capitalizeFirstLetter(_passenger?.EmailAddress)}
                  </h6>
                  <h6 className="text-[10px] font-normal text-[#5F5B82] font-title">
                    {_passenger?.PassengerTypeInfo?.PaxType === "ADT"
                      ? "ADULT"
                      : _passenger?.PassengerTypeInfo?.PaxType === "CHD"
                      ? "CHILD"
                      : "INFANT"}
                  </h6>

                  {_passenger?.PassengerTypeInfo?.PaxType === "CHD" && (
                    <h6 className="text-[10px] font-normal text-[#5F5B82] font-title">
                      DOB
                    </h6>
                  )}

                  {/* {_passenger?.PassengerInfants.length
                    ? _passenger?.PassengerInfants.map((_paxInfant) => {
                        return _paxInfant.Names.map((_infName) => {
                          return (
                            <h6 className="text-[10px] font-normal text-[#5F5B82] font-title">
                              {_infName?.FirstName}&nbsp;
                              {_infName?.LastName}
                            </h6>
                          );
                        });
                      })
                    : null} */}
                </div>
              </div>
              {_Infants.length > 0 ? (
                <div className="trip__summary__details">
                  <div className="f-1">
                    <h5>Infant{_Infants.length > 1 ? "s" : ""}:</h5>
                  </div>
                  <div className="f-1">
                    {/* <h6>{_Infants.length}</h6> */}
                    {_passenger?.PassengerInfants.length
                      ? _passenger?.PassengerInfants.map((_paxInfant) => {
                          return _paxInfant.Names.map((_infName) => {
                            return (
                              <h6>
                                {_infName?.FirstName}&nbsp;
                                {_infName?.LastName} ({" "}
                                {format(
                                  new Date(_paxInfant?.DOB),
                                  "d MMMM, yyyy"
                                )}
                                )
                              </h6>
                            );
                          });
                        })
                      : null}
                  </div>
                </div>
              ) : null}
              <div className="trip__summary__details">
                <div className="f-1">
                  <h6>Baggage{_Baggages.length > 1 ? "s" : ""}:</h6>
                </div>
                <div className="f-1">
                  <h6>
                    {_Baggages.length > 1
                      ? `${_Baggages.length} Bag${_Baggages.length > 1 && "s"}`
                      : _Baggages.length === 1
                      ? `${_Baggages.length} Bag`
                      : "No Baggage"}
                  </h6>
                </div>
              </div>

              {_passenger?.PassengerTypeInfo?.PaxType === "CHD" && (
                <div className="trip__summary__details">
                  <div className="f-1">
                    <h6>Dob:</h6>
                  </div>
                  <div className="f-1">
                    <h6>
                      {_passenger?.PassengerTypeInfos[0]?.DOB &&
                        format(
                          new Date(_passenger?.PassengerTypeInfos[0]?.DOB),
                          "d MMMM, yyyy"
                        )}
                    </h6>
                  </div>
                </div>
              )}

              {_Seats.length > 0
                ? bookingResponse?.Booking?.Journeys.map((_journey) => {
                    return _journey?.Segments.map((_segment) => {
                      return (
                        <div className="trip__summary__details">
                          <div className="f-1">
                            {_segment?.PaxSeats[paxIndex]?.DepartureStation ? (
                              <h6>
                                Seat{_Seats.length > 1 ? "s" : ""}
                                &nbsp;&nbsp;&nbsp; ({" "}
                                {`${_segment?.PaxSeats[paxIndex]?.DepartureStation} -  ${_segment?.PaxSeats[paxIndex]?.ArrivalStation}`}
                                ):
                              </h6>
                            ) : null}
                          </div>
                          <div className="f-1">
                            <h6>
                              {_segment?.PaxSeats[paxIndex]?.UnitDesignator}
                            </h6>
                          </div>
                        </div>
                      );
                    });
                  })
                : null}
            </section>
          );
        })}
      </>
    );
  };

  const PaymentDetails = () => {
    return (
      <>
        {bookingResponse?.Booking?.Payments?.map((_payment) => {
          return (
            <section className="flex flex-col border-t border-t-details__border py-3 mb-3">
              <h2 className="trip-title mb-2 font-semibold text-primary-main">
                PAYMENT DETAILS
              </h2>
              <div className="flex flex-col">
                <section className="flex flex-col">
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
                      <h6>₦{_payment?.PaymentAmount?.toLocaleString("NGN")}</h6>
                    </div>
                  </div>
                </section>
              </div>
            </section>
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
    <div className="trip__summary__item">
      <h2 className="trip-title mb-3">CONTACT DETAILS</h2>
      <div className="flex flex-col">
        <PassengerContact />

        <section className="flex flex-col mt-3">
          <PassengerInfos />
        </section>

        <section className="flex flex-col mt-3">
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
