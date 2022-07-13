/* eslint-disable @next/next/no-img-element */
import BriefcaseIcon from "assets/svgs/briefcase.svg";
import PackageIcon from "assets/svgs/package.svg";
import SeatIcon from "assets/svgs/seat.svg";

import Popup from "components/Popup";
import { Fragment, useState } from "react";

import CheckIcon from "assets/svgs/check.svg";
import NullIcon from "assets/svgs/null.svg";

const IbeTripVariant = ({ variant }) => {
  const [showPopUp, setShow] = useState(true);

  return (
    <Fragment>
      <section className={`ibe__trip__variant ${variant}`}>
        <div className="flex flex-col">
          <div className="fle flex-col items-center">
            <h2 className="text-center font-display font-extrabold text-xl text-primary-main">
              gSaver
            </h2>
            <p className="text-black font-medium text-xs text-center">
              Recommended For You
            </p>
          </div>
          <ul className="mt-7 mb-10">
            <li className="flex items-center mb-6">
              <figure className="w-[44px] h-[44px] bg-primary-main rounded-full flex items-center justify-center">
                <BriefcaseIcon />
              </figure>
              <p className="text-black font-medium text-sm ml-4">
                7kg hand luggage: 55 x40 x 24cm
              </p>
            </li>
            <li className="flex items-center mb-6">
              <figure className="w-[44px] h-[44px] bg-primary-main  rounded-full flex items-center justify-center">
                <PackageIcon />
              </figure>
              <p className="text-black font-medium text-sm ml-4">
                15 kg checked package
              </p>
            </li>
            <li className="flex items-center">
              <figure className="w-[44px] h-[44px] bg-primary-main  rounded-full flex items-center justify-center">
                <SeatIcon />
              </figure>
              <p className="text-black font-medium text-sm ml-4">
                Free Standard Seat
              </p>
            </li>
          </ul>
        </div>
        {variant === "saver" && (
          <button className="btn btn-outline ">Continue For ₦16,501</button>
        )}
        {variant === "classic" && (
          <button className="btn btn-primary">Continue For ₦16,501</button>
        )}
        {variant === "gflex" && (
          <button className="btn btn-green">Continue For ₦16,501</button>
        )}
      </section>
      <Popup display={showPopUp} closeModal={() => setShow(false)} top={true}>
        <section className="w-full bg-white rounded-xl ">
          <div className="bg-primary-main text-center flex items-center justify-center p-8 rounded-t-xl">
            <h3 className="text-white">
              Upgrade your fare and enjoy more benefits
            </h3>
          </div>
          <section>
            <section className="benefits__popup">
              <div className="benefits__popup__row item-center">
                <div className="benefits__popup__row__item"></div>
                <div className="benefits__popup__row__item">
                  <h4>You selected:</h4>
                  <h3>gSaver</h3>
                </div>
                <div className="benefits__popup__row__item">
                  <h4>Your Recommendation</h4>
                  <h3>gClassic</h3>
                </div>
                <div className="benefits__popup__row__item border-b">
                  <h4>For max comfort</h4>
                  <h3>gFlex</h3>
                </div>
              </div>
              <div className="benefits__popup__row item-center">
                <div className="benefits__popup__row__item">
                  <h5>Online Check-In</h5>
                </div>
                <div className="benefits__popup__row__item">
                  <figure>
                    <NullIcon />
                  </figure>
                  <p>You selected:</p>
                </div>
                <div className="benefits__popup__row__item">
                  <figure>
                    <CheckIcon />
                  </figure>
                  <p>You selected:</p>
                </div>
                <div className="benefits__popup__row__item border-b">
                  <figure>
                    <CheckIcon />
                  </figure>
                  <p>Free</p>
                </div>
              </div>
              <div className="benefits__popup__row item-center">
                <div className="benefits__popup__row__item">
                  <h5>Free Airport Check-In</h5>
                </div>
                <div className="benefits__popup__row__item">
                  <figure>
                    <NullIcon />
                  </figure>
                  <p>You selected:</p>
                </div>
                <div className="benefits__popup__row__item">
                  <figure>
                    <CheckIcon />
                  </figure>
                  <p>You selected:</p>
                </div>
                <div className="benefits__popup__row__item border-b">
                  <figure>
                    <CheckIcon />
                  </figure>
                  <p>&nbsp;</p>
                </div>
              </div>
              <div className="benefits__popup__row item-center">
                <div className="benefits__popup__row__item">
                  <h5>Hand Luggage (Free 7kg)</h5>
                </div>
                <div className="benefits__popup__row__item">
                  <figure>
                    <NullIcon />
                  </figure>
                  <p>You selected:</p>
                </div>
                <div className="benefits__popup__row__item">
                  <figure>
                    <CheckIcon />
                  </figure>
                  <p>You selected:</p>
                </div>
                <div className="benefits__popup__row__item border-b">
                  <figure>
                    <CheckIcon />
                  </figure>
                  <p>&nbsp;</p>
                </div>
              </div>
              <div className="benefits__popup__row item-center">
                <div className="benefits__popup__row__item">
                  <h5>Checked Baggage</h5>
                </div>
                <div className="benefits__popup__row__item">
                  <figure>
                    <NullIcon />
                  </figure>
                  <p>You selected:</p>
                </div>
                <div className="benefits__popup__row__item">
                  <figure>
                    <CheckIcon />
                  </figure>
                  <p>You selected:</p>
                </div>
                <div className="benefits__popup__row__item border-b">
                  <figure>
                    <CheckIcon />
                  </figure>
                  <p>&nbsp;</p>
                </div>
              </div>
              <div className="benefits__popup__row item-center">
                <div className="benefits__popup__row__item">
                  <h5>Seat Selection</h5>
                </div>
                <div className="benefits__popup__row__item">
                  <figure>
                    <NullIcon />
                  </figure>
                  <p>You selected:</p>
                </div>
                <div className="benefits__popup__row__item">
                  <figure>
                    <CheckIcon />
                  </figure>
                  <p>You selected:</p>
                </div>
                <div className="benefits__popup__row__item ">
                  <figure>
                    <CheckIcon />
                  </figure>
                  <p>&nbsp;</p>
                </div>
              </div>
            </section>
          </section>
        </section>
      </Popup>
    </Fragment>
  );
};

IbeTripVariant.defaultProps = {
  variant: "",
};

export default IbeTripVariant;
