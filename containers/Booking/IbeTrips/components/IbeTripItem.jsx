/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import AeroTwoIcon from "assets/svgs/aerotwo.svg";
import DottedLine from "assets/svgs/dotted-line.svg";
import CaretDown from "assets/svgs/caretdown.svg";
import IbeTripVariant from "./IbeTripVaraint";
import { format, differenceInMinutes } from "date-fns";
import { timeConvert } from "utils/common";

import { useSelector } from "react-redux";
import { bookingSelector } from "redux/reducers/booking";
import { useGetLocationsQuery } from "services/widgetApi.js";

const IbeTripItem = ({ journey, schedueIndex }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [flightTime, setFlightTime] = useState(null);
  const { data, isLoading: locationLoading } = useGetLocationsQuery();

  const { goTrip, returnTrip } = useSelector(bookingSelector);

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

  const resolveAbbreviation = (abrreviation) => {
    const [{ name, code }] = data?.data?.items.filter(
      (location) => location.code === abrreviation
    );

    return `${name} (${code})`;
  };

  return (
    <section className="flex flex-col mb-6">
      <section className="ibe__trip__item relative">
        <div className="basis-full lg:basis-[70%] flex flex-col min-h-[54px] ">
          <p className="tripType self-center underline underline-offset-4">
            {journey.Segments.map((_segment) => {
              return (
                <>
                  {_segment?.FlightDesignator?.CarrierCode}
                  &nbsp;
                  {_segment?.FlightDesignator?.FlightNumber}
                </>
              );
            })}
          </p>
          <div className="flex justify-between">
            <div className="flex flex-col">
              <h5 className="tripType">
                {flightTime && format(new Date(flightTime?.STD), "HH:mm")}
              </h5>

              <p className="tripCity">
                {flightTime &&
                  !locationLoading &&
                  resolveAbbreviation(flightTime?.DepartureStation)}
              </p>

              {/* <p className="bg-primary-main text-green py-1 px-2  rounded-[4px] absolute left-6 top-3">
                selected
              </p> */}
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
                {flightTime &&
                  !locationLoading &&
                  resolveAbbreviation(flightTime?.ArrivalStation)}{" "}
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
        <div className="basis-full lg:basis-[30%] mt-4 lg:mt-0 flex justify-end items-center relative">
          {!isVisible ? (
            <button
              className="btn btn-primary w-full lg:w-[200px] flex items-center justify-center text-center group lg:ml-4"
              onClick={() => setIsVisible(!isVisible)}
            >
              <span className="text-white mr-3">
                {leastFare ? `From ₦${leastFare.toLocaleString()}` : "Proceed"}
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

        {goTrip?.journey?.JourneySellKey.toLowerCase() ===
        journey?.JourneySellKey.toLowerCase() ? (
          <p className="bg-primary-main text-green py-1 px-2  rounded-[4px] absolute top-[12px] text-[8px]">
            Go Selected -{" "}
            {goTrip?.fare?.RuleNumber.toLowerCase() === "savr" && "gSaver"}
            {goTrip?.fare?.RuleNumber.toLowerCase() === "flex" && "gFlex"}
            {goTrip?.fare?.RuleNumber.toLowerCase() === "clsc" && "gClassic"}
          </p>
        ) : null}

        {returnTrip?.journey?.JourneySellKey.toLowerCase() ===
        journey?.JourneySellKey.toLowerCase() ? (
          <p className="bg-primary-main text-green py-1 px-2  rounded-[4px] absolute top-[12px] text-[8px]">
            Return Selected -{" "}
            {returnTrip?.fare?.RuleNumber.toLowerCase() === "savr" && "gSaver"}
            {returnTrip?.fare?.RuleNumber.toLowerCase() === "flex" && "gFlex"}
            {returnTrip?.fare?.RuleNumber.toLowerCase() === "clsc" &&
              "gClassic"}
          </p>
        ) : null}
      </section>

      <section
        className={`variant-bg w-full min-h-[96px] pb-10 transition-all rounded-b-md border-b ${
          isVisible ? "flex flex-col" : "hidden"
        }`}
      >
        <div className="border-t border-t-black border-opacity-20 mx-6 mb-7"></div>
        <div className="flex flex-wrap lg:flex-nowrap justify-between px-6 lg:px-12 items-stretch">
          {journey.Segments.map((_segment) => {
            return _segment.Fares.map((_fare) => {
              return (
                <div
                  className={`basis-full ${
                    _segment.Fares.length > 2
                      ? "lg:basis-[29%]"
                      : "lg:basis-[47%] "
                  } l mb-7`}
                >
                  <IbeTripVariant
                    fare={_fare}
                    sellKey={journey?.JourneySellKey}
                    segmentStd={_segment.STD}
                    segmentFlightNumber={
                      _segment?.FlightDesignator?.FlightNumber
                    }
                    segmentCarrierCode={_segment?.FlightDesignator?.CarrierCode}
                    journey={journey}
                    schedueIndex={schedueIndex}
                    setIsVisible={setIsVisible}
                    segment={_segment}
                  />
                </div>
              );
            });
          })}
        </div>
      </section>
    </section>
  );
};

IbeTripItem.defaultProps = {
  journey: {},
  schedueIndex: "",
};

export default IbeTripItem;
