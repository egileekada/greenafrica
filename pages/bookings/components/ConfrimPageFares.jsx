/* eslint-disable @next/next/no-img-element */
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { sessionSelector } from "redux/reducers/session";
import {
  useGetFareconfigsQuery,
  useGetSpecialAssistancesQuery,
} from "services/widgetApi.js";

const ConfrimPageFares = () => {
  const { sessionStateResponse } = useSelector(sessionSelector);
  const { data: fareConfig } = useGetFareconfigsQuery();
  const { data: specialConfig } = useGetSpecialAssistancesQuery();

  const resolveAbbreviation = (abrreviation) => {
    const [{ name, code }] = fareConfig?.data?.items.filter(
      (location) => location.code === abrreviation
    );

    return `${name} (${code})`;
  };

  const resolveSpecialAbbreviation = (abrreviation) => {
    const [{ name, code }] = specialConfig?.data?.items.filter(
      (location) => location.code === abrreviation
    );
    return `${name} (${code})`;
  };

  return (
    <section className="mx-6 my-6 flex flex-col">
      <Fragment>
        {sessionStateResponse?.BookingData?.Journeys.length > 0 ? (
          sessionStateResponse?.BookingData?.Journeys.map(
            (_journey, _journeyIndex) => {
              return _journey?.Segments.map((_segment) => {
                return (
                  <div className="ibe__sidebar__box payment mt-6">
                    {fareConfig?.data ? (
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
                                      return _fee?.FeeCode === _paxFee?.FeeCode;
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

                            const _SSRsCount = {
                              XBAG10: 0,
                              XBAG15: 0,
                              XBAG20: 0,
                              INFT: 0,
                              SEAT: 0,
                              WCHR: 0,
                              VPRD: 0,
                              HPRD: 0,
                            };

                            _segment.PaxSSRs?.map((_segSSR) => {
                              _SSRsCount[_segSSR?.FeeCode] =
                                _segment.PaxSSRs?.filter((_segCode) => {
                                  return _segSSR?.FeeCode === _segCode?.FeeCode;
                                }).length;
                            });

                            return (
                              <>
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-center">
                                    <h6 className="font-display font-bold text-sm text-primary-main">
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
                                            return accumulator + object.Amount;
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
                                              sessionStateResponse?.BookingData
                                                ?.Passengers.length
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
                                              sessionStateResponse?.BookingData
                                                ?.Passengers.length
                                            }
                                            x {resolveAbbreviation("NG")}:
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
                                            {
                                              sessionStateResponse?.BookingData
                                                ?.Passengers.length
                                            }
                                            x {resolveAbbreviation("QT")}:
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
                                              sessionStateResponse?.BookingData
                                                ?.Passengers.length
                                            }
                                            x {resolveAbbreviation("YQ")}:
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

                                      {parseInt(_SSRsCount?.WCHR) > 0 && (
                                        <div className="trip__summary__row subrow">
                                          <div className="flex items-center">
                                            <h6>
                                              {_SSRsCount?.WCHR}x&nbsp;
                                              {specialConfig?.data
                                                ? resolveSpecialAbbreviation(
                                                    "WCHR"
                                                  )
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
                                        <div className="trip__summary__row subrow">
                                          <div className="flex items-center">
                                            <h6>
                                              {_SSRsCount?.VPRD}x&nbsp;
                                              {specialConfig?.data
                                                ? resolveSpecialAbbreviation(
                                                    "VPRD"
                                                  )
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
                                        <div className="trip__summary__row subrow">
                                          <div className="flex items-center">
                                            <h6>
                                              {_SSRsCount?.HPRD}x&nbsp;
                                              {specialConfig?.data
                                                ? resolveSpecialAbbreviation(
                                                    "HPRD"
                                                  )
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

                                      {_SSRCount?.INFT && (
                                        <div className="trip__summary__row subrow">
                                          <div className="flex items-center">
                                            <h6>
                                              {_SSRCount?.INFT}x&nbsp;{" "}
                                              {resolveAbbreviation("INFT")}
                                              {_SSRCount?.INFT > 1 ? "s" : ""}
                                            </h6>
                                          </div>
                                          <div>
                                            <h6>
                                              {" "}
                                              ₦{_SSRSum?.INFT?.toLocaleString()}
                                            </h6>
                                          </div>
                                        </div>
                                      )}

                                      {parseInt(_SSRsCount?.XBAG20) > 0 && (
                                        <div className="trip__summary__row">
                                          <div className="flex items-center">
                                            <h6>
                                              {_SSRsCount?.XBAG20}x&nbsp;
                                              {resolveAbbreviation("XBAG20")}
                                              {_SSRsCount?.XBAG20 > 1
                                                ? "s"
                                                : ""}
                                            </h6>
                                          </div>
                                          <div>
                                            <h6>
                                              {" "}
                                              ₦
                                              {_SSRSum?.XBAG20?.toLocaleString()}
                                            </h6>
                                          </div>
                                        </div>
                                      )}
                                      {parseInt(_SSRsCount?.XBAG15) > 0 && (
                                        <div className="trip__summary__row">
                                          <div className="flex items-center">
                                            <h6>
                                              {_SSRsCount?.XBAG15}x&nbsp;{" "}
                                              {resolveAbbreviation("XBAG15")}
                                              {_SSRsCount?.XBAG15 > 1
                                                ? "s"
                                                : ""}
                                            </h6>
                                          </div>
                                          <div>
                                            <h6>
                                              {" "}
                                              ₦
                                              {_SSRSum?.XBAG15
                                                ? _SSRSum?.XBAG15?.toLocaleString()
                                                : 0}
                                            </h6>
                                          </div>
                                        </div>
                                      )}

                                      {parseInt(_SSRsCount?.XBAG10) > 0 && (
                                        <div className="trip__summary__row">
                                          <div className="flex items-center">
                                            <h6>
                                              {_SSRsCount?.XBAG10}x&nbsp;{" "}
                                              {resolveAbbreviation("XBAG10")}
                                              {_SSRsCount?.XBAG10 > 1
                                                ? "s"
                                                : ""}
                                            </h6>
                                          </div>
                                          <div>
                                            <h6>
                                              {" "}
                                              ₦
                                              {_SSRSum?.XBAG10
                                                ? _SSRSum?.XBAG10?.toLocaleString()
                                                : 0}
                                            </h6>
                                          </div>
                                        </div>
                                      )}

                                      {_SSRCount?.SEAT && (
                                        <div className="trip__summary__row">
                                          <div className="flex items-center">
                                            <h6>
                                              {_SSRCount?.SEAT}x&nbsp;
                                              {resolveAbbreviation("SEAT")}
                                              {_SSRCount?.SEAT > 1 ? "s" : ""}
                                            </h6>
                                          </div>
                                          <div>
                                            <h6>
                                              {" "}
                                              ₦{_SSRSum?.SEAT?.toLocaleString()}
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
                    ) : null}
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
    </section>
  );
};

export default ConfrimPageFares;
