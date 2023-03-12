/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import SelectIcon from "assets/svgs/select.svg";
import { isInThePast } from "lib/utils";
import { differenceInYears } from "date-fns";
import differenceInMonths from "date-fns/differenceInMonths";
import format from "date-fns/format";
// import { diff_years } from "lib/utils";
import { DatePicker } from "antd";
const PassengerFormItem = ({
  passenger,
  passengers,
  setPassengers,
  errorIds,
  setErrorIds,
  salutations,
}) => {
  const [error, setErr] = useState({
    title: "",
    firstName: "",
    lastName: "",
    dob: "",
  });

  function disabledDate(current) {
    return current && current.valueOf() > Date.now();
  }

  const handleFieldChange = (e) => {
    let indexedPassenger = passengers.find(function (element) {
      return parseInt(element.id) === parseInt(passenger.id);
    });

    if (indexedPassenger) {
      if (e.target.value.length > 0) {
        const modifiedPassenger = {
          ...indexedPassenger,
          [e.target.name]: e.target.value,
        };

        setErr({
          ...error,
          [e.target.name]: "",
        });

        let foundIndex = passengers
          .map(function (item) {
            return parseInt(item.id);
          })
          .indexOf(parseInt(modifiedPassenger.id));

        if (foundIndex > -1) {
          let oldPassengers = passengers;
          oldPassengers.splice(foundIndex, 1);
          const newPassArr = [...oldPassengers, modifiedPassenger].sort(
            (a, b) => {
              return a.id - b.id;
            }
          );
          setPassengers(newPassArr);
        }
      } else {
        setErr({
          ...error,
          [e.target.name]: "Field is required",
        });
      }
    }
  };

  const handleFieldBlur = (e) => {
    if (e.target.value?.length < 1) {
      setErr({
        ...error,
        [e.target.name]: "Field is required",
      });
    } else {
      setErr({
        ...error,
        [e.target.name]: "",
      });
    }
  };

  const fillInDob = (_indexedPassenger, _value) => {
    const modifiedPassenger = {
      ..._indexedPassenger,
      dob: format(new Date(_value), "yyyy-MM-dd"),
    };

    setErr({
      ...error,
      dob: "",
    });

    let foundIndex = passengers
      .map(function (item) {
        return parseInt(item.id);
      })
      .indexOf(parseInt(modifiedPassenger.id));

    if (foundIndex > -1) {
      let oldPassengers = passengers;
      oldPassengers.splice(foundIndex, 1);
      const newPassArr = [...oldPassengers, modifiedPassenger].sort((a, b) => {
        return a.id - b.id;
      });
      setPassengers(newPassArr);
      let newErrorIDS = errorIds.filter(
        (item) => parseInt(item) !== parseInt(passenger?.id)
      );
      setErrorIds(newErrorIDS);
    }
  };

  const onChange = (date, dateString) => {
    let indexedPassenger = passengers.find(function (element) {
      return parseInt(element.id) === parseInt(passenger.id);
    });

    if (indexedPassenger) {
      if (!isInThePast(dateString)) {
        setErr({
          ...error,
          dob: "The date is invalid",
        });
      } else {
        // const _DIFF = differenceInYears(new Date(), new Date(dateString));
        const _DIFF = differenceInMonths(new Date(), new Date(dateString));

        if (passenger?.type === "ADT") {
          parseInt(_DIFF) < 145
            ? setErr({
                ...error,
                dob: "Can't select less than 12 years of age for an adult",
              })
            : fillInDob(indexedPassenger, dateString);
        }

        if (passenger?.type === "INF") {
          parseInt(_DIFF) > 24
            ? setErr({
                ...error,
                dob: "Can't select more than 2 years of age for an infant",
              })
            : fillInDob(indexedPassenger, dateString);
        }

        if (passenger?.type === "CHD") {
          parseInt(_DIFF) > 144
            ? setErr({
                ...error,
                dob: "Can't select more than 12 years of age for a child ",
              })
            : fillInDob(indexedPassenger, dateString);
        }
      }
    }
  };

  return (
    <div className="passenger__form__box">
      <h3 className="font font-header font-bold mb-4">
        {passenger.type === "ADT"
          ? `ADULT ${passenger.typeCount}`
          : passenger.type === "CHD"
          ? `CHILD ${passenger.typeCount}`
          : `INFANT ${passenger.typeCount}`}
      </h3>

      <div className="mb-6 flex flex-wrap lg:flex-nowrap">
        {/* <p>{JSON.stringify(passenger)}</p> */}
        <div className="mr-0 md:mr-4">
          <div className="form-group select-field select-group">
            <label>TITLE*</label>
            <select
              id="title"
              name="title"
              onBlur={handleFieldBlur}
              onChange={handleFieldChange}
              required
            >
              <option value="">Select</option>
              {salutations.map((salutation, index) => (
                <option value={salutation.title} key={index}>
                  {" "}{salutation.title}
                </option>
              ))}
            </select>
            <div className="select-icon">
              <SelectIcon />
            </div>
          </div>
          {error?.title && error?.title.length > 1 ? (
            <p className="errorText mt-2">{error?.title}</p>
          ) : null}
        </div>

        <div className="flex-grow mr-0 md:mr-4">
          <div className="form-group">
            <label>FIRST NAME*</label>
            <input
              type="text"
              placeholder="Enter first name"
              id="firstName"
              name="firstName"
              onChange={handleFieldChange}
              onBlur={handleFieldBlur}
              required
            />
          </div>

          {error?.firstName && error?.firstName.length > 1 ? (
            <p className="errorText mt-2">{error?.firstName}</p>
          ) : null}
        </div>
        <div className="flex-grow mr-0 md:mr-4">
          <div className="form-group">
            <label>LAST NAME*</label>
            <input
              type="text"
              placeholder="Enter last name"
              id="lastName"
              name="lastName"
              onChange={handleFieldChange}
              onBlur={handleFieldBlur}
              required
            />
          </div>
          {error?.lastName && error?.lastName.length > 1 ? (
            <p className="errorText mt-2">{error?.lastName}</p>
          ) : null}
        </div>

        <div className="flex flex-col flex-grow-0 flex-shrink w-full md:w-auto">
          <div className="w-full  h-20 md:h-auto">
            <div className="form-group">
              <label>
                DATE OF BIRTH
                {passenger?.type === "INF" || passenger?.type === "CHD"
                  ? "*"
                  : ""}{" "}
              </label>
              <div className="date-picker">
                <DatePicker onChange={onChange} disabledDate={disabledDate} />
              </div>
            </div>
            {error?.dob && error?.dob.length > 1 ? (
              <p className="errorText">{error?.dob}</p>
            ) : null}
          </div>

          {errorIds.includes(parseInt(passenger?.id)) ? (
            <p className="errorText">Date is required</p>
          ) : null}
        </div>
      </div>
    </div>
  );
};

PassengerFormItem.defaultProps = {
  passenger: "",
  errorIds: [],
};

export default PassengerFormItem;
