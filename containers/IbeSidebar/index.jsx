import FlightInfo from "./components/FlightInfo";
import TripInfo from "./components/TripInfo";
import PassengerInfo from "./components/Passenger";
import SeatInfo from "./components/SeatInfo";
import PaymentInfo from "./components/PaymentInfo";

const IbeSidebar = () => {
  return (
    <section className="ibe__sidebar">
      <FlightInfo />
      <TripInfo />
      <PassengerInfo />
      <SeatInfo />
      <PaymentInfo />
    </section>
  );
};

export default IbeSidebar;
