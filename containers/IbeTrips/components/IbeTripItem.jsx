/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import AeroIcon from "assets/svgs/aero.svg";
import DottedLine from "assets/svgs/dotted-line.svg";
import CaretDown from "assets/svgs/caretdown.svg";
import IbeTripVariant from "./IbeTripVaraint";
import { format } from "date-fns";

const IbeTripItem = ({ flightSchedule }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [flightTime, setFlightTime] = useState(null);

  useEffect(() => {
    if (flightSchedule) {
      let _times = {};
      flightSchedule[0].Journeys.map((_journeys) => {
        _journeys.Segments.map((_segment) => {
          _times = {
            STA: _segment?.STA,
            STD: _segment?.STD,
          };
        });
      });
      setFlightTime({
        ..._times,
      });
    }
  }, [flightSchedule]);

  return (
    <section className="flex flex-col mb-6">
      <section className="ibe__trip__item">
        <div className="basis-full lg:basis-[60%] flex flex-col min-h-[54px] ">
          <p className="tripType self-center">Direct Flight</p>
          <div className="flex justify-between">
            <div className="flex flex-col">
              <h5 className="tripType">
                {flightTime && format(new Date(flightTime?.STD), "HH:mm")}
              </h5>
              <p className="tripCity">{flightSchedule[0]?.DepartureStation}</p>
            </div>
            <div className="tripIconPath">
              <DottedLine className="dotted-svg" />
              <AeroIcon className="aero-svg" />
              <DottedLine className="dotted-svg" />
            </div>
            <div className="flex flex-col items-end">
              <h5 className="tripType right-text">
                {flightTime && format(new Date(flightTime?.STA), "HH:mm")}
              </h5>
              <p className="tripCity right-text">
                {flightSchedule[0]?.ArrivalStation}
              </p>
            </div>
          </div>
          <p className="tripTime self-center">1h 35mins</p>
        </div>
        <div className="basis-full lg:basis-[40%] mt-4 lg:mt-0 flex justify-end items-center">
          {!isVisible ? (
            <button
              className="btn btn-primary w-full lg:w-[200px] flex items-center justify-center text-center group lg:ml-4"
              onClick={() => setIsVisible(!isVisible)}
            >
              <span className="text-white mr-3">From ₦16,501</span>
              <CaretDown />
            </button>
          ) : (
            <button
              className="btn btn-outline dotted w-full lg:w-[200px] flex items-center justify-center text-center  group lg:ml-4"
              onClick={() => setIsVisible(false)}
            >
              <span className="text-primary-main mr-2">Select a product</span>
            </button>
          )}
        </div>
      </section>
      <section
        className={`variant-bg w-full min-h-[96px] pb-10 transition-all rounded-b-md ${
          isVisible ? "flex flex-col" : "hidden"
        }`}
      >
        <div className="border-t border-t-black border-opacity-20 mx-6 mb-7"></div>
        <div className="flex flex-wrap lg:flex-nowrap justify-between px-6 lg:px-12">
          {flightSchedule[0].Journeys.map((_journeys) => {
            return _journeys.Segments.map((_segment) => {
              return _segment.Fares.map((_fare) => {
                return (
                  <div className="basis-full lg:basis-[29%] mb-7">
                    <IbeTripVariant
                      fare={_fare}
                      sellKey={_journeys?.JourneySellKey}
                    />
                  </div>
                );
              });
            });
          })}
        </div>
      </section>
      {!isVisible && (
        <>
          {flightSchedule[0].Journeys.map((_journeys) => {
            return _journeys.Segments.map((_segment) => {
              {
                /* console.log("_segment", _segment); */
              }
              return (
                <div className="ibe__trip__number">
                  <h4>FLIGHT NUMBER</h4>
                  <p>
                    {_segment?.FlightDesignator?.CarrierCode}
                    &nbsp;
                    {_segment?.FlightDesignator?.FlightNumber}
                  </p>
                </div>
              );
            });
          })}
        </>
      )}
    </section>
  );
};

IbeTripItem.defaultProps = {
  flightSchedule: {},
};

export default IbeTripItem;
