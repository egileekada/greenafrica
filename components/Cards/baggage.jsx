import { Fragment, useEffect, useState } from "react";
import BaggageIcon from "assets/svgs/baggage.svg";
import Counter from "components/Counter";
import { notification } from "antd";
import { useSelector } from "react-redux";
import { sessionSelector } from "redux/reducers/session";

const BaggageCard = ({
  passenger,
  selectedSSRs,
  setSSRs,
  SSRItem,
  schedueIndex,
}) => {
  const [totalFare, setFare] = useState(0);
  const [value, setValue] = useState(0);
  const { sessionSSRs, sessionPassengers } = useSelector(sessionSelector);
  const KG = SSRItem?.SSRCode.substring(1);

  useEffect(() => {
    async function mapSessionSSRs() {
      if (sessionSSRs && sessionSSRs.length > 0) {
        const passengerSSRs = sessionSSRs.filter((_ssr) => {
          return (
            _ssr?.passengerNumber === parseInt(passenger?.id) &&
            _ssr?.ssrCode === SSRItem.SSRCode
          );
        });
        setValue(passengerSSRs.length);
      }
    }
    mapSessionSSRs();
  }, []);

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

  useEffect(() => {
    if (parseInt(schedueIndex) === 0) {
      handleFlightSSR();
    }
  }, [value]);

  const handleFlightSSR = () => {
    if (value >= 1 && value <= 2) {
      const existingSSRs = [...selectedSSRs];
      const cleanedSSRs = existingSSRs.filter((_ssr) => {
        const ruleBasis =
          _ssr.ssrCode === SSRItem?.SSRCode &&
          parseInt(_ssr.passengerNumber) === parseInt(passenger?.id);
        return sessionPassengers.length > 1
          ? !ruleBasis
          : _ssr.ssrCode !== SSRItem?.SSRCode;
      });
      const SSRItemObj = new Array(value).fill({
        passengerNumber: passenger?.id,
        ssrCode: SSRItem.SSRCode,
        schedueIndex,
      });
      setSSRs((prevState) => [...cleanedSSRs, ...SSRItemObj]);
    } else {
      const _existingSSRs = [...selectedSSRs];
      const _cleanedSSRs = _existingSSRs.filter((_ssr) => {
        const _ruleBasis =
          _ssr.ssrCode === SSRItem.SSRCode &&
          parseInt(_ssr.passengerNumber) === parseInt(passenger?.id);
        return !_ruleBasis;
      });
      const _SSRItemObj = new Array(value).fill({
        passengerNumber: passenger?.id,
        ssrCode: SSRItem.SSRCode,
        schedueIndex,
      });
      setSSRs((prevState) => [..._cleanedSSRs, ..._SSRItemObj]);
    }
  };

  const onValueChange = (e) => {
    let _val = parseInt(e.target.value);
    if (_val > 2) {
      setValue(2);
    } else if (_val < 0) {
      setValue(0);
    } else {
      setValue(parseInt(_val));
    }
  };

  const onValueIncrement = () => {
    setValue((prevVal) => {
      if (prevVal + 1 > 2) {
        return 2;
      } else {
        return prevVal + 1;
      }
    });
  };

  const onValueDecrement = () => {
    setValue((prevVal) => {
      if (prevVal - 1 < 0) {
        return 0;
      } else {
        return prevVal - 1;
      }
    });
  };

  return (
    <Fragment>
      <section className="baggage__card">
        <figure>
          <BaggageIcon />
        </figure>
        <p className="font-body text-primary-main text-xs mb-1">
          Up to {KG}kg 
        </p>
        <p className="font-header  text-primary-main text-xl mb-3">
          {" "}
          ₦{totalFare.toLocaleString()}
        </p>
        <Counter
          value={value}
          onValueChange={onValueChange}
          onValueDecrement={onValueDecrement}
          onValueIncrement={onValueIncrement}
        />
      </section>
    </Fragment>
  );
};

BaggageCard.defaultProps = {
  SSRItem: {},
  passenger: {},
  selectedSSRs: [],
  schedueIndex: 0,
};

export default BaggageCard;
