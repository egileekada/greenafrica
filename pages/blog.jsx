import React from "react";
import BaseLayout from "layouts/Base";
import Newsletter from "components/Newsletter";

const flightSchedule = () => {
  return (
    <BaseLayout>
      <section className="w-full px-3.5 py-10 lg:fit-x-bleed bg-primary-main grid grid-cols-1 lg:auto-cols-max lg:grid-flow-col items-end">
        <div className="text-center w-full">
          <p className="text-green uppercase">NEWS FROM THE CABIN</p>
          <h1 className="text-white font-semibold text-5xl mt-4">
            Green Africa Newsroom
          </h1>
        </div>
        <div className="relative white w-1/2 lg:w-full mx-auto mt-6 lg:mt-0 blog__search">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent text-white border-none w-full"
          />
          <img
            src="/images/icon-search.svg"
            alt=""
            className="absolute right-3 bottom-3"
          />
        </div>
      </section>
      <section className="w-full px-3.5 py-10 lg:fit-x-bleed bg-[#F4F4F4]">
        <div className="container mx-auto mb-10">
          <a
            href="/blog/artist-is-my-name"
            className="grid grid-cols-1 md:grid-cols-2 border gap-10 p-3 md:px-20 md:py-10 rounded-lg items-center bg-white my-10 blog__post"
          >
            <div className="order-last md:order-first px-4 md:px-0">
              <p className="uppercase font-semibold">August 13, 2021 </p>
              <h1 className="font-semibold text-2xl">
                COVID 19 Guidelines for all passengers flying on Green Africa
              </h1>
              <p className="text-base font-thin my-5 ">
                Redefined the user acquisition and redesigned the onboarding
                experience, all within 3 working weeks.
              </p>
            </div>
            <div className="text-center">
              <img
                src="/images/blog_template.jpg"
                alt=""
                className="rounded-lg object-cover lg:w-2/4 w-full mx-auto"
              />
            </div>
          </a>

          <a className="grid grid-cols-1 md:grid-cols-2 border gap-10 p-3 md:px-20 md:py-10 rounded-lg items-center bg-white my-10 blog__post">
            <div className="order-last md:order-first px-4 md:px-0">
              <p className="uppercase font-semibold">August 13, 2021 </p>
              <h1 className="font-semibold text-2xl">
                COVID 19 Guidelines for all passengers flying on Green Africa
              </h1>
              <p className="text-base font-thin my-5 ">
                Redefined the user acquisition and redesigned the onboarding
                experience, all within 3 working weeks.
              </p>
            </div>
            <div className="text-center">
              <img
                src="/images/blog_template.jpg"
                alt=""
                className="rounded-lg object-cover lg:w-2/4 w-full mx-auto"
              />
            </div>
          </a>
        </div>

        <Newsletter />
      </section>
    </BaseLayout>
  );
};

export default flightSchedule;
