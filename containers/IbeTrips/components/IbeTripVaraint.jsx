/* eslint-disable @next/next/no-img-element */
import React from "react";
import BriefcaseIcon from "assets/svgs/briefcase.svg";
import PackageIcon from "assets/svgs/package.svg";
import SeatIcon from "assets/svgs/seat.svg";
import Seat from "assets/svgs/seatsmall.svg";
import { Fragment, useState } from "react";
import IbeTripPopup from "./UpsellTripPopup";
import { useDispatch, useSelector } from "react-redux";

import {
  sessionSelector,
  setSelectedSessionFare,
} from "redux/reducers/session";

import {
  useGetProductsQuery,
  useGetProductsByCodeQuery,
} from "services/widgetApi.js";

const IbeTripVariant = ({
  fare,
  sellKey,
  segmentStd,
  segmentFlightNumber,
  segmentCarrierCode,
  journey,
  schedueIndex,
  setIsVisible,
  segment,
}) => {
  const [skip, setSkip] = React.useState(true);

  const { data: products, isLoading } = useGetProductsQuery();
  const { data: productsFeatures, isLoading: featureLoading } =
    useGetProductsByCodeQuery(fare?.ProductClass, {
      skip,
    });

  const dispatch = useDispatch();
  const { flightParams, selectedSessionFare } = useSelector(sessionSelector);
  const [showPopUp, setShow] = useState(false);
  const [selected, setSelected] = useState(null); 

  
  const fare_variant =
    fare?.RuleNumber.toLowerCase() === "flex"
      ? "flexi"
      : fare?.RuleNumber.toLowerCase();

  const fare_name = () => {
    const [{ name }] = products?.data?.items.filter(
      (product) => product.code === fare?.ProductClass
    );
    return `${name}`;
  }; 

  const totalServiceCharge = fare?.PaxFares
    ? fare?.PaxFares[0].ServiceCharges.reduce((accumulator, object) => {
        return accumulator + object.Amount;
      }, 0)
    : 0; 

  const handleBtnClick = (_fare) => {
    setSelected({
      ..._fare,
      sellKey,
    }); 
    setShow(true);
  };
 
  const closePopUp = () => {
    setShow(false);
    setSelected(null);
  };

  React.useState(() => {
    setSkip(false);
  }, [fare?.ProductClass]);

  return (
    <Fragment>
      <section className={`ibe__trip__variant rounded-t-md relative ${fare_variant} `}>
        {!isLoading && (
          <div className="flex flex-col rounded-t-md ">
            <div className=" px-6 md:px-14 border-b border-b-[#0000001A] type-header rounded-t-md ">
              <h2 className=" font-display font-extrabold text-2xl text-[#261F5E] my-2">
                {fare_name()}
              </h2>
              <p className="text-[#261F5E] font-normal mb-1">
                {fare?.RuleNumber.toLowerCase() === "savr" ? (
                  <span>&nbsp;</span>
                ) : fare?.RuleNumber.toLowerCase() === "flex" ? (
                  "For Comfort & Convenience"
                ) : (
                  "We Recommend "
                )}
              </p>
            </div>
            <ul className="mt-7 mb-10 px-4 md:px-12">
              {featureLoading &&
                productsFeatures?.data.product_services.map(
                  (feature, index) => (
                    <li className="flex items-center mb-6" key={index}>
                      <figure className="w-[44px] h-[44px] bg-transparent  rounded-full flex items-center justify-center">
                        {/* <img src={feature.icon} alt="" /> */}
                        {feature.icon.includes("bag") && (
                          <BriefcaseIcon />
                        )}
                        {feature.icon.includes("luggage") && (
                          <PackageIcon />
                        )}
                        {feature.icon.includes("seat") && (
                          <SeatIcon />
                        )}
                      </figure>
                      <div  className=" ml-4" > 
                        {feature.icon.includes("bag") && (
                          <p className=" font-bold " >Checked Baggage</p>
                        )}
                        {feature.icon.includes("luggage") && (
                          <p className=" font-bold " >7kg hand luggage</p>
                        )}
                        {feature.icon.includes("seat") && (
                          <p className=" font-bold " >Seat Selection</p>
                        )}
                        <p className="text-black text-sm font-normal">
                          {feature.feature}
                        </p>
                      </div>
                    </li>
                  )
                )}
            </ul>
          </div>
        )}
        <div className="px-3 lg:px-[14px] mb-14 mt-auto text-center">
          {fare_variant === "savr" && (
            <button
              onClick={() => handleBtnClick(fare)}
              disabled={parseInt(fare?.AvailableCount) < 1 ?  true : false}
              style={{ fontSize: "18px" }}
              className={` btn w-full text-center !font-black  ${
                parseInt(fare?.AvailableCount) < 1 ?  "disabled border-[#9E9BBF] text-[#9E9BBF] border " : " border-primary-main text-primary-main border "
              }`}
            >
              {parseInt(fare?.AvailableCount) < 1
                ? "Sold Out"
                : `₦ ${totalServiceCharge.toLocaleString("NGN")}`}
            </button>
          )}
          {fare_variant === "clsc" && (
            <button
              onClick={() => handleBtnClick(fare)}
              disabled={parseInt(fare?.AvailableCount) < 1 ?  true : false}
              style={{ fontSize: "18px" }}
              className={`btn w-full text-center !font-black ${
                parseInt(fare?.AvailableCount) < 1 ? "disabled border-[#9E9BBF] text-[#9E9BBF] border " : " border-primary-main text-primary-main border "
              }`}
            >
              {parseInt(fare?.AvailableCount) < 1
                ? "Sold Out"
                : `₦ ${totalServiceCharge.toLocaleString("NGN")}`}
            </button>
          )}
          {fare_variant === "flexi" && (
            <button
              onClick={() => handleBtnClick(fare)}
              disabled={parseInt(fare?.AvailableCount) < 1 ?  true : false}
              className={`btn w-full  text-center !font-black ${
                parseInt(fare?.AvailableCount) < 1 ?  "disabled border-[#9E9BBF] text-[#9E9BBF] border " : " border-primary-main text-primary-main border "
              }`}
            >
              {parseInt(fare?.AvailableCount) < 1
                ? "Sold Out"
                : `₦ ${totalServiceCharge.toLocaleString("NGN")}`}
            </button>
          )}
          </div>
          <div className=" w-full py-2 absolute bottom-0 rounded-b-[6px] flex justify-center bg-[#ED0E0E21] " >
            <Seat />
            <p className=" font-medium text-sm ml-4 " ><span className=" font-bold " >{fare?.AvailableCount}</span> seats remaining</p>
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
        segment={segment}
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
  segment: {},
};

export default IbeTripVariant;
