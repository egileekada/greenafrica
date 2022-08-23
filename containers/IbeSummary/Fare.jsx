/* eslint-disable @next/next/no-img-element */
import { useSelector } from "react-redux";
import { sessionSelector } from "redux/reducers/session";

const Fare = ({ isRoundTrip }) => {
  const { bookingResponse } = useSelector(sessionSelector);

  return (
    <div className="trip__summary__item">
      <h2 className="trip-title mb-3">FARE BREAKDOWN</h2>
      <div className="flex flex-col">
        {bookingResponse?.Booking?.Journeys?.map((_journey, _journeyIndex) => {
          return (
            <>
              {_journey.Segments.map((_segment) => {
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
                      <div className="font-header text-xs text-primary-main">
                        {/* {_segment?.Fares?.map((_fare) => {
                        return _fare.PaxFares.map(() => {
                          return <p>gggggg</p>;
                        });
                      })} */}
                        {/* <h6 className="text-primary-main text-base font-display">
                        {" "}
                        ₦26,501
                      </h6> */}
                      </div>
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
                          <div className="trip__summary__row">
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
                              <h6>Service Charge:</h6>
                            </div>
                            <div>
                              <h6>₦{TotalTax.toLocaleString()}</h6>
                            </div>
                          </div>
                          <div className="trip__summary__row subrow">
                            <div className="flex items-center">
                              <h6>Airport Tax:</h6>
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
                              <h6>Fuel Subcharge:</h6>
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
