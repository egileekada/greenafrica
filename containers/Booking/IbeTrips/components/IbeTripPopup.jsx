/* eslint-disable @next/next/no-img-element */
import Popup from "components/Popup";
import { Fragment, useEffect } from "react";
import CheckIcon from "assets/svgs/check.svg";
import NullIcon from "assets/svgs/null.svg";
import { useDispatch, useSelector } from "react-redux";
import { saveSellRequest, sessionSelector } from "redux/reducers/session";
import { useRouter } from "next/router";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 24,
      color: "white",
    }}
    spin
  />
);

const IbeTripPopup = ({
  selected,
  showPopUp,
  closePopUp,
  sellKey,
  segmentStd,
  segmentFlightNumber,
}) => {
  const dispatch = useDispatch();
  const { sellFlightLoading, sellResponse } = useSelector(sessionSelector);
  const router = useRouter();

  useEffect(() => {
    async function redirectFromSell() {
      if (sellResponse) {
        router.push("/trip/passenger-form");
      }
    }
    redirectFromSell();
  }, [sellResponse]);

  const gSaver = [`7kg hand luggage: 55 x40 x 24cm`];

  const gClassic = [
    `7kg hand luggage: 55 x40 x 24cm`,
    `15 kg checked package`,
    `Free Standard Seat`,
  ];

  const gFlex = [
    `7kg hand luggage: 55 x40 x 24cm`,
    `15 kg checked package`,
    `Free Standard Seat`,
  ];

  const handleSell = async () => {
    dispatch(
      saveSellRequest({
        sellKey,
        segmentStd,
        segmentFlightNumber,
        fareKey: selected?.FareSellKey,
      })
    );
  };

  return (
    <Fragment>
      <Popup display={showPopUp} closeModal={closePopUp} top={true}>
        {sellFlightLoading ? (
          <Spin indicator={antIcon} />
        ) : (
          <>
            <section className="w-full bg-white rounded-xl hidden lg:flex flex-col">
              <div className="bg-primary-main text-center flex items-center justify-center p-8 rounded-t-xl">
                <h3 className="text-white">
                  Upgrade your fare and enjoy more benefits{" "}
                </h3>
              </div>
              <section>
                <section className="benefits__popup">
                  <div className="benefits__popup__row item-center">
                    <div className="benefits__popup__row__item"></div>
                    <div
                      className={`benefits__popup__row__item ${
                        selected?.RuleNumber.toLowerCase() === "savr"
                          ? "bg-green"
                          : ""
                      } `}
                    >
                      <h4>You selected:</h4>
                      <h3>gSaver</h3>
                    </div>
                    <div
                      className={`benefits__popup__row__item ${
                        selected?.RuleNumber.toLowerCase() === "clsc"
                          ? "bg-green"
                          : ""
                      } `}
                    >
                      <h4>Your Recommendation</h4>
                      <h3>gClassic</h3>
                    </div>
                    <div
                      className={`benefits__popup__row__item ${
                        selected?.RuleNumber.toLowerCase() === "flex"
                          ? "bg-green"
                          : ""
                      } border-b`}
                    >
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
                        onClick={handleSell}
                        className={`btn ${
                          selected?.RuleNumber.toLowerCase() === "savr"
                            ? "btn-primary"
                            : "btn-outlined disabled"
                        } w-full `}
                      >
                        {sellFlightLoading ? "Loading....." : "Continue"}
                      </button>
                    </div>
                    <div className="benefits__popup__row__item cta-row">
                      <button
                        onClick={handleSell}
                        className={`btn ${
                          selected?.RuleNumber.toLowerCase() === "clsc"
                            ? "btn-primary"
                            : "btn-outline disabled"
                        } w-full `}
                      >
                        {sellFlightLoading ? "Loading....." : "Continue"}
                      </button>
                    </div>
                    <div className="benefits__popup__row__item cta-row">
                      <button
                        onClick={handleSell}
                        className={`btn ${
                          selected?.RuleNumber.toLowerCase() === "flex"
                            ? "btn-primary"
                            : "btn-outline disabled"
                        } w-full `}
                      >
                        {sellFlightLoading ? "Loading....." : "Continue"}
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
                <button
                  onClick={handleSell}
                  className={`btn btn-primary ${
                    selected?.RuleNumber.toLowerCase() === "clsc"
                      ? ""
                      : "disabled"
                  }`}
                >
                  Continue With gClassic
                </button>
              </div>
              <div className="mobile__benefits__item">
                <p>Our Recommendation</p>
                <h5>gSaver</h5>
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
                <button
                  onClick={handleSell}
                  className={`btn btn-primary ${
                    selected?.RuleNumber.toLowerCase() === "savr"
                      ? ""
                      : "disabled"
                  }`}
                >
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
                <button
                  onClick={handleSell}
                  className={`btn btn-primary ${
                    selected?.RuleNumber.toLowerCase() === "flex"
                      ? ""
                      : "disabled"
                  }`}
                >
                  Continue With gFlex
                </button>
              </div>
            </section>
          </>
        )}
      </Popup>
    </Fragment>
  );
};

IbeTripPopup.defaultProps = {
  selected: {},
  sellKey: "",
  segmentStd: "",
  segmentFlightNumber: "",
  //  showPopUp={showPopUp},
  //  closePopUp={closePopUp},
};

export default IbeTripPopup;
