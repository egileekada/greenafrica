/* eslint-disable @next/next/no-img-element */
import { Fragment } from "react";

const Updates = () => {
  return (
    <Fragment>
      <div className="container mx-auto gid sm:grid-flow-col gap-x-24 my-5">
        <h1 className="text-primary-main font-semibold text-2xl mb-4">
          Important Updates
        </h1>
        <div className="relative my-5 h-96">
          <div className="absolute bottom-0 left-0 p-6 col-start-1 row-start-1 flex flex-col-reverse bg-primary-main lg:w-1/3 rounded-b-lg lg:rounded-bl-lg lg:rounded-br-none">
            <h2 className="mt-3 font-medium text-white md:text-2xl dark:sm:text-white">
              COVID 19 Guidelines and how it affects our Flight routes
            </h2>
            <p className="text-xs font-medium text-white">January 20, 2022</p>
          </div>
          <img
            src="https://static.greenafrica.com/media/1003/green-africa_atr_mountain_final.jpeg?cropmode=percentaje&width=1200"
            alt=""
            className="w-full h-96 object-cover rounded-lg"
          />
        </div>
      </div>

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 sm:grid-flow-col gap-x-24 xl:gap-x-24 md:gap-x-5 mb-10">
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
    </Fragment>
  );
};

export default Updates;
