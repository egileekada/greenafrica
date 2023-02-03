/* eslint-disable @next/next/no-img-element */
import { Fragment, useState } from "react";
import TwoIcon from "assets/svgs/two.svg";
import CheckIcon from "assets/svgs/done.svg";
import FlightIcon from "assets/svgs/aero-2.svg";
import BagIcon from "assets/svgs/bag.svg";
import ProfileIcon from "assets/svgs/profile.svg";
import CaretLeft from "assets/svgs/sidebar/caretleft.svg";
import { useSelector } from "react-redux";
import { sessionSelector } from "redux/reducers/session";
import { capitalizeFirstLetter } from "lib/utils";
import CostIcon from "assets/svgs/cost.svg";

const PassengerInfo = () => {
  const [showContent, setShow] = useState(false);
  const { sessionStateResponse } = useSelector(sessionSelector);

  const PassengerItem = ({ passenger, passengerIndex }) => {
    // const _Seats = passenger.PassengerFees.filter((pax) => {
    //   return pax?.FeeCode === "SEAT";
    // });

    return (
      <Fragment>
        <div className="ibe__sidebar__box">
          {passenger?.Names.map((_name) => {
            const paxType = passenger?.PassengerTypeInfo?.PaxType;
            const _SSRCount = {};

            sessionStateResponse?.BookingData?.Passengers.map((_pax) => {
              return _pax.PassengerFees.map((_paxFee) => {
                _SSRCount[_paxFee?.FeeCode] = _pax.PassengerFees.filter(
                  (_fee) => {
                    return _fee?.FeeCode === _paxFee?.FeeCode;
                  }
                ).length;
              });
            });

            const tempSum = {};
            const _SSRSum = {};
            sessionStateResponse?.BookingData?.Passengers.map((_pax) => {
              return _pax.PassengerFees.map((_paxFee) => {
                tempSum[_paxFee?.FeeCode] = _paxFee.ServiceCharges;
                const totalServiceCharge = tempSum[_paxFee?.FeeCode].reduce(
                  (accumulator, object) => {
                    return accumulator + object.Amount;
                  },
                  0
                );
                _SSRSum[_paxFee?.FeeCode] = totalServiceCharge;
              });
            });

            return (
              <section className="flex flex-col">
                <div className="flex mb-6">
                  <div className="flex flex-col w-[53px] mr-4">
                    <div className="bg-purple-light h-[50px] rounded-t-[3px] flex justify-center items-center">
                      <ProfileIcon />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <h5 className="text-sm font-extrabold text-primary-main font-display">
                      {`${capitalizeFirstLetter(
                        _name?.FirstName
                      )} ${capitalizeFirstLetter(_name?.LastName)}`}
                    </h5>

                    <h6 className="text-[12px] font-normal text-[#9692B8] font-title">
                      {paxType && (
                        <span className="mr-2">
                          {paxType === "ADT"
                            ? "ADULT"
                            : paxType === "CHD"
                            ? "CHILD"
                            : "INFANT"}
                        </span>
                      )}
                    </h6>
                  </div>
                </div>

                {_SSRCount?.XBAG20 && _SSRCount?.XBAG20 > 0 && (
                  <div className="flex flex-col">
                    <div className="ibe__sidebar__row bordered">
                      <div className="flex items-center">
                        <figure className="mr-2">
                          <BagIcon />
                        </figure>
                        <h6>
                          {_SSRCount?.XBAG20}x&nbsp;20KG Baggage
                          {_SSRCount?.XBAG20 > 1 ? "s" : ""}
                        </h6>
                      </div>
                      <div>
                        <h6>₦{parseInt(_SSRSum?.XBAG20).toLocaleString()}</h6>
                      </div>
                    </div>
                  </div>
                )}

                {_SSRCount?.XBAG15 && _SSRCount?.XBAG15 > 0 && (
                  <div className="flex flex-col">
                    <div className="ibe__sidebar__row bordered">
                      <div className="flex items-center">
                        <figure className="mr-2">
                          <BagIcon />
                        </figure>
                        <h6>
                          {_SSRCount?.XBAG15}x&nbsp;15KG Baggage
                          {_SSRCount?.XBAG15 > 1 ? "s" : ""}
                        </h6>
                      </div>
                      <div>
                        <h6>₦{parseInt(_SSRSum?.XBAG15).toLocaleString()}</h6>
                      </div>
                    </div>
                  </div>
                )}

                {_SSRCount?.XBAG10 && _SSRCount?.XBAG10 > 0 && (
                  <div className="flex flex-col">
                    <div className="ibe__sidebar__row bordered">
                      <div className="flex items-center">
                        <figure className="mr-2">
                          <BagIcon />
                        </figure>
                        <h6>
                          {_SSRCount?.XBAG10}x&nbsp;10KG Baggage
                          {_SSRCount?.XBAG10 > 1 ? "s" : ""}
                        </h6>
                      </div>
                      <div>
                        <h6>₦{parseInt(_SSRSum?.XBAG10).toLocaleString()}</h6>
                      </div>
                    </div>
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </Fragment>
    );
  };

  return (
    <section className="ibe__sidebar__item mb-10">
      <button
        className="ibe-accordion-header"
        onClick={() => setShow(!showContent)}
      >
        <div className="flex items-center">
          {sessionStateResponse?.BookingData.Passengers.length > 0 &&
          sessionStateResponse?.BookingData.Passengers[0].Names.length > 0 ? (
            <figure className="mr-2">
              <CheckIcon />
            </figure>
          ) : (
            <figure className="mr-2">
              <TwoIcon />
            </figure>
          )}

          <div className="flex flex-col">
            <p className="text-[15px] font-bold text-white  " >Passenger Details</p>
          </div>
          <figure
            className={`ml-auto transform ${showContent ? "rotate-90" : ""}`}
          >
            <CaretLeft />
          </figure>
        </div>
      </button>

      {showContent && (
        <>
          {sessionStateResponse &&
            sessionStateResponse?.BookingData?.BookingContacts?.length > 0 &&
            sessionStateResponse?.BookingData?.BookingContacts?.map(
              (_contact) => {
                return (
                  <section className="flex flex-col mt-3">
                    <h2 className="text-primary-main font-bold text-sm mb-3">
                      CONTACT DETAILS
                    </h2>

                    <div className="flex mb-6">
                      <div className="flex flex-col w-[53px] mr-4">
                        <div className="bg-purple-light h-[50px] rounded-t-[3px] flex justify-center items-center">
                          <ProfileIcon />
                        </div>
                      </div>
                      <div className="flex flex-col">
                        {_contact.Names.map((_name) => {
                          return (
                            <>
                              <h5 className="text-sm font-extrabold text-primary-main font-display">
                                {`${capitalizeFirstLetter(
                                  _name?.FirstName
                                )} ${capitalizeFirstLetter(_name?.LastName)}`}
                              </h5>

                              <h6 className="text-[12px] font-normal text-[#9692B8] font-title ">
                                <span className="mr-2">
                                  {capitalizeFirstLetter(
                                    _contact?.EmailAddress
                                  )}
                                  {/* Taiwo.aiyeri Taiwo.aiyeri
                                Taiwo.aiyeriTaiwo.aiyeri
                                Taiwo.aiyeriTaiwo.aiyerin@scenariodevelopers.com */}
                                </span>
                              </h6>
                              <h6 className="text-[12px] font-normal text-[#9692B8] font-title">
                                <span className="mr-2">
                                  {capitalizeFirstLetter(_contact?.HomePhone)}
                                </span>
                              </h6>
                            </>
                          );
                        })}
                      </div>
                    </div>
                  </section>
                );
              }
            )}

          <p className="text-primary-main font-bold mt-3 text-[15px] -mb-3">
            PASSENGERS
          </p>
          {sessionStateResponse &&
          sessionStateResponse?.BookingData.Passengers.length > 0 &&
          sessionStateResponse?.BookingData.Passengers[0].Names.length > 0 ? (
            sessionStateResponse?.BookingData.Passengers.map(
              (_passenger, _paxIndex) => {
                return (
                  <PassengerItem
                    passenger={_passenger}
                    passengerIndex={_paxIndex}
                  />
                );
              }
            )
          ) : (
            <div className="ibe__sidebar__box">
              <div className="ibe__sidebar__empty h-[187px]">
                <figure>
                  <FlightIcon />
                </figure>
                <p className=" text-[#26205E] text-[14px] font-medium mt-[2px]  " >No passengers details yet</p>
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default PassengerInfo;
