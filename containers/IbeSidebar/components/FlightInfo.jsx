/* eslint-disable @next/next/no-img-element */
import CalendarIcon from "assets/svgs/calendar.svg";
import { useSelector } from "react-redux";
import { sessionSelector } from "redux/reducers/session";

const FlightInfo = () => {
  const { flightParams } = useSelector(sessionSelector);

  const totalPassengers =
    parseInt(flightParams?.ADT) +
    parseInt(flightParams?.CHD) +
    parseInt(flightParams?.INF);

  return (
    <section className="ibe__sidebar__item mb-10">
      <h1 className="mb-4">FLIGHT INFORMATION</h1>
      <div className="ibe__sidebar__flightInfo">
        <div className="flex items-center">
          <figure className="mr-2">
            <CalendarIcon />
          </figure>
          <div className="flex flex-col">
            <h4 className="text-white text-[10px] leading-[13px] font-display font-extrabold mb-1">
              {/* 22 JULY 2022 */}
              {flightParams?.beginDate}
            </h4>
            <h5 className="text-[#928DC0]  text-[10px] leading-[13px] font-display font-extrabold">
              {totalPassengers} PASSENGER{totalPassengers > 1 ? "S" : ""}
            </h5>
          </div>
        </div>
        <button className="text-white underline">Change</button>
      </div>
    </section>
  );
};

export default FlightInfo;
