/* eslint-disable @next/next/no-img-element */
import { Fragment, useEffect } from "react";
import IbeTripItem from "./components/IbeTripItem";
import { useSelector } from "react-redux";
import { sessionSelector } from "redux/reducers/session";
import Spinner from "components/Spinner";
import format from "date-fns/format";

const IbeTrips = ({ flightSchedule, schedueIndex }) => {
  const { flightAvailabilityLoading, flightParams } =
    useSelector(sessionSelector);

  return (
    <section className="ibe__flight__trips ">
      {/* <h2 className="text-primary-main font-extrabold text-base mb-8 capitalize">
        
        {parseInt(schedueIndex) === 0
          ? `DEPARTURE  `
          : ""}
      </h2> */}

      <Fragment>
        {flightAvailabilityLoading ? (
          <Spinner />
        ) : (
          <section
            className="flex flex-col"
            // id={schedueIndex === 0 ? "departureContainer" : "returnContainer"}
          >
            {!flightSchedule ? (
              flightSchedule.length > 0 ? (
                flightSchedule.map((_schedule) => {
                  return _schedule.Journeys.map((_journey, _journeyIndex) => {
                    return (
                      <IbeTripItem
                        journey={_journey}
                        schedueIndex={schedueIndex}
                      />
                    );
                  });
                })
              ) : (
                <h2 className=" text-red-600 font-normal text-sm mb-8">
                  Error occured fetching flights
                </h2>
              )
            ) : (
              <div className=" w-full bg-white flex flex-col items-center px-4 justify-center py-12 lg:py-[107px] " >
                <div className=" bg-[#EFF1FE] w-[80px] h-[80px] rounded-full flex justify-center items-center " >
                  <svg width="51" height="51" viewBox="0 0 51 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.125 4.125L1.60631 6.64369L16.2054 21.2428L2.53256 28.0793C1.94038 28.3742 1.44225 28.8286 1.09422 29.3913C0.746177 29.9539 0.562035 30.6025 0.562501 31.2641V36.1875L21.9375 29.0625V41.5312L14.8125 46.875V50.4375L25.5 46.875L36.1875 50.4375V46.875L29.0625 41.5312V34.0999L44.3563 49.3937L46.875 46.875L4.125 4.125ZM48.4674 28.0793L29.0625 18.375V4.125C29.0625 3.18017 28.6872 2.27403 28.0191 1.60593C27.351 0.937834 26.4448 0.5625 25.5 0.5625C24.5552 0.5625 23.649 0.937834 22.9809 1.60593C22.3128 2.27403 21.9375 3.18017 21.9375 4.125V16.9001L36.6186 31.5812L50.4375 36.1875V31.2641C50.438 30.6025 50.2538 29.9539 49.9058 29.3913C49.5578 28.8286 49.0596 28.3742 48.4674 28.0793Z" fill="#26205E"/>
                  </svg>
                </div>
                <p className="mt-8 text-black !font-bold text-center lg:!text-xl " >No flights available at the moment</p>
                <p className=" font-normal my-2 font-body text-black max-w-2xl text-center " >There are no flights on <span className=" font-semibold ">Wednesday, June 22, 2022</span> heading to <span className=" font-semibold ">Abuja</span> . Please select<br/> another date for your flight or try another destination</p>
                <button className=" lg:w-[306px] w-full font-semibold bg-primary-main text-white rounded-xl h-[50px] mt-8 " >Change Destination</button>
                <button className=" lg:w-[306px] w-full font-semibold border border-primary-main text-primary-main lg:block hidden rounded-xl h-[50px] mt-4 " >Check Next Week’s Flights</button>
              </div>
            )}
          </section>
        )}
      </Fragment>
    </section>
  );
};

IbeTrips.defaultProps = {
  flightSchedule: {},
  schedueIndex: "",
};

export default IbeTrips;
