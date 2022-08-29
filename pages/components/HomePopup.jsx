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
            <form
              class="w-full max-w-lg px-6 py-5 lg:py-20"
              method="POST"
              action="https://greenafrica.us18.list-manage.com/subscribe/post?u=4d7476e759863fa778ec626a2&id=201d65e8c7"
              target="_blank"
            >
              <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <div className="select__wrapper px-5">
                    <p className="text-xs my-2">First Name</p>
                    <input
                      type="text"
                      placeholder=""
                      name="MERGE1"
                      id="MERGE1"
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
                      name="MERGE2"
                      id="MERGE2"
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
                      name="MERGE0"
                      id="MERGE0"
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
                      name="MERGE4"
                      id="MERGE4"
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
                      name="MERGE8"
                      id="MERGE8"
                      className="border-none pl-0 block w-full"
                    >
                      <option value="Nigeria">Nigeria</option>
                    </select>
                  </div>
                </div>
                <div class="w-full md:w-1/2 px-3">
                  <div className="select__wrapper px-5">
                    <p className="text-xs text-uppercase my-2">State</p>
                    <select
                      name="MERGE9"
                      id="MERGE9"
                      className="border-none pl-0 block w-full"
                    >
                      <option value="Lagos">Lagos</option>
                      <option value="Abuja">Abuja</option>
                    </select>
                  </div>
                </div>
              </div>

              <div class="flex flex-wrap -mx-3 mb-2">
                <div class="w-full px-3 mb-6">
                  <label class="block">
                    <input
                      class="mr-2 leading-tight"
                      type="checkbox"
                      name="group[38698][1]"
                      id="group_1"
                    />
                    <span class="text-sm font-light text-primary-main">
                      I agree to join the gFlyer Community by submitting my
                      details.
                    </span>
                  </label>
                </div>
              </div>

              <div class="flex flex-wrap -mx-3 mb-2">
                <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <button
                    type="submit"
                    className="btn btn-primary w-[133px] font-semibold py-4 px-6"
                  >
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
