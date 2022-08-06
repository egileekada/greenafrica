/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import ThreeIcon from "assets/svgs/three.svg";
import ProfileIcon from "assets/svgs/profile.svg";
import CaretLeft from "assets/svgs/sidebar/caretleft.svg";

const SeatInfo = () => {
  const [showContent, setShow] = useState(false);

  return (
    <section className="ibe__sidebar__item mb-10">
      <button
        className="ibe-accordion-header"
        onClick={() => setShow(!showContent)}
      >
        <div className="flex items-center">
          <figure className="mr-2">
            <ThreeIcon />
          </figure>
          <div className="flex flex-col">
            <h4>Seat Selection</h4>
          </div>
          <figure
            className={`ml-auto transform ${showContent ? "rotate-90" : ""}`}
          >
            <CaretLeft />
          </figure>
        </div>
      </button>

      {showContent && (
        <div className="ibe__sidebar__box">
          <div className="flex mb-6">
            <div className="flex flex-col w-[53px] mr-4">
              <div className="bg-purple-light h-[50px] rounded-t-[3px] flex justify-center items-center">
                <ProfileIcon />
              </div>
            </div>
            <div className="flex flex-col">
              <h5 className="text-sm font-extrabold text-primary-main font-display mb-2">
                Michael Johnson
              </h5>
              <h6 className="text-[12px] font-normal text-[#9692B8] font-title">
                Seat Number: 2A
              </h6>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default SeatInfo;
