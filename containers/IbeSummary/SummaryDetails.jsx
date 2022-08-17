/* eslint-disable @next/next/no-img-element */
import { useSelector, useState, useEffect } from "react-redux";
import { sessionSelector } from "redux/reducers/session";
import ProfileIcon from "assets/svgs/profile.svg";

const SummaryDetails = () => {
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

  return (
    <div className="trip__summary__item">
      <h2 className="trip-title mb-3">PASSENGER DETAILS</h2>
      <div className="flex flex-col">
        {/* Header */}
        <div className="flex mb-6">
          <div className="flex flex-col w-[53px] mr-4">
            <div className="bg-purple-light h-[50px] rounded-t-[3px] flex justify-center items-center">
              <ProfileIcon />
            </div>
          </div>
          <div className="flex flex-col">
            <h5 className="text-sm font-extrabold text-primary-main font-display mb-[6px]">
              {passengerInfo && passengerInfo?.FirstName}
              &nbsp;
              {passengerInfo && passengerInfo?.LastName}
            </h5>
            <h6 className="text-[12px] font-normal text-[#5F5B82] font-title">
              Seat Number: 2A
            </h6>
            <h6 className="text-[12px] font-normal text-[#5F5B82] font-title">
              michael@greenafrica.air
            </h6>
          </div>
        </div>
        {/* Header */}
        {/* Content */}
        <div className="trip__summary__details">
          <div className="f-1">
            <h5>Product:</h5>
          </div>
          <div className="f-1">
            <h6>gSaver</h6>
          </div>
        </div>
        <div className="trip__summary__details">
          <div className="f-1">
            <h5>Flight Number::</h5>
          </div>
          <div className="f-1">
            <h6>Q9 301</h6>
          </div>
        </div>
        <div className="trip__summary__details">
          <div className="f-1">
            <h5>Seat Number:</h5>
          </div>
          <div className="f-1">
            <h6>2A</h6>
          </div>
        </div>
        <div className="trip__summary__details">
          <div className="f-1">
            <h5>Trip Type:</h5>
          </div>
          <div className="f-1">
            <h6>One way</h6>
          </div>
        </div>
        <div className="trip__summary__details">
          <div className="f-1">
            <h5>Baggages:</h5>
          </div>
          <div className="f-1">
            <h6>No Baggage</h6>
          </div>
        </div>
        {/* Content */}
      </div>
    </div>
  );
};

export default SummaryDetails;
