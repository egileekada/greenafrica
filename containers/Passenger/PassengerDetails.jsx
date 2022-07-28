/* eslint-disable @next/next/no-img-element */
import CheckInCard from "components/Cards/checkin";

const PassengerDetails = () => {
  return (
    <section className="bg-white py-11 px-8 flex-col mb-8 rounded-md">
      <h3 className="title-text mb-[6px]">PASSENGER DETAILS</h3>
      <p className="font-body text-black text-xs mb-7">
        Kindly confirm that the information below is correct before checking in
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <CheckInCard />
        <CheckInCard />
        <CheckInCard />
      </div>
    </section>
  );
};

export default PassengerDetails;
