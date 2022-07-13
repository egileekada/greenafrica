/* eslint-disable @next/next/no-img-element */
import BaseLayout from "layouts/Base";

import IbeHeader from "containers/IbeHeader";
import IbeTrips from "containers/IbeTrips";
import IbeSidebar from "containers/IbeSidebar";

const Home = () => {
  return (
    <BaseLayout>
      {/* <section className="w-full px-3.5 py-24 lg:fit-x-bleed"> */}
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
  );
};

export default Home;
