/* eslint-disable @next/next/no-img-element */
import BriefcaseIcon from "assets/svgs/briefcase.svg";
import PackageIcon from "assets/svgs/package.svg";
import SeatIcon from "assets/svgs/seat.svg";
import { Fragment, useState } from "react";
import IbeTripPopup from "./IbeTripPopup";
import { useDispatch } from "react-redux";
import { setSelectedSessionFare } from "redux/reducers/session";
import TripConfirm from "pages/trip/confirm";

const IbeTripVariant = ({
  fare,
  sellKey,
  segmentStd,
  segmentFlightNumber,
  journey,
}) => {
  const dispatch = useDispatch();
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
    setSelected(_fare);
    dispatch(setSelectedSessionFare(_fare));
    // for ROund TripConfirm, add an id to identify the journeu(view Trip Purpose)
    setShow(true);
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
                  15 kg checked package {fare_variant}
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
                  Free Standard Seat{fare_variant}
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
              className={`btn btn-primary w-full ${
                parseInt(fare?.AvailableCount) < 1 ? "disabled" : ""
              }`}
            >
              ₦{totalServiceCharge.toLocaleString("NGN")}
            </button>
          )}
          {fare_variant === "flexi" && (
            <button
              onClick={() => handleBtnClick(fare)}
              className={`btn btn-primary w-full  ${
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
        journey={journey}
      />
    </Fragment>
  );
};

IbeTripVariant.defaultProps = {
  fare: {},
  sellKey: "",
  segmentStd: "",
  segmentFlightNumber: "",
};

export default IbeTripVariant;
