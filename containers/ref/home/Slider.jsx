/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useRef } from "react";
import useDeviceSize from "hooks/useWindowSize";
// import { getDesktopBanners, getMobileBanners } from "services/general";
import { Spin } from "antd";

const HeroSlider = () => {
  const [currIndex, setCurrIndex] = useState(0);
  const item = useRef();
  const slide = useRef();
  var timer = useRef();
  const [width] = useDeviceSize();
  const [desktopBanners, setDesktopBanners] = useState([
    {
      id: 13,
      slug: "banners/July2022/HE0ArV5tMW5oR38ti6Go.jpg",
      type: "desktop",
      alt_text: "Happy Eid Kabir",
      title: "Happy Eid Kabir",
      show: 1,
      created_at: "2022-07-09T07:21:00.000000Z",
      updated_at: "2022-07-09T07:32:36.000000Z",
      url: "https://static.greenafrica.com/media/1013/eidkabir_lg_new.gif",
    },
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
    {
      id: 7,
      slug: "banners/April2022/a1kEQpvvqm6uV43v0rkK.png",
      type: "desktop",
      alt_text: null,
      title: "Corper's FlyMax",
      show: 1,
      created_at: "2022-04-24T12:10:31.000000Z",
      updated_at: "2022-04-24T12:10:31.000000Z",
      url: "https://static.greenafrica.com/media/1013/eidkabir_lg_new.gif",
    },
  ]);
  const [mobileBanners, setMobileBanners] = useState([
    {
      id: 12,
      slug: "banners/May2022/uYtvFKsmpEocAPCO1VIy.png",
      type: "mobile",
      alt_text: null,
      title: "Children's Day",
      show: 1,
      created_at: "2022-05-27T07:48:47.000000Z",
      updated_at: "2022-05-27T07:48:47.000000Z",
      url: "https://static.greenafrica.com/media/1002/banner-home.png",
    },
  ]);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const requests = Promise.all([getDesktopBanners(), getMobileBanners()]);
  //       const responses = await requests;
  //       setDesktopBanners(responses[0].items);
  //       setMobileBanners(responses[1].items);
  //     } catch (err) {
  //       toast.error("Error occured");
  //     }
  //     setLoading(false);
  //   })();
  // }, []);

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
                      data-key={index}
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
