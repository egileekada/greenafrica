/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import AeroTwoIcon from "assets/svgs/aerotwo.svg";
import DottedLine from "assets/svgs/dotted-line.svg";
import CaretDown from "assets/svgs/caretdown.svg";
import IbeTripVariant from "./IbeTripVaraint";
import { format, differenceInMinutes } from "date-fns";
import { timeConvert } from "utils/common";
import { useGetLocationsQuery } from "services/widgetApi.js";
import { sessionSelector } from "redux/reducers/session";
import { useSelector } from "react-redux";

const IbeTripItem = ({ journey, schedueIndex }) => {
  const { data, isLoading } = useGetLocationsQuery();

  const [isVisible, setIsVisible] = useState(false);
  const [flightTime, setFlightTime] = useState(null);
  const { selectedSessionJourney, selectedSessionFare } =
    useSelector(sessionSelector);

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

  const itemFare =
    selectedSessionFare &&
    selectedSessionFare.filter(
      (_fare) => parseInt(_fare?.schedueIndex) === parseInt(schedueIndex)
    );

  return (
    <section className="flex flex-col mb-6">
      <section className="ibe__trip__item relative">
        {itemFare &&
          itemFare?.length > 0 &&
          journey?.JourneySellKey === itemFare[0]?.sellKey && (
            <p className="bg-primary-main text-green py-1 px-2  rounded-[4px] absolute bottom-[12px] text-[8px]">
              {parseInt(schedueIndex) === 0 ? "Go" : "Return"} Selected - g
              {itemFare[0]?.RuleNumber}
            </p>
          )}

        {!isLoading && (
          <div className="basis-full lg:basis-[70%] flex flex-col min-h-[54px]relative ">
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
                    resolveAbbreviation(flightTime?.DepartureStation)}
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
                  {flightTime &&
                    resolveAbbreviation(flightTime?.ArrivalStation)}
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
        )}
        <div className="basis-full lg:basis-[30%] mt-4 lg:mt-0 flex justify-end items-center relative">
          {!isVisible ? (
            <button
              className="btn btn-primary w-full lg:w-[200px] flex items-center justify-center text-center group lg:ml-4"
              onClick={() => setIsVisible(!isVisible)}
            >
              {/* <span className="text-white mr-3">From ₦16,501</span> */}
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
      </section>
      <section
        className={`variant-bg w-full min-h-[96px] pb-10 transition-all rounded-b-md border-b ${
          isVisible ? "flex flex-col" : "hidden"
        }`}
      >
        <div className="border-t border-t-black border-opacity-20 mx-6 lg:mx-0 mb-7"></div>
        <div className=" grid lg:grid-cols-3  gap-2 lg:px-0 px-0 items-stretch">
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
      {/* {!isVisible &&
        journey.Segments.map((_segment) => {
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
        })} */}
    </section>
  );
};

IbeTripItem.defaultProps = {
  journey: {},
  schedueIndex: "",
};

export default IbeTripItem;
