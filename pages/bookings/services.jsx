/* eslint-disable @next/next/no-img-element */
import { useEffect } from "react";
import BaseLayout from "layouts/Base";
import IbeSidebar from "containers/IbeSidebar";
import PassengerAccordion from "components/PassengerAccordion";
import DetailsAccordion from "components/DetailsAccordion";

import { Checkbox } from "antd";
import PassengerBaggage from "containers/Passenger/PassengerBaggage";

import { useDispatch, useSelector } from "react-redux";
import SkeletonLoader from "components/SkeletonLoader";
import {
  retrieveBookingFromState,
  sessionSelector,
} from "redux/reducers/session";

const PassengerDetails = () => {
  const dispatch = useDispatch();
  const { bookingState } = useSelector(sessionSelector);

  useEffect(() => {
    async function fetchState() {
      dispatch(retrieveBookingFromState());
    }
    fetchState();
  }, []);

  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  return (
    <BaseLayout>
      <section className="w-full">
        <section className="ga__section bg-normal">
          <div className="ga__section__main standalone">
            <h2 className="text-primary-main font-extrabold text-2xl mb-8">
              Additional Services
            </h2>

            <section className="flex flex-col bg-red-500 rounded-xl pb-12">
              <PassengerAccordion title="Michael Johnson"></PassengerAccordion>

              <div className="flex items-center px-10">
                <button className="btn btn-outline mr-2">Go Back</button>
                <button className="btn btn-primary">Continue</button>
              </div>
            </section>
          </div>
        </section>
      </section>
    </BaseLayout>
  );
};

export default PassengerDetails;
