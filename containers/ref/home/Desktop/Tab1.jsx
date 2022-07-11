/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";
import $ from "jquery";
import ToIcon from "assets/svgs/ToIcon.svg";
import CalendarIcon from "assets/svgs/calendar-number-outline.svg";
import { addScript } from "utils/functions";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Tab1 = ({ activeTab }) => {
  const [departureDate, setDepartureDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());
  const [search, setSearch] = useState({
    depPort: "",
  });
  const [dateOpen, setDateOpen] = useState(false);
  const [returnDateOpen, setReturnDateOpen] = useState(false);
  const formRef = useRef();

  useEffect(() => {
    // if ($) {
    const script = addScript({
      src: `https://book-flyaero.crane.aero/web/FlightSearchAPI?language=en`,
      id: "flycrane-script",
      onLoad: () => {
        window.flightSearch = new FlightSearch();

        window.flightSearch.depPort = $("#depPort");
        //default $(' #depPort')
        window.flightSearch.depPortArea = $("#depPortArea");
        // default $('#depPortArea')
        window.flightSearch.arrPort = $("#arrPort");
        // default $('# arrPort')
        window.flightSearch.arrPortArea = $("#arrPortArea"); // default $('#arrPortArea')
        window.flightSearch.multiDepPort = $("#multiDepPort"); // default $('#multiDepPort')
        // window.flightSearch.multiDepPortArea = $("#multiDepPorttArea'");
        //default $('#multiDepPorttArea')
        window.flightSearch.multiArrPort = $("#multiArrPort"); // default $('#multiArrPort')
        window.flightSearch.multiArrPortArea = $("#multiArrPortArea"); // $('#multiArrPortArea')
        window.flightSearch.departureDate = $("#departureDate"); // default $('#departureDate')
        window.flightSearch.departureDateArea = $("#departureDateArea"); // $('#departureDateArea')
        window.flightSearch.returnDate = $("#returnDate"); // default $('#returnDate')
        window.flightSearch.returnDateArea = $("#returnDateArea"); // default $('#returnDateArea')
        // flightSearch.openDate = $("#openDate");
        // default $('#openDate')
        // flightSearch.openDateArea = $("#openDateArea")
        // default $('#openDateArea')
        window.flightSearch.openDepartureDate = $("#openDepartureDate");
        window.flightSearch.openDepartureDateArea = $("#openDepartureDateArea");

        window.flightSearch.openReturnDate = $("#openReturnDate");
        window.flightSearch.openReturnDateArea = $("#openReturnDateArea");
        window.flightSearch.adult = $("#adult"); // default $('#adult')
        window.flightSearch.adultArea = $("#adultArea"); // default $('#adultArea')
        window.flightSearch.child = $("#child"); // default $('#child')
        window.flightSearch.childArea = $("#childArea"); // default $('#childArea')
        window.flightSearch.infant = $("#infant"); // default $('#infant')
        window.flightSearch.infantArea = $("#infantArea"); // default $('#infantArea')
        window.flightSearch.tripType = $("#tripType"); // default $('# tripType')
        window.flightSearch.tripTypeArea = $("#tripTypeArea"); // default $('# tripTypeArea')

        window.flightSearch.actionURL =
          "https://book-flyaero.crane.aero/web/RezvEntry.xhtml?LANGUAGE=EN";

        window.flightSearch.init();
        window.flightSearch.selectTripType("ONE_WAY");
        window.flightSearch.adult.val(1);
      },
    });
    // }
  }, [activeTab]);

  return (
    <form
      action="https://book-flyaero.crane.aero/web/RezvEntry.xhtml?LANGUAGE=EN"
      method="POST"
      ref={formRef}
    >
      <div className="filter__type">
        <h3 className="text-caption mr-4">Trip Type:</h3>
        <div className="flex">
          <div className="filter-radio-group" id="tripTypeArea">
            <input
              name="tripType"
              type="radio"
              value="ONE_WAY"
              id="tripType:0"
              defaultChecked
              checked={true}
              onClick={(e) =>
                window.flightSearch.selectTripType(e.target.value)
              }
            />
            <label className="text-caption">One Way</label>
          </div>
          <div className="filter-radio-group">
            <input
              name="tripType"
              type="radio"
              id="tripType:1"
              value="ROUND_TRIP"
              onClick={(e) =>
                window.flightSearch.selectTripType(e.target.value)
              }
            />
            <label className="text-caption">Round Trip</label>
          </div>
        </div>
      </div>
      <div className="filter__search">
        <div className="flex items-start border-r border-primary-main mb-4">
          <div className="flex flex-col basis-1/3">
            <p className="">Flying From</p>
            <div id="depPortArea">
              <select
                name="depPort"
                id="depPort"
                placeholder="From"
                className="port-area"
                onChange={(e) => {
                  setSearch({
                    ...search,
                    depPort: e.target.value,
                  });
                  window.flightSearch.selectDepPort(e.target.value);
                }}
              >
                <option value="">From</option>
              </select>
            </div>

            <p className="date"> {search.depPort}</p>
          </div>
          <div className="flex  items-center justify-center basis-1/3">
            <ToIcon />
          </div>
          <div className="flex flex-col basis-1/3">
            <div id="arrPortArea">
              <p>Flying To</p>

              <select
                name="arrPort"
                id="arrPort"
                placeholder="To"
                className="port-area"
                onChange={(e) => {
                  setSearch({
                    ...search,
                    arrPort: e.target.value,
                  });
                  window.flightSearch.selectArrPort(e.target.value);
                }}
              >
                <option value="">To</option>
              </select>
            </div>

            <p className="date"> {search.arrPort}</p>
          </div>
        </div>
        <div className="flex items-start justify-between pl-10 mb-4">
          <div className="basis-[45%] flex flex-col">
            <div className="flex flex-col mb-2">
              <p className="">Travelling On</p>

              <div className="flex items-center">
                <div id="departureDateArea" className="w-[70%]">
                  <DatePicker
                    open={dateOpen}
                    minDate={moment().toDate()}
                    dateFormat="dd/MM/yyyy"
                    id="departureDate"
                    selected={departureDate}
                    onChange={(date) => {
                      setDepartureDate(date);
                      window.flightSearch.selectDepartureDate(
                        moment(departureDate).format("DD/MM/yyyy")
                      );
                      setDateOpen(false);
                    }}
                  />
                </div>
                <CalendarIcon className="w-6 h-6" />
              </div>

              <button
                type="button"
                onClick={() => setDateOpen(!dateOpen)}
                className="btn btn-white change-date"
              >
                {dateOpen ? "Close" : "Change"}
              </button>
            </div>

            <div className="flex flex-col" id="returnDateArea">
              <p className="">Returning On</p>
              <div className="flex items-center">
                <div className="w-[70%]">
                  <DatePicker
                    open={returnDateOpen}
                    minDate={moment().toDate()}
                    dateFormat="dd/MM/yyyy"
                    id="returnDate"
                    selected={returnDate}
                    onChange={(date) => {
                      setReturnDate(date);
                      window.flightSearch.selectReturnDate(
                        moment(returnDate).format("DD/MM/yyyy")
                      );
                      setReturnDateOpen(false);
                    }}
                  />
                </div>
                <CalendarIcon className="w-6 h-6" />
              </div>

              <button
                type="button"
                onClick={() => setReturnDateOpen(!returnDateOpen)}
                className="btn btn-white change-date"
              >
                {returnDateOpen ? "Close" : "Change"}
              </button>
              {/* <p className="date">
                {moment(returnDate).format("MMM DD, YYYY")}
              </p> */}
            </div>
          </div>

          <div className="flex flex-col basis-[45%] justify-start items-start">
            <p>People Travelling</p>
            <div className="flex flex-col w-full">
              <div id="adultArea" className="w-full flex justify-between">
                <label className="basis-[40%] flex-grow-0" htmlFor="adult">
                  Adult (12+)
                </label>
                <select
                  name="adult"
                  id="adult"
                  className="passenger-select"
                  placeholder="Adult (12+)"
                ></select>
              </div>

              <div id="childArea" className="w-full flex justify-between">
                <label className="basis-[40%] flex-grow-0" htmlFor="child">
                  Child (2-12)
                </label>

                <select
                  name="child"
                  id="child"
                  className="passenger-select"
                  placeholder="Child (2-12)"
                ></select>
              </div>
              <div id="infantArea" className="w-full flex justify-between">
                <label className="basis-[40%] flex-grow-0" htmlFor="infant">
                  Infant (0-2)
                </label>

                <select
                  name="infant"
                  id="infant"
                  placeholder="Infant (0-2)"
                  className="passenger-select"
                ></select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="filter__cta">
        <button
          className="btn btn-orange"
          type="button"
          onClick={() => window.flightSearch.search()}
        >
          <span> Find Flights</span>
        </button>
      </div>
    </form>
  );
};

Tab1.getInitialProps = async (ctx) => {
  return {
    activeTab: "",
  };
};

export default Tab1;
