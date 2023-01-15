/* eslint-disable @next/next/no-img-element */
import Popup from "components/Popup";
import { Fragment, useEffect, useState } from "react";
import CheckIcon from "assets/svgs/check.svg";
import NullIcon from "assets/svgs/null.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  sessionSelector,
  setSelectedSessionFare,
  setSelectedSessionJourney,
} from "redux/reducers/session";
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
  setSelected,
  showPopUp,
  closePopUp,
  sellKey,
  segmentStd,
  segmentFlightNumber,
  segmentCarrierCode,
  journey,
  schedueIndex,
  setIsVisible,
  segment,
}) => {
  const dispatch = useDispatch();
  const {
    sellFlightLoading,
    flightParams,
    selectedSessionJourney,
    selectedSessionFare,
  } = useSelector(sessionSelector);
  const router = useRouter();

  const [flex, setFlex] = useState(null);
  const [svr, setSvr] = useState(null);
  const [clsc, setClsc] = useState(null);

  const [svrCharge, setSvrCharge] = useState(0);
  const [clscCharge, setClscCharge] = useState(0);
  const [flexCharge, setFlexCharge] = useState(0);

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

  const handleFare = async (fareId) => {
    const latestFare = segment?.Fares.filter(
      (_newFare) => _newFare?.RuleNumber?.toLowerCase() === fareId.toLowerCase()
    );

    if (latestFare.length > 0) {
      if (flightParams?.isRoundTrip === 1) {
        const existingFares = selectedSessionFare
          ? [...selectedSessionFare]
          : [];
        const _cleanedFares = existingFares.filter((_item) => {
          const _ruleBasis =
            parseInt(_item?.schedueIndex) === parseInt(schedueIndex);
          return !_ruleBasis;
        });

        const _newFare = {
          ...latestFare[0],
          sellKey,
          schedueIndex,
        };

        const _newFares = [..._cleanedFares, _newFare];
        dispatch(setSelectedSessionFare([..._newFares]));
      } else {
        dispatch(
          setSelectedSessionFare([
            {
              ...latestFare[0],
              sellKey,
              schedueIndex,
            },
          ])
        );
      }
    }
  };

  const handleSell = async (fareId) => {
    //FareKey is Fare SellKey
    const newSelected = segment.Fares.filter((_item) => {
      return _item.RuleNumber.toLowerCase() === fareId.toLowerCase();
    });
    if (newSelected && newSelected.length > 0) {
      const _selected = newSelected[0];
      setSelected({ ..._selected, sellKey });
      handleFare(fareId);

      if (flightParams?.isRoundTrip === 1) {
        const existingJourneys = selectedSessionJourney
          ? [...selectedSessionJourney]
          : [];
        const _cleanedJourneys = existingJourneys.filter((_item) => {
          const _ruleBasis =
            parseInt(_item?.schedueIndex) === parseInt(schedueIndex);
          return !_ruleBasis;
        });

        const _newJourney = {
          ...journey,
          sellKey,
          segmentStd,
          segmentFlightNumber,
          fareKey: _selected?.FareSellKey,
          schedueIndex,
          FlightDesignator: {
            CarrierCode: journey?.Segments[0]?.FlightDesignator?.CarrierCode,
            FlightNumber: journey?.Segments[0]?.FlightDesignator?.FlightNumber,
          },
          arrivalStation: journey?.Segments[0]?.ArrivalStation,
          departureStation: journey?.Segments[0]?.DepartureStation,
          std: journey?.Segments[0]?.STD,
          RuleNumber: _selected?.RuleNumber,
        };

        const _newJourneys = [..._cleanedJourneys, _newJourney];
        let orderedJourneys = [];

        _newJourneys.map((_item) => {
          if (_item) {
            if (parseInt(_item?.schedueIndex) === 0) {
              orderedJourneys[0] = _item;
            }

            if (parseInt(_item?.schedueIndex) === 1) {
              orderedJourneys[1] = _item;
            }
          }
        });

        dispatch(setSelectedSessionJourney([...orderedJourneys]));
        // document
        //   .getElementById("returnContainer")
        //   .scrollIntoView({ behavior: "smooth" });
        closePopUp();
        setIsVisible(false);
      } else {
        const _selectedJorney = [
          {
            ...journey,
            sellKey,
            segmentStd,
            segmentFlightNumber,
            fareKey: _selected?.FareSellKey,
            schedueIndex,
            FlightDesignator: {
              CarrierCode: journey?.Segments[0]?.FlightDesignator?.CarrierCode,
              FlightNumber:
                journey?.Segments[0]?.FlightDesignator?.FlightNumber,
            },
            arrivalStation: journey?.Segments[0]?.ArrivalStation,
            departureStation: journey?.Segments[0]?.DepartureStation,
            std: journey?.Segments[0]?.STD,
            RuleNumber: _selected?.RuleNumber,
          },
        ];
        dispatch(setSelectedSessionJourney(_selectedJorney));
        router.push("/trip/view");
      }
    }
  };

  useEffect(() => {
    if (segment) {
      const _svr = segment.Fares.find(
        (item) => item?.RuleNumber.toLowerCase() === "savr"
      );
      const _flex = segment.Fares.find(
        (item) => item?.RuleNumber.toLowerCase() === "flex"
      );
      const _clsc = segment.Fares.find(
        (item) => item?.RuleNumber.toLowerCase() === "clsc"
      );

      if (_svr) {
        setSvr(_svr);
        console.log("svr", _svr);
        // const totalSVRCharge =
        //   _svr?.PaxFares[0].ServiceCharges.reduce((accumulator, object) => {
        //     return accumulator + object.Amount;
        //   }, 0) || 0;
        // setSvrCharge(totalSVRCharge);
      }

      if (_clsc) {
        setClsc(_clsc);
        console.log("clsc", _clsc);

        // const totalClscCharge =
        //   _clsc?.PaxFares[0].ServiceCharges.reduce((accumulator, object) => {
        //     return accumulator + object.Amount;
        //   }, 0) || 0;
        // setClscCharge(totalClscCharge);
      }

      if (_flex) {
        setFlex(_flex);
        console.log("flex", _flex);

        // const totalFlexCharge =
        //   flex?.PaxFares[0].ServiceCharges.reduce((accumulator, object) => {
        //     return accumulator + object.Amount;
        //   }, 0) || 0;
        // setFlexCharge(totalFlexCharge);
      }
    }
  }, [segment]);

  const gSvrBtn = (
    <div className="benefits__popup__row__item cta-row">
      <button
        onClick={handleSell.bind(this, "savr")}
        className={`btn ${
          selected?.RuleNumber.toLowerCase() === "savr"
            ? "btn-primary"
            : "btn-outline disabled"
        } w-full !font-bold `}
      >
        {/* {sellFlightLoading
          ? "Loading....."
          : selected?.RuleNumber.toLowerCase() === "savr"
          ? svr
            ? `Continue With gSaver ₦${svr?.AmountDifference?.toLocaleString()}`
            : "Continue With gSaver"
          : "Continue With gSaver"} */}

        {sellFlightLoading
          ? "Loading....."
          : selected?.RuleNumber.toLowerCase() === "savr" && svr
          ? `Continue With gSaver ₦${svr?.AmountDifference?.toLocaleString()}`
          : selected?.RuleNumber.toLowerCase() === "clsc" && svr
          ? `Continue With gClassic ₦${svr?.AdditionalAmount?.toLocaleString()}`
          : selected?.RuleNumber.toLowerCase() === "flex" && svr
          ? `Continue With gFlex ₦${svr?.ExtraAmount?.toLocaleString()}`
          : null}
      </button>
    </div>
  );

  const gClscBtn = (
    <div className="benefits__popup__row__item cta-row">
      <button
        onClick={handleSell.bind(this, "clsc")}
        className={`btn ${
          selected?.RuleNumber.toLowerCase() === "clsc"
            ? "btn-primary"
            : `btn-outline ${
                selected?.RuleNumber.toLowerCase() === "flex" ? "disabled" : ""
              } `
        } w-full !font-bold`}
      >
        {/* {sellFlightLoading
          ? "Loading....."
          : selected?.RuleNumber.toLowerCase() === "flex" ||
            selected?.RuleNumber.toLowerCase() === "savr"
          ? clsc
            ? `+₦${clsc?.AdditionalAmount?.toLocaleString()}/Per Person`
            : "Continue With gClassic"
          : `Continue With gClassic #${clscCharge}`} */}
        {sellFlightLoading
          ? "Loading....."
          : selected?.RuleNumber.toLowerCase() === "savr" && clsc
          ? `Continue With gSaver ₦${clsc?.AmountDifference?.toLocaleString()}`
          : selected?.RuleNumber.toLowerCase() === "clsc" && clsc
          ? `Continue With gClassic ₦${clsc?.AdditionalAmount?.toLocaleString()}`
          : selected?.RuleNumber.toLowerCase() === "flex" && clsc
          ? `Continue With gFlex ₦${clsc?.ExtraAmount?.toLocaleString()}`
          : null}
      </button>
    </div>
  );

  const gFlexBtn = (
    <div className="benefits__popup__row__item cta-row">
      <button
        onClick={handleSell.bind(this, "flex")}
        className={`btn ${
          selected?.RuleNumber.toLowerCase() === "flex"
            ? "btn-primary"
            : `btn-outline`
        } w-full !font-bold `}
      >
        {/* {sellFlightLoading
          ? "Loading....."
          : selected?.RuleNumber.toLowerCase() === "clsc" ||
            selected?.RuleNumber.toLowerCase() === "savr"
          ? flex
            ? `+₦${flex?.AdditionalAmount?.toLocaleString()}/Per Person`
            : "Continue With gFlex"
          : `Continue With gFlex #${flexCharge}`} */}

        {sellFlightLoading
          ? "Loading....."
          : selected?.RuleNumber.toLowerCase() === "savr" && flex
          ? `Continue With gSaver ₦${flex?.AmountDifference?.toLocaleString()}`
          : selected?.RuleNumber.toLowerCase() === "clsc" && flex
          ? `Continue With gClassic ₦${flex?.AdditionalAmount?.toLocaleString()}`
          : selected?.RuleNumber.toLowerCase() === "flex" && flex
          ? `Continue With gFlex ₦${flex?.ExtraAmount?.toLocaleString()}`
          : null}
      </button>
    </div>
  );

  return (
    <Fragment>
      <Popup display={showPopUp} closeModal={closePopUp} top={true}>
        {sellFlightLoading ? (
          <Spin indicator={antIcon} />
        ) : (
          <>
            <section className="w-full bg-white rounded-xl hidden lg:flex flex-col">
              <div className="bg-primary-main text-center flex items-center justify-center p-8 rounded-t-xl">
                <h3 className="text-white text-base">
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
                          : "hover:bg-green hover:bg-opacity-5"
                      } cursor-pointer`}
                    >
                      <h4>&nbsp;</h4>
                      <h3>gSaver</h3>
                    </div>
                    <div
                      className={`benefits__popup__row__item ${
                        selected?.RuleNumber.toLowerCase() === "clsc"
                          ? "bg-green"
                          : "hover:bg-green hover:bg-opacity-5"
                      } cursor-pointer  `}
                    >
                      <h4>We Recommend</h4>
                      <h3>gClassic</h3>
                    </div>
                    <div
                      className={`benefits__popup__row__item ${
                        selected?.RuleNumber.toLowerCase() === "flex"
                          ? "bg-green"
                          : "hover:bg-green hover:bg-opacity-5"
                      } border-b cursor-pointer `}
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
                        <CheckIcon />
                      </figure>
                      <p>&nbsp;</p>
                    </div>
                    <div className="benefits__popup__row__item">
                      <figure>
                        <CheckIcon />
                      </figure>
                      <p>&nbsp;</p>
                    </div>
                    <div className="benefits__popup__row__item border-b">
                      <figure>
                        <CheckIcon />
                      </figure>
                      <p>&nbsp;</p>
                    </div>
                  </div>
                  {/* Free Airport Check-In */}
                  <div className="benefits__popup__row item-center">
                    <div className="benefits__popup__row__item">
                      <h5>Free Airport Check-In</h5>
                    </div>
                    <div className="benefits__popup__row__item">
                      <figure>
                        <NullIcon />
                      </figure>
                      <p>₦2000 fee</p>
                    </div>
                    <div className="benefits__popup__row__item">
                      <figure>
                        <NullIcon />
                      </figure>
                      <p>₦2000 fee</p>
                    </div>
                    <div className="benefits__popup__row__item border-b">
                      <figure>
                        <CheckIcon />
                      </figure>
                      <p>&nbsp;</p>
                    </div>
                  </div>
                  {/* Hand Luggage (Free 7kg) */}
                  <div className="benefits__popup__row item-center">
                    <div className="benefits__popup__row__item">
                      <h5>Hand Luggage (Free 7kg)</h5>
                    </div>
                    <div className="benefits__popup__row__item">
                      <figure>
                        <CheckIcon />
                      </figure>
                      <p>&nbsp;</p>
                    </div>
                    <div className="benefits__popup__row__item">
                      <figure>
                        <CheckIcon />
                      </figure>
                      <p>&nbsp;</p>
                    </div>
                    <div className="benefits__popup__row__item border-b">
                      <figure>
                        <CheckIcon />
                      </figure>
                      <p>&nbsp;</p>
                    </div>
                  </div>
                  {/* Checked Baggage */}
                  <div className="benefits__popup__row item-center">
                    <div className="benefits__popup__row__item">
                      <h5>Checked Baggage</h5>
                    </div>
                    <div className="benefits__popup__row__item">
                      <fdddddigure>
                        <NullIcon />
                      </fdddddigure>
                      <p>₦500/kg</p>
                    </div>
                    <div className="benefits__popup__row__item">
                      <figure>
                        <CheckIcon />
                      </figure>
                      <p>15kg Included </p>
                      <p>(Extra at ₦500/kg)</p>
                    </div>
                    <div className="benefits__popup__row__item border-b">
                      <figure>
                        <CheckIcon />
                      </figure>
                      <p>20kg Included</p>
                      <p>(Extra at ₦500/kg)</p>
                    </div>
                  </div>
                  {/* Seat Selection */}
                  <div className="benefits__popup__row item-center">
                    <div className="benefits__popup__row__item">
                      <h5>Seat Selection</h5>
                    </div>
                    <div className="benefits__popup__row__item">
                      <figure>
                        <NullIcon />
                      </figure>
                      <p>Automatically allocated Pay for preferred seat</p>
                    </div>
                    <div className="benefits__popup__row__item">
                      <figure>
                        <CheckIcon />
                      </figure>
                      <p>Free standard seat Pay for non-standard</p>
                    </div>
                    <div className="benefits__popup__row__item rr">
                      <figure>
                        <CheckIcon />
                      </figure>
                      <p>Free</p>
                    </div>
                  </div>
                  <div className="benefits__popup__row item-center">
                    <div className="benefits__popup__row__item cta-row">
                      <h5>&nbsp;</h5>
                    </div>
                    {gSvrBtn}
                    {gClscBtn}
                    {gFlexBtn}
                  </div>
                </section>
              </section>
            </section>
            <section className="w-full bg-white rounded-xl flex flex-col  lg:hidden p-8">
              <h4 className="text-black font-bold text-xl mb-6">
                Upgrade your fare and enjoy more benefits
              </h4>

              <div className="mobile__benefits__item">
                <p></p>
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
                  onClick={handleSell.bind(this, "savr")}
                  className={`btn btn-primary ${
                    selected?.RuleNumber.toLowerCase() === "savr"
                      ? ""
                      : "disabled"
                  }`}
                >
                  Continue with gSaver
                </button>
              </div>

              <div className="mobile__benefits__item">
                <p>Our Recommendation</p>
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
                  onClick={handleSell.bind(this, "clsc")}
                  className={`btn btn-primary ${
                    selected?.RuleNumber.toLowerCase() === "clsc" ||
                    selected?.RuleNumber.toLowerCase() === "savr"
                      ? ""
                      : "disabled"
                  }`}
                >
                  Continue with gClassic
                </button>
              </div>

              <div className="mobile__benefits__item">
                <p>For Comfort</p>
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
                  onClick={handleSell.bind(this, "flex")}
                  className={`btn btn-primary ${
                    selected?.RuleNumber.toLowerCase() === "flex" ||
                    selected?.RuleNumber.toLowerCase() === "clsc" ||
                    selected?.RuleNumber.toLowerCase() === "savr"
                      ? ""
                      : "disabled"
                  }`}
                >
                  Continue with gFlex
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
  journey: {},
  schedueIndex: "",
  segment: {},
  //  showPopUp={showPopUp},
  //  closePopUp={closePopUp},
};

export default IbeTripPopup;
