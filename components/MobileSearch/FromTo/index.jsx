import * as React from "react";

const FromTo = ({
  values,
  arrivals,
  setArrivals,
  setScreen,
  fromTo,
  setFromTo,
}) => {
  const [show, setShow] = React.useState(true);
  const [origin, setOrigin] = React.useState(
    !!fromTo.from.cityName && !!fromTo.from.value
      ? `${fromTo.from.cityName} ${fromTo.from.value}`
      : "Select Origin"
  );
  const [destination, setDestination] = React.useState(
    !!fromTo.to.cityName && !!fromTo.to.value
      ? `${fromTo.to.cityName} ${fromTo.to.value}`
      : "Select Destination"
  );

  const setDataOrigin = (value) => {
    setFromTo({
      ...fromTo,
      from: value,
      to: { cityName: "", value: "", country: "" },
    });
    setArrivals(value.arrivals);
    setShow(false);
    setOrigin(`${value.cityName} ${value.value}`);
  };

  const setDataDestination = (value) => {
    setFromTo({
      ...fromTo,
      to: value,
    });
    setDestination(`${value.cityName} ${value.value}`);
    setScreen(2);
  };

  const Option = (props) => {
    return (
      <div
        onClick={() =>
          props.origin ? setDataOrigin(props) : setDataDestination(props)
        }
        className="flex cursor-pointer items-center w-full"
      >
        <div>
          <p className="font-bold text-base mb-0">{props.cityName}</p>
          <p className="small mb-0">{props.country}</p>
        </div>
        <div className="text-green bg-primary-main p-1 rounded-lg text-center w-20 ml-auto">
          {props.value}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col w-full justify-start items-center h-full gap-1">
      <div className="relative bg-primary-main w-full p-3 flex justify-center items-center gap-4">
        <div
          onClick={() => setShow(true)}
          className="flex flex-col flex-1 rounded-lg justify-start items-start gap-1 bg-[#EDECFA] py-2 px-4"
        >
          <span className="text-[10px] text-primary-main uppercase">
            DEPARTING
          </span>
          <span
            className={`text-sm font-bold ${
              origin !== "Select Origin"
                ? "text-primary-main"
                : " text-primary-main/50"
            }`}
          >
            {origin}
          </span>
        </div>
        <img
          role="button"
          src="/images/to_from.svg"
          alt=""
          className="absolute  transform left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[3]"
        />
        <div
          onClick={() => setShow(false)}
          className="flex flex-col flex-1 rounded-lg justify-start items-start gap-1 bg-[#EDECFA] py-2 px-4"
        >
          <span className="text-[10px] text-primary-main uppercase">
            ARRIVING
          </span>
          <span
            className={`text-sm font-bold ${
              destination !== "Select Destination"
                ? "text-primary-main"
                : " text-primary-main/50"
            }`}
          >
            {destination}
          </span>
        </div>
      </div>

      <div className="flex flex-col w-full justify-start p-4 items-start h-full overflow-y-auto gap-1">
        {show ? (
          <>
            <p className="text-primary-main text-sm font-semibold">
              Where are you travelling from?
            </p>

            <div className="flex flex-col w-full justify-start mt-4 items-start gap-3">
              {values?.map((item) => (
                <Option
                  value={item.value}
                  cityName={item.cityName}
                  arrivals={item.arrivals}
                  country={item.country}
                  origin
                />
              ))}
            </div>
          </>
        ) : (
          <>
            <p className="text-primary-main text-sm font-semibold">
              Where are you travelling to?
            </p>

            <div className="flex flex-col w-full justify-start mt-4 items-start gap-3">
              {arrivals?.map((item) => (
                <Option
                  value={item.value}
                  cityName={item.cityName}
                  country={item.country}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FromTo;
