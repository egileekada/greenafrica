import * as React from "react";
import Back from "assets/svgs/icon-back-small.svg";
import CloseIcon from "assets/svgs/white-close.svg";
import "react-calendar/dist/Calendar.css";
import "react-date-picker/dist/DatePicker.css";
import FromTo from "./FromTo";
import Departure from "./Departure";
import Flight from "./Flight";
import Passengers from "./Passengers";
import BookingEnd from "./BookingEnd";

const MobileSearch = ({
  setShowModal,
  arrivals,
  setArrivals,
  type,
  setType,
  promocode,
  setPromocode,
  fromTo,
  setFromTo,
  returningDate,
  setReturningDate,
  departureDate,
  setDepartureDate,
  passengers,
  setPassengers,
  infant,
  setInfant,
  adult,
  setAdult,
  child,
  setChild,
  values,
}) => {
  const [screen, setScreen] = React.useState(1);

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-50 h-screen w-screen bg-white flex flex-col justify-start items-center">
      <div className="w-full flex justify-between items-center gap-2 p-4 bg-primary-main">
        <button
          onClick={() => {
            screen <= 1
              ? null
              : screen === 4 && type !== "round_trip"
              ? setScreen(2)
              : setScreen(screen - 1);
          }}
          className=""
        >
          <Back />
        </button>
        <h2 className="text-white text-lg font-body">
          {screen === 1
            ? "Select Route"
            : screen === 2
            ? "Departure Date"
            : screen === 3
            ? "Flight Dates"
            : screen === 4
            ? "Select Passengers"
            : type === "round_trip"
            ? "Round Trip"
            : "One Way"}
        </h2>
        <button onClick={() => setShowModal(false)} className="">
          <CloseIcon />
        </button>
      </div>

      <>
        {screen === 1 ? (
          <FromTo
            arrivals={arrivals}
            setArrivals={setArrivals}
            setScreen={setScreen}
            values={values}
            fromTo={fromTo}
            setFromTo={setFromTo}
            type={type}
          />
        ) : screen === 2 ? (
          <Departure
            departureDate={departureDate}
            setDepartureDate={setDepartureDate}
            type={type}
            setScreen={setScreen}
          />
        ) : screen === 3 ? (
          <Flight
            departureDate={departureDate}
            setDepartureDate={setDepartureDate}
            returningDate={returningDate}
            setReturningDate={setReturningDate}
            type={type}
            setType={setType}
            setScreen={setScreen}
          />
        ) : screen === 4 ? (
          <Passengers
            setScreen={setScreen}
            passengers={passengers}
            setPassengers={setPassengers}
            infant={infant}
            setInfant={setInfant}
            adult={adult}
            setAdult={setAdult}
            child={child}
            setChild={setChild}
          />
        ) : (
          <BookingEnd
            departureDate={departureDate}
            passengers={passengers}
            infant={infant}
            adult={adult}
            child={child}
            fromTo={fromTo}
            type={type}
            promocode={promocode}
            setPromocode={setPromocode}
            returningDate={returningDate}
            setShowModal={setShowModal}
          />
        )}
      </>
    </div>
  );
};

export default MobileSearch;
