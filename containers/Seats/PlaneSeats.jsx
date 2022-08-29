/* eslint-disable @next/next/no-img-element */
import XIcon from "assets/svgs/seats/x.svg";
import EmergrncyIcon from "assets/svgs/seats/emergency.svg";
import CaretLeft from "assets/svgs/seats/caretleft.svg";
import CaretRight from "assets/svgs/seats/caretright.svg";

const PlaneSeats = () => {
  const arr = new Array(22).fill(0);

  return (
    <div className="plane h-auto w-auto overflow-hidden">
      <section className="cabin xlg:h-[2200px] relative">
        <figure className="cabin__main ">
          <img
            className="h-full w-[300px]"
            src="/images/cabin.png"
            alt="cabin"
          />
        </figure>
        <figure className="cabin__base">
          <img className="h-full w-full" src="/images/base.png" alt="food" />
        </figure>
        <section className="cabin__container ">
          <div className="seats">
            <div className="seats__row">
              <div className="seats__item transparent">
                <CaretLeft />
              </div>
              <div className="seats__item transparent"></div>
              <div className="seats__item seatRow "></div>
              <div className="seats__item transparent"></div>
              <div className="seats__item transparent">
                <CaretRight />
              </div>
            </div>

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
                <div key={index} className="seats__row">
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
        <section className="cabin__legend ">
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
