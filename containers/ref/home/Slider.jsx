/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import useDeviceSize from "hooks/useWindowSize";
import { getBanner } from "../../../services";
import { Spin } from "antd";

const HeroSlider = () => {
  const {
    data: webBanners,
    isLoading,
    status,
  } = useQuery(["banners"], getBanner);

  const [currIndex, setCurrIndex] = useState(0);
  const item = useRef();
  const slide = useRef();
  var timer = useRef();
  const [width] = useDeviceSize();
  const [desktopBanners, setDesktopBanners] = useState([
    {
      id: 11,
      slug: "banners/May2022/PRk7s7lxyewDbFVlvG64.jpg",
      type: "desktop",
      alt_text: null,
      title: "Happy Children's Day",
      show: 1,
      created_at: "2022-05-27T07:37:37.000000Z",
      updated_at: "2022-05-27T07:37:37.000000Z",
      url: "https://static.greenafrica.com/media/1001/microsoftteams-image-4.png",
    },
  ]);

  useEffect(() => {
    if (status === "success") {
      setDesktopBanners(webBanners?.data?.items);
    }
  }, [status, webBanners]);

  useEffect(() => {
    if (width > 899) {
      timer.current = setTimeout(() => {
        let newIndex = currIndex + 1;
        if (slide.current !== null) {
          let size = slide?.current?.clientWidth;
          item.current.style.transition = "transform 1s ease-in-out";
          if (newIndex >= desktopBanners.length) {
            setCurrIndex(0);
            item.current.style.transform = "translateX(0)";
          } else {
            setCurrIndex(newIndex);
            item.current.style.transform =
              "translateX(" + -size * newIndex + "px)";
          }
        }
      }, 10000);
    }
  });

  return (
    <section className="carousel">
      {isLoading ? (
        <div className="white-loader">
          <Spin />
        </div>
      ) : (
        <>
          {width > 899 ? (
            <>
              <div ref={item} className="carousel__content">
                {desktopBanners?.map((bg, index) => {
                  return (
                    <div
                      data-key={index}
                      key={bg.id}
                      ref={slide}
                      className="carousel__content-item"
                      style={{
                        backgroundImage: `url(${bg.web_image_url})`,
                      }}
                    >
                      <div className="flex absolute max-w-sm top-24 text-primary-main left-24 font-body flex-col text-left justify-center items-start gap-4">
                        <h1 className="font-bold text-4xl text-primary-main">
                          {bg.subject}
                        </h1>
                        <p className="font-body text-lg text-primary-main">
                          {bg.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="dots">
                {desktopBanners.map((bg, index) => {
                  return (
                    <div
                      key={bg.id + 1}
                      data-key={bg.id + 1}
                      className={`dots-item ${
                        index === currIndex ? "active" : ""
                      }`}
                    ></div>
                  );
                })}
              </div>
            </>
          ) : (
            <>
              <div className="carousel__mobile">
                <figure>
                  <img
                    src={
                      desktopBanners?.length > 0
                        ? desktopBanners[0].mobile_image_url
                        : "/images/mobile-hero.png"
                    }
                    alt="imagesd"
                    className="object-cover w-full"
                  />
                </figure>
              </div>
            </>
          )}
        </>
      )}
    </section>
  );
};

export default HeroSlider;
