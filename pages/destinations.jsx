import React from "react";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import BaseLayout from "layouts/Base";
import Newsletter from "components/Newsletter";
import FlightIcon from "assets/svgs/flight_icon.svg";

import { getDestinations } from "../services";

export async function getServerSideProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["all_destinations", " "], () =>
    getDestinations(" ")
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

const destinations = () => {
  const { data: all_destinations } = useQuery(["all_destinations", " "], () =>
    getDestinations(" ")
  );

  return (
    <BaseLayout>
      <section className="w-full px-3.5 py-4 lg:fit-x-bleed">
        <h1 className="text-primary-main font-semibold text-2xl my-4">
          Explore Our Destinations
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-x-12 md:gap-x-5 xl:gap-x-12 mb-8">
          {all_destinations?.data?.item.map((destination) => (
            <a
              className="my-4"
              href={`/destination/${destination.destination}?origin=${destination.origin}`}
            >
              <div className="relative">
                <FlightIcon className="inline-block absolute" />
                <h1 className="text-primary-main font-semibold text-lg mb-2 rounded-full bg-grey-light py-2 text-center w-8/12">
                  {destination.destination}
                </h1>
              </div>
              <p className="text-base text-primary-main font-light ml-8">
                Starting at ₦{destination.lowest_fare}
              </p>
              <img
                src={destination.image_url}
                alt={destination.excerpt}
                className="object-cover w-full rounded-lg"
              />
            </a>
          ))}
        </div>
        <Newsletter />
      </section>
    </BaseLayout>
  );
};

export default destinations;
