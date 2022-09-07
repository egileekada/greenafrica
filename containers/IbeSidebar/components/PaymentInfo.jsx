/* eslint-disable @next/next/no-img-element */
import { Fragment, useState } from "react";
import FourIcon from "assets/svgs/four.svg";
import CaretLeft from "assets/svgs/sidebar/caretleft.svg";
import { useSelector } from "react-redux";
import { sessionSelector } from "redux/reducers/session";

const PaymentInfo = () => {
  const [showContent, setShow] = useState(false);
  const { sessionStateResponse } = useSelector(sessionSelector);

  return (
    <section className="ibe__sidebar__item mb-10">
      <button
        className="ibe-accordion-header"
        onClick={() => setShow(!showContent)}
      >
        <div className="flex items-center">
          <figure className="mr-2">
            <FourIcon />
          </figure>
          <div className="flex flex-col">
            <h4>Payment</h4>
          </div>
          <figure
            className={`ml-auto transform ${showContent ? "rotate-90" : ""}`}
          >
            <CaretLeft />
          </figure>
        </div>
      </button>

      {showContent && (
        <>
          <Fragment>
            {sessionStateResponse?.BookingData?.Journeys.length > 0 ? (
              sessionStateResponse?.BookingData?.Journeys.map(
                (_journey, _journeyIndex) => {
                  return _journey?.Segments.map((_segment) => {
                    return (
                      <div className="ibe__sidebar__box payment mt-6">
                        <div className="flex flex-col">
                          {_journey?.Segments.length > 0 &&
                            _journey?.Segments.map((_segment) => {
                              const _SSRCount = {};
                              const tempSum = {};
                              const _SSRSum = {};

                              sessionStateResponse?.BookingData?.Passengers.map(
                                (_pax) => {
                                  return _pax.PassengerFees.map((_paxFee) => {
                                    _SSRCount[_paxFee?.FeeCode] =
                                      _pax.PassengerFees.filter((_fee) => {
                                        return (
                                          _fee?.FeeCode === _paxFee?.FeeCode
                                        );
                                      }).length;
                                  });
                                }
                              );

                              sessionStateResponse?.BookingData?.Passengers.map(
                                (_pax) => {
                                  return _pax.PassengerFees.map((_paxFee) => {
                                    tempSum[_paxFee?.FeeCode] =
                                      _paxFee.ServiceCharges;
                                    const totalServiceCharge = tempSum[
                                      _paxFee?.FeeCode
                                    ].reduce((accumulator, object) => {
                                      return accumulator + object.Amount;
                                    }, 0);
                                    _SSRSum[_paxFee?.FeeCode] =
                                      totalServiceCharge;
                                  });
                                }
                              );

                              return (
                                <>
                                  <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center">
                                      <h6 className="font-display text-xs text-primary-main">
                                        {_journeyIndex === 1
                                          ? "Return"
                                          : "Departure"}
                                        &nbsp;&nbsp;
                                        {_segment?.DepartureStation} -{" "}
                                        {_segment?.ArrivalStation}
                                      </h6>
                                    </div>
                                    <div className="font-header text-xs text-primary-main"></div>
                                  </div>

                                  <div className="ibe__sidebar__row">
                                    <div className="flex items-center">
                                      <h6>
                                        {
                                          sessionStateResponse?.BookingData
                                            ?.Passengers.length
                                        }
                                        x Passenger
                                        {sessionStateResponse?.BookingData
                                          ?.Passengers.length > 1
                                          ? "s"
                                          : ""}{" "}
                                      </h6>
                                    </div>
                                    <div></div>
                                  </div>

                                  {_segment.Fares.map((_fare) => {
                                    const _fares =
                                      _fare.PaxFares[0].ServiceCharges.filter(
                                        (_charge) => {
                                          return _charge.ChargeCode === "";
                                        }
                                      );

                                    const _TaxFares =
                                      _fare.PaxFares[0].ServiceCharges.filter(
                                        (_charge) => {
                                          return _charge.ChargeCode === "NG";
                                        }
                                      );

                                    const TotalTax =
                                      _TaxFares.length > 0
                                        ? _TaxFares.reduce(
                                            (accumulator, object) => {
                                              return (
                                                accumulator + object.Amount
                                              );
                                            },
                                            0
                                          )
                                        : 0;

                                    const AirportTax =
                                      _fare.PaxFares[0].ServiceCharges.filter(
                                        (_charge) => {
                                          return _charge.ChargeCode === "QT";
                                        }
                                      );

                                    const FuelTax =
                                      _fare.PaxFares[0].ServiceCharges.filter(
                                        (_charge) => {
                                          return _charge.ChargeCode === "YQ";
                                        }
                                      );

                                    return (
                                      <>
                                        <div className="trip__summary__row subrow">
                                          <div className="flex items-center">
                                            <h6>
                                              {
                                                sessionStateResponse
                                                  ?.BookingData?.Passengers
                                                  .length
                                              }
                                              x Fare
                                              {sessionStateResponse?.BookingData
                                                ?.Passengers.length > 1
                                                ? "s"
                                                : ""}
                                              :
                                            </h6>
                                          </div>
                                          <div>
                                            <h6>
                                              ₦
                                              {_fares.length > 0
                                                ? _fares[0].Amount.toLocaleString()
                                                : ""}
                                            </h6>
                                          </div>
                                        </div>
                                        <div className="trip__summary__row subrow">
                                          <div className="flex items-center">
                                            <h6>
                                              {" "}
                                              {
                                                sessionStateResponse
                                                  ?.BookingData?.Passengers
                                                  .length
                                              }
                                              x Passenget Service Charge:
                                            </h6>
                                          </div>
                                          <div>
                                            <h6>
                                              ₦{TotalTax.toLocaleString()}
                                            </h6>
                                          </div>
                                        </div>
                                        <div className="trip__summary__row subrow">
                                          <div className="flex items-center">
                                            <h6>
                                              {" "}
                                              {
                                                sessionStateResponse
                                                  ?.BookingData?.Passengers
                                                  .length
                                              }
                                              x Airport Tax:
                                            </h6>
                                          </div>
                                          <div>
                                            <h6>
                                              {" "}
                                              ₦
                                              {AirportTax.length > 0
                                                ? AirportTax[0].Amount.toLocaleString()
                                                : ""}
                                            </h6>
                                          </div>
                                        </div>
                                        <div className="trip__summary__row subrow">
                                          <div className="flex items-center">
                                            <h6>
                                              {" "}
                                              {
                                                sessionStateResponse
                                                  ?.BookingData?.Passengers
                                                  .length
                                              }
                                              x Fuel Subcharge:
                                            </h6>
                                          </div>
                                          <div>
                                            <h6>
                                              {" "}
                                              ₦
                                              {FuelTax.length > 0
                                                ? FuelTax[0].Amount.toLocaleString()
                                                : ""}
                                            </h6>
                                          </div>
                                        </div>
                                        {_SSRCount?.INFT && (
                                          <div className="trip__summary__row subrow">
                                            <div className="flex items-center">
                                              <h6>
                                                {_SSRCount?.INFT}x&nbsp;Infant
                                                {_SSRCount?.INFT > 1 ? "s" : ""}
                                              </h6>
                                            </div>
                                            <div>
                                              <h6>
                                                {" "}
                                                ₦
                                                {_SSRSum?.INFT.toLocaleString()}
                                              </h6>
                                            </div>
                                          </div>
                                        )}
                                        {_SSRCount?.XBAG20 && (
                                          <div className="trip__summary__row">
                                            <div className="flex items-center">
                                              <h6>
                                                {_SSRCount?.XBAG20}x&nbsp;20KG
                                                Baggage
                                                {_SSRCount?.XBAG20 > 1
                                                  ? "s"
                                                  : ""}
                                              </h6>
                                            </div>
                                            <div>
                                              <h6>
                                                {" "}
                                                ₦
                                                {_SSRSum?.XBAG20.toLocaleString()}
                                              </h6>
                                            </div>
                                          </div>
                                        )}
                                        {_SSRCount?.XBAG15 && (
                                          <div className="trip__summary__row">
                                            <div className="flex items-center">
                                              <h6>
                                                {_SSRCount?.XBAG15}x&nbsp;15KG
                                                Baggage
                                                {_SSRCount?.XBAG15 > 1
                                                  ? "s"
                                                  : ""}
                                              </h6>
                                            </div>
                                            <div>
                                              <h6>
                                                {" "}
                                                ₦
                                                {_SSRSum?.XBAG15.toLocaleString()}
                                              </h6>
                                            </div>
                                          </div>
                                        )}
                                        {_SSRCount?.XBAG10 && (
                                          <div className="trip__summary__row">
                                            <div className="flex items-center">
                                              <h6>
                                                {_SSRCount?.XBAG10}x&nbsp;10KG
                                                Baggage
                                                {_SSRCount?.XBAG10 > 1
                                                  ? "s"
                                                  : ""}
                                              </h6>
                                            </div>
                                            <div>
                                              <h6>
                                                {" "}
                                                ₦
                                                {_SSRSum?.XBAG10.toLocaleString()}
                                              </h6>
                                            </div>
                                          </div>
                                        )}
                                        {_SSRCount?.SEAT && (
                                          <div className="trip__summary__row">
                                            <div className="flex items-center">
                                              <h6>
                                                {_SSRCount?.SEAT}x&nbsp;Seat
                                                {_SSRCount?.SEAT > 1 ? "s" : ""}
                                              </h6>
                                            </div>
                                            <div>
                                              <h6>
                                                {" "}
                                                ₦
                                                {_SSRSum?.SEAT.toLocaleString()}
                                              </h6>
                                            </div>
                                          </div>
                                        )}
                                      </>
                                    );
                                  })}
                                </>
                              );
                            })}
                        </div>
                      </div>
                    );
                  });
                }
              )
            ) : (
              <div className="ibe__sidebar__box">
                <div className="ibe__sidebar__empty h-[187px]">
                  <p>Select a flight to see pricing</p>
                </div>
              </div>
            )}
          </Fragment>
        </>
      )}
    </section>
  );
};

export default PaymentInfo;
