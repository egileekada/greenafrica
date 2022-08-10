/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import Popup from "components/Popup";

const HomePopup = ({ show, setShow }) => {
  // const [showPopUp, setShow] = useState(true);

  return (
    <Popup display={show} closeModal={() => setShow(false)}>
      <section className="w-full bg-white rounded-xl">
        <section className="flex flex-col lg:flex-row items-center items-stretch justify-between h-full">
          <div className="basis-full md:basis-1/3 lg:bg-[#26205E] rounded-l-xl px-7 py-5 lg:pt-24 lg:px-10 flex items-center">
            <div className="">
              <h1 className="text-primary-main lg:text-white font-semibold font-body text-xl lg:text-4xl mb-[18px]">
                Join Our Community
              </h1>
              <p className="text-sm leading-[29px] font-light text-dark lg:text-white mb-6">
                Join the gFlyer Community to enjoy exclusive benefits!
              </p>
            </div>
          </div>

          <div className="h-full">
            <form class="w-full max-w-lg px-6 py-5 lg:py-20">
              <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <div className="select__wrapper px-5">
                    <p className="text-xs my-2">First Name</p>
                    <input
                      type="text"
                      placeholder=""
                      className="border-none pl-0 block w-full py-1"
                    />
                  </div>
                </div>
                <div class="w-full md:w-1/2 px-3">
                  <div className="select__wrapper px-5">
                    <p className="text-xs my-2">Last Name</p>
                    <input
                      type="text"
                      placeholder=""
                      className="border-none pl-0 block w-full py-1"
                    />
                  </div>
                </div>
              </div>

              <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <div className="select__wrapper px-5">
                    <p className="text-xs my-2">Email Address</p>
                    <input
                      type="text"
                      placeholder=""
                      className="border-none pl-0 block w-full py-1"
                    />
                  </div>
                </div>
                <div class="w-full md:w-1/2 px-3">
                  <div className="select__wrapper px-5">
                    <p className="text-xs my-2">Phone Number</p>
                    <input
                      type="text"
                      placeholder=""
                      className="border-none pl-0 block w-full py-1"
                    />
                  </div>
                </div>
              </div>

              <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <div className="select__wrapper px-5">
                    <p className="text-xs text-uppercase my-2">Country</p>
                    <select
                      name=""
                      id=""
                      className="border-none pl-0 block w-full"
                    >
                      <option value="">Nigeria</option>
                    </select>
                  </div>
                </div>
                <div class="w-full md:w-1/2 px-3">
                  <div className="select__wrapper px-5">
                    <p className="text-xs text-uppercase my-2">State</p>
                    <select
                      name=""
                      id=""
                      className="border-none pl-0 block w-full"
                    >
                      <option value="">Lagos</option>
                      <option value="">Abuja</option>
                    </select>
                  </div>
                </div>
              </div>

              <div class="flex flex-wrap -mx-3 mb-2">
                <div class="w-full px-3 mb-6">
                  <label class="block">
                    <input class="mr-2 leading-tight" type="checkbox" />
                    <span class="text-sm font-light text-primary-main">
                      I agree to join the gFlyer Community by submitting my
                      details.
                    </span>
                  </label>
                </div>
              </div>

              <div class="flex flex-wrap -mx-3 mb-2">
                <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <button className="btn btn-primary w-[133px] font-semibold py-4 px-6">
                    Get Started
                  </button>
                </div>
              </div>
            </form>
          </div>
        </section>
      </section>
    </Popup>
  );
};

export default HomePopup;
