/* eslint-disable @next/next/no-img-element */
import { Fragment, useState } from "react";
import TwoIcon from "assets/svgs/two.svg";
import CheckIcon from "assets/svgs/done.svg";
import FlightIcon from "assets/svgs/aero-2.svg";
// import BagIcon from "assets/svgs/bag.svg";
import ProfileIcon from "assets/svgs/profile.svg";
import CaretLeft from "assets/svgs/sidebar/caretleft.svg";
import { useSelector } from "react-redux";
import { sessionSelector } from "redux/reducers/session";
import { capitalizeFirstLetter } from "lib/utils";

const PassengerInfo = () => {
  const [showContent, setShow] = useState(false);
  const { sessionStateResponse } = useSelector(sessionSelector);

  const PassengerItem = ({ passenger, passengerIndex }) => {
    const _Seats = passenger.PassengerFees.filter((pax) => {
      return pax?.FeeCode === "SEAT";
    });

    return (
      <Fragment>
        <div className="ibe__sidebar__box">
          {passenger?.Names.map((_name) => {
            {
              /* console.log("passenger", passenger?.PassengerTypeInfo?.PaxType); */
            }
            const paxType = passenger?.PassengerTypeInfo?.PaxType;
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

                  {/* {_Seats.length > 0
                    ? sessionStateResponse?.BookingData.Journeys.map(
                        (_journey) => {
                          return _journey?.Segments.map((_segment) => {
                            return (
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
                            );
                          });
                        }
                      )
                    : null} */}
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
            <h4>Passenger Details</h4>
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
                <p>No passengers details yet</p>
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default PassengerInfo;
