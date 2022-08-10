import React from "react";
import BaseLayout from "layouts/Base";

const CheckIn = () => {
  return (
    <BaseLayout>
      {/* <HomeHero /> */}
      <section className="w-full px-3.5 py-10 lg:fit-x-bleed bg-[#F4F4F4]">
        <div className="container mx-auto mb-10">
          <h1 className="text-primary-main font-bold text-2xl mb-4">
            Check in
          </h1>
          <p>
            Online check-in opens 48 hours to departure and closes 3 hours to
            departure for gClassic and gFlex Customers.
          </p>

          <p>
            Online check-in opens 24 hours to departure and closes 3 hours to
            departure for gSaver Customers.
          </p>

          <div className="bg-white rounded-lg my-14 border-2 border-[#9E9BBF33]">
            <div className="lg:px-20">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 md:gap-10 lg:text-center">
                <div className="p-4 lg:p-10 flex flex-row items-center gap-4 lg:flex-col">
                  <img
                    src="/images/check-in-1.svg"
                    alt="Access the online check-in service"
                    className="mx-auto my-8"
                  />
                  <p className="w-5/6 mx-auto">
                    Access the online check-in service by entering your booking
                    credentials in the fields indicated.
                  </p>
                </div>

                <div className="p-4 lg:p-10 flex flex-row items-center gap-4 lg:flex-col">
                  <img
                    src="/images/check-in-2.svg"
                    alt="download or print your boarding"
                    className="mx-auto my-8"
                  />
                  <p className="w-5/6 mx-auto">
                    Remember to download or print your boarding pass when you
                    have completed the online check-in process.
                  </p>
                </div>

                <div className="p-4 lg:p-10 flex flex-row items-center gap-4 lg:flex-col">
                  <img
                    src="/images/check-in-3.svg"
                    alt="check-in at the airport"
                    className="mx-auto my-8"
                  />
                  <p className="w-5/6 mx-auto">
                    You can also check-in at the airport 2 hours before
                    departure.
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t mx-2 p-4 lg:p-8">
              <p className="text-primary-main font-bold text-base">
                Enter flight details to view your booking
              </p>
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-3">
                <div className="my-3 col-span-2">
                  <div className="select__wrapper px-5">
                    <p className="text-xs uppercase mb-1 mt-1">
                      Booking Reference
                    </p>
                    <input
                      type="text"
                      placeholder=""
                      className="border-none pl-0 block w-full py-1"
                    />
                  </div>
                </div>

                <div className="my-3 col-span-2">
                  <div className="select__wrapper px-5">
                    <p className="text-xs uppercase mb-1 mt-1">last name</p>
                    <input
                      type="text"
                      placeholder=""
                      className="border-none pl-0 block w-full py-1"
                    />
                  </div>
                </div>

                <div className="my-3 lg:ml-auto">
                  <button
                    type="submit"
                    className="btn btn-primary font-bold h-full block w-full"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </BaseLayout>
  );
};

export default CheckIn;
