/* eslint-disable @next/next/no-img-element */
// import OneIcon from "assets/svgs/one.svg";
import { useState } from "react";
import CheckIcon from "assets/svgs/done.svg";
import OneIcon from "assets/svgs/one.svg";
import CostIcon from "assets/svgs/cost.svg";
import FlightIcon from "assets/svgs/aero-2.svg"; 
import CaretLeft from "assets/svgs/sidebar/caretleft.svg";
import { useSelector } from "react-redux";
import { sessionSelector } from "redux/reducers/session";
import { format } from "date-fns";

const TripInfo = () => {
  const [showContent, setShow] = useState(false);
  const { sessionStateResponse } = useSelector(sessionSelector);

  const EmptyTrip = () => {
    return (
      <div className="ibe__sidebar__box">
        <div className="ibe__sidebar__empty h-[187px] !text-sm">
          <figure>
            <FlightIcon />
          </figure>
          <p className="text-[#26205E] text-[14px] font-medium mt-[2px] " >No flight yet</p>
        </div>
      </div>
    );
  };

  const JourneyItem = ({ segment }) => {
    return (
      <div className="ibe__sidebar__box">
        <div className="flex mb-6">
          <div className="flex flex-col w-[53px] mr-4">
            <div className="bg-primary-main h-6 rounded-t-[3px] flex justify-center items-center">
              <h6 className=" text-center !text-sm leading-[13px] font-semibold text-white">
                {format(new Date(segment?.STD), "MMM")}
              </h6>
            </div>
            <div className="bg-purple-light h-6 rounded-b-[3px] flex justify-center items-center">
              <h6 className="text-center text-sm font-semibold text-[#1F1955] text-body">
                {format(new Date(segment?.STD), "dd")}
              </h6>
            </div>
          </div>
          <div className="flex flex-col">
            <h5 className="text-sm font-extrabold text-primary-main font-display mb-2">
              {segment?.DepartureStation} - {segment?.ArrivalStation}
            </h5>
            <h6 className="!text-sm font-normal text-[#9692B8] font-title">
              {format(new Date(segment?.STD), "HH:mm")} -{" "}
              {format(new Date(segment?.STA), "HH:mm")}
            </h6>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="ibe__sidebar__row bordered">
            <div className="flex items-center">
              <figure className="mr-2">
                <FlightIcon />
              </figure>
              <p className="text-[#26205E] text-[13px] font-medium  " >Flight :</p>
            </div>
            <div>
              <h6>
                {segment?.FlightDesignator?.CarrierCode}{" "}
                {segment?.FlightDesignator?.FlightNumber}
              </h6>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="ibe__sidebar__row bordered">
            <div className="flex items-center">
              <figure className="mr-2">
                <CostIcon />
              </figure>
              <p className="text-[#26205E] text-[13px] font-medium " >Flight Cost :</p>
            </div>
            <div>
              <h6>
                ₦
                {sessionStateResponse?.BookingData?.BookingSum?.BalanceDue.toLocaleString()}
              </h6>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="ibe__sidebar__item mb-10">
      <p className="mb-4 font-semibold text-sm text-[#26205E] ">PLAN YOUR TRIP</p>

      <button
        className="ibe-accordion-header"
        onClick={() => setShow(!showContent)}
      >
        <div className="flex items-center">
          <figure className="mr-2">
            {sessionStateResponse?.BookingData?.Journeys.length > 0 ? (
              <CheckIcon />
            ) : (
              <OneIcon />
            )}
          </figure>
          <div className="flex flex-col">
            <p className=" text-[15px] font-bold text-white " >Flight Details</p>
          </div>
          <figure
            className={`ml-auto transform ${showContent ? "rotate-90" : ""}`}
          >
            <CaretLeft />
          </figure>
        </div>
      </button>

      {showContent && (
        <>
          {sessionStateResponse?.BookingData?.Journeys.length > 0 ? (
            sessionStateResponse?.BookingData?.Journeys.map((_journey) => {
              return _journey?.Segments.map((_segment) => {
                return <JourneyItem segment={_segment} />;
              });
            })
          ) : (
            <EmptyTrip />
          )}
        </>
      )}
    </section>
  );
};

export default TripInfo;
