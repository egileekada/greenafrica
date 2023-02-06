/* eslint-disable eqeqeq */
import React, { useState } from "react";
import MinusIcon from "assets/svgs/minus.svg";
import AddIcon from "assets/svgs/plus.svg";
import { Input } from "antd";

const Counter = ({
  value,
  onValueChange,
  onValueDecrement,
  onValueIncrement,
}) => {
  return (
    <div className="flex items-center ga__counter">
      <button
        type="button"
        className="w-7 h-7 rounded-full flex items-center justify-center bg-primary-main hover:bg-opacity-80"
        onClick={onValueDecrement}
      >
        <MinusIcon />
      </button>
      <Input
        type="number"
        min="1"
        disabled
        value={value}
        className="text-center !bg-white w-[45px] text-primary-main mx-2 "
        name="value"
        onChange={(e) => onValueChange(e)}
      />

      <button
        type="button"
        className="w-7 h-7 rounded-full flex items-center justify-center bg-primary-main hover:bg-opacity-80"
        onClick={onValueIncrement}
      >
        <AddIcon />
      </button>
    </div>
  );
};

export default Counter;
