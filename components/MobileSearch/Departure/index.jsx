import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "react-date-picker/dist/DatePicker.css";

const Departure = ({ setDepartureDate, departureDate, setScreen, hasContent }) => {

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
              setTimeout(() => {
                setScreen(4);
              }, 400);
            }}
            value={departureDate}
            minDate={new Date()}
          />
        </div>
      </div>
    </div>
  );
};

export default Departure;
