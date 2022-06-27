/* eslint-disable @next/next/no-img-element */
import { useState, useRef } from "react";
import ArrowIcon from "assets/svgs/arrow.svg";
const Accordion = ({ item: { question, answer } }) => {
  const [active, setActive] = useState(false);
  const [height, setHeight] = useState("0px");
  const [rotate, setRotate] = useState("transform duration-700 ease");

  const contentSpace = useRef(null);

  const toggleAccordion = () => {
    setActive(active === false ? true : false);
    setHeight(active ? "0px" : `${contentSpace.current.scrollHeight}px`);
    setRotate(
      active
        ? "transform duration-700 ease"
        : "transform duration-700 ease rotate-90"
    );
  };

  return (
    // <div className="basis-full md:basis-[45%] ">
    <div className="fbasis-full md:basis-[45%] lex flex-col border-[2px] border-[#ADADAD] mb-8 rounded p-5">
      <button
        className="py-6 box-border appearance-none cursor-pointer focus:outline-none flex items-center justify-between"
        onClick={toggleAccordion}
      >
        <p className="inline-block text-[#616161] text-caption leading-6 font-normal font-display text-left w-[90%]">
          {question}
        </p>
        <ArrowIcon className={rotate} />
      </button>
      <div
        ref={contentSpace}
        style={{ maxHeight: `${height}` }}
        className="overflow-auto transition-max-height duration-700 ease-in-out"
      >
        <div className="pb-4">
          {" "}
          <p className="text-caption text-[#3B3A40] text-opacity-60">
            {answer}
          </p>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default Accordion;
