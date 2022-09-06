/* eslint-disable @next/next/no-img-element */
import { useState, useRef } from "react";
import PromoIcon from "assets/svgs/promo.svg";
import CheckInTab from "./tabs/CheckInTab";
import BookingTab from "./tabs/BookingTab";
import Book from "./tabs/Book";

const DesktopFilter = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [promocode, setPromocode] = useState(null);
  const [showPromo, setShowPromo] = useState(false);
  const [saveStatus, setSaveStatus] = useState(false);
  const [fromTo, setFromTo] = useState({ from: "", to: "" });

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
            className={`btn ${
              activeTab === 1 ? "btn-primary white font-title" : "btn-text"
            } mr-[22px]`}
          >
            One Way
          </button>
          <button
            onClick={() => setActiveTab(2)}
            className={`btn ${
              activeTab === 2 ? "btn-primary white font-title" : "btn-text"
            } mr-[22px]`}
          >
            Round Trip
          </button>
          <button
            onClick={() => setActiveTab(3)}
            className={`btn ${
              activeTab === 3 ? "btn-primary white font-title" : "btn-text"
            } mr-[22px] hidden lg:inline`}
          >
            Check In
          </button>
          <button
            onClick={() => setActiveTab(4)}
            className={`btn ${
              activeTab === 4 ? "btn-primary white font-title" : "btn-text"
            } mr-[22px] hidden lg:inline`}
          >
            My Booking
          </button>

          <a
            className={`btn ${
              activeTab === 5 ? "btn-primary white font-title" : "btn-text"
            } mr-[22px] hidden lg:inline`}
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
              className="flex items-center hidden md:flex"
              onClick={() => setShowPromo(true)}
            >
              <figure className="mr-2">
                <PromoIcon />
              </figure>
              <span className="text-primary text-sm">Use promo code</span>
            </button>
          )}
        </div>
      </div>
      <section className="ga__desktop__filter__content px-5 py-[18px]">
        {activeTab === 1 && (
          <Book fromTo={fromTo} setFromTo={setFromTo} promocode={promocode} />
        )}
        {activeTab === 2 && (
          <Book
            fromTo={fromTo}
            setFromTo={setFromTo}
            type={"round_trip"}
            promocode={promocode}
          />
        )}
        {activeTab === 3 && <CheckInTab />}
        {activeTab === 4 && <BookingTab />}
      </section>
    </section>
  );
};

export default DesktopFilter;
