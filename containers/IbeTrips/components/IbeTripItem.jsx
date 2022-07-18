/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import AeroIcon from "assets/svgs/aero.svg";
import DottedLine from "assets/svgs/dotted-line.svg";
import CaretDown from "assets/svgs/caretdown.svg";
import IbeTripVariant from "./IbeTripVaraint";

const IbeTripItem = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <section className="flex flex-col">
      <section className="ibe__trip__item">
        <div className="basis-[60%] flex  flex-col min-h-[54px] ">
          <p className="tripType self-center">Direct Flight</p>
          <div className="flex justify-between">
            <div className="flex flex-col">
              <h5 className="font-extrabold font-header  text-2xl text-primary-main">
                18:00
              </h5>
              <p className="font-semibold font-body text-sm text-black">
                Lagos (LOS)
              </p>
            </div>
            <div className="flex items-center basis-[70%] justify-between">
              <DottedLine />
              <AeroIcon />
              <DottedLine />
            </div>
            <div className="flex flex-col  items-end">
              <h5 className="font-extrabold font-header text-2xl text-primary-main">
                19:35
              </h5>
              <p className="font-semibold font-body text-sm text-black">
                Akure (AKR)
              </p>
            </div>
          </div>
          <p className="tripTime self-center">1h 35mins</p>
        </div>
        <div className="basis-[40%] flex justify-end items-center">
          {!isVisible ? (
            <button
              className="btn btn-primary w-[200px] flex items-center group"
              onClick={() => setIsVisible(!isVisible)}
            >
              <span className="text-white mr-3">From ₦16,501</span>
              <CaretDown />
            </button>
          ) : (
            <button className="btn btn-outline dotted  w-[200px] flex items-center group">
              <span className="text-primary-main mr-2">Select a product</span>
            </button>
          )}
        </div>
      </section>
      <section
        className={`bg-white w-full min-h-[96px] pb-10 transition-all ${
          isVisible ? "flex flex-col" : "hidden"
        }`}
      >
        <div className="border-t border-t-black border-opacity-20 mx-6 mb-7"></div>
        <div className="flex justify-between px-12">
          <div className="basis-[32%]">
            <IbeTripVariant variant="saver" />
          </div>
          <div className="basis-[32%]">
            <IbeTripVariant variant="classic" />
          </div>
          <div className="basis-[32%]">
            <IbeTripVariant variant="gflex" />
          </div>
        </div>
      </section>
      {!isVisible && (
        <div className="ibe__trip__number">
          <h4>FLIGHT NUMBER</h4>
          <p>Q9 301</p>
        </div>
      )}
    </section>
  );
};

export default IbeTripItem;
