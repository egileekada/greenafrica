import React, { useState } from "react";
import Select from "react-select";
import { format } from "date-fns";
import DatePicker from "react-date-picker/dist/entry.nostyle";
// import DatePicker from "react-date-picker";
import "react-calendar/dist/Calendar.css";
import "react-date-picker/dist/DatePicker.css";
import { data } from "../../../utils/calendar";

const BookingTab = ({ type }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [value, onChange] = useState(new Date());

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const colourStyles = {
    control: (styles) => ({
      ...styles,
      //   backgroundColor: "red",
      borderWidth: "0px",
      minHeight: "auto",
      boxShadow: "0px",
    }),
    valueContainer: (styles) => ({ ...styles, padding: "0px" }),
    dropdownIndicator: (styles) => ({ ...styles, padding: "0px" }),
    indicatorSeparator: (styles) => ({ ...styles, display: "none" }),
    placeholder: (styles) => ({ ...styles, marginLeft: "0px" }),
    input: (styles) => ({ ...styles, margin: "0px" }),
  };

  function hasContent({ date }) {
    for (const key in data) {
      if (key === format(date, "yyyy-MM-dd")) {
        // console.log(`${key}: ${data[key]}`);
        return <p>${Math.round(data[key])}</p>;
      }
    }
    return <p></p>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 sm:grid-flex-col items-center gap-3">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:col-span-2">
        <div className="flex items-end booking__wrapper relative">
          <img
            src="/images/widget_from.svg"
            alt=""
            className="block mx-2 pb-2"
          />
          <div className="w-full mx-2">
            <p className="mb-1 text-xs mb-0">FROM</p>
            <Select
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={options}
              className="border-0"
              styles={colourStyles}
            />
          </div>
          <img
            src="/images/to_from.svg"
            alt=""
            className="absolute -right-6 bottom-2.5 invisible lg:visible"
          />
        </div>

        <div className="flex items-end booking__wrapper">
          <img src="/images/widget_to.svg" alt="" className="block mx-2 pb-2" />
          <div className="w-full mx-2">
            <p className="mb-1 text-xs mb-0">TO</p>
            <Select
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={options}
              className="border-0"
              styles={colourStyles}
            />
          </div>
        </div>
      </div>

      <div className="booking__wrapper flex items-end">
        <span className="mx-4 pb-1">
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
        <div>
          <p className="mb-1 text-xs">DEPARTING</p>
          <DatePicker
            onChange={onChange}
            value={value}
            tileContent={hasContent}
            className="datepicker border-0 w-full"
          />
        </div>
      </div>

      <div className="booking__wrapper">
        <p className="mb-1 text-xs mx-4">PASSENGERS</p>
        <div className="flex items-end">
          <span className="mx-4 pb-1">
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

          <div className="w-full">
            <Select
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={options}
              styles={colourStyles}
            />
          </div>
        </div>
      </div>

      <div className="h-full">
        <button className="btn btn-primary block w-full h-full">Search</button>
      </div>
    </div>
  );
};

export default BookingTab;
