/* eslint-disable @next/next/no-img-element */
import IbeTripItem from "./components/IbeTripItem";

const IbeTrips = () => {
  return (
    <section className="ibe__flight__trips">
      <h2 className="text-primary-main font-extrabold text-sm mb-8">
        DEPARTURE
      </h2>

      <section className="flex flex-col">
        <IbeTripItem />
      </section>
    </section>
  );
};

export default IbeTrips;
