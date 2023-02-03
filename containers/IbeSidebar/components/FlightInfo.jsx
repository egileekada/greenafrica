/* eslint-disable @next/next/no-img-element */
import CalendarIcon from "assets/svgs/calendar.svg";
import Spinner from "components/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { sessionSelector } from "redux/reducers/session";
import { showWidget } from "redux/reducers/general";
import format from "date-fns/format";

const FlightInfo = ({ enableEdit }) => {
  const dispatch = useDispatch();
  const { flightParams, sessionStateResponse } = useSelector(sessionSelector);

  const totalPassengers =
    parseInt(flightParams?.ADT) +
    parseInt(flightParams?.CHD) +
    parseInt(flightParams?.INF);

  return (
    <section className="ibe__sidebar__item mb-10 ">
      <p className="mb-4 font-semibold text-sm text-[#26205E] ">FLIGHT INFORMATION</p>
      <div className="ibe__sidebar__flightInfo">
        <div className="flex items-center">
          <figure className="mr-2">
            <CalendarIcon />
          </figure>
          <div className="flex flex-col">
            <h4 className="text-white !text-sm font-display font-semibold mb-1">
              {flightParams?.beginDate
                ? format(new Date(flightParams?.beginDate), "dd LLL yyyy")
                : "Date"}
            </h4>
            <h5 className="text-[#928DC0] !text-sm font-display font-semibold">
              {totalPassengers} PASSENGER{totalPassengers > 1 ? "S" : ""}
            </h5>
          </div>
        </div>

        {enableEdit && (
          <button
            className="text-white font-bold !text-[15px] underline"
            onClick={() => dispatch(showWidget())}
          >
            Change
          </button>
        )}
      </div>
    </section>
  );
};

export default FlightInfo;
