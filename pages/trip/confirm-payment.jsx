/* eslint-disable @next/next/no-img-element */
import { useState, useEffect, useRef } from "react";
import BaseLayout from "layouts/Base";
import { useDispatch } from "react-redux";
import { setVerifyPaymentResponse } from "redux/reducers/payment";
import SkeletonLoader from "components/SkeletonLoader";
import Spinner from "components/Spinner";
import { useRouter } from "next/router";
import { saveClientSignature } from "redux/reducers/session";
import { useVerifyPaymentQuery } from "services/widgetApi";
import LogoIcon from "assets/svgs/logo.svg";

const ConfirmTripPayment = () => {
  let statusRef = useRef(true);
  const [skip, setSkip] = useState(true);
  const router = useRouter();
  const dispatch = useDispatch();

  const paymentQuery = new URLSearchParams(window.location.search);

  const paystackRef = paymentQuery.get("reference");

  const { data, error, isLoading, isSuccess } = useVerifyPaymentQuery(
    paystackRef,
    {
      skip,
    }
  );

  useEffect(() => {
    async function redirectFromGateway() {
      setSkip(false);
    }
    redirectFromGateway();
  }, []);

  useEffect(() => {
    if (!statusRef.current) {
      dispatch(saveClientSignature(data?.data?.signature));
      dispatch(setVerifyPaymentResponse(data));
      router.push("/trip/confirm");
    }
    return () => {
      statusRef.current = false;
    };
  }, [isSuccess]);

  const ScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    ScrollToTop();
  }, []);

  const goBackToHome = () => {
    window.location.assign("https://dev-website.gadevenv.com/");
  };

  return (
    <BaseLayout>
      <nav className="top__bar logo-holder">
        <button onClick={goBackToHome}>
          <figure className="cursor-pointer">
            <LogoIcon />
          </figure>
        </button>
      </nav>
      <section className="w-full">
        {isLoading ? (
          <section className="py-32 lg:py-12 px-12">
            <SkeletonLoader />
            <SkeletonLoader />
            <SkeletonLoader />
          </section>
        ) : (
          <section className="py-32 lg:py-12 px-12">
            <h2>Redirecting</h2>
            <Spinner />
            <SkeletonLoader />
          </section>
        )}
      </section>
    </BaseLayout>
  );
};

export default ConfirmTripPayment;
