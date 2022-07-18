/* eslint-disable @next/next/no-img-element */
import XIcon from "assets/svgs/seats/x.svg";
import EmergrncyIcon from "assets/svgs/seats/emergency.svg";

const Seatslegend = () => {
  return (
    <section className="w-full bg-white rounded-xl ">
      <div className="flex flex-col p-[50px]">
        <h2 className="text-black font-header text-xl mb-8">Seat Legend</h2>
        <section className="seats__legend">
          <div className="seats__legend__item">
            <figure>
              <div className="seat-box bg-[#584CB6]"></div>
            </figure>
            <p>
              Extra Legroom Seat - <span>₦2,500</span>
            </p>
          </div>
          <div className="seats__legend__item">
            <figure>
              <div className="seat-box bg-[#ADFFCB]"></div>
            </figure>
            <p>
              First Out Seat - <span>₦2,500</span>
            </p>
          </div>
          <div className="seats__legend__item">
            <figure>
              <div className="seat-box bg-primary-main"></div>
            </figure>
            <p>
              Front Seat - <span>₦2,500</span>
            </p>
          </div>
          <div className="seats__legend__item">
            <figure>
              <div className="seat-box bg-[#777093]"></div>
            </figure>
            <p>
              Standard Seat - <span>₦2,500</span>
            </p>
          </div>
          <div className="seats__legend__item">
            <figure>
              <div className="seat-box bg-[#B9B5D6]"></div>
            </figure>
            <p>
              Extra Legroom Seat - <span>₦2,500</span>
            </p>
          </div>
          <div className="seats__legend__item">
            <figure>
              <div className="seat-box  bg-gray-200">
                <XIcon />
              </div>
            </figure>
            <p>Not Available</p>
          </div>
          <div className="seats__legend__item">
            <figure>
              <div className="seat-box bg-[#292053]">
                <p className="confirmed-p">XX</p>
              </div>
            </figure>
            <p>Confirmed</p>
          </div>
          <div className="seats__legend__item">
            <figure>
              <div className="seat-box bg-[#AADEC8]"></div>
            </figure>
            <p>Current Selection</p>
          </div>
          <div className="seats__legend__item">
            <figure>
              <div className="seat-box bg-white">
                <EmergrncyIcon />
              </div>
            </figure>
            <p>Emergency Exit</p>
          </div>
        </section>
      </div>
    </section>
  );
};

export default Seatslegend;
