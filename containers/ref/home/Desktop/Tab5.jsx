/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import ToIcon from "assets/svgs/ToIcon.svg";
import { Select, DatePicker } from "antd";
import moment from "moment";
import { PORTS } from "lib/common";
import { toast } from "react-hot-toast";

const Tab5 = () => {
  const { Option } = Select;
  const [dateOpen, setDateOpen] = useState(false);
  const [returnDateOpen, setReturnDateOpen] = useState(false);
  const [params, setParams] = useState({
    depPort: "ABV",
    arrPort: "LOS",
    depDate: null,
    arrDate: null,
  });

  const handleDepPort = (value) => {
    setParams({
      ...params,
      depPort: value,
    });
  };

  const handleArrPort = (value) => {
    setParams({
      ...params,
      arrPort: value,
    });
  };

  const disabledDate = (current) => {
    return current && current.valueOf() < Date.now();
  };

  const depChange = (date) => {
    setParams({
      ...params,
      depDate: moment(date).format("DD/MM/YYYY"),
    });
    setDateOpen(false);
  };

  const returnChange = (date) => {
    setParams({
      ...params,
      arrDate: moment(date).format("DD/MM/YYYY"),
    });
    setReturnDateOpen(false);
  };

  const searchFlight = () => {
    const { depPort, arrPort, depDate, arrDate } = params;
    if (!depPort || !arrPort || !depDate || !arrDate) {
      toast.error("Please fill-in all relevent parameters");
    } else {
      const url = `https://book-flyaero.crane.aero/web/MonthlyAnnualPricesCall.xhtml?tripType=R&depPort=${depPort}&
                 arrPort=${arrPort}&depDate=${depDate}&arrDate=${arrDate}&currency=NGN&language=en`;
      window.location.assign(url);
    }
  };

  const DEPARTURE_STRING =
    PORTS.find((item) => item.value === params.depPort).name + ", Nigeria";
  const ARRIVAL_STRING =
    PORTS.find((item) => item.value === params.arrPort).name + ", Nigeria";

  return (
    <>
      <p className="text-xl font-display text-[#656B7C] font-normal pt-5">
        Check for flight's best prices
      </p>
      {/* <p>{JSON.stringify(params)}</p> */}
      <div className=" mb-4 py-6"></div>
      <div className="filter__search">
        <div className="flex items-center border-r border-primary-main mb-4">
          <div className="flex flex-col basis-1/3">
            <p className="">Flying From</p>
            <Select
              defaultValue="ABV"
              style={{ width: 120 }}
              onChange={handleDepPort}
              bordered={false}
            >
              {PORTS.map((_port, index) => {
                return (
                  <Option key={_port.value + index} value={_port.value}>
                    {_port.name}
                  </Option>
                );
              })}
            </Select>
            <p>{DEPARTURE_STRING}</p>
          </div>
          <div className="flex  items-center justify-center basis-1/3">
            <ToIcon />
          </div>
          <div className="flex flex-col basis-1/3">
            <p>Flying To</p>
            <Select
              defaultValue="LOS"
              style={{ width: 120 }}
              onChange={handleArrPort}
              bordered={false}
            >
              {PORTS.map((_port, index) => {
                return (
                  <Option key={index + _port.value} value={_port.value}>
                    {_port.name}
                  </Option>
                );
              })}
            </Select>
            <p>{ARRIVAL_STRING}</p>
          </div>
        </div>
        <div className="flex items-center justify-between pl-10 mb-4">
          <div className="flex flex-col basis-[45%]">
            <p className="">Travelling On</p>
            <div className="filter__date flex">
              <DatePicker
                open={dateOpen}
                onChange={depChange}
                className="basis-[60%] mr-4"
                disabledDate={disabledDate}
              />
              <button
                className="btn btn-white flex-auto"
                onClick={() => setDateOpen(!dateOpen)}
              >
                {" "}
                {dateOpen ? "Close" : "Change"}
              </button>
            </div>
          </div>
          <div className="flex flex-col basis-[45%]">
            <p className="">Returning On</p>
            <div className="filter__date flex">
              <DatePicker
                open={returnDateOpen}
                onChange={returnChange}
                className="basis-[60%] mr-4"
                disabledDate={disabledDate}
              />
              <button
                className="btn btn-white flex-auto"
                onClick={() => setReturnDateOpen(!returnDateOpen)}
              >
                {" "}
                {returnDateOpen ? "Close" : "Change"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="filter__cta">
        <button className="btn btn-orange" type="button" onClick={searchFlight}>
          <span> Find Flights</span>
        </button>
      </div>
    </>
  );
};

export default Tab5;
