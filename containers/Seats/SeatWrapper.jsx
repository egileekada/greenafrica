import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import PlaneSeats from "./PlaneSeats";
import Spinner from "components/Spinner";
import { useSelector, useDispatch } from "react-redux";
import { sessionSelector, tryUpdateSeat } from "redux/reducers/session";
import Popup from "components/Popup";

import ProfileIcon from "assets/svgs/profile.svg";
import InfoIcon from "assets/svgs/seats/info.svg";

const SeatWrapper = ({
  ticketIndex,
  setShow,
  productClass,
  departureStation,
  arrivalStation,
}) => {
  const dispatch = useDispatch();
  const { seatResponseLoading, seatAvailability, bookingState } =
    useSelector(sessionSelector);
  const [key] = useState(Math.random());
  const [pasengerState, setPassengerState] = useState(null);
  const [passengerNumber, setpassengerNumber] = useState(0);
  const [showPopUp, setShowPopUp] = useState(false);
  const [seatSelected, setSeatSelected] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState([]);

  const handleChange = (PassengerNumber, isWithInfant) => {
    setPassengerState(isWithInfant);
    setpassengerNumber(PassengerNumber);
  };

  const childRef = useRef(null);

  useEffect(() => {
    handleChange(
      bookingState?.Passengers[0].PassengerNumber,
      bookingState?.Passengers[0].PassengerInfants.length
    );
  }, []);

  const resetSeat = (passengerNumber) => {
    dispatch(
      tryUpdateSeat({
        passengerNumber: passengerNumber,
        arrivalStation:
          bookingState?.Journeys[ticketIndex].Segments[0].ArrivalStation,
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
            {bookingState?.Passengers.map((passenger, index) => (
              <>
                <div className="flex items-center mb-4" key={index}>
                  <input
                    id={`passenger-${index}-${ticketIndex}`}
                    type="radio"
                    value={passenger.PassengerNumber}
                    checked={passenger.PassengerNumber === passengerNumber}
                    name={`passenger-state-${ticketIndex}`}
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
                          {selectedSeat[index]?.seatDesignator.length > 0
                            ? `Seat No.: ${selectedSeat[index].seatDesignator}`
                            : "No Seat Selected"}
                        </h6>
                      </div>
                      {selectedSeat[index]?.seatDesignator.length > 0 && (
                        <img
                          src="/images/delete.svg"
                          alt="remove seat"
                          role="button"
                          width="30"
                          height="30"
                          className="ml-2"
                          onClick={() => resetSeat(passenger.PassengerNumber)}
                        />
                      )}
                    </div>
                  </label>
                </div>
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
              pasengerCount={bookingState?.Passengers.length}
              key={key + 24}
              data={seatAvailability?.EquipmentInfos[0].Compartments[0].Seats}
              ref={childRef}
              setSeatSelected={setSeatSelected}
              setSelectedSeat={setSelectedSeat}
              selectedSeat={selectedSeat}
              ticketIndex={ticketIndex}
              productClass={productClass}
            />
          )}
        </div>
      </div>

      {showPopUp && (
        <Popup
          display={showPopUp}
          closeModal={() => setShow(false)}
          top={true}
          width="w-[507px]"
        >
          <section className="w-full bg-white rounded-xl ">
            <div className="flex flex-col items-center justify-center p-[50px]">
              <h6 className="flex text-md mb-5">
                No seat selected for the trip {departureStation}{" "}
                <span className="mx-1">-{">"}</span>
                {arrivalStation}
              </h6>
              <figure>
                <svg
                  width="155"
                  height="137"
                  viewBox="0 0 155 137"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M154.341 73.4766L154.35 73.2938C154.567 64.1833 137.446 61.9041 137.446 61.9041L107.399 56.8262L93.7788 35.1512C100.126 34.3048 104.739 31.6016 104.907 28.1772C105.124 23.7419 97.8062 19.7792 88.5626 19.3263C86.9459 19.2471 85.3794 19.2829 83.8905 19.4155L73.4325 2.77284L56.6356 0.599616L74.067 55.7296L21.2784 58.1116L10.0994 39.9234L2.5986 39.5505L0.0184341 92.2234L7.51904 92.5853L20.4229 75.5768L72.726 83.1084L49.9887 136.27L66.9176 135.749L78.9526 120.209C80.4216 120.486 81.9766 120.675 83.5938 120.754C92.8374 121.207 100.507 117.979 100.725 113.544C100.892 110.119 96.5655 106.978 90.3313 105.515L106.005 85.2756L136.405 83.1592C136.405 83.1594 153.667 82.565 154.341 73.4766Z"
                    fill="#9E9BBF"
                  />
                </svg>
              </figure>
              <p className="text-center font-body text-sm my-6">
                Are you sure you want to leave without selectiing a seat for
                this trip?
              </p>
              <div className="flex flex-wrap lg:flex-nowrap items-center justify-between w-full">
                <button
                  onClick={() => setShowPopUp(false)}
                  className="btn btn-primary basis-full lg:basis-[48%] lg:mr-2 mb-3 lg:mb-0"
                >
                  Select Seat
                </button>
                <button
                  // onClick={proceedToSeatSelectionWithoutSSR}
                  className="btn btn-outline basis-full lg:basis-[48%]"
                >
                  I don’t need it
                </button>
              </div>
            </div>
          </section>
        </Popup>
      )}
    </>
  );
};

export default SeatWrapper;
