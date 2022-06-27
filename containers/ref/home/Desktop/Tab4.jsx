/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import ToIcon from "assets/svgs/ToIcon.svg";
import { Select } from "antd";
import { DatePicker } from "antd";
import { PORTS } from "lib/common";
import { toast } from "react-hot-toast";
import moment from "moment";

const Tab4 = () => {
  const { Option } = Select;
  const [dateOpen, setDateOpen] = useState(false);
  const [params, setParams] = useState({
    depPort: "ABV",
    arrPort: "LOS",
    depDate: null,
  });

  const disabledDate = (current) => {
    return current && current.valueOf() < Date.now();
  };

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
  const depChange = (date) => {
    setParams({
      ...params,
      depDate: moment(date).format("DD/MM/YYYY"),
    });
    setDateOpen(false);
    setDateOpen(false);
  };

  const displayDate = () => {
    setDateOpen(!dateOpen);
  };

  const searchFlight = () => {
    const { depPort, arrPort, depDate } = params;

    if (!depPort || !arrPort || !depDate) {
      toast.error("Please fill-in all relevent parameters");
    } else {
      const url = `https://book-flyaero.crane.aero/web/ActualFlightList.xhtml?depPort=${depPort}&arrPort=${arrPort}&depDate=${depDate}
                 &language=en`;
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
        Search for Aero flight status
      </p>
      {/* <p>{JSON.stringify(params)}</p> */}

      <div className=" mb-4 py-6"></div>
      <div className="filter__search">
        <div className="flex items-center border-r border-primary-main  mb-4">
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
                  <Option key={_port.value + index} value={_port.value}>
                    {_port.name}
                  </Option>
                );
              })}
            </Select>
            <p>{ARRIVAL_STRING}</p>
          </div>
        </div>
        <div className="flex items-center pl-10 mb-4">
          <div className="flex flex-col basis-[45%]">
            <p className="">Departure Date</p>
            <div className="filter__date flex flex-col">
              <DatePicker
                open={dateOpen}
                onChange={depChange}
                className="basis-[60%] mr-4"
                disabledDate={disabledDate}
              />
              <button
                className="btn btn-white flex-auto self-start mt-2"
                onClick={displayDate}
              >
                {" "}
                {dateOpen ? "Close" : "Change"}
              </button>
            </div>
          </div>
          <div className="flex flex-col basis-1/2">
            <button onClick={searchFlight} className="btn btn-orange">
              <span> Search </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tab4;
