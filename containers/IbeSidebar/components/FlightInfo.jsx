/* eslint-disable @next/next/no-img-element */
import CalendarIcon from "assets/svgs/calendar.svg";

const FlightInfo = () => {
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
              22 JULY 2022
            </h4>
            <h5 className="text-[#928DC0]  text-[10px] leading-[13px] font-display font-extrabold">
              1 PASSENGER
            </h5>
          </div>
        </div>
        <button className="text-white underline">Change</button>
      </div>
     
    </section>
  );
};

export default FlightInfo;
