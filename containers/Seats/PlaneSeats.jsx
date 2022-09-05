/* eslint-disable @next/next/no-img-element */
import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Popover } from "antd";
import XIcon from "assets/svgs/seats/x.svg";
import EmergrncyIcon from "assets/svgs/seats/emergency.svg";
import CaretLeft from "assets/svgs/seats/caretleft.svg";
import CaretRight from "assets/svgs/seats/caretright.svg";

import {
  sessionSelector,
  tryAssignSeat,
  trySaveSeat,
} from "redux/reducers/session";

const PlaneSeats = forwardRef(
  (
    {
      data,
      pasengerState,
      passengerNumber,
      pasengerCount,
      setSeatSelected,
      selectedSeat,
      setSelectedSeat,
      ticketIndex,
    },
    ref
  ) => {
    const dispatch = useDispatch();
    const {
      signature,
      sessionLoading,
      bookingResponseLoading,
      bookingResponse,
      bookingState,
    } = useSelector(sessionSelector);

    const [key] = useState(Math.random());
    const [segmentSeatRequests, setSegmentSeatRequests] = useState([]);
    const [selected, setSelected] = useState(0);

    // const [selectedSeat, setSelectedSeat] = useState([]);

    const setSeat = (seat) => {
      //TODO pass journey type to this component
      //TODO watch for situation where not all users select seat

      if (passengerNumber === null) {
        alert("Kindly choose a passenger");
      } else {
        setSeatSelected(true);

        const { PropertyList, SeatDesignator } = seat;

        setSelected(SeatDesignator);
        setSelectedSeat(
          selectedSeat.map((item) =>
            passengerNumber == parseInt(item.passengerNumber)
              ? { ...item, seatDesignator: SeatDesignator }
              : item
          )
        );

        const TypeCode = PropertyList.filter(
          (list) => list.TypeCode === "WINDOW" || list.TypeCode === "AISLE"
        );

        const newItems = segmentSeatRequests.map((item, index) => {
          if (passengerNumber == index) {
            const newItem = { ...item };
            newItem.flightDesignator =
              bookingState?.Journeys[ticketIndex].Segments[0].FlightDesignator;
            newItem.unitDesignator = SeatDesignator;
            newItem.std = bookingState?.Journeys[ticketIndex].Segments[0].STD;
            newItem.departureStation =
              bookingState?.Journeys[ticketIndex].Segments[0].DepartureStation;
            newItem.arrivalStation =
              bookingState?.Journeys[ticketIndex].Segments[0].ArrivalStation;
            newItem.passengerSeatPreferences[0].propertyTypeCode =
              TypeCode[0].TypeCode;
            newItem.passengerSeatPreferences[0].propertyCode =
              PropertyList[PropertyList.length - 1].TypeCode;
            return {
              ...item,
              ...newItem,
            };
          }
          return item;
        });

        setSegmentSeatRequests(newItems);
      }
    };

    const tidyData = (data) => {
      const newArray = [];

      for (let i = 0; i < data.length; i += 4) {
        newArray.push(data.slice(i, i + 4));
      }

      return newArray;
    };

    const mapSeatGroup = (value) => {
      switch (value) {
        case (value = 1):
          return "₦2,500";
          break;
        case (value = 2):
          return "₦2,500";
          break;
        case (value = 3):
          return "₦2,000";
          break;
        case (value = 4):
          return "₦1,000";
          break;
        case (value = 5):
          return "₦2,500";
          break;
        case (value = 6):
          return "₦5,000";
          break;
      }
    };

    const mapClass = (
      SeatAvailability,
      SeatGroup,
      SeatDesignator,
      propertylist
    ) => {
      let seatCode;
      switch (SeatGroup) {
        case (SeatGroup = 1):
          seatCode = "bg-[#292053]";
          break;
        case (SeatGroup = 2):
          seatCode = "bg-[#ADFFCB]";
          break;
        case (SeatGroup = 3):
          seatCode = "bg-[#B9B5D6]";
          break;
        case (SeatGroup = 4):
          seatCode = "bg-[#777093]";
          break;
        case (SeatGroup = 5):
          seatCode = "bg-[#ADFFCB]";
          break;
        case (SeatGroup = 6):
          seatCode = "bg-[#584CB6]";
          break;
      }

      // return SeatAvailability === 14 ||
      //   SeatAvailability === 12 ||
      //   SeatAvailability === 1 ||
      //   SeatAvailability === 8
      //   ? "seats__item unavailable w-[38px]"
      //   : `seats__item w-[38px] ${seatCode}`;

      if (selectedSeat.some((el) => el.seatDesignator === SeatDesignator)) {
        return "seats__item bg-[#292053] w-[38px]";
      } else {
        return SeatAvailability === 12 ||
          SeatAvailability === 1 ||
          SeatAvailability === 8 ||
          SeatAvailability === 14 ||
          propertylist.filter((list) => list.TypeCode === "RESTRICT").length > 0
          ? "seats__item unavailable w-[38px]"
          : `seats__item w-[38px] ${seatCode}`;
      }
    };

    const content = (
      propertylist,
      seatAvailability,
      seatGroup,
      SeatDesignator
    ) => {
      return (
        <div className="text-primary-main text-base p-2">
          <p className="mb-2 font-light">
            <span className="font-semibold">{SeatDesignator}</span> Front Seat
          </p>

          <p className="font-semibold mb-2 text-base">
            {mapSeatGroup(seatGroup)}
          </p>
          {propertylist.filter((list) => list.TypeCode === "INFANT").length >
            0 && <p className="font-light">Customer with infant</p>}
        </div>
      );
    };

    const detectPassengerState = (
      seatAvailability,
      propertylist,
      pasengerState,
      SeatDesignator
    ) => {
      if (pasengerState == 1) {
        if (
          propertylist.filter((list) => list.TypeCode === "INFANT").length >
            0 &&
          (seatAvailability !== 12) &
            (seatAvailability !== 1) &
            (seatAvailability !== 8)
        ) {
          if (selectedSeat.some((el) => el.seatDesignator === SeatDesignator)) {
            return <span className="text-white">{SeatDesignator}</span>;
          } else {
            return "";
          }
        } else
          return (
            <svg
              width="13"
              height="13"
              viewBox="0 0 13 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.634873 12.9998C0.509313 12.9998 0.386567 12.9626 0.28216 12.8928C0.177754 12.8231 0.0963775 12.724 0.0483247 12.608C0.000271907 12.492 -0.0122985 12.3643 0.0122034 12.2412C0.0367053 12.118 0.0971788 12.0049 0.185975 11.9161L11.9162 0.185879C12.0353 0.0668235 12.1968 -6.10352e-05 12.3651 -6.10352e-05C12.5335 -6.10352e-05 12.695 0.0668235 12.814 0.185879C12.9331 0.304934 13 0.466407 13 0.634777C13 0.803146 12.9331 0.96462 12.814 1.08367L1.08377 12.8139C1.02487 12.8729 0.954899 12.9197 0.877864 12.9516C0.800828 12.9835 0.71825 12.9999 0.634873 12.9998Z"
                fill="#BFBFBF"
              />
              <path
                d="M12.3652 12.9997C12.2818 12.9998 12.1992 12.9835 12.1222 12.9516C12.0451 12.9197 11.9752 12.8729 11.9163 12.8139L0.186001 1.08361C0.0669455 0.964558 6.10352e-05 0.803085 6.10352e-05 0.634716C6.10352e-05 0.466346 0.0669455 0.304873 0.186001 0.185818C0.305056 0.0667624 0.466529 -0.00012207 0.634899 -0.00012207C0.803268 -0.00012207 0.964742 0.0667624 1.0838 0.185818L12.8141 11.9161C12.9028 12.0048 12.9633 12.118 12.9878 12.2411C13.0123 12.3642 12.9998 12.4919 12.9517 12.6079C12.9036 12.7239 12.8223 12.823 12.7179 12.8928C12.6135 12.9625 12.4907 12.9997 12.3652 12.9997V12.9997Z"
                fill="#BFBFBF"
              />
            </svg>
          );
      } else {
        if (
          propertylist.filter((list) => list.TypeCode === "RESTRICT").length >
            0 ||
          seatAvailability === 12 ||
          seatAvailability === 1 ||
          seatAvailability === 8
        ) {
          return (
            <svg
              width="13"
              height="13"
              viewBox="0 0 13 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.634873 12.9998C0.509313 12.9998 0.386567 12.9626 0.28216 12.8928C0.177754 12.8231 0.0963775 12.724 0.0483247 12.608C0.000271907 12.492 -0.0122985 12.3643 0.0122034 12.2412C0.0367053 12.118 0.0971788 12.0049 0.185975 11.9161L11.9162 0.185879C12.0353 0.0668235 12.1968 -6.10352e-05 12.3651 -6.10352e-05C12.5335 -6.10352e-05 12.695 0.0668235 12.814 0.185879C12.9331 0.304934 13 0.466407 13 0.634777C13 0.803146 12.9331 0.96462 12.814 1.08367L1.08377 12.8139C1.02487 12.8729 0.954899 12.9197 0.877864 12.9516C0.800828 12.9835 0.71825 12.9999 0.634873 12.9998Z"
                fill="#BFBFBF"
              />
              <path
                d="M12.3652 12.9997C12.2818 12.9998 12.1992 12.9835 12.1222 12.9516C12.0451 12.9197 11.9752 12.8729 11.9163 12.8139L0.186001 1.08361C0.0669455 0.964558 6.10352e-05 0.803085 6.10352e-05 0.634716C6.10352e-05 0.466346 0.0669455 0.304873 0.186001 0.185818C0.305056 0.0667624 0.466529 -0.00012207 0.634899 -0.00012207C0.803268 -0.00012207 0.964742 0.0667624 1.0838 0.185818L12.8141 11.9161C12.9028 12.0048 12.9633 12.118 12.9878 12.2411C13.0123 12.3642 12.9998 12.4919 12.9517 12.6079C12.9036 12.7239 12.8223 12.823 12.7179 12.8928C12.6135 12.9625 12.4907 12.9997 12.3652 12.9997V12.9997Z"
                fill="#BFBFBF"
              />
            </svg>
          );
        } else {
          if (selectedSeat.some((el) => el.seatDesignator === SeatDesignator)) {
            return <span className="text-white">{SeatDesignator}</span>;
          } else {
            return "";
          }
        }
      }
    };

    const mapSeatSelection = () => {
      let i = 0;
      const newArray = [];
      for (i = 0; i < pasengerCount; i++) {
        newArray.push({ passengerNumber: i, seatDesignator: "" });
      }

      setSelectedSeat(newArray);
    };

    useEffect(() => {
      //TODO only generate number of selected passengers and assign respective ids
      const arrayGenerator = () => {
        let i = 0;
        const newArray = [];
        for (i = 0; i < pasengerCount; i++) {
          newArray.push({
            flightDesignator: {
              carrierCode: "",
              flightNumber: "",
              opSuffix: "",
            },
            std: "",
            stdSpecified: true,
            departureStation: "",
            arrivalStation: "",
            unitDesignator: "",
            passengerNumbers: [i],
            compartmentDesignator: "Y",
            passengerSeatPreferences: [
              {
                actionStatusCode: "HK",
                passengerNumber: i,
                passengerNumberSpecified: true,
                propertyTypeCode: "",
                propertyCode: "",
                met: "",
              },
            ],
            passengerIDs: [i],
            requestedSSRs: [""],
          });
        }
        setSegmentSeatRequests(newArray);
      };

      mapSeatSelection();
      arrayGenerator();
    }, []);

    useImperativeHandle(ref, () => ({
      assignSeat() {
        dispatch(tryAssignSeat({ data: segmentSeatRequests }));
      },
      saveSeat() {
        dispatch(trySaveSeat({ data: segmentSeatRequests }));
      },
    }));

    return (
      <div className="plane h-auto w-auto overflow-hidden">
        <section className="cabin xlg:h-[2200px] relative">
          <figure className="cabin__main ">
            <img
              className="h-full w-[300px]"
              src="/images/cabin.png"
              alt="cabin"
            />
          </figure>
          <figure className="cabin__base">
            <img className="h-full w-full" src="/images/base.png" alt="food" />
          </figure>
          <section className="cabin__container ">
            <div className="seats">
              <div className="seats__row">
                <div className="seats__item w-[38px] transparent">
                  <CaretLeft />
                </div>
                <div className="seats__item w-[38px] transparent"></div>
                <div className="seats__item w-[38px] seatRow "></div>
                <div className="seats__item w-[38px] transparent"></div>
                <div className="seats__item w-[38px] transparent">
                  <CaretRight />
                </div>
              </div>
              <div className="seats__row">
                <div className="seats__item w-[38px] row-title">
                  <p>A</p>
                </div>
                <div className="seats__item w-[38px] row-title">
                  <p>B</p>
                </div>
                <div className="seats__item seatRow">
                  <p>&nbsp;</p>
                </div>
                <div className="seats__item w-[38px] row-title">
                  <p>C</p>
                </div>
                <div className="seats__item w-[38px] row-title">
                  <p>D</p>
                </div>
              </div>

              {tidyData(data)
                .splice(0, 18)
                .map((x, cIndex) => {
                  return (
                    <div className="seats__row" key={cIndex - Math.random()}>
                      {x.map((seat, index) => {
                        return (
                          seat.Assignable && (
                            <>
                              <Popover
                                key={index + Math.random()}
                                content={content(
                                  seat.PropertyList,
                                  seat.SeatAvailability,
                                  seat.SeatGroup,
                                  seat.SeatDesignator
                                )}
                                overlayInnerStyle={{
                                  width: 237,
                                  background: "#F7F7FF",
                                  borderRadius: "10px",
                                  border: "1px solid rgba(158, 155, 191, 0.31)",
                                }}
                              >
                                <div
                                  className={`${mapClass(
                                    seat.SeatAvailability,
                                    seat.SeatGroup,
                                    seat.SeatDesignator,
                                    seat.PropertyList
                                  )}`}
                                  key={index}
                                  onClick={() => setSeat(seat)}
                                  role="button"
                                >
                                  <p className="text-sm">
                                    {detectPassengerState(
                                      seat.SeatAvailability,
                                      seat.PropertyList,
                                      pasengerState,
                                      seat.SeatDesignator
                                    )}
                                  </p>
                                </div>
                              </Popover>
                              {index == 1 && (
                                <div className="seats__item seatRow">
                                  <p>{cIndex + 1}</p>
                                </div>
                              )}
                            </>
                          )
                        );
                      })}
                      {cIndex == 17 && (
                        <div className="seats__item unavailable w-[80px]">
                          <svg
                            width="26"
                            height="25"
                            viewBox="0 0 26 25"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M18.6881 9.99469L20.1652 9.90108C20.1677 9.90089 20.1704 9.9007 20.1731 9.90051C21.2258 9.8117 22.1706 9.26024 22.7656 8.38711L23.9334 6.67385C24.9498 5.18233 25.3436 3.38083 25.0419 1.6014C24.9826 1.25192 24.8038 0.929865 24.5387 0.694896C24.2735 0.459735 23.9324 0.320864 23.5783 0.303984C21.7749 0.217669 20.0342 0.824753 18.6754 2.01264L17.1145 3.37738C16.319 4.0727 15.8848 5.07683 15.9227 6.13275C15.9229 6.13525 15.9229 6.13793 15.9231 6.14062L16.0073 7.61814C16.0401 8.19415 15.829 8.76249 15.429 9.17642L3.23403 21.7044C2.90757 22.0449 2.73896 22.5119 2.75949 23.0196C2.78212 23.5786 3.03857 24.1276 3.4456 24.4884C3.8133 24.8142 4.31872 24.9999 4.82396 24.9999C4.87805 24.9999 4.93214 24.9978 4.98604 24.9934C5.49261 24.9529 5.93627 24.7297 6.23665 24.3625L17.2096 10.7566C17.5735 10.3089 18.1125 10.0311 18.6881 9.99469ZM16.6238 10.2824L5.65181 23.8872C5.48417 24.0921 5.22638 24.2183 4.926 24.2423C4.56865 24.2708 4.20229 24.1519 3.94565 23.9244C3.68901 23.6967 3.52712 23.3473 3.51273 22.9892C3.50046 22.6882 3.59464 22.4172 3.77609 22.228L15.9701 9.70102C16.5168 9.13537 16.8045 8.36065 16.76 7.57537L16.6758 6.10168C16.6472 5.27516 16.9877 4.48931 17.6105 3.94476L19.1715 2.58002C20.3829 1.52103 21.9355 0.980312 23.5425 1.05665C23.7254 1.06548 23.9015 1.13721 24.0387 1.25882C24.1758 1.38024 24.2681 1.54673 24.2988 1.72723C24.5677 3.3137 24.2167 4.91955 23.3106 6.24918L22.1428 7.96264C21.6769 8.64625 20.9375 9.0784 20.1134 9.14918L18.6403 9.2424C17.8554 9.29227 17.1208 9.67091 16.6238 10.2824Z"
                              fill="black"
                            />
                            <path
                              d="M24.4446 21.6092L16.2679 14.1618C16.1141 14.0216 15.8758 14.0327 15.7354 14.1865C15.5954 14.3404 15.6065 14.5788 15.7604 14.719L23.935 22.1647C24.1295 22.3445 24.2398 22.6094 24.2457 22.9105C24.2528 23.2688 24.1122 23.6273 23.8696 23.8699C23.6271 24.1124 23.2692 24.2534 22.9101 24.2461C22.609 24.2401 22.3441 24.1298 22.1663 23.9375L14.8801 15.9381C14.7399 15.7841 14.5015 15.7732 14.3477 15.9132C14.1938 16.0534 14.1827 16.2918 14.3229 16.4457L21.6108 24.4469C21.9311 24.7933 22.3872 24.9897 22.8954 24.9997C22.9086 24.9999 22.9216 25.0001 22.9349 25.0001C23.481 25.0001 24.027 24.7786 24.4024 24.403C24.7872 24.0182 25.0103 23.4549 24.9991 22.8957C24.9892 22.3876 24.7929 21.9315 24.4446 21.6092Z"
                              fill="black"
                            />
                            <path
                              d="M4.54744 9.92322C5.17121 10.4979 5.98161 10.8255 6.82942 10.8458C6.83211 10.846 6.83479 10.846 6.83729 10.846L8.3173 10.8506C8.89427 10.8524 9.4488 11.0973 9.83799 11.5214L10.49 12.237C10.5644 12.3188 10.6662 12.3602 10.7687 12.3602C10.8592 12.3602 10.9501 12.3278 11.0222 12.262C11.1763 12.1218 11.1874 11.8833 11.0472 11.7295L10.3942 11.0129C9.86254 10.4333 9.10642 10.0995 8.3198 10.0968L6.84381 10.0922C6.188 10.0755 5.56097 9.82444 5.07511 9.38462L0.786014 4.28588C0.742281 4.23371 0.745542 4.15814 0.793687 4.10999C0.826679 4.07681 0.865424 4.07201 0.885565 4.07201C0.905705 4.07201 0.944451 4.07681 0.977634 4.10999L4.88177 8.01432C5.26769 8.40024 5.89568 8.40024 6.28161 8.01412L6.74042 7.5555V7.55531L7.55504 6.74069C7.55504 6.74069 7.55524 6.74069 7.55524 6.7405L7.55543 6.7403L8.01405 6.28168C8.39997 5.89576 8.39997 5.26777 8.01405 4.88184L4.10992 0.97771C4.05928 0.927072 4.05928 0.844401 4.10992 0.793763C4.15806 0.745618 4.23364 0.742357 4.28581 0.78609L9.38454 5.07538C9.82456 5.56105 10.0756 6.18827 10.0923 6.84388L10.0967 8.32006C10.0994 9.10649 10.4334 9.86261 11.0138 10.3955L11.7124 11.0317C11.8664 11.1719 12.1046 11.1608 12.2448 11.007C12.3849 10.8529 12.3737 10.6147 12.2199 10.4745L11.5225 9.83921C11.0972 9.44907 10.8525 8.89435 10.8506 8.31757L10.846 6.83755C10.846 6.83487 10.846 6.83218 10.8458 6.8295C10.8254 5.98169 10.4978 5.17129 9.92315 4.54751C9.91241 4.53581 9.9009 4.52469 9.88862 4.51433L4.7709 0.209313C4.4172 -0.0883784 3.90391 -0.0661282 3.57706 0.260719C3.23238 0.605404 3.23238 1.16607 3.57706 1.51056L7.4812 5.41489C7.57327 5.50696 7.57327 5.65676 7.4812 5.74883L7.28881 5.94103L2.93756 1.58997C2.79045 1.44266 2.55183 1.44266 2.40471 1.58997C2.25759 1.73709 2.25759 1.97571 2.40471 2.12282L6.75596 6.47407L6.47399 6.75584L2.12275 2.40479C1.97563 2.25767 1.73702 2.25767 1.5899 2.40479C1.44259 2.55191 1.44259 2.79052 1.5899 2.93764L5.94095 7.28889L5.74875 7.48127C5.65668 7.57334 5.50688 7.57334 5.41481 7.48127L1.51049 3.57714C1.34361 3.41026 1.12168 3.31819 0.885565 3.31819C0.649445 3.31819 0.427519 3.41026 0.260643 3.57714C-0.0662041 3.90399 -0.0882625 4.41727 0.209237 4.77117L4.51445 9.8887C4.52461 9.90098 4.53574 9.91248 4.54744 9.92322Z"
                              fill="black"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                  );
                })}

              <div className="seats__row">
                <div className="seats__item w-[38px] transparent">
                  <CaretLeft />
                </div>
                <div className="seats__item w-[38px] transparent"></div>
                <div className="seats__item w-[38px] seatRow "></div>
                <div className="seats__item w-[38px] transparent"></div>
                <div className="seats__item w-[38px] transparent">
                  <CaretRight />
                </div>
              </div>
            </div>
          </section>
          <section className="cabin__legend ">
            <section className="w-[240px] bg-white rounded-xl ">
              <div className="flex flex-col px-[15px] py-6">
                <h2 className="font-header font-semibold text-primary-main text-xl mb-8">
                  LEGEND
                </h2>
                <section className="seats__legend">
                  <div className="seats__legend__item">
                    <figure>
                      <div className="seat-box bg-[#584CB6]"></div>
                    </figure>
                    <p>Extra Legroom Seat</p>
                  </div>
                  <div className="seats__legend__item">
                    <figure>
                      <div className="seat-box bg-[#ADFFCB]"></div>
                    </figure>
                    <p>First Out Seat</p>
                  </div>
                  <div className="seats__legend__item">
                    <figure>
                      <div className="seat-box bg-primary-main"></div>
                    </figure>
                    <p>Front Seat</p>
                  </div>
                  <div className="seats__legend__item">
                    <figure>
                      <div className="seat-box bg-[#777093]"></div>
                    </figure>
                    <p>Standard Seat</p>
                  </div>
                  <div className="seats__legend__item">
                    <figure>
                      <div className="seat-box bg-[#B9B5D6]"></div>
                    </figure>
                    <p>Extra Legroom Seat</p>
                  </div>
                  <div className="seats__legend__item">
                    <figure>
                      <div className="seat-box  bg-gray-200">
                        <XIcon />
                      </div>
                    </figure>
                    <p>Not Available</p>
                  </div>
                  <div className="seats__legend__item">
                    <figure>
                      <div className="seat-box bg-[#292053]">
                        <p className="confirmed-p">XX</p>
                      </div>
                    </figure>
                    <p>Confirmed</p>
                  </div>
                  <div className="seats__legend__item">
                    <figure>
                      <div className="seat-box bg-[#AADEC8]"></div>
                    </figure>
                    <p>Current Selection</p>
                  </div>
                  <div className="seats__legend__item">
                    <figure>
                      <div className="seat-box bg-white">
                        <EmergrncyIcon />
                      </div>
                    </figure>
                    <p>Emergency Exit</p>
                  </div>
                </section>
              </div>
            </section>
          </section>
        </section>
      </div>
    );
  }
);

export default PlaneSeats;
