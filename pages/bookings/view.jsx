/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useState } from "react";
import BaseLayout from "layouts/Base";
import IbeSidebar from "containers/IbeSidebar";
import FlightIcon from "assets/svgs/FlightTwo.svg";
import ArrowTo from "assets/svgs/arrowto.svg";
import { Checkbox } from "antd";
import BackIcon from "assets/svgs/seats/arrowleft.svg";
import ToTop from "assets/svgs/toTop.svg";
import LogoIcon from "assets/svgs/logo.svg";

import AeroIcon from "assets/svgs/aero.svg";
import DottedLine from "assets/svgs/dotted-line.svg";
import WorkIcon from "assets/svgs/work.svg";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { bookingSelector, ResellNewJourney } from "redux/reducers/booking";
import { format, differenceInMinutes } from "date-fns";
import { timeConvert } from "utils/common";

const TripView = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  const { goTrip, returnTrip, tripParams, returnParams, resellLoading } =
    useSelector(bookingSelector);

  const onCheckChange = (e) => {
    setChecked(e.target.checked);
  };

  const goBackToHome = () => {
    window.location.assign("https://dev-website.gadevenv.com/");
  };

  const JourneyItem = ({ trip, changeFlight }) => {
    const fare_name =
      trip?.fare?.RuleNumber?.toLowerCase() === "flex"
        ? "gFlex"
        : trip?.fare?.RuleNumber?.toLowerCase() === "savr"
        ? "gSaver"
        : "gClassic";

    const totalServiceCharge = trip?.fare
      ? trip?.fare?.PaxFares[0]?.ServiceCharges?.reduce(
          (accumulator, object) => {
            return accumulator + object.Amount;
          },
          0
        )
      : "0";

    return (
      <section className="flex flex-col mb-8">
        <h2 className="text-primary-main font-extrabold text-base md:text-2xl mb-8">
          {trip?.segment?.schedueIndex === 1 && "Return"} Trip To{" "}
          {trip?.segment?.ArrivalStation} On{" "}
          {trip?.segment?.schedueIndex === 1
            ? format(new Date(returnParams?.returnDate), "EEEE, LLLL dd yyyy")
            : format(new Date(tripParams?.beginDate), "EEEE, LLLL dd yyyy")}
        </h2>

        {/* TripHeader */}
        <section className="ibe__flight__info__destination">
          <p> {trip?.segment?.DepartureStation}</p>
          <figure>
            <ArrowTo />
          </figure>
          <p> {trip?.segment?.ArrivalStation}</p>

          <figure className="flightCircle">
            <FlightIcon />
          </figure>
        </section>
        {/* TripHeader*/}

        {/* TripInfo */}
        <section className="ibe__trip__item tripView">
          <div className="basis-full flex  flex-col min-h-[54px] ">
            <p className="tripType self-center underline">
              {trip?.segment?.FlightDesignator?.CarrierCode}
              &nbsp;
              {trip?.segment?.FlightDesignator?.FlightNumber}
            </p>
            <div className="flex justify-between">
              <div className="flex flex-col">
                <h5 className="tripType">
                  {" "}
                  {trip?.segment &&
                    format(new Date(trip?.segment?.STD), "HH:mm")}
                </h5>
                <p className="tripCity"> {trip?.segment?.DepartureStation}</p>
              </div>
              <div className="tripIconPath">
                <DottedLine className="dotted-svg" />
                <AeroIcon className="aero-svg" />
                <DottedLine className="dotted-svg" />
              </div>
              <div className="flex flex-col items-end">
                <h5 className="tripType right-text font-bold">
                  {" "}
                  {trip?.segment &&
                    format(new Date(trip?.segment?.STA), "HH:mm")}
                </h5>
                <p className="tripCity right-text">
                  {" "}
                  {trip?.segment?.ArrivalStation}
                </p>
              </div>
            </div>
            <p className="tripTime self-center">
              {" "}
              {trip?.segment &&
                timeConvert(
                  differenceInMinutes(
                    new Date(trip?.segment?.STA),
                    new Date(trip?.segment?.STD)
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
          </div>
          <div className="flex flex-col items-end">
            <h5>FARE PRICE</h5>
            <h6> ₦{totalServiceCharge?.toLocaleString("NGN")}</h6>
          </div>
        </section>
        {/* TripPackage */}

        {/* Flight Number */}
        <div className="ibe__trip__number tripView">
          <div className="flex flex-wrap lg:flex-nowrap items-center justify-between">
            <div className="flex items-center basis-full lg:basis-1/2 mb-6">
              <figure className="w-[41px] h-[41px] rounded-full flex items-center justify-center bg-primary-main mr-4">
                <WorkIcon />
              </figure>
              <h4 className="mb-0">7kg hand luggage: 55 x40 x 24cm</h4>
            </div>
            <button
              onClick={changeFlight}
              className="btn btn-outline basis-full lg:basis-auto flex-shrink-0"
            >
              Change Flight
            </button>
          </div>
        </div>
        {/* Flight Number */}
      </section>
    );
  };

  const goChangeFlight = () => {
    router.push("/bookings/change-flight");
  };

  const returnChangeFlight = () => {
    router.push("/bookings/change-flight");
  };

  const resellJourney = () => {
    dispatch(ResellNewJourney());
  };

  return (
    <BaseLayout>
      <nav className="top__bar logo-holder">
        <button onClick={goBackToHome}>
          <figure className="cursor-pointer">
            <LogoIcon />
          </figure>
        </button>
      </nav>
      <section className="w-full">
        <section className="ga__section">
          <div className="ga__section__main flex-grow">
            <section className="flex flex-col mt-16 lg:mt-0">
              <section className="flex flex-col">
                {goTrip?.journey && goTrip?.fare && goTrip?.segment && (
                  <JourneyItem trip={goTrip} changeFlight={goChangeFlight} />
                )}
                {returnTrip?.journey &&
                  returnTrip?.fare &&
                  returnTrip?.segment && (
                    <JourneyItem
                      trip={returnTrip}
                      changeFlight={returnChangeFlight}
                    />
                  )}

                {/* Terms */}
                <div className="flex flex-col my-6">
                  <div className="flex mb-6">
                    <div className="flex items-center checkbox-copy mb-6">
                      <Checkbox onChange={onCheckChange}>
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
                      selected airlines and the agents to whom the airline
                      grants system access.
                    </p>
                  </div>
                  <button
                    className={`btn btn-primary w-full lg:w-[195px] ${
                      checked ? "" : "opacity-50 pointer-events-none"
                    }`}
                    onClick={resellJourney}
                    disabled={resellLoading}
                  >
                    {resellLoading ? "Saving...." : "Continue"}
                  </button>
                </div>
                {/* Terms */}
              </section>
            </section>
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
