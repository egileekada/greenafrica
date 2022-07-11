import { useState, useEffect } from "react";
import PlusIcon from "assets/svgs/plus.svg";
import MinusIcon from "assets/svgs/minus.svg";
import Plane from "assets/svgs/aircraft.svg";
import Star from "assets/svgs/star.svg";
import BriefCase from "assets/svgs/suitcase.svg";
import CheckIn from "assets/svgs/check-in.svg";
import Ascend from "assets/svgs/ascend.svg";

import MobileTab1 from "./Mobile/MobileTab1";
import MobileTab2 from "./Mobile/MobileTab2";
import MobileTab3 from "./Mobile/MobileTab3";
import MobileTab4 from "./Mobile/MobileTab4";
import MobileTab5 from "./Mobile/MobileTab5";

// import Whatsapp from "assets/svgs/whatsapp.svg";

const MobileFilter = () => {
  const [activeId, setId] = useState(0);

  useEffect(() => {
    async function checkParams() {
      const browserQuery = new URLSearchParams(window.location.search);
      const urlTab = browserQuery.get("tab");

      if (urlTab) {
        switch (urlTab) {
          case "book-flight":
            setId(1);
          case "manage-booking":
            setId(2);
          case "checkin":
            setId(3);
          case "flight-status":
            setId(4);
          case "check-best-prices":
            setId(5);
          default:
            return;
        }
      }
    }

    checkParams();
  }, []);

  const toggleAccordion = (e) => {
    const panels = Array.from(
      document.querySelectorAll(".mobile__filter__search")
    );
    const btn = e.target;
    const btnId = parseInt(btn.dataset.id);

    panels.forEach((panel) => {
      var panelId = parseInt(panel.previousElementSibling.dataset.id);
      if (panel.classList.contains("show--panel")) {
        panel.style.transition = "max-height 0.6s ease";
        panel.classList.remove("show--panel");
        setId(0);
      } else {
        if (btnId === panelId) {
          setId(btnId);
          panel.style.transition = "max-height 0.6s ease";
          panel.classList.add("show--panel");
        } else {
          panel.style.transition = "max-height 0.6s ease";
          panel.classList.remove("show--panel");
        }
      }
    });
  };

  return (
    <section className="mobile__filter__container">
      <div className="mobile__filter__item">
        <button
          data-id="1"
          onClick={toggleAccordion}
          className={`opener ${activeId === 1 ? "active" : ""}`}
        >
          <div className="opener-icon">
            <Plane />
            <p>Book My Flight</p>
          </div>
          {activeId === 1 ? (
            <MinusIcon className="opener-indicator" />
          ) : (
            <PlusIcon className="opener-indicator" />
          )}
        </button>
        <div data-id="1" className="mobile__filter__search ">
          <MobileTab1 />
        </div>
      </div>
      <div className="mobile__filter__item">
        <button
          data-id="2"
          onClick={toggleAccordion}
          className={`opener ${activeId === 2 ? "active" : ""}`}
        >
          <div className="opener-icon">
            <BriefCase />
            <p>Manage My Bookings</p>
          </div>
          {activeId === 2 ? (
            <MinusIcon className="opener-indicator" />
          ) : (
            <PlusIcon className="opener-indicator" />
          )}
        </button>
        <div data-id="2" className="mobile__filter__search ">
          <MobileTab2 />
        </div>
      </div>
      <div className="mobile__filter__item">
        <button
          data-id="3"
          onClick={toggleAccordion}
          className={`opener ${activeId === 3 ? "active" : ""}`}
        >
          <div className="opener-icon">
            <CheckIn />
            <p>Check-In</p>
          </div>
          {activeId === 3 ? (
            <MinusIcon className="opener-indicator" />
          ) : (
            <PlusIcon className="opener-indicator" />
          )}
        </button>
        <div data-id="3" className="mobile__filter__search ">
          <MobileTab3 />
        </div>
      </div>
      <div className="mobile__filter__item">
        <button
          data-id="4"
          onClick={toggleAccordion}
          className={`opener ${activeId === 4 ? "active" : ""}`}
        >
          <div className="opener-icon">
            <Ascend />
            <p>Flight Status</p>
          </div>
          {activeId === 4 ? (
            <MinusIcon className="opener-indicator" />
          ) : (
            <PlusIcon className="opener-indicator" />
          )}
        </button>
        <div data-id="4" className="mobile__filter__search ">
          <MobileTab4 />
        </div>
      </div>
      {/* <div className="mobile__filter__item">
        <button
          data-id="5"
          onClick={toggleAccordion}
          className={`opener ${activeId === 5 ? "active" : ""}`}
        >
          <div className="opener-icon">
            <Star />
            <p>Check Best Prices</p>
          </div>
          {activeId === 5 ? (
            <MinusIcon className="opener-indicator" />
          ) : (
            <PlusIcon className="opener-indicator" />
          )}
        </button>
        <div data-id="3" className="mobile__filter__search ">
          <MobileTab5 />
        </div>
      </div> */}
      {/* <a href="https://wa.me/2349155390873" className="fixed whatsapp--btn">
        <Whatsapp />
      </a> */}
    </section>
  );
};

export default MobileFilter;
