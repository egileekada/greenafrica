import { Fragment, useEffect, useState } from "react";
import BaggageIcon from "assets/svgs/baggage.svg";
import Counter from "components/Counter";
import { useSelector, useDispatch } from "react-redux";
import { sessionSelector } from "redux/reducers/session";
import { bookingSelector, setNewBookingSSRs } from "redux/reducers/booking";
import { uniqueId } from "lodash";

const BoookingBaggageCard = ({
  passenger,
  newSelection,
  setNewSelection,
  selectedSSRs,
  SSRItem,
  schedueIndex,
  ArrivalStation,
  DepartureStation,
  _limit,
}) => {
  const [totalFare, setFare] = useState(0);
  const [value, setValue] = useState(0);
  const [limit, setLimit] = useState(0);
  const [newSSRs, setNewSSRs] = useState([]);
  const { bookingResponse } = useSelector(sessionSelector);
  const { tripParams, bookingSessionSSRs, newBookingSSRs } =
    useSelector(bookingSelector);
  const KG = SSRItem?.SSRCode.substring(1);
  const dispatch = useDispatch();

  useEffect(() => {
    async function mapSessionSSRs() {
      if (newBookingSSRs && newBookingSSRs.length > 0) {
        const passengerSSRs = newBookingSSRs.filter((_ssr) => {
          return (
            parseInt(_ssr?.passengerNumber) ===
              parseInt(passenger?.PassengerNumber) &&
            _ssr?.ssrCode === SSRItem.SSRCode &&
            _ssr?.ArrivalStation.toLowerCase() ===
              ArrivalStation.toLowerCase() &&
            _ssr?.DepartureStation.toLowerCase() ===
              DepartureStation.toLowerCase()
          );
        });
        setValue(passengerSSRs.length);
      }
    }
    mapSessionSSRs();
  }, []);

  useEffect(() => {
    async function setBaggageLimit() {
      if (bookingSessionSSRs && bookingSessionSSRs.length > 0) {
        setLimit(_limit);
      }
    }
    setBaggageLimit();
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
      if (newSelection) {
        handleFlightSSR();
      }
    }
  }, [value]);

  const handleFlightSSR = () => {
    if (value >= 1 && value <= 2) {
      const existingSSRs = newSelection
        ? [...newBookingSSRs]
        : [...selectedSSRs];
      const cleanedSSRs = existingSSRs.filter((_ssr) => {
        const ruleBasis =
          _ssr.ssrCode === SSRItem?.SSRCode &&
          parseInt(_ssr.passengerNumber) ===
            parseInt(passenger?.PassengerNumber);
        return bookingResponse?.Booking?.Passengers?.length > 1
          ? !ruleBasis
          : _ssr.ssrCode !== SSRItem?.SSRCode;
      });
      const unique_id = uniqueId(`${ArrivalStation}${DepartureStation}`);
      const SSRItemObj = new Array(value).fill({
        id: `${Date.now()}${unique_id}`,
        passengerNumber: parseInt(passenger?.PassengerNumber),
        ssrCode: SSRItem.SSRCode,
        schedueIndex,
        ArrivalStation,
        DepartureStation,
      });
      setNewSSRs((prevState) => [...cleanedSSRs, ...SSRItemObj]);
      dispatch(setNewBookingSSRs([...cleanedSSRs, ...SSRItemObj]));
    } else {
      const _existingSSRs = newSelection
        ? [...newBookingSSRs]
        : [...selectedSSRs];
      const _cleanedSSRs = _existingSSRs.filter((_ssr) => {
        const _ruleBasis =
          _ssr.ssrCode === SSRItem.SSRCode &&
          parseInt(_ssr.passengerNumber) ===
            parseInt(passenger?.PassengerNumber);
        return !_ruleBasis;
      });

      const _unique_id = uniqueId(`${ArrivalStation}${DepartureStation}`);
      const _SSRItemObj = new Array(value).fill({
        id: `${Date.now()}${_unique_id}`,
        passengerNumber: parseInt(passenger?.PassengerNumber),
        ssrCode: SSRItem.SSRCode,
        schedueIndex,
        ArrivalStation,
        DepartureStation,
      });
      setNewSSRs((prevState) => [..._cleanedSSRs, ..._SSRItemObj]);
      dispatch(setNewBookingSSRs([..._cleanedSSRs, ..._SSRItemObj]));
    }
  };

  const onValueChange = (e) => {
    setNewSelection(true);
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
    setNewSelection(true);
    setValue((prevVal) => {
      if (prevVal + 1 > 2) {
        return 2;
      } else {
        return prevVal + 1;
      }
    });
  };

  const onValueDecrement = () => {
    setNewSelection(true);
    if (value <= limit) {
      return false;
    } else {
      setValue((prevVal) => {
        if (prevVal - 1 < 0) {
          return 0;
        } else {
          return prevVal - 1;
        }
      });
    }
  };

  return (
    <Fragment>
      <section className="baggage__card">
        <figure>
          <BaggageIcon />
        </figure>
        <p className="font-body text-primary-main text-xs mb-1">
          Go Extra Bag Up to {KG}kg
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

BoookingBaggageCard.defaultProps = {
  SSRItem: {},
  passenger: {},
  newSelection: false,
  selectedSSRs: [],
  schedueIndex: 0,
  ArrivalStation: "",
  DepartureStation: "",
  _limit: 0,
};

export default BoookingBaggageCard;