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
    if (width) {
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

  const setSlide = (index) => {
    console.log(index);
    if (slide.current !== null) {
      let size = slide?.current?.clientWidth;
      item.current.style.transition = "transform 1s ease-in-out";
      setCurrIndex(index);
      item.current.style.transform = "translateX(" + -size * index + "px)";
    }
  };

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
                        backgroundSize: "cover",
                        backgroundImage: `url(${bg.web_image_url})`,
                      }}
                    >
                      <div className="flex absolute max-w-sm top-1/2 transform -translate-y-1/2  text-primary-main left-24 font-body flex-col text-left justify-center items-start gap-4">
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
                      onClick={() => setSlide(index)}
                      key={bg.id + 1}
                      data-key={bg.id + 1}
                      className={`cursor-pointer dots-item ${
                        index === currIndex ? "active" : ""
                      }`}
                    ></div>
                  );
                })}
              </div>
            </>
          ) : (
            <>
              <div ref={item} className="carousel__content">
                {desktopBanners
                  ?.filter((i) => !!i.mobile_image_url)
                  ?.map((bg, index) => {
                    return (
                      <div
                        data-key={index}
                        key={bg.id}
                        ref={slide}
                        className="carousel__content-item"
                        style={{
                          backgroundImage: `url(${bg.mobile_image_url})`,
                          backgroundSize: "cover",
                        }}
                      >
                        <div className="flex absolute max-w-[270px] sm:max-w-sm top-36 text-primary-main left-10 sm:left-24 font-body flex-col text-left justify-center items-start gap-4">
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
                      onClick={() => setSlide(index)}
                      key={bg.id + 1}
                      data-key={bg.id + 1}
                      className={`cursor-pointer dots-item ${
                        index === currIndex ? "active" : ""
                      }`}
                    ></div>
                  );
                })}
              </div>
            </>
          )}
        </>
      )}
    </section>
  );
};

export default HeroSlider;
