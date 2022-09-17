/* eslint-disable @next/next/no-img-element */
import { useEffect } from "react";
import BaseLayout from "layouts/Base";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "components/Spinner";
import { useRouter } from "next/router";
import { sessionSelector, startSession } from "redux/reducers/session";
import { useStartCheckInMutation } from "services/bookingApi";

import { useVerifyPaymentQuery } from "services/widgetApi";
import LogoIcon from "assets/svgs/logo.svg";

const ConfirmTripPayment = () => {
  const router = useRouter();

  const dispatch = useDispatch();

  const { checkInSelection } = useSelector(sessionSelector);

  const [startCheckin] = useStartCheckInMutation();
  const [startVerification, { isLoading }] = useVerifyPaymentQuery();

  const ScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    ScrollToTop();
  }, []);

  useEffect(() => {
    async function redirectFromGateway() {
      dispatch(startSession());
      const paymentQuery = new URLSearchParams(window.location.search);

      const paystackRef = paymentQuery.get("reference");
      if (paystackRef && paystackRef.length > 0) {
        const payload = {
          ref: paystackRef,
        };

        startVerification(payload)
          .unwrap()
          .then((data) => {
            triggerCheckin(data?.data);
          })
          .catch((error) => console.log(error));
      } else {
        router.push("/");
      }
    }
    redirectFromGateway();
  }, []);

  const triggerCheckin = (paymentData) => {
    startCheckin(checkInSelection)
      .unwrap()
      .then((data) => {
        router.push("/checkin/confirm");
      })
      .catch((error) => console.error(error));
  };

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
            <Spinner />
          </section>
        ) : (
          <section className="py-32 lg:py-12 px-12">
            <h2>Redirecting</h2>
          </section>
        )}
      </section>
    </BaseLayout>
  );
};

export default ConfirmTripPayment;
