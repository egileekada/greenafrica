import { Fragment, useEffect, useState } from "react";
import BaggageIcon from "assets/svgs/baggage.svg";
import Counter from "components/Counter";
import { useSelector, useDispatch } from "react-redux";
import { sessionSelector, setSessionSSRs } from "redux/reducers/session";

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
  const dispatch = useDispatch();

  useEffect(() => {
    async function mapSessionSSRs() {
      if (sessionSSRs && sessionSSRs.length > 0) {
        const passengerSSRs = sessionSSRs.filter((_ssr) => {
          return (
            parseInt(_ssr?.passengerNumber) === parseInt(passenger?.id) &&
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
      dispatch(setSessionSSRs([...cleanedSSRs, ...SSRItemObj]));
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
      dispatch(setSessionSSRs([..._cleanedSSRs, ..._SSRItemObj]));
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
      <section className=" flex items-center justify-center border-b border-[#261F5E1A] py-2 ">
        {/* <figure>
          <BaggageIcon />
        </figure> */}
        <p className="font-body text-primary-main flex justify-end w-28 text-sm font-medium mr-3 ">{KG}kg Checked</p>
        <Counter
          value={value}
          onValueChange={onValueChange}
          onValueDecrement={onValueDecrement}
          onValueIncrement={onValueIncrement}
        />
        <p className=" text-primary-main md:flex justify-start w-28 hidden font-bold ml-3 ">
          {" "}
          ₦{totalFare.toLocaleString()}
        </p>
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