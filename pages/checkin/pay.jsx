/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import BaseLayout from "layouts/Base";
import IbeSidebar from "containers/IbeSidebar";
import PaymentMark from "assets/svgs/payment-mark.svg";
import PaymentOutline from "assets/svgs/payment-outline.svg";
import { useDispatch, useSelector } from "react-redux";
import { GetBookingCommit, sessionSelector } from "redux/reducers/session";
import {
  paymentSelector,
  FetchPaymentGateways,
  InitializeGatewayPayment,
} from "redux/reducers/payment";
import Spinner from "components/Spinner";
import { notification } from "antd";
import { useRouter } from "next/router";

const CheckinPayment = () => {
  const router = useRouter();

  const dispatch = useDispatch();
  const [totalFare, setTotalFare] = useState();
  const [selected, setSelected] = useState(1);
  const {
    bookingCommitLoading,
    bookingCommitResponse,
    sessionContact,
    contactsResponse,
    sellSSRResponse,
    bookingResponse,
    assignSeatResponse,
  } = useSelector(sessionSelector);

  const { gatewaysLoading, gatewaysResponse, paymentLoading } =
    useSelector(paymentSelector);
  //
  console.log(assignSeatResponse.Success.PNRAmount.BalanceDue);
  //   useEffect(() => {
  //     async function _getBookingCommit() {
  //       if (sellSSRResponse) {
  //         const _recordLocator =
  //           bookingCommitResponse?.BookingUpdateResponseData?.Success
  //             ?.RecordLocator;
  //         console.log("record locator", _recordLocator);
  //         if (!_recordLocator || _recordLocator?.length < 1) {
  //           dispatch(GetBookingCommit());
  //         }
  //       }
  //     }
  //     _getBookingCommit();
  //   }, [sellSSRResponse]);

  useEffect(() => {
    async function fetchGateways() {
      dispatch(FetchPaymentGateways());
    }
    fetchGateways();
  }, []);

  //   useEffect(() => {
  //     async function computeTotalFare() {
  //       if (sellSSRResponse) {
  //         setTotalFare(
  //           parseInt(
  //             sellSSRResponse?.BookingUpdateResponseData?.Success?.PNRAmount
  //               ?.BalanceDue
  //           )
  //         );
  //       } else if (contactsResponse) {
  //         setTotalFare(
  //           parseInt(
  //             contactsResponse?.BookingUpdateResponseData?.Success?.PNRAmount
  //               ?.BalanceDue
  //           )
  //         );
  //       } else {
  //         notification.error({
  //           message: "Error",
  //           description: "Unable to fetch total flight cost, Redirecting in 3s",
  //         });
  //         // setTimeout(() => {
  //         //   router.push("/");
  //         // }, 3000);
  //       }
  //     }
  //     computeTotalFare();
  //   }, [sellSSRResponse, contactsResponse]);

  const handlePayment = async () => {
    if (bookingCommitResponse) {
      const payload = {
        customer_name: `${bookingResponse?.Booking.BookingContacts[0].Names[0].FirstName} ${bookingResponse?.Booking.BookingContacts[0].Names[0].LastName}`,
        customer_email:
          bookingResponse?.Booking?.BookingContacts[0].EmailAddress,
        amount: totalFare * 100,
        pnr: bookingResponse?.Booking.RecordLocator,
        gateway_type_id: selected,
        payment_origin: "checkin",
      };
      dispatch(InitializeGatewayPayment(payload));
    } else {
      notification.error({
        message: "Error",
        description: "PNR Code Unavailable, Redirecting in 3s",
      });
      setTimeout(() => {
        router.push("/");
      }, 3000);
    }
  };

  return (
    <BaseLayout>
      <section className="w-full">
        {bookingCommitLoading && <p>Saving booking details...</p>}
        {gatewaysLoading ? (
          <section className="py-10 pl-12">
            <Spinner />
          </section>
        ) : (
          <section className="ga__section">
            <div className="ga__section__main payment-section">
              {gatewaysResponse ? (
                <>
                  <div className="mb-8">
                    <h2 className="text-black font-bold text-2xl mb-4">
                      Payment
                    </h2>
                    <p>Please choose your preferred payment method</p>
                  </div>

                  <section className="flex flex-col">
                    {gatewaysResponse?.data?.items?.length > 0 ? (
                      gatewaysResponse?.data?.items.map((_gateway, _i) => {
                        return (
                          <div
                            className={`payment-card ${
                              selected === _gateway?.id ? "active" : ""
                            } `}
                            key={_i}
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
                            <div className="flex flex-col items-end pointer-events-none">
                              <h6 className="mb-[10px]">AMOUNT DUE</h6>
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
            <div className="ga__section__side">
              <IbeSidebar />
            </div>
          </section>
        )}
      </section>
    </BaseLayout>
  );
};

export default CheckinPayment;
