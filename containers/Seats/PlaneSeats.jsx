/* eslint-disable @next/next/no-img-element */
import XIcon from "assets/svgs/seats/x.svg";
import EmergrncyIcon from "assets/svgs/seats/emergency.svg";

const PlaneSeats = () => {
  const arr = new Array(22).fill(0);

  return (
    <div className="plane h-auto w-auto overflow-hidden">
      <section className="cabin min-h-[1900px] relative">
        <figure className="h-[1700px] overflow-hidden absolute left-[40%] z-10 -translate-x-[50%]">
          <img
            className="h-full w-[300px]"
            src="/images/cabin.png"
            alt="food"
          />
        </figure>
        <figure className="overflow-hidden absolute top-[1690px] w-[1200px] left-[40%] z-9 -translate-x-[50%]">
          <img className="h-full w-full" src="/images/base.png" alt="food" />
        </figure>
        <section className="cabin__container min-h-[150px] z-20 absolute  top-[250px] left-[23%] -translate-x-[50%">
          <div className="seats">
            <div className="seats__row">
              <div className="seats__item row-title">
                <p>A</p>
              </div>
              <div className="seats__item row-title">
                <p>B</p>
              </div>
              <div className="seats__item seatRow">
                <p>&nbsp;</p>
              </div>
              <div className="seats__item row-title">
                <p>C</p>
              </div>
              <div className="seats__item row-title">
                <p>D</p>
              </div>
            </div>
            <div className="seats__row">
              <div className="seats__item unavailable">
                <XIcon />
              </div>
              <div className="seats__item unavailable"></div>
              <div className="seats__item seatRow">
                <p>1</p>
              </div>
              <div className="seats__item unavailable"></div>
              <div className="seats__item unavailable"></div>
            </div>
            {arr.map((x, index) => {
              return (
                <div className="seats__row">
                  <div className="seats__item">
                    <p>MJ</p>
                  </div>
                  <div className="seats__item"></div>
                  <div className="seats__item seatRow">
                    <p>{index + 2}</p>
                  </div>
                  <div className="seats__item"></div>
                  <div className="seats__item"></div>
                </div>
              );
            })}
          </div>
        </section>
        <section className="cabin__legend absolute z-10 top-[25px] right-5">
          <section className="w-[235px] bg-white rounded-xl ">
            <div className="flex flex-col px-[21px] py-6">
              <h2 className="text-black font-header text-xl mb-8">
                Seat Legend
              </h2>
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
        </section>
      </section>
    </div>
  );
};

export default PlaneSeats;
