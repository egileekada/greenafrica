import React, { useState, useEffect, useRef } from "react";
import { useFormik } from "formik";
import Select, { components } from "react-select";
import { format, add } from "date-fns";
import DatePicker from "react-date-picker/dist/entry.nostyle";
import "react-calendar/dist/Calendar.css";
import "react-date-picker/dist/DatePicker.css";
import { lowfare } from "../../../utils/calendar";
import { useGetDestinationQuery } from "../../../services/widgetApi";
import DatesIcon from "assets/svgs/dates.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  saveCreditTripParams,
  saveCreditReturnParams,
  fetchLowFareAvailability,
  returnLowFareAvailability,
  fetchFlightAvailability,
  setCreditGoTrip,
  setCreditReturnTrip,
  creditSelector,
} from "redux/reducers/credit";

import { sessionSelector } from "redux/reducers/session";
import isAfter from "date-fns/isAfter";
import isBefore from "date-fns/isBefore";
import { notification } from "antd";

const CreditTab = ({ type, promocode }) => {
  const dispatch = useDispatch();
  const { data } = useGetDestinationQuery();
  const [arrivals, setArrivals] = useState([]);
  const [isRoundTrip, setRoundTrip] = useState(false);

  const { bookingResponse } = useSelector(sessionSelector);
  const { lowFareAvailabilityLoading } = useSelector(creditSelector);

  useEffect(() => {
    if (bookingResponse) {
      if (bookingResponse?.Booking?.Journeys.length > 0) {
        setRoundTrip(true);
      }
    }
  }, [bookingResponse]);

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

  const formik = useFormik({
    initialValues: {
      origin: "",
      destination: "",
      departure: add(new Date(), { days: 6 }),
      return: add(new Date(), { days: 13 }),
      promocode,
    },
    enableReinitialize: false,
    onSubmit: async (values) => {
      const _newDate = new Date(values?.departure);
      const _check = isAfter(_newDate, new Date());
      if (_check) {
        const flightRequest = {
          departureStation: values.origin.value,
          arrivalStation: values.destination.value,
          isRoundTrip: false,
          totalPaxCount: bookingResponse?.Booking?.Passengers?.length,
          minimumFarePrice: 0,
          taxAmount: 0,
          beginDate: format(_newDate, "yyyy-MM-dd"),
          endDate: format(_newDate, "yyyy-MM-dd"),
          currentDate: new Date(),
        };
        dispatch(saveCreditTripParams(flightRequest));
        dispatch(fetchLowFareAvailability(flightRequest));
        dispatch(fetchFlightAvailability(flightRequest));
      } else {
        notification.error({
          message: "Error",
          description: "Please select a valid date",
        });
      }
      dispatch(setCreditGoTrip(null));
      dispatch(setCreditReturnTrip(null));
    },
  });

  const forcusOrigin = (value) => {
    value.current.focus();
  };

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-wrap lg:flex-nowrap">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:col-span-2 basis-full lg:basis-[40%] flex-grow-0">
            <div
              className={`${
                formik.touched.origin && formik.errors.origin
                  ? "border border-[#de0150]"
                  : ""
              } flex items-end booking__wrapper `}
            >
              <img
                src="/images/widget_from.svg"
                alt=""
                className="mx-2 pb-2 hidden md:block"
                onClick={() => forcusOrigin(originSelect)}
                role="button"
              />
              <div className="w-full mx-2 px-2 md:px-0">
                <p className="text-xs mb-0 text-[#979797]">FROM</p>
                <Select
                  ref={originSelect}
                  openMenuOnFocus={true}
                  id="from"
                  instanceId="from"
                  placeholder="Origin"
                  formatOptionLabel={formatOptionLabel}
                  components={{ Option }}
                  name="origin"
                  defaultValue="Origin"
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
                className="absolute -right-6 bottom-2.5 invisible lg:visible z-10"
              />
            </div>

            <div
              className={`${
                formik.touched.destination && formik.errors.destination
                  ? "border border-[#de0150]"
                  : ""
              } flex items-end booking__wrapper`}
            >
              <img
                src="/images/widget_to.svg"
                alt=""
                className="hidden md:block mx-2 pb-2 cursor-pointer"
                role="button"
                onClick={() => forcusOrigin(destinationSelect)}
              />
              <div className="w-full mx-2 px-2 md:px-0">
                <p className="mb-1 text-xs mb-0 text-[#979797]">TO</p>
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
            className={`flex flex-wrap lg:flex-nowrap justify-between basis-auto flex-grow flex-shrink my-3 lg:my-0 lg:ml-4`}
          >
            <div
              className={`booking__wrapper flex items-end  basis-full lg:basis-[49%] flex-grow mb-2 lg:mb-0 `}
            >
              <span className="mr-2 ml-1 pb-1 hidden md:block">
                <DatesIcon />
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
                  onChange={(value) => formik.setFieldValue("departure", value)}
                  value={formik.values.departure}
                  onKeyDown={(e) => e.preventDefault()}
                  minDate={new Date()}
                />
              </div>
            </div>

            {type && type === "round_trip" && (
              <div
                className={`booking__wrapper flex items-end basis-full lg:basis-[49%]`}
              >
                <span className="mr-2 ml-1 pb-1 hidden md:block">
                  <DatesIcon />
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
                    format={"d/M/y"}
                    name="return"
                    onChange={(value) => formik.setFieldValue("return", value)}
                    value={formik.values.return}
                    onKeyDown={(e) => e.preventDefault()}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-3 basis-full lg:basis-[15%] flex-grow-0 flex-shrink lg:ml-3">
            <div className="w-full">
              <button
                className="btn btn-primary font-title block h-full w-full"
                type="submit"
                disabled={formik.isSubmitting}
              >
                {lowFareAvailabilityLoading ? "Searching...." : "Search"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreditTab;
