import { useState, useEffect } from "react";
import FlightInfo from "./components/FlightInfo";
import TripInfo from "./components/TripInfo";
import PassengerInfo from "./components/Passenger";
import SeatInfo from "./components/SeatInfo";
import PaymentInfo from "./components/PaymentInfo";
import { useDispatch, useSelector } from "react-redux";
import { sessionSelector, FetchStateFromServer } from "redux/reducers/session";
import Spinner from "components/Spinner";

const IbeSidebar = () => {
  const dispatch = useDispatch();
  const { signature, sessionStateLoading } = useSelector(sessionSelector);
  useEffect(() => {
    async function fetchBookingState() {
      if (signature) {
        // dispatch(FetchStateFromServer());
      }
    }
    fetchBookingState();
  }, [signature]);

  return (
    <section className="ibe__sidebar">
      {sessionStateLoading ? (
        <Spinner />
      ) : (
        <>
          <FlightInfo />
          <TripInfo />
          <PassengerInfo />
          <SeatInfo />
          <PaymentInfo />
        </>
      )}
    </section>
  );
};

export default IbeSidebar;

 
