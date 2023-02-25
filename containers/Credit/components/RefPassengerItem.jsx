import { Checkbox } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import { sessionSelector } from "redux/reducers/session";

const ManagePassengerItem = ({
  passenger,
  paxIndex,
  selectedPaxs,
  setSelectedPaxs,
}) => {
  const { bookingResponse } = useSelector(sessionSelector);

  const onChange = (e) => {
    const _existingPaxs = [...selectedPaxs];
    if (_existingPaxs.indexOf(parseInt(passenger.PassengerNumber)) === -1) {
      setSelectedPaxs([...selectedPaxs, parseInt(passenger.PassengerNumber)]);
    } else {
      const _newPaxs = _existingPaxs.filter((_pax) => {
        return parseInt(_pax) !== parseInt(passenger.PassengerNumber);
      });
      setSelectedPaxs([..._newPaxs]);
    }
  };

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
          <Checkbox
            onChange={onChange}
            checked={selectedPaxs.includes(parseInt(passenger.PassengerNumber))}
          >
            <label className="check-label">
              <h3 className="ml-2 font-header font-bold text-sm">
                {passenger?.Names[0]?.FirstName}&nbsp;
                {passenger?.Names[0]?.LastName}
              </h3>
            </label>
          </Checkbox>
        </div>
      </div>
      <div className="trip-details">
        {_Seats.length > 0
          ? bookingResponse?.Booking?.Journeys.map((_journey) => {
              return _journey?.Segments.map((_segment) => {
                return (
                  <div className="trip-details-item">
                    <h6>
                      SEAT NUMBER{" "}
                      <span className="text-[5px]">
                        {" "}
                        {`${_segment?.PaxSeats[paxIndex]?.DepartureStation} -  ${_segment?.PaxSeats[paxIndex]?.ArrivalStation}`}
                      </span>
                    </h6>
                    <h5 className="flex items-center">
                      <span>
                        {_segment?.PaxSeats[paxIndex]?.UnitDesignator}
                      </span>
                    </h5>
                  </div>
                );
              });
            })
          : null}

        <div className="trip-details-item">
          <h6>BAGGAGES</h6>
          <h5 className="flex items-center">
            <span>{_Baggages?.length}</span>
          </h5>
        </div>
      </div>
    </div>
  );
};

export default ManagePassengerItem;