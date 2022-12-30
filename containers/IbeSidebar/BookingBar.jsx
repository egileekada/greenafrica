import { useState, useEffect } from "react";

import TripInfo from "./Booking/TripInfo";
import PassengerInfo from "./Booking/Passenger";
import SeatInfo from "./Booking/SeatInfo";
import PaymentInfo from "./Booking/PaymentInfo";
import { useSelector } from "react-redux";
import { sessionSelector } from "redux/reducers/session";
import Spinner from "components/Spinner";

import FlightInfo from "./Booking/FlightInfo";

const BookingBar = ({ enableEdit = false }) => {
  const { sessionStateResponse, sessionStateLoading } =
    useSelector(sessionSelector);
  const [isRoundTrip, setIsRoundTrip] = useState(false);

  useEffect(() => {
    if (sessionStateResponse) {
      sessionStateResponse?.BookingData?.Journeys.length > 1 &&
        setIsRoundTrip(true);
    }
  }, [sessionStateResponse]);

  return (
    <section className="ibe__sidebar">
      {sessionStateLoading ? (
        <Spinner />
      ) : (
        <>
          {/* <FlightInfo enableEdit={enableEdit} /> */}
          <TripInfo />
          <PassengerInfo />
          <SeatInfo />
          <PaymentInfo isRoundTrip={isRoundTrip} />
        </>
      )}
    </section>
  );
};

export default BookingBar;
