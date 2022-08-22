import React from "react";

export default function SamplePrevArrow(props) {
  const { className, onClick, image, alt } = props;
  return (
    <div
      className={className}
      onClick={onClick}
      onKeyDown={onClick}
      tabIndex={0}
      role="button"
    >
      <img
        src={image}
        alt={alt}
        className={`${className} max-w-fit`}
        style={{ width: "3rem", height: "3rem" }}
      />
    </div>
  );
}
5;
