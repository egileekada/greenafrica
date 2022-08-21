import { Fragment, useEffect, useState } from "react";
import BaggageIcon from "assets/svgs/baggage.svg";
import Counter from "components/Counter";

const BaggageCard = ({ passenger, selectedSSRs, setSSRs, SSRItem }) => {
  const [totalFare, setFare] = useState(0);
  const KG = SSRItem?.SSRCode.substring(1);

  useEffect(() => {
    SSRItem.PaxSSRPriceList.map((_priceList) => {
      const totalServiceCharge = _priceList.PaxFee.ServiceCharges.reduce(
        (accumulator, object) => {
          return accumulator + object.Amount;
        },
        0
      );
      setFare(totalServiceCharge);
      return totalServiceCharge;
    });
  }, []);

  return (
    <Fragment>
      <section className="baggage__card">
        <figure>
          <BaggageIcon />
        </figure>
        <p className="font-body text-primary-main text-xs mb-1">Up to {KG}kg</p>
        <p className="font-header  text-primary-main text-xl mb-3">
          {" "}
          ₦{totalFare.toLocaleString()}
        </p>
        <Counter />
      </section>
    </Fragment>
  );
};

BaggageCard.defaultProps = {
  SSRItem: {},
  passenger: {},
  selectedSSRs: [],
};

export default BaggageCard;
