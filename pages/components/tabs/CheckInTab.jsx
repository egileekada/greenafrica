/* eslint-disable @next/next/no-img-element */
import PromoIcon from "assets/svgs/promo.svg";

const CheckInTab = () => {
  return (
    <section className="flex  items-center justify-between">
      <div className=" basis-[80%] form">
        <div className="form-row-half form-group">
          <label>PNR</label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            placeholder="Enter Booking Reference"
          ></input>
        </div>
        <div className="form-row-half form-group">
          <label>Last Name</label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            placeholder="Enter Last Name"
          ></input>
        </div>
      </div>
      <button className="btn btn-primary h-[60px]">Confirm</button>
    </section>
  );
};

export default CheckInTab;
