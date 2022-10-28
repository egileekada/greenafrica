import React from "react";

const index = ({ touched, message }) => {
  if (!touched) {
    return (
      <>
        <p
          className="small text-danger mb-0 mt-2"
          style={{ fontSize: "80%" }}
        ></p>
      </>
    );
  }
  if (message) {
    return (
      <>
        <p className="small text-red-600 mb-0 mt-2" style={{ fontSize: "80%" }}>
          {message}
        </p>
      </>
    );
  }
  return "";
};

export default index;
