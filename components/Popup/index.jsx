/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react";
import CloseIcon from "assets/svgs/white-close.svg";

const Popup = ({
  children,
  display,
  closeModal,
  canClose = true,
  top = false,
}) => {
  const activeClass = display ? "active" : "inactive";

  return display ? (
    <div className={`ga__popup ${activeClass} ${top ? "top" : ""} `}>
      <div
        className={`ga__popup__container`}
        onClick={(e) => {
          e.stopPropagation();
          e.nativeEvent.stopImmediatePropagation();
        }}
      >
        <span
          role="button"
          className="ga__popup__close close"
          onClick={closeModal}
        >
          <span className="modal--close--icon">
            <CloseIcon />
          </span>
        </span>

        <section className={`ga__popup__main overflow-hidden ${activeClass}`}>
          {children}
        </section>
      </div>
    </div>
  ) : null;
};

export default Popup;
