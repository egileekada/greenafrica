import { Fragment, useEffect, useState } from "react";
import BaggageIcon from "assets/svgs/baggage.svg";
import Counter from "components/Counter";
import { useSelector, useDispatch } from "react-redux";
import { sessionSelector } from "redux/reducers/session";
import { creditSelector, setNewBookingReturnSSRs } from "redux/reducers/credit";
import { uniqueId } from "lodash";

const BookingReturnBaggageCard = ({
  passenger,
  returnNewSelection,
  setReturnNewSelection,
  selectedReturnSSRs,
  SSRItem,
  schedueIndex,
  ArrivalStation,
  DepartureStation,
  _limit,
}) => {
  const [totalFare, setFare] = useState(0);
  const [value, setValue] = useState(0);
  const [limit, setLimit] = useState(0);
  const [newReturnSSRs, setNewReturnSSRs] = useState([]);
  const { bookingResponse } = useSelector(sessionSelector);
  const { bookingSessionReturnSSRs, newBookingReturnSSRs } =
    useSelector(creditSelector);
  const KG = SSRItem?.SSRCode.substring(1);
  const dispatch = useDispatch();

  useEffect(() => {
    async function mapsessionReturnSSRs() {
      if (newBookingReturnSSRs && newBookingReturnSSRs.length > 0) {
        const passengerSSRs = newBookingReturnSSRs.filter((_ssr) => {
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
    mapsessionReturnSSRs();
  }, []);

  useEffect(() => {
    async function setBaggageLimit() {
      if (bookingSessionReturnSSRs && bookingSessionReturnSSRs.length > 0) {
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
    if (parseInt(schedueIndex) === 1) {
      if (returnNewSelection) {
        handleReturnSSR();
      }
    }
  }, [value]);

  const handleReturnSSR = () => {
    if (value >= 1 && value <= 2) {
      const existingSSRs = returnNewSelection
        ? [...newBookingReturnSSRs]
        : [...selectedReturnSSRs];
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
      setNewReturnSSRs((prevState) => [...cleanedSSRs, ...SSRItemObj]);
      dispatch(setNewBookingReturnSSRs([...cleanedSSRs, ...SSRItemObj]));
    } else {
      const _existingSSRs = returnNewSelection
        ? [...newBookingReturnSSRs]
        : [...selectedReturnSSRs];

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
      setNewReturnSSRs((prevState) => [..._cleanedSSRs, ..._SSRItemObj]);
      // console.log("i am your return guy");
      dispatch(setNewBookingReturnSSRs([..._cleanedSSRs, ..._SSRItemObj]));
    }
  };

  const onValueChange = (e) => {
    setReturnNewSelection(true);
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
    setReturnNewSelection(true);
    setValue((prevVal) => {
      if (prevVal + 1 > 2) {
        return 2;
      } else {
        return prevVal + 1;
      }
    });
  };

  const onValueDecrement = () => {
    setReturnNewSelection(true);
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
          {" "}
          Return Extra Bag Up to {KG}kg
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

BookingReturnBaggageCard.defaultProps = {
  SSRItem: {},
  passenger: {},
  returnNewSelection: false,
  selectedReturnSSRs: [],
  schedueIndex: 0,
  ArrivalStation: "",
  DepartureStation: "",
  _limit: 0,
};

export default BookingReturnBaggageCard;
