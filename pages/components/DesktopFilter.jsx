/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import PromoIcon from "assets/svgs/promo.svg";
import CheckInTab from "./tabs/CheckInTab";

const DesktopFilter = () => {
  const [activeTab, setActiveTab] = useState(3);

  return (
    <section className="ga__desktop__filter w-full bg-green min-h-[168px] flex flex-col">
      <div className="ga__desktop__filter__header flex items-center justify-between px-5 py-3">
        <div className="flex items-center">
          <button className="btn btn-primary mr-[22px]">One Way</button>
          <button className="btn btn-text mr-[22px]">Round Trip</button>
          <button className="btn btn-text mr-[22px]">Check In</button>
          <button className="btn btn-text mr-[22px]">My Booking</button>
          <button className="btn btn-text mr-[22px]">Flight Schedule</button>
        </div>
        <button className="flex items-center">
          <figure className="mr-2">
            <PromoIcon />
          </figure>
          <span className="text-primary text-sm">Use promo code</span>
        </button>
      </div>
      <section className="ga__desktop__filter__content px-5 py-3">
        {activeTab === 3 && <CheckInTab />}
      </section>
    </section>
  );
};

export default DesktopFilter;
