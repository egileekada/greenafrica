/* eslint-disable @next/next/no-img-element */
import BaseLayout from "layouts/Base";
import IbeSidebar from "containers/IbeSidebar";

import PaystackIcon from "assets/svgs/paystack.svg";
import FlutterwaveIcon from "assets/svgs/flutterwave.svg";
import PaymentMark from "assets/svgs/payment-mark.svg";
import PaymentOutline from "assets/svgs/payment-outline.svg";
import { useState } from "react";

const TripPayment = () => {
  const [selected, setSelected] = useState(1);

  return (
    <BaseLayout>
      <section className="w-full">
        <section className="ga__section">
          <div className="ga__section__main payment-section">
            <div className="mb-8">
              <h2 className="text-black font-extrabold text-2xl mb-4">
                Payment
              </h2>
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
                  <p>You will be redirected to our secure payment checkout.</p>
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
                  <p>You will be redirected to our secure payment checkout.</p>
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
      </section>
    </BaseLayout>
  );
};

export default TripPayment;
