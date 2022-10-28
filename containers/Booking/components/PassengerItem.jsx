import { Checkbox } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import { sessionSelector } from "redux/reducers/session";

const ManagePassengerItem = ({ passenger, paxIndex }) => {
  const { bookingResponse } = useSelector(sessionSelector);

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

  return (
    <div className="flex flex-col ibe__trip__item checkinView pt-0 rounded-none">
      <div className="flex items-center justify-between w-full px-6 py-4 rounded-lg border mb-2">
        <div className="flex items-center primary-checkbox">
          <p className="check-label">
            <h3 className="font-header font-bold text-sm ">
              {passenger?.Names[0]?.FirstName}&nbsp;
              {passenger?.Names[0]?.LastName}
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
                          {_infName?.LastName}
                        </span>
                      );
                    });
                  })
                : null}
            </h5>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManagePassengerItem;
