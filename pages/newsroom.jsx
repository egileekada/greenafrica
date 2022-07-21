import React from "react";
import BaseLayout from "layouts/Base";
import Newsletter from "components/Newsletter";

const flightSchedule = () => {
  return (
    <BaseLayout>
      <section className="w-full px-3.5 py-10 lg:fit-x-bleed bg-[#F4F4F4]">
        <div className="container mx-auto mb-10">
          <a
            href="/blog/artist-is-my-name"
            className="grid grid-cols-1 md:grid-cols-2 border gap-10 p-3 md:px-20 md:py-10 rounded-lg items-center bg-white my-10"
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
                className="rounded-lg object-cover md:w-2/4 w-full mx-auto"
              />
            </div>
          </a>

          <a className="grid grid-cols-1 md:grid-cols-2 border gap-10 p-3 md:px-20 md:py-10 rounded-lg items-center bg-white my-10">
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
                className="rounded-lg object-cover md:w-2/4 w-full mx-auto"
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
