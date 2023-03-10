/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getDestinations, getLocations } from "../../services";
import FlightIcon from "assets/svgs/flight_icon.svg";
import Slider from "react-slick";
import Arrow from "components/TestimonialArrow";
import LocationSelector from "./LocationSelector";
import CustomSlider from "components/CustomSlider";
import { ContainerFilled } from "@ant-design/icons";
const Destinations = (props) => {
  const [value, setValue] = useState("LOS"); 
  const [isShown, setIsShown] = useState(false); 

  const { data: destinations } = useQuery(["destination_matrices", value], () =>
    getDestinations(value)
  );
  const { data: locations } = useQuery(["locations"], getLocations); 

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1, 
    className: "left",
    responsive: [
      {
        breakpoint: 1026,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
          arrows: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          autoplay: true,
          dots: true,
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          arrows: false,
          autoplay: true,
          autoplaySpeed: 2000,
        },
      },
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ],
    nextArrow: (
      <Arrow
        image="/images/slick_right.svg"
        alt="Next Arrow"
        className="max-w-fit"
      />
    ),
    prevArrow: <Arrow image="/images/slick_left.svg" alt="Previous Arrow" />,
  };
 
  useEffect(async()=> {   
    setIsShown(true)
    const t1 = setTimeout(() => { 
        setIsShown(false)
        clearTimeout(t1);
      }, 1000); 
  }, [value])

  useEffect(() => {
    setValue(props.query);
  }, [props.query]);

  return (
    <>
      {" "}
      <link
        rel="stylesheet"
        type="text/css"
        charSet="UTF-8"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick-theme.min.css"
      />
      <section className="container mx-auto mb-10">
        <h1 className="text-primary-main font-semibold text-2xl my-2 text-center flex justify-center lg:justify-start items-center lg:text-left">
          Explore Our Destinations{" "}
          <span className="hidden md:flex ml-1 items-center">
            from{" "} 
            <LocationSelector data={locations} value={setValue} /> 
          </span>
        </h1>
        <p className="text-center lg:text-left text-lg text-primary-main font-light">
          You are one flight closer to your dreams and destinations.
        </p>

        <div className="select__wrapper px-5 mx-5  pb-6 block md:hidden">
          <p className="text-xs text-uppercase my-2">FROM</p>
          <LocationSelector data={locations} value={setValue} /> 
        </div> 
        <div className="mt-10">
          {/* <Slider {...settings}>

            {destinations?.data?.item?.map((destination, index) => (
              <a
                className="my-4"
                href={`/destination/${destination.destination}?origin=${destination.origin}`}
                key={index}
              >
                <div className="relative">
                  <FlightIcon className="inline-block absolute" />
                  <h1 className="text-primary-main pl-5 font-semibold text-lg mb-2 rounded-full bg-grey-light py-2 text-center w-[80%]">
                    {destination.destination_fullname}
                  </h1>
                </div>
                <p className="text-base text-primary-main font-light ml-8">
                  Starting at ???{destination.lowest_fare}
                </p>
                {destination.image_url ? ( 
                  <img
                    src={`${destination.image_url}`}
                    alt={destination.destination}
                    className="object-cover w-full h-[180px] rounded-lg"
                  />
                ): (
                  <div className="object-cover w-full bg-primary-main h-[180px] rounded-lg"/>
                )}
              </a>
            ))}
          </Slider> */}
          {!isShown && (
            <CustomSlider data={destinations?.data?.item} />
          )}
          {isShown && (
            <div className=" w-screen flex overflow-x-auto hidescroll" >
              <div className=" w-auto flex " > 
                <div role="status" class="flex items-center justify-center h-[206px] w-[309px] bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700 mr-4 "/>
                <div role="status" class="flex items-center justify-center h-[206px] w-[309px] bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700 mr-4 "/>
                <div role="status" class="flex items-center justify-center h-[206px] w-[309px] bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700 mr-4 "/> 
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Destinations;
