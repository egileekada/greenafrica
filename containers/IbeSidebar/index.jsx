import { useState, useEffect } from "react";
import FlightInfo from "./components/FlightInfo";
import TripInfo from "./components/TripInfo";
import PassengerInfo from "./components/Passenger";
import SeatInfo from "./components/SeatInfo";
import PaymentInfo from "./components/PaymentInfo";
import { useSelector } from "react-redux";
import { sessionSelector } from "redux/reducers/session";
import Spinner from "components/Spinner";

const IbeSidebar = () => {
  const { sessionStateLoading } = useSelector(sessionSelector);

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
