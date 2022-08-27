import { useSelector } from "react-redux";
import { sessionSelector } from "redux/reducers/session";

const ManagePassengerFares = () => {
  const { bookingResponse } = useSelector(sessionSelector);

  const onChange = () => {};

  return (
    <section className="flex flex-col mx-6 mt-10">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center">
          <h6 className="font-display font-bold text-xs text-primary-main">
            Round Trip ABV - LOS
          </h6>
        </div>
        <div></div>
      </div>

      <div className="checkin__row">
        <div className="flex items-center">
          <h6>2 x 10 kg baggage:</h6>
        </div>
        <div>
          <h6> ₦26,501</h6>
        </div>
      </div>

      <div className="checkin__row subrow">
        <div className="flex items-center">
          <h6>1x Seat Selected</h6>
        </div>
        <div>
          <h6> ₦26,501</h6>
        </div>
      </div>

      <div className="checkin__row totalRow">
        <div className="flex items-center">
          <h5>Amount Due</h5>
        </div>
        <div>
          <h6> ₦26,501</h6>
        </div>
      </div>
    </section>
  );
};

export default ManagePassengerFares;
