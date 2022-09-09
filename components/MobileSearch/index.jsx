import * as React from "react";
import { format, add } from "date-fns";
import Select, { components } from "react-select";
import { useQuery } from "@tanstack/react-query";
import Back from "assets/svgs/icon-back-small.svg";
import CloseIcon from "assets/svgs/white-close.svg";
import DatePicker from "react-date-picker/dist/entry.nostyle";
import { getWidgetData } from "../../services";
import "react-calendar/dist/Calendar.css";
import "react-date-picker/dist/DatePicker.css";
import { lowfare } from "../../utils/calendar";
import FromTo from "./FromTo";
import Departure from "./Departure";
import Flight from "./Flight";
import Passengers from "./Passengers";

const MobileSearch = ({
  showModal,
  setShowModal,
  arrivals,
  updateAdult,
  updateChild,
  updateInfant,
  decreaseAdult,
  switchSection,
  setFromTo,
  setArrivals,
  setDepartureDate,
  setReturnDate,
  departureDate,
  returnDate,
  setOrigin,
  setDestination,
  setFromDate,
  setToDate,
  origin,
  destination,
  formatOptionLabel,
  Option,
  hasContent,
}) => {
  const [screen, setScreen] = React.useState(1);

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-20 h-screen w-screen bg-white flex flex-col justify-start items-center">
      <div className="w-full flex justify-between items-center gap-2 p-4 bg-primary-main">
        <button
          onClick={() => {
            screen <= 1 ? null : setScreen(screen - 1);
          }}
          className=""
        >
          <Back />
        </button>
        <h2 className="text-white font-bold text-lg font-body">
          {screen === 1
            ? "Select Route"
            : screen === 2
            ? "Departure Date"
            : screen === 3
            ? "Flight Dates"
            : "Select Passengers"}
        </h2>
        <button onClick={() => setShowModal(false)} className="">
          <CloseIcon />
        </button>
      </div>

      <>
        {screen === 1 ? (
          <FromTo
          // arrivals={arrivals}
          // origin={origin}
          // destination={destination}
          // setScreen={setScreen}
          />
        ) : screen === 2 ? (
          <Departure
          // setFromDate={setFromDate}
          // setToDate={setToDate}
          // setScreen={setScreen}
          />
        ) : screen === 3 ? (
          <Flight
          // setFromDate={setFromDate}
          // setToDate={setToDate}
          // setScreen={setScreen}
          />
        ) : (
          <Passengers
          // setShowModal={setShowModal}
          />
        )}
      </>
    </div>
  );
};

export default MobileSearch;
