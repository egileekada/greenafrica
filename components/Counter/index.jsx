/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";
import MinusIcon from "assets/svgs/minus.svg";
import AddIcon from "assets/svgs/plus.svg";
import { Input } from "antd";

const Counter = ({ index, type, valueProps, onChange }) => {
  const [value, setValue] = useState(0);

  const decrementValue = () => {};

  const incrementValue = () => {};

  return (
    <div className="flex items-center ga__counter">
      <button
        type="button"
        className="w-7 h-7 rounded-full flex items-center justify-center bg-primary-main hover:bg-opacity-80"
        onClick={decrementValue}
      >
        <MinusIcon />
      </button>
      <Input
        type="number"
        min="1"
        value={value}
        className="text-center  max-w-[68px] min-w-[56px] text-primary-main mx-2"
        name="value"
        onChange={(e) => handleValue(e)}
      />

      <button
        type="button"
        className="w-7 h-7 rounded-full flex items-center justify-center bg-primary-main hover:bg-opacity-80"
        onClick={incrementValue}
      >
        <AddIcon />
      </button>
    </div>
  );
};

export default Counter;
