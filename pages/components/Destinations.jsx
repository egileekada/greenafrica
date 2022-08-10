/* eslint-disable @next/next/no-img-element */
import FlightIcon from "assets/svgs/flight_icon.svg";
import Slider from "react-slick";
import Arrow from "components/TestimonialArrow";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
const Destinations = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
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
        <h1 className="text-primary-main font-semibold text-2xl my-2">
          Explore Our Destinations from{" "}
          <select
            name=""
            id=""
            className="border-none font-semibold text-2xl"
            style={{ borderBottom: "1px solid #26205E" }}
          >
            <option value="Lagos">Lagos</option>
            <option value="Lagos">Abuja</option>
          </select>
        </h1>
        <p className="text-lg text-primary-main font-light mb-10">
          You are one flight closer to your dreams and destinations.
        </p>

        {/* <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-x-12 md:gap-x-5 xl:gap-x-12"> */}
        <div>
          <Slider {...settings}>
            <a className="my-4" href="/destination/abuja">
              <div className="relative">
                <FlightIcon className="inline-block absolute" />
                <h1 className="text-primary-main font-semibold text-lg mb-2 rounded-full bg-grey-light py-2 text-center w-8/12">
                  Abuja
                </h1>
              </div>
              <p className="text-base text-primary-main font-light ml-8">
                Starting at ₦27,500
              </p>
              <img
                src="https://static.greenafrica.com/media/1005/900x600-fa-01.png"
                alt=""
                className="object-cover w-full rounded-lg"
              />
            </a>

            <a className="my-4" href="/destination/abuja">
              <div className="relative">
                <FlightIcon className="inline-block absolute" />
                <h1 className="text-primary-main font-semibold text-lg mb-2 rounded-full bg-grey-light py-2 text-center w-8/12">
                  Abuja
                </h1>
              </div>
              <p className="text-base text-primary-main font-light ml-8">
                Starting at ₦27,500
              </p>
              <img
                src="https://static.greenafrica.com/media/1005/900x600-fa-01.png"
                alt=""
                className="object-cover w-full rounded-lg"
              />
            </a>

            <a className="my-4" href="/destination/abuja">
              <div className="relative">
                <FlightIcon className="inline-block absolute" />
                <h1 className="text-primary-main font-semibold text-lg mb-2 rounded-full bg-grey-light py-2 text-center w-8/12">
                  Abuja
                </h1>
              </div>
              <p className="text-base text-primary-main font-light ml-8">
                Starting at ₦27,500
              </p>
              <img
                src="https://static.greenafrica.com/media/1005/900x600-fa-01.png"
                alt=""
                className="object-cover w-full rounded-lg"
              />
            </a>

            <a className="my-4" href="/destination/abuja">
              <div className="relative">
                <FlightIcon className="inline-block absolute" />
                <h1 className="text-primary-main font-semibold text-lg mb-2 rounded-full bg-grey-light py-2 text-center w-8/12">
                  Abuja
                </h1>
              </div>
              <p className="text-base text-primary-main font-light ml-8">
                Starting at ₦27,500
              </p>
              <img
                src="https://static.greenafrica.com/media/1005/900x600-fa-01.png"
                alt=""
                className="object-cover w-full rounded-lg"
              />
            </a>

            <a className="my-4" href="/destination/abuja">
              <div className="relative">
                <FlightIcon className="inline-block absolute" />
                <h1 className="text-primary-main font-semibold text-lg mb-2 rounded-full bg-grey-light py-2 text-center w-8/12">
                  Abuja
                </h1>
              </div>
              <p className="text-base text-primary-main font-light ml-8">
                Starting at ₦27,500
              </p>
              <img
                src="https://static.greenafrica.com/media/1005/900x600-fa-01.png"
                alt=""
                className="object-cover w-full rounded-lg"
              />
            </a>

            <a className="my-4" href="/destination/abuja">
              <div className="relative">
                <FlightIcon className="inline-block absolute" />
                <h1 className="text-primary-main font-semibold text-lg mb-2 rounded-full bg-grey-light py-2 text-center w-8/12">
                  Abuja
                </h1>
              </div>
              <p className="text-base text-primary-main font-light ml-8">
                Starting at ₦27,500
              </p>
              <img
                src="https://static.greenafrica.com/media/1005/900x600-fa-01.png"
                alt=""
                className="object-cover w-full rounded-lg"
              />
            </a>
          </Slider>
        </div>
      </section>
    </>
  );
};

export default Destinations;
