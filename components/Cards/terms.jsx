import { Fragment } from "react";
import DangerIcon from "assets/svgs/danger.svg";

const TermsCard = ({ info }) => {
  return (
    <Fragment>
      <section className="checkin__card">
        <figure className=" bg-[#F2F2F2] w-[85px] h-[85px] rounded-full flex items-center justify-center">
          <DangerIcon />
        </figure>
        <div className="flex flex-col">
          <h6 className="text-sm text-black font-title font-bold">Dangerous Goods</h6>
          <p className="font-body text-black text-sm font-normal">
            Please note that the following items are prohibited. Read More
          </p>
        </div>
      </section>
    </Fragment>
  );
};

export default TermsCard;
