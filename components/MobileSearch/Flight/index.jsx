import * as React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "react-date-picker/dist/DatePicker.css";

const Flight = ({
  setDepartureDate,
  type,
  setType,
  returningDate,
  setReturningDate,
  departureDate,
  setScreen,
  hasContent,
}) => {
  const [returnFlight, setReturnFlight] = React.useState(false);
  const [flightDate, setFlightDate] = React.useState(departureDate);
  const [pickedReturnDate, setPickedReturnDate] = React.useState(false);
  const [showError, setShowError] = React.useState(false);

  const setDate = (value) => {
    if (returnFlight) {
      setFlightDate(value);
      setDepartureDate(value[0]);
      setReturningDate(value[1]);
      setPickedReturnDate(true);
    } else {
      setDepartureDate(value);
      setFlightDate(value);
      if (type === "round_trip") {
        setReturnFlight(true);
      }
    }
    // console.log("r", returningDate);
    // console.log("d", departureDate);
  };


  return (
    <div className="flex flex-col w-full justify-start items-center h-full gap-1">
      <div className="h-full relative bg-primary-main w-full p-3 flex flex-col justify-start items-center gap-4">
        <p className="text-white text-sm text-center px-4 w-full justify-start items-center gap-1">
          The fares being shown below are the lowest fares available for you
        </p>

        <div className="w-[80%] mt-2 mb-4 flex justify-center items-center rounded-xl">
          <div
            className={`py-3 cursor-pointer px-8 transition rounded-tl-xl rounded-bl-xl text-xs ${
              returnFlight === false
                ? "bg-green text-primary-main"
                : "bg-[#383368] text-white"
            }`}
            onClick={() => {
              setReturnFlight(false);
              // setType("");
            }}
          >
            Departing
          </div>
          <div
            className={`py-3 cursor-pointer px-8 transition rounded-tr-xl rounded-br-xl text-xs ${
              returnFlight === true
                ? "bg-green text-primary-main"
                : "bg-[#383368] text-white"
            }`}
            onClick={() => {
              setReturnFlight(true);
              // setType("round_trip");
            }}
          >
            Returning
          </div>
        </div>
        <div className="departure-mobile">
          <Calendar
            id="departure"
            clearIcon={null}
            calendarIcon={null}
            tileContent={hasContent}
            format={"d/M/y"}
            name="departure"
            onChange={(value) => {
              setDate(value);
              if (value?.length === 2) {
                setTimeout(() => {
                  setScreen(4);
                }, 400);
              }
            }}
            value={flightDate}
            selectRange={returnFlight}
            minDate={new Date()}
          />
        </div>
        {showError && !pickedReturnDate && (
          <p className="text-red-700 text-sm">
            You need to select a return date
          </p>
        )}
        {/*<div className="w-full max-w-[400px] px-4">
          <button
            className="btn btn-primary !text-white border-white border w-full md:w-auto font-title block h-full"
            onClick={() =>
              type === "round_trip" && !pickedReturnDate
                ? setShowError(true)
                : setScreen(4)
            }
          >
            Continue
          </button>
        </div>
				*/}
      </div>
    </div>
  );
};

export default Flight;
