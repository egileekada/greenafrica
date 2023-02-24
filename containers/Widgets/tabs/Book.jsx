import React, { useState, useEffect, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Select, { components } from "react-select";
import { format, add } from "date-fns";
import millify from "millify";
import DatePicker from "react-date-picker/dist/entry.nostyle";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import CustomDatePicker from "../../../components/CustomDatePicker"
import "react-calendar/dist/Calendar.css";
import "react-date-picker/dist/DatePicker.css";
import { lowfare } from "../../../utils/calendar";
import { useGetDestinationQuery, getLowFare } from "../../../services/widgetApi";
// import { getLowFare } from "../../../services/getLowFare";
import { hideWidget } from "redux/reducers/general";
const validationSchema = Yup.object().shape({
  destination: Yup.object().required("Required"),
  origin: Yup.object().required("Required"),
});

const BookingTab = ({ type, promocode }) => {
  const ibeQuery = new URLSearchParams(window.location.search);
  const flightOrigin = ibeQuery.get("origin");
  const flightDestination = ibeQuery.get("destination");
  const isRoundTrip = parseInt(ibeQuery.get("round")) === 1 ? true : false; 

  const flightRequest = {
    departureStation: ibeQuery.get("origin"),
    arrivalStation: ibeQuery.get("destination"),
    departure: ibeQuery.get("departure"),
    returnDate: isRoundTrip === 1 ? ibeQuery.get("return") : null,
    promoCode: ibeQuery.get("promocode") ? ibeQuery.get("promocode") : "",
    ADT: parseInt(ibeQuery.get("adt")) ? parseInt(ibeQuery.get("adt")) : 1,
    CHD: parseInt(ibeQuery.get("chd")) ? parseInt(ibeQuery.get("chd")) : 0,
    INF: parseInt(ibeQuery.get("inf")) ? parseInt(ibeQuery.get("inf")) : 0,
    currentDate: new Date(),
  };

  const dispatch = useDispatch();
  const { data, error, isLoading } = useGetDestinationQuery();
  const [arrivals, setArrivals] = useState([]);
  const [passengers, setPassengers] = useState(0);
  const [flightData, setFlightData] = useState([]);
  const [infant, setInfant] = useState(flightRequest.INF);
  const [adult, setAdult] = useState(flightRequest.ADT);
  const [child, setChild] = useState(flightRequest.CHD);
  const [show, setShow] = useState(false);

  const originSelect = useRef(null);
  const destinationSelect = useRef(null);

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
    console.log(flightData);
    const lowfare = flightData?.data?.values;
    for (const key in lowfare) {
      if (lowfare[key].DepartureDate === format(date, "yyyy-MM-dd")) {
        return (
          <p className="text-[10px] font-meduim leading-tight my-1 text-[#545175]">
            {lowfare[key]?.currency}
            {millify(Math.round(lowfare[key].amount))}
          </p>
        );
      }
    }
    return <p className=" h-[10px] " ></p>;
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
    <div class="flex items-center">
      <div>
        <p class="font-bold mb-0">
          {cityName} ({value})
        </p>
      </div>
    </div>
  );

  const Option = (props) => {
    return (
      <components.Option {...props}>
        <div class="flex items-center">
          <div>
            <p class="font-bold text-base mb-0">{props.data.cityName}</p>
            <p class="small mb-0">{props.data.country}</p>
          </div>
          <div class="text-green bg-primary-main p-1 rounded-lg text-center w-20 ml-auto">
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
      origin: flightOrigin
        ? data?.data?.values.filter(({ value }) => value === flightOrigin)
        : "",
      destination: flightDestination
        ? data?.data?.values.filter(({ value }) => value === flightDestination)
        : "",
      departure: flightRequest.departure
        ? new Date(flightRequest.departure)
        : add(new Date(), { weeks: 1 }),
      return: flightRequest.returnDate
        ? new Date(flightRequest.returnDate)
        : add(new Date(), { days: 10 }),
      promocode: flightRequest.promoCode ? flightRequest.promoCode : promocode,
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
        if (type === "round_trip" || isRoundTrip) {
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

      window.location.replace(`${window.location.pathname + test}`);
      dispatch(hideWidget());
    },
  });

  const forcusOrigin = (value) => {
    value.current.focus();
  }; 

  useEffect(() => {
    if (flightOrigin || flightDestination) {
      formik.setFieldValue(
        "origin",
        data?.data?.values.filter(({ value }) => value === flightOrigin)
      );
      formik.setFieldValue(
        "destination",
        data?.data?.values.filter(({ value }) => value === flightDestination)
      );
    }
  }, [isLoading]);



  const setDepartureDateFormik = (value) => { 

    var date = new Date(value);
    date.setDate(date.getDate() + 7);

    formik.setFieldValue("departure", value); 
    formik.setFieldValue("return", date);
    // setDepartureDate(value);
  }; 

  const setReturnDateFormik = (value) => {
    formik.setFieldValue("return", value);
    // setReturningDate(value);
  }; 


  // const { data: lowfaredata } = useQuery(
  //   ["lowfare", [formik.values.origin, formik.values.destination]],
  //   () => getLowFare(formik.values.origin, formik.values.destination)
  // );

  React.useEffect(() => {  
    (async () => {
        try { 
        const response = await getLowFare(formik.values.origin.value, formik.values.destination.value); 
        // console.log(response); 
        setFlightData(response)
        } catch (err) {
          console.error("Error occured");
        } 
    })(); 
  }, [formik.values.origin, formik.values.destination]);
  
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-1 lg:flex xl:flex w-full sm:grid-flex-col items-center gap-2">
          <div className="grid grid-cols-1 lg:grid-cols-2 w-full xl:flex-1 gap-3 md:col-span-2">
            <div
              className={`${
                formik.touched.origin && formik.errors.origin
                  ? "border border-[#de0150]"
                  : ""
              } flex items-center justify-center h-[55px] hover:border-primary-main booking__wrapper `}
            >
              <img
                src="/images/widget_from.svg"
                alt=""
                className="mx-2 my-auto hidden md:block"
                onClick={() => forcusOrigin(originSelect)}
                role="button"
              />
              <div className="w-full mx-2 px-2 md:px-0">
                <p className="mb-0 text-xs !font-medium  text-[#979797]">FROM</p>
                <Select
                  ref={originSelect}
                  openMenuOnFocus={true}
                  id="from"
                  instanceId="from"
                  placeholder="Origin"
                  formatOptionLabel={formatOptionLabel}
                  components={{ Option }}
                  name="origin"
                  defaultValue={data?.data?.values.filter(
                    ({ value }) => value === flightOrigin
                  )}
                  value={formik.values.origin}
                  onChange={(value) => (
                    formik.setFieldValue("origin", value),
                    formik.setFieldValue("destination", " "),
                    setArrivals(value.arrivals)
                  )}
                  options={data?.data?.values}
                  className="border-0"
                  styles={colourStyles}
                />
              </div>
              <img
                onClick={() => onClick()}
                role="button"
                src="/images/to_from.svg"
                alt=""
                className="absolute right-0 top-10 lg:-right-6 bottom-2.5 visible z-10"
              />
            </div>

            <div
              className={`${
                formik.touched.destination && formik.errors.destination
                  ? "border border-[#de0150]"
                  : ""
              } flex items-center justify-center h-[55px] hover:border-primary-main booking__wrapper`}
            >
              <img
                src="/images/widget_to.svg"
                alt=""
                className="hidden md:block mx-2 my-auto cursor-pointer"
                role="button"
                onClick={() => forcusOrigin(destinationSelect)}
              />
              <div className="w-full mx-2 px-2 md:px-0">
                <p className="mb-0 !font-medium  text-xs text-[#979797]">TO</p>
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
                  }}
                  noOptionsMessage={() => "Kindly choose an origin"}
                />
              </div>
            </div>
          </div>

          <div
            className={`${
              type === "round_trip w-fit md:grid-cols-2 " && "lg:grid-cols-2 md:col-span-2 "
            } flex grid-cols-1 lg:w-fit gap-2 `}
          >

            {/* <CustomDatePicker value={setDepartureDateFormik} title="DEPARTING" /> */}
            <div className="booking__wrapper items-center w-full lg:w-[180px] justify-center h-[55px] hover:border-primary-main flex">
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
              <div className="flex-auto px-4 md:px-0 !text-base ">
                <p className="mb-1 text-xs text-[#979797] font-medium">DEPARTING</p>
                <DatePicker
                  id="departure"
                  clearIcon={null}
                  calendarIcon={null}
                  tileContent={hasContent}
                  format={"d-M-y"}
                  className=" font-title "
                  name="departure"
                  // onChange={(value) => console.log(value)}
                  onChange={(value) => setDepartureDateFormik(value)}
                  value={formik.values.departure}
                  onKeyDown={(e) => e.preventDefault()}
                  minDate={new Date()}
                />
              </div>
            </div>

            {type && (
              // <CustomDatePicker value={setReturnDateFormik} title="RETURNING" />
              <div className="booking__wrapper items-center w-full lg:w-[180px] justify-center h-[55px] hover:border-primary-main flex">
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

                <div className="flex-auto px-4 md:px-0 !text-base ">
                  <p className="mb-1 text-xs text-[#979797] font-medium">RETURNING</p>
                  <DatePicker
                    id="return"
                    clearIcon={null}
                    calendarIcon={null}
                    tileContent={hasContent}
                    className="datepicker border-0 w-full font-body"
                    minDate={new Date()}
                    name="return"
                    format={"d-M-y"}
                    onChange={(value) => formik.setFieldValue("return", value)}
                    value={formik.values.return}
                    onKeyDown={(e) => e.preventDefault()}
                  />

                </div>
              </div>
            )}
          </div>

          <div className="flex gap-2 xl:max-w-[280px] w-fit h-[55px] xl:flex-1">
            <div
              className="booking__wrapper w-full lg:w-auto font-semibold hover:border-primary-main flex flex-auto"
              data-modal-toggle="defaultModal"
            >
              <div className="px-4 md:px-0">
                <p className="mb-1 text-xs md:mx-4 text-[#979797] font-medium">
                  PASSENGERS
                </p>
                <div
                  className="flex items-center w-[100px] relative"
                  onClick={() => setShow(!show)}
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
                  } bg-gray-900 bg-opacity-0 fixed inset-0 z-40`}
                  // onClick={() => setShow(false)}
                ></div>

                <div
                  id="defaultModal"
                  className="absolute top-[63px] left-0 right-0 z-50 h-auto w-[250px]"
                >
                  <div
                    className={`${
                      !show && "hidden"
                    } w-full h-full max-w-lg md:h-auto widget-border rounded-lg shadow dark:bg-gray-700 bg-white`}
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
                              className="rounded-full bg-gray-200 justify-center items-center w-[27px] h-[27px] flex px-2 cursor-pointer"
                              role="button"
                              disabled={passengers === 1}
                              onClick={() => decreaseAdult(-1)}
                            >
                              <img src="/images/subtract.svg" alt="" />
                            </div>
                            <input
                              type="tel"
                              className="w-10 h-[37px] mx-2 rounded-lg text-center"
                              value={adult}
                              readOnly
                            />
                            <div
                              className="rounded-full bg-gray-200 justify-center items-center w-[27px] h-[27px] flex px-2 cursor-pointer"
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
                              className="rounded-full bg-gray-200 justify-center items-center w-[27px] h-[27px] flex px-2 cursor-pointer"
                              role="button"
                              disabled={child === 0}
                              onClick={() => updateChild(-1)}
                            >
                              <img src="/images/subtract.svg" alt="subtract" />
                            </div>
                            <input
                              type="tel"
                              className="w-10 mx-2 h-[37px] rounded-lg text-center"
                              value={child}
                              readOnly
                            />
                            <div
                              className="rounded-full bg-gray-200 justify-center items-center w-[27px] h-[27px] flex px-2 cursor-pointer"
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
                              className="rounded-full bg-gray-200 justify-center items-center w-[27px] h-[27px] flex px-2 cursor-pointer"
                              role="button"
                              disabled={infant === 0}
                              onClick={() => updateInfant(-1)}
                            >
                              <img src="/images/subtract.svg" alt="" />
                            </div>
                            <input
                              type="tel"
                              className="w-10 mx-2 h-[37px] rounded-lg text-center"
                              value={infant}
                              readOnly
                            />
                            <div
                              className="rounded-full bg-gray-200 justify-center items-center w-[27px] h-[27px] flex px-2 cursor-pointer"
                              role="button"
                              disabled={adult == infant}
                              onClick={() => updateInfant(1)}
                            >
                              <img src="/images/_add.svg" alt="" />
                            </div>
                          </div>
                        </div>
                        <div
                          onClick={()=> setShow(false)} 
                          role="button"
                          className="btn btn-primary flex cursor-pointer z-[70] justify-center items-center font-bold mt-4 w-full font-title h-[50px]"  
                        >
                          Done
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full md:w-[159px]">
              <button
                className="btn btn-primary font-bold w-full md:w-auto font-title block h-[55px]"
                type="submit"
                disabled={formik.isSubmitting}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default BookingTab;
