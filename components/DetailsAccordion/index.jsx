/* eslint-disable @next/next/no-img-element */
import { useState, useRef } from "react";
import ArrowIcon from "assets/svgs/cad.svg";

const DetailsAccordion = ({ children, title }) => {
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
    <section className="basis-full md:basis-[45%] flex flex-col mb-4 py-5">
      <button
        className={`py-4 flex items-center justify-between mx-5 px-5 border rounded-[14px]  border-[#D8D7E2]`}
        onClick={toggleAccordion}
      >
        <p
          className={`inline-block text-[#26205E] text-base font-body text-left`}
        >
          {title}
        </p>
        <ArrowIcon className={`w-10 ml-4 ${rotate}`} />
      </button>
      <div
        ref={contentSpace}
        style={{ maxHeight: `${height}` }}
        className="overflow-auto transition-max-height duration-700 ease-in-out scrollable"
      >
        <div className="px-4 md:px-10 pt-4 md:pt-10">
          {" "}
          <p className="text-[#4B4F63] font-body text-sm">{children}</p>
        </div>
      </div>
    </section>
  );
};

export default DetailsAccordion;
