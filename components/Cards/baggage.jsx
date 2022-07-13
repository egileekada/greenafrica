import { Fragment } from "react";
import BaggageIcon from "assets/svgs/baggage.svg";
import Counter from "components/Counter";

const BaggageCard = ({ info }) => {
  return (
    <Fragment>
      <section className="baggage__card">
        <figure>
          <BaggageIcon />
        </figure>
        <p className="font-body text-primary-main text-xs mb-1">Up to 10kg</p>
        <p className="font-header  text-primary-main text-xl mb-3"> ₦3,500</p>
        <Counter />
      </section>
    </Fragment>
  );
};

export default BaggageCard;
