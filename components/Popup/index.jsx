/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react";
import CloseIcon from "assets/svgs/white-close.svg";

const Popup = ({
  children,
  display,
  closeModal,
  flight,
  canClose = true,
  top = false,
  show,
  width,
}) => {
  const activeClass = display ? "active" : "inactive";

  return display ? (
    <div className={`ga__popup rounded-lg ${activeClass} ${top ? "top" : ""}   `}>
      <div
        className={`ga__popup__container rounded-lg ${width ? "w-full" : " max-w-7xl lg:mx-24 "} `}
        onClick={(e) => {
          e.stopPropagation();
          e.nativeEvent.stopImmediatePropagation();
        }}
      >
        {!show && ( 
          <>
            {!flight  && ( 
              <span
                role="button"
                className="ga__popup__close close"
                onClick={closeModal}
              >
                <span className=" ">
                  <CloseIcon />
                </span>
              </span>
            )}
          </>
        )}
        <section
          className={`ga__popup__main overflow-x-hidden bg-opacity-[0.3] lg:px-20 overflow-y-scroll min-h-[600px] scrollable ${activeClass}`}
        >
          {children}
        </section>
      </div>
    </div>
  ) : null;
};

export default Popup;
