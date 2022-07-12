/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import PromoIcon from "assets/svgs/promo.svg";
import CheckInTab from "./tabs/CheckInTab";
import BookingTab from "./tabs/BookingTab";
import Book from "./tabs/Book";

const DesktopFilter = () => {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <section className="ga__desktop__filter w-full bg-green min-h-[168px] flex flex-col">
      <div className="ga__desktop__filter__header flex items-center justify-between px-5 py-3 hidden">
        <div className="flex items-center">
          <button
            onClick={() => setActiveTab(1)}
            className={`btn ${
              activeTab === 1 ? "btn-primary" : "btn-text"
            } mr-[22px]`}
          >
            One Way
          </button>
          <button
            onClick={() => setActiveTab(2)}
            className={`btn ${
              activeTab === 2 ? "btn-primary" : "btn-text"
            } mr-[22px]`}
          >
            Round Trip
          </button>
          <button
            onClick={() => setActiveTab(3)}
            className={`btn ${
              activeTab === 3 ? "btn-primary" : "btn-text"
            } mr-[22px]`}
          >
            Check In
          </button>
          <button
            onClick={() => setActiveTab(4)}
            className={`btn ${
              activeTab === 4 ? "btn-primary" : "btn-text"
            } mr-[22px]`}
          >
            My Booking
          </button>
          <button
            onClick={() => setActiveTab(5)}
            className={`btn ${
              activeTab === 5 ? "btn-primary" : "btn-text"
            } mr-[22px]`}
          >
            Flight Schedule
          </button>
        </div>
        <button className="flex items-center">
          <figure className="mr-2">
            <PromoIcon />
          </figure>
          <span className="text-primary text-sm">Use promo code</span>
        </button>
      </div>
      <section className="ga__desktop__filter__content px-5 py-[18px]">
        {activeTab === 1 && <Book />}
        {activeTab === 3 && <CheckInTab />}
        {activeTab === 4 && <CheckInTab />}
      </section>
    </section>
  );
};

export default DesktopFilter;
