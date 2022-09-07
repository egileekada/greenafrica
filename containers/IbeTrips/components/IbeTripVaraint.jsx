/* eslint-disable @next/next/no-img-element */
import BriefcaseIcon from "assets/svgs/briefcase.svg";
import PackageIcon from "assets/svgs/package.svg";
import SeatIcon from "assets/svgs/seat.svg";
import { Fragment, useState } from "react";
import IbeTripPopup from "./IbeTripPopup";
import { useDispatch, useSelector } from "react-redux";

import {
  sessionSelector,
  setSelectedSessionFare,
} from "redux/reducers/session";

const IbeTripVariant = ({
  fare,
  sellKey,
  segmentStd,
  segmentFlightNumber,
  segmentCarrierCode,
  journey,
  schedueIndex,
  setIsVisible,
}) => {
  const dispatch = useDispatch();
  const { flightParams, selectedSessionFare } = useSelector(sessionSelector);
  const [showPopUp, setShow] = useState(false);
  const [selected, setSelected] = useState(null);

  const fare_variant =
    fare?.RuleNumber.toLowerCase() === "flex"
      ? "flexi"
      : fare?.RuleNumber.toLowerCase();

  const fare_name =
    fare?.RuleNumber.toLowerCase() === "flex"
      ? "Flex"
      : fare?.RuleNumber.toLowerCase() === "savr"
      ? "Saver"
      : "Classic";

  const totalServiceCharge = fare.PaxFares[0].ServiceCharges.reduce(
    (accumulator, object) => {
      return accumulator + object.Amount;
    },
    0
  );

  const handleBtnClick = (_fare) => {
    //SellKey is Journey SellKey
    setSelected({
      ..._fare,
      sellKey,
    });

    if (flightParams?.isRoundTrip === 1) {
      const existingFares = selectedSessionFare ? [...selectedSessionFare] : [];
      const _cleanedFares = existingFares.filter((_item) => {
        const _ruleBasis =
          parseInt(_item?.schedueIndex) === parseInt(schedueIndex);
        return !_ruleBasis;
      });

      const _newFare = {
        ..._fare,
        sellKey,
        schedueIndex,
      };

      const _newFares = [..._cleanedFares, _newFare];
      dispatch(setSelectedSessionFare([..._newFares]));
      setShow(true);
    } else {
      dispatch(
        setSelectedSessionFare([
          {
            ..._fare,
            sellKey,
            schedueIndex,
          },
        ])
      );
      setShow(true);
    }
  };

  const closePopUp = () => {
    setShow(false);
    setSelected(null);
  };

  return (
    <Fragment>
      <section className={`ibe__trip__variant ${fare_variant}`}>
        <div className="flex flex-col">
          <div className="type-header">
            <h2 className="text-center font-display font-extrabold text-3xl text-white my-2">
              g{fare_name}
            </h2>
            <p className="text-white font-normal text-center mb-1">
              {fare?.RuleNumber.toLowerCase() === "savr" ? (
                <span>&nbsp;</span>
              ) : fare?.RuleNumber.toLowerCase() === "flex" ? (
                "For Comfort & Convenience"
              ) : (
                "Recommended For You"
              )}
            </p>
          </div>
          <ul className="mt-7 mb-10 px-8">
            <li className="flex items-center mb-6">
              <figure className="w-[44px] h-[44px] bg-transparent rounded-full flex items-center justify-center">
                <BriefcaseIcon />
              </figure>
              <p className="text-black font-normal ml-4">
                7kg hand luggage: 55 x40 x 24cm
              </p>
            </li>

            {fare_variant === "savr" ? (
              <p>&nbsp;</p>
            ) : (
              <li className="flex items-center mb-6">
                <figure className="w-[44px] h-[44px] bg-transparent  rounded-full flex items-center justify-center">
                  <PackageIcon />
                </figure>
                <p className="text-black font-normal ml-4">
                  15 kg checked package
                </p>
              </li>
            )}

            {fare_variant === "savr" ? (
              <p>&nbsp;</p>
            ) : (
              <li className="flex items-center">
                <figure className="w-[44px] h-[44px] bg-transparent  rounded-full flex items-center justify-center">
                  <SeatIcon />
                </figure>
                <p className="text-black font-normal ml-4">
                  Free Standard Seat
                </p>
              </li>
            )}
          </ul>
        </div>
        <div className="px-3 lg:px-[14px] mt-auto text-center">
          {fare_variant === "savr" && (
            <button
              onClick={() => handleBtnClick(fare)}
              className={`btn btn-primary w-full text-center ${
                parseInt(fare?.AvailableCount) < 1 ? "disabled" : ""
              }`}
            >
              ₦{totalServiceCharge.toLocaleString("NGN")}
            </button>
          )}
          {fare_variant === "clsc" && (
            <button
              onClick={() => handleBtnClick(fare)}
              className={`btn btn-primary w-full text-center ${
                parseInt(fare?.AvailableCount) < 1 ? "disabled" : ""
              }`}
            >
              ₦{totalServiceCharge.toLocaleString("NGN")}
            </button>
          )}
          {fare_variant === "flexi" && (
            <button
              onClick={() => handleBtnClick(fare)}
              className={`btn btn-primary w-full  text-center white ${
                parseInt(fare?.AvailableCount) < 1 ? "disabled" : ""
              }`}
            >
              ₦{totalServiceCharge.toLocaleString("NGN")}
            </button>
          )}
        </div>
      </section>
      <IbeTripPopup
        selected={selected}
        setSelected={setSelected}
        showPopUp={showPopUp}
        closePopUp={closePopUp}
        sellKey={sellKey}
        segmentStd={segmentStd}
        segmentFlightNumber={segmentFlightNumber}
        segmentCarrierCode={segmentCarrierCode}
        journey={journey}
        schedueIndex={schedueIndex}
        setIsVisible={setIsVisible}
      />
    </Fragment>
  );
};

IbeTripVariant.defaultProps = {
  fare: {},
  sellKey: "",
  segmentStd: "",
  segmentFlightNumber: "",
  segmentCarrierCode: "",
  schedueIndex: "",
};

export default IbeTripVariant;
