import React, { useEffect } from "react";
import BaseLayout from "layouts/Base";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

import { retrieveBookingFromState } from "redux/reducers/session";

import { Link } from "react-router-dom";

const Consent = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    query: { session },
  } = router;

  useEffect(() => {
    dispatch(retrieveBookingFromState());
  }, []);

  return (
    <BaseLayout>
      <div className="w-full px-3.5 py-10 lg:fit-x-bleed bg-[#fff]">
        <div className="container mx-auto my-10">
          <h1 className="text-3xl font-semibold mb-4">
            Agree to Check In Terms & Conditions
          </h1>
          <p className="text-lg font-light">
            Please note that the following items are prohibited
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 md:gap-10 mt-10">
            <div className="p-4 md:p-0 flex flex-row items-center gap-4">
              <img
                src="/images/alert.svg"
                alt="Access the online check-in service"
                className="mx-auto my-2"
              />
              <div className="w-5/6 mx-auto">
                <p className="font-semibold text-lg mb-2">Dangerous Goods</p>
                <p className="font-light">
                  Please note that the following items are prohibited.
                </p>
              </div>
            </div>

            <div className="p-4 md:p-0 flex flex-row items-center gap-4">
              <img
                src="/images/alert.svg"
                alt="download or print your boarding"
                className="mx-auto my-2"
              />
              <div className="w-5/6 mx-auto">
                <p className="font-semibold text-lg mb-2">Dangerous Goods</p>
                <p className="font-light">
                  Please note that the following items are prohibited.
                </p>
              </div>
            </div>

            <div className="p-4 md:p-0 flex flex-row items-center gap-4">
              <img
                src="/images/alert.svg"
                alt="check-in at the airport"
                className="mx-auto my-2"
              />
              <div className="w-5/6 mx-auto">
                <p className="font-semibold text-lg mb-2">Dangerous Goods</p>
                <p className="font-light">
                  Please note that the following items are prohibited.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-10 mt-10">
            <button
              onClick={() => router.back()}
              className="btn btn-outline text-center my-2"
            >
              Go Back
            </button>
            <Link
              href={{
                pathname: "/checkin/seat-selection",
                query: { terms: true },
              }}
            >
              <a className="btn btn-primary text-center my-2">Accept Terms</a>
            </Link>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default Consent;
