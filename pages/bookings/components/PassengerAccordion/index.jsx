/* eslint-disable @next/next/no-img-element */
import { useState, useRef, useEffect } from "react";
import ArrowIcon from "assets/svgs/cad.svg";
import { capitalizeName, capitalizeWord } from "lib/utils";

const PassengerAccordion = ({ children, passenger }) => {
  const [active, setActive] = useState(false);
  const [height, setHeight] = useState("0px");
  const [rotate, setRotate] = useState("transform duration-700 ease");

  const contentSpace = useRef(null);

  useEffect(() => {
    toggleAccordion();
  }, []);

  const toggleAccordion = () => {
    setActive(active === false ? true : false);
    setHeight(active ? "0px" : `max-content`);
    setRotate(
      active
        ? "transform duration-700 ease"
        : "transform duration-700 ease rotate-180"
    );
  };

  const _passengerName = `${passenger?.Names[0]?.FirstName}  ${passenger?.Names[0]?.LastName} `;

  const _passengerType =
    passenger?.PassengerTypeInfo?.PaxType === "ADT"
      ? "ADULT"
      : passenger?.PassengerTypeInfo?.PaxType === "CHD"
      ? "CHILD"
      : "INFANT";

  return (
    <section className="basis-full md:basis-[45%] flex flex-col bg-white mb-8 rounded-md">
      <button
        className={`py-7 flex items-center justify-between w-full px-10`}
        onClick={toggleAccordion}
      >
        <div className="flex flex-col">
          <p className={`inline-block title-text mb-2 text-[12px]`}>
            {_passengerType}
            {/* {passenger?.typeCount} */}
          </p>
          <p
            className={`inline-block text-black font-display text-base font-bold `}
          >
            {_passengerName && capitalizeName(_passengerName)}
          </p>
        </div>

        <ArrowIcon className={`w-10 ${rotate}`} />
      </button>
      {active && (
        <div
          ref={contentSpace}
          style={{ maxHeight: `${height}` }}
          className="overflow-auto transition-max-height duration-700 ease-in-out scrollable"
        >
          <div className=" border-b-[1px] border-b-faqss"></div>

          <div className="px-4 md:px-10 py-4">{children}</div>
        </div>
      )}
    </section>
  );
};

PassengerAccordion.defaultProps = {
  passenger: {},
};

export default PassengerAccordion;
