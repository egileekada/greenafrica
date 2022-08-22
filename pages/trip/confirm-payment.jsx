/* eslint-disable @next/next/no-img-element */
import { useEffect } from "react";
import BaseLayout from "layouts/Base";
import { useDispatch, useSelector } from "react-redux";
import { paymentSelector, VerifyGatewayPayment } from "redux/reducers/payment";
import Spinner from "components/Spinner";
import { useRouter } from "next/router";
import { sessionSelector, startSession } from "redux/reducers/session";

const ConfirmTripPayment = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { signature } = useSelector(sessionSelector);
  const { verifyPaymentLoading, verifyPaymentResponse } =
    useSelector(paymentSelector);

  useEffect(() => {
    async function redirectFromGateway() {
      const paymentQuery = new URLSearchParams(window.location.search);

      const paystackRef = paymentQuery.get("reference");
      if (paystackRef && paystackRef.length > 0) {
        const payload = {
          ref: paystackRef,
        };
        console.log("payment refernce", payload);
        dispatch(VerifyGatewayPayment(payload));
      } else {
        router.push("/");
      }
    }
    redirectFromGateway();
  }, []);

  useEffect(() => {
    async function _checkVerifyPayment() {
      if (verifyPaymentResponse) {
        dispatch(startSession());
        if (signature) {
          router.push("/trip/confirm");
        }
      }
    }
    _checkVerifyPayment();
  }, [verifyPaymentResponse, signature]);

  return (
    <BaseLayout>
      <section className="w-full">
        {verifyPaymentLoading ? (
          <Spinner />
        ) : (
          <section className="py-12 px-12">
            <h2>Redirecting</h2>
          </section>
        )}
      </section>
    </BaseLayout>
  );
};

export default ConfirmTripPayment;
