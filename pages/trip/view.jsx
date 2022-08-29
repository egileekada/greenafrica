/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import Link from "next/link";
import BaseLayout from "layouts/Base";
import IbeSidebar from "containers/IbeSidebar";
import FlightIcon from "assets/svgs/FlightTwo.svg";
import ArrowTo from "assets/svgs/arrowto.svg";
import { Checkbox } from "antd";
import BackIcon from "assets/svgs/seats/arrowleft.svg";
import ToTop from "assets/svgs/toTop.svg";
import AeroIcon from "assets/svgs/aero.svg";
import DottedLine from "assets/svgs/dotted-line.svg";
import WorkIcon from "assets/svgs/work.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  sessionSelector,
  saveSellRequest,
  FetchStateFromServer,
} from "redux/reducers/session";
import { format, differenceInMinutes } from "date-fns";
import { timeConvert } from "utils/common";
import { useRouter } from "next/router";
import LogoIcon from "assets/svgs/logo.svg";

const TripView = () => {
  const dispatch = useDispatch();
  const [flightTime, setFlightTime] = useState(null);
  const [checked, setChecked] = useState(false);
  const {
    flightParams,
    selectedSessionJourney,
    sellParams,
    selectedSessionFare,
    sellFlightLoading,
    sellResponse,
  } = useSelector(sessionSelector);
  const router = useRouter();

  useEffect(() => {
    async function init() {
      if (selectedSessionJourney && sellParams && selectedSessionFare) {
      } else {
        router.push("/");
      }
    }
    init();
  }, [selectedSessionJourney, sellParams]);

  useEffect(() => {
    async function redirectFromSell() {
      if (sellResponse) {
        router.push("/trip/passenger-form");
      }
    }
    redirectFromSell();
  }, [sellResponse]);

  useEffect(() => {
    if (selectedSessionJourney) {
      let _info = {};
      selectedSessionJourney.Segments.map((_segment) => {
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
  }, [selectedSessionJourney]);

  useEffect(() => {
    async function fetchStateInfo() {
      dispatch(FetchStateFromServer());
    }
    fetchStateInfo();
  }, []);

  const onChange = (e) => {
    setChecked(e.target.checked);
  };

  const handleSell = async () => {
    dispatch(
      saveSellRequest({
        sellKey: sellParams?.sellKey,
        segmentStd: sellParams?.segmentStd,
        segmentFlightNumber: sellParams?.segmentFlightNumber,
        fareKey: selectedSessionFare?.FareSellKey,
      })
    );
  };

  const ChangeFlight = async () => {
    const query = `/?origin=${flightParams?.departureStation}&destination=${flightParams?.arrivalStation}&departure=${flightParams?.beginDate}&adt=${flightParams?.ADT}&chd=${flightParams?.CHD}&inf=${flightParams?.INF}`;
    router.push(query);
  };

  const fare_name =
    selectedSessionFare?.RuleNumber?.toLowerCase() === "flex"
      ? "gFlex"
      : selectedSessionFare?.RuleNumber?.toLowerCase() === "savr"
      ? "gSaver"
      : "gClassic";

  const totalServiceCharge =
    selectedSessionFare?.PaxFares[0]?.ServiceCharges?.reduce(
      (accumulator, object) => {
        return accumulator + object.Amount;
      },
      0
    );

  return (
    <BaseLayout>
      {/* <nav className="nav bg-primary-main fit-x-bleed  items-center justify-between py-7 flex lg:hidden fixed w-full z-50">
        <button className="flex items-center">
          <BackIcon />
          <span className="ml-6 text-white text-xs">TRIP DETAILS</span>
        </button>
      </nav> */}
      <nav className="top__bar logo-holder">
        <button onClick={ChangeFlight}>
          <figure className="cursor-pointer">
            <LogoIcon />
          </figure>
        </button>
      </nav>
      <section className="w-full">
        <section className="ga__section">
          <div className="ga__section__main">
            <h2 className="text-primary-main font-extrabold text-base md:text-2xl mb-8">
              YOUR TRIP TO {flightTime && flightTime?.DepartureStation}
            </h2>

            <section className="flex flex-col">
              {/* TripHeader */}
              <section className="ibe__flight__info__destination">
                <p> {flightTime && flightTime?.DepartureStation}</p>
                <figure>
                  <ArrowTo />
                </figure>
                <p> {flightTime && flightTime?.ArrivalStation}</p>

                <figure className="flightCircle">
                  <FlightIcon />
                </figure>
              </section>
              {/* TripHeader*/}

              {/* TripInfo */}
              <section className="ibe__trip__item tripView">
                <div className="basis-full flex  flex-col min-h-[54px] ">
                  <p className="tripType self-center">Direct Flight</p>
                  <div className="flex justify-between">
                    <div className="flex flex-col">
                      <h5 className="tripType">
                        {" "}
                        {flightTime &&
                          format(new Date(flightTime?.STD), "HH:mm")}
                      </h5>
                      <p className="tripCity">
                        {" "}
                        {flightTime && flightTime?.DepartureStation}
                      </p>
                    </div>
                    <div className="tripIconPath">
                      <DottedLine className="dotted-svg" />
                      <AeroIcon className="aero-svg" />
                      <DottedLine className="dotted-svg" />
                    </div>
                    <div className="flex flex-col items-end">
                      <h5 className="tripType right-text font-bold">
                        {" "}
                        {flightTime &&
                          format(new Date(flightTime?.STA), "HH:mm")}
                      </h5>
                      <p className="tripCity right-text">
                        {" "}
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
              </section>
              {/* TripInfo */}
              {/* TripPackage */}
              <section className="ibe__trip__package flex justify-between">
                <div className="flex flex-col">
                  <h5>TRAVEL PACKAGE</h5>
                  <h6>{fare_name}</h6>
                  <button
                    onClick={ChangeFlight}
                    className="text-primary-main underline text-xs lg:text-sm font-body mt-4"
                  >
                    Upgrade Trip
                  </button>
                </div>
                <div className="flex flex-col items-end">
                  <h5>FARE PRICE</h5>
                  <h6>₦{totalServiceCharge?.toLocaleString("NGN")}</h6>
                </div>
              </section>
              {/* TripPackage */}
              {/* Flight Number */}
              {selectedSessionJourney?.Segments.map((_segment) => {
                return (
                  <div className="ibe__trip__number tripView">
                    <div className="flex flex-wrap lg:flex-nowrap items-center justify-between">
                      <div className="flex items-center basis-full lg:basis-1/2 mb-6">
                        <figure className="w-[41px] h-[41px] rounded-full flex items-center justify-center bg-primary-main mr-4">
                          <WorkIcon />
                        </figure>
                        <h4 className="mb-0">
                          {" "}
                          {_segment?.FlightDesignator?.CarrierCode}
                          &nbsp;
                          {_segment?.FlightDesignator?.FlightNumber}
                        </h4>
                      </div>
                      <button
                        onClick={ChangeFlight}
                        className="btn btn-outline basis-full lg:basis-auto flex-shrink-0"
                      >
                        Change Flight
                      </button>
                    </div>
                  </div>
                );
              })}
              {/* Flight Number */}

              {/* Terms */}
              <div className="flex flex-col my-6">
                <div className="flex mb-6">
                  <div className="flex items-center checkbox-copy mb-6">
                    <Checkbox onChange={onChange}>
                      <label className="check-label"></label>
                    </Checkbox>
                  </div>

                  <p>
                    I have read and accept the airline’s &nbsp;
                    <Link href="/terms">
                      <a className="text-primary-main hover:text-green underline font-display">
                        Fare Rules and Terms and Conditions.
                      </a>
                    </Link>{" "}
                    I acknowledge that personal information relating to my
                    booking may be accessible to government authorities,
                    selected airlines and the agents to whom the airline grants
                    system access.
                  </p>
                </div>
                <button
                  className={`btn btn-primary w-full lg:w-[195px] ${
                    checked ? "" : "opacity-50 pointer-events-none"
                  }`}
                  onClick={handleSell}
                >
                  {sellFlightLoading ? "Loading....." : "Continue"}
                </button>
              </div>
              {/* Terms */}
            </section>
          </div>

          <div className="ga__section__side">
            <IbeSidebar />
          </div>
        </section>
      </section>
      {/* <nav className="nav bg-primary-main fit-x-bleed  items-center justify-between py-7 flex lg:hidden fixed w-full z-50 bottom-0">
        <button className="flex items-center ">
          <ToTop />
        </button>
        <button className="btn btn-green">Continue</button>
      </nav> */}
    </BaseLayout>
  );
};

export default TripView;
