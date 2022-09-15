/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import BaseLayout from "layouts/Base";
import {
  paymentSelector,
  FetchPaymentGateways,
  InitializeGatewayPayment,
} from "redux/reducers/payment";
import {
  retrieveBookingFromState,
  sessionSelector,
} from "redux/reducers/session";
import { useDispatch, useSelector } from "react-redux";
import SkeletonLoader from "components/SkeletonLoader";
import PaymentMark from "assets/svgs/payment-mark.svg";
import PaymentOutline from "assets/svgs/payment-outline.svg";

const PassengerDetails = () => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(1);
  const [totalFare, setTotalFare] = useState();

  const { bookingState, bookingResponse } = useSelector(sessionSelector);

  const { gatewaysLoading, gatewaysResponse, paymentLoading } =
    useSelector(paymentSelector);

  useEffect(() => {
    async function fetchGateways() {
      dispatch(FetchPaymentGateways());
      dispatch(retrieveBookingFromState());
    }
    fetchGateways();
  }, []);

  useEffect(() => {
    async function computeTotalFare() {
      setTotalFare(parseInt(bookingState?.BookingSum?.BalanceDue));
    }
    computeTotalFare();
  }, [bookingState]);

  const handlePayment = async () => {
    if (bookingResponse) {
      const payload = {
        customer_name:
          bookingResponse?.Booking?.BookingContacts[0]?.Names[0]?.FirstName,
        customer_email:
          bookingResponse?.Booking?.BookingContacts[0]?.EmailAddress,
        amount: totalFare * 100,
        pnr: bookingResponse?.Booking?.RecordLocator,
        gateway_type_id: selected,
        payment_origin: "booking",
      };
      console.log("payload", payload);
      // dispatch(InitializeGatewayPayment(payload));
    } else {
      notification.error({
        message: "Error",
        description: "PNR Code Unavailable",
      });
    }
  };

  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  return (
    <BaseLayout>
      <section className="w-full">
        <section className="ga__section bg-normal">
          <div className="ga__section__main standalone">
            <h2 className="text-primary-main font-extrabold text-2xl mb-8">
              Payment
            </h2>

            <section className="flex flex-col rounded-xl pb-12">
              {gatewaysLoading ? (
                <section className="py-10 pl-12">
                  <SkeletonLoader />
                </section>
              ) : (
                <div className="payment-section">
                  {gatewaysResponse ? (
                    <>
                      <section className="flex flex-col ">
                        {gatewaysResponse?.data?.items?.length > 0 ? (
                          gatewaysResponse?.data?.items.map((_gateway, _i) => {
                            return (
                              <div
                                className={`payment-card ${
                                  selected === _gateway?.id ? "active" : ""
                                } `}
                                onClick={() => setSelected(_gateway?.id)}
                              >
                                {selected === _gateway?.id ? (
                                  <figure className="check-payment">
                                    <PaymentMark />
                                  </figure>
                                ) : (
                                  <figure className="check-payment">
                                    <PaymentOutline />
                                  </figure>
                                )}
                                <div className="flex flex-col pointer-events-none">
                                  <figure className="mb-2">
                                    <img src={_gateway?.logo_url} alt="" />
                                  </figure>
                                  <h2 className="mb-3">{_gateway?.name}</h2>
                                  <p>
                                    You will be redirected to our secure payment
                                    checkout.
                                  </p>
                                </div>
                                <div className="flex flex-col items-end pointer-events-none basis-[40%]">
                                  <h6 className="mb-2 md:mb-[10px]">
                                    AMOUNT DUE
                                  </h6>
                                  <h5> ₦ {totalFare?.toLocaleString()}</h5>
                                </div>
                              </div>
                            );
                          })
                        ) : (
                          <p>No Gateways</p>
                        )}

                        <div className="flex justify-end">
                          <button
                            type="button"
                            onClick={handlePayment}
                            className="btn btn-primary"
                          >
                            {paymentLoading ? "Paying" : "Pay"}
                          </button>
                        </div>
                      </section>
                    </>
                  ) : (
                    <p>No response from gateway</p>
                  )}
                </div>
              )}
              {/* <div className="flex items-center px-10">
                <button className="btn btn-outline mr-2">Go Back</button>
                <button className="btn btn-primary">Continue</button>
              </div> */}
            </section>
          </div>
        </section>
      </section>
    </BaseLayout>
  );
};

export default PassengerDetails;
