/* eslint-disable @next/next/no-img-element */
import FlightIcon from "assets/svgs/flight_icon.svg";

const Destinations = () => {
  return (
    <section className="container mx-auto mb-10">
      <h1 className="text-primary-main font-semibold text-2xl mb-2">
        Explore Our Destinations from{" "}
        <select
          name=""
          id=""
          className="border-none font-semibold text-2xl pl-0"
        >
          <option value="Lagos">Lagos</option>
          <option value="Lagos">Abuja</option>
        </select>
      </h1>
      <p className="text-lg text-primary-main font-light mb-10">
        You are one flight closer to your dreams and destinations.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-x-12 md:gap-x-5 xl:gap-x-12">
        <a className="my-4" href="/destination/abuja">
          <div className="relative">
            <FlightIcon className="inline-block absolute" />
            <h1 className="text-primary-main font-semibold text-lg mb-2 rounded-full bg-grey-light py-2 text-center w-8/12">
              Abuja
            </h1>
          </div>
          <p className="text-base text-primary-main font-light ml-8">
            Starting at ₦27,500
          </p>
          <img
            src="https://static.greenafrica.com/media/1005/900x600-fa-01.png"
            alt=""
            className="object-cover w-full rounded-lg"
          />
        </a>

        <a className="my-4" href="/destination/abuja">
          <div className="relative">
            <FlightIcon className="inline-block absolute" />
            <h1 className="text-primary-main font-semibold text-lg mb-2 rounded-full bg-grey-light py-2 text-center w-8/12">
              Abuja
            </h1>
          </div>
          <p className="text-base text-primary-main font-light ml-8">
            Starting at ₦27,500
          </p>
          <img
            src="https://static.greenafrica.com/media/1005/900x600-fa-01.png"
            alt=""
            className="object-cover w-full rounded-lg"
          />
        </a>

        <a className="my-4" href="/destination/abuja">
          <div className="relative">
            <FlightIcon className="inline-block absolute" />
            <h1 className="text-primary-main font-semibold text-lg mb-2 rounded-full bg-grey-light py-2 text-center w-8/12">
              Abuja
            </h1>
          </div>
          <p className="text-base text-primary-main font-light ml-8">
            Starting at ₦27,500
          </p>
          <img
            src="https://static.greenafrica.com/media/1005/900x600-fa-01.png"
            alt=""
            className="object-cover w-full rounded-lg"
          />
        </a>

        <a className="my-4" href="/destination/abuja">
          <div className="relative">
            <FlightIcon className="inline-block absolute" />
            <h1 className="text-primary-main font-semibold text-lg mb-2 rounded-full bg-grey-light py-2 text-center w-8/12">
              Abuja
            </h1>
          </div>
          <p className="text-base text-primary-main font-light ml-8">
            Starting at ₦27,500
          </p>
          <img
            src="https://static.greenafrica.com/media/1005/900x600-fa-01.png"
            alt=""
            className="object-cover w-full rounded-lg"
          />
        </a>
      </div>
    </section>
  );
};

export default Destinations;
