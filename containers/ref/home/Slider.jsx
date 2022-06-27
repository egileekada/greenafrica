/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useRef } from "react";
import useDeviceSize from "hooks/useWindowSize";
import { getDesktopBanners, getMobileBanners } from "services/general";
import { Spin } from "antd";
import toast from "react-hot-toast";

const HeroSlider = () => {
  const [currIndex, setCurrIndex] = useState(0);
  const item = useRef();
  const slide = useRef();
  var timer = useRef();
  const [width] = useDeviceSize();
  const [desktopBanners, setDesktopBanners] = useState([]);
  const [mobileBanners, setMobileBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const requests = Promise.all([getDesktopBanners(), getMobileBanners()]);
        const responses = await requests;
        setDesktopBanners(responses[0].items);
        setMobileBanners(responses[1].items);
      } catch (err) {
        toast.error("Error occured");
      }
      setLoading(false);
    })();
  }, []);

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
      }, 5000);
    }
    // }, [currIndex]);
  });

  return (
    <section className="carousel">
      {loading ? (
        <div className="white-loader">
          <Spin />
        </div>
      ) : (
        <>
          {width > 899 ? (
            <>
              <div ref={item} className="carousel__content">
                {desktopBanners.map((bg, index) => {
                  return (
                    <div
                      key={index}
                      ref={slide}
                      className="carousel__content-item"
                      style={{
                        backgroundImage: `url(${bg.url})`,
                      }}
                    ></div>
                  );
                })}
              </div>

              <div className="dots">
                {desktopBanners.map((index) => {
                  return (
                    <div
                      key={index}
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
                      mobileBanners.length > 0
                        ? mobileBanners[0].url
                        : "/images/mobile-hero.png"
                    }
                    alt="imagesd"
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
