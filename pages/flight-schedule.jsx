import React from "react";
import BaseLayout from "layouts/Base";
import HomeHero from "./components/Hero";

const flightSchedule = () => {
  return (
    <BaseLayout>
      <HomeHero  flight={true}  />
      <section className="w-full px-3.5 py-10 lg:fit-x-bleed">
        <div className="container mx-auto mb-10">
          <h1 className="text-primary-main lg:font-semibold text-2xl mb-4">
            Flight Schedule
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-3">
            <div className="my-3">
              <div className="select__wrapper px-5">
                <p className="text-xs text-uppercase mb-2">FLIGHTS FROM</p>
                <select
                  name=""
                  id=""
                  className="border-none pl-0 py-0 block w-full"
                >
                  <option value="">Lagos</option>
                  <option value="">Abuja</option>
                </select>
              </div>
            </div>

            <div className="my-3 lg:col-start-5">
              <button className="btn btn-primary font-title h-full block w-full">
                Download Schedule
              </button>
            </div>
          </div>
        </div>

        <div className="container mx-auto mb-10">
          <div className="grid grid-cols-1 lg:grid-flex-col lg:grid-cols-3 sm:grid-flex-col items-center gap-10">
            <div className=" w-full border-[0.2px] rounded-[12px] bg-[#FAFAFF] border-[#9E9BBF] gap-4">
              <div className="schedule__strip p-2 pl-4">
                <img src="/images/flight_vector.svg" alt="" />
              </div>

              <div className="">
                <div className="grid grid-cols-2 items-end px-6 py-6">
                  <div>
                    <p className="text-uppercase mb-1 text-xs">DESTINATION</p>
                    <p className="font-title mb-0">Abuja</p>
                  </div>
                  <div>
                    <p className="text-uppercase mb-1 text-xs">FLIGHT NUMBER</p>
                    <p className="font-title mb-0">983-9J7</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 items-end px-6 py-6">
                  <div>
                    <p className="text-uppercase mb-1 text-xs">
                      DEPARTURE TIME
                    </p>
                    <p className="font-title mb-0">13:00</p>
                  </div>
                  <div>
                    <p className="text-uppercase mb-1 text-xs">ARRIVAL TIME</p>
                    <p className="font-title mb-0">13:45</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 items-end px-6 py-6">
                  <div>
                    <p className="text-uppercase mb-1 text-xs">
                      EFFECTIVE FROM
                    </p>
                    <p className="font-title mb-0">June 19, 2022</p>
                  </div>
                  <div>
                    <p className="text-uppercase mb-1 text-xs">
                      EFFECTIVE FROM
                    </p>
                    <p className="font-title mb-0">June 19, 2022</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </BaseLayout>
  );
};

export default flightSchedule;
