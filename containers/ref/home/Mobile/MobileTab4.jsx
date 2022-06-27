/* eslint-disable @next/next/no-img-element */
import { useRef, useState } from "react";
import ToIcon from "assets/svgs/ToIcon.svg";
import { Select, DatePicker } from "antd";
import { PORTS } from "lib/common";
import { toast } from "react-hot-toast";
import moment from "moment";

const MobileTab4 = () => {
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
      <div className="mobile__filter__type">
        <p className="text-xl font-display text-[#656B7C] font-normal">
          Search for Aero flight status
        </p>
      </div>
      <div className="mobile__search ">
        <div className="flex flex-col justify-start basis-1/3">
          <p>Flying From</p>
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
        <div className="mt-10 flex items-center justify-center basis-1/3">
          <ToIcon />
        </div>
        <div className="flex flex-col justify-start basis-1/3">
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
      <div className="mobile__info">
        <div className="mobile__info__item">
          <p>Departure Date</p>
          <div className="mobile__date">
            <DatePicker
              open={dateOpen}
              onChange={depChange}
              disabledDate={disabledDate}
            />
          </div>

          <button className="btn btn-white" onClick={displayDate}>
            {" "}
            {dateOpen ? "Close" : "Change"}
          </button>
        </div>
      </div>

      <div className="mobile__cta">
        <button onClick={searchFlight} className="btn btn-orange w-full">
          <span> Find Flights</span>
        </button>
      </div>
    </>
  );
};

export default MobileTab4;
