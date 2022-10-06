/* eslint-disable @next/next/no-img-element */
import { useSelector } from "react-redux";
import { sessionSelector } from "redux/reducers/session";
import { useGetFareconfigsQuery } from "services/widgetApi.js";

const Fare = ({ isRoundTrip }) => {
  const { data: fareConfig, isLoading } = useGetFareconfigsQuery();
  const { bookingResponse } = useSelector(sessionSelector);

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
                bookingResponse?.Booking?.Passengers.map((_pax) => {
                  return _pax.PassengerFees.map((_paxFee) => {
                    _SSRCount[_paxFee?.FeeCode] = _pax.PassengerFees.filter(
                      (_fee) => {
                        return _fee?.FeeCode === _paxFee?.FeeCode;
                      }
                    ).length;
                  });
                });

                const tempSum = {};
                const _SSRSum = {};
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
                  INFT: 0,
                  SEAT: 0,
                };

                _segment.PaxSSRs?.map((_segSSR) => {
                  _SSRsCount[_segSSR?.FeeCode] = _segment.PaxSSRs?.filter(
                    (_segCode) => {
                      return _segSSR?.FeeCode === _segCode?.FeeCode;
                    }
                  ).length;
                });

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

                      return (
                        <>
                          <div className="trip__summary__row ">
                            <div className="flex items-center">
                              <h6>
                                {bookingResponse?.Booking?.Passengers.length}x
                                Passenger
                                {bookingResponse?.Booking?.Passengers.length > 1
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
                                {bookingResponse?.Booking?.Passengers.length}x
                                Fare
                                {bookingResponse?.Booking?.Passengers.length > 1
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
                                {bookingResponse?.Booking?.Passengers.length}x
                                Passenger Service Charge:
                              </h6>
                            </div>
                            <div>
                              <h6>₦{TotalTax.toLocaleString()}</h6>
                            </div>
                          </div>
                          <div className="trip__summary__row subrow">
                            <div className="flex items-center">
                              <h6>
                                {" "}
                                {bookingResponse?.Booking?.Passengers.length}x
                                Airport Tax:
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
                                {bookingResponse?.Booking?.Passengers.length}x
                                Fuel Surcharge:
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
                          {parseInt(_SSRsCount?.INFT) > 0 && (
                            <div className="trip__summary__row subrow">
                              <div className="flex items-center">
                                <h6>
                                  {_SSRsCount?.INFT}x&nbsp;Infant
                                  {_SSRsCount?.INFT > 1 ? "s" : ""}
                                </h6>
                              </div>
                              <div>
                                <h6> ₦{_SSRSum?.INFT.toLocaleString()}</h6>
                              </div>
                            </div>
                          )}
                          {parseInt(_SSRsCount?.XBAG20) > 0 && (
                            <div className="trip__summary__row">
                              <div className="flex items-center">
                                <h6>
                                  {_SSRsCount?.XBAG20}x&nbsp;20KG Baggage
                                  {_SSRsCount?.XBAG20 > 1 ? "s" : ""}
                                </h6>
                              </div>
                              <div>
                                <h6> ₦{_SSRSum?.XBAG20.toLocaleString()}</h6>
                              </div>
                            </div>
                          )}
                          {parseInt(_SSRsCount?.XBAG15) > 0 && (
                            <div className="trip__summary__row">
                              <div className="flex items-center">
                                <h6>
                                  {_SSRsCount?.XBAG15}x&nbsp;15KG Baggage
                                  {_SSRsCount?.XBAG15 > 1 ? "s" : ""}
                                </h6>
                              </div>
                              <div>
                                <h6> ₦{_SSRSum?.XBAG15.toLocaleString()}</h6>
                              </div>
                            </div>
                          )}
                          {parseInt(_SSRsCount?.XBAG10) > 0 && (
                            <div className="trip__summary__row">
                              <div className="flex items-center">
                                <h6>
                                  {_SSRsCount?.XBAG10}x&nbsp;10KG Baggage
                                  {_SSRsCount?.XBAG10 > 1 ? "s" : ""}
                                </h6>
                              </div>
                              <div>
                                <h6> ₦{_SSRSum?.XBAG10.toLocaleString()}</h6>
                              </div>
                            </div>
                          )}
                          {/* {_SSRCount?.SEAT && (
                            <div className="trip__summary__row">
                              <div className="flex items-center">
                                <h6>
                                  {_SSRCount?.SEAT}x&nbsp;Seat
                                  {_SSRCount?.SEAT > 1 ? "s" : ""}
                                </h6>
                              </div>
                              <div>
                                <h6> ₦{_SSRSum?.SEAT.toLocaleString()}</h6>
                              </div>
                            </div>
                          )} */}
                          {_seat && (
                            <div className="trip__summary__row">
                              <div className="flex items-center">
                                <h6>
                                  {_seat}x&nbsp;Seat
                                  {_seat > 1 ? "s" : ""}
                                </h6>
                              </div>
                              <div>
                                <h6> ₦{_SSRSum?.SEAT.toLocaleString()}</h6>
                              </div>
                            </div>
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
              {bookingResponse?.Booking?.Payments[0]?.PaymentAmount.toLocaleString()}
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
