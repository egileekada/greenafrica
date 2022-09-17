/* eslint-disable @next/next/no-img-element */
import { useEffect, useState, useRef } from "react";
import BaseLayout from "layouts/Base";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { sessionSelector, startSession } from "redux/reducers/session";
import { useStartCheckInMutation } from "services/bookingApi";

import { useVerifyPaymentQuery } from "services/widgetApi";
import LogoIcon from "assets/svgs/logo.svg";
import SkeletonLoader from "components/SkeletonLoader";
import Spinner from "components/Spinner";

const ConfirmTripPayment = () => {
  const router = useRouter();
  let statusRef = useRef(true);
  const dispatch = useDispatch();

  const [skip, setSkip] = useState(true);

  const paymentQuery = new URLSearchParams(window.location.search);

  const paystackRef = paymentQuery.get("reference");

  const { checkInSelection } = useSelector(sessionSelector);

  const [startCheckin] = useStartCheckInMutation();

  const { data, error, isLoading, isSuccess } = useVerifyPaymentQuery(
    paystackRef,
    {
      skip,
    }
  );

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
      setSkip(false);
    }
    redirectFromGateway();
  }, []);

  useEffect(() => {
    if (!statusRef.current) {
      triggerCheckin(data?.data);
    }
    return () => {
      statusRef.current = false;
    };
  }, [isSuccess]);

  const triggerCheckin = () => {
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
            <SkeletonLoader />
            <SkeletonLoader />
            <SkeletonLoader />
          </section>
        ) : (
          <section className="py-32 lg:py-12 px-12">
            <div className="text-center">
              <h2>Redirecting</h2>
            </div>
            <Spinner />
            <SkeletonLoader />
          </section>
        )}
      </section>
    </BaseLayout>
  );
};

export default ConfirmTripPayment;
