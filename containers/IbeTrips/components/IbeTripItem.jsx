/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import AeroTwoIcon from "assets/svgs/aerotwo.svg";
import DottedLine from "assets/svgs/dotted-line.svg";
import CaretDown from "assets/svgs/caretdown.svg";
import IbeTripVariant from "./IbeTripVaraint";
import { format, differenceInMinutes } from "date-fns";
import { timeConvert } from "utils/common";

const IbeTripItem = ({ journey }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [flightTime, setFlightTime] = useState(null);

  useEffect(() => {
    if (journey) {
      let _info = {};
      journey.Segments.map((_segment) => {
        _info = {
          STA: _segment?.STA,
          STD: _segment?.STD,
          ArrivalStation: _segment?.ArrivalStation,
          DepartureStation: _segment?.DepartureStation,
        };
      });

      setFlightTime({
        ..._info,
      });
    }
  }, [journey]);

  const leastFare =
    journey?.Segments[0]?.Fares[0]?.PaxFares[0]?.ServiceCharges.reduce(
      (accumulator, object) => {
        return accumulator + object.Amount;
      },
      0
    );

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
              <p className="tripCity">
                {flightTime && flightTime?.DepartureStation}
              </p>
            </div>
            <div className="tripIconPath">
              <DottedLine className="dotted-svg" />
              <AeroTwoIcon className="aero-svg" />
              <DottedLine className="dotted-svg" />
            </div>
            <div className="flex flex-col items-end">
              <h5 className="tripType right-text">
                {flightTime && format(new Date(flightTime?.STA), "HH:mm")}
              </h5>
              <p className="tripCity right-text">
                {flightTime && flightTime?.ArrivalStation}
              </p>
            </div>
          </div>
          <p className="tripTime self-center">
            {flightTime &&
              timeConvert(
                differenceInMinutes(
                  new Date(flightTime?.STA),
                  new Date(flightTime?.STD)
                )
              )}
          </p>
        </div>
        <div className="basis-full lg:basis-[40%] mt-4 lg:mt-0 flex justify-end items-center">
          {!isVisible ? (
            <button
              className="btn btn-primary w-full lg:w-[200px] flex items-center justify-center text-center group lg:ml-4"
              onClick={() => setIsVisible(!isVisible)}
            >
              {/* <span className="text-white mr-3">From ₦16,501</span> */}
              <span className="text-white mr-3">
                {leastFare ? `From ${leastFare.toLocaleString()}` : "Proceed"}
              </span>
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
        <div className="flex flex-wrap lg:flex-nowrap justify-between px-6 lg:px-12 items-stretch">
          {journey.Segments.map((_segment) => {
            return _segment.Fares.map((_fare) => {
              return (
                <div className="basis-full lg:basis-[29%] mb-7">
                  <IbeTripVariant
                    fare={_fare}
                    sellKey={journey?.JourneySellKey}
                    segmentStd={_segment.STD}
                    segmentFlightNumber={
                      _segment?.FlightDesignator?.FlightNumber
                    }
                    journey={journey}
                  />
                </div>
              );
            });
          })}
        </div>
      </section>
      {!isVisible && (
        <>
          {journey.Segments.map((_segment) => {
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
          })}
        </>
      )}
    </section>
  );
};

IbeTripItem.defaultProps = {
  journey: {},
};

export default IbeTripItem;
