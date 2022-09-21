/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import Link from "next/link";
import BaseLayout from "layouts/Base";
import IbeSidebar from "containers/IbeSidebar";
import FlightIcon from "assets/svgs/FlightTwo.svg";
import ArrowTo from "assets/svgs/arrowto.svg";
import { Checkbox } from "antd";
import AeroIcon from "assets/svgs/aerotwo.svg";
import DottedLine from "assets/svgs/dotted-line.svg";
import WorkIcon from "assets/svgs/work.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  sessionSelector,
  saveSellRequest,
  saveMultipleSellRequest,
  FetchStateFromServer,
} from "redux/reducers/session";
import { format, differenceInMinutes } from "date-fns";
import { timeConvert } from "utils/common";
import { useRouter } from "next/router";
import LogoIcon from "assets/svgs/logo.svg";
import { notification } from "antd";

import {
  useGetProductsQuery,
  useGetLocationsQuery,
} from "services/widgetApi.js";

const TripView = (props) => {
  const dispatch = useDispatch();
  const { data, isLoading } = useGetLocationsQuery();
  const { data: products, isLoading: productLoading } = useGetProductsQuery();
  const [roundTripEnabled, setRoundTripEnabled] = useState(false);
  const [checked, setChecked] = useState(false);
  const {
    sellFlightLoading,
    selectedSessionFare,
    selectedSessionJourney,
    sellResponse,
  } = useSelector(sessionSelector);
  const router = useRouter();

  const ScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (router.isReady) {
      async function initSession() {
        if (props?.accept) {
          if (parseInt(props?.accept) === 1) {
            setChecked(true);
          }
        }
      }
      initSession();
    }
  }, [router.isReady]);

  useEffect(() => {
    ScrollToTop();
  }, []);

  useEffect(() => {
    async function init() {
      if (selectedSessionJourney && selectedSessionFare) {
        if (
          selectedSessionJourney?.length === 2 &&
          selectedSessionFare.length === 2
        ) {
          setRoundTripEnabled(true);
        } else {
          setRoundTripEnabled(false);
        }
      } else {
        // router.push("/");
        console.log("selectedSessionJourney && selectedSessionFar not resent");
      }
    }
    init();
  }, [selectedSessionJourney, selectedSessionFare]);

  useEffect(() => {
    async function redirectFromSell() {
      if (sellResponse) {
        router.push("/trip/passenger-form");
      }
    }
    redirectFromSell();
  }, [sellResponse]);

  useEffect(() => {
    async function fetchStateInfo() {
      dispatch(FetchStateFromServer());
    }
    fetchStateInfo();
  }, []);

  const onChange = (e) => {
    setChecked(e.target.checked);
  };

  const handleSell = async (JourneySellKey) => {
    let flightJourney = selectedSessionJourney.filter((_item) => {
      return _item?.JourneySellKey === JourneySellKey;
    });

    flightJourney.length > 0
      ? dispatch(
          saveSellRequest({
            sellKey: flightJourney[0]?.sellKey,
            segmentStd: flightJourney[0]?.segmentStd,
            segmentFlightNumber: flightJourney[0]?.segmentFlightNumber,
            segmentCarrierCode: flightJourney[0]?.FlightDesignator?.CarrierCode,
            fareKey: flightJourney[0]?.fareKey,
            arrivalStation: flightJourney[0]?.arrivalStation,
            departureStation: flightJourney[0]?.departureStation,
            RuleNumber: flightJourney[0]?.RuleNumber,
          })
        )
      : notification.error({
          message: "Error",
          description: "Please review your selected details and try again",
        });
  };
  const handleMultipleSell = async () => {
    dispatch(saveMultipleSellRequest(selectedSessionJourney));
  };

  const ChangeFlight = async () => {
    window.location.assign("https://dev-website.gadevenv.com/");
  };

  const resolveAbbreviation = (abrreviation) => {
    const [{ name, code }] = data?.data?.items.filter(
      (location) => location.code === abrreviation
    );

    return `${name} (${code})`;
  };

  return (
    <BaseLayout>
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
            <section className="flex flex-col mt-16 lg:mt-0">
              {selectedSessionJourney?.length > 0 ? (
                selectedSessionJourney.map((_journey) => {
                  const _asssocaitedFare = selectedSessionFare.filter(
                    (_sesfare) => {
                      return _sesfare?.sellKey === _journey?.JourneySellKey;
                    }
                  );

                  const fare_name = () => {
                    const [{ name }] = products?.data?.items.filter(
                      (product) =>
                        product.code === _asssocaitedFare[0]?.ProductClass
                    );
                    return `${name}`;
                  };

                  const totalServiceCharge =
                    _asssocaitedFare.length > 0
                      ? _asssocaitedFare[0].PaxFares[0]?.ServiceCharges?.reduce(
                          (accumulator, object) => {
                            return accumulator + object.Amount;
                          },
                          0
                        )
                      : "0";

                  return (
                    <>
                      <section className="flex flex-col">
                        {!isLoading &&
                          _journey?.Segments.map((_segment) => {
                            return (
                              <>
                                <h2 className="text-primary-main font-extrabold text-base md:text-2xl mb-8">
                                  YOUR TRIP TO{" "}
                                  {_segment && _segment?.DepartureStation}
                                </h2>
                                {/* TripHeader */}
                                <section className="ibe__flight__info__destination">
                                  <p>
                                    {" "}
                                    {_segment &&
                                      resolveAbbreviation(
                                        _segment?.DepartureStation
                                      )}
                                  </p>
                                  <figure>
                                    <ArrowTo />
                                  </figure>
                                  <p>
                                    {" "}
                                    {_segment &&
                                      resolveAbbreviation(
                                        _segment?.ArrivalStation
                                      )}
                                  </p>

                                  <figure className="flightCircle">
                                    <FlightIcon />
                                  </figure>
                                </section>
                                {/* TripHeader*/}

                                {/* TripInfo */}
                                <section className="ibe__trip__item tripView">
                                  <div className="basis-full flex  flex-col min-h-[54px] ">
                                    <p className="tripType self-center underline underline-offset-4">
                                      Direct Flight
                                    </p>
                                    <div className="flex justify-between">
                                      <div className="flex flex-col">
                                        <h5 className="tripType">
                                          {" "}
                                          {_segment &&
                                            format(
                                              new Date(_segment?.STD),
                                              "HH:mm"
                                            )}
                                        </h5>
                                        <p className="tripCity">
                                          {" "}
                                          {_segment &&
                                            resolveAbbreviation(
                                              _segment?.DepartureStation
                                            )}
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
                                          {_segment &&
                                            format(
                                              new Date(_segment?.STA),
                                              "HH:mm"
                                            )}
                                        </h5>
                                        <p className="tripCity right-text">
                                          {" "}
                                          {_segment &&
                                            resolveAbbreviation(
                                              _segment?.ArrivalStation
                                            )}
                                        </p>
                                      </div>
                                    </div>
                                    <p className="tripTime self-center">
                                      {_segment &&
                                        timeConvert(
                                          differenceInMinutes(
                                            new Date(_segment?.STA),
                                            new Date(_segment?.STD)
                                          )
                                        )}
                                    </p>
                                  </div>
                                </section>
                                {/* TripInfo */}
                              </>
                            );
                          })}

                        {/* TripPackage */}
                        <section className="ibe__trip__package flex justify-between">
                          <div className="flex flex-col">
                            <h5>TRAVEL PACKAGE</h5>
                            {!productLoading && <h6>{fare_name()}</h6>}
                            <button
                              onClick={ChangeFlight}
                              className="text-primary-main underline text-xs lg:text-sm font-body mt-4"
                            >
                              Upgrade Trip
                            </button>
                          </div>
                          <div className="flex flex-col items-end">
                            <h5>FARE PRICE</h5>
                            <h6>
                              ₦{totalServiceCharge?.toLocaleString("NGN")}
                            </h6>
                          </div>
                        </section>
                        {/* TripPackage */}
                        {/* Flight Number */}
                        {_journey?.Segments.map((_segment) => {
                          return (
                            <div className="ibe__trip__number tripView mb-6">
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

                        {/* Terms For a OneWay Trip */}
                        {!roundTripEnabled && (
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
                                I acknowledge that personal information relating
                                to my booking may be accessible to government
                                authorities, selected airlines and the agents to
                                whom the airline grants system access.
                              </p>
                            </div>
                            <button
                              className={`btn btn-primary w-full lg:w-[195px] ${
                                checked ? "" : "opacity-50 pointer-events-none"
                              }`}
                              onClick={handleSell.bind(
                                this,
                                _journey?.JourneySellKey
                              )}
                            >
                              {sellFlightLoading ? "Loading....." : "Continue"}
                            </button>
                          </div>
                        )}
                        {/* Terms For a OneWay Trip */}
                      </section>
                    </>
                  );
                })
              ) : (
                <p>No journey selected</p>
              )}
              {/* Terms For a Round Trip */}
              {roundTripEnabled && (
                <div className="flex flex-col my-6">
                  <div className="flex mb-6">
                    <div className="flex items-center checkbox-copy mb-6">
                      <Checkbox onChange={onChange} checked={checked}>
                        <label className="check-label"></label>
                      </Checkbox>
                    </div>

                    <p>
                      I have read and accept the airline’s &nbsp;
                      <Link href="/terms-and-conditons">
                        <a className="text-primary-main hover:text-green underline font-display">
                          Fare Rules and Terms and Conditions.
                        </a>
                      </Link>{" "}
                      I acknowledge that personal information relating to my
                      booking may be accessible to government authorities,
                      selected airlines and the agents to whom the airline
                      grants system access.
                    </p>
                  </div>
                  <button
                    className={`btn btn-primary w-full lg:w-[195px] ${
                      checked ? "" : "opacity-50 pointer-events-none"
                    }`}
                    onClick={handleMultipleSell}
                  >
                    {sellFlightLoading ? "Loading....." : "Continue"}
                  </button>
                </div>
              )}
              {/* Terms For a Round Trip */}
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

export async function getServerSideProps(context) {
  return {
    props: {
      accept: context.query?.accept ? context.query?.accept : 0,
    },
  };
}
