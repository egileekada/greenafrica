/* eslint-disable @next/next/no-img-element */
import { useEffect } from "react";
import BaseLayout from "layouts/Base";
import IbeSidebar from "containers/IbeSidebar";

import PaystackIcon from "assets/svgs/paystack.svg";
import FlutterwaveIcon from "assets/svgs/flutterwave.svg";
import PaymentMark from "assets/svgs/payment-mark.svg";
import PaymentOutline from "assets/svgs/payment-outline.svg";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  PaymentToBooking,
  GetBookingCommit,
  sessionSelector,
} from "redux/reducers/session";
import { Spin } from "antd";
import { useRouter } from "next/router";

const TripPayment = () => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(1);
  const {
    paymentBookingLoading,
    paymentBookingResponse,
    bookingCommitLoading,
    bookingCommitResponse,
  } = useSelector(sessionSelector);
  const router = useRouter();

  useEffect(() => {
    async function redirectFromGateway() {
      const payload = {
        ref: "BLJK136H9B5IYTAROAA",
      };
      dispatch(PaymentToBooking(payload));
    }
    redirectFromGateway();
  }, []);

  useEffect(() => {
    async function _getBookingCommit() {
      if (paymentBookingResponse) {
        dispatch(GetBookingCommit());
      }
    }
    _getBookingCommit();
  }, [paymentBookingResponse]);

  useEffect(() => {
    async function _redirrectForComfirmation() {
      if (bookingCommitResponse) {
        router.push("/trip/confirm");
      }
    }
    _redirrectForComfirmation();
  }, [bookingCommitResponse]);

  return (
    <BaseLayout>
      <section className="w-full">
        {bookingCommitLoading && <p>Saving booking details...</p>}
        {paymentBookingLoading ? (
          <Spin />
        ) : (
          <section className="ga__section">
            <div className="ga__section__main payment-section">
              <div className="mb-8">
                <h2 className="text-black font-bold text-2xl mb-4">Payment</h2>
                <p>Please choose your preferred payment method</p>
              </div>

              <section className="flex flex-col">
                <div
                  className={`payment-card ${selected === 1 ? "active" : ""} `}
                  onClick={() => setSelected(1)}
                >
                  {selected === 1 ? (
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
                      <PaystackIcon />
                    </figure>
                    <h2 className="mb-3">Paystack</h2>
                    <p>
                      You will be redirected to our secure payment checkout.
                    </p>
                  </div>
                  <div className="flex flex-col items-end pointer-events-none">
                    <h6 className="mb-[10px]">AMOUNT DUE</h6>
                    <h5> ₦26,501</h5>
                  </div>
                </div>
                <div
                  className={`payment-card ${selected === 2 ? "active" : ""} `}
                  onClick={() => setSelected(2)}
                >
                  {selected === 2 ? (
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
                      <FlutterwaveIcon />
                    </figure>
                    <h2 className="mb-3">Flutterwave</h2>
                    <p>
                      You will be redirected to our secure payment checkout.
                    </p>
                  </div>
                  <div className="flex flex-col items-end pointer-events-none">
                    <h6 className="mb-[10px]">AMOUNT DUE</h6>
                    <h5> ₦26,501</h5>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button className="btn btn-primary">Pay</button>
                </div>
              </section>
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

export default TripPayment;
