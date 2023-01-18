/* eslint-disable @next/next/no-img-element */
import { useState, useRef } from "react";
import PromoIcon from "assets/svgs/promo.svg";
import CheckInTab from "./tabs/CheckInTab";
import BookingTab from "./tabs/BookingTab";
import Book from "./tabs/Book";
import { add } from "date-fns";

const DesktopFilter = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [promocode, setPromocode] = useState(null);
  const [showPromo, setShowPromo] = useState(false);
  const [passengers, setPassengers] = useState(0);
  const [saveStatus, setSaveStatus] = useState(false);
  const [departureDate, setDepartureDate] = useState(
    add(new Date(), { weeks: 1 })
  );
  const [returningDate, setReturningDate] = useState(
    add(new Date(), { days: 10 })
  );
  const [arrivals, setArrivals] = useState([]);
  const [fromTo, setFromTo] = useState({
    from: { cityName: "", value: "", country: "", arrivals: [] },
    to: { cityName: "", value: "", country: "" },
  });
  const [infant, setInfant] = useState(0);
  const [adult, setAdult] = useState(1);
  const [child, setChild] = useState(0);

  const promo = useRef(null);

  const saveVal = () => {
    if (promocode !== null && promocode.length > 1) {
      setSaveStatus(true);
    }
  };

  const clear = () => {
    setSaveStatus(false);
    promo.current.value = null;
    setPromocode(null);
  };

  return (
    <section className="ga__desktop__filter w-full bg-green min-h-[168px] flex flex-col">
      <div className="ga__desktop__filter__header flex items-center justify-between px-5 py-3">
        <div className="flex items-center">
          <button
            onClick={() => setActiveTab(1)}
            className={` px-4 py-3 text-white transition-all text-center rounded-xl text-sm ${
              activeTab === 1 ? "btn-primary bg-primary-main white font-bold font-title" : "font-medium hover:bg-primary-main btn-text font-title"
            } mr-[10px]`}
          >
            One Way
          </button>
          <button
            onClick={() => setActiveTab(2)}
            className={` px-4 py-3 text-white transition-all text-center rounded-xl text-sm  ${
              activeTab === 2 ? "btn-primary bg-primary-main white font-bold font-title" : "font-medium hover:bg-primary-main btn-text font-title"
            } mr-[10px]`}
          >
            Round Trip
          </button>
          <a
            href={`${process.env.NEXT_PUBLIC_CORPORATE_URL}checkin`}
            className={` px-4 py-3 text-white transition-all text-center rounded-xl text-sm ${
              activeTab === 3 ? "btn-primary bg-primary-main white font-bold font-title" : "font-medium hover:bg-primary-main btn-text font-title"
            } mr-[10px] hidden lg:inline`}
          >
            Check In
          </a>
          <a
            href={`${process.env.NEXT_PUBLIC_CORPORATE_URL}bookings`}
            className={` px-4 py-3 text-white transition-all text-center rounded-xl text-sm ${
              activeTab === 4 ? "btn-primary bg-primary-main white font-bold font-title" : "font-medium hover:bg-primary-main btn-text font-title"
            } mr-[10px] hidden lg:inline`}
          >
            My Booking
          </a>

          <a
            className={` px-4 py-3 text-white transition-all text-center rounded-xl text-sm ${
              activeTab === 5 ? "btn-primary bg-primary-main white font-bold font-title" : "font-medium hover:bg-primary-main btn-text font-title"
            } mr-[10px] hidden lg:inline`}
            href="/flight-schedule"
          >
            Flight Schedule
          </a>

          {/* <a
            href="/flight-schedule"
            className={`btn ${
              activeTab === 5 ? "btn-primary" : "btn-text"
            } mr-[22px] hidden lg:inline`}
          >
            Flight Schedule
          </a> */}
        </div>

        <div className="flex">
          {showPromo ? (
            <>
              <div className="relative">
                <PromoIcon className="absolute top-3 left-2" />

                <input
                  type="text"
                  ref={promo}
                  className="rounded h-10 pl-8 border border-[#EFEFEF]"
                  placeholder="Enter Promo Code"
                  onChange={(e) => setPromocode(e.target.value)}
                />
                {saveStatus && (
                  <img
                    onClick={() => clear()}
                    role="button"
                    src="/images/clear-promo.svg"
                    alt=""
                    className="absolute right-3 bottom-2.5 invisible lg:visible z-10"
                  />
                )}
              </div>
              <button
                className="btn btn-outline font-title text-primary-main py-2 rounded-lg mx-2 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => saveVal()}
                disabled={saveStatus}
              >
                Apply
              </button>
            </>
          ) : (
            <button
              className="items-center hidden md:flex"
              onClick={() => setShowPromo(true)}
            >
              <figure className="mr-2">
                <PromoIcon />
              </figure>
              <span className="text-primary text-sm mr-1">Use promo code</span>
            </button>
          )}
        </div>
      </div>
      <section className="ga__desktop__filter__content px-5 py-[18px]">
        {activeTab === 1 && (
          <Book
            setArrivals={setArrivals}
            arrivals={arrivals}
            returningDate={returningDate}
            setReturningDate={setReturningDate}
            departureDate={departureDate}
            setDepartureDate={setDepartureDate}
            fromTo={fromTo}
            passengers={passengers}
            setPassengers={setPassengers}
            setFromTo={setFromTo}
            promocode={promocode}
            type={"one_way"}
            infant={infant}
            setInfant={setInfant}
            adult={adult}
            setAdult={setAdult}
            child={child}
            setChild={setChild}
          />
        )}
        {activeTab === 2 && (
          <Book
            fromTo={fromTo}
            setArrivals={setArrivals}
            arrivals={arrivals}
            returningDate={returningDate}
            setReturningDate={setReturningDate}
            departureDate={departureDate}
            setDepartureDate={setDepartureDate}
            setFromTo={setFromTo}
            passengers={passengers}
            setPassengers={setPassengers}
            type={"round_trip"}
            promocode={promocode}
            infant={infant}
            setInfant={setInfant}
            adult={adult}
            setAdult={setAdult}
            child={child}
            setChild={setChild}
          />
        )}
        {activeTab === 3 && <CheckInTab />}
        {activeTab === 4 && <BookingTab />}
      </section>
    </section>
  );
};

export default DesktopFilter;
