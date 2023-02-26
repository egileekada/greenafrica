/* eslint-disable @next/next/no-img-element */

import GoCheckinPassengerItem from "./GoCheckinPassengerItem";
import ReturnCheckinPassengerItem from "./ReturnCheckinPassengerItem";

const CheckinPassengerItem = ({
  passenger,
  selectedSSRs,
  setSSRs,
  setReturnSSRs,
  selectedReturnSSRs,
}) => {


  console.log(passenger);

  const _passengerType =
    passenger?.type === "ADT"
      ? "ADULT"
      : passenger?.type === "CHD"
      ? "CHILD"
      : "INFANT";

  // return parseInt(passenger?.journey) === 0 ? (
  //       <GoCheckinPassengerItem
  //         passenger={passenger}
  //         selectedSSRs={selectedSSRs}
  //         setSSRs={setSSRs}
  //         setReturnSSRs={setReturnSSRs}
  //         selectedReturnSSRs={selectedReturnSSRs}
  //       /> 
  // ) : (
  //   <ReturnCheckinPassengerItem
  //     passenger={passenger}
  //     selectedSSRs={selectedSSRs}
  //     setSSRs={setSSRs}
  //     setReturnSSRs={setReturnSSRs}
  //     selectedReturnSSRs={selectedReturnSSRs}
  //   />
  // );

  return(
    <GoCheckinPassengerItem
      passenger={passenger}
      selectedSSRs={selectedSSRs}
      setSSRs={setSSRs}
      setReturnSSRs={setReturnSSRs}
      selectedReturnSSRs={selectedReturnSSRs}
    />  
);
};

CheckinPassengerItem.defaultProps = {
  passenger: {},
  selectedSSRs: [],
  selectedReturnSSRs: [],
};

export default CheckinPassengerItem;
