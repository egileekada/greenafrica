import React, { useState, useEffect, useRef } from "react";
// import PromoIcon from "assets/svgs/promo.svg";
import { useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import Select, { components } from "react-select";
import { format } from "date-fns";
import DatePicker from "react-date-picker/dist/entry.nostyle";
import { getWidgetData } from "../../../services";
import "react-calendar/dist/Calendar.css";
import "react-date-picker/dist/DatePicker.css";
import { lowfare } from "../../../utils/calendar";
import useDeviceSize from "hooks/useWindowSize";
import MobileSearch from "components/MobileSearch";
// import { hasBasePath } from "next/dist/server/router";

const validationSchema = Yup.object().shape({
  destination: Yup.object().required("Required"),
  origin: Yup.object().required("Required"),
});

const Book = ({
  arrivals,
  setArrivals,
  type,
  promocode: code,
  fromTo,
  setFromTo,
  returningDate,
  setReturningDate,
  departureDate,
  setDepartureDate,
  passengers,
  setPassengers,
  infant,
  setInfant,
  adult,
  setAdult,
  child,
  setChild,
}) => {
  const [width] = useDeviceSize();
  const [showModal, setShowModal] = useState(false);
  const { data } = useQuery(["destination"], getWidgetData);
  const [promocode, setPromocode] = useState(code);
  // const [saveStatus, setSaveStatus] = useState(false);
  const [show, setShow] = useState(false);

  const [currrentType, setCurrentType] = useState(type);
  const originSelect = useRef(null);
  const destinationSelect = useRef(null);

  // const promo = useRef(null);

  //   const saveVal = () => {
  //     if (promocode !== null && promocode.length > 1) {
  //       setSaveStatus(true);
  //     }
  //   };

  //   const clear = () => {
  //     setSaveStatus(false);
  //     promo.current.value = null;
  //     setPromocode(null);
  //   };

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
          <p className="text-[10px] font-light leading-tight my-1 text-[#545175]">
            ₦{Math.round(lowfare[key])}K
          </p>
        );
      }
    }
    return <p></p>;
  }
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

  const formatOptionLabel = ({ value, cityName }) => (
    <div className="flex items-center">
      <div>
        <p className=" mb-0">
          {!!cityName ? cityName : ""} {!!value ? `(${value})` : ""} &nbsp;
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
            <p className="text-[12px] mb-0">{props.data.country}</p>
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
      origin: fromTo?.from?.value ?? "",
      destination: fromTo?.to?.value ?? "",
      departure: departureDate,
      return: returningDate,
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
        if (currrentType === "round_trip") {
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

  const setDepartureDateFormik = (value) => {
    formik.setFieldValue("departure", value);
    setDepartureDate(value);
  };

  const setReturnDateFormik = (value) => {
    formik.setFieldValue("return", value);
    setReturningDate(value);
  };

  const onClick = () => {
    const aTemp = formik.values.origin;
    const bTemp = formik.values.destination;
    formik.setFieldValue("origin", bTemp); // swap a
    formik.setFieldValue("destination", aTemp); // swap b
    setFromTo({
      from: fromTo.to,
      to: fromTo.from,
    });
  };

  const setOrigin = (value) => {
    formik.setFieldValue("origin", value);
  };

  // useEffect(() => {
  //   setOrigin(
  //     fromTo?.from ?? { cityName: "", value: "", country: "", arrivals: [] }
  //   );
  //   setDestination(fromTo?.to ?? { cityName: "", value: "", country: "" });
  //   setDepartureDateFormik(departureDate);
  //   setReturnDateFormik(returningDate);
  // }, []);

  const setDestination = (value) => {
    formik.setFieldValue("destination", value);
  };

  const setFromDate = (value) => {
    formik.setFieldValue("origin", value);
    formik.setFieldValue("destination", " ");
    setArrivals(value.arrivals);
    setFromTo({
      ...fromTo,
      from: value,
      to: { cityName: "", value: "", country: "" },
    });
  };

  const setToDate = (value) => {
    formik.setFieldValue("destination", value);
    setFromTo({ ...fromTo, to: value });
  };

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-flex-col xl:flex sm:grid-flex-col items-center gap-2">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:flex-1 gap-3 md:col-span-2">
            <div
              className={`${
                formik.touched.origin && formik.errors.origin
                  ? "border !border-[#de0150]"
                  : ""
              } ${width < 769 ? "cursor-pointer" : ""}
               flex items-end booking__wrapper `}
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
                    defaultValue={fromTo.from}
                    value={fromTo.from}
                    onChange={(value) => setFromDate(value)}
                    options={data?.data?.values}
                    className="border-0"
                    styles={colourStyles}
                  />
                ) : (
                  <>
                    {fromTo?.from.value !== ""
                      ? formatOptionLabel(
                          fromTo?.from ?? {
                            cityName: "",
                            value: "",
                            country: "",
                            arrivals: [],
                          }
                        )
                      : "Origin"}
                  </>
                )}
              </div>
              <img
                onClick={() => onClick()}
                role="button"
                src="/images/to_from.svg"
                alt=""
                className="absolute right-6 -bottom-6 transform rotate-90 lg:rotate-0 lg:-right-6 lg:bottom-2.5 z-[3]"
              />
            </div>

            <div
              className={`${
                formik.touched.destination && formik.errors.destination
                  ? "border !border-[#de0150]"
                  : ""
              } ${width < 769 ? "cursor-pointer" : ""}
              flex items-end booking__wrapper`}
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
                    defaultValue={fromTo.to}
                    value={fromTo.to}
                    onChange={(value) => setToDate(value)}
                    noOptionsMessage={() => "Kindly choose an origin"}
                  />
                ) : (
                  <>
                    {fromTo?.to.value !== ""
                      ? formatOptionLabel(
                          fromTo?.to ?? {
                            cityName: "",
                            value: "",
                            country: "",
                          }
                        )
                      : "Destination"}
                  </>
                )}
              </div>
            </div>
          </div>

          <div
            className={`${
              type && "lg:grid-cols-2 md:col-span-2 xl:flex-1"
            } hidden md:grid grid-cols-1 xl:flex-1 gap-2 md:col-auto`}
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
                <DatePicker
                  id="departure"
                  clearIcon={null}
                  calendarIcon={null}
                  tileContent={hasContent}
                  format={"d/M/y"}
                  name="departure"
                  onChange={(value) => setDepartureDateFormik(value)}
                  value={formik.values.departure}
                  onKeyDown={(e) => e.preventDefault()}
                  minDate={new Date()}
                />
              </div>
            </div>

            {type === "round_trip" && (
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
                  <DatePicker
                    id="return"
                    clearIcon={null}
                    calendarIcon={null}
                    tileContent={hasContent}
                    className="datepicker border-0 w-full font-body"
                    minDate={new Date()}
                    name="return"
                    format={"d/M/y"}
                    onChange={(value) => setReturnDateFormik(value)}
                    value={formik.values.return}
                    onKeyDown={(e) => e.preventDefault()}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-3 xl:max-w-[250px] xl:flex-1">
            <div
              className="booking__wrapper hidden md:flex flex-auto relative"
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
                <p className="mb-1 text-xs text-[#979797]">PASSENGERS</p>
                <div
                  className="flex items-center relative"
                  onClick={() =>
                    width > 769 ? setShow(!show) : setShowModal(true)
                  }
                  role="button"
                >
                  <span className="mr-0 pb-1 hidden md:block">
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
                  className="absolute top-20 left-0 right-0 z-50 h-auto w-[250px]"
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

            <div className="w-full md:w-auto">
              <button
                className="btn btn-primary w-full md:w-auto font-title block h-full"
                type="submit"
                disabled={formik.isSubmitting}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </form>
      {showModal && (
        <MobileSearch
          values={data?.data?.values}
          updateAdult={updateAdult}
          updateChild={updateChild}
          updateInfant={updateInfant}
          decreaseAdult={decreaseAdult}
          showModal={showModal}
          setShowModal={setShowModal}
          arrivals={arrivals}
          setArrivals={setArrivals}
          type={currrentType}
          setType={setCurrentType}
          promocode={promocode}
          setPromocode={setPromocode}
          fromTo={fromTo}
          setFromTo={setFromTo}
          returningDate={returningDate}
          setReturningDate={setReturningDate}
          departureDate={departureDate}
          setDepartureDate={setDepartureDate}
          passengers={passengers}
          setPassengers={setPassengers}
          infant={infant}
          setInfant={setInfant}
          adult={adult}
          setAdult={setAdult}
          child={child}
          setChild={setChild}
        />
      )}
    </>
  );
};

export default Book;
