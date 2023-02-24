/* eslint-disable @next/next/no-img-element */
import { Fragment, useEffect, useState } from "react";
import ThreeIcon from "assets/svgs/three.svg";
import ProfileIcon from "assets/svgs/profile.svg";
import CaretLeft from "assets/svgs/sidebar/caretleft.svg";
import FlightIcon from "assets/svgs/aero-2.svg";
import { useSelector } from "react-redux";
import { sessionSelector } from "redux/reducers/session";
import { capitalizeFirstLetter } from "lib/utils";
import CheckIcon from "assets/svgs/done.svg";

const SeatInfo = () => {
  const [showContent, setShow] = useState(false);
  const [checked, setChecked] = useState(false);
  const { sessionStateResponse } = useSelector(sessionSelector);

  useEffect(() => {
    if (
      sessionStateResponse &&
      sessionStateResponse?.BookingData?.Journeys?.length > 0
    ) {
      const _Journeys = sessionStateResponse?.BookingData?.Journeys;

      _Journeys.map((_item) => {
        _item?.Segments.map((_seg) => {
          if (_seg?.PaxSeats.length > 0) {
            setChecked(true);
          }
        });
      });
    }
  }, [sessionStateResponse]);

  const PassengerItem = ({ passenger, passengerIndex }) => {
    const _Seats = passenger.PassengerFees.filter((pax) => {
      return pax?.FeeCode === "SEAT";
    });

    return (
      <Fragment>
        <div className="ibe__sidebar__box">
          {passenger?.Names.map((_name) => {
            return (
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

                  {_Seats.length > 0
                    ? sessionStateResponse?.BookingData.Journeys.map(
                        (_journey) => {
                          return _journey?.Segments.map((_segment) => {
                            return (
                              <>
                              {_segment?.PaxSeats.length > 0 && (
                              <h6 className="text-[12px] font-normal text-[#9692B8] font-title">
                                <span className="mr-2">
                                  {`${_segment?.PaxSeats[passengerIndex]?.DepartureStation} -  ${_segment?.PaxSeats[passengerIndex]?.ArrivalStation}`}
                                </span>{" "}
                                Seat Number :{" "}
                                {
                                  _segment?.PaxSeats[passengerIndex]
                                    ?.UnitDesignator
                                }
                              </h6>
                              )}
                              </>
                            );
                          });
                        }
                      )
                    : null}
                </div>
              </div>
            );
          })}

          {/* <div className="flex flex-col">
            <div className="ibe__sidebar__row bordered">
              <div className="flex items-center">
                <figure>
                  <BagIcon />
                </figure>
                <h6>2 x 10 kg baggage:</h6>
              </div>
              <div>
                <h6> ₦26,501</h6>
              </div>
            </div>
          </div> */}
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
          {checked ? (
            <figure className="mr-2">
              <CheckIcon />
            </figure>
          ) : (
            <figure className="mr-2">
              <ThreeIcon />
            </figure>
          )}

          <div className="flex flex-col">
            <p className="text-[15px] font-bold text-white" >Seat Selection</p>
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
                <p className=" text-[#26205E] text-[14px] font-medium mt-[2px] " >No Seat Information yet</p>
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default SeatInfo;