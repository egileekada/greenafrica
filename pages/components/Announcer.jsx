/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPopup } from "../../services";

import { Cookies } from "react-cookie-consent";
import Popup from "components/Popup";

const in1Hour = 1 / 24;

const HomePopup = () => {
  const { data } = useQuery(["popups"], getPopup);
  const [showPopUp, setShow] = useState(false);
  var popupShown = Cookies.get("ad_anouncement_popup");

  useEffect(() => {
    if (popupShown) {
    } else {
      setTimeout(() => {
        setShow(true);
      }, 3000);
    }
  }, []);

  const hidePopup = () => {
    Cookies.set("ad_anouncement_popup", "yes", { expires: in1Hour });
    setShow(false);
  };

  return (
    <>
      {data?.data !== null && (
        <Popup display={showPopUp} closeModal={() => hidePopup()}>
          <section className="w-full">
            <section className="flex flex-col lg:flex-row items-center justify-between h-full rounded-xl lg:bg-[#26205E]">
              <div className="md:basis-80 rounded-xl md:rounded-l-xl px-7 py-5 lg:pt-10 lg:px-10 flex items-center bg-white md:bg-[#26205E]">
                <div className="">
                  <h2 className="text-primary-main md:text-white font-semibold font-body text-3xl mb-[18px]">
                    {data?.data.item.subject}
                  </h2>
                  <p className="text-sm leading-[29px] font-light text-primary-main md:text-white mb-6">
                    {data?.data.item.body}
                  </p>
                  <a
                    href={data?.data.item.cta_link}
                    className="btn btn-primary md:white border border-white w-[133px] py-4 px-6"
                    onClick={() => setShow(false)}
                  >
                    Get Started
                  </a>
                </div>
              </div>
              <div className="h-full rounded-r-xl md:w-auto">
                <figure className="h-[483px]">
                  <img
                    src={data?.data.item.web_image_url}
                    alt={data?.data.item.subject}
                    className="w-full h-full object-cover rounded-r-xl invisible lg:visible"
                  />
                </figure>
              </div>
            </section>
          </section>
        </Popup>
      )}
    </>
  );
};

export default HomePopup;
