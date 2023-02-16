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
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.7966 15.0854L10.6387 15.4377H11.0248H11.8873C12.1617 15.4377 12.3872 15.6632 12.3872 15.9376C12.3872 16.212 12.1617 16.4375 11.8873 16.4375L10.3499 16.4375H10.1851L10.1201 16.589L9.62255 17.75H8.1764L9.47067 10.8838L9.52419 10.5999L9.23555 10.5877C6.59864 10.4763 4.03112 9.91859 2.27919 9.43405L2.11854 9.38962L2.01575 9.52084L0.347374 11.6506L1.13864 9.11193L1.14996 9.07559V9.03754V9V8.96241L1.1389 8.92648L0.345142 6.34666L2.01565 8.47916L2.11844 8.61038L2.27909 8.56595C4.03066 8.0815 6.63594 7.52369 9.2356 7.4123L9.52405 7.39994L9.47057 7.11622L8.17643 0.25L9.62077 0.25L10.1193 1.44631L10.1834 1.60014H10.3501L11.8876 1.60014C12.1621 1.60014 12.3876 1.82564 12.3876 2.10007C12.3876 2.37451 12.1621 2.60001 11.8876 2.60001H11.0251H10.6391L10.797 2.95227L11.2844 4.03977L11.3506 4.18751H11.5125H12.825C13.0994 4.18751 13.3249 4.41302 13.3249 4.68745C13.3249 4.96188 13.0994 5.18739 12.825 5.18739H12.1875H11.8053L11.9585 5.53759L12.746 7.33766L12.8059 7.47452L12.9548 7.48664C14.5576 7.6171 15.7892 7.84908 16.6128 8.14321C17.0256 8.29065 17.3206 8.44843 17.5079 8.60517C17.6944 8.76122 17.75 8.89426 17.75 9C17.75 9.10574 17.6944 9.23886 17.5076 9.39566C17.32 9.55314 17.0247 9.71208 16.6115 9.86191C15.7873 10.1608 14.5551 10.402 12.9515 10.5513L12.8047 10.5649L12.7457 10.7L11.9582 12.5001L11.805 12.8503L12.1872 12.8503H12.8247C13.0991 12.8503 13.3246 13.0758 13.3246 13.3502C13.3246 13.6246 13.0991 13.8502 12.8247 13.8502L11.5122 13.8502H11.3503L11.2841 13.9979L10.7966 15.0854Z" stroke="black" stroke-width="0.5"/>
                </svg>
                {/* <FlightIcon /> */}
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
