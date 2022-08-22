import { Fragment } from "react";

const ContactCard = ({ info, Component }) => {
  return (
    <Fragment>
      <section className="contact__card">
        <figure>
          <Component />
        </figure>
        <div className="flex flex-col font-body font-normal">
          <h5 className="text-[#7A7794] text-xs pb-2">{info?.title}</h5>
          <h4 className="text-[#0E0E0E] text-sm sm:text-lg pb-2">
            {info?.description}
          </h4>
          <h5 className="text-[#222222] text-sm">{info?.icons}</h5>
        </div>
      </section>
    </Fragment>
  );
};

export default ContactCard;
