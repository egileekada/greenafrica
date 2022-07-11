import { useState, useEffect } from "react";
import Tab1 from "./Desktop/Tab1";
import Tab2 from "./Desktop/Tab2";
import Tab3 from "./Desktop/Tab3";
import Tab4 from "./Desktop/Tab4";
import Tab5 from "./Desktop/Tab5";

import BriefCase from "assets/svgs/suitcase.svg";
import CheckIn from "assets/svgs/check-in.svg";
import Plane from "assets/svgs/aircraft.svg";
import Ascend from "assets/svgs/ascend.svg";
import Star from "assets/svgs/star.svg";

// import Whatsapp from "assets/svgs/whatsapp.svg";

const DesktopFilter = () => {
  const [activeTab, setActiveTab] = useState(1);

  useEffect(() => {
    async function checkParams() {
      const browserQuery = new URLSearchParams(window.location.search);
      const urlTab = browserQuery.get("tab");

      if (urlTab) {
        switch (urlTab) {
          case "book-flight":
            setActiveTab(1);
          case "manage-booking":
            setActiveTab(2);
          case "checkin":
            setActiveTab(3);
          case "flight-status":
            setActiveTab(4);
          case "check-best-prices":
            setActiveTab(5);
          default:
            return;
        }
      }
    }

    checkParams();
  }, []);

  return (
    <section className="desktop__filter__container">
      <div className="filter__header">
        <button
          onClick={() => setActiveTab(1)}
          className={`${activeTab === 1 ? "active" : ""}`}
        >
          <Plane />
          <span>Book My Flight</span>
        </button>
        <button
          onClick={() => setActiveTab(2)}
          className={`${activeTab === 2 ? "active" : ""}`}
        >
          <BriefCase />
          <span>Manage My Bookings</span>
        </button>
        <button
          onClick={() => setActiveTab(3)}
          className={`${activeTab === 3 ? "active" : ""}`}
        >
          <CheckIn />
          <span>Check-in</span>
        </button>
        <button
          onClick={() => setActiveTab(4)}
          className={`${activeTab === 4 ? "active" : ""}`}
        >
          <Ascend />
          <span>Flight status</span>
        </button>
        <button
          // onClick={() => setActiveTab(5)}
          className={`${activeTab === 5 ? "active" : ""}`}
        >
          <Star />
          <span>Check Best Prices</span>
        </button>
      </div>
      <div className="filter__content">
        <div className="filter__container">
          {activeTab === 1 && <Tab1 activeTab={activeTab} />}
          {activeTab === 2 && <Tab2 />}
          {activeTab === 3 && <Tab3 />}
          {activeTab === 4 && <Tab4 />}
          {activeTab === 5 && <Tab5 />}
        </div>
      </div>
      {/* <a href="https://wa.me/2349155390873" className="whatsapp--btn">
        <Whatsapp />
      </a> */}
      {/* <button className="support--btn">
        <Support />
      </button> */}
    </section>
  );
};

export default DesktopFilter;
