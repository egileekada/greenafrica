import { Fragment } from "react";
import Counter from "components/Counter";

const MealCard = ({ info }) => {
  return (
    <Fragment>
      <section className="meal__card">
        <figure>
          <img src="/images/food.png" alt="food" />
        </figure>
        <p className="font-body text-primary-main text-xs mb-1">Up to 10kg</p>
        <p className="font-header  text-primary-main text-xl mb-3"> ₦3,500</p>
        <Counter />
      </section>
    </Fragment>
  );
};

export default MealCard;
