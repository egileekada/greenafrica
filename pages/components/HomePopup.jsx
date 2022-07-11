/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import Popup from "components/Popup";

const HomePopup = () => {
  const [showPopUp, setShow] = useState(false);

  return (
    <Popup display={showPopUp} closeModal={() => setShow(false)}>
      <section className="w-full bg-white rounded-xl p-3">
        <section className="flex">
          <div className="basis-full tab:basis-1/2 flex-shrink-0">
            <div className="flex flex-col px-7 py-14 tab:pt-24 tab:pl-8 tab:pr-28">
              <h2 className="text-primary-main font-semibold font-body text-3xl mb-[18px]">
                Welcome to the future
              </h2>
              <p className="text-sm leading-[29px] font-light text-primary-main mb-6">
                You are one flight closer to your dreams and destinations.
              </p>
              <button className="btn btn-primary w-[133px] py-4 px-6">
                Get Started
              </button>
            </div>
          </div>
          <div className="hidden tab:basis-1/2 flex-shrink-0">
            <figure className="h-[483px]">
              <img
                src="https://static.greenafrica.com/media/1003/green-africa_atr_mountain_final.jpeg?cropmode=percentaje&width=1200"
                alt=""
                className="w-full h-full object-cover rounded-lg"
              />
            </figure>
          </div>
        </section>
      </section>
    </Popup>
  );
};

export default HomePopup;
