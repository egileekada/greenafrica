import React, { useState } from "react";
import HomePopup from "../../pages/components/HomePopup";

const Newsletter = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <section className="newsletter">
        <h2 className="text-2xl font-header font-bold">
          Join the gFlyer Community to enjoy exclusive updates.{" "}
        </h2>
        <button
          onClick={() => setOpen(true)}
          className="btn btn-primary"
          target="blank"
          href="https://greenafrica.us18.list-manage.com/subscribe?u=4d7476e759863fa778ec626a2&id=201d65e8c7"
        >
          Join Now
        </button>
      </section>
      {open && <HomePopup show={open} setShow={setOpen} />}
    </>
  );
};

export default Newsletter;
