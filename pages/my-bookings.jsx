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
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-3">
            <div className="my-3">
              <div className="select__wrapper px-5">
                <p className="text-xs uppercase mb-2 mt-1">PNR</p>
                <input
                  type="text"
                  placeholder="Enter PNR Code"
                  className="border-none pl-0 block w-full py-1"
                />
              </div>
            </div>

            <div className="my-3">
              <div className="select__wrapper px-5">
                <p className="text-xs uppercase mb-2 mt-1">last name</p>
                <input
                  type="text"
                  placeholder="Enter your last name"
                  className="border-none pl-0 block w-full py-1"
                />
              </div>
            </div>

            <div className="my-3 lg:col-start-5">
              <button
                type="submit"
                className="btn btn-primary font-title h-full block w-full"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </section>
    </BaseLayout>
  );
};

export default Bookings;
