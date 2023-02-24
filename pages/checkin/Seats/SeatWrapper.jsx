import React, { useState, useRef, useEffect } from "react";
import PlaneSeats from "./PlaneSeats";
import Spinner from "components/Spinner";
import { useSelector } from "react-redux";
import { sessionSelector, tryUpdateSeat } from "redux/reducers/session";

import ProfileIcon from "assets/svgs/profile.svg";
import InfoIcon from "assets/svgs/seats/info.svg";

const SeatWrapper = ({ ticketIndex, setShow, productClass, setCost }) => {
  const {
    seatResponseLoading,
    seatAvailability,
    selectedPassengers,
    bookingResponse,
  } = useSelector(sessionSelector);

  const [key] = useState(Math.random());
  const [pasengerState, setPassengerState] = useState(null);
  const [passengerNumber, setpassengerNumber] = useState(null);

  const [seatSelected, setSeatSelected] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState([]);

  const handleChange = (PassengerNumber, isWithInfant) => {
    setPassengerState(isWithInfant);
    setpassengerNumber(PassengerNumber);
  };

  const childRef = useRef(null);
  const firstTimeRender = useRef(true);

  const test = bookingResponse?.Booking?.Passengers.flatMap(
    (passenger, index) => {
      if (
        selectedPassengers.some(
          (e) =>
            e.PassengerNumber === passenger.PassengerNumber &&
            e.journey === ticketIndex
        )
      ) {
        return passenger;
      } else {
        return [];
      }
    }
  );

  useEffect(() => {
    setpassengerNumber(test[0].PassengerNumber);
    handleChange(test[0].PassengerNumber, test[0]?.PassengerInfants.length);
  }, []);

  const calculateNewCost = () => {
    const sum = selectedSeat.reduce((accumulator, seat) => {
      return accumulator + parseInt(seat.cost);
    }, 0);

    setCost(sum);
  };

  useEffect(() => {
    if (!firstTimeRender.current) {
      return (firstTimeRender.current = true);
    }

    calculateNewCost();
  }, [selectedSeat]);

  const resetSeat = (passengerNumber) => {
    dispatch(
      tryUpdateSeat({
        passengerNumber: passengerNumber,
        arrivalStation:
          bookingResponse?.Journeys[ticketIndex].Segments[0].ArrivalStation,
      })
    );
    setSeatSelected(false);

    setSelectedSeat(
      selectedSeat.map((item) =>
        passengerNumber == parseInt(item.passengerNumber)
          ? { ...item, seatDesignator: "" }
          : item
      )
    );
  };

  return (
    <>
      <div className="flex flex-wrap xlg:flex-nowrap">
        <div className="basis-full xlg:basis-[30%]">
          {/* Seat Info */}
          <div className="mx-6 mt-12 flex flex-col">
            <div className="flex flex-col mb-6">
              <h2 className="text-black font-semibold font-header text-xl mb-3">
                Select your seat(s)
              </h2>
              <p className="text-black">
                Choose a preferred seat for your travel
              </p>
            </div>
            <h3 className="title-text">PASSENGER DETAILS</h3>
            {bookingResponse?.Booking?.Passengers.map((passenger, index) => (
              <>
                {selectedPassengers.filter(
                  (e) =>
                    e.PassengerNumber === passenger.PassengerNumber &&
                    e.journey === ticketIndex
                )[0] && (
                  <div className="flex items-center mb-4" key={index}>
                    <input
                      id={`passenger-${index}-${ticketIndex}`}
                      type="radio"
                      value={passenger.PassengerNumber}
                      name={`passenger-state-${ticketIndex}`}
                      checked={passenger.PassengerNumber === passengerNumber}
                      onChange={(e) =>
                        handleChange(
                          passenger.PassengerNumber,
                          passenger.PassengerInfants.length
                        )
                      }
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mb-2"
                    />
                    <label
                      htmlFor={`passenger-${index}-${ticketIndex}`}
                      className="ml-2"
                    >
                      <div className="flex mb-6 mt-4">
                        <div className="flex flex-col w-[53px] mr-4">
                          <div className="bg-purple-light h-[50px] rounded-t-[3px] flex justify-center items-center">
                            <ProfileIcon />
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <h5 className="text-base font-extrabold text-primary-main font-display mb-2">
                            {passenger.Names[0].FirstName}{" "}
                            {passenger.Names[0].LastName}
                          </h5>
                          <h6 className="text-base text-[#261F5E] font-title">
                            {selectedSeat[passenger.PassengerNumber]
                              ?.seatDesignator?.length > 0
                              ? `Seat Number: ${
                                  selectedSeat[passenger.PassengerNumber]
                                    ?.seatDesignator
                                }`
                              : "No Seat Selected"}
                          </h6>
                          {selectedSeat[index]?.seatDesignator.length > 0 && (
                            <img
                              src="/images/delete.svg"
                              alt="remove seat"
                              role="button"
                              width="30"
                              height="30"
                              className="ml-2"
                              onClick={() =>
                                resetSeat(passenger.PassengerNumber)
                              }
                            />
                          )}
                        </div>
                      </div>
                    </label>
                  </div>
                )}
              </>
            ))}
            <button className="flex xxl:hidden mb-3">
              <figure>
                <InfoIcon className="mr-2" />
              </figure>
              <span className="ml-2 text-xs text-black font-title text-left">
                See what the color codes for our seats mean&nbsp;
                <span
                  className="underline text-primary-main"
                  onClick={() => setShow(true)}
                >
                  here
                </span>
              </span>
            </button>
          </div>
          {/* Seat Info */}
        </div>
        <div className="basis-full xlg:basis-[70%] pt-4 h-[650px]  scrollable overflow-y-scroll mt-12 xlg:mt-0">
          {seatResponseLoading && seatAvailability === null ? (
            <section className="py-10 pl-12 text-center">
              <Spinner />
            </section>
          ) : (
            <PlaneSeats
              pasengerState={pasengerState}
              passengerNumber={passengerNumber}
              pasengerCount={selectedPassengers.length}
              key={key + 24}
              data={seatAvailability?.EquipmentInfos[0].Compartments[0].Seats}
              ref={childRef}
              setSeatSelected={setSeatSelected}
              setSelectedSeat={setSelectedSeat}
              selectedSeat={selectedSeat}
              ticketIndex={ticketIndex}
              productClass={productClass}
              setCost={setCost}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default SeatWrapper;