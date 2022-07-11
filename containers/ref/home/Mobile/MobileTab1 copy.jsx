/* eslint-disable @next/next/no-img-element */
import { useRef, useState } from "react";
import { DatePicker } from "antd";
import ToIcon from "assets/svgs/ToIcon.svg";
import { Select } from "antd";

const MobileTab1 = () => {
  const { Option } = Select;
  const [dateOpen, setDateOpen] = useState(false);

  function handleChange(value) {
    console.log(`selected ${value}`);
  }

  function onChange(date, dateString) {
    console.log(date, dateString);
    setDateOpen(false);
  }

  const displayDate = () => {
    setDateOpen(!dateOpen);
    console.log("fffff");
  };

  return (
    <>
      <div className="mobile__filter__type">
        <h3 className="text-sm mr-2">Trip Type:</h3>
        <div className="flex">
          <div className="mobile__filter-radio-group">
            <input type="radio" />
            <label className="text-caption">One Way</label>
          </div>
          <div className="mobile__filter-radio-group">
            <input type="radio" />
            <label className="text-caption">Round Trip</label>
          </div>
        </div>
      </div>
      <div className="mobile__search ">
        <div className="flex flex-col justify-start basis-1/3">
          <p>Flying From</p>
          <Select
            defaultValue="jack"
            style={{ width: 120 }}
            onChange={handleChange}
            bordered={false}
          >
            <Option value="Yiminghe">AKR</Option>
            <Option value="jack">LOS</Option>
            <Option value="lucy">PHC</Option>
          </Select>
          <p>Enugu, Nigeria</p>
        </div>
        <div className="mt-10 flex items-center justify-center basis-1/3">
          <ToIcon />
        </div>
        <div className="flex flex-col justify-start basis-1/3">
          <p>Flying To</p>
          <Select
            defaultValue="lucy"
            style={{ width: 120 }}
            onChange={handleChange}
            bordered={false}
          >
            <Option value="jack">LOS</Option>
            <Option value="lucy">PHC</Option>
            <Option value="Yiminghe">AKR</Option>
          </Select>
          <p>Port Harcout, Nigeria</p>
        </div>
      </div>
      <div className="mobile__info">
        <div className="mobile__info__item">
          <p>Travelling On</p>
          <div className="mobile__date">
            <DatePicker open={dateOpen} onChange={onChange} />
          </div>

          <p>Enugu, Nigeria</p>
          <button className="btn btn-white" onClick={displayDate}>
            {" "}
            {dateOpen ? "Close" : "Change"}
          </button>
        </div>

        <div className="mobile__info__item">
          <p>Returning On</p>
          <div className="mobile__date">
            <DatePicker open={false} onChange={onChange} />
          </div>
          <p>Enugu, Nigeria</p>
          <button className="btn btn-white" onClick={displayDate}>
            {" "}
            {dateOpen ? "Close" : "Change"}
          </button>
        </div>

        <div className="mobile__info__item">
          <p>People Travelling</p>
          <div className="mobile__select">
            <Select
              defaultValue="lucy"
              style={{ width: 120 }}
              onChange={handleChange}
              bordered={false}
            >
              <Option value="jack">LOS</Option>
              <Option value="lucy">PHC</Option>
              <Option value="Yiminghe">AKR</Option>
            </Select>
          </div>

          <p>Port harcourt, Nigeria</p>
          <button className="btn btn-white">
            {" "}
            {dateOpen ? "Close" : "Change"}
          </button>
        </div>
      </div>

      <div className="mobile__cta">
        <button className="btn btn-orange w-full">
          <span> Find Flights</span>
        </button>
      </div> 
    </>
  );
};

export default MobileTab1;
