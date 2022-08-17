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
        : "transform duration-700 ease rotate-180"
    );
  };

  return (
    <div className="basis-full md:basis-[45%] flex flex-col border-b-[1px] border-b-faqss md:mb-2 py-5">
      <button
        className={`py-4 box-border appearance-none cursor-pointer focus:outline-none flex items-center justify-between w-full px-4 md:px-10 transition-all  ${
          active ? "bg-primary-main rounded-xl" : ""
        } `}
        onClick={toggleAccordion}
      >
        <p
          className={`font-title inline-block text-base  md:text-lg font-body text-left transition-all w-[80%] md:w-auto mb-0 ${
            active ? "text-green" : "text-[#26205E]"
          }  `}
        >
          {question}
        </p>
        <ArrowIcon className={`w-10 ml-4 ${rotate}`} />
      </button>
      <div
        ref={contentSpace}
        style={{ maxHeight: `${height}` }}
        className="overflow-auto transition-max-height duration-700 ease-in-out"
      >
        <div className="px-3 md:p-5 pt-4">
          {" "}
          <p className="text-[#4B4F63] font-body text-sm leading-7">{answer}</p>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
