import Calendar from "react-calendar";
import { format } from "date-fns";
import { lowfare } from "../../../utils/calendar";
import "react-calendar/dist/Calendar.css";
import "react-date-picker/dist/DatePicker.css";

const Departure = ({ setDepartureDate, departureDate, setScreen }) => {
  function hasContent({ date }) {
    for (const key in lowfare) {
      if (key === format(date, "yyyy-MM-dd")) {
        return (
          <p className="text-[10px] font-light leading-tight my-1 text-[#9E9BBF]">
            ₦{Math.round(lowfare[key])}K
          </p>
        );
      }
    }
    return <p></p>;
  }

  return (
    <div className="flex flex-col w-full justify-start items-center h-full gap-1">
      <div className="h-full relative bg-primary-main w-full p-3 flex flex-col justify-start items-center gap-4">
        <p className="text-white text-sm text-center px-4 w-full justify-start items-center gap-1">
          The fares being shown below are the lowest fares available for you
        </p>
        <div className="departure-mobile">
          <Calendar
            id="departure"
            clearIcon={null}
            calendarIcon={null}
            tileContent={hasContent}
            format={"d/M/y"}
            name="departure"
            onChange={(value) => {
              setDepartureDate(value);
              // console.log(value);
            }}
            value={departureDate}
            minDate={new Date()}
          />
        </div>
        <div className="w-full max-w-[400px] px-4">
          <button
            className="btn btn-primary !text-white border-white border w-full md:w-auto font-title block h-full"
            onClick={() => setScreen(4)}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default Departure;
