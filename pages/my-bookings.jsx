import React from "react";
import BaseLayout from "layouts/Base";

const Bookings = () => {
  return (
    <BaseLayout>
      {/* <HomeHero /> */}
      <section className="w-full px-3.5 py-10 lg:fit-x-bleed">
        <div className="container mx-auto mb-10">
          <h1 className="text-primary-main text-2xl mb-4">Manage My Booking</h1>
          <p>
            Please input your 6 digit Booking Reference and email address used
            on your booking to retrieve your current flight information.
          </p>

          <div className="bg-white rounded-lg my-14 border-2 border-[#9E9BBF33]">
            <div className="mx-2 p-4 lg:p-8">
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

export default Bookings;
