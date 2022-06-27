/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";
import $ from "jquery";
import ToIcon from "assets/svgs/ToIcon.svg";
import CalendarIcon from "assets/svgs/calendar-number-outline.svg";
import { addScript } from "utils/functions";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const MobileTab1 = () => {
  const [departureDate, setDepartureDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());
  const [search, setSearch] = useState({
    depPort: "",
  });
  const formMobileRef = useRef();

  useEffect(() => {
    if ($) {
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
          // flightSearch.openDateArea = $("#openDateArea");
          // default $('#openDateArea')
          window.flightSearch.openDepartureDate = $("#openDepartureDate");
          window.flightSearch.openDepartureDateArea = $(
            "#openDepartureDateArea"
          );

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
    }
  }, []);

  return (
    <form
      action="https://book-flyaero.crane.aero/web/RezvEntry.xhtml?LANGUAGE=EN"
      method="POST"
      ref={formMobileRef}
    >
      <div className="mobile__filter__type">
        <h3 className="text-sm mr-2">Trip Type:</h3>
        <div className="flex">
          <div className="mobile__filter-radio-group" id="tripTypeArea">
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
          <div className="mobile__filter-radio-group">
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
      <div className="mobile__search ">
        <div className="flex flex-col justify-start basis-full flex-shrink-0">
          <p>Flying From</p>
          <div id="depPortArea">
            <select
              name="depPort"
              id="depPort"
              style={{
                width: "100%",
              }}
              placeholder="From"
              className="mobile-port-area"
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
        {/* <div className="mt-10 flex items-center justify-center basis-[15%] flex-shrink-0">
          <ToIcon />
        </div> */}
        <div className="flex flex-col justify-start basis-full flex-shrink-0">
          <p>Flying To</p>
          <div id="arrPortArea">
            {/* <p>Flying To</p> */}

            <select
              name="arrPort"
              id="arrPort"
              placeholder="To"
              className="mobile-port-area"
              style={{
                width: "100%",
              }}
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
      <div className="mobile__info">
        <div className="mobile__info__item" id="departureDateArea">
          <p>Travelling On</p>
          <div className="mobile__date">
            <div className="flex items-center">
              <div className="w-[70%]">
                <DatePicker
                  minDate={moment().toDate()}
                  dateFormat="dd/MM/yyyy"
                  id="departureDate"
                  selected={departureDate}
                  onChange={(date) => {
                    setDepartureDate(date);
                    window.flightSearch.selectDepartureDate(
                      moment(departureDate).format("DD/MM/yyyy")
                    );
                  }}
                />
              </div>
              <CalendarIcon className="w-4 h-4" />
            </div>
          </div>

          {/* <p>Enugu, Nigeria</p> */}
          {/* <button className="btn btn-white">Change</button> */}
        </div>

        <div className="mobile__info__item" id="returnDateArea">
          <p>Returning On</p>
          <div className="mobile__date">
            <div className="flex items-center">
              <div className="w-[70%]">
                <DatePicker
                  minDate={moment().toDate()}
                  dateFormat="dd/MM/yyyy"
                  id="returnDate"
                  selected={returnDate}
                  onChange={(date) => {
                    setReturnDate(date);
                    window.flightSearch.selectReturnDate(
                      moment(returnDate).format("DD/MM/yyyy")
                    );
                  }}
                />
              </div>
              <CalendarIcon className="w-4 h-4" />
            </div>
          </div>
          {/* <p>Enugu, Nigeria</p> */}
          {/* <button className="btn btn-white">Change</button> */}
        </div>

        <div className="mobile__info__item full">
          <p>People Travelling</p>

          <div className="flex flex-col w-full">
            <div id="adultArea" className="w-full flex justify-between">
              <label className="basis-[40%] flex-grow-0" htmlFor="adult">
                Adult (12+)
              </label>
              <select
                name="adult"
                id="adult"
                className="mobile-passenger-select"
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
                className="mobile-passenger-select"
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
                className="mobile-passenger-select"
              ></select>
            </div>
          </div>
        </div>
      </div>

      <div className="mobile__cta">
        <button
          className="btn btn-orange w-full"
          type="button"
          onClick={() => window.flightSearch.search()}
        >
          <span> Find Flights</span>
        </button>
      </div>
    </form>
  );
};

MobileTab1.getInitialProps = async (ctx) => {
  return {
    activeTab: "",
  };
};

export default MobileTab1;
