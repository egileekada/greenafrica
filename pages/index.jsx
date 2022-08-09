/* eslint-disable @next/next/no-img-element */
import BaseLayout from "layouts/Base";
import IbeHeader from "containers/IbeHeader";
import IbeTrips from "containers/IbeTrips";
import IbeSidebar from "containers/IbeSidebar";
import { Fragment, useState } from "react";
import Popup from "components/Popup";
import FlightWidget from "containers/Widgets/Flight";

const Home = () => {
  const [showPopUp, setShow] = useState(false);

  return (
    <Fragment>
      <BaseLayout>
        <section className="ga__section">
          <div className="ga__section__main">
            <h2 className="text-primary-main font-extrabold text-base md:text-2xl mb-8">
              SELECT FLIGHT {process.env.NEXT_PUBLIC_BASE_URL}
            </h2>
            <IbeHeader />
            <IbeTrips />
          </div>
          <div className="ga__section__side">
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
            <div className="flex flex-wrap lg:flex-nowrap items-center justify-between w-full">
              <button className="btn btn-primary basis-full lg:basis-[48%] lg:mr-2">
                Yes, I need more time
              </button>
              <button className="btn btn-outline basis-full lg:basis-[48%]">
                I don’t need it
              </button>
            </div>
          </div>
        </section>
      </Popup>
      <FlightWidget />
    </Fragment>
  );
};

export default Home;
