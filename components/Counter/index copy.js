/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";
import "./styles.scss";
import MinusIcon from "assets/icons/minus.svg";
import AddIcon from "assets/icons/plus.svg";
import { Input, message } from "antd";

const Counter = ({
  index,
  type,
  valueProps,
  onChange,
  className,
  parent,
}) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    setValue(valueProps);
  }, [valueProps]);

  const decrementValue = () => {
    if (value > 1) {
      setValue(value - 1);
      if (type == "multiple") {
        updateOrderObject(index, value - 1);
      } else {
        onChange(value - 1);
      }
    }
  };

  const incrementValue = () => {
    setValue(value + 1);
    if (type == "multiple") {
      updateOrderObject(index, value + 1);
    } else {
      onChange(value + 1);
    }
  };

  const handleValue = (event) => {
    const newValue = parseInt(event.target.value.toString().replace(/\D/g, ""));

    if (value < 1) {
      setValue(1);
      if (type == "multiple") {
        updateOrderObject(index, 1);
      } else {
        onChange(1);
      }
      message.error("Zero not allowed as a value");
    } else {
      setValue(newValue);
      if (type == "multiple") {
        updateOrderObject(index, newValue);
      } else {
        onChange(newValue);
      }
    }
  };

  return (
    <div
      className={`btn-group btn-quantity ${className} counter-input`}
      role="group"
      aria-label="Basic example"
    >
      <button type="button" className="btn" onClick={decrementValue}>
        {parent === "table" ? (
          "-"
        ) : (
          <img src={MinusIcon} className="img-fluid" alt="minus-icon" />
        )}
      </button>
      {/* <span className="input"> {value}</span> */}
      <Input
        type="number"
        min="1"
        value={value}
        // value={value && parseInt(value) > 0 ? value : parseInt("1")}
        className="value"
        name="value"
        onChange={(e) => handleValue(e)}
      />
      <button type="button" className="btn" onClick={incrementValue}>
        {parent === "table" ? (
          "+"
        ) : (
          <img src={AddIcon} className="img-fluid" alt="add-icon" />
        )}
      </button>
    </div>
  );
};

Counter.defaultProps = {
  type: "single",
};

export default Counter;
