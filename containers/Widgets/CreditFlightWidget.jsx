/* eslint-disable @next/next/no-img-element */
import { useState, useRef, useEffect } from "react";
import PromoIcon from "assets/svgs/promo.svg";
import { creditSelector } from "redux/reducers/credit";
import { sessionSelector } from "redux/reducers/session";
import { useSelector } from "react-redux";
import CreditTab from "./credit/Book";
import ModifyCreditTab from "./credit/ModifyBook";

const CreditFlightWidget = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [promocode, setPromocode] = useState(null);
  const [showPromo, setShowPromo] = useState(false);
  const [saveStatus, setSaveStatus] = useState(false);
  const { creditAction } = useSelector(creditSelector);
  const { bookingResponse } = useSelector(sessionSelector);

  const promo = useRef(null);

  useEffect(() => {
    if (bookingResponse) {
      if (bookingResponse?.Booking?.Journeys.length > 1) {
        setActiveTab(2);
      }
    }
  }, [bookingResponse]);

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
    <section className="ga__desktop__filter w-full min-h-[120px] flex flex-col bg-white ">
      <div className="ga__desktop__filter__header flex items-center px-5 py-3">
        <div className="flex items-center">
          <button
            onClick={() => setActiveTab(1)}
            className={`btn ${
              activeTab === 1 ? "btn-primary white font-title" : "btn-text"
            } mr-[22px]`}
            disabled={true}
          >
            One Way
          </button>

          {creditAction === "modify" &&
            bookingResponse &&
            bookingResponse?.Booking?.Journeys.length > 0 && (
              <button
                onClick={() => setActiveTab(2)}
                className={`btn ${
                  activeTab === 2 ? "btn-primary white font-title" : "btn-text"
                } mr-[22px]`}
                disabled={true}
              >
                Round Trip
              </button>
            )}
        </div>

        {/* <div className="flex">
          {showPromo ? (
            <>
              <div className="relative">
                <PromoIcon className="absolute top-3 left-2" />

                <input
                  type="text"
                  ref={promo}
                  className="rounded h-full pl-8 border border-[#EFEFEF]"
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
              <span className="text-primary">Use promo code</span>
            </button>
          )}
        </div> */}
      </div>

      {creditAction === "modify" ? (
        <>
          <section className="ga__desktop__filter__content px-5 py-[18px]">
            {activeTab === 1 && <ModifyCreditTab promocode={promocode} />}

            {creditAction === "modify" &&
              bookingResponse &&
              bookingResponse?.Booking?.Journeys.length > 0 &&
              activeTab === 2 && (
                <ModifyCreditTab type={"round_trip"} promocode={promocode} />
              )}
          </section>
        </>
      ) : (
        <section className="ga__desktop__filter__content px-5 py-[18px]">
          {activeTab === 1 && <CreditTab promocode={promocode} />}
        </section>
      )}
    </section>
  );
};

export default CreditFlightWidget;
