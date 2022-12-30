/* eslint-disable @next/next/no-img-element */
import { useState, useRef, useEffect } from "react";
import PromoIcon from "assets/svgs/promo.svg";
import Book from "./tabs/Book";

const DesktopFilter = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [promocode, setPromocode] = useState(null);
  const [showPromo, setShowPromo] = useState(false);
  const [saveStatus, setSaveStatus] = useState(false);
  const [type, setType] = useState("");

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

  const ibeQuery = new URLSearchParams(window.location.search);
  const isRoundTrip = parseInt(ibeQuery.get("round")) === 1 ? true : false;

  useEffect(() => {
    if (isRoundTrip) {
      setType("round_trip");
      setActiveTab(2);
    }
  }, []);

  return (
    <section className="ga__desktop__filter w-full min-h-[168px] flex flex-col ">
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
            onClick={() => {
              setActiveTab(2), setType("round_trip");
            }}
            className={`btn ${
              activeTab === 2 ? "btn-primary white font-title" : "btn-text"
            } mr-[22px]`}
          >
            Round Trip
          </button>
        </div>

        <div className="flex">
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
        </div>
      </div>
      <section className="ga__desktop__filter__content px-5 py-[18px]">
        {activeTab === 1 && <Book promocode={promocode} />}
        {activeTab === 2 && <Book type={type} promocode={promocode} />}
      </section>
    </section>
  );
};

export default DesktopFilter;
