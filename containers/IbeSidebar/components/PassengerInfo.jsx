/* eslint-disable @next/next/no-img-element */
import TwoIcon from "assets/svgs/two.svg";
import FlightIcon from "assets/svgs/aero-2.svg";
import BagIcon from "assets/svgs/bag.svg";
import ProfileIcon from "assets/svgs/profile.svg";

const PassengerInfo = () => {
  return (
    <section className="ibe__sidebar__item mb-10">
      <div className="ibe__sidebar__content">
        <div className="flex items-center">
          <figure className="mr-2">
            <TwoIcon />
          </figure>
          <div className="flex flex-col">
            <h4>Passenger Details</h4>
          </div>
        </div>
      </div>
      <div className="ibe__sidebar__box">
        <div className="ibe__sidebar__empty h-[187px]">
          <figure>
            <FlightIcon />
          </figure>
          <p>Please select an outbound flight</p>
        </div>
      </div>
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
        <div className="flex flex-col">
          <div className="ibe__sidebar__row bordered">
            <div className="flex items-center">
              <figure>
                <BagIcon />
              </figure>
              <h6>2 x 10 kg baggage:</h6>
            </div>
            <div>
              <h6> ₦26,501</h6>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PassengerInfo;
