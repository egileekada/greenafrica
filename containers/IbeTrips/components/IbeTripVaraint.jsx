/* eslint-disable @next/next/no-img-element */
import BriefcaseIcon from "assets/svgs/briefcase.svg";
import PackageIcon from "assets/svgs/package.svg";
import SeatIcon from "assets/svgs/seat.svg";

import Popup from "components/Popup";
import { Fragment, useState } from "react";

import CheckIcon from "assets/svgs/check.svg";
import NullIcon from "assets/svgs/null.svg";

const IbeTripVariant = ({ variant }) => {
  const [showPopUp, setShow] = useState(false);

  const gSaver = [
    `Online Check-In`,
    `Free Hand Luggage
      (7KG)`,
  ];

  const gClassic = [
    `Online Check-In`,
    `Checked Baggage :15kg. Extra N500/KG`,
    `Free Standard Seat (Pay for Non Standard)`,
    `Free Hand Luggage (7KG)`,
  ];

  const gFlex = [
    `Online Check-In`,
    `Checked Baggage :15kg. Extra N500/KG`,
    `Free Standard Seat (Pay for Non Standard)`,
    `Free Hand Luggage (7KG)`,
  ];

  return (
    <Fragment>
      <section className={`ibe__trip__variant ${variant}`}>
        <div className="flex flex-col">
          <div className="type-header">
            <h2 className="text-center font-display font-extrabold text-xl text-white">
              gSaver
            </h2>
            <p className="text-white font-medium text-xs text-center">
              Recommended For You
            </p>
          </div>
          <ul className="mt-7 mb-10 px-8">
            <li className="flex items-center mb-6">
              <figure className="w-[44px] h-[44px] bg-transparent rounded-full flex items-center justify-center">
                <BriefcaseIcon />
              </figure>
              <p className="text-black font-medium text-sm ml-4">
                7kg hand luggage: 55 x40 x 24cm
              </p>
            </li>
            <li className="flex items-center mb-6">
              <figure className="w-[44px] h-[44px] bg-transparent  rounded-full flex items-center justify-center">
                <PackageIcon />
              </figure>
              <p className="text-black font-medium text-sm ml-4">
                15 kg checked package
              </p>
            </li>
            <li className="flex items-center">
              <figure className="w-[44px] h-[44px] bg-transparent  rounded-full flex items-center justify-center">
                <SeatIcon />
              </figure>
              <p className="text-black font-medium text-sm ml-4">
                Free Standard Seat
              </p>
            </li>
          </ul>
        </div>
        <div className="px-3 lg:px-[14px]">
          {variant === "saver" && (
            <button
              onClick={() => setShow(true)}
              className="btn btn-primary w-full"
            >
              ₦15,500
            </button>
          )}
          {variant === "classic" && (
            <button
              onClick={() => setShow(true)}
              className="btn btn-primary  w-full"
            >
              ₦30,000
            </button>
          )}
          {variant === "gflex" && (
            <button
              onClick={() => setShow(true)}
              className="btn btn-primary  w-full"
            >
              ₦40,000
            </button>
          )}
        </div>
      </section>
      <Popup display={showPopUp} closeModal={() => setShow(false)} top={true}>
        <section className="w-full bg-white rounded-xl hidden lg:flex flex-col">
          <div className="bg-primary-main text-center flex items-center justify-center p-8 rounded-t-xl">
            <h3 className="text-white">
              Upgrade your fare and enjoy more benefits
            </h3>
          </div>
          <section>
            <section className="benefits__popup">
              <div className="benefits__popup__row item-center">
                <div className="benefits__popup__row__item"></div>
                <div className="benefits__popup__row__item bg-green">
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
                <div className="benefits__popup__row__item rr">
                  <figure>
                    <CheckIcon />
                  </figure>
                  <p>&nbsp;</p>
                </div>
              </div>
              <div className="benefits__popup__row item-center">
                <div className="benefits__popup__row__item cta-row">
                  <h5>&nbsp;</h5>
                </div>
                <div className="benefits__popup__row__item cta-row">
                  <button
                    onClick={() => setShow(false)}
                    className="btn btn-primary"
                  >
                    +N50,000 / Per Person
                  </button>
                </div>
                <div className="benefits__popup__row__item cta-row">
                  <button
                    onClick={() => setShow(false)}
                    className="btn btn-outline"
                  >
                    +N50,000 / Per Person
                  </button>
                </div>
                <div className="benefits__popup__row__item cta-row">
                  <button
                    onClick={() => setShow(false)}
                    className="btn btn-outline"
                  >
                    +N50,000 / Per Person
                  </button>
                </div>
              </div>
            </section>
          </section>
        </section>
        <section className="w-full bg-white rounded-xl flex flex-col  lg:hidden p-8">
          <div className="mobile__benefits__item">
            <h4>Upgrade your fare and enjoy more benefits</h4>
            <p>You selected:</p>
            <h5>gClassic</h5>
            <ul>
              {gClassic.map((_gClassic, _i) => {
                return (
                  <li key={_i} className="flex items-center mb-5">
                    <figure>
                      <CheckIcon />
                    </figure>
                    <span>{_gClassic}</span>
                  </li>
                );
              })}
            </ul>
            <button onClick={() => setShow(false)} className="btn btn-primary">
              Continue With gSaver
            </button>
          </div>
          <div className="mobile__benefits__item">
            <p>Our Recommendation</p>
            <h5>gClassic</h5>
            <ul>
              {gSaver.map((_gSaver, _i) => {
                return (
                  <li key={_i} className="flex items-center mb-5">
                    <figure>
                      <CheckIcon />
                    </figure>
                    <span>{_gSaver}</span>
                  </li>
                );
              })}
            </ul>
            <button onClick={() => setShow(false)} className="btn btn-primary">
              Continue With gSaver
            </button>
          </div>
          <div className="mobile__benefits__item">
            <p>Our Recommendation</p>
            <h5>gFlex</h5>
            <ul>
              {gFlex.map((_gFlex, _i) => {
                return (
                  <li key={_i} className="flex items-center mb-5">
                    <figure>
                      <CheckIcon />
                    </figure>
                    <span>{_gFlex}</span>
                  </li>
                );
              })}
            </ul>
            <button onClick={() => setShow(false)} className="btn btn-primary">
              Continue With gSaver
            </button>
          </div>
        </section>
      </Popup>
    </Fragment>
  );
};

IbeTripVariant.defaultProps = {
  variant: "",
};

export default IbeTripVariant;
