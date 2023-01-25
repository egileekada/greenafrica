/* eslint-disable @next/next/no-img-element */
import Spinner from "components/Spinner";
import { useSelector } from "react-redux";
import { sessionSelector } from "redux/reducers/session";
import {
  useGetFareconfigsQuery,
  useGetSpecialAssistancesQuery,
} from "services/widgetApi.js";

const Fare = ({ isRoundTrip }) => {
  const { data: fareConfig, isLoading } = useGetFareconfigsQuery();
  const { data: specialConfig } = useGetSpecialAssistancesQuery();
  const { bookingResponse } = useSelector(sessionSelector);

  const resolveAbbreviation = (abrreviation) => {
    const [{ name, code }] = fareConfig?.data?.items.filter(
      (location) => location.code === abrreviation
    );
    return `${name}`;
  };

  const resolveSpecialAbbreviation = (abrreviation) => {
    const [{ name, code }] = specialConfig?.data?.items.filter(
      (location) => location.code === abrreviation
    );
    return `${name}`;
  };

  return (
    <div className="trip__summary__item">
      <h2 className="trip-title mb-3">FARE BREAKDOWN</h2>
      <div className="flex flex-col">
        {bookingResponse?.Booking?.Journeys?.map((_journey, _journeyIndex) => {
          const _seat = _journey?.Segments[0].PaxSeats?.length;

          return (
            <>
              {_journey.Segments.map((_segment) => {
                const _SSRCount = {};
                const tempSum = {};
                const _SSRSum = {};

                bookingResponse?.Booking?.Passengers.map((_pax) => {
                  return _pax.PassengerFees.map((_paxFee) => {
                    _SSRCount[_paxFee?.FeeCode] = _pax.PassengerFees.filter(
                      (_fee) => {
                        return _fee?.FeeCode === _paxFee?.FeeCode;
                      }
                    ).length;
                  });
                });

                bookingResponse?.Booking?.Passengers.map((_pax) => {
                  return _pax.PassengerFees.map((_paxFee) => {
                    tempSum[_paxFee?.FeeCode] = _paxFee.ServiceCharges;
                    const totalServiceCharge = tempSum[_paxFee?.FeeCode].reduce(
                      (accumulator, object) => {
                        return accumulator + object.Amount;
                      },
                      0
                    );
                    _SSRSum[_paxFee?.FeeCode] = totalServiceCharge;
                  });
                });

                const _SSRsCount = {
                  XBAG10: 0,
                  XBAG15: 0,
                  XBAG20: 0,

                  IBAG20: 0,
                  IBAG15: 0,
                  IBAG10: 0,

                  INFT: 0,
                  SEAT: 0,
                  WCHR: 0,
                  VPRD: 0,
                  HPRD: 0,
                  INSU: 0,
                };

                _segment.PaxSSRs?.map((_segSSR) => {
                  _SSRsCount[_segSSR?.FeeCode] = _segment.PaxSSRs?.filter(
                    (_segCode) => {
                      return _segSSR?.FeeCode === _segCode?.FeeCode;
                    }
                  ).length;
                });

                {/* console.log("_SSRsCount", _SSRsCount); */}

                return (
                  <>
                    <div className="flex items-center justify-between my-5">
                      <div className="flex items-center">
                        <h6 className="font-header font-bold text-sm text-primary-main">
                          {isRoundTrip ? "Round Trip" : "One Way"}&nbsp;{" "}
                          {_segment?.DepartureStation} -{" "}
                          {_segment?.ArrivalStation}
                        </h6>
                      </div>
                      <div className="font-header text-xs text-primary-main"></div>
                    </div>

                    {_segment.Fares.map((_fare) => {
                      const _fares = _fare.PaxFares[0].ServiceCharges.filter(
                        (_charge) => {
                          return _charge.ChargeCode === "";
                        }
                      );

                      const _TaxFares = _fare.PaxFares[0].ServiceCharges.filter(
                        (_charge) => {
                          return _charge.ChargeCode === "NG";
                        }
                      );

                      const TotalTax =
                        _TaxFares.length > 0
                          ? _TaxFares.reduce((accumulator, object) => {
                              return accumulator + object.Amount;
                            }, 0)
                          : 0;

                      const AirportTax =
                        _fare.PaxFares[0].ServiceCharges.filter((_charge) => {
                          return _charge.ChargeCode === "QT";
                        });

                      const FuelTax = _fare.PaxFares[0].ServiceCharges.filter(
                        (_charge) => {
                          return _charge.ChargeCode === "YQ";
                        }
                      );

                      const Discount = _fare.PaxFares[0].ServiceCharges.filter(
                        (_charge) => {
                          return (
                            _charge.ChargeCode === "IROPC" ||
                            _charge.ChargeCode === "IROPC2" ||
                            _charge.ChargeCode === "IROPC3"
                          );
                        }
                      );

                      return (
                        <>
                          {isLoading ? (
                            <Spinner />
                          ) : (
                            <>
                              <div className="trip__summary__row ">
                                <div className="flex items-center">
                                  <h6>
                                    {
                                      bookingResponse?.Booking?.Passengers
                                        .length
                                    }
                                    x Passenger
                                    {bookingResponse?.Booking?.Passengers
                                      .length > 1
                                      ? "s"
                                      : ""}
                                    :
                                  </h6>
                                </div>
                                <div>
                                  <h6></h6>
                                </div>
                              </div>
                              <div className="trip__summary__row subrow">
                                <div className="flex items-center">
                                  <h6>
                                    {
                                      bookingResponse?.Booking?.Passengers
                                        .length
                                    }
                                    x Fare
                                    {bookingResponse?.Booking?.Passengers
                                      .length > 1
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
                              {Discount.length > 0 && (
                                <div className="trip__summary__row subrow">
                                  <div className="flex items-center">
                                    {fareConfig?.data ? (
                                      <h6>
                                        {" "}
                                        {
                                          bookingResponse?.Booking?.Passengers
                                            .length
                                        }
                                        x {resolveAbbreviation("IROPC")}:
                                      </h6>
                                    ) : null}
                                  </div>
                                  <div>
                                    <h6>
                                      ₦{Discount[0].Amount.toLocaleString()}
                                    </h6>
                                  </div>
                                </div>
                              )}

                              <div className="trip__summary__row subrow">
                                <div className="flex items-center">
                                  {fareConfig?.data ? (
                                    <h6>
                                      {" "}
                                      {
                                        bookingResponse?.Booking?.Passengers
                                          .length
                                      }
                                      x {resolveAbbreviation("NG")}:
                                    </h6>
                                  ) : null}
                                </div>
                                <div>
                                  <h6>₦{TotalTax.toLocaleString()}</h6>
                                </div>
                              </div>
                              <div className="trip__summary__row subrow">
                                <div className="flex items-center">
                                  {fareConfig?.data ? (
                                    <h6>
                                      {
                                        bookingResponse?.Booking?.Passengers
                                          .length
                                      }
                                      x {resolveAbbreviation("QT")}:
                                    </h6>
                                  ) : null}
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
                                  {fareConfig?.data ? (
                                    <h6>
                                      {" "}
                                      {
                                        bookingResponse?.Booking?.Passengers
                                          .length
                                      }
                                      x {resolveAbbreviation("YQ")}:
                                    </h6>
                                  ) : null}
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

                              {parseInt(_SSRsCount?.IBAG20) > 0 && (
                                <div className="trip__summary__row">
                                  <div className="flex items-center">
                                    <h6>
                                      {_SSRsCount?.IBAG20}x&nbsp;
                                      {resolveAbbreviation("IBAG20")}
                                      {_SSRsCount?.IBAG20 > 1 ? "s" : ""}
                                    </h6>
                                  </div>
                                  <div>
                                    <h6> ₦0</h6>
                                  </div>
                                </div>
                              )}

                              {parseInt(_SSRsCount?.IBAG15) > 0 && (
                                <div className="trip__summary__row">
                                  <div className="flex items-center">
                                    <h6>
                                      {_SSRsCount?.IBAG15}x&nbsp;
                                      {resolveAbbreviation("IBAG15")}
                                      {_SSRsCount?.IBAG15 > 1 ? "s" : ""}
                                    </h6>
                                  </div>
                                  <div>
                                    <h6> ₦0</h6>
                                  </div>
                                </div>
                              )}

                              {parseInt(_SSRsCount?.IBAG10) > 0 && (
                                <div className="trip__summary__row">
                                  <div className="flex items-center">
                                    <h6>
                                      {_SSRsCount?.IBAG10}x&nbsp;
                                      {resolveAbbreviation("IBAG10")}
                                      {_SSRsCount?.IBAG10 > 1 ? "s" : ""}
                                    </h6>
                                  </div>
                                  <div>
                                    <h6>₦0</h6>
                                  </div>
                                </div>
                              )}

                              {parseInt(_SSRsCount?.INFT) > 0 && (
                                <div className="trip__summary__row subrow">
                                  <div className="flex items-center">
                                    <h6>
                                      {_SSRsCount?.INFT} X&nbsp;
                                      {fareConfig?.data
                                        ? resolveAbbreviation("INFT")
                                        : null}
                                      {_SSRsCount?.INFT > 1 ? "s" : ""}
                                    </h6>
                                  </div>
                                  <div>
                                    <h6> ₦{_SSRSum?.INFT.toLocaleString()}</h6>
                                  </div>
                                </div>
                              )}

                              {parseInt(_SSRsCount?.INSU) > 0 && (
                                <div className="trip__summary__row subrow">
                                  <div className="flex items-center">
                                    <h6>
                                      {_SSRsCount?.INSU} X&nbsp;
                                      {fareConfig?.data
                                        ? resolveAbbreviation("INSU")
                                        : null}
                                      {_SSRsCount?.INSU > 1 ? "s" : ""}
                                    </h6>
                                  </div>
                                  <div>
                                    <h6> ₦{_SSRSum?.INSU.toLocaleString()}</h6>
                                  </div>
                                </div>
                              )}

                              {parseInt(_SSRsCount?.WCHR) > 0 && (
                                <div className="trip__summary__row">
                                  <div v className="flex items-center">
                                    <h6>
                                      {_SSRsCount?.WCHR} X&nbsp;
                                      {specialConfig?.data
                                        ? resolveSpecialAbbreviation("WCHR")
                                        : "WCHR"}
                                      {_SSRsCount?.WCHR > 1 ? "s" : ""}
                                    </h6>
                                  </div>
                                  <div>
                                    <h6>
                                      {" "}
                                      ₦
                                      {_SSRSum?.WCHR
                                        ? _SSRSum?.WCHR?.toLocaleString()
                                        : 0}
                                    </h6>
                                  </div>
                                </div>
                              )}
                              {parseInt(_SSRsCount?.VPRD) > 0 && (
                                <div className="trip__summary__row">
                                  <div className="flex items-center">
                                    <h6>
                                      {_SSRsCount?.VPRD} X&nbsp;
                                      {specialConfig?.data
                                        ? resolveSpecialAbbreviation("VPRD")
                                        : "VPRD"}
                                      {_SSRsCount?.VPRD > 1 ? "s" : ""}
                                    </h6>
                                  </div>
                                  <div>
                                    <h6>
                                      {" "}
                                      ₦
                                      {_SSRSum?.VPRD
                                        ? _SSRSum?.VPRD?.toLocaleString()
                                        : 0}
                                    </h6>
                                  </div>
                                </div>
                              )}
                              {parseInt(_SSRsCount?.HPRD) > 0 && (
                                <div className="trip__summary__row">
                                  <div className="flex items-center">
                                    <h6>
                                      {_SSRsCount?.HPRD} X&nbsp;
                                      {specialConfig?.data
                                        ? resolveSpecialAbbreviation("HPRD")
                                        : "HPRD"}
                                      {_SSRsCount?.HPRD > 1 ? "s" : ""}
                                    </h6>
                                  </div>
                                  <div>
                                    <h6>
                                      {" "}
                                      ₦
                                      {_SSRSum?.HPRD
                                        ? _SSRSum?.HPRD?.toLocaleString()
                                        : 0}
                                    </h6>
                                  </div>
                                </div>
                              )}
                              {parseInt(_SSRsCount?.XBAG20) > 0 && (
                                <div className="trip__summary__row">
                                  <div className="flex items-center">
                                    <h6>
                                      {_SSRsCount?.XBAG20} X&nbsp;
                                      {fareConfig?.data
                                        ? resolveAbbreviation("XBAG20")
                                        : null}
                                      {_SSRsCount?.XBAG20 > 1 ? "s" : ""}
                                    </h6>
                                  </div>
                                  <div>
                                    <h6>
                                      {" "}
                                      ₦
                                      {_SSRSum?.XBAG20
                                        ? _SSRSum?.XBAG20?.toLocaleString()
                                        : 0}
                                    </h6>
                                  </div>
                                </div>
                              )}
                              {parseInt(_SSRsCount?.XBAG15) > 0 && (
                                <div className="trip__summary__row">
                                  <div className="flex items-center">
                                    <h6>
                                      {_SSRsCount?.XBAG15} X&nbsp;
                                      {fareConfig?.data
                                        ? resolveAbbreviation("XBAG15")
                                        : null}
                                      {_SSRsCount?.XBAG15 > 1 ? "s" : ""}
                                    </h6>
                                  </div>
                                  <div>
                                    <h6>
                                      {" "}
                                      ₦
                                      {_SSRSum?.XBAG15
                                        ? _SSRSum?.XBAG15.toLocaleString()
                                        : 0}
                                    </h6>
                                  </div>
                                </div>
                              )}
                              {parseInt(_SSRsCount?.XBAG10) > 0 && (
                                <div className="trip__summary__row">
                                  <div className="flex items-center">
                                    <h6>
                                      {_SSRsCount?.XBAG10} X&nbsp;
                                      {fareConfig?.data
                                        ? resolveAbbreviation("XBAG10")
                                        : null}
                                      {_SSRsCount?.XBAG10 > 1 ? "s" : ""}
                                    </h6>
                                  </div>
                                  <div>
                                    <h6>
                                      {" "}
                                      ₦
                                      {_SSRSum?.XBAG10
                                        ? _SSRSum?.XBAG10.toLocaleString()
                                        : 0}
                                    </h6>
                                  </div>
                                </div>
                              )}
                              {_seat && parseInt(_seat) > 0 ? (
                                <div className="trip__summary__row">
                                  <div className="flex items-center">
                                    <h6>
                                      {_seat} X&nbsp;
                                      {fareConfig?.data
                                        ? resolveAbbreviation("SEAT")
                                        : null}
                                      {_seat > 1 ? "s" : ""}
                                    </h6>
                                  </div>
                                  <div>
                                    <h6> ₦{_SSRSum?.SEAT?.toLocaleString()}</h6>
                                  </div>
                                </div>
                              ) : null}
                              <div className="trip__summary__row">
                                <div className="flex items-center">
                                  <h6>SubTotal</h6>
                                </div>
                                <div>
                                  <h6>
                                    ₦
                                    {_journey?.TotalAmount?.toLocaleString(
                                      "NGN"
                                    )}
                                  </h6>
                                </div>
                              </div>
                            </>
                          )}
                        </>
                      );
                    })}
                  </>
                );
              })}
            </>
          );
        })}

        {/* TotalCost */}
        <div className="trip__summary__row totalRow">
          <div className="flex items-center">
            <h5>TOTAL</h5>
          </div>
          <div>
            <h6>
              {" "}
              ₦
              {bookingResponse?.Booking?.BookingSum?.TotalCost?.toLocaleString()}
            </h6>
          </div>
        </div>
        {/* TotalCost */}
      </div>
    </div>
  );
};

Fare.defaultProps = {
  isRoundTrip: false,
};

export default Fare;
