import * as React from "react";
import PromoIcon from "assets/svgs/promo.svg";
import { format } from "date-fns";

const BookingEnd = ({
  returningDate,
  departureDate,
  fromTo,
  promocode: code,
  type,
  child,
  infant,
  adult,
  passengers,
}) => {
  const [promocode, setPromocode] = React.useState(code);
  const [showPromo, setShowPromo] = React.useState(false);
  const [saveStatus, setSaveStatus] = React.useState(false);

  const promo = React.useRef(null);

  const formatOptionLabel = ({ value, cityName }) => (
    <div className="flex items-center">
      <div>
        <p className=" mb-0">
          {!!cityName ? cityName : ""} {!!value ? `(${value})` : ""} &nbsp;
        </p>
      </div>
    </div>
  );

  const saveVal = () => {
    if (promocode !== null && promocode.length > 1) {
      setSaveStatus(true);
    }
  };

  const clear = () => {
    setSaveStatus(false);
    promo.current.value = null;
    setPromocode(null);
  };

  const appendPromo = (promocode) => {
    if (promocode !== null) {
      return `&promocode=${promocode}`;
    }
    return "";
  };

  const appendReturn = (returningDate) => {
    if (type === "round_trip") {
      return `&return=${format(new Date(returningDate), "yyyy-MM-dd")}&round=1`;
    }
    return "";
  };

  const onSubmit = () => {
    let test = `?origin=${fromTo.from.value}&destination=${
      fromTo.to.value
    }&departure=${format(new Date(departureDate), "yyyy-MM-dd")}${appendReturn(
      returningDate
    )}&adt=${adult}&chd=${child}&inf=${infant}${appendPromo(promocode)}`;

    window.location.replace(`https://dev-ibe.gadevenv.com${test}`);
  };

  return (
    <div className="w-full p-4">
      <div className="flex w-full flex-col justify-start items-start gap-4">
        <div className="grid w-full grid-cols-1 lg:grid-cols-2 gap-4 md:col-span-2">
          <div
            className={`border border-[#D8D7E2] flex items-end  shadow-none rounded-[14px] px-[24px] py-[16px] relative`}
          >
            <img
              src="/images/widget_from.svg"
              alt=""
              className="mx-2 pb-2 block"
            />
            <div className="w-full mx-2 px-2 md:px-0">
              <p className="mb-2 text-xs text-[#979797]">FROM</p>
              {formatOptionLabel(
                fromTo?.from ?? {
                  cityName: "",
                  value: "",
                  country: "",
                  arrivals: [],
                }
              )}
            </div>
            <img
              src="/images/to_from.svg"
              alt=""
              className="absolute right-6 -bottom-7 transform rotate-90 z-[3]"
            />
          </div>

          <div
            className={`border border-[#D8D7E2] flex items-end  shadow-none rounded-[14px] px-[24px] py-[16px]`}
          >
            <img
              src="/images/widget_to.svg"
              alt=""
              className="block mx-2 pb-2 cursor-pointer"
            />
            <div className="w-full mx-2 px-2 md:px-0">
              <p className="mb-2 text-xs text-[#979797]">TO</p>
              {formatOptionLabel(
                fromTo?.to ?? {
                  cityName: "",
                  value: "",
                  country: "",
                }
              )}
            </div>
          </div>
        </div>

        <div
          className={`${
            type === "round_trip" && "lg:grid-cols-2 md:col-span-2"
          } grid w-full grid-cols-1 gap-4 md:col-auto`}
        >
          <div className="rounded-[14px] px-[24px] py-[16px] flex border border-[#D8D7E2]  shadow-none items-end">
            <span className="mr-2 ml-1 pb-1 block">
              <svg
                width="26"
                height="22"
                viewBox="0 0 26 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M25.9158 4.7268V19.9868C25.9158 21.0986 25.0132 21.9991 23.9025 21.9991L12.9579 21.9989H2.01339C0.90152 21.9989 8.39233e-05 21.0984 8.39233e-05 19.9865V4.72656L25.9158 4.7268ZM19.2175 17.2344H22.1969V14.2538H19.2163V17.2344H19.2175ZM19.2175 11.6596H22.1969V8.67902H19.2163V11.6596H19.2175ZM14.0504 17.2344H17.031V14.2538H14.0504V17.2344ZM14.0504 11.6596H17.031V8.67902H14.0504V11.6596ZM8.88441 17.2344H11.865V14.2538H8.88441V17.2344ZM8.88441 11.6596H11.865V8.67902H8.88441V11.6596ZM3.71845 17.2344H6.69903V14.2538H3.71845V17.2344ZM3.71845 11.6596H6.69903V8.67902H3.71845V11.6596Z"
                  fill="#261F5E"
                />
                <path
                  d="M8.39233e-05 3.66582V2.01233C8.39233e-05 0.900466 0.902674 0 2.01339 0L23.9025 0.000237024C25.0143 0.000237024 25.9158 0.900703 25.9158 2.01257V3.66581L8.39233e-05 3.66582Z"
                  fill="#261F5E"
                />
              </svg>
            </span>
            <div className="flex-auto px-4 md:px-0">
              <p className="mb-2 text-xs text-[#979797]">DEPARTING</p>
              <p className="flex justify-start mb-0 items-center text-base font-medium text-primary-main">
                {`
										${format(departureDate, "dd/MM/yyyy")}
										`}
              </p>
            </div>
          </div>

          {type === "round_trip" && (
            <div className="rounded-[14px] px-[24px] py-[16px] border border-[#D8D7E2] flex items-end">
              <span className="mr-2 ml-1 pb-1 block">
                <svg
                  width="26"
                  height="22"
                  viewBox="0 0 26 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M25.9158 4.7268V19.9868C25.9158 21.0986 25.0132 21.9991 23.9025 21.9991L12.9579 21.9989H2.01339C0.90152 21.9989 8.39233e-05 21.0984 8.39233e-05 19.9865V4.72656L25.9158 4.7268ZM19.2175 17.2344H22.1969V14.2538H19.2163V17.2344H19.2175ZM19.2175 11.6596H22.1969V8.67902H19.2163V11.6596H19.2175ZM14.0504 17.2344H17.031V14.2538H14.0504V17.2344ZM14.0504 11.6596H17.031V8.67902H14.0504V11.6596ZM8.88441 17.2344H11.865V14.2538H8.88441V17.2344ZM8.88441 11.6596H11.865V8.67902H8.88441V11.6596ZM3.71845 17.2344H6.69903V14.2538H3.71845V17.2344ZM3.71845 11.6596H6.69903V8.67902H3.71845V11.6596Z"
                    fill="#261F5E"
                  />
                  <path
                    d="M8.39233e-05 3.66582V2.01233C8.39233e-05 0.900466 0.902674 0 2.01339 0L23.9025 0.000237024C25.0143 0.000237024 25.9158 0.900703 25.9158 2.01257V3.66581L8.39233e-05 3.66582Z"
                    fill="#261F5E"
                  />
                </svg>
              </span>

              <div className="flex-auto px-4 md:px-0">
                <p className="mb-2 text-xs text-[#979797]">RETURNING</p>
                <p className="flex justify-start items-center text-base font-medium text-primary-main mb-0">
                  {`
										${format(returningDate, "dd/MM/yyyy")}
										`}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-3 w-full">
          <div className="rounded-[14px] px-[24px] py-[16px] flex flex-auto  shadow-none border border-[#D8D7E2] relative">
            <div className="px-0">
              <p className="mb-2 text-xs text-[#979797]">PASSENGERS</p>
              <div className="flex items-center relative">
                <span className="mr-2 pb-1 block">
                  <svg
                    width="18"
                    height="17"
                    viewBox="0 0 18 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 0.5C7.63608 0.5 6.32799 0.991931 5.36341 1.86753C4.39898 2.74327 3.85714 3.93087 3.85714 5.16917C3.85714 6.40747 4.39898 7.59508 5.36341 8.47081C6.32799 9.34642 7.63608 9.83835 9 9.83835C10.3639 9.83835 11.672 9.34642 12.6366 8.47081C13.601 7.59508 14.1429 6.40747 14.1429 5.16917C14.1429 3.93087 13.601 2.74327 12.6366 1.86753C11.672 0.991931 10.3639 0.5 9 0.5ZM4.83649 9.60255C1.96343 10.9672 0 13.6944 0 16.8421H18C18 13.6943 16.0366 10.967 13.1635 9.60255C12.0394 10.4748 10.5855 11.0058 9 11.0058C7.41453 11.0058 5.96064 10.4748 4.83649 9.60255Z"
                      fill="#261F5E"
                    />
                  </svg>
                </span>

                <div className="w-1/6 text-center">
                  <span>{passengers}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {showPromo ? (
          <>
            <div className="relative">
              <PromoIcon className="absolute top-3 left-2" />

              <input
                type="text"
                ref={promo}
                className="rounded h-10 pl-8 border border-[#EFEFEF]"
                placeholder="Enter Promo Code"
                onChange={(e) => setPromocode(e.target.value)}
              />
              {saveStatus && (
                <img
                  onClick={() => clear()}
                  role="button"
                  src="/images/clear-promo.svg"
                  alt=""
                  className="absolute right-3 bottom-2.5 invisible lg:visible z-10"
                />
              )}
            </div>
            <button
              className="btn btn-outline font-title text-primary-main py-2 rounded-lg mx-2 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => saveVal()}
              disabled={saveStatus}
            >
              Apply
            </button>
          </>
        ) : (
          <button
            className="items-center flex"
            onClick={() => setShowPromo(true)}
          >
            <figure className="mr-2">
              <PromoIcon />
            </figure>
            <span className="text-primary text-sm">Use promo code</span>
          </button>
        )}
      </div>
      <div className="w-full my-4">
        <button
          className="btn btn-primary w-full md:w-auto font-title block h-full"
          onClick={() => onSubmit()}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default BookingEnd;
