/* eslint-disable @next/next/no-img-element */
import BaseLayout from "layouts/Base";

import IbeHeader from "containers/IbeHeader";
import IbeTrips from "containers/IbeTrips";
import IbeSidebar from "containers/IbeSidebar";
import { Fragment, useState } from "react";
import Popup from "components/Popup";

const Home = () => {
  const [showPopUp, setShow] = useState(false);

  return (
    <Fragment>
      <BaseLayout>
        <section className="flex flex-wrap xlg:flex-nowrap w-full">
          <div className="basis-full xlg:basis-[75%] flex flex-col greylike py-10 px-4 md:px-8 tab:px-16 xxl:pl-24 xlg:pr-12">
            <h2 className="text-primary-main font-extrabold text-base md:text-2xl mb-8">
              SELECT FLIGHT
            </h2>
            <IbeHeader />
            <IbeTrips />
          </div>
          <div className="basis-full xlg:basis-[25%] bg-white px-8 py-8">
            <IbeSidebar />
          </div>
        </section>
      </BaseLayout>
      <Popup
        display={showPopUp}
        closeModal={() => setShow(false)}
        top={true}
        width="w-[600px]"
      >
        <section className="w-full bg-white rounded-xl ">
          <div className="flex flex-col items-center justify-center p-[50px]">
            <h6 className="font-display text-xl mb-5">Are you still there?</h6>

            <p className="text-center font-body text-sm mb-6">
              Your booking session is about to expire due to inactivity. Do you
              need more time?
            </p>
            <div className="flex items-center justify-between w-full">
              <button className="btn btn-primary basis-[48%]  mr-2">
                Yes, I need more time
              </button>
              <button className="btn btn-outline basis-[48%]">
                I don’t need it
              </button>
            </div>
          </div>
        </section>
      </Popup>
    </Fragment>
  );
};

export default Home;
