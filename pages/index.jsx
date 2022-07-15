/* eslint-disable @next/next/no-img-element */
import BaseLayout from "layouts/Base";

import IbeHeader from "containers/IbeHeader";
import IbeTrips from "containers/IbeTrips";
import IbeSidebar from "containers/IbeSidebar";
import { Fragment, useState } from "react";
import Popup from "components/Popup";


const Home = () => {
  const [showPopUp, setShow] = useState(true);

  return (
    <Fragment>
      <BaseLayout>
        <section className="w-full">
          <section className="flex">
            <div className="basis-[75%] flex flex-col greylike py-10 pl-28 pr-12">
              <h2 className="text-primary-main font-extrabold text-2xl mb-8">
                SELECT FLIGHT
              </h2>
              <IbeHeader />
              <IbeTrips />
            </div>
            <div className="basis-[25%] bg-white px-6 py-8">
              <IbeSidebar />
            </div>
          </section>
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
