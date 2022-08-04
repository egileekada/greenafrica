import React, { useState, useEffect } from "react";
import { Modal } from "flowbite-react";
import Select, { components, createFilter } from "react-select";
import { format } from "date-fns";
import DatePicker from "react-date-picker/dist/entry.nostyle";
import "react-calendar/dist/Calendar.css";
import "react-date-picker/dist/DatePicker.css";
import { data } from "../../../utils/calendar";

const BookingTab = ({ type }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOption2, setSelectedOption2] = useState(null);
  const [value, onChange] = useState(new Date());
  const [departing, setDeparting] = useState(new Date());
  const [returning, setReturning] = useState(new Date());
  const [passengers, setPassengers] = useState(0);
  const [infant, setInfant] = useState(0);
  const [adult, setAdult] = useState(1);
  const [child, setChild] = useState(0);
  const [show, setShow] = useState(false);

  const options = [
    {
      value: "Abuja",
      label: "Abuja",
      customAbbreviation: "ABV",
      country: "Nigeria",
    },
    {
      value: "Akure",
      label: "Akure",
      customAbbreviation: "AKR",
      country: "Nigeria",
    },
    {
      value: "Benin",
      label: "Benin",
      customAbbreviation: "BNI",
      country: "Nigeria",
    },
    {
      value: "Enugu",
      label: "Enugu",
      customAbbreviation: "ENU",
      country: "Nigeria",
    },
  ];

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
      "& input": {
        "&:focus": {
          "box-shadow": "none",
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
    for (const key in data) {
      if (key === format(date, "yyyy-MM-dd")) {
        return (
          <p className="text-[8px] font-light leading-tight my-1 text-[#9E9BBF]">
            ₦{Math.round(data[key])}K
          </p>
        );
      }
    }
    return <p></p>;
  }

  const onClick = () => {
    const aTemp = selectedOption;
    const bTemp = selectedOption2;
    setSelectedOption(bTemp); // swap a
    setSelectedOption2(aTemp); // swap b
  };

  const updateInfant = (value) => {
    if (infant >= 0) {
      setInfant(Math.min(infant + value, 1));
    }
  };

  const updateAdult = (value) => {
    console.log(adult);
    if (adult >= 0) {
      setAdult(Math.min(adult + value, 9));
    }
  };

  const updateChild = (value) => {
    if (child >= 0) {
      setChild(Math.min(child + value, 9));
    }
  };

  const formatOptionLabel = ({ value, label, customAbbreviation }) => (
    <div class="flex items-center">
      <div>
        <p class="font-bold mb-0">
          {label} ({customAbbreviation})
        </p>
      </div>
    </div>
  );

  const Option = (props) => {
    console.log(props);
    return (
      <components.Option {...props}>
        <div class="flex items-center">
          <div>
            <p class="font-bold mb-0">{props.label}</p>
            <p class="small mb-0">{props.data.country}</p>
          </div>
          <div class="text-green bg-primary-main p-1 rounded-lg text-center w-20 ml-auto">
            {props.data.customAbbreviation}
          </div>
        </div>
      </components.Option>
    );
  };

  const menuHeaderStyle = {
    padding: "8px 12px",
  };

  const Menu = (props) => {
    return (
      <>
        <div style={menuHeaderStyle}>Custom Menu with options</div>
        <components.Menu {...props}>{props.children}</components.Menu>
      </>
    );
  };

  useEffect(() => {
    setPassengers(child + adult + infant);
  }, [adult, infant, child]);

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-flex-col xl:grid-cols-4 sm:grid-flex-col items-center gap-2">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:col-span-2">
          <div className="flex items-end booking__wrapper">
            <img
              src="/images/widget_from.svg"
              alt=""
              className="block mx-2 pb-2"
            />
            <div className="w-full mx-2">
              <p className="mb-1 text-xs mb-0 text-[#979797]">FROM</p>
              <Select
                id="from"
                instanceId="from"
                defaultValue={selectedOption}
                formatOptionLabel={formatOptionLabel}
                components={{ Option }}
                value={selectedOption}
                onChange={setSelectedOption}
                options={options}
                className="border-0"
                styles={colourStyles}
              />
            </div>
            <img
              onClick={() => onClick()}
              role="button"
              src="/images/to_from.svg"
              alt=""
              className="absolute -right-6 bottom-2.5 invisible lg:visible"
            />
          </div>

          <div className="flex items-end booking__wrapper">
            <img
              src="/images/widget_to.svg"
              alt=""
              className="block mx-2 pb-2"
            />
            <div className="w-full mx-2">
              <p className="mb-1 text-xs mb-0 text-[#979797]">TO</p>
              <Select
                id="to"
                instanceId="to"
                defaultValue={selectedOption2}
                value={selectedOption2}
                onChange={setSelectedOption2}
                formatOptionLabel={formatOptionLabel}
                components={{ Option }}
                options={options}
                className="border-0"
                styles={colourStyles}
              />
            </div>
          </div>
        </div>

        <div
          className={`${
            type && "lg:grid-cols-2 md:col-span-2"
          } grid grid-cols-1 gap-2 md:col-auto`}
        >
          <div className="booking__wrapper flex items-end">
            <span className="mr-2 ml-1 pb-1">
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
            <div className="flex-auto">
              <p className="mb-1 text-xs text-[#979797]">DEPARTING</p>
              <DatePicker
                id="departing"
                onChange={setDeparting}
                value={departing}
                tileContent={hasContent}
                className="datepicker border-0 w-full font-body"
                minDate={new Date()}
              />
            </div>
          </div>

          {type && (
            <div className="booking__wrapper flex items-end">
              <span className="mr-2 ml-1 pb-1">
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

              <div className="flex-auto">
                <p className="mb-1 text-xs text-[#979797]">RETURNING</p>
                <DatePicker
                  id="returning"
                  onChange={setReturning}
                  value={returning}
                  tileContent={hasContent}
                  className="datepicker border-0 w-full font-body"
                  minDate={departing}
                />
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <div
            className="booking__wrapper flex-auto relative"
            data-modal-toggle="defaultModal"
          >
            <p className="mb-1 text-xs mx-4 text-[#979797]">PASSENGERS</p>
            <div
              className="flex items-center relative"
              onClick={() => setShow(!show)}
              role="button"
            >
              <span className="ml-4 mr-0 pb-1">
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
                        <p className="text-base">Adults</p>
                        <p className="mb-0 text-xs text-grey-nine">
                          12 + years
                        </p>
                      </div>
                      <div className="flex items-center">
                        <div
                          className="rounded-full bg-gray-200 w-[27px] h-[27px] flex px-2 cursor-pointer"
                          role="button"
                          disabled={passengers === 0}
                          onClick={() => updateAdult(-1)}
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
                        <p className="text-base">Children</p>
                        <p className="mb-0 text-xs text-grey-nine">
                          2 - 12 years
                        </p>
                      </div>
                      <div className="flex items-center">
                        <div
                          className="rounded-full bg-gray-200 w-[27px] h-[27px] flex px-2 cursor-pointer"
                          role="button"
                          disabled={passengers === 0}
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
                        <p className="text-base">Infants</p>
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
                          disabled={infant === 1 || passengers === 9}
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

          <div className="">
            <button className="btn btn-primary font-title block h-full">
              Search
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingTab;
