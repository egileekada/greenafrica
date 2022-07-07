/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import BaseLayout from "layouts/Base";
import Newsletter from "components/Newsletter";
import FlightIcon from "../assets/svgs/flightIcon.svg";
// import FlightIconT from "../assets/images/banner-image.png";

const Home = () => {
  return (
    <BaseLayout>
      <div className="relative h-4/6">
        <img
          src="https://static.greenafrica.com/media/1001/microsoftteams-image-4.png"
          alt=""
          className="w-full h-96 lg:h-4/6 object-cover"
        />
        <div className="absolute pl-8 lg:pl-24 top-1/4 lg:w-1/4 hidden">
          <h1 className="text-4xl text-primary-main font-medium">
            Welcome to the future
          </h1>
          <p className="text-2xl text-primary-main font-light mt-8">
            You are one flight closer to your dreams and destinations.
          </p>
        </div>
      </div>

      <section className="w-full px-3.5 py-24 lg:fit-x-bleed">
        <div className="container mx-auto mb-10">
          <h1 className="text-primary-main font-semibold text-3xl mb-2">
            Explore Our Destinations from Lagos
          </h1>
          <p className="text-lg text-primary-main font-light mb-10">
            You are one flight closer to your dreams and destinations.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-4 sm:grid-flow-col gap-x-12">
            <div className="my-4">
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
            </div>

            <div className="my-4">
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
            </div>

            <div className="my-4">
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
            </div>

            <div className="my-4">
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
            </div>
          </div>
        </div>

        <div className="container mx-auto gid sm:grid-flow-col gap-x-24 mb-20">
          <h1 className="text-primary-main font-semibold text-2xl mb-4">
            Important Updates
          </h1>
          <div className="relative my-5 h-96">
            <div class="absolute bottom-0 left-0 p-6 col-start-1 row-start-1 flex flex-col-reverse bg-primary-main lg:w-1/3 rounded-b-lg lg:rounded-bl-lg lg:rounded-br-none">
              <h2 class="mt-3 font-medium text-white md:text-2xl dark:sm:text-white">
                COVID 19 Guidelines and how it affects our Flight routes
              </h2>
              <p class="text-xs font-medium text-white">January 20, 2022</p>
            </div>
            <img
              src="https://static.greenafrica.com/media/1003/green-africa_atr_mountain_final.jpeg?cropmode=percentaje&width=1200"
              alt=""
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>
        </div>

        <div className="container mx-auto grid sm:grid-flow-col gap-x-24 mb-10">
          <div className="my-5">
            <img
              src="https://static.greenafrica.com/media/1003/green-africa_atr_mountain_final.jpeg?cropmode=percentaje&width=1200"
              alt=""
              className="w-full h-80 object-cover rounded-lg"
            />
            <h6 className="text-lg text-primary-main font-header font-bold mt-5">
              COVID 19 Guidelines and how it affects our Flight routes
            </h6>
            <p className="text-base font-light text-primary-main mt-2">
              You are one flight closer to your dreams and destinations.
            </p>

            <a href="#" className="btn btn-white mt-5 inline-block">
              {" "}
              Read More
            </a>
          </div>
          <div className="my-5">
            <img
              src="https://static.greenafrica.com/media/1003/green-africa_atr_mountain_final.jpeg?cropmode=percentaje&width=1200"
              alt=""
              className="w-full h-80 object-cover rounded-lg"
            />

            <h6 className="text-lg text-primary-main font-header font-bold mt-5">
              COVID 19 Guidelines and how it affects our Flight routes
            </h6>
            <p className="text-base font-light text-primary-main mt-2">
              You are one flight closer to your dreams and destinations.
            </p>

            <a href="#" className="btn btn-white mt-5 inline-block">
              {" "}
              Read More
            </a>
          </div>
          <div className="my-5">
            <img
              src="https://static.greenafrica.com/media/1003/green-africa_atr_mountain_final.jpeg?cropmode=percentaje&width=1200"
              alt=""
              className="w-full h-80 object-cover rounded-lg"
            />
            <h6 className="text-lg text-primary-main font-header font-bold mt-5">
              COVID 19 Guidelines and how it affects our Flight routes
            </h6>
            <p className="text-base font-light text-primary-main mt-2">
              You are one flight closer to your dreams and destinations.
            </p>

            <a href="#" className="btn btn-white mt-5 inline-block">
              {" "}
              Read More
            </a>
          </div>
        </div>
        <Newsletter />
      </section>
    </BaseLayout>
  );
};

export default Home;
