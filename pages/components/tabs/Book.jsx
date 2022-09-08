import React, { useState, useEffect, useRef } from "react";
import CloseIcon from "assets/svgs/white-close.svg";
import Back from "assets/svgs/icon-back-small.svg";
import PromoIcon from "assets/svgs/promo.svg";
import { useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import Select, { components } from "react-select";
import { format, add } from "date-fns";
import DatePicker from "react-date-picker/dist/entry.nostyle";
import { getWidgetData } from "../../../services";
import "react-calendar/dist/Calendar.css";
import "react-date-picker/dist/DatePicker.css";
import { lowfare } from "../../../utils/calendar";
import useDeviceSize from "hooks/useWindowSize";

const validationSchema = Yup.object().shape({
  destination: Yup.object().required("Required"),
  origin: Yup.object().required("Required"),
});

const BookingTab = ({ type, promocode: code, fromTo, setFromTo }) => {
  const [width] = useDeviceSize();
  const [showModal, setShowModal] = useState(false);
  const { data } = useQuery(["destination"], getWidgetData);
  // const [departing, setDeparting] = useState(add(new Date(), { weeks: 1 }));
  const [arrivals, setArrivals] = useState([]);
  const [passengers, setPassengers] = useState(0);
  const [promocode, setPromocode] = useState(code);
  const [showPromo, setShowPromo] = useState(false);
  const [saveStatus, setSaveStatus] = useState(false);
  const [infant, setInfant] = useState(0);
  const [adult, setAdult] = useState(1);
  const [child, setChild] = useState(0);
  const [show, setShow] = useState(false);

  const originSelect = useRef(null);
  const destinationSelect = useRef(null);

  const promo = useRef(null);

  const saveVal = () => {
    if (promocode !== null && promocode.length > 1) {
      setSaveStatus(true);
    }
  };

  const clear = () => {
    setSaveStatus(false);
    promo.current.value = null;
    setPromocode(null);
  };
  const colourStyles = {
    control: (styles, { isFocused, isSelected }) => ({
      ...styles,
      borderWidth: "0px",
      minHeight: "auto",
      boxShadow: "0px",
      border: "0px",
      boxShadow: "none",
    }),
    container: (styles) => ({
      ...styles,
      position: "initial",
    }),
    valueContainer: (styles) => ({
      ...styles,
      padding: "0px",
    }),
    dropdownIndicator: (styles) => ({ ...styles, padding: "0px" }),
    indicatorSeparator: (styles) => ({ ...styles, display: "none" }),
    placeholder: (styles) => ({ ...styles, marginLeft: "0px" }),
    input: (styles, { isFocused, isSelected }) => ({
      ...styles,
      margin: "0px",
      outline: isSelected && "0px",
      border: isSelected && "5px solid green",
      boxShadow: "none !important",
      fontSize: "16px",
      "& input": {
        "&:focus": {
          boxShadow: "none",
        },
      },
    }),
    menu: (styles) => ({
      ...styles,
      position: "absolute",
      width: "100%",
      left: "0",
    }),
    option: (styles, { isFocused, isSelected }) => ({
      ...styles,
      backgroundColor: isSelected && "#EAEBF3",
      color: isSelected && "#000",
    }),
  };

  function hasContent({ date }) {
    for (const key in lowfare) {
      if (key === format(date, "yyyy-MM-dd")) {
        return (
          <p className="text-[10px] font-light leading-tight my-1 text-[#9E9BBF]">
            ₦{Math.round(lowfare[key])}K
          </p>
        );
      }
    }
    return <p></p>;
  }

  const onClick = () => {
    const aTemp = formik.values.origin;
    const bTemp = formik.values.destination;
    formik.setFieldValue("origin", bTemp); // swap a
    formik.setFieldValue("destination", aTemp); // swap b
  };

  const updateInfant = (value) => {
    if (infant >= 0) {
      setInfant(infant + value);
    }
  };

  const updateAdult = (value) => {
    if (adult >= 0) {
      setAdult(Math.min(adult + value, 9));
    }

    if (infant > 0) {
    }
  };

  const decreaseAdult = (value) => {
    if (adult >= 0) {
      setAdult(Math.min(adult + value, 9));
    }

    if (infant == adult) {
      setInfant(Math.min(infant + value, 9));
    }
  };

  const updateChild = (value) => {
    if (child >= 0) {
      setChild(Math.min(child + value, 9));
    }
  };

  const formatOptionLabel = ({ value, cityName, code }) => (
    <div className="flex items-center">
      <div>
        <p className="font-bold mb-0">
          {cityName} ({value})
        </p>
      </div>
    </div>
  );

  const Option = (props) => {
    return (
      <components.Option {...props}>
        <div className="flex items-center">
          <div>
            <p className="font-bold text-base mb-0">{props.data.cityName}</p>
            <p className="small mb-0">{props.data.country}</p>
          </div>
          <div className="text-green bg-primary-main p-1 rounded-lg text-center w-20 ml-auto">
            {props.data.value}
          </div>
        </div>
      </components.Option>
    );
  };

  useEffect(() => {
    setPassengers(child + adult);
  }, [adult, infant, child]);

  const formik = useFormik({
    initialValues: {
      origin: fromTo.from,
      destination: fromTo.to,
      departure: add(new Date(), { weeks: 1 }),
      return: add(new Date(), { days: 10 }),
      promocode,
    },
    validationSchema,
    onSubmit: async (values) => {
      formik.setSubmitting(true);

      const appendPromo = (promocode) => {
        if (promocode !== null) {
          return `&promocode=${promocode}`;
        }
        return "";
      };

      const appendReturn = (returnDate) => {
        if (type === "round_trip") {
          return `&return=${format(
            new Date(returnDate),
            "yyyy-MM-dd"
          )}&round=1`;
        }
        return "";
      };

      let test = `?origin=${values.origin.value}&destination=${
        values.destination.value
      }&departure=${format(
        new Date(values.departure),
        "yyyy-MM-dd"
      )}${appendReturn(
        values.return
      )}&adt=${adult}&chd=${child}&inf=${infant}${appendPromo(promocode)}`;

      window.location.replace(`https://dev-ibe.gadevenv.com${test}`);
    },
  });
  //TODO - come back to this guy
  // useEffect(() => {
  //   console.log("I just got triggered");

  //   // return () => {
  //   //   second
  //   // }
  // }, [formik.values.origin]);

  const forcusOrigin = (value) => {
    value.current.focus();
  };

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-flex-col xl:grid-cols-4 sm:grid-flex-col items-center gap-2">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:col-span-2">
            <div
              className={`${
                formik.touched.origin && formik.errors.origin
                  ? "border border-[#de0150]"
                  : ""
              } flex items-end booking__wrapper `}
              onClick={() => {
                if (width < 769) {
                  setShowModal(true);
                }
              }}
            >
              <img
                src="/images/widget_from.svg"
                alt=""
                className="mx-2 pb-2 hidden md:block"
                onClick={() => forcusOrigin(originSelect)}
                role="button"
              />
              <div
                onClick={() => {
                  if (width < 769) {
                    setShowModal(true);
                  }
                }}
                className="w-full mx-2 px-2 md:px-0"
              >
                <p className="mb-0 text-xs text-[#979797]">FROM</p>
                {width > 769 ? (
                  <Select
                    ref={originSelect}
                    openMenuOnFocus={true}
                    id="from"
                    instanceId="from"
                    placeholder="Origin"
                    formatOptionLabel={formatOptionLabel}
                    components={{ Option }}
                    name="origin"
                    defaultValue={formik.values.origin}
                    value={formik.values.origin}
                    onChange={(value) => (
                      formik.setFieldValue("origin", value),
                      formik.setFieldValue("destination", " "),
                      setArrivals(value.arrivals),
                      setFromTo({ ...fromTo, from: value, to: " " })
                    )}
                    options={data?.data?.values}
                    className="border-0"
                    styles={colourStyles}
                  />
                ) : (
                  <p className="h-10 flex justify-start items-center text-base font-medium text-primary-main">
                    {formik.values.origin}
                  </p>
                )}
              </div>
              <img
                onClick={() => onClick()}
                role="button"
                src="/images/to_from.svg"
                alt=""
                className="absolute right-6 -bottom-6 transform rotate-90 lg:rotate-0 lg:-right-6 lg:bottom-2.5 z-10"
              />
            </div>

            <div
              className={`${
                formik.touched.destination && formik.errors.destination
                  ? "border border-[#de0150]"
                  : ""
              } flex items-end booking__wrapper`}
              onClick={() => {
                if (width < 769) {
                  setShowModal(true);
                }
              }}
            >
              <img
                src="/images/widget_to.svg"
                alt=""
                className="hidden md:block mx-2 pb-2 cursor-pointer"
                role="button"
                onClick={() => forcusOrigin(destinationSelect)}
              />
              <div className="w-full mx-2 px-2 md:px-0">
                <p className="mb-0 text-xs text-[#979797]">TO</p>
                {width > 769 ? (
                  <Select
                    ref={destinationSelect}
                    openMenuOnFocus={true}
                    id="destination"
                    instanceId="destination"
                    placeholder="Destination"
                    formatOptionLabel={formatOptionLabel}
                    components={{ Option }}
                    options={arrivals}
                    className="border-0 invalid:border-pink-500 invalid:text-pink-600"
                    styles={colourStyles}
                    name="destination"
                    defaultValue={formik.values.destination}
                    value={formik.values.destination}
                    onChange={(value) => {
                      formik.setFieldValue("destination", value);
                      setFromTo({ ...fromTo, to: value });
                    }}
                    noOptionsMessage={() => "Kindly choose an origin"}
                  />
                ) : (
                  <p className="h-10 flex justify-start items-center text-base font-medium text-primary-main">
                    {formik.values.destination}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div
            className={`${
              type && "lg:grid-cols-2 md:col-span-2"
            } grid grid-cols-1 gap-2 md:col-auto`}
          >
            <div
              onClick={() => {
                if (width < 769) {
                  setShowModal(true);
                }
              }}
              className="booking__wrapper flex items-end"
            >
              <span className="mr-2 ml-1 pb-1 hidden md:block">
                <svg
                  width="26"
                  height="22"
                  viewBox="0 0 26 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M25.9158 4.7268V19.9868C25.9158 21.0986 25.0132 21.9991 23.9025 21.9991L12.9579 21.9989H2.01339C0.90152 21.9989 8.39233e-05 21.0984 8.39233e-05 19.9865V4.72656L25.9158 4.7268ZM19.2175 17.2344H22.1969V14.2538H19.2163V17.2344H19.2175ZM19.2175 11.6596H22.1969V8.67902H19.2163V11.6596H19.2175ZM14.0504 17.2344H17.031V14.2538H14.0504V17.2344ZM14.0504 11.6596H17.031V8.67902H14.0504V11.6596ZM8.88441 17.2344H11.865V14.2538H8.88441V17.2344ZM8.88441 11.6596H11.865V8.67902H8.88441V11.6596ZM3.71845 17.2344H6.69903V14.2538H3.71845V17.2344ZM3.71845 11.6596H6.69903V8.67902H3.71845V11.6596Z"
                    fill="#261F5E"
                  />
                  <path
                    d="M8.39233e-05 3.66582V2.01233C8.39233e-05 0.900466 0.902674 0 2.01339 0L23.9025 0.000237024C25.0143 0.000237024 25.9158 0.900703 25.9158 2.01257V3.66581L8.39233e-05 3.66582Z"
                    fill="#261F5E"
                  />
                </svg>
              </span>
              <div className="flex-auto px-4 md:px-0">
                <p className="mb-1 text-xs text-[#979797]">DEPARTING</p>
                {width > 769 ? (
                  <DatePicker
                    id="departure"
                    clearIcon={null}
                    calendarIcon={null}
                    tileContent={hasContent}
                    format={"d/M/y"}
                    name="departure"
                    onChange={(value) =>
                      formik.setFieldValue("departure", value)
                    }
                    value={formik.values.departure}
                    onKeyDown={(e) => e.preventDefault()}
                    minDate={new Date()}
                  />
                ) : (
                  <p className="h-10 flex justify-start items-center text-base font-medium text-primary-main">
                    {`
											${format(formik.values.departure, "dd/mm/yyyy")}
											`}
                  </p>
                )}
              </div>
            </div>

            {type && (
              <div
                onClick={() => {
                  if (width < 769) {
                    setShowModal(true);
                  }
                }}
                className="booking__wrapper flex items-end"
              >
                <span className="mr-2 ml-1 pb-1 hidden md:block">
                  <svg
                    width="26"
                    height="22"
                    viewBox="0 0 26 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M25.9158 4.7268V19.9868C25.9158 21.0986 25.0132 21.9991 23.9025 21.9991L12.9579 21.9989H2.01339C0.90152 21.9989 8.39233e-05 21.0984 8.39233e-05 19.9865V4.72656L25.9158 4.7268ZM19.2175 17.2344H22.1969V14.2538H19.2163V17.2344H19.2175ZM19.2175 11.6596H22.1969V8.67902H19.2163V11.6596H19.2175ZM14.0504 17.2344H17.031V14.2538H14.0504V17.2344ZM14.0504 11.6596H17.031V8.67902H14.0504V11.6596ZM8.88441 17.2344H11.865V14.2538H8.88441V17.2344ZM8.88441 11.6596H11.865V8.67902H8.88441V11.6596ZM3.71845 17.2344H6.69903V14.2538H3.71845V17.2344ZM3.71845 11.6596H6.69903V8.67902H3.71845V11.6596Z"
                      fill="#261F5E"
                    />
                    <path
                      d="M8.39233e-05 3.66582V2.01233C8.39233e-05 0.900466 0.902674 0 2.01339 0L23.9025 0.000237024C25.0143 0.000237024 25.9158 0.900703 25.9158 2.01257V3.66581L8.39233e-05 3.66582Z"
                      fill="#261F5E"
                    />
                  </svg>
                </span>

                <div className="flex-auto px-4 md:px-0">
                  <p className="mb-1 text-xs text-[#979797]">RETURNING</p>
                  {width > 769 ? (
                    <DatePicker
                      id="return"
                      clearIcon={null}
                      calendarIcon={null}
                      tileContent={hasContent}
                      className="datepicker border-0 w-full font-body"
                      minDate={new Date()}
                      name="return"
                      format={"d/M/y"}
                      onChange={(value) =>
                        formik.setFieldValue("return", value)
                      }
                      value={formik.values.return}
                      onKeyDown={(e) => e.preventDefault()}
                    />
                  ) : (
                    <p className="h-10 flex justify-start items-center text-base font-medium text-primary-main">
                      {`
											${format(formik.values.return, "dd/mm/yyyy")}
											`}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <div
              className="booking__wrapper flex-auto relative"
              data-modal-toggle="defaultModal"
            >
              <div
                onClick={() => {
                  if (width < 769) {
                    setShowModal(true);
                  }
                }}
                className="px-4 md:px-0"
              >
                <p className="mb-1 text-xs md:mx-4 text-[#979797]">
                  PASSENGERS
                </p>
                <div
                  className="flex items-center relative"
                  onClick={() =>
                    width > 769 ? setShow(!show) : setShowModal(true)
                  }
                  role="button"
                >
                  <span className="ml-4 mr-0 pb-1 hidden md:block">
                    <svg
                      width="18"
                      height="17"
                      viewBox="0 0 18 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 0.5C7.63608 0.5 6.32799 0.991931 5.36341 1.86753C4.39898 2.74327 3.85714 3.93087 3.85714 5.16917C3.85714 6.40747 4.39898 7.59508 5.36341 8.47081C6.32799 9.34642 7.63608 9.83835 9 9.83835C10.3639 9.83835 11.672 9.34642 12.6366 8.47081C13.601 7.59508 14.1429 6.40747 14.1429 5.16917C14.1429 3.93087 13.601 2.74327 12.6366 1.86753C11.672 0.991931 10.3639 0.5 9 0.5ZM4.83649 9.60255C1.96343 10.9672 0 13.6944 0 16.8421H18C18 13.6943 16.0366 10.967 13.1635 9.60255C12.0394 10.4748 10.5855 11.0058 9 11.0058C7.41453 11.0058 5.96064 10.4748 4.83649 9.60255Z"
                        fill="#261F5E"
                      />
                    </svg>
                  </span>

                  <div className="w-1/6 text-center">
                    <span>{passengers}</span>
                  </div>

                  <div>
                    <svg
                      width="25"
                      height="24"
                      viewBox="0 0 19 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.70135 7.84741L9.42857 10.3341L12.1558 7.84741"
                        stroke="#261F5E"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
                <div
                  className={`${
                    !show && "hidden"
                  } bg-gray-900 bg-opacity-0 dark:bg-opacity-80 fixed inset-0 z-40`}
                  onClick={() => setShow(false)}
                ></div>

                <div
                  id="defaultModal"
                  className="absolute top-20 left-0 right-0 z-50 w-full h-modal h-auto w-[250px]"
                >
                  <div
                    className={`${
                      !show && "hidden"
                    } relative w-full h-full max-w-lg md:h-auto widget-border rounded-lg shadow dark:bg-gray-700 bg-white`}
                  >
                    <div className="relative">
                      <div className="p-4 space-y-6">
                        <div className="grid grid-cols-2 mb-3">
                          <div className="">
                            <p className="text-base mb-1">Adults</p>
                            <p className="mb-0 text-xs text-grey-nine">
                              12 + years
                            </p>
                          </div>
                          <div className="flex items-center">
                            <div
                              className="rounded-full bg-gray-200 w-[27px] h-[27px] flex px-2 cursor-pointer"
                              role="button"
                              disabled={passengers === 1}
                              onClick={() => decreaseAdult(-1)}
                            >
                              <img src="/images/subtract.svg" alt="" />
                            </div>
                            <input
                              type="tel"
                              className="w-10 mx-2 rounded-lg text-center"
                              value={adult}
                              readOnly
                            />
                            <div
                              className="rounded-full bg-gray-200 w-[27px] h-[27px] flex px-1 cursor-pointer"
                              role="button"
                              disabled={passengers === 9}
                              onClick={() => updateAdult(1)}
                            >
                              <img src="/images/_add.svg" alt="" className="" />
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 mb-3">
                          <div className="">
                            <p className="text-base mb-1">Child</p>
                            <p className="mb-0 text-xs text-grey-nine">
                              2 - 12 years
                            </p>
                          </div>
                          <div className="flex items-center">
                            <div
                              className="rounded-full bg-gray-200 w-[27px] h-[27px] flex px-2 cursor-pointer"
                              role="button"
                              disabled={child === 0}
                              onClick={() => updateChild(-1)}
                            >
                              <img src="/images/subtract.svg" alt="subtract" />
                            </div>
                            <input
                              type="tel"
                              className="w-10 mx-2 rounded-lg text-center"
                              value={child}
                              readOnly
                            />
                            <div
                              className="rounded-full bg-gray-200 w-[27px] h-[27px] flex px-1 cursor-pointer"
                              role="button"
                              disabled={passengers === 9}
                              onClick={() => updateChild(1)}
                            >
                              <img src="/images/_add.svg" alt="" />
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 mb-3">
                          <div className="">
                            <p className="text-base mb-1">Infant</p>
                            <p className="mb-0 text-xs text-grey-nine">
                              0 - 2 years
                            </p>
                          </div>
                          <div className="flex items-center">
                            <div
                              className="rounded-full bg-gray-200 w-[27px] h-[27px] flex px-2 cursor-pointer"
                              role="button"
                              disabled={infant === 0}
                              onClick={() => updateInfant(-1)}
                            >
                              <img src="/images/subtract.svg" alt="" />
                            </div>
                            <input
                              type="tel"
                              className="w-10 mx-2 rounded-lg text-center"
                              value={infant}
                              readOnly
                            />
                            <div
                              className="rounded-full bg-gray-200 w-[27px] h-[27px] flex px-1 cursor-pointer"
                              role="button"
                              disabled={adult == infant}
                              onClick={() => updateInfant(1)}
                            >
                              <img src="/images/_add.svg" alt="" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="">
              <button
                className="btn btn-primary font-title block h-full"
                type="submit"
                disabled={formik.isSubmitting}
              >
                Search
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2 md:hidden">
          {showPromo ? (
            <>
              <div className="relative">
                <PromoIcon className="absolute top-3 left-2" />

                <input
                  type="text"
                  ref={promo}
                  className="rounded h-10 pl-8 border border-[#EFEFEF]"
                  placeholder="Enter Promo Code"
                  onChange={(e) => setPromocode(e.target.value)}
                />
                {saveStatus && (
                  <img
                    onClick={() => clear()}
                    role="button"
                    src="/images/clear-promo.svg"
                    alt=""
                    className="absolute right-3 bottom-2.5 invisible lg:visible z-10"
                  />
                )}
              </div>
              <button
                className="btn btn-outline font-title text-primary-main py-2 rounded-lg mx-2 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => saveVal()}
                disabled={saveStatus}
              >
                Apply
              </button>
            </>
          ) : (
            <button
              className="items-center flex"
              onClick={() => setShowPromo(true)}
            >
              <figure className="mr-2">
                <PromoIcon />
              </figure>
              <span className="text-primary text-sm">Use promo code</span>
            </button>
          )}
        </div>
      </form>
      {showModal && (
        <div className="fixed top-0 bottom-0 left-0 right-0 z-20 h-screen p-4 w-screen bg-primary-main flex flex-col justify-start items-center">
          <div className="w-full flex justify-between items-center gap-2">
            <button onClick={() => setShowModal(false)} className="">
              <Back />
            </button>
            <h2 className="text-white font-bold text-lg font-body">Select</h2>
            <button onClick={() => setShowModal(false)} className="">
              <CloseIcon />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default BookingTab;
